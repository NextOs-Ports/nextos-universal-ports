# Merchant of the Skies — NextOS port

![Merchant of the Skies](docs/images/00-cover.png)

**Merchant of the Skies** (Coldwild Games) running natively on Linux
handhelds. No Android runtime, no emulation, no streaming: the game's own
ARM64 engine libraries are mapped by a native AArch64 compatibility loader
that answers the Android platform surface they expect, while the game renders
through the handheld's real EGL/OpenGL ES driver.

BYO-data package: **no game file is distributed here**. You bring your own
lawfully obtained Android copy.

---

## The game

You inherit a small flying ship and a grandfather's debt. From there it is up
to you: buy low on one floating island, sell high on the next, chart trade
routes between the clouds, buy a bigger hull, hire a crew, build your own sky
island and turn a one-boat operation into a trading company.

It is a calm, unhurried economy game in beautiful pixel art — the kind you
play in twenty-minute sittings on a handheld. Explore, haggle, upgrade,
repeat. **Merchant of the Skies 2.0** is the complete mobile edition, with
the full campaign, sandbox play and every island of the PC release.

| | |
|---|---|
| ![Title screen, Mali-450, 1280x720](docs/images/01-title-mali450-1280x720.png) | ![Main menu, Mali-G31, 640x480](docs/images/02-menu-mali-g31-640x480.png) |
| Title screen — Mali-450, 1280x720 | Main menu — Mali-G31 / ArkOS, 640x480 |

Both shots are direct captures from the released build on the devices
themselves. No mockups, no PC emulator.

## Community

Questions, bug reports, screenshots of it running on your handheld:

**https://discord.gg/DHfY62eDNN**

## Install

1. Install the release ZIP through PortMaster, or extract it at the ROM root
   so that `Merchant of the Skies.sh` lands in `ports/` and the payload in
   `ports/merchantskies/`.
2. Drop your legally obtained Android copy of the game (`.apk`, `.apkm`,
   `.apks` or `.xapk`) into `ports/merchantskies/gamedata/`. The filename does
   not matter.
3. Open **Merchant of the Skies** from the Ports list.

On the first launch NXExtract identifies the container by content, validates
the package id, the ABI and the ELF identity of the engine libraries, unpacks
the Unity payload and commits the installation transactionally, with resume
and rollback. It needs roughly 400 MB free on the card. Every later launch
goes straight into the game.

Full step-by-step, in English and Portuguese: [INSTALLATION.md](INSTALLATION.md).

## Controls

Native gamepad throughout — the game shows its own gamepad prompts.

| Action | Button |
|---|---|
| Confirm | A |
| Cancel / back | B |
| Navigate, move | D-pad and left stick |
| Pointer | right stick |
| Pointer click | R3 |
| Save and quit | SELECT + START |

`NEXTOSCONTROLLERS.gptk` in the port folder is yours to edit; updating the
port never overwrites it.

## Devices

Both rows below were proven physically with **this exact release ZIP**, from a
clean install through gameplay, audio, controls, save and a clean exit.

| Device class | Graphics | Result |
|---|---|---|
| Amlogic-old AArch64, NextOS (R36S-class) | Mali-450 (Utgard), OpenGL ES 2.0, SDL mali/fbdev | boot, fonts, video, audio, controls, SELECT+START, exit 0 |
| RK3326 AArch64, ArkOS | Mali-G31 (Bifrost), OpenGL ES 3.2, KMSDRM | boot, fonts, video, audio, controls, SELECT+START, exit 0 |

The loader ELF is `arm64` and links no higher than **GLIBC 2.27**, so it is a
universal AArch64 package rather than a firmware-specific build. Other AArch64
handhelds and firmwares are very likely to work, but only the two rows above
carry a physical receipt — if you run it elsewhere, tell us in the Discord.

Measured on the Mali-450 baseline: 59–60 fps in gameplay, 245 MB resident on a
916 MB device, ~1 MB of drift across a 22,800-frame continuous run.

## How it works

- **Engine:** Unity **6000.4.2f1**, IL2CPP, Built-in render pipeline,
  `arm64-v8a` only.
- **Loader:** `merchantskies-nextos` maps `libmain.so`, `libunity.so` and
  `libil2cpp.so` directly, follows the native Android initialization order and
  provides the JNI, Android lifecycle and Bionic surfaces the engine calls.
- **Graphics:** the game ships GLES3 (`#version 300 es`) shaders. On an
  OpenGL ES 2.0 part such as the Mali-450 they are translated to ESSL1
  (`#version 100`); on an ES 3.x part the native contract is preserved.
  ASTC, ETC1 and ETC2 stay compressed and go to the GPU as-is; only formats
  the GPU genuinely lacks are decoded on the CPU.
- **Audio:** Unity's embedded FMOD picks its backend from the reported Android
  API level; the port routes it to the AudioTrack/OpenSL path and bridges that
  to SDL.
- **Input:** Rewired, fed by the real SDL game controller, so the game itself
  switches to gamepad prompts.
- **Runtime:** the launcher runs the game in the foreground, holds a
  single-instance lock and keeps `HOME` inside the port directory, so saves
  live with the port. Exit saves first and then leaves immediately, which is
  what this engine needs on these SoCs.

## Build

```sh
./build-universal.sh          # universal low-glibc AArch64 loader
./package/build-package.sh    # gate + bundle the release ZIP
```

The packaging script needs the pinned NextOS release tooling, named through
`NEXTOS_FRAMEWORK_ROOT`; without it, it stops with a clear message. Building
the loader itself only needs the toolchain and a sysroot with SDL2/EGL/GLES
headers.

## Licensing and credits

- **Merchant of the Skies** is © Coldwild Games. This is an independent
  interoperability project, not affiliated with or endorsed by Coldwild Games
  or Unity Technologies. The game, its data and its trademarks belong to their
  rights holders.
- The loader and the NextOS runtime components in this repository are licensed
  under the **GNU GPL v3.0** — see [LICENSE](LICENSE).
- NXExtract is MIT licensed.
- Screenshots are used for identification and documentation only.

---

# Português

**Merchant of the Skies** (Coldwild Games) rodando nativamente em portáteis
Linux. Sem runtime Android, sem emulação e sem streaming: as bibliotecas ARM64
originais da engine são mapeadas por um loader de compatibilidade AArch64
nativo, que responde às interfaces de plataforma Android que elas esperam,
enquanto o jogo desenha no EGL/OpenGL ES real do aparelho.

Pacote BYO-data: **nenhum arquivo do jogo é distribuído aqui**. Você usa a sua
cópia Android legalmente obtida.

## O jogo

Você herda um pequeno navio voador e a dívida do seu avô. Daí em diante a
história é sua: compre barato numa ilha flutuante, venda caro na próxima,
desenhe rotas comerciais entre as nuvens, troque de casco, contrate
tripulação, construa a sua própria ilha e transforme um barquinho numa
companhia de comércio.

É um jogo de economia calmo e sem pressa, em pixel art caprichada — do tipo
que se joga em sessões de vinte minutos no portátil. Explorar, negociar,
melhorar, repetir. O **Merchant of the Skies 2.0** é a edição mobile completa,
com a campanha inteira, o modo sandbox e todas as ilhas da versão de PC.

As duas fotos acima são capturas diretas da build publicada, tiradas nos
próprios aparelhos — sem mockup e sem emulador de PC.

### Comunidade

Dúvidas, relatos de bug e fotos rodando no seu portátil:

**https://discord.gg/DHfY62eDNN**

### Instalação

1. Instale o ZIP pelo PortMaster, ou extraia na raiz de ROMs de modo que
   `Merchant of the Skies.sh` fique em `ports/` e o conteúdo em
   `ports/merchantskies/`.
2. Coloque a sua cópia Android legalmente obtida (`.apk`, `.apkm`, `.apks` ou
   `.xapk`) em `ports/merchantskies/gamedata/`. O nome do arquivo não importa.
3. Abra **Merchant of the Skies** na lista de Ports.

Na primeira abertura o NXExtract identifica o container pelo conteúdo, valida
package, ABI e a identidade ELF das bibliotecas da engine, extrai o payload da
Unity e conclui a instalação de forma transacional, com retomada e rollback.
Precisa de cerca de 400 MB livres no cartão. Nas próximas vezes o jogo abre
direto.

Passo a passo completo em [INSTALLATION.md](INSTALLATION.md).

### Controles

Controle nativo do começo ao fim — o próprio jogo mostra os ícones de gamepad.

| Ação | Botão |
|---|---|
| Confirmar | A |
| Voltar / cancelar | B |
| Navegar, andar | direcional e analógico esquerdo |
| Ponteiro | analógico direito |
| Clique do ponteiro | R3 |
| Salvar e sair | SELECT + START |

O arquivo `NEXTOSCONTROLLERS.gptk` na pasta do port é seu para editar;
atualizar o port nunca sobrescreve a sua cópia.

### Aparelhos

As duas linhas abaixo foram provadas fisicamente com **este mesmo ZIP**, da
instalação limpa até jogar, com áudio, controle, save e saída limpa.

| Classe de aparelho | Vídeo | Resultado |
|---|---|---|
| Amlogic-old AArch64, NextOS (linha R36S) | Mali-450 (Utgard), OpenGL ES 2.0, SDL mali/fbdev | boot, fontes, vídeo, áudio, controles, SELECT+START, saída 0 |
| RK3326 AArch64, ArkOS | Mali-G31 (Bifrost), OpenGL ES 3.2, KMSDRM | boot, fontes, vídeo, áudio, controles, SELECT+START, saída 0 |

O ELF do loader é `arm64` e não exige mais que **GLIBC 2.27**, então o pacote é
universal e não uma build presa a um firmware. Outros portáteis AArch64 têm
tudo para funcionar, mas só essas duas linhas têm prova física — rodou no seu,
conta lá no Discord.

Medido na régua Mali-450: 59–60 fps em gameplay, 245 MB residentes num
aparelho de 916 MB e ~1 MB de variação numa corrida contínua de 22.800
quadros.

### Como funciona

- **Engine:** Unity **6000.4.2f1**, IL2CPP, pipeline Built-in, só `arm64-v8a`.
- **Loader:** o `merchantskies-nextos` mapeia `libmain.so`, `libunity.so` e
  `libil2cpp.so` direto, segue a ordem nativa de inicialização do Android e
  fornece as interfaces de JNI, lifecycle e Bionic que a engine chama.
- **Vídeo:** o jogo traz shaders GLES3 (`#version 300 es`). Numa GPU OpenGL
  ES 2.0 como a Mali-450 eles são traduzidos para ESSL1 (`#version 100`); numa
  GPU ES 3.x o contrato nativo é preservado. ASTC, ETC1 e ETC2 continuam
  comprimidos e vão para a GPU como estão; só o que a GPU realmente não tem é
  decodificado na CPU.
- **Áudio:** o FMOD embutido da Unity escolhe o backend pelo nível de API
  Android reportado; o port o leva para o caminho AudioTrack/OpenSL e faz a
  ponte disso para o SDL.
- **Controle:** Rewired alimentado pelo game controller real do SDL, por isso
  o próprio jogo troca para os ícones de gamepad.
- **Runtime:** o launcher roda o jogo em primeiro plano, segura uma trava de
  instância única e mantém o `HOME` dentro da pasta do port, então os saves
  moram junto com ele. A saída salva primeiro e encerra em seguida, que é o que
  essa engine exige nesses SoCs.

### Licenças e créditos

- **Merchant of the Skies** é © Coldwild Games. Este é um projeto independente
  de interoperabilidade, sem afiliação nem endosso da Coldwild Games ou da
  Unity Technologies. O jogo, seus dados e suas marcas pertencem aos
  respectivos detentores.
- O loader e os componentes de runtime do NextOS deste repositório estão sob a
  **GNU GPL v3.0** — veja [LICENSE](LICENSE).
- O NXExtract é MIT.
- As capturas de tela servem apenas para identificação e documentação.

## Download

- [merchantskies-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/merchantskies-v1.0.0) — `merchantskies.zip`, `merchantskies.zip.sha256`

- Todas as versões / all versions: [releases?q=merchantskies](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=merchantskies)
- Histórico: 27 downloads no repositório original `merchantskies-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
