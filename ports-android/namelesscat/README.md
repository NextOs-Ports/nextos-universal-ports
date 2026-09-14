# Nameless Cat — universal PortMaster port (AArch64)

Native AArch64 port of the Android release of **Nameless Cat** for Linux handhelds —
NextOS, R36S/ArkOS-class, dArkOS, ROCKNIX, muOS, EmuELEC and any firmware with
PortMaster. No emulator and no Android underneath: the game's own native libraries
run on plain Linux through a so-loader.

**Language / Idioma:** [English](#english) · [Português](#português)

> ### ⚠️ Bring your own data · Traga os seus próprios dados
> This repository and its releases contain **no game data** — no APK, no Android
> libraries, no assets. You supply the copy you legally own and the port installs
> it on the device at first launch.
>
> Este repositório e as suas releases **não contêm dados do jogo**. Você fornece
> a sua própria cópia legal e o port a instala no aparelho na primeira abertura.

## Download

The packaged port is on the [Releases](../../releases/latest) page: download `namelesscat.zip` and
install it with PortMaster, or extract it at the root of your ROM collection.

| | |
|---|---|
| Game | Nameless Cat 1.15.2 (`com.kotobagames.namelesscat`) |
| Engine | Unity 6000.3.11f1, IL2CPP |
| Architecture | AArch64 (`arm64-v8a`) |
| Graphics | OpenGL ES 2.0 (GLES3 facade over GLES2 on Mali-450-class GPUs) |
| SDL | the firmware's own — none ships in the ZIP |
| Audio | the game's own, through the firmware |
| Port version | 1.2.7 |

## Install in three steps

1. Extract `namelesscat.zip` at the ROM root — `Nameless Cat.sh` lands in `ports/`, next to
   the `namelesscat/` folder.
2. Put your own Android copy of the game into `ports/namelesscat/gamedata/`
   (base + `arm64-v8a` split, or a full `.apkm`/`.apks`/`.xapk`/`.zip`; the file name does not matter).
3. Open **Nameless Cat** from the Ports menu. The first launch validates your copy,
   installs it and starts the game.

The level-select screen is fitted to the handheld's real screen and the Android
touch HUD is not drawn over the game. Progress lives in `namelesscat/home/` and
survives port updates.

Full instructions, including the reference identity of the accepted copy, are in
[`INSTALLATION.md`](INSTALLATION.md).

## Controls, briefly

Left stick and D-pad move · **A** jumps · **X** interacts · **START** pauses.
The right stick moves a pointer for the game's touch UI and **R3** clicks (**R1**
and **R2** click too); in menus and dialogs **A** clicks, while in gameplay A stays
the jump.

Every button is remappable in `NEXTOSCONTROLLERS.gptk` inside the port folder.
**SELECT + START on the same controller** exits cleanly, saving first.

## License · Licença

Port code and its licenses: see [Licensing](#licensing).
Nameless Cat is © Kotoba Games. This port is an independent project with no
affiliation with, or endorsement by, the developer.

---

## English

Public universal **BYO-data** port of Nameless Cat 1.15.2 (Unity 6000.3.11f1
IL2CPP, AArch64) for handheld Linux firmwares with PortMaster. The ZIP ships
only the port's own open code plus the pinned framework helpers; the player
supplies the game package they legally own (see `INSTALLATION.md`).

### Architecture and native flow

The nxbootstrap-generated launcher validates the payload, runs the NXExtract
installer on first launch (the player's package is verified by content and
published transactionally), shows the mandatory five-second NXSplash and then
runs `namelesscat-nextos` in the foreground. The loader follows Android's
original order: `libmain` initialization and `JNI_OnLoad`,
`NativeLoader.load`, `libunity` and `libil2cpp`, `UnityPlayer.initJni`,
surface creation/change, focus, resume and the native render loop. It
intercepts the platform; it does not skip steps or replace the game's
lifecycle.

On GLES2-only GPUs (Mali-450 class) the port provides a GLES3 compatibility
facade over GLES2, translates shaders to ESSL 100 and converts unsupported
texture formats. On GLES3-capable GPUs (Mali-G31 class, SDL/KMSDRM) the same
binary runs the logical GLES3 surface directly. The final backbuffer is
presented with opaque alpha for framebuffer compositors.

The level-select UI is adapted to the device's real drawable instead of
assuming a wide Android screen. Its own Unity `CanvasScaler` is switched to
the containment endpoint for the current aspect ratio, so the complete
800x420 reference canvas remains visible at 640x480, 1280x720 and wider
displays. The policy is local to that scene; gameplay rendering and all other
canvases remain native. Pointer drawing and injected touch coordinates use
the same measured drawable.

Both presentation paths run the pinned nxgl 0.3.2 frame-proof adapter at the
real pre-swap boundary. A generation is accepted only when the measured
backbuffer contains visible RGB with nonzero alpha; a live process or working
audio alone is never treated as video proof.

### Automated on-device controls proof

Controls are proven automatically on the target device by the framework
(nxinput 0.10.2 `nx-device-input-proof`, evidence class
`ON_DEVICE_AUTOMATED_INPUT_PROOF`): device-faithful uinput clones of the real
pad are created before the game's SDL_Init by a helper that is not part of
this package, the firmware SDL admits them with the same GUID/mapping, and
every declared control, `null`, `native`, stick edge, neutral return,
hotplug, negative chord and SELECT+START is exercised through the kernel and
verified against the runtime readback. The port opens every admitted pad
(`nxinput_padset`) and the exit chord counts only when SELECT and START come
from the same pad. No test harness lives in this executable.

### Controls — the sovereign mapping route

This port always uses the **firmware's own SDL2** (PortMaster provider — no
private SDL ships in the ZIP). The nxinput 0.10.1 C6 seam of the NextOS
framework runs **in-process** inside the loader
(`vendor/nxinput/engine-glue/nxc6_glue.c` compiled into the binary): every
pad is admitted before `SDL_GameControllerOpen`, by the canonical authority
order over the CFW's own PortMaster mapping — no positional guessing, no
raw-evdev fallback, no A/B swap heuristics, no device name or VID/PID rules.
The pad is discovered by capability (a controller without `ABS_X/ABS_Y` is
still a controller), joydev ordinals are projected only when the event-node
capabilities prove that domain, and the authority-3 bundle shipped in the ZIP
(`controllers.nxb`, plus the `controllers-modern.nxb`/`controllers-retro.nxb`
pair selected by `FACE_LAYOUT`) only ever answers when no live authority does.

`NEXTOSCONTROLLERS.gptk` (format `NEXTOS_CONTROLLERS/3`) is a **live runtime**,
not documentation: it is read once before any SDL subsystem starts, every
mapped action has a real sink, and the runtime only consumes a control after
the engine itself has proven the context:

| Engine state (proven through IL2CPP, never guessed) | Context |
|---|---|
| Pause menu, checkpoint panel or popup open | `[menu]` |
| Player alive with control enabled | `[gameplay]` |
| Player alive but control locked (cutscene/dialogue) | `[menu]` |
| No player (title, level select) | `[menu]` |
| Contract unavailable | passthrough (native Android input) |

Default map (edit the owner copy next to the game to remap; `null` disables a
control everywhere, `native` hands it to the game's own Android input):

| Control | `[gameplay]` | `[menu]` |
|---|---|---|
| A | `player.jump` → `KEYCODE_BUTTON_A` (JoystickButton0) | `menu.accept` → the same key |
| B | `player.interact` → `KEYCODE_BUTTON_B` | native |
| Y | `player.down` → down axis | native |
| X, L1, R1, L3 | native | native |
| L2, R2 | `null` (the mobile profile reads a trigger axis as pause) | `null` |
| START | `system.pause` → the game's own `UIManager.backButtonInGame()` while a level is alive; `KEYCODE_BUTTON_START` (JoystickButton10, the game's "press 10") elsewhere | same |
| SELECT | native | native |
| D-pad | native: `KEYCODE_DPAD_*` + hat, mirrored into the primary axes | native |
| Left stick | `player.move` → `AXIS_X/AXIS_Y` (radial deadzone 0.15, rescaled) | native |
| Right stick | native | `cursor.move` (polished arrow, nxinput kinematics) |
| R3 | native | `cursor.click` (touch at the arrow; a hidden arrow is only revealed) |
| SELECT + START | sovereign exit chord (framework, outside the file; instantaneous) | same |

A is never stolen for the pointer, the D-pad is never used for the pointer,
and no other combination (L1+R1, L2+R2, GUIDE+START, START alone) exits.
Every native key is delivered by state, so a key pressed while its owner
changes always receives its release (no stuck directions). Prompts inside the
game still print Unity's own legacy names (`10`, `axis -2`): the game consults
no controller identity for glyphs, so that text is the game's, not the
port's.

### Data and build

No game data ships here. The NXExtract recipe (`extractor.json`) accepts the
player's package by **content**: package ID, version contract, ABI, structure
and per-payload SHA-256 of the 19 Unity data files and the three original
ARM64 engine libraries. A legitimately renamed or repackaged container with
the same compatible content is accepted; another game or an incompatible
build fails closed. Exact identities live in `INSTALLATION.md`.

```bash
cd ports/namelesscat
./build_universal.sh        # game runtime (offline Debian Buster container)
```

Every ELF produced here requires at most `GLIBC_2.27` (public ceiling
`GLIBC_2.30`). The framework pieces are pinned: generated nxbootstrap
launcher, NXExtract 1.3.0, NXSplash 0.1.2, nxinput 0.10.1 (vendored under
`vendor/nxinput/` with SHA-256 pins; see `vendor/nxinput/PINS.json`).

### Source map

- `src/main.c` — loader entry and Unity-as-a-Library lifecycle.
- `src/nx_elf.c` — AArch64 Android ELF mapping, relocation and symbol bridge.
- `src/jni.c` / `src/android.c` — Java/Android compatibility surface.
- `src/egl.c` / `src/gles3.c` / `src/unity6_shader.c` — GLES facade,
  presentation and shader translation.
- `src/audio.c` / `src/opensles_shim.c` — FMOD/AudioTrack and OpenSL-to-SDL
  audio paths.
- `src/input.c` — seam staging, physical controls, native pause, pointer,
  contextual A-click, adaptive level-select canvas and persistent no-ad
  policy.
- `src/viewport_policy.c` — device-aspect containment policy shared by the
  runtime and its resolution-matrix regression.
- `src/language.c` — single locale snapshot with saved in-game preference.
- `vendor/nxinput/` — pinned nxinput 0.10.1 sources vendored for the
  in-process C6 seam (admission glue compiled into the loader).
- `vendor/nxgl/` — byte-pinned nxgl 0.3.2 pre-present frame-proof adapter.
- `tests/input-lifecycle/` — held-button, managed-release, single-authority
  and synthetic-touch lifecycle regression.

### Licensing

Port code is GPL-3.0-only (`LICENSE`). NXSplash is MIT (`NXSPLASH-LICENSE`);
NXExtract is MIT (`licenses/NXExtract-MIT.txt`); SDL2 is zlib
(`licenses/SDL2-zlib.txt`). Nameless Cat, its original libraries, artwork,
audio and data remain the property of Kotoba Games. No ownership or license
to those assets is granted or implied.

## Português

Port universal público **BYO-data** do Nameless Cat 1.15.2 (Unity
6000.3.11f1 IL2CPP, AArch64) para firmwares Linux portáteis com PortMaster.
O ZIP traz apenas o código aberto do port e os helpers pinados do framework;
o jogador fornece o pacote do jogo que possui legalmente (ver
`INSTALLATION.md`).

### Arquitetura e fluxo nativo

O launcher gerado pelo nxbootstrap valida o payload, roda o NXExtract na
primeira abertura (o pacote do dono é verificado por conteúdo e publicado
transacionalmente), mostra a NXSplash obrigatória de cinco segundos e então
executa `namelesscat-nextos` em foreground. O loader segue a ordem original
do Android: inicialização e `JNI_OnLoad` da `libmain`, `NativeLoader.load`,
`libunity` e `libil2cpp`, `UnityPlayer.initJni`, criação/troca de superfície,
foco, resume e loop nativo de render. Ele intercepta a plataforma; não pula
etapas nem substitui o ciclo de vida do jogo.

Em GPUs só-GLES2 (classe Mali-450) o port oferece a fachada GLES3 sobre
GLES2, traduz shaders para ESSL 100 e converte formatos de textura. Em GPUs
GLES3 (classe Mali-G31, SDL/KMSDRM) o mesmo binário usa a superfície lógica
GLES3 direto. O backbuffer final sai com alfa opaco para compositores de
framebuffer.

A seleção de fases se adapta ao drawable real do aparelho, sem presumir uma
tela Android larga. O `CanvasScaler` dessa cena usa o extremo de contenção
adequado à proporção atual, mantendo todo o canvas de referência 800x420
visível em 640x480, 1280x720 e telas mais largas. A política vale somente
nessa cena; o render do gameplay e os demais canvases continuam nativos. O
desenho do ponteiro e o toque injetado usam a mesma dimensão medida.

Os dois caminhos de apresentação executam o adapter pinado de prova de quadro
do nxgl 0.3.2 na fronteira real imediatamente anterior ao swap. A geração só
é aceita quando o backbuffer medido contém RGB visível com alfa diferente de
zero; processo vivo ou áudio funcionando jamais contam como prova de vídeo.

### Prova automática de controles no aparelho

Os controles são provados automaticamente no aparelho pelo framework
(nxinput 0.10.2 `nx-device-input-proof`, classe de evidência
`ON_DEVICE_AUTOMATED_INPUT_PROOF`): clones uinput fiéis ao pad real são criados
antes do SDL_Init do jogo por um helper que não faz parte deste pacote, a SDL
do firmware os admite com o mesmo GUID/mapping, e todo controle declarado,
`null`, `native`, bordas dos sticks, volta ao neutro, hotplug, chords
negativos e SELECT+START são exercitados pelo kernel e conferidos contra o
readback do runtime. O port abre todos os pads admitidos (`nxinput_padset`) e
o chord de saída só vale quando SELECT e START vêm do mesmo pad. Nenhum
harness de teste vive neste executável.

### Controles — a rota do mapping soberano

O port usa sempre a **SDL2 do próprio firmware** (provider PortMaster —
nenhuma SDL privada acompanha o ZIP). A costura C6 do nxinput 0.10.1 roda
**in-process** dentro do loader (`vendor/nxinput/engine-glue/nxc6_glue.c`
compilado no binário): todo pad é admitido antes do `SDL_GameControllerOpen`,
pela ordem canônica de autoridades sobre o mapping PortMaster do próprio CFW —
sem chute posicional, sem evdev cru, sem troca A/B heurística, sem regra por
nome de aparelho ou VID/PID. O pad é descoberto por capacidade (um controle
sem `ABS_X/ABS_Y` continua sendo controle), ordinais joydev só são projetados
quando as capabilities do nó de evento provam esse domínio, e o bundle da
autoridade 3 embarcado no ZIP (`controllers.nxb` mais o par
`controllers-modern.nxb`/`controllers-retro.nxb` escolhido pelo `FACE_LAYOUT`)
só responde quando nenhuma autoridade viva responde.

O `NEXTOSCONTROLLERS.gptk` (formato `NEXTOS_CONTROLLERS/3`) é **runtime**, não
documentação: é lido uma vez antes de qualquer subsistema SDL, toda ação
mapeada tem um sink real, e o runtime só consome um controle depois que a
própria engine provou o contexto:

| Estado da engine (provado via IL2CPP, nunca presumido) | Contexto |
|---|---|
| Menu de pause, painel de checkpoint ou popup aberto | `[menu]` |
| Jogador vivo com controle habilitado | `[gameplay]` |
| Jogador vivo com controle travado (cutscene/diálogo) | `[menu]` |
| Sem jogador (título, seleção de fases) | `[menu]` |
| Contrato indisponível | passthrough (entrada Android nativa) |

Mapa default (edite a cópia do dono ao lado do jogo para remapear; `null`
desliga um controle em todos os caminhos, `native` entrega-o à entrada Android
do próprio jogo):

| Controle | `[gameplay]` | `[menu]` |
|---|---|---|
| A | `player.jump` → `KEYCODE_BUTTON_A` (JoystickButton0) | `menu.accept` → a mesma tecla |
| B | `player.interact` → `KEYCODE_BUTTON_B` | native |
| Y | `player.down` → eixo para baixo | native |
| X, L1, R1, L3 | native | native |
| L2, R2 | `null` (o perfil móvel lê eixo de gatilho como pause) | `null` |
| START | `system.pause` → `UIManager.backButtonInGame()` do próprio jogo com uma fase viva; `KEYCODE_BUTTON_START` (JoystickButton10, o "10" do jogo) fora dela | igual |
| SELECT | native | native |
| D-pad | native: `KEYCODE_DPAD_*` + hat, espelhado nos eixos principais | native |
| Analógico esquerdo | `player.move` → `AXIS_X/AXIS_Y` (deadzone radial 0,15 com reescala) | native |
| Analógico direito | native | `cursor.move` (seta polida, cinemática do nxinput) |
| R3 | native | `cursor.click` (toque na seta; seta escondida só é revelada) |
| SELECT + START | chord soberano de saída (framework, fora do arquivo; instantâneo) | igual |

O A nunca é roubado para o ponteiro, o D-pad nunca move o ponteiro e nenhuma
outra combinação (L1+R1, L2+R2, GUIDE+START, START sozinho) encerra. Toda
tecla nativa é entregue por estado: uma tecla pressionada enquanto o seu dono
muda sempre recebe a soltura (nenhuma direção presa). Os prompts do jogo
continuam imprimindo os nomes legados da Unity (`10`, `axis -2`): o jogo não
consulta identidade de controle para glyphs, então esse texto é do jogo, não
do port.

### Dados e compilação

Nenhum dado do jogo acompanha o pacote. A receita NXExtract
(`extractor.json`) aceita o pacote do jogador por **conteúdo**: package ID,
contrato de versão, ABI, estrutura e SHA-256 por payload dos 19 arquivos
Unity e das três bibliotecas ARM64 originais. Um container legitimamente
renomeado/reempacotado com o mesmo conteúdo compatível é aceito; outro jogo
ou build incompatível falha fechado. Identidades exatas em
`INSTALLATION.md`.

```bash
cd ports/namelesscat
./build_universal.sh        # runtime do jogo (container offline Debian Buster)
```

Todo ELF produzido aqui exige no máximo `GLIBC_2.27` (teto público
`GLIBC_2.30`). As peças do framework são pinadas: launcher nxbootstrap
gerado, NXExtract 1.3.0, NXSplash 0.1.2, nxinput 0.10.1 (vendorizado em
`vendor/nxinput/` com pins SHA-256; ver `vendor/nxinput/PINS.json`).

### Mapa do código

- `src/main.c` — entrada do loader e lifecycle Unity-as-a-Library.
- `src/nx_elf.c` — mapeamento, relocação e ponte de símbolos ELF AArch64.
- `src/jni.c` / `src/android.c` — superfície de compatibilidade Java/Android.
- `src/egl.c` / `src/gles3.c` / `src/unity6_shader.c` — fachada GLES,
  apresentação e tradução de shaders.
- `src/audio.c` / `src/opensles_shim.c` — áudio FMOD/AudioTrack e OpenSL→SDL.
- `src/input.c` — staging da costura, controles físicos, pause nativo,
  ponteiro, clique contextual do A, canvas adaptativo da seleção de fases e
  política persistente sem anúncios.
- `src/viewport_policy.c` — política de contenção por proporção compartilhada
  pelo runtime e pela regressão de matriz de resoluções.
- `src/language.c` — snapshot único de locale com preferência salva no jogo.
- `vendor/nxinput/` — fontes pinadas do nxinput 0.10.1 para a costura C6
  in-process (glue de admissão compilada no loader).
- `vendor/nxgl/` — adapter nxgl 0.3.2 de prova pre-present pinado por bytes.
- `tests/input-lifecycle/` — regressão de botão segurado, soltura gerenciada,
  autoridade única e ciclo de vida dos toques sintéticos.

### Licenças

Código do port: GPL-3.0-only (`LICENSE`). NXSplash: MIT (`NXSPLASH-LICENSE`);
NXExtract: MIT (`licenses/NXExtract-MIT.txt`); SDL2: zlib
(`licenses/SDL2-zlib.txt`). Nameless Cat, suas bibliotecas originais, arte,
áudio e dados continuam propriedade da Kotoba Games. Nenhuma posse ou licença
sobre esses assets é concedida ou implicada.

## Download

- [namelesscat-v1.2.8](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/namelesscat-v1.2.8) — `namelesscat.zip`, `namelesscat.zip.sha256`
- [namelesscat-v1.2.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/namelesscat-v1.2.7) — `namelesscat.zip`

- Todas as versões / all versions: [releases?q=namelesscat](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=namelesscat)
- Histórico: 31 downloads no repositório original `namelesscat-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
