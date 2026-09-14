# Chrono Trigger 1.0.8 — nxbootstrap 0.6.6

A native Linux port of the Android release of **Chrono Trigger** (Cocos2d-x
3.14.1, GLES2) for retro handhelds. The port is a **compatibility loader**: it
maps the game's original AArch64 Android libraries into a Linux process,
replaces the Android runtime they expect (JNI, OpenSL ES, asset manager,
`Cocos2dxBitmap` text rendering) and drives the Cocos2d-x render loop on the
firmware's own SDL2/EGL/GLES2.

This release uses the canonical self-contained `nxbootstrap 0.6.6` launcher.
Its instance lock works without the external `stat` command used by older
launchers, while retaining owner, regular-file, hardlink and inode checks.
`nxbootstrap` owns the bounded process lifecycle, `nxcompat`
measures capabilities, `nxloader` maps the Android ELFs, `nxgl` opens and
reports the real GLES2 drawable, `nxinput` owns controller discovery/hotplug,
and `nxaudio` records the SDL output opened by the game's OpenSL ES bridge.
Chrono-specific JNI, assets, callbacks and lifecycle order remain in the
adapter; the common framework never invents them.

**No game data is distributed here.** You supply the Chrono Trigger APK you
legally own; the bundled installer (NXExtract) extracts, validates and
publishes it on the device.

## Screenshots

Captured straight off a real handheld running this port — real hardware, no
upscaling or mock-ups:

| | |
|---|---|
| ![Title](screenshots/01-title.png) | ![Menu](screenshots/02-menu.png) |
| ![Gameplay](screenshots/03-gameplay.png) | ![Crono's house](screenshots/04-crono-house.png) |
| ![In-game menu](screenshots/05-ingame-menu.png) | |

---

## Community

Questions, device reports and bug reports: <https://discord.gg/DHfY62eDNN>

## Install

See [INSTALLATION.md](INSTALLATION.md) for the full walkthrough. Short version:

1. unzip into your firmware's `ports/` folder;
2. drop your own Chrono Trigger APK (arm64) into `chrono/gamedata/`;
3. launch **Chrono Trigger** from the Ports menu.

## Devices

Support is stated by **level of evidence**, never as "all devices".

| Device / firmware | Video | Evidence |
|---|---|---|
| R36S / RG351MP class — ArkOS (AArch64, glibc 2.30, KMSDRM, 640×480, 639 MB RAM) | KMSDRM + GLES2 | exact 1.0.3 framework ZIP accepted in M22; ALSA, native input and clean shutdown verified |
| NextOS Elite (Amlogic, Mali-450 fbdev, 1280×720) | SDL `mali` + GLES2 | exact 1.0.3 framework ZIP accepted in M22; PulseAudio, native input and clean shutdown verified |
| Other AArch64 CFWs with SDL2 + GLES2 + FreeType (ROCKNIX, muOS, Knulli/Batocera on 64-bit userland) | detected at runtime | **route designed, not yet validated** — the launcher probes and reports; device reports welcome on Discord |
| Any **32-bit (ARMHF) userland** | — | **not supported.** The original game libraries exist only as `arm64-v8a`; there is no 32-bit build to load. The launcher refuses to start and says so. |

Nothing here is chosen by device name: the runtime detects the ROM root, the
real drawable size, the SDL video/audio backend the firmware opened, the pad
mapping supplied by PortMaster, and adapts.

### Native order and ownership

The adapter preserves the Android order rather than replacing it:

1. load/relocate/finalize `libc++_shared.so` and run its initializers;
2. load/relocate `libchrono.so`, install the proven hooks, then finalize it;
3. run its initializer array exactly once and call literal `JNI_OnLoad` with
   the fake VM, accepting its proven literal JNI 1.4 return;
4. publish APK/assets/context, call `nativeInit`, then `nativeOnResume`;
5. pump SDL events through both `nxinput` and the engine's native controller
   callbacks, render, and present through the measured `nxgl` policy;
6. on every terminal request call `nativeOnPause`, preserve the game save path,
   close input/graphics and only then leave SDL.

The alpha-one and finish-before-swap quirks are declared for this game but are
enabled only when the opened stack reports the matching measured condition.
No device or firmware name selects a graphics or audio backend.

### Performance

Measured on an R36S (Cortex-A35, Mali-G31, 640×480): **58–60 fps** in menus and
indoor scenes, **~37 fps** on the overworld, which is where the engine is
heaviest on this hardware. Peak resident memory is **350 MB of 639 MB**, so no
texture or scale workaround is needed.

## Controls

Native pad through the game's own `GameController` path — Xbox layout.

| Input | Action |
|---|---|
| D-pad / left stick | navigate, move |
| A | confirm |
| B | cancel |
| X / Y / L / R | as mapped by the game |
| **SELECT + START** | quit (through the game's pause/save path) |

`SELECT + START` also works on handhelds that wire those buttons as
`TRIGGER_HAPPY1/2`, because the exit chord is read from evdev as well as from
SDL. `SIGTERM` from the frontend takes the same shutdown path.

The port does **not** run `gptokeyb`: a key mapper on top would steal the pad
from the native controller path.

## Language

The Android game selects its string table through a region code. Edit only the
following line near the top of `Chrono Trigger.sh`:

```bash
GAME_LANGUAGE="en"
```

Supported values are `en` (English) and `ja` (Japanese). The framework
validates the value and exports `NXPORT_LANGUAGE`; the Chrono adapter converts
it to the original game's exact region code. It does not infer a language from
the host's global locale.

## Build

```bash
./build_universal.sh     # public AArch64 build, GLIBC <= 2.30 (Debian Buster container)
./package/build-package.sh   # audited public ZIP + SHA-256
```

`build_universal.sh` fails the build if any symbol above `GLIBC_2.30` appears,
if the Bionic TLS guard pad moves, or if an unexpected `DT_NEEDED` shows up.
SDL2, GLESv2 and FreeType are linked against SONAME-only stubs and resolved
from the target firmware at runtime.

### Source map

- `src/ct_framework.c` — common-framework integration and capability receipts;
- `src/main.c` — Chrono lifecycle and native Cocos2d-x callbacks;
- `src/jni_shim.c` — stable fake VM/environment and text-bitmap bridge;
- `src/opensles_shim.c` — game-owned OpenSL ES to SDL audio adapter;
- `src/imports.c` — explicit Bionic/Android import contracts;
- `Chrono Trigger.sh` and `nxport.json` — generated self-contained
  `nxbootstrap 0.6.6` launcher and declarative contract;
- `nxextract/` and `extractor.json` — pinned BYO-data extraction flow.

## Credits and licenses

The loader is GPL-3.0 (`LICENSE`). NXExtract is MIT
(`licenses/NXExtract-MIT.txt`), pinned in `nxextract-version.txt`. The bundled
UI font is Noto Sans under the SIL OFL 1.1 (`fonts/OFL.txt`) and stands in for
the Android system font the game expects but does not ship.

Chrono Trigger and all of its data are proprietary works of Square Enix and are
not distributed here. See [NOTICE.md](NOTICE.md).

---

# Português

Port nativo para Linux da versão Android de **Chrono Trigger** (Cocos2d-x
3.14.1, GLES2) para handhelds retro. O port é um **loader de compatibilidade**:
ele carrega as bibliotecas AArch64 originais do jogo dentro de um processo
Linux, substitui o runtime Android que elas esperam (JNI, OpenSL ES, asset
manager, o texto do `Cocos2dxBitmap`) e conduz o loop de render do Cocos2d-x
sobre o SDL2/EGL/GLES2 do próprio firmware.

Esta release usa o launcher autocontido canônico do `nxbootstrap 0.6.6`. O
lock de instância funciona sem o comando externo `stat` usado pelos launchers
anteriores, preservando as verificações de dono, arquivo regular, hardlinks e
identidade do inode. O `nxbootstrap` controla o ciclo de processo, o `nxcompat` mede as
capacidades, o `nxloader` mapeia os ELFs Android, o `nxgl` abre e registra o
drawable GLES2 real, o `nxinput` cuida da descoberta/hotplug dos controles e o
`nxaudio` registra a saída SDL aberta pela ponte OpenSL ES do jogo. JNI, assets,
callbacks e ordem de lifecycle específicos do Chrono continuam no adapter; o
framework comum não os inventa.

**Nenhum dado do jogo é distribuído aqui.** Você fornece o APK do Chrono
Trigger que possui legalmente; o instalador embutido (NXExtract) extrai, valida
e publica os dados no aparelho.

### Comunidade

Dúvidas, relatos de aparelho e bugs: <https://discord.gg/DHfY62eDNN>

### Instalação

Passo a passo completo em [INSTALLATION.md](INSTALLATION.md). Resumo:

1. descompacte na pasta `ports/` do seu firmware;
2. coloque o seu APK do Chrono Trigger (arm64) em `chrono/gamedata/`;
3. abra **Chrono Trigger** no menu Ports.

### Aparelhos

O suporte é declarado por **nível de evidência**, nunca como "todos os
aparelhos".

| Aparelho / firmware | Vídeo | Evidência |
|---|---|---|
| R36S / classe RG351MP — ArkOS (AArch64, glibc 2.30, KMSDRM, 640×480, 639 MB de RAM) | KMSDRM + GLES2 | ZIP exato 1.0.3 com framework aceito no M22; ALSA, input nativo e saída limpa conferidos |
| NextOS Elite (Amlogic, Mali-450 fbdev, 1280×720) | SDL `mali` + GLES2 | ZIP exato 1.0.3 com framework aceito no M22; PulseAudio, input nativo e saída limpa conferidos |
| Outros CFWs AArch64 com SDL2 + GLES2 + FreeType (ROCKNIX, muOS, Knulli/Batocera em userland 64 bits) | detectado em runtime | **rota projetada, ainda não validada** — o launcher sonda e registra; relatos são bem-vindos no Discord |
| Qualquer userland **32 bits (ARMHF)** | — | **não suportado.** As bibliotecas originais do jogo só existem em `arm64-v8a`; não há build 32 bits para carregar. O launcher recusa iniciar e explica o motivo. |

Nada aqui é escolhido pelo nome do aparelho: o runtime detecta a raiz de ROM, o
tamanho real do drawable, o backend de vídeo/áudio que o firmware abriu e o
mapeamento de controle entregue pelo PortMaster.

### Ordem nativa e responsabilidades

O adapter preserva a ordem Android em vez de substituí-la:

1. carrega/finaliza `libc++_shared.so` e executa seus initializers;
2. carrega/reloca `libchrono.so`, instala os hooks comprovados e só então o
   finaliza;
3. executa o initializer array uma vez e chama o `JNI_OnLoad` literal com a VM
   falsa, aceitando o retorno literal JNI 1.4 comprovado;
4. publica APK/assets/context, chama `nativeInit` e depois `nativeOnResume`;
5. encaminha eventos pelo `nxinput` e pelos callbacks nativos da engine,
   renderiza e apresenta pela política medida do `nxgl`;
6. em qualquer saída chama `nativeOnPause`, preserva o save nativo, fecha
   input/gráficos e somente então encerra o SDL.

As quirks de alpha um e finish-before-swap são declaradas para o jogo, mas só
entram quando o stack aberto comprova a condição correspondente. Nome de
aparelho ou firmware nunca escolhe backend de vídeo ou áudio.

### Desempenho

Medido num R36S (Cortex-A35, Mali-G31, 640×480): **58–60 fps** nos menus e nas
cenas internas, **~37 fps** no mapa-múndi, que é onde a engine pesa mais nesse
hardware. O pico de memória residente é de **350 MB de 639 MB**, então nenhuma
gambiarra de textura ou de escala foi necessária.

### Controles

Controle nativo pelo caminho `GameController` do próprio jogo — padrão Xbox.

| Comando | Ação |
|---|---|
| Direcional / analógico esquerdo | navegar, andar |
| A | confirmar |
| B | cancelar |
| X / Y / L / R | conforme o jogo mapeia |
| **SELECT + START** | sair (pelo caminho de pausa/save do jogo) |

`SELECT + START` funciona também nos handhelds que ligam esses botões como
`TRIGGER_HAPPY1/2`, porque o combo é lido do evdev além do SDL. O `SIGTERM` do
frontend percorre o mesmo caminho de saída.

O port **não** usa `gptokeyb`: um mapeador por cima roubaria o controle do
caminho nativo.

### Idioma

O jogo Android escolhe sua tabela de textos por um código de região. Edite
somente esta linha perto do início de `Chrono Trigger.sh`:

```bash
GAME_LANGUAGE="en"
```

Os valores suportados são `en` (inglês) e `ja` (japonês). O framework valida
o valor e exporta `NXPORT_LANGUAGE`; o adapter do Chrono o converte para o
código exato do jogo original. O locale global do sistema não é usado para
inventar outro idioma.

### Créditos e licenças

O loader é GPL-3.0 (`LICENSE`). O NXExtract é MIT
(`licenses/NXExtract-MIT.txt`), fixado em `nxextract-version.txt`. A fonte de
interface embutida é a Noto Sans sob a SIL OFL 1.1 (`fonts/OFL.txt`) e substitui
a fonte de sistema do Android que o jogo espera mas não distribui.

Chrono Trigger e todos os seus dados são obra proprietária da Square Enix e não
são distribuídos aqui. Veja [NOTICE.md](NOTICE.md).

### Mapa de fontes

- `src/ct_framework.c` — integração do framework e receipts de capacidade;
- `src/main.c` — lifecycle do Chrono e callbacks nativos do Cocos2d-x;
- `src/jni_shim.c` — VM/ambiente falsos estáveis e ponte de bitmap de texto;
- `src/opensles_shim.c` — adapter OpenSL ES para áudio SDL;
- `src/imports.c` — contratos explícitos de imports Bionic/Android;
- `Chrono Trigger.sh` e `nxport.json` — launcher autocontido gerado pelo
  `nxbootstrap 0.6.6` e contrato declarativo;
- `nxextract/` e `extractor.json` — extração BYO-data fixada por hash.

## Download

- [chrono-v1.1.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.1.2) — `chrono.zip`, `chrono.zip.sha256`
- [chrono-v1.1.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.1.1) — `chrono.zip`, `chrono.zip.sha256`
- [chrono-v1.1.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.1.0) — `chrono.zip`
- [chrono-v1.0.9](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.9) — `chrono.zip`, `SHA256SUMS.txt`
- [chrono-v1.0.8](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.8) — `Chrono.NextOS-v1.0.8.zip`, `Chrono.NextOS-v1.0.8.zip.sha256`
- [chrono-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.5) — `chrono-nextos-1.0.5.zip`, `chrono-nextos-1.0.5.zip.sha256`
- [chrono-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.4) — `chrono-nextos-1.0.4.zip`, `chrono-nextos-1.0.4.zip.sha256`
- [chrono-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.3) — `chrono-nextos-1.0.3.zip`, `chrono-nextos-1.0.3.zip.sha256`
- [chrono-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.2) — `chrono-nextos-1.0.2.zip`, `chrono-nextos-1.0.2.zip.sha256`
- [chrono-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.1) — `chrono-nextos-1.0.1.zip`, `chrono-nextos-1.0.1.zip.sha256`
- [chrono-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.0.0) — `chrono-nextos-1.0.0.zip`, `chrono-nextos-1.0.0.zip.sha256`

- Todas as versões / all versions: [releases?q=chrono](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=chrono)
- Histórico: 238 downloads no repositório original `chrono-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
