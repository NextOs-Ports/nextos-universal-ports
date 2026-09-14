# Hitman GO 1.18.1 — universal AArch64 Unity/IL2CPP port

[![Release](https://img.shields.io/github/v/release/NextOs-Ports/hitmango-nextos)](https://github.com/NextOs-Ports/hitmango-nextos/releases/latest)
[![License: GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](https://github.com/NextOs-Ports/hitmango-nextos/blob/master/LICENSE)

**Language / Idioma:** [English](#english) · [Português](#português)

This project is an independent compatibility loader. It does not distribute
Hitman GO's APK, Unity/IL2CPP libraries, art, music or any other proprietary
game data.

[Download the latest package / Baixar o pacote](https://github.com/NextOs-Ports/hitmango-nextos/releases/latest)

| | | |
|---|---|---|
| ![Title on R36T/ArkOS](docs/images/title-r36t.png) | ![Chapter select on NextOS Elite](docs/images/chapters-elite.png) | ![Level gameplay on R36T/ArkOS](docs/images/gameplay-r36t.png) |

## Community

Questions, bug reports, help getting the port running, and news about the next ones:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

---

Native AArch64 compatibility loader for the Android release of **Hitman GO**.
It runs the original Unity 2022.3.67f2 IL2CPP engine and game code directly on
Linux handhelds; it does not emulate Android and does not rebuild game logic.

Status: **playable**. Boot, legal/title screens, chapter selection, levels,
rendering, music/effects, saves, native board movement, touchscreen UI through
a gamepad cursor, restart, hints, pause/objectives and clean exit were validated
on a Mali-450 fbdev device (NextOS Elite) and on an ArkOS Mali-G31 device
(R36T-class clone). The cursor intentionally remains visible in menus, chapter
selection, during levels and after opening a hint.

This repository and its public ZIP contain only the open compatibility loader.
Game data comes from your own legitimate Hitman GO 1.18.1 Android copy: drop
your APK in `gamedata/` and the bundled NXExtract installs it transactionally
on first launch — see [INSTALLATION.md](INSTALLATION.md).

## Português

Loader de compatibilidade AArch64 nativo para o Hitman GO Android (Unity
2022.3 IL2CPP). Não emula Android nem distribui dados do jogo: coloque seu APK
legal (1.18.1, arm64) em `ports/hitmango/gamedata/` e o NXExtract embutido
valida e instala tudo na primeira abertura, com barra de progresso e sem nunca
apagar o seu arquivo — instruções completas em
[INSTALLATION.md](INSTALLATION.md).

Estado: **jogável** — boot, título, seleção de capítulos, níveis, movimento
nativo no tabuleiro, áudio, saves, dicas, pause e saída limpa validados no
NextOS Elite (Mali-450) e em clone R36T/ArkOS (Mali-G31). **SELECT+START**
salva e sai; o analógico direito é um cursor de fallback para a interface de
toque.

## English

### Architecture

The loader reproduces the game's Android launch sequence instead of bypassing
it:

1. maps the original `libmain.so`, `libunity.so`, `libil2cpp.so` and Firebase
   app library through a Bionic-to-glibc ELF compatibility layer;
2. executes constructors and `JNI_OnLoad` in Android order;
3. provides the Java/JNI surface, filesystem, preferences, display, input and
   FMOD `AudioTrack` objects expected by Unity;
4. follows Unity's `initJni`, surface-created, surface-changed, focus and resume
   lifecycle before entering `nativeRender`;
5. on exit, sends focus loss and `nativePause` before closing input and audio.

The original IL2CPP game remains in control of scene changes, rules, movement,
animation, saving and rendering.

### Solved platform gaps

- **Bionic ABI on glibc:** Android ELF loading, relocations, imports, pthread
  semantics and a guarded TLS compatibility area.
- **Unity 2022 on Mali-450/GLES2:** original EGL lifecycle with host framebuffer
  ownership and conservative GLES feature negotiation.
- **ETC2 alpha textures:** unsupported ETC2/EAC uploads are decoded to RGBA8888
  on the CPU; native ETC1/RGB24/RGBA32 data stays untouched.
- **Amlogic scanout alpha:** the default framebuffer alpha channel is forced to
  one immediately before swap while preserving Unity's GL state.
- **Android services:** narrowly scoped JNI implementations cover filesystem,
  locale, preferences, display, Firebase startup and Unity activity services.
- **Audio:** Unity's original FMOD mixer still produces PCM; a native thread
  mirrors Android's `FMODAudioDevice`/`AudioTrack` loop into SDL audio.
- **Controller:** InControl sees a real gamepad. Board movement is delivered as
  a short synthetic touch swipe over the game's own touch input manager, so the
  whole board stays clickable (rock aiming included); D-pad and right stick both
  steer it. The legacy tvOS/IL2CPP bridge remains behind
  `HGO_NATIVE_CONTROLS=1` for diagnostics.
- **Touch UI:** a polished arrow cursor injects Unity touch down/move/up events
  with correct display identifiers. It supports ordinary clicks and dragging.

Global NPOT wrap overrides are deliberately disabled. Texture sampler state is
left to the original game unless a specific proven compatibility conversion is
required.

### Controls

| Control | Action |
|---|---|
| D-pad / right stick | Move Agent 47 to an adjacent board node |
| Left stick | Move the persistent arrow cursor |
| A / Cross or R3 | Click at the cursor; hold and move for drag (throw rocks by clicking the highlighted target) |
| X / Square | Open the lamp/hint during a level |
| Y / Triangle | Restart the current level |
| Start | Open or close the pause/objectives screen |
| B / Circle | Android back; close overlays and trigger the game's native quit flow from Home |
| Select + Start | Cleanly exit through Unity's pause lifecycle |

### Required owner data

Use the ARM64 Android release **1.18.1**. Starting beside the public launcher:

```sh
mkdir -p hitmango/lib
unzip -q HitmanGO-1.18.1.apk 'assets/*' -d hitmango
unzip -q -j HitmanGO-1.18.1.apk \
  lib/arm64-v8a/libmain.so \
  lib/arm64-v8a/libunity.so \
  lib/arm64-v8a/libil2cpp.so \
  lib/arm64-v8a/libFirebaseCppApp-12_10_1.so \
  -d hitmango/lib
```

The installed layout is:

```text
Hitman GO.sh
hitmango/
  hitmango
  run.sh
  assets/bin/Data/...
  lib/libmain.so
  lib/libunity.so
  lib/libil2cpp.so
  lib/libFirebaseCppApp-12_10_1.so
  home/                         # created at runtime; saves/preferences
```

Do not flatten or recompress Unity's `assets/bin/Data` tree. Public packages do
not include any of these proprietary files.

### Build, package and run

```sh
# Current-firmware development build
make

# Public AArch64 build, audited for GLIBC <= 2.30
make universal

# Reproducible BYO-data ZIP plus SHA-256 sidecar
make package

# From an installed game directory
./run.sh
```

The universal build uses a Debian Buster AArch64 cross-toolchain in a container
and audits both the maximum glibc symbol version and the Bionic TLS guard-pad
layout. Packaging audits every staged executable again and rejects proprietary
game data, saves, diagnostics, personal paths and unexpected binaries.

### Diagnostic environment variables

| Variable | Purpose |
|---|---|
| `HGO_NATIVE_CONTROLS=1` | Re-enable the legacy tvOS/IL2CPP movement bridge (disables touch board play) |
| `HGO_SWIPE_MOVE=0` | Disable the synthetic swipe walker |
| `HGO_SWAP_STICKS=0` | Cursor back on the right stick, movement on the left |
| `HGO_CURSOR=0` | Disable the arrow cursor |
| `HGO_AUDIO_DRIVER=name` | Request a specific SDL audio backend |
| `HGO_NO_AUDIO=1` | Disable the FMOD-to-SDL audio thread |
| `HGO_VERBOSE=1` | Enable loader diagnostics |
| `HGO_LOGCAT=1` | Mirror the game's Android log output |
| `HGO_JNILOG=1` | Trace every JNI call; very noisy |
| `HGO_GLLOG=1` | Trace GL calls and shaders; very noisy |
| `HGO_INPUT_DIAG=1` | Trace native movements and UI shortcuts |
| `HGO_FRAMES=N` | Stop after `N` render frames for automated tests |

The launchers intentionally do not force an SDL video/audio backend and do not
manage the frontend service.

### Source map

- `src/main.c` — exact Unity/Android lifecycle and render loop.
- `src/nx_elf.*` — ARM64 Android ELF mapping and relocation.
- `src/bionic.c`, `src/pthread_bridge.c` — Bionic/glibc compatibility.
- `src/jni.c`, `src/android.c` — Java/JNI objects and Android services.
- `src/egl.c`, `src/egl_sdl.*` — EGL/GLES bridge, compatibility hooks, cursor
  rendering, opaque scanout and capture diagnostics.
- `src/etc2_decode.*` — ETC2/EAC software fallback.
- `src/input.c` — InControl bridge, native board movement, cursor and shortcuts.
- `src/audio.c` — Unity FMOD `AudioTrack` to SDL audio bridge.
- `run.sh` — runtime validation, stale-process protection and launch.
- `build_universal.sh` — low-glibc public build and TLS audit.
- `package/build-package.sh` — reproducible, proprietary-data-free ZIP gate.

### Licenses

The compatibility loader is GPL-3.0; see `LICENSE` and `NOTICE.md`. SDL2, EGL,
GLES, zlib and firmware libraries remain under their own licenses. Hitman GO
and every extracted owner-data file remain proprietary and are not licensed or
distributed by this project.

## Português

### Arquitetura

O loader reproduz a inicialização Android do jogo em vez de pular etapas:

1. mapeia `libmain.so`, `libunity.so`, `libil2cpp.so` e a biblioteca Firebase
   originais por uma camada de compatibilidade ELF Bionic/glibc;
2. executa construtores e `JNI_OnLoad` na ordem do Android;
3. fornece os objetos Java/JNI de superfície, arquivos, preferências, tela,
   controle e `AudioTrack` que a Unity espera;
4. segue `initJni`, surface-created, surface-changed, foco e resume antes do
   loop `nativeRender`;
5. ao sair, envia perda de foco e `nativePause`, depois fecha controle e áudio.

O IL2CPP original continua comandando fases, regras, movimentos, animação,
saves e renderização.

### Problemas resolvidos

- **ABI Bionic sobre glibc:** loader ELF Android, relocations, imports, pthreads
  e uma área TLS protegida para compatibilidade.
- **Unity 2022 no Mali-450/GLES2:** lifecycle EGL original, framebuffer fbdev e
  negociação conservadora dos recursos GLES.
- **Texturas ETC2 com alpha:** uploads ETC2/EAC sem suporte são convertidos na
  CPU para RGBA8888; ETC1/RGB24/RGBA32 nativos não são alterados.
- **Alpha do scanout Amlogic:** alpha do framebuffer final é fixado em um antes
  do swap sem destruir o estado GL da Unity.
- **Serviços Android:** JNI mínimo e direcionado para arquivos, locale,
  preferências, display, Firebase e serviços da activity Unity.
- **Áudio:** o mixer FMOD original gera o PCM; uma thread nativa reproduz o
  fluxo `FMODAudioDevice`/`AudioTrack` pelo áudio SDL.
- **Controle:** o InControl recebe um gamepad real. O movimento no tabuleiro é
  entregue como um swipe de toque sintético sobre o gerenciador de toque do
  próprio jogo, então o tabuleiro inteiro continua clicável (mira de pedra
  incluída); D-pad e analógico direito comandam. A ponte tvOS/IL2CPP antiga
  permanece atrás de `HGO_NATIVE_CONTROLS=1` para diagnóstico.
- **Interface touch:** uma seta bem acabada injeta touch down/move/up com o
  display correto, incluindo clique e arrasto.

Overrides globais de wrap NPOT ficam desativados. O estado de sampler permanece
sob controle do jogo, salvo uma conversão específica comprovadamente necessária.

### Controles

| Controle | Ação |
|---|---|
| D-pad / analógico direito | Move o Agente 47 ao nó vizinho |
| Analógico esquerdo | Move a seta persistente |
| A / Cross ou R3 | Clica na seta; segure e mova para arrastar (pedra: clique no alvo destacado) |
| X / Square | Abre a lâmpada/dica durante a fase |
| Y / Triangle | Reinicia a fase atual |
| Start | Abre ou fecha a tela de pausa/objetivos |
| B / Circle | Voltar Android; fecha telas e aciona a saída nativa do jogo na Home |
| Select + Start | Sai corretamente pelo lifecycle de pause da Unity |

### Dados originais obrigatórios

Use a versão Android ARM64 **1.18.1**. A partir da pasta que contém o launcher
público:

```sh
mkdir -p hitmango/lib
unzip -q HitmanGO-1.18.1.apk 'assets/*' -d hitmango
unzip -q -j HitmanGO-1.18.1.apk \
  lib/arm64-v8a/libmain.so \
  lib/arm64-v8a/libunity.so \
  lib/arm64-v8a/libil2cpp.so \
  lib/arm64-v8a/libFirebaseCppApp-12_10_1.so \
  -d hitmango/lib
```

O layout instalado deve ser:

```text
Hitman GO.sh
hitmango/
  hitmango
  run.sh
  assets/bin/Data/...
  lib/libmain.so
  lib/libunity.so
  lib/libil2cpp.so
  lib/libFirebaseCppApp-12_10_1.so
  home/                         # criado em runtime; saves/preferências
```

Não achate nem recomprima `assets/bin/Data`. O pacote público não inclui nenhum
desses arquivos proprietários.

### Compilar, empacotar e rodar

```sh
# Build de desenvolvimento para o firmware atual
make

# Build público AArch64, auditado para GLIBC <= 2.30
make universal

# ZIP BYO-data reproduzível mais arquivo SHA-256
make package

# Dentro da pasta instalada do jogo
./run.sh
```

O build universal usa cross-toolchain AArch64 do Debian Buster em container e
audita a maior versão de símbolo glibc e o layout do guard-pad TLS Bionic. O
empacotamento audita novamente todo executável e rejeita dados do jogo, saves,
diagnósticos, caminhos pessoais e binários inesperados.

### Variáveis de diagnóstico

| Variável | Finalidade |
|---|---|
| `HGO_NATIVE_CONTROLS=1` | Religa a ponte tvOS/IL2CPP antiga (desliga o tabuleiro por toque) |
| `HGO_SWIPE_MOVE=0` | Desativa o andar por swipe sintético |
| `HGO_SWAP_STICKS=0` | Cursor de volta no analógico direito, movimento no esquerdo |
| `HGO_CURSOR=0` | Desativa a seta/cursor |
| `HGO_AUDIO_DRIVER=nome` | Solicita um backend de áudio SDL específico |
| `HGO_NO_AUDIO=1` | Desativa a thread FMOD-para-SDL |
| `HGO_VERBOSE=1` | Ativa diagnóstico do loader |
| `HGO_LOGCAT=1` | Espelha o log Android do jogo |
| `HGO_JNILOG=1` | Rastreia toda chamada JNI; muito verboso |
| `HGO_GLLOG=1` | Rastreia chamadas GL e shaders; muito verboso |
| `HGO_INPUT_DIAG=1` | Rastreia movimentos nativos e atalhos da interface |
| `HGO_FRAMES=N` | Encerra após `N` frames para testes automáticos |

Os launchers não forçam backend de vídeo/áudio SDL e não gerenciam o serviço do
frontend.

### Mapa do código

- `src/main.c` — lifecycle Android/Unity exato e loop de render.
- `src/nx_elf.*` — mapeamento e relocation de ELF Android ARM64.
- `src/bionic.c`, `src/pthread_bridge.c` — compatibilidade Bionic/glibc.
- `src/jni.c`, `src/android.c` — objetos JNI e serviços Android.
- `src/egl.c`, `src/egl_sdl.*` — EGL/GLES, hooks, desenho da seta, scanout opaco
  e capturas de diagnóstico.
- `src/etc2_decode.*` — fallback ETC2/EAC por software.
- `src/input.c` — InControl, movimento nativo, cursor e atalhos.
- `src/audio.c` — bridge do `AudioTrack` FMOD da Unity para áudio SDL.
- `run.sh` — validação, proteção contra processo antigo e inicialização.
- `build_universal.sh` — build público de glibc baixa e auditoria TLS.
- `package/build-package.sh` — gate do ZIP reproduzível e sem dados do jogo.

### Licenças

O loader de compatibilidade é GPL-3.0; consulte `LICENSE` e `NOTICE.md`. SDL2,
EGL, GLES, zlib e bibliotecas do firmware mantêm suas licenças. Hitman GO e todo
arquivo original extraído permanecem proprietários e não são licenciados nem
distribuídos por este projeto.

## Download

- [hitmango-v1.2.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.2.2) — `hitmango-1.2.2.zip`
- [hitmango-v1.2.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.2.0) — `Hitman.GO.Universal.v1.2.0.zip`, `Hitman.GO.Universal.v1.2.0.zip.sha256`
- [hitmango-v1.1.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.1.1) — `hitmango.zip`, `hitmango.zip.sha256`
- [hitmango-v1.1.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.1.0) — `hitmango.zip`, `hitmango.zip.sha256`
- [hitmango-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.0.0) — `hitmango.zip`, `hitmango.zip.sha256`

- Todas as versões / all versions: [releases?q=hitmango](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=hitmango)
- Histórico: 175 downloads no repositório original `hitmango-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
