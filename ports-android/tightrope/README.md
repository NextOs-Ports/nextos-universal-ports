# Tightrope Theatre 1.0.5-test.1 — universal AArch64 test port

**Language / Idioma:** [English](#english) · [Português](#português)

Independent compatibility loader for the Android AArch64 build of Tightrope
Theatre. The project does not distribute the APK, native game libraries,
artwork, music or any other proprietary game data.

## English

### Status

Version 1.0.5-test.1 is a narrow ROCKNIX input-test candidate, not a published
release. It preserves the physically tested 1.0.4 game/runtime behavior, the
pinned nxbootstrap 0.6.14 contract, NXExtract 1.2.9 and the mandatory
five-second bilingual `nxsplash` screen. Its only runtime change is controller
discovery, mapping and hotplug diagnostics before the existing input adapter.

| Target | Evidence |
|---|---|
| NextOS Amlogic/Mali-450 | Previous public baseline validated through language selection, menus, gameplay, audio, save/reload, controller and clean exit. Exact 1.0.5-test.1 retest pending. |
| ArkOS/R36S Mali-G31 | Exact 1.0.4 loader physically validated through the public launcher: title/menu isolation, native scene flow to Level1/Level2, D-pad movement/jump, analogue thresholds, A jump, audio and clean SELECT+START exit. Exact 1.0.5-test.1 retest pending. |
| AmberELEC/RK3326 Mali-G31 | Rendering and input were observed on 1.0.1, but the user reported silence. The candidate retains one-shot OpenSL/PCM proof; physical audio acceptance remains pending. |
| ROCKNIX/Flip Mali-G52 | The game and extraction open, but the previous candidate still exposed neither right-stick cursor movement nor SELECT+START. 1.0.5-test.1 adds the complete approved PortMaster/firmware database search and records the mapping actually selected. Exact physical acceptance is pending. |

Only results measured with the exact ZIP and SHA-256 may be promoted to
supported status.

### Architecture

The package has one visible PortMaster launcher. Its order is fixed:

```text
PortMaster → NXExtract → payload validation → NextOS splash (5 s)
           → Tightrope loader → Android init/JNI/SDL lifecycle → game
```

The host SDL owns the firmware window, EGL context and presentation when a DRM
device is available. The Android SDL embedded in Lime retains its own event and
game lifecycle. The loader resolves the Android ELF imports, restores the
PairIP-protected ranges from owner-derived transformation masks and enters the
same `JNI_OnLoad`/SDL/Haxe sequence used by the native application.

Audio follows the game's native request: OpenSL ES buffer queues are bridged to
one firmware SDL2 output device. The inherited audio backend is attempted
first; alternative backends are tried only after a real open failure.

### Problems solved in 1.0.3

- ROCKNIX can export `SDL_VIDEODRIVER=wayland` for its system SDL. After that
  SDL has consumed the setting and created the host window, the loader hides
  only the video-driver hint from Lime's Android SDL. Audio and every other
  inherited setting remain untouched.
- If an otherwise valid KMSDRM backend cannot create its first window, the
  host and splash each retry once with the portable `libEGL.so` and
  `libGLESv2.so` provider names. Explicit firmware/user choices always win;
  this capability fallback has no device-name heuristic.
- Audio now retries a transient busy output, explicitly tears its SDL device
  down after native game exit, and records exactly once when the guest requests
  OpenSL and when its first non-silent PCM reaches the bridge. It does not
  force or reorder the game's audio initialization.
- `SIGTERM`, `SIGINT` and `SIGHUP` are converted into the game's own SDL quit
  event so supervised exits keep the same save-and-quit path.
- PairIP transformation masks are read directly from `tools/patches/`; the
  owner-derived NXExtract payload remains untouched and its fast validation
  marker stays valid on later starts.
- The approved SDL mapping-database discovery is restored before the loader.
  If SDL still exposes one of the two proven raw controller topologies, a
  capability-only adapter mapping recovers the same buttons and axes. Near
  misses fail closed; there is no firmware, device-name or controller-name
  heuristic.
- The menu pointer remains the polished code-native arrow proven in 1.0.1. The
  right stick uses radial deadzone, progressive response, smoothing and frame
  time; R1/R3 click. The 0.6.9 drift heuristic that could hide the pointer was
  removed; D-pad, left stick and A retain the game's approved actions.
- SELECT+START uses SDL BACK/START (GUIDE is an alias) and an opt-in, capability-
  selected evdev fallback when SDL cannot authoritatively expose the chord.
- nxbootstrap 0.6.14 replaces the legacy `run.sh` chain, uses a BusyBox-safe
  nonblocking lock, creates an owner-only early-failure log and never calls the
  external `stat` command.
- The public loader is named `tightrope-nextos` and is built with a GLIBC_2.27
  maximum, below the public GLIBC_2.30 ceiling.

### ROCKNIX controller recovery in 1.0.5-test.1

- Controller databases are searched in the same PortMaster and firmware paths
  used by the physically approved TASM2 release, while inherited mappings keep
  precedence.
- SDL joystick, GameController and event subsystems are initialized together
  before enumeration. Raw hotplug is reconsidered only when it is not already
  a mapped GameController.
- The game log records the SDL name, GUID, axes, buttons, hats and final mapping
  for every candidate. No device name, CFW name or GUID selects behavior.
- The two previously proven raw layouts remain the only local guesses; unknown
  layouts fail closed and leave actionable diagnostics for the next adapter.

### Input precision preserved from 1.0.4

- D-pad left/right now drive the character's proven on-screen movement touch
  points; D-pad up jumps and down is deliberately neutral.
- The left stick uses a larger engage threshold with hysteresis: it engages
  above 23000 and releases below 14000, reducing accidental movement without
  making a held direction flicker.
- D-pad direction wins over the left stick for the current sample, while
  opposite D-pad directions cancel safely.
- Gameplay touches are armed only after the native game opens a `Level<digit>`
  scene. Title, settings and selection scenes keep D-pad, left stick and A
  neutral, because those same screen coordinates are menu buttons there.
- Right-stick arrow control, R1/R3 click, A jump and SELECT+START exit remain
  unchanged.

### Controls

- D-pad left/right — precise character movement during gameplay
- D-pad up — jump during gameplay; D-pad down is neutral
- Right stick — continuous menu-pointer movement
- R1 or R3 — click/confirm in menus
- Left stick — progressive gameplay movement with a larger deadzone
- A — jump during gameplay
- SELECT + START — save and return to the frontend

Gameplay controls are scene-gated. D-pad, left stick and A cannot activate
title, settings or selection-screen buttons; the right-stick arrow remains the
only menu pointer. No scene or boot step is skipped.

### Owner data and installation

The accepted owner bundle is Tightrope Theatre 1.0.5, package
`com.adventureislands.tightropetheatre`, version code 33, ABI `arm64-v8a`.
NXExtract reconstructs the libraries and more than 1,400 asset entries from the
owner's file. Transformation masks contain only byte differences and are useful
only with that exact legal copy.

The complete identity, sizes, SHA-256 values, paths and clean-update procedure
are in [INSTALLATION.md](INSTALLATION.md).

### Build and release gate

```sh
./build_universal.sh
python3 /path/to/framework/nxrelease/nxrelease.py build \
  --manifest nxrelease.json --stage /new/stage --output /new/tightrope.zip
```

`build_universal.sh` links against Debian Buster's old runtime and rejects an
ELF above GLIBC_2.30. NXRelease audits every Linux ELF, all declared files,
licenses, dependencies, launcher bytes, nxsplash bytes and the mandatory
`tightrope/INSTALLATION.md`; it then reopens and verifies the deterministic ZIP.

### Source map and licenses

- `src/main.c` — native lifecycle and host/guest SDL boundary
- `src/nx_elf.c`, `src/bionic.c`, `src/protected.c` — Android ELF loading,
  imports and owner-derived protected-range restoration
- `src/egl.c`, `src/video.c` — drawable ownership, EGL/GLES and arrow overlay
- `src/opensles_shim.c`, `src/audio.c` — OpenSL ES to SDL2 audio bridge
- `src/input.c`, `src/sdl_java.c` — controller, touch and Android SDL delivery
- `src/input_adapter.c` — deterministic raw-controller and exit-chord adapter
- `nxport.json`, `Tightrope Theatre.sh` — generated nxbootstrap 0.6.14 contract
- `extractor.json`, `nxextract/` — pinned NXExtract 1.2.9 recipe/runtime/UI
- `FRAMEWORK-PIN.json` — exact candidate component commits and artifact hashes

The loader and integration are GPL-3.0-only. NXExtract and nxsplash are MIT.
See [LICENSE](LICENSE), [NOTICE.md](NOTICE.md) and `licenses/`. Tightrope Theatre
and all owner data remain the property of their respective rights holders.

## Português

### Estado

A versão 1.0.5-test.1 é uma candidata estreita de teste de input no ROCKNIX,
não uma release publicada. Ela preserva o comportamento de jogo/runtime já
testado fisicamente no 1.0.4, o nxbootstrap 0.6.14, o NXExtract 1.2.9 e a tela
bilíngue obrigatória de cinco segundos. A única mudança de runtime está na
descoberta, mapping, hotplug e diagnóstico do controle antes do adapter atual.

| Alvo | Evidência |
|---|---|
| NextOS Amlogic/Mali-450 | Baseline público anterior validado em idioma, menus, gameplay, áudio, save/reload, controle e saída limpa. Falta retestar o ZIP 1.0.5-test.1 exato. |
| ArkOS/R36S Mali-G31 | Loader 1.0.4 exato validado fisicamente pelo launcher público: isolamento do título/menu, fluxo nativo até Level1/Level2, movimento/salto no D-pad, limiares do analógico, salto no A, áudio e saída limpa com SELECT+START. Falta retestar o 1.0.5-test.1 exato. |
| AmberELEC/RK3326 Mali-G31 | Vídeo e input foram observados no 1.0.1, mas o usuário relatou silêncio. A candidata preserva a prova OpenSL/PCM; a aceitação física do som continua pendente. |
| ROCKNIX/Flip Mali-G52 | O jogo e a extração abrem, mas a candidata anterior ainda não expôs movimento do cursor no analógico direito nem SELECT+START. A 1.0.5-test.1 acrescenta a busca completa aprovada dos bancos PortMaster/firmware e registra o mapping realmente escolhido. Falta aceitação física exata. |

Somente medições feitas com o ZIP e SHA-256 exatos podem ser promovidas a
suporte comprovado.

### Arquitetura

O pacote tem um único launcher visível do PortMaster. A ordem é fixa:

```text
PortMaster → NXExtract → validação do payload → tela NextOS (5 s)
           → loader Tightrope → lifecycle Android/JNI/SDL → jogo
```

A SDL do host é dona da janela, do contexto EGL e da apresentação quando há um
dispositivo DRM. A SDL Android embutida no Lime preserva seus eventos e o
lifecycle do jogo. O loader resolve imports do ELF Android, restaura as regiões
protegidas pelo PairIP com máscaras derivadas dos dados do dono e entra na mesma
sequência `JNI_OnLoad`/SDL/Haxe do aplicativo nativo.

O áudio segue o pedido nativo do jogo: filas OpenSL ES viram um único dispositivo
de saída SDL2 do firmware. O backend herdado é tentado primeiro; alternativas
só entram depois de uma falha real de abertura.

### Problemas resolvidos no 1.0.3

- O ROCKNIX pode exportar `SDL_VIDEODRIVER=wayland` para sua SDL do sistema.
  Depois que ela consome essa seleção e cria a janela host, o loader esconde
  somente essa dica da SDL Android do Lime. Áudio e todo o restante do ambiente
  herdado ficam intactos.
- Se um backend KMSDRM válido não conseguir criar sua primeira janela, host e
  splash repetem uma única vez com os nomes portáveis `libEGL.so` e
  `libGLESv2.so`. Escolhas explícitas do firmware/usuário sempre vencem; esse
  fallback por capacidade não usa heurística pelo nome do aparelho.
- O áudio repete uma saída temporariamente ocupada, encerra explicitamente o
  dispositivo SDL depois da saída nativa e registra uma única vez o pedido
  OpenSL do convidado e o primeiro PCM não silencioso. Ele não força nem muda a
  ordem da inicialização de áudio do jogo.
- `SIGTERM`, `SIGINT` e `SIGHUP` viram o evento SDL de saída do próprio jogo,
  preservando o mesmo caminho de salvar-e-sair sob supervisão.
- As máscaras PairIP são lidas direto de `tools/patches/`; o payload derivado
  do dono pelo NXExtract não é alterado e o marcador rápido permanece válido
  nas aberturas seguintes.
- A descoberta aprovada do banco de mapeamentos SDL volta a ocorrer antes do
  loader. Se SDL ainda expuser uma das duas topologias cruas comprovadas, um
  adapter por capacidades recupera os mesmos eixos/botões; casos quase iguais
  falham fechados, sem heurística por firmware, aparelho ou nome do controle.
- O ponteiro continua sendo a seta code-native comprovada no 1.0.1. Analógico
  direito usa deadzone radial, resposta progressiva, suavização e tempo por
  frame; R1/R3 clicam. Foi removida a heurística 0.6.9 que podia esconder a
  seta; D-pad, analógico esquerdo e A preservam as ações aprovadas.
- SELECT+START usa BACK/START da SDL (GUIDE é alias) e fallback evdev opt-in
  selecionado por capacidades somente quando SDL não prova o chord.
- O nxbootstrap 0.6.14 substitui a cadeia antiga de `run.sh`, usa lock não
  bloqueante compatível com BusyBox, cria log inicial exclusivo do dono e nunca
  chama o comando externo `stat`.
- O executável público agora se chama `tightrope-nextos` e exige no máximo
  GLIBC_2.27, abaixo do teto público GLIBC_2.30.

### Recuperação do controle no ROCKNIX no 1.0.5-test.1

- Os bancos de controle são buscados nos mesmos caminhos de PortMaster e
  firmware usados pela release TASM2 fisicamente aprovada; mappings herdados
  continuam tendo precedência.
- SDL joystick, GameController e eventos inicializam juntos antes da
  enumeração. Hotplug cru só é reconsiderado quando ainda não é GameController.
- O log registra nome SDL, GUID, eixos, botões, hats e mapping final de cada
  candidato. Nome do aparelho, CFW e GUID nunca selecionam comportamento.
- Somente as duas topologias cruas já comprovadas continuam sendo inferidas;
  layouts desconhecidos falham fechados e deixam diagnóstico acionável.

### Precisão do input preservada do 1.0.4

- Esquerda/direita no D-pad agora acionam os pontos touch de movimento já
  comprovados; para cima pula e para baixo permanece deliberadamente neutro.
- O analógico esquerdo usa limiar maior com histerese: entra acima de 23000 e
  solta abaixo de 14000, reduzindo movimentos acidentais sem oscilar enquanto
  uma direção está mantida.
- O D-pad vence o analógico esquerdo na amostra atual; direções opostas no
  D-pad se cancelam com segurança.
- Toques de gameplay só são armados quando o jogo nativo abre uma cena
  `Level<dígito>`. Título, configurações e seletores mantêm D-pad, analógico
  esquerdo e A neutros, pois nessas telas as mesmas coordenadas são botões.
- Seta no analógico direito, clique R1/R3, salto no A e saída SELECT+START
  continuam inalterados.

### Controles

- D-pad esquerda/direita — movimento preciso durante o gameplay
- D-pad para cima — pula durante o gameplay; para baixo fica neutro
- Analógico direito — movimento contínuo do ponteiro do menu
- R1 ou R3 — clica/confirma nos menus
- Analógico esquerdo — movimento progressivo com deadzone maior
- A — pula durante o gameplay
- SELECT + START — salva e volta ao frontend

Os controles de gameplay são protegidos pela cena. D-pad, analógico esquerdo e
A não podem ativar botões do título, configurações ou seletores; a seta do
analógico direito continua sendo o único ponteiro do menu. Nenhuma cena ou
etapa de boot é pulada.

### Dados do dono e instalação

O bundle aceito é Tightrope Theatre 1.0.5, package
`com.adventureislands.tightropetheatre`, version code 33, ABI `arm64-v8a`. O
NXExtract reconstrói as bibliotecas e mais de 1.400 assets a partir do arquivo
do dono. As máscaras de transformação guardam somente diferenças de bytes e só
têm utilidade junto daquela cópia legal exata.

A identidade completa, tamanhos, SHA-256, caminhos e atualização limpa estão em
[INSTALLATION.md](INSTALLATION.md).

### Build e gate da release

```sh
./build_universal.sh
python3 /caminho/do/framework/nxrelease/nxrelease.py build \
  --manifest nxrelease.json --stage /stage/novo --output /saida/nova/tightrope.zip
```

O `build_universal.sh` liga contra o runtime antigo do Debian Buster e rejeita
ELF acima de GLIBC_2.30. O NXRelease audita todos os ELFs Linux, arquivos,
licenças, dependências, bytes do launcher, bytes do nxsplash e o obrigatório
`tightrope/INSTALLATION.md`; depois reabre e verifica o ZIP determinístico.

### Mapa de fontes e licenças

- `src/main.c` — lifecycle nativo e fronteira SDL host/convidada
- `src/nx_elf.c`, `src/bionic.c`, `src/protected.c` — carga do ELF Android,
  imports e restauração protegida derivada dos dados do dono
- `src/egl.c`, `src/video.c` — ownership do drawable, EGL/GLES e seta
- `src/opensles_shim.c`, `src/audio.c` — ponte OpenSL ES para SDL2
- `src/input.c`, `src/sdl_java.c` — controle, toque e entrega à SDL Android
- `src/input_adapter.c` — adapter determinístico de controle cru e saída
- `nxport.json`, `Tightrope Theatre.sh` — contrato gerado nxbootstrap 0.6.14
- `extractor.json`, `nxextract/` — receita/runtime/UI pinados do NXExtract 1.2.9
- `FRAMEWORK-PIN.json` — commits candidatos e hashes exatos dos artefatos

O loader e a integração usam GPL-3.0-only. NXExtract e nxsplash usam MIT. Veja
[LICENSE](LICENSE), [NOTICE.md](NOTICE.md) e `licenses/`. Tightrope Theatre e
todos os dados do dono continuam pertencendo aos respectivos titulares.

## Download

- [tightrope-v1.0.8](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.8) — `tightrope.zip`
- [tightrope-v1.0.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.7) — `tightrope.zip`
- [tightrope-v1.0.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.6) — `tightrope.zip`, `tightrope.zip.sha256`
- [tightrope-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.5) — `tightrope.zip`, `tightrope.zip.sha256`
- [tightrope-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.1) — `Tightrope.Theatre.NextOS-v1.0.1.zip`, `Tightrope.Theatre.NextOS-v1.0.1.zip.sha256`
- [tightrope-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.0) — `Tightrope.Theatre.NextOS-v1.0.0.zip`, `Tightrope.Theatre.NextOS-v1.0.0.zip.sha256`

- Todas as versões / all versions: [releases?q=tightrope](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=tightrope)
- Histórico: 64 downloads no repositório original `tightrope-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
