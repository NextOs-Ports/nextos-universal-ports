# Party Hard GO — NextOS AArch64 port

**Language / Idioma:** [English](#english) · [Português](#português)

## English

Version 1.0.7 fixes the D-pad diagonal that kept the character walking after
UP+LEFT or UP+RIGHT were released together. The cause was in the port's JNI
shim: Unity reads an injected Android KeyEvent after `nativeInjectEvent`
returns, and a single shared KeyEvent record let the second key of the same
frame overwrite the first, so one key-up was never seen. Every injected
KeyEvent now owns its payload. The defect and the fix were measured on the
device through the engine's own `CharController.Hor/Vert` values.

Version 1.0.6 fixes movement that could remain latched after releasing the
D-pad or left stick. It preserves the 1.0.5 menu, native A confirmation,
pointer and unfinished-tutorial fixes, and keeps the same immutable framework
as 1.0.4. This input fix was physically verified on K36S/dArkOS; it has not
yet been physically verified on muOS/ROCKNIX. The missing tutorial stick glyph
is still a known presentation limitation.

Party Hard GO 0.100038 runs through a native AArch64 Unity 6 IL2CPP loader and
the system SDL2/EGL/GLES2 stack. The finished adapter preserves Unity's Android
startup order, delivers the opening cutscene, menus and full gameplay, outputs
FMOD audio, supports the physical controller and draws a pointer arrow for the
game's touch-only dialogs.

The public package is BYO-data: it contains the port and its open-source
extraction tools, never tinyBuild's APK, native Android modules, or game
assets.

### Architecture

- Loads the original AArch64 `libmain.so`, `libunity.so`, and `libil2cpp.so`
  with their init arrays and `JNI_OnLoad` calls in the game's native order.
- Recreates the Android/JNI, filesystem, threading, lifecycle, input, and
  audio contracts used by Unity `6000.3.10f1` without an Android emulator.
- Uses only the SDL2 supplied by the firmware. The package does not vendor,
  preload, or redirect to a private SDL copy.
- Presents through EGL/GLES2 (SDL-owned context on KMS/Wayland firmwares, the
  vendor EGL path on Mali-450 fbdev). The Unity 6 GLES3 requests are bridged
  to the real GLES2 context; the graphics contract requires GLES 2.0 with
  ESSL 1.00, samples the framebuffer immediately before present and promotes
  graphics evidence only after the first real present returns.
- Promotes a pending nxbootstrap generation only after 30 successful real page
  flips, using the launcher's exact atomic run-bound health receipt.
- Adds the V5 owner video policy without touching Unity's renderer: `auto`
  fills every panel by default, while `preserve` keeps the internal 16:9
  image centered (for example 720x405 on a 720x720 display).

### Data preparation

The Android build ships its scenes and resources as a Play Asset Delivery pack
(`datapack.unity3d`). On first extraction the port:

1. validates the compatible APK (package ID, ARM64 ABI, critical payloads);
2. extracts only the Unity data and the three original ARM64 libraries;
3. unbundles the asset pack into the seven loose serialized files the engine
   already probes (`resources.assets`, `.resS`, `sharedassets1/2`, `level1`,
   `level2`) — byte for byte, nothing is reserialized.

The transformation is deterministic, hash-gated, transactional, and runs only
from owner-provided data.

### Other solved boundaries

- The Play licensing gate is answered locally through the game's own
  `LicensingServiceCallback` proxy.
- `PlayerPrefs.apply()` is asynchronous as on Android: disk is written on
  pause, exit and at most every 15 s (a synchronous write per `set` cost the
  frame rate on SD cards).
- JNI local references die at the frame boundary; reclaimed objects become
  tombstones, so a long session keeps a flat heap.
- FMOD PCM is sent to the firmware through SDL audio.
- The low-glibc runtime requires at most GLIBC 2.27 (public ceiling 2.30).

### Controls

The editable `NEXTOSCONTROLLERS.gptk` (format `NEXTOS_CONTROLLERS/4`) sits in
front of the Android KeyEvent/MotionEvent stream the game's InControl already
consumes. The firmware SDL2 mapping stays the only physical authority. The V5
provider-aware C6 seam stages mappings only for the SDL provider actually in
use, preserving the native firmware mapping on every other provider.

| Control | Gameplay / Menu | Delivery |
|---|---|---|
| A | native action / confirm selected menu option | Android keycode 96 |
| B / X / Y | `partyhard.action2..4` | Android keycodes 97 / 99 / 100 |
| L1 / R1 | `partyhard.bumper_left` / `partyhard.bumper_right` | 102 / 103 |
| START | `partyhard.pause` | 108; while the game is paused, Android BACK closes the pause |
| Left stick | `partyhard.move` (vector, radial deadzone 0.15) | AXIS_X / AXIS_Y |
| Right stick | menu pointer; native in gameplay | arrow / AXIS_Z + AXIS_RZ |
| R3 | menu click; native in gameplay | Android touch / keycode 107 |
| D-pad, L2 / R2, L3, SELECT | native | D-pad uses one Android KeyEvent route in menu and gameplay |
| SELECT + START | sovereign exit chord (framework, outside the file) | |

Contexts follow the engine's static `App.View.Gui._screenType`: `GameScreen`
is `[gameplay]`, while pause and other GUI screens are `[menu]`. `MainMenu`
also contains the party, so its scene name alone cannot identify a menu.
The visible `ControlsSelectorPopUp` takes precedence over the underlying
gameplay screen, keeping the pointer available for TOUCH/VIRTUAL selection.
The standalone intro/license scenes retain their own menu pointer when the
GUI container is absent. An unready GUI or empty loading scene otherwise
keeps native passthrough; `Time.timeScale == 0` in gameplay selects `[menu]`. The
native passthrough is the approved Mali-450 behaviour, so a missing or invalid
owner file changes nothing. In a proven menu, the right stick moves the
pointer and R3 clicks; A confirms the native menu selection, independent of
the pointer position. In gameplay these controls return to the native game.
The TOUCH/VIRTUAL popup requires the pointer and R3. This corrected default
does not overwrite an edited owner map; remove its menu A-click override to
adopt native confirmation on an existing installation.
The arrow starts visible, returns when moved or clicked, and hides after four
idle seconds following its first click. The pointer and Android MotionEvent
share the exact final content rectangle, so the click stays under the arrow
with bars or stretching on any aspect ratio. D-pad navigation uses one
KeyEvent route in both menu and gameplay; the duplicate HAT route remains
neutral. Simultaneous opposite directions cancel only the contradictory pair,
so the reported LEFT+RIGHT+DOWN+action chord retains DOWN+action without an
impossible horizontal state.
Native menu navigation owns selection until the auxiliary pointer is used
again. This prevents Unity's remembered touch position from reselecting an
old hovered button after a D-pad press, including pause and Quit dialogs.

Each admitted controller also has a neutral-only release guard. It opens only
the exact device node identified by SDL and clears a non-zero cached SDL value
only when the kernel proves that all physical keys are released or that the
corresponding stick axis is centered. It never scans input devices, creates a
press, or replaces the firmware mapping; unavailable or inconclusive evidence
passes the original SDL value through. Focus loss, hot unplug, input failure
and shutdown additionally publish an explicit neutral MotionEvent.

If the initial tutorial is left before completion, the first poster temporarily
resumes that tutorial through the game's native start action. It does not unlock
the first party or modify saved progress. Normal level locks remain unchanged.

The port opens every admitted pad (`nxinput_padset`) and the exit chord counts
only when SELECT and START come from the same pad. No test harness lives in
this executable.

### Video settings

`NEXTOSSETTINGS.txt` uses `NEXTOS_SETTINGS/2`. Its default
`video.aspect=auto` fills the entire display. Owners of a 720x720 device can
set `video.aspect=preserve` to show the 16:9 image centered with opaque bars.
The accepted values are `auto`, `engine`, `preserve`, and `stretch`; an
invalid owner file is preserved and the package default is used safely.

### Game data and first launch

Place a legal compatible Party Hard GO 0.100038 APK in `partyhard/gamedata/`
and launch the port. NXExtract 1.3.0 validates and prepares it on the device;
the APK filename is irrelevant. See `INSTALLATION.md` for the exact tested
identity and full directory layout.

### Build and release composition

```bash
cd ports/partyhard
./build_universal.sh
```

The public runtime is AArch64 and is audited for GLIBC 2.27 or older. Release
1.0.4 uses the immutable V5 integration tag
`framework-v5-nxbootstrap-0.8.4-arkos-stale-sdl-20260905`, peeled commit
`657fb65a23b5c3b20040e76307b27e6470b1d17c`. It includes nxbootstrap 0.8.4,
nxcompat 0.5.3, nxinput 0.11.8, nxgenerator 0.4.5, and nxrelease 0.4.11. Every
component tree is pinned in `FRAMEWORK-PIN.json`; the port never follows a
moving branch or `latest`.

nxbootstrap 0.8.4 fixes the ArkOS/PortMaster system-SDL handoff when an
inherited `LD_PRELOAD` names a stale SDL through the dynamic-loader token
`$LIB`. If the adapter did not author a different preload, the bootstrap drops
only that inherited unresolved system-SDL entry. Valid mapped token paths are
preserved literally; adapter-authored, private, non-SDL, nested, ambiguous, or
otherwise unresolved overrides still fail closed. There is no `eval`, path
guessing, global `LD_PRELOAD` wipe, or private SDL in the package.

Every launch uses the generated framework launcher. After the data gate and
before the adapter/game, the canonical bilingual `NEXT OS` / `RETRO ELITE`
NXSplash remains visible for five seconds without a skip option.

### Physical validation

The earlier AArch64 runtime was approved on two independent device stacks:
NextOS with Mali-450 at 1280x720 and dArkOS with Mali-G31 at 640x480.
Fullscreen video, audio, gameplay, one-step menu D-pad navigation, the aligned
A/R3 pointer click and SELECT+START exit passed there.

The 1.0.6 input successor was exercised on K36S/dArkOS with a faithful clone of
the built-in controller. Ten repetitions of LEFT+RIGHT+DOWN+action cancelled
only LEFT+RIGHT, moved down, emitted no HAT, and returned the game's exact
`CharController.Hor/Vert` values to zero on the first neutral frame. Individual
D-pad and analog movement also returned to zero. A private bench-only fault
injected a permanently stale DOWN button and left-Y axis underneath the guard;
with the same physical device neutral, gameplay remained at zero throughout.
The clone was unplugged cleanly and lifecycle exit released every input. These
results prove the fix on dArkOS, not on muOS/ROCKNIX; no 1.0.6 ZIP is claimed by
this source-stage validation.

### Source map and licenses

- `src/main.c`, `src/nx_elf.c`: native loader and exact Unity lifecycle.
- `src/jni.c`, `src/android.c`, `src/bionic.c`, `src/pthread_bridge.c`:
  Android and JNI compatibility.
- `src/egl.c`, `src/egl_sdl.c`, `src/gles3.c`, `src/unity6_shader.c`: EGL/GLES
  facade, GLES3→GLES2 bridge and presentation.
- `src/health.c`: run-bound generation health after real presentation.
- `src/nxgl_frame_proof_adapter.c`, `src/st_graphics_contract.c` and the
  canonical `src/nxgl_graphics_*`: framebuffer proof and graphics contract.
- `src/audio.c`, `src/opensles_shim.c`: FMOD/PCM output.
- `src/input.c`, `src/input_guard.c`, `src/input_gptk.c`, `vendor/nxinput/`:
  controller, neutral release guard, pointer and the live GPTK runtime.
- `nxextract/`: public extraction, the asset-pack preparation hook and its
  vendored dependencies used on first launch.

Port code is GPL-3.0-only. NXSplash is MIT. Third-party extraction-tool
licenses are included beside their components. Party Hard GO and all original
game content remain copyright tinyBuild / Pinokl Games and their rights
holders.

## Português

A versão 1.0.7 corrige a diagonal do direcional que deixava o personagem
andando depois de soltar CIMA+ESQUERDA ou CIMA+DIREITA juntos. A causa estava
no shim JNI do port: a Unity lê o KeyEvent Android injetado depois que
`nativeInjectEvent` retorna, e um único registro compartilhado deixava a
segunda tecla do mesmo quadro sobrescrever a primeira, perdendo uma soltura.
Cada KeyEvent injetado agora tem seu próprio payload. Defeito e correção
foram medidos no aparelho pelos valores `CharController.Hor/Vert` da engine.

A versão 1.0.6 corrige o movimento que podia ficar preso depois de soltar o
direcional ou o analógico esquerdo. Ela preserva as correções 1.0.5 de menus,
confirmação nativa com A, cursor e retomada do tutorial, usando o mesmo
framework imutável da 1.0.4. A correção de input foi comprovada fisicamente no
K36S/dArkOS; ainda não foi comprovada no muOS/ROCKNIX. O glifo ausente do
analógico segue como limitação de apresentação do tutorial.

Party Hard GO 0.100038 roda por um loader Unity 6 IL2CPP AArch64 nativo e pela
stack SDL2/EGL/GLES2 do sistema. O adapter finalizado preserva a ordem de boot
Android da Unity, entrega a cutscene de abertura, os menus e a gameplay
completa, toca o áudio FMOD, aceita o controle físico e desenha uma seta de
ponteiro para os diálogos touch-only do jogo.

O pacote público é BYO-data: contém o port e suas ferramentas livres de
extração, nunca o APK, módulos Android nativos ou assets da tinyBuild.

### Arquitetura

- Carrega `libmain.so`, `libunity.so` e `libil2cpp.so` AArch64 originais com
  init arrays e `JNI_OnLoad` na ordem nativa do jogo.
- Recria os contratos Android/JNI, arquivos, threads, lifecycle, input e áudio
  usados pela Unity `6000.3.10f1`, sem emulador Android.
- Usa somente a SDL2 entregue pelo firmware, sem SDL privada.
- Apresenta por EGL/GLES2 (contexto da SDL em KMS/Wayland, EGL do fabricante
  no Mali-450 fbdev). Os pedidos GLES3 da Unity 6 são traduzidos para o
  contexto GLES2 real; o contrato gráfico exige GLES 2.0 com ESSL 1.00,
  amostra o framebuffer imediatamente antes do present e só promove a
  evidência depois do primeiro present real.
- Promove uma geração pendente do nxbootstrap somente após 30 page flips reais
  concluídos, usando o receipt run-bound atômico e exato do launcher.
- Acrescenta a política de vídeo V5 sem alterar o renderer da Unity: `auto`
  preenche qualquer painel por padrão e `preserve` mantém a imagem 16:9
  centralizada (720x405 numa tela 720x720).

### Preparação dos dados

O build Android entrega cenas e recursos num pacote Play Asset Delivery
(`datapack.unity3d`). Na primeira extração, o port valida o APK compatível,
extrai só os dados Unity e as três bibliotecas ARM64 originais e desmonta o
pacote nos sete arquivos serializados soltos que a engine já procura — byte a
byte, sem reserializar nada. A transformação é determinística, protegida por
hashes, transacional e roda somente sobre dados do dono.

### Outras fronteiras resolvidas

- O gate de licença da Play é respondido localmente pelo proxy
  `LicensingServiceCallback` do próprio jogo.
- `PlayerPrefs.apply()` é assíncrono como no Android: o disco é escrito na
  pausa, na saída e no máximo a cada 15 s.
- Referências locais de JNI morrem na fronteira do quadro; objetos recolhidos
  viram lápides, e uma sessão longa mantém o heap parado.
- O PCM do FMOD segue para o firmware pelo áudio SDL.
- O runtime exige no máximo GLIBC 2.27 (teto público 2.30).

### Controles

| Controle | Gameplay / Menu | Entrega |
|---|---|---|
| A | ação nativa / confirmar a opção selecionada no menu | keycode Android 96 |
| B / X / Y | `partyhard.action2..4` | keycodes Android 97 / 99 / 100 |
| L1 / R1 | `partyhard.bumper_left` / `partyhard.bumper_right` | 102 / 103 |
| START | `partyhard.pause` | 108; com o jogo pausado, o BACK do Android fecha o pause |
| Analógico esquerdo | `partyhard.move` (vetor, deadzone radial 0,15) | AXIS_X / AXIS_Y |
| Analógico direito | ponteiro nos menus; nativo no gameplay | seta / AXIS_Z + AXIS_RZ |
| R3 | clique nos menus; nativo no gameplay | toque Android / keycode 107 |
| Direcional, L2 / R2, L3, SELECT | nativo | D-pad usa uma única rota KeyEvent Android no menu e no gameplay |
| SELECT + START | chord soberano de saída (framework, fora do arquivo) | |

Os contextos seguem o campo estático `App.View.Gui._screenType`: `GameScreen`
é `[gameplay]`; pause e outras telas da GUI são `[menu]`. A cena `MainMenu`
também contém a partida e, sozinha, não prova que existe um menu aberto.
A janela visível `ControlsSelectorPopUp` tem prioridade sobre a partida ao
fundo, mantendo a seta para escolher TOUCH/VIRTUAL. As cenas independentes de
introdução/licença mantêm seu cursor mesmo sem o container da GUI. Nos demais
casos, GUI ainda indisponível ou cena vazia mantém o passthrough nativo;
`Time.timeScale == 0` no gameplay seleciona `[menu]`.
O mapa editável usa `NEXTOS_CONTROLLERS/4`, e o seam C6 V5
decide pelo provider SDL realmente carregado. Em menu comprovado, o analógico
direito move a seta e R3 clica; A confirma a seleção nativa do menu, sem depender
da posição da seta. No gameplay esses controles voltam ao jogo nativamente.
A janela TOUCH/VIRTUAL exige seta e R3. O padrão corrigido não sobrescreve
mapas editados pelo dono; numa instalação existente, remova o override de
clique do A em menu para adotar a confirmação nativa.
A seta nasce visível, reaparece ao ser usada e some após quatro
segundos parada depois do primeiro clique. A seta e o MotionEvent Android usam
o mesmo retângulo final de conteúdo, mantendo o clique sob a ponta tanto com
barras quanto esticado, em qualquer proporção. O D-pad usa uma única rota
KeyEvent no menu e no gameplay; a rota HAT duplicada fica neutra. Direções
opostas simultâneas cancelam somente o par contraditório: no caso relatado
LEFT+RIGHT+DOWN+ação, DOWN+ação continuam válidos sem o estado horizontal
impossível.
A navegação nativa mantém o foco até o ponteiro auxiliar ser usado novamente.
Isso impede que a última posição de toque guardada pela Unity selecione de
novo outro botão após o direcional, inclusive no pause e na confirmação de Quit.

Cada controle admitido também recebe uma proteção de soltura exclusivamente
neutra. Ela abre apenas o nó exato identificado pela SDL e apaga um valor SDL
obsoleto somente quando o kernel prova que todas as teclas físicas foram soltas
ou que o eixo correspondente voltou ao centro. Ela não varre dispositivos,
não fabrica pressão e não substitui o mapping do firmware; prova ausente ou
inconclusiva mantém o valor SDL original. Perda de foco, desconexão, falha de
input e encerramento também publicam um MotionEvent explicitamente zerado.

Ao sair do tutorial inicial antes de terminá-lo, o primeiro cartaz permite
retomar esse tutorial pela ação nativa do jogo. Isso não desbloqueia a primeira
festa nem altera o progresso salvo. As travas normais das fases permanecem.

### Opções de vídeo

`NEXTOSSETTINGS.txt` usa `NEXTOS_SETTINGS/2`. O padrão
`video.aspect=auto` preenche toda a tela. Em aparelhos 720x720, o dono pode
usar `video.aspect=preserve` para manter a imagem 16:9 centralizada com barras
opacas. Também são aceitos `engine` e `stretch`; arquivo inválido é preservado
e o port volta com segurança ao padrão do pacote.

### Dados do jogo e primeira abertura

Coloque um APK legal e compatível do Party Hard GO 0.100038 em
`partyhard/gamedata/` e abra o port. O NXExtract 1.3.0 valida e prepara os
dados no aparelho; o nome do arquivo é irrelevante. `INSTALLATION.md` traz a
identidade exata testada e o layout completo.

### Composição da versão 1.0.4

A versão 1.0.4 fixa a tag imutável
`framework-v5-nxbootstrap-0.8.4-arkos-stale-sdl-20260905`, commit
`657fb65a23b5c3b20040e76307b27e6470b1d17c`, com nxbootstrap 0.8.4 e
nxrelease 0.4.11. No provider SDL do sistema, a correção descarta somente a
entrada SDL herdada e obsoleta em `LD_PRELOAD` que usa `$LIB`, desde que o
adapter não tenha criado um preload diferente. Caminhos válidos já mapeados são
preservados literalmente; overrides do adapter, privados, não SDL, aninhados,
ambíguos ou com outra variável continuam falhando fechado. Não há `eval`,
adivinhação de caminho, limpeza global de `LD_PRELOAD` nem SDL privada.

### Validação física

O runtime AArch64 anterior foi aprovado em duas stacks independentes: NextOS
com Mali-450 em 1280x720 e dArkOS com Mali-G31 em 640x480. Passaram vídeo em
tela cheia, áudio, gameplay, navegação de uma opção por pressão, clique A/R3
alinhado e saída por SELECT+START.

O sucessor de input 1.0.6 foi exercitado no K36S/dArkOS com um clone fiel do
controle interno. Dez repetições de LEFT+RIGHT+DOWN+ação cancelaram somente
LEFT+RIGHT, moveram para baixo sem HAT e devolveram os valores reais
`CharController.Hor/Vert` a zero no primeiro quadro neutro. Direcional e
analógico isolados também voltaram a zero. Uma falha exclusiva da bancada
manteve artificialmente DOWN e o eixo Y obsoletos por baixo da proteção; com o
mesmo dispositivo fisicamente neutro, o gameplay permaneceu zerado o tempo
todo. A desconexão do clone e o encerramento soltaram todas as entradas. Isso
comprova a correção no dArkOS, não no muOS/ROCKNIX; esta validação de fonte não
declara a existência de um ZIP 1.0.6.

O código do port é GPL-3.0-only. NXSplash é MIT. As licenças das ferramentas
de extração acompanham seus componentes. Party Hard GO e todo o conteúdo
original permanecem propriedade da tinyBuild / Pinokl Games.

## Download

- [partyhard-v1.0.8-rc1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.8-rc1) — `BUILD-PROVENANCE.json`, `CANDIDATE.json`, `partyhard.zip`, `partyhard.zip.sha256`, `TESTING.md`
- [partyhard-v1.0.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.7) — `BUILD-PROVENANCE.json`, `partyhard.zip`, `partyhard.zip.sha256`
- [partyhard-v1.0.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.6) — `BUILD-PROVENANCE.json`, `partyhard.zip`, `partyhard.zip.sha256`
- [partyhard-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.5) — `partyhard.zip`, `partyhard.zip.sha256`
- [partyhard-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.4) — `partyhard.zip`, `partyhard.zip.sha256`
- [partyhard-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.2) — `partyhard.zip`, `partyhard.zip.sha256`
- [partyhard-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.1) — `partyhard.zip`, `partyhard.zip.sha256`

- Todas as versões / all versions: [releases?q=partyhard](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=partyhard)
- Histórico: 109 downloads no repositório original `partyhard-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
