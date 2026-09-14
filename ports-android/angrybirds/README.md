# Angry Birds Classic 8.0.3 — universal ARMHF port

**Language / Idioma:** [English](#english) · [Português](#português)

| | | |
|---|---|---|
| ![Title screen](docs/images/title.png) | ![Slingshot pulled with the left stick](docs/images/slingshot.png) | ![Bird in flight](docs/images/flight.png) |

*Captured on the device, not on a PC.*

## English

This PortMaster port runs the original Android ARMv7 Rovio Fusion engine
natively through a Linux ARMHF so-loader. It is not emulation. The release is
bring-your-own-data: it contains no APK, Android library, artwork, audio,
scripts, saves or other proprietary game data.

Status: playable with video, SDL2 audio, persistent saves, controller support
and clean supervised exit. The public executable is `angrybirds-nextos` and
requires at most `GLIBC_2.17`.

### Support boundary

The package selects runtime behavior from measured capabilities, not device or
firmware names.

- ArkOS on RK3326 / Mali-G31: the exact `1.1.2-test.3` executable was exercised
  on 2026-08-14 with the official 22680302 APK through native boot, ALSA audio,
  the first content transition and clean exit. Community confirmation of
  perceived audio synchronization remains the purpose of this test ZIP. The
  previous test and accepted 1.1.1 baseline preserve the 8031 APK and input
  evidence.
- NextOS / Mali-450: the approved playable baseline is preserved. The exact
  `1.1.2-test.3` ZIP still requires a new physical regression on this family
  before it can be claimed as an accepted exact artifact.
- Other ARMHF PortMaster families: portable package only; no physical support
  claim is made until the exact release passes on that family.

### Architecture and native flow

`nxbootstrap` owns PortMaster discovery, single-instance locking, NXExtract,
pre-runtime diagnostics and child supervision. The loader then follows the
Android application's real order:

1. Probe the host and negotiate graphics/audio requirements with `nxcompat`.
2. Open a real SDL/EGL/GLES drawable with `nxgl`.
3. Load the owner-supplied ARMv7 library directly from the APK, relocate it,
   resolve all 378 imports, finalize W^X/RELRO and run its initialization array.
4. Initialize the JNI bridge and call the original `JNI_OnLoad`.
5. Call `nativeConfig`, `nativeGetPossibleOrientations`,
   `nativeRenderThread`, `nativeInit`, `nativeResume` and `nativeResize` in the
   order used by the APK.
6. Feed Android key/touch events immediately before `nativeUpdate`; present
   the frame only after the guest update/render path completes.
7. On exit call the original pause/audio-stop/deinit path, then use bounded
   `_exit(0)` without invoking unsafe guest GL destructors.

The guest library and assets remain inside `game.apk`; the loader reads them in
memory and does not publish a loose copy of the proprietary library.

### Solved problems

- Preserved the ARM softfp guest ABI behind an ARMHF Linux executable.
- Reproduced the required Bionic, pthread, stdio, JNI and Android asset
  surfaces without changing the original engine.
- Kept the exact Android lifecycle, constructors and `JNI_OnLoad` order.
- Added capability receipts for the window, EGL config, drawable, audio output
  and mapped controller before declaring the runtime ready.
- Added a fail-closed coherent EGL/GLES provider retry. It is authorized only
  after every normal candidate fails at the exact pre-context window stage,
  no provider override was inherited, and one already available object exports
  every EGL and GLES function used by this port. The retry is not selected by
  a device-name table.
- Routed `nativeMixData` through an `nxaudio` SPSC stream so guest mixing never
  runs in SDL's realtime callback.
- Replaced the test.1/test.2 eight-by-4096-frame queue with a 1024-frame SDL
  period, a six-period 139 ms SPSC queue and prefill-before-unpause. The guest
  still mixes in its proven 4096-frame cadence; the measured adapter software
  lead is bounded to 233 ms instead of approximately one second.
- Preserved the native slingshot API with radial deadzone, progressive
  response, smoothing and frame-time handling.
- Added precision launch without replacing the native flow: while the left
  stick already owns a real dragged bird, a fresh A press calls the original
  release method at the exact current vector. Returning the stick to center
  remains a launch fallback.
- Preserved the approved Mali-450 global cursor contract: the polished arrow
  is available in menus and gameplay, hides after two idle seconds and
  reappears on right-stick movement.
- A and R3 are equivalent cursor-click sources in every context, share one
  held touch, and cannot emit a duplicate release when both are pressed. This
  keeps touch-driven power selection and activation usable during a level.
- Kept saves and caches inside the port and made Select+Start follow the native
  pause/deinit boundary before exit. The logical SDL BACK route is supplemented
  by an exit-only GUIDE alias and capability-based Linux keycodes
  (`BTN_SELECT/START` and `TRIGGER_HAPPY1/2`); no raw button index is guessed.

### Controls

| Control | Menu | Gameplay |
|---|---|---|
| Left stick | Native navigation fallback when no right stick exists | Native 360-degree slingshot; press A while stretched for a precision launch, or return to center to launch |
| Right stick | Move the polished arrow | Move the polished arrow |
| R3 | Click the arrow | Click the arrow / touch-driven powers |
| A | Click the arrow | Precision launch while the left stick owns a dragged bird; otherwise click the arrow / touch-driven powers |
| L2 / R2 | — | Zoom out / zoom in |
| D-pad left / right | Original navigation | Horizontal camera |
| L1 | — | Native power-up tray |
| R1 | — | Native eye / Mighty Eagle action |
| Y / Triangle | Original Android button event | Native shockwave/black-bird action when available |
| Start / B | Back | Pause / back |
| Select + Start | Clean port exit | Clean port exit |

The firmware/PortMaster SDL mapping remains authoritative. The port contains no
controller-name table.

### Owner-supplied data and NXExtract

Copy a legally obtained Angry Birds Classic 8.0.3 APK into
`angrybirds/gamedata/`, then start the port. NXExtract 1.2.6 searches that
directory, verifies package `com.rovio.angrybirds`, ARMv7 availability, exact
size and SHA-256, and transactionally installs it as `game.apk`.

Supported official APKs:

- `103362175` bytes — SHA-256
  `0d533148bde4e2067f9138736dde22e49dcc6d7191d20d5061e2afb7dd35b75d`;
- `103772201` bytes (8031) — SHA-256
  `8cdea1ef39a2a5c3bad5ac27050b491dbdf68050754241390cf9f0d3d24979b8`.

A wrong, truncated or modified APK is rejected before valid installed data is
replaced. Later launches verify the NXExtract marker and installed file.

### Build and release

From the repository root:

```bash
ports/angrybirds/build.sh
python3 framework/nxrelease/nxrelease.py validate \
  --manifest ports/angrybirds/nxrelease.json
```

The deterministic build uses the pinned ARMHF low-glibc toolchain and read-only
SDL/EGL/GLES headers. Firmware graphics, SDL2 and zlib remain runtime
providers. `nxrelease.json` is the complete package allowlist; it audits every
Linux ELF, dependency, script, NXExtract file and ZIP member.

### Source map and licenses

- `src/main_angrybirds.c` — loader order, JNI lifecycle, frame loop and exit.
- `src/ab_framework.c` — capability negotiation and graphics receipts.
- `src/ab_apk.c` — read-only ZIP/AAssetManager bridge over the owner's APK.
- `src/ab_jni.c` — JNI/JavaVM and Android service bridge.
- `src/ab_bionic.c`, `src/ab_pthread.c`, `src/ab_stdio.c` — Bionic ABI
  compatibility.
- `src/ab_gl.c` — guest GLES import provider.
- `src/ab_audio.c` — Fusion mixer to nxaudio/SDL.
- `src/ab_input.c`, `src/ab_cursor_buttons.h`, `src/ab_lua_control.c` — mapped
  controller, A/R3 cursor state, native camera and precision slingshot adapter.
- `src/ab_evdev_exit.c`, `src/ab_exit_chord.h` — capability-based handheld
  Select+Start fallback and edge detector.
- `tests/test_cursor_buttons.c`, `tests/test_exit_chord.c`,
  `tests/test_audio_policy.c` — host regressions for A/R3 ownership, the exit
  chord edge and the adapter-local latency budget.
- `extractor.json` — exact transactional owner-data contract.
- `adapter/adapter-contract.json` — lifecycle, ownership and quirk boundary.
- `FRAMEWORK-PIN.json` — immutable component/source pins used by
  `1.1.2-test.3`.

The compatibility code is GPL-3.0-only; see `LICENSE` and `NOTICE.md`.
Angry Birds Classic and all original game content remain property of Rovio
Entertainment or their respective rightsholders and are not part of this
release.

## Português

Este port PortMaster executa nativamente a engine Android ARMv7 Rovio Fusion
por meio de um so-loader Linux ARMHF. Não é emulação. A release é BYO: não
contém APK, biblioteca Android, arte, áudio, scripts, saves nem outro dado
proprietário do jogo.

Estado: jogável com vídeo, áudio SDL2, saves persistentes, controle e saída
supervisionada limpa. O executável público é `angrybirds-nextos` e exige no
máximo `GLIBC_2.17`.

### Limite do suporte

O pacote escolhe o comportamento pelas capacidades medidas, nunca pelo nome do
aparelho ou firmware.

- ArkOS em RK3326 / Mali-G31: o executável exato `1.1.2-test.3` foi exercitado
  em 14/08/2026 com o APK oficial 22680302, incluindo boot nativo, áudio ALSA,
  primeira transição de conteúdo e saída limpa. A confirmação comunitária da
  sincronização percebida do áudio é o objetivo deste ZIP de teste. O teste
  anterior e o baseline 1.1.1 preservam as provas do APK 8031 e dos controles.
- NextOS / Mali-450: o baseline jogável aprovado foi preservado. A release
  exata `1.1.2-test.3` ainda precisa de uma nova regressão física nessa família
  antes de ser declarada artefato exato aceito nela.
- Outras famílias ARMHF com PortMaster: o pacote é portável, mas não existe
  promessa física antes de o ZIP exato passar naquela família.

### Arquitetura e fluxo nativo

O `nxbootstrap` cuida da integração PortMaster, lock de instância, NXExtract,
diagnóstico pré-runtime e supervisão. Depois, o loader respeita a ordem real do
aplicativo Android:

1. Mede o host e negocia requisitos gráficos/de áudio com `nxcompat`.
2. Abre drawable SDL/EGL/GLES real com `nxgl`.
3. Carrega do APK a biblioteca ARMv7 do dono, reloca, resolve 378 imports,
   fecha W^X/RELRO e executa o `init_array`.
4. Inicializa a ponte JNI e chama o `JNI_OnLoad` original.
5. Chama `nativeConfig`, `nativeGetPossibleOrientations`,
   `nativeRenderThread`, `nativeInit`, `nativeResume` e `nativeResize` na ordem
   do APK.
6. Entrega eventos Android imediatamente antes de `nativeUpdate` e apresenta
   somente depois do update/render do convidado.
7. Na saída, chama pause, parada de áudio e deinit originais; só então usa
   `_exit(0)` sem invocar destrutores GL inseguros do convidado.

A biblioteca e os assets ficam dentro de `game.apk`; o loader os lê em memória
e não publica cópia solta da biblioteca proprietária.

### Problemas resolvidos

- ABI Android softfp preservada atrás de um executável Linux ARMHF.
- Superfícies Bionic, pthread, stdio, JNI e AAsset necessárias reproduzidas sem
  alterar a engine original.
- Ordem real do lifecycle, construtores e `JNI_OnLoad` preservada.
- Receipts de janela, EGL config, drawable, áudio e controle exigidos antes do
  estado pronto.
- Retry EGL/GLES coerente e fail-closed, autorizado somente após esgotar todas
  as tentativas normais no estágio exato pré-contexto, sem override herdado e
  com um único provider exportando toda a API usada. Nenhuma tabela de device
  escolhe esse caminho.
- `nativeMixData` passa por fila SPSC do `nxaudio`; a engine nunca mistura no
  callback realtime do SDL.
- A fila dos testes 1 e 2, com oito blocos de 4096 frames, foi substituída por
  período SDL de 1024 frames, seis períodos de fila (139 ms) e prefill antes de
  liberar o áudio. O convidado preserva a cadência comprovada de 4096 frames e
  o avanço máximo medido do adapter cai de cerca de um segundo para 233 ms.
- Estilingue nativo com deadzone radial, resposta progressiva, suavização e
  tempo por frame.
- Disparo preciso sem substituir o fluxo nativo: enquanto o analógico esquerdo
  já controla um pássaro realmente puxado, uma borda nova de A chama a soltura
  original no vetor atual. Voltar o analógico ao centro continua funcionando
  como fallback de lançamento.
- Contrato de cursor global aprovado no Mali-450 preservado: a seta polida
  fica disponível no menu e na fase, some após dois segundos sem atividade e
  reaparece ao mover o analógico direito.
- A e R3 são fontes equivalentes do clique da seta em qualquer contexto,
  compartilham um único toque mantido e não geram soltura duplicada quando
  pressionados juntos. Assim, seleção e ativação touch de poderes continuam
  acessíveis durante a fase.
- Saves/cache confinados ao port e saída Select+Start pela fronteira nativa de
  pause/deinit. O BACK lógico da SDL é complementado por GUIDE somente para a
  saída e pelos keycodes Linux detectados por capacidade (`BTN_SELECT/START` e
  `TRIGGER_HAPPY1/2`), sem chutar índice cru de botão.

### Controles

| Controle | Menu | Gameplay |
|---|---|---|
| Analógico esquerdo | Fallback de navegação nativa se não houver direito | Estilingue nativo em 360°; aperte A enquanto esticado para disparo preciso ou volte ao centro para lançar |
| Analógico direito | Move a seta polida | Move a seta polida |
| R3 | Clica na seta | Clica na seta / poderes por touch |
| A | Clica na seta | Disparo preciso enquanto o analógico esquerdo controla um pássaro puxado; nos demais casos clica na seta / poderes touch |
| L2 / R2 | — | Zoom out / zoom in |
| D-pad esquerda / direita | Navegação original | Câmera horizontal |
| L1 | — | Bandeja nativa de poderes |
| R1 | — | Visão/Mighty Eagle nativa |
| Y / Triângulo | Evento Android original | Shockwave/pássaro preto nativo quando disponível |
| Start / B | Voltar | Pause / voltar |
| Select + Start | Saída limpa | Saída limpa |

O mapping SDL do firmware/PortMaster é a autoridade. Não existe tabela de
nomes de controles no port.

### Dados do dono e NXExtract

Copie um APK legal do Angry Birds Classic 8.0.3 para
`angrybirds/gamedata/` e abra o port. O NXExtract 1.2.6 localiza o arquivo,
confere o pacote `com.rovio.angrybirds`, a ABI ARMv7, tamanho e SHA-256 exatos,
e o instala transacionalmente como `game.apk`.

APKs oficiais suportados:

- `103362175` bytes — SHA-256
  `0d533148bde4e2067f9138736dde22e49dcc6d7191d20d5061e2afb7dd35b75d`;
- `103772201` bytes (8031) — SHA-256
  `8cdea1ef39a2a5c3bad5ac27050b491dbdf68050754241390cf9f0d3d24979b8`.

APK incorreto, truncado ou alterado é recusado antes de substituir dados
válidos. Os próximos boots verificam o marcador do NXExtract e o arquivo
instalado.

### Build e release

Na raiz do repositório:

```bash
ports/angrybirds/build.sh
python3 framework/nxrelease/nxrelease.py validate \
  --manifest ports/angrybirds/nxrelease.json
```

O build determinístico usa a toolchain ARMHF de glibc baixa fixada e apenas os
headers SDL/EGL/GLES em modo leitura. Gráficos, SDL2 e zlib continuam sendo
providers do firmware. `nxrelease.json` é a allowlist completa: audita todo ELF
Linux, dependência, shell, arquivo NXExtract e membro do ZIP.

### Mapa de fontes e licenças

- `src/main_angrybirds.c` — ordem do loader, lifecycle JNI, frames e saída.
- `src/ab_framework.c` — negociação por capacidades e receipts gráficos.
- `src/ab_apk.c` — ponte ZIP/AAssetManager somente leitura sobre o APK do dono.
- `src/ab_jni.c` — JNI/JavaVM e serviços Android.
- `src/ab_bionic.c`, `src/ab_pthread.c`, `src/ab_stdio.c` — compatibilidade
  Bionic.
- `src/ab_gl.c` — provider GLES do convidado.
- `src/ab_audio.c` — mixer Fusion para nxaudio/SDL.
- `src/ab_input.c`, `src/ab_cursor_buttons.h`, `src/ab_lua_control.c` —
  controle mapeado, estado A/R3 do cursor, câmera e adapter de precisão do
  estilingue.
- `src/ab_evdev_exit.c`, `src/ab_exit_chord.h` — fallback Select+Start por
  capacidades do portátil e detector de borda.
- `tests/test_cursor_buttons.c`, `tests/test_exit_chord.c`,
  `tests/test_audio_policy.c` — regressões host de ownership A/R3, combo de
  saída e orçamento de latência do adapter.
- `extractor.json` — contrato transacional exato dos dados do dono.
- `adapter/adapter-contract.json` — fronteira de lifecycle, ownership e quirks.
- `FRAMEWORK-PIN.json` — pins imutáveis usados pela versão `1.1.2-test.3`.

O código de compatibilidade usa GPL-3.0-only; veja `LICENSE` e `NOTICE.md`.
Angry Birds Classic e todo o conteúdo original continuam pertencendo à Rovio
Entertainment ou aos respectivos titulares e não fazem parte desta release.

## Download

- [angrybirds-v1.1.9](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.9) — `angrybirds.zip`
- [angrybirds-v1.1.8](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.8) — `angrybirds.zip`
- [angrybirds-v1.1.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.7) — `angrybirds.zip`
- [angrybirds-v1.1.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.6) — `angrybirds.zip`
- [angrybirds-v1.1.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.5) — `angrybirds.zip`
- [angrybirds-v1.1.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.4) — `angrybirds.zip`
- [angrybirds-v1.1.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.3) — `angrybirds.zip`, `SHA256SUMS.txt`
- [angrybirds-v1.1.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.2) — `angrybirds.zip`, `SHA256SUMS.txt`

- Todas as versões / all versions: [releases?q=angrybirds](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=angrybirds)
- Histórico: 259 downloads no repositório original `angrybirds-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
