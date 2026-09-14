# Sally Face — NextOS port

![Sally Face](docs/images/00-cover.png)

**Sally Face** (Portable Moose) running natively on Linux handhelds. No Android
runtime, no emulation, no streaming: the game's own ARM64 engine libraries are
mapped by a native AArch64 so-loader that answers the Android platform surface
Unity expects, while the game renders through the handheld's real EGL/OpenGL ES
driver.

BYO-data package: **no game file is distributed here**. You bring your own
lawfully obtained Android copy.

---

## The game

Sal Fisher has a prosthetic face, blue pigtails nobody forgets, and a new home
full of things that are quietly wrong. In the Addison Apartments every
neighbour holds a piece of a macabre story, and every door you open brings you
closer to a truth you might rather not learn.

It is a dark episodic adventure: you walk, you talk, you look at everything,
you put the pieces together. Hand-drawn art, a soundtrack that sticks, and a
story that earns its ending.

| | |
|---|---|
| ![Main menu filling a 4:3 screen](docs/images/01-menu-fill-640x480.png) | ![Main menu at the game's native aspect](docs/images/02-menu-native-640x480.png) |
| Full screen (`SF_ASPECT=fill`) | Native aspect (`SF_ASPECT=native`) |

Both are direct captures from the released build on the device itself, read
back from the frame the driver actually presented. No mockups, no PC emulator.

## Community

Questions, bug reports, screenshots of it running on your handheld:

**https://discord.gg/DHfY62eDNN**

## Install

1. Install the release ZIP through PortMaster, or extract it at the ROM root so
   that `Sally Face.sh` lands in `ports/` and the payload in `ports/sallyface/`.
2. Drop your legally obtained Android copy of the game (`.apk`, `.apkm`,
   `.apks` or `.xapk`) into `ports/sallyface/gamedata/`. The filename does not
   matter.
3. Open **Sally Face** from the Ports list.

On the first launch NXExtract 1.2.21 identifies the container by content,
validates the package id and the AArch64 ABI, unpacks `libmain.so`,
`libunity.so`, `libil2cpp.so` and the Unity data, retags the graphics contract
to GLES2, and commits the installation transactionally, with resume and
rollback. **This first preparation takes a while — let it finish.** Every later
launch goes straight into the game.

The recipe is structural: acceptance uses the package family, the ABI and the
internal payload contracts, not the outer filename, signature or size, so a
renamed or compatibly repackaged copy installs fine. 1.5.53 is the current
reference copy.

Full step-by-step, in English and Portuguese: [INSTALLATION.md](INSTALLATION.md).

## Controls

The owner's `NEXTOSCONTROLLERS.gptk` is parsed by `nxinput` and dispatched into
real Android `KeyEvent`/`MotionEvent` calls — one semantic route per physical
control, so nothing is delivered twice. Editing that file remaps the game;
updating the port never overwrites your copy, and an invalid mapping falls back
to the packaged default instead of breaking input.

| Action | Button |
|---|---|
| Move | D-pad / left stick |
| Interact, advance dialogue | **A** |
| Back, cancel | **B** |
| Gas mask / contextual action | **X** |
| Inventory | **Y** |
| Pause | **START** |
| Pointer | right stick, **R3** clicks |
| Save and quit | **SELECT + START** |

## Owner settings (`NEXTOSSETTINGS.txt`)

| Key | Values | Effect |
|---|---|---|
| `quality` | `auto` *(default)*, `low`, `medium`, `high` | `auto` picks by installed RAM; `low` is the Unity Low preset with selective large-art reduction and ETC1 caching; `medium` keeps the Low preset with a lighter texture policy; `high` applies the Unity High preset and keeps the original assets |
| `SF_ASPECT` | `fill` *(default)*, `native` | `fill` scales the game's own centered 16:9 image to the whole screen; `native` is a strict no-op rollback |

Unknown keys or values fail closed to the default. Every launch writes receipts
naming the profile that actually took effect.

The memory guard is observer-only: it reports sustained pressure but never
kills the game over a `MemAvailable` or swap threshold.

## Devices

Validated device classes for this port, with image, audio, native gamepad,
save/reload and a clean exit:

| Device class | Graphics | Path |
|---|---|---|
| Amlogic-old AArch64, NextOS (R36S-class) | Mali-450 (Utgard), OpenGL ES 2.0 | 1280×720 |
| RK3326, ArkOS / dArkOS | Mali-G31 (Bifrost) | 640×480 |

The same universal ZIP and the same binary run on both classes. This scope
covers image, audio, controls, save/reload, clean exit and Episode 1 gameplay;
it does not claim a full playthrough of Episodes 1–5.

The loader ELF is `arm64` and links no higher than **GLIBC 2.27**, so this is a
universal AArch64 package rather than a firmware-specific build. Other AArch64
handhelds are very likely to work — if you run it elsewhere, tell us in the
Discord.

## How it works

- **Engine:** **Unity 2022.3 / IL2CPP**, arm64-v8a only. The loader maps
  `libmain.so`, `libunity.so` and `libil2cpp.so`, runs the original init arrays
  and `JNI_OnLoad` in NativeLoader order, calls `UnityPlayer.initJni` and only
  then starts `UnityMain`, delivering surface, focus, resume, render, pause and
  shutdown callbacks in the native Android order.
- **Graphics:** the loader owns the GL context and picks its EGL provider by
  measurement (KMSDRM/Wayland vs fbdev) through `dlopen` — no EGL or GLES
  library appears in `DT_NEEDED`, which is what lets one binary serve both GPU
  classes. Extraction retags the game's graphics contract to GLES2:
  `BuildSettings.m_GraphicsAPIs` becomes GLES2-only and
  `PlayerSettings.playerMinOpenGLESVersion` becomes GLES2, and the rebuilt
  bundle is rejected unless every shader platform and program type agrees —
  which is what keeps Unity's magenta internal error shader from being
  accepted as a valid result.
- **Shaders on raw EGL:** when a driver rejects a cached program binary, Unity
  can fall back to source already marked `#version 100` while still carrying
  its complete GLES3 alias block. The port recognizes only that coherent block
  and rewrites it to Unity's own GLES2 alias set, undefining
  `DECLARE_FRAG_COLOR` so the original `#ifdef` drops the ESSL300 output
  declaration. Genuine ESSL100 is preserved byte for byte, and a partial
  translation fails closed instead of producing hybrid source.
- **Textures:** ETC1/ETC2 stay compressed and are handed to the GPU natively;
  art larger than the measured `GL_MAX_TEXTURE_SIZE` is halved after decode, so
  a 4096-limit Mali-450 is served without touching an 8192-capable GPU.
- **Full screen:** Adventure Creator paints its own centered 16:9 image when
  the physical screen is 4:3, so moving the viewport cannot remove bars the
  game already drew. In `fill` mode the adapter does one final GLES2
  presentation before swap — at 640×480 that is `0,60 640×360 → 0,0 640×480`,
  and at 1280×720 it is an identity. GL state is saved and restored.
- **Audio:** the FMOD Android device loop is bridged to SDL audio.
- **Input:** the owner's GPTK file feeds `nxinput`, which drives the Android
  input surface directly.
- **Runtime:** the launcher keeps `HOME` inside the port directory, so saves
  live with the port and survive updates along with `gamedata/`,
  `NEXTOSCONTROLLERS.gptk` and `NEXTOSSETTINGS.txt`.

## Build

```sh
NEXTOS_SYSROOT=/path/to/aarch64-sysroot ./build-universal.sh
```

The compile runs inside a pinned offline Debian Buster image, which is what
keeps the ELF at `GLIBC_2.27`. The sysroot is mounted read-only and supplies
headers only (SDL2, EGL, GLES2, zlib); SDL2 and zlib come from the device
firmware and enter the link as SONAME stubs. The runtime modules compiled into
the loader — `nxinput` 0.5.1, `nxcompat` 0.3.0 and `nxgl` 0.2.17 — are vendored
under [`vendor/`](vendor), so the build needs no external tree.

The build is deterministic and **reproduces exactly the `sallyface-nextos`
binary shipped in the published ZIP**, `sha256`
`73a74ede15bdbe07ee84b2666da234e9244e24594f8e6011b174a7b311bfbfc3`. Two gates
run before it succeeds: maximum `GLIBC_2.30`, and a `DT_NEEDED` whitelist that
keeps EGL/GLES out of the link.

Local gates: `bash tests/run_local_tests.sh`. `package/build-package.sh` drives
the full release flow, but it needs the pinned NextOS release tooling
(`nxgenerator`/`nxrelease`), which is not part of this repository — building the
loader itself needs nothing beyond this tree.

## Licensing and credits

- **Sally Face** is © Portable Moose. This is an independent interoperability
  project, not affiliated with or endorsed by Portable Moose or Unity
  Technologies. The game, its data and its trademarks belong to their rights
  holders.
- The loader and the NextOS runtime components in this repository are licensed
  under the **GNU GPL v3.0** — see [LICENSE](LICENSE).
- NXExtract is MIT licensed; `nxsplash-nextos`, shipped prebuilt in the ZIP, is
  MIT as well — see [NOTICE.md](NOTICE.md).
- Screenshots are used for identification and documentation only.

---

# Português

**Sally Face** (Portable Moose) rodando nativamente em portáteis Linux. Sem
runtime Android, sem emulação e sem streaming: as bibliotecas ARM64 originais
da engine são mapeadas por um so-loader AArch64 nativo, que responde às
interfaces de plataforma Android que a Unity espera, enquanto o jogo desenha no
EGL/OpenGL ES real do aparelho.

Pacote BYO-data: **nenhum arquivo do jogo é distribuído aqui**. Você usa a sua
cópia Android legalmente obtida.

## O jogo

Sal Fisher tem uma prótese no rosto, um cabelo azul que ninguém esquece e uma
casa nova cheia de coisas erradas. Nos Apartamentos Addison, cada vizinho
guarda um pedaço de uma história macabra, e cada porta que você abre te deixa
mais perto de uma verdade que talvez fosse melhor não saber.

É uma aventura sombria em capítulos: você anda, conversa, olha tudo e junta as
peças. Arte desenhada à mão, uma trilha que gruda e uma história que merece o
próprio final.

As duas fotos acima são capturas diretas da build publicada, tiradas no próprio
aparelho — sem mockup e sem emulador de PC.

### Comunidade

Dúvidas, relatos de bug e fotos rodando no seu portátil:

**https://discord.gg/DHfY62eDNN**

### Instalação

1. Instale o ZIP pelo PortMaster, ou extraia na raiz de ROMs de modo que
   `Sally Face.sh` fique em `ports/` e o conteúdo em `ports/sallyface/`.
2. Coloque a sua cópia Android legalmente obtida (`.apk`, `.apkm`, `.apks` ou
   `.xapk`) em `ports/sallyface/gamedata/`. O nome do arquivo não importa.
3. Abra **Sally Face** na lista de Ports.

Na primeira abertura o NXExtract 1.2.21 identifica o container pelo conteúdo,
valida package e ABI AArch64, extrai `libmain.so`, `libunity.so`, `libil2cpp.so`
e os dados da Unity, reetiqueta o contrato gráfico para GLES2 e conclui a
instalação de forma transacional, com retomada e rollback. **Esse primeiro
preparo é demorado — deixe terminar.** Nas próximas vezes o jogo abre direto.

A receita é estrutural: a aceitação usa família do package, ABI e os contratos
internos do payload, e não o nome, a assinatura ou o tamanho do arquivo
externo, então uma cópia renomeada ou reempacotada de forma compatível instala
normalmente. A cópia de referência atual é a 1.5.53.

Passo a passo completo em [INSTALLATION.md](INSTALLATION.md).

### Controles

O `NEXTOSCONTROLLERS.gptk` do dono é lido pelo `nxinput` e vira chamada real de
`KeyEvent`/`MotionEvent` do Android — uma rota semântica por controle físico,
sem entrada duplicada. Editar esse arquivo remapeia o jogo; atualizar o port
nunca sobrescreve a sua cópia, e um mapping inválido cai no default do pacote
em vez de quebrar o controle.

| Ação | Botão |
|---|---|
| Mover | D-pad / analógico esquerdo |
| Interagir, avançar diálogo | **A** |
| Voltar, cancelar | **B** |
| Máscara / ação contextual | **X** |
| Inventário | **Y** |
| Pausar | **START** |
| Ponteiro | analógico direito, **R3** clica |
| Salvar e sair | **SELECT + START** |

### Ajustes do dono (`NEXTOSSETTINGS.txt`)

| Chave | Valores | Efeito |
|---|---|---|
| `quality` | `auto` *(padrão)*, `low`, `medium`, `high` | `auto` escolhe pela RAM instalada; `low` é o preset Low da Unity com redução seletiva de arte grande e cache ETC1; `medium` mantém o preset Low com política de textura mais leve; `high` aplica o preset High e preserva os assets originais |
| `SF_ASPECT` | `fill` *(padrão)*, `native` | `fill` escala para a tela inteira a imagem 16:9 que o próprio jogo centraliza; `native` é o rollback estrito, sem essa passagem |

Chave ou valor desconhecido falha fechado no padrão. Cada abertura registra
recibos dizendo qual perfil valeu de verdade.

O guard de memória só observa: ele registra pressão sustentada, mas nunca
encerra o jogo por limite de `MemAvailable` ou de swap.

### Aparelhos

Classes de aparelho validadas para este port, com imagem, áudio, controle
nativo, save/reload e saída limpa:

| Classe de aparelho | Gráficos | Caminho |
|---|---|---|
| Amlogic-old AArch64, NextOS (linha R36S) | Mali-450 (Utgard), OpenGL ES 2.0 | 1280×720 |
| RK3326, ArkOS / dArkOS | Mali-G31 (Bifrost) | 640×480 |

O mesmo ZIP universal e o mesmo binário rodam nas duas classes. Esse escopo
cobre imagem, áudio, controle, save/reload, saída limpa e gameplay do Episódio
1; não alega playthrough completo dos Episódios 1–5.

O ELF do loader é `arm64` e não exige mais que **GLIBC 2.27**, então o pacote é
universal e não uma build presa a um firmware. Outros portáteis AArch64 têm
tudo para funcionar — se rodar no seu, conta lá no Discord.

### Como funciona

- **Engine:** **Unity 2022.3 / IL2CPP**, só arm64-v8a. O loader mapeia
  `libmain.so`, `libunity.so` e `libil2cpp.so`, executa os init arrays
  originais e o `JNI_OnLoad` na ordem do NativeLoader, chama
  `UnityPlayer.initJni` e só então inicia a `UnityMain`, entregando superfície,
  foco, resume, render, pause e encerramento na ordem nativa do Android.
- **Gráficos:** o loader é dono do contexto GL e escolhe o provedor EGL por
  medição (KMSDRM/Wayland ou fbdev) via `dlopen` — nenhuma biblioteca EGL ou
  GLES aparece no `DT_NEEDED`, e é isso que faz um binário só servir às duas
  classes de GPU. A extração reetiqueta o contrato gráfico do jogo para GLES2:
  `BuildSettings.m_GraphicsAPIs` fica só em GLES2 e
  `PlayerSettings.playerMinOpenGLESVersion` passa para GLES2, e o bundle
  reconstruído é rejeitado se qualquer plataforma ou tipo de programa de shader
  discordar — é isso que impede o shader interno de erro rosa da Unity de ser
  aceito como resultado válido.
- **Shaders em raw EGL:** quando o driver rejeita um program binary em cache, a
  Unity pode cair para fonte já marcada como `#version 100` mas ainda com o
  bloco completo de aliases GLES3. O port reconhece somente esse bloco coerente
  e o converte para os aliases GLES2 da própria Unity, removendo
  `DECLARE_FRAG_COLOR` para que o `#ifdef` original elimine a saída ESSL300.
  ESSL100 genuíno fica byte a byte, e tradução parcial falha fechado em vez de
  gerar fonte híbrida.
- **Texturas:** ETC1/ETC2 continuam comprimidas e vão nativas para a GPU; arte
  maior que o `GL_MAX_TEXTURE_SIZE` medido é reduzida à metade depois do
  decode, atendendo o Mali-450 de limite 4096 sem tocar numa GPU de 8192.
- **Tela cheia:** o Adventure Creator desenha sozinho uma imagem 16:9
  centralizada quando a tela física é 4:3, então mexer no viewport não apaga
  faixas que o jogo já pintou. No modo `fill` o adapter faz uma apresentação
  GLES2 final antes do swap — em 640×480 é `0,60 640×360 → 0,0 640×480`, e em
  1280×720 é identidade. O estado GL é salvo e restaurado.
- **Áudio:** o loop do dispositivo de áudio Android do FMOD é ligado ao SDL.
- **Entrada:** o GPTK do dono alimenta o `nxinput`, que dirige a superfície de
  entrada do Android.
- **Runtime:** o launcher mantém o `HOME` dentro da pasta do port, então os
  saves moram junto com ele e sobrevivem à atualização, assim como `gamedata/`,
  `NEXTOSCONTROLLERS.gptk` e `NEXTOSSETTINGS.txt`.

### Build

```sh
NEXTOS_SYSROOT=/caminho/sysroot-aarch64 ./build-universal.sh
```

A compilação roda dentro de uma imagem Debian Buster offline fixada, e é ela
que mantém o ELF em `GLIBC_2.27`. O sysroot entra somente para leitura e só
fornece headers (SDL2, EGL, GLES2, zlib); SDL2 e zlib vêm do firmware do
aparelho e entram no link apenas como stubs de SONAME. Os módulos de runtime
compilados no loader — `nxinput` 0.5.1, `nxcompat` 0.3.0 e `nxgl` 0.2.17 —
estão vendorizados em [`vendor/`](vendor), então a build não depende de
nenhuma árvore externa.

A build é determinística e **reproduz exatamente o binário `sallyface-nextos`
distribuído no ZIP publicado**, `sha256`
`73a74ede15bdbe07ee84b2666da234e9244e24594f8e6011b174a7b311bfbfc3`. Duas travas
correm antes de ela passar: máximo `GLIBC_2.30` e uma whitelist de `DT_NEEDED`
que mantém EGL/GLES fora do link.

Gates locais: `bash tests/run_local_tests.sh`. O `package/build-package.sh`
conduz o fluxo completo de release, mas depende do ferramental de release do
NextOS (`nxgenerator`/`nxrelease`), que não faz parte deste repositório — para
compilar o loader não é preciso nada além desta árvore.

### Licenças e créditos

- **Sally Face** é © Portable Moose. Este é um projeto independente de
  interoperabilidade, sem afiliação ou endosso da Portable Moose ou da Unity
  Technologies. O jogo, seus dados e suas marcas pertencem aos respectivos
  titulares.
- O loader e os componentes de runtime do NextOS neste repositório são
  licenciados sob a **GNU GPL v3.0** — veja [LICENSE](LICENSE).
- O NXExtract é MIT; o `nxsplash-nextos`, distribuído pré-compilado no ZIP,
  também é MIT — veja [NOTICE.md](NOTICE.md).
- As capturas de tela servem apenas para identificação e documentação.

## Download

- [sallyface-v1.1.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sallyface-v1.1.4) — `sallyface.zip`, `sallyface.zip.sha256`
- [sallyface-v1.1.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sallyface-v1.1.3) — `sallyface.zip`, `sallyface.zip.sha256`

- Todas as versões / all versions: [releases?q=sallyface](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=sallyface)
- Histórico: 53 downloads no repositório original `sallyface-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
