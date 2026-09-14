# Summertime Saga Preview — universal AArch64 BYO-data port

**Language / Idioma:** [English](#english) · [Português](#português)

**Package release / Versão do pacote:** 1.1.1

[Download the latest `summertimesaga.zip`](https://github.com/NextOs-Ports/summertimesaga-nextos/releases/latest) ·
[Installation / Instalação](INSTALLATION.md) ·
[NXExtract](https://github.com/NextOs-Ports/NXExtract)

> Adult visual novel — 18+ only. This is an independent clean-room
> compatibility loader: it does not distribute the game, its APK, artwork,
> audio, scripts or native library. Every image below is a real capture of
> the final package running on an R36S handheld (ArkOS, 640×480).

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

| Title & GL arrow cursor | Story prologue | Bedroom with full HUD |
| --- | --- | --- |
| ![Title on R36S](docs/images/r36s-title-640x480.png) | ![Story on R36S](docs/images/r36s-story-640x480.png) | ![Bedroom HUD on R36S](docs/images/r36s-bedroom-hud-640x480.png) |

| Dialogue | Free-roam | Town map (R1) |
| --- | --- | --- |
| ![Dialogue on R36S](docs/images/r36s-dialogue-640x480.png) | ![Free-roam on R36S](docs/images/r36s-freeroam-640x480.png) | ![Town map on R36S](docs/images/r36s-town-map-640x480.png) |

<details>
<summary>Native shortcut buttons in action / Botões nativos em ação (phone · backpack · saves)</summary>

| Phone (Y) | Backpack (L1) | Save written from the save screen (L2) |
| --- | --- | --- |
| ![Phone on R36S](docs/images/r36s-phone-640x480.png) | ![Backpack on R36S](docs/images/r36s-backpack-640x480.png) | ![Save slot on R36S](docs/images/r36s-save-slot-640x480.png) |

</details>

## English

This directory contains an independent AArch64 compatibility loader for the
free Android **Preview** build of Summertime Saga. It runs the original
`librenpython.so` and follows the Android/Ren'Py startup flow while adapting
graphics, audio, input and filesystem access for Linux handhelds.

### Download

Grab **`summertimesaga.zip`** from the
[latest release](https://github.com/NextOs-Ports/summertimesaga-nextos/releases/latest)
and extract it into your firmware's ports directory. Do not use GitHub's
**Code → Download ZIP** archive: that is source code without the compiled
loaders. On the Releases page, expand **Assets** and download the file named
exactly **`summertimesaga.zip`**.

The install ZIP is BYO-data. On first launch, NXExtract finds a legal Android
APK or bundle supplied by the user, verifies its contents, prepares the
filesystem layout transactionally and starts the game. The current reference
payload is **21.0.0-wip.7722** (`numeric_version` 7723, Ren'Py 8.5.3).

### Targets

| Target | Loader | ABI / glibc policy | Cursor |
|---|---|---|---|
| NextOS / NextOS Elite | `summertimesaga-nextos` | AArch64, current NextOS sysroot | Mali-450 OSD2 hardware arrow when available; GL overlay arrow otherwise |
| ArkOS / R36S | `summertimesaga-r36s` | AArch64, no requirement above GLIBC 2.30 | Anti-aliased GL overlay arrow |
| Newer AArch64 Mali devices | selected by OS at runtime | NextOS or compatibility build | Anti-aliased GL overlay arrow |

The NextOS and compatibility binaries are intentionally separate. The
launcher chooses the NextOS build only when `/etc/os-release` identifies
NextOS; every other supported AArch64 firmware receives the compatibility
build.

### Compatibility

Physically validated:

- **ArkOS on R36S-class handhelds** (RK3326 / Mali-G31, 640 MB RAM, 640×480):
  full session — instant marker boot, title, prologue, free-roam across
  rooms, phone/backpack/map/save shortcuts, save slot written, ALSA audio
  and clean Select+Start exit (including the RG351/GO-Super
  `BTN_TRIGGER_HAPPY` function buttons);
- **NextOS on Amlogic Mali-450** (1 GB): the validated OSD2 hardware-cursor
  route with the ETC1 dual-layer texture path.

The compatibility loader is also structured for other PortMaster-class
AArch64 firmware that provides glibc 2.28+, SDL2 and GLES2/GLES3 — those are
compatible targets, not claims of physical testing. The GPU/texture profile
adapts at runtime from the measured GLES context and physical memory
(`gles3-high` → `gles3-mid` → `lowmem` → `ultra-lowmem` for 640 MB devices).

### Data installation and updates

1. Extract `summertimesaga.zip` into the firmware's ports directory.
2. Put the official Android Preview APK in
   `summertimesaga/gamedata/`. Its filename does not matter.
3. Launch `Summertime Saga.sh`.

NXExtract accepts `.apk`, `.apks`, `.apkm` and `.xapk` inputs, including split
bundles, and chooses the AArch64 payload by content rather than by filename.
It never modifies the source package. The live installation is replaced only
after extraction, hook processing and all validations succeed.

For a later compatible Preview build, place the new package anywhere and run:

```sh
./tools/update-game-data.sh /path/to/new-package.apk
```

The explicit update command uses `--force-source`: the old working data stays
live until the new transaction is complete. A normal launch uses the validated
marker and starts immediately.

The recipe deliberately avoids pinning one APK hash. It accepts the official
package identity `com.kompasproductions.summertimesaga`, Preview generation 21
or newer, `numeric_version` 7723 or newer, AArch64 `librenpython.so`, and the
known Ren'Py 8.5.x data format starting at 8.5.3. A future build that changes
the engine line or required structure is rejected with a clear error instead
of risking the installed copy. The legacy 0.20.x release uses a different
engine/data layout and is not supported by this package.

### Architecture

The native loader maps the Android AArch64 library, resolves Bionic-facing
imports, creates the SDL/EGL context and calls the same Ren'Py native entry
sequence used by Android. The Python runtime then reads the extracted
filesystem-backed assets through a small `android.apk` adapter.

NXExtract performs four stages:

1. identify a compatible package and select `arm64-v8a`;
2. stage `librenpython.so` and `assets/` with size, ELF and path checks;
3. validate package/version metadata, remove the APK's `x-` path prefixes,
   build a deterministic game index and apply the two runtime compatibility
   overrides;
4. atomically commit the new data and write
   `.nxextract-summertimesaga.json`.

The port keeps the native flow intact. It does not skip Ren'Py bootstrap,
manufacture a fixed APK path, force a display/audio backend or restart the
frontend itself.

### Solved compatibility problems

- Android Bionic imports and Java/JNI surface are provided by the native
  AArch64 so-loader.
- SDL, EGL and GLES are negotiated against the target firmware.
- The legacy `glDrawTexfOES` import is resolved only when the GLES1 driver
  provides it, so Mesa/Panfrost firmwares can start the GLES2 renderer.
- Android SDL/JNI PCM is routed through the firmware's PulseAudio or ALSA
  tools. An inherited PulseAudio-only ROCKNIX selection escapes to ALSA before
  opening the server backend, and an automatic `pacat` failure can recover
  once through `aplay`.
- ETC1 alpha is reconstructed as two texture layers, substantially reducing
  memory pressure during long dialogue sequences on 1 GB Mali-450 devices.
- Texture size, prediction and garbage-collection limits are tuned for the
  handheld memory budget.
- Android's prefixed `x-game/x-saga` modules are rebuilt dynamically, so the
  extractor does not depend on a hard-coded list from one beta.
- On the tested NextOS S905X5M route, NXExtract uses the firmware's native
  SDL2/KMSDRM stack in a clean process scope. Game or compatibility-library
  paths cannot interpose another SDL2 and hide the first-run UI behind a black
  screen.
- Input comes directly from evdev and is normalized to an Xbox-style layout.
- The GPU/texture profile is decided at runtime from the real GLES context and
  physical memory (SOR4/Horizon Chase rule): strong GLES3 devices keep full
  textures, while 1 GB GLES2 devices keep the Mali-450 ETC1/16-bit path.
  Every variable remains an engineering override.
- One classic anti-aliased arrow (black outline, white core, soft shadow,
  red on hover) is pre-rasterized at build time. Mali-450 shows it through
  the validated Amlogic OSD2 hardware layer; every other GPU draws it as a
  premultiplied textured quad right before each swap, with full GL state
  save/restore so the engine never notices.
- The launcher locks the port, enumerates old loader processes by executable,
  command line and working directory, terminates them, and confirms they are
  gone before a new launch.

### Controls

| Control | Action |
|---|---|
| Left stick / D-pad | Move the virtual pointer (axis, hat and key-based D-pads) |
| Bottom face button | Click / confirm |
| Right face button | Universal back (Android BACK — closes phone, backpack, map, dialogs) |
| Left face button | Keyboard Enter — submits text screens (character name) |
| Y (top) | Phone |
| L1 / R1 | Backpack (inventory) / Town map |
| L2 / R2 | Save screen / Quick save |
| Start | Menu |
| Select + Start | Clean exit |

Exact 4:3 panels (including 640x480) fill the display by default. Set
`SUMMERTIME_DISPLAY_MODE=fit` before launch to preserve 16:9 with letterboxing.
Pointer motion is automatically 20% slower on 640x480-class panels and can be
overridden with `SUMMERTIME_CURSOR_SCALE` (`1.00` is the original speed).
Audio selection is automatic. `SUMMERTIME_AUDIO_DRIVER=pulse|alsa|none` makes
an explicit diagnostic choice; `SUMMERTIME_AUDIO_KEEP_INHERITED_PULSE=1`
disables the ROCKNIX Pulse-to-ALSA escape for engineering tests.

The shortcut buttons are tap macros defined in `summertimesaga.gptk`
(`button = tap:X,Y`, normalized to the game's 16:9 area): the pointer jumps
to the HUD element and clicks. Edit or add your own without rebuilding.

The physical-to-game mapping is editable in `summertimesaga.gptk`; no rebuild
is required.

### Saves, logs and recovery

- Saves: `summertimesaga/saves/`
- Runtime logs: `summertimesaga/logs/`
- Launcher log: `summertimesaga/debug.log`
- Extractor log: `summertimesaga/nxextract.log`
- User data drop folder: `summertimesaga/gamedata/`

Deleting the NXExtract marker does not delete game data. Use
`tools/update-game-data.sh` for an intentional replacement. Failed updates
leave the previously committed payload available.

### Build

```sh
# from the port source root
./build_universal.sh
./package/build-portmaster-package.sh
```

Packaging expects the open [NXExtract](https://github.com/NextOs-Ports/NXExtract)
checkout next to the source tree (or `SS_NXEXTRACT_DIR`), with its UI built.

`build.sh` compiles the NextOS loader against the current NextOS
toolchain/sysroot and audits its glibc requirements. `build_r36s.sh` builds the
compatibility loader in Debian Buster and rejects any result above
`GLIBC_2.30`. The package builder repeats the ELF/TLS/glibc audits, validates
all scripts and metadata, rejects game/development data, and creates a
deterministic ZIP plus SHA-256 file.

### Source map

- `src/main.c` — process setup, original Ren'Py/Android entry flow and native
  library loading.
- `src/imports.c` — Bionic-to-glibc imports and filesystem compatibility.
- `src/jni_shim.c` — minimal Android/JNI environment.
- `src/egl_shim.c` — SDL/EGL/GLES window and swap integration.
- `src/opensles_shim.c`, `src/audio.c`, `src/audio_backend_policy.c` — Android
  audio bridge, host sink and capability-based PulseAudio/ALSA selection.
- `src/input.c` — evdev controller, virtual pointer and Mali-450 OSD2 cursor.
- `src/etc1.c` — ETC1 dual-layer alpha reconstruction and memory path.
- `main.py`, `renpy/` — open Ren'Py 8.5.3 runtime with port patches.
- `android/`, `jnius/` — filesystem-backed Android/JNI Python adapters.
- `tools/prepare_summertime_data.py` — package identity/version check,
  de-prefixing, index generation and runtime metadata.
- `runtime-overrides/` — two compatibility modules applied to staged game
  data.
- `extractor.json` — NXExtract compatibility contract.
- `nxextract-runtime-env.sh` — exact X5M detection and the native firmware-SDL
  process boundary used by first installs and future updates.
- `run.sh`, `Summertime Saga.sh` — device and frontend launch lifecycle.

### Licensing and game data

The compatibility loader is GPL-3.0. NXExtract, Ren'Py, python-ecdsa and six
retain their respective free-software notices in `licenses/`. The release
also includes the preferred source for the loader and the modified open
runtime.

Summertime Saga and all files extracted from its Android distribution remain
works of Kompas Productions and their contributors. They are not licensed as
part of this port and are never included in the release ZIP. This project is
independent and is not endorsed by Kompas Productions or the Ren'Py project.

## Português

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

### Download

Baixe **`summertimesaga.zip`** na
[última release](https://github.com/NextOs-Ports/summertimesaga-nextos/releases/latest)
e extraia na pasta de ports do sistema. Não use o **Code → Download ZIP** do
GitHub: aquilo é código-fonte, sem os loaders compilados. Na página de
Releases, abra **Assets** e baixe o arquivo chamado exatamente
**`summertimesaga.zip`**.

Este diretório contém um loader de compatibilidade AArch64 independente para a
versão Android **Preview** gratuita de Summertime Saga. Ele executa a
`librenpython.so` original e preserva a sequência de inicialização
Android/Ren'Py, adaptando vídeo, áudio, controle e arquivos aos portáteis
Linux.

O ZIP é BYO-data: não contém APK nem dados do jogo. Na primeira abertura, o
NXExtract encontra o APK ou bundle legal fornecido pelo usuário, confere o
conteúdo, prepara tudo de forma transacional e só então inicia o jogo. A
referência atual é a **21.0.0-wip.7722** (`numeric_version` 7723, Ren'Py
8.5.3).

### Alvos

| Alvo | Loader | Política de ABI / glibc | Cursor |
|---|---|---|---|
| NextOS / NextOS Elite | `summertimesaga-nextos` | AArch64, sysroot atual do NextOS | seta de HARDWARE (OSD2) no Mali-450; seta GL nos demais |
| ArkOS / R36S | `summertimesaga-r36s` | AArch64, sem requisito acima de GLIBC 2.30 | seta anti-aliased desenhada por GL |
| Mali AArch64 mais novo | escolhido em runtime | build NextOS ou compatível | seta anti-aliased desenhada por GL |

Os binários são separados de propósito. O launcher escolhe a build NextOS
somente quando `/etc/os-release` identifica o NextOS; nos outros firmwares
AArch64 suportados, usa a build compatível.

### Compatibilidade

Validado fisicamente:

- **ArkOS em portáteis classe R36S** (RK3326 / Mali-G31, 640 MB de RAM,
  640×480): sessão completa — boot instantâneo pelo marker, título, prólogo,
  free-roam entre salas, atalhos de telefone/mochila/mapa/save, save gravado
  em slot, áudio ALSA e saída limpa por Select+Start (incluindo os botões de
  função `BTN_TRIGGER_HAPPY` da família RG351/GO-Super);
- **NextOS em Amlogic Mali-450** (1 GB): a rota validada do cursor de
  hardware OSD2 com o caminho de texturas ETC1 dupla-camada.

O loader também está estruturado para outros firmwares AArch64 classe
PortMaster com glibc 2.28+, SDL2 e GLES2/GLES3 — alvos compatíveis, sem
alegação de teste físico. O perfil de GPU/texturas se adapta em runtime pelo
contexto GLES medido e pela memória física (`gles3-high` → `gles3-mid` →
`lowmem` → `ultra-lowmem` para aparelhos de 640 MB).

### Instalação e atualização dos dados

1. Extraia `summertimesaga.zip` na pasta de ports do sistema.
2. Coloque o APK Preview oficial em `summertimesaga/gamedata/`. O nome do
   arquivo pode ser qualquer um.
3. Abra `Summertime Saga.sh`.

O NXExtract aceita `.apk`, `.apks`, `.apkm` e `.xapk`, inclusive bundles com
splits. Ele identifica o conteúdo e escolhe `arm64-v8a` sem depender do nome do
arquivo. A fonte nunca é alterada, e a instalação ativa só é trocada após
extração, preparação e validação completas.

Para instalar uma Preview compatível mais nova:

```sh
./tools/update-game-data.sh /caminho/para/o-novo-pacote.apk
```

Esse comando usa `--force-source`: os dados antigos continuam válidos até a
nova transação terminar. A abertura normal usa o marcador já validado e inicia
sem reextrair.

A receita não fixa o hash de um único APK. Ela aceita a identidade oficial
`com.kompasproductions.summertimesaga`, geração Preview 21 ou superior,
`numeric_version` 7723 ou superior, `librenpython.so` AArch64 e o formato
conhecido Ren'Py 8.5.x a partir da 8.5.3. Se uma futura versão mudar a linha da
engine ou a estrutura obrigatória, o extrator rejeita com erro claro e
preserva a instalação anterior. A versão antiga 0.20.x usa outro
motor/layout e não é compatível com este pacote.

### Arquitetura

O loader nativo mapeia a biblioteca Android AArch64, resolve imports voltados
ao Bionic, cria o contexto SDL/EGL e segue a mesma entrada nativa do Ren'Py no
Android. O runtime Python passa a ler os assets extraídos pelo adaptador
`android.apk`.

O NXExtract:

1. identifica um pacote compatível e seleciona `arm64-v8a`;
2. prepara `librenpython.so` e `assets/` com checagens de tamanho, ELF e
   caminhos;
3. valida identidade/versão, remove dinamicamente os prefixos `x-`, gera um
   índice determinístico e aplica dois overrides de compatibilidade;
4. publica os dados de forma atômica e grava
   `.nxextract-summertimesaga.json`.

O port preserva o fluxo nativo: não pula o bootstrap do Ren'Py, não inventa um
nome fixo de APK, não força backend de vídeo/áudio e não reinicia o frontend.

### Problemas resolvidos

- Imports Android/Bionic e superfície Java/JNI implementados pelo so-loader.
- Negociação de SDL, EGL e GLES com o firmware presente.
- O import legado `glDrawTexfOES` só é resolvido quando o driver GLES1 o
  oferece, permitindo iniciar o renderer GLES2 em firmwares Mesa/Panfrost.
- PCM do SDL/JNI Android redirecionado pelas ferramentas PulseAudio ou ALSA do
  firmware. Uma seleção PulseAudio herdada no ROCKNIX escapa para ALSA antes de
  abrir o servidor, e uma falha automática do `pacat` pode se recuperar uma vez
  pelo `aplay`.
- Alpha ETC1 reconstruído em duas camadas, reduzindo bastante o pico de
  memória nas conversas longas em aparelhos Mali-450 de 1 GB.
- Limites de textura, previsão e garbage collector ajustados para o orçamento
  de memória.
- Árvore `x-game/x-saga` reconstruída dinamicamente, sem lista congelada de
  uma única beta.
- No NextOS S905X5M validado, o NXExtract usa SDL2/KMSDRM nativo do firmware
  em um processo com ambiente limpo. Bibliotecas do jogo ou de compatibilidade
  não podem mais esconder a interface da primeira execução atrás de uma tela
  preta.
- Controle lido por evdev e normalizado no padrão Xbox.
- Perfil de GPU/texturas decidido em runtime pelo contexto GLES real e pela
  memória física (regra SOR4/Horizon Chase): GLES3 com memória mantém as
  texturas cheias; aparelhos GLES2 de 1 GB mantêm o caminho ETC1/16-bit do
  Mali-450. Toda variável continua servindo de override de engenharia.
- Uma única seta clássica anti-aliased (contorno preto, núcleo branco, sombra
  suave, vermelha no hover) é pré-rasterizada no build. No Mali-450 ela sai
  pela camada de hardware OSD2 já validada; nas outras GPUs é um quad
  texturizado premultiplicado desenhado antes de cada swap, com salvamento e
  restauração completos do estado GL.
- Proteção contra duas instâncias: o launcher procura pelo executável, linha
  de comando e diretório de trabalho, encerra a anterior e confirma a saída.

### Controles

| Controle | Ação |
|---|---|
| Analógico esquerdo / Direcional | mover o ponteiro (eixo, hat e direcional por teclas) |
| Botão inferior | clicar / confirmar |
| Botão direito | VOLTAR universal (BACK do Android — fecha telefone, mochila, mapa, diálogos) |
| Botão esquerdo | Enter de teclado — submete telas de texto (nome do personagem) |
| Y (topo) | Telefone |
| L1 / R1 | Mochila (inventário) / Mapa da cidade |
| L2 / R2 | Tela de saves / Quick save |
| Start | menu |
| Select + Start | sair de forma limpa |

Painéis 4:3 exatos (incluindo 640x480) preenchem a tela por padrão. Defina
`SUMMERTIME_DISPLAY_MODE=fit` antes de abrir para preservar 16:9 com barras.
O ponteiro fica automaticamente 20% mais lento em painéis da classe 640x480;
`SUMMERTIME_CURSOR_SCALE` permite ajustar (`1.00` restaura a velocidade antiga).
O áudio é selecionado automaticamente. `SUMMERTIME_AUDIO_DRIVER=pulse|alsa|none`
força uma rota de diagnóstico; `SUMMERTIME_AUDIO_KEEP_INHERITED_PULSE=1`
desativa o escape Pulse→ALSA do ROCKNIX para testes de engenharia.

Os atalhos são macros de toque definidas em `summertimesaga.gptk`
(`botao = tap:X,Y`, normalizado na área 16:9 do jogo): a seta pula até o
elemento do HUD e clica. Dá para editar ou criar novos sem recompilar.

O mapeamento físico pode ser alterado em `summertimesaga.gptk` sem recompilar.

### Saves e diagnóstico

- Saves: `summertimesaga/saves/`
- Logs do runtime: `summertimesaga/logs/`
- Log do launcher: `summertimesaga/debug.log`
- Log do extrator: `summertimesaga/nxextract.log`
- Pasta para o APK/bundle: `summertimesaga/gamedata/`

Uma atualização que falha não substitui os dados que já funcionavam.

### Compilar e empacotar

```sh
# a partir da raiz do código do port
./build_universal.sh
./package/build-portmaster-package.sh
```

O empacotamento espera o [NXExtract](https://github.com/NextOs-Ports/NXExtract)
aberto ao lado da árvore de código (ou `SS_NXEXTRACT_DIR`), com a UI compilada.

`build.sh` usa o toolchain/sysroot atual do NextOS e audita a glibc.
`build_r36s.sh` usa Debian Buster e rejeita qualquer ELF acima de
`GLIBC_2.30`. O empacotador repete as auditorias de ELF/TLS/glibc, valida
scripts e metadados, impede a entrada de dados do jogo ou artefatos de teste e
produz ZIP determinístico com SHA-256.

### Mapa do código e licenças

`src/` contém o so-loader, JNI, EGL/GLES, áudio, entrada e ETC1; `main.py` e
`renpy/` são o runtime aberto com os patches do port; `android/` e `jnius/`
são adaptadores Python; `tools/prepare_summertime_data.py` e
`extractor.json` definem a instalação evolutiva;
`nxextract-runtime-env.sh` isola a SDL nativa do extrator no X5M; `run.sh` e
`Summertime Saga.sh` cuidam do ciclo de vida no aparelho.

O loader é GPL-3.0. NXExtract, Ren'Py, python-ecdsa e six mantêm seus avisos em
`licenses/`, e o pacote inclui o código-fonte preferido do loader e do runtime
aberto modificado.

Summertime Saga e tudo que é extraído da distribuição Android pertencem à
Kompas Productions e seus colaboradores. Esses dados não fazem parte da
licença do port e não entram no ZIP. Este é um projeto independente, sem
afiliação ou endosso da Kompas Productions ou do projeto Ren'Py.

## Download

- [summertimesaga-v1.1.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/summertimesaga-v1.1.1) — `summertimesaga.zip`, `summertimesaga.zip.sha256`
- [summertimesaga-v1.1.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/summertimesaga-v1.1.0) — `summertimesaga.zip`, `summertimesaga.zip.sha256`

- Todas as versões / all versions: [releases?q=summertimesaga](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=summertimesaga)
- Histórico: 287 downloads no repositório original `summertimesaga-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
