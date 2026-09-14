# Freedom Planet 2 — universal PortMaster port (AArch64)

Native AArch64 port of the Android release of **Freedom Planet 2** for Linux
handhelds — NextOS, R36S/ArkOS-class, dArkOS, ROCKNIX, muOS, EmuELEC and any
firmware with PortMaster. No emulator and no Android underneath: the game's own
native libraries run on plain Linux through a so-loader.

**Language / Idioma:** [English](#english) · [Português](#português)

> ### ⚠️ Bring your own data · Traga os seus próprios dados
> This repository and its releases contain **no game data** — no APK, no Android
> libraries, no assets. You supply the copy you legally own and the port installs
> it on the device at first launch.
>
> Este repositório e as suas releases **não contêm dados do jogo**. Você fornece
> a sua própria cópia legal e o port a instala no aparelho na primeira abertura.

## Download

The packaged port is on the [Releases](../../releases/latest) page: download `fp2.zip` and
install it with PortMaster, or extract it at the root of your ROM collection.

| | |
|---|---|
| Game | Freedom Planet 2 1.2.8 (`com.GalaxyTrail.FP2`) |
| Engine | Unity 2018.4.36f1, IL2CPP |
| Architecture | AArch64 (`arm64-v8a`) |
| Graphics | OpenGL ES 2.0 / ESSL 1.00 (Vulkan shaders translated on install) |
| SDL | the firmware's own — none ships in the ZIP |
| Audio | FMOD, through SDL audio |
| Port version | 1.1.3 |

## Install in three steps

1. Extract `fp2.zip` at the ROM root — `Freedom Planet 2.sh` lands in `ports/`, next to
   the `fp2/` folder.
2. Put your own Android copy of the game into `ports/fp2/gamedata/`
   (`.apk`, `.apkm`, `.apks` or `.xapk`; the file name does not matter).
3. Open **Freedom Planet 2** from the Ports menu. The first launch validates your copy,
   installs it and starts the game.

The first launch takes a while — the port is translating the game's shaders
for your GPU. Keep about **2 GB free** on the card for it.

Full instructions, including the reference identity of the accepted copy, are in
[`INSTALLATION.md`](INSTALLATION.md).

## Controls, briefly

**A** attack · **B** jump · **X** special · **Y** guard · **START** pause.
In menus **A** confirms and **B** goes back. Left stick and D-pad move.

Every button is remappable in `NEXTOSCONTROLLERS.gptk` inside the port folder.
**SELECT + START on the same controller** exits cleanly, saving first.

## License · Licença

Port code and its licenses: see [Source map and licenses](#source-map-and-licenses).
Freedom Planet 2 is © GalaxyTrail, LLC. This port is an independent project with no
affiliation with, or endorsement by, GalaxyTrail.

---

## English

Freedom Planet 2 1.2.8 runs through a native AArch64 Unity IL2CPP loader and
the system SDL2/EGL/GLES2 stack. The finished game adapter preserves Unity's
Android startup order, produces the complete title, menus, tutorial and
gameplay, outputs FMOD audio, supports the physical controller, and hides the
Android touch HUD.

The public package is BYO-data: it contains the port and its open-source
extraction/translation tools, never GalaxyTrail's APK, native Android modules,
or game assets.

### Architecture

- Loads the original AArch64 `libmain.so`, `libunity.so`, and `libil2cpp.so`
  with their init arrays and `JNI_OnLoad` calls in the game's native order.
- Recreates the Android/JNI, filesystem, threading, lifecycle, input, and
  audio contracts used by Unity `2018.4.36f1` without an Android emulator.
- Uses only the SDL2 supplied by the firmware. The package does not vendor,
  preload, or redirect to a private SDL copy.
- Presents through EGL/GLES2. The graphics contract requires GLES 2.0 or newer
  with ESSL 1.00. It compiles a live shader probe before rendering, samples the
  framebuffer immediately before present, and promotes graphics evidence only
  after the first real present returns.
- Keeps the game's display policy unchanged; the framework does not rescale or
  restyle an already approved frame.

### Vulkan shader conversion

The Android data declares Vulkan and stores the game-specific programs as
SMOL-V/SPIR-V. On first extraction the port:

1. validates the compatible APK and its critical AArch64 payloads;
2. extracts only the required Unity data and original ARM64 libraries;
3. patches the serialized graphics API from Vulkan to GLES2;
4. translates the required shader stages to ESSL 1.00 with the pinned native
   translator; and
5. injects those programs surgically into the original Unity serialized files.

The approved transform changes 31 logical Unity files and installs 2,736
GLES2 program records. The original texture corpus remains unchanged; there is
no broad texture rebake in the universal route. The transformation is
deterministic, hash-gated, transactional, and runs only from owner-provided
data.

### Other solved boundaries

- The GLES facade supplies the logical Unity calls missing from Mali-450 while
  retaining the real GLES2 context and sampler/framebuffer behavior.
- The title-number and tutorial-runner stencil path is preserved; the previous
  yellow-shadow leak is not accepted as a valid frame.
- FMOD PCM is sent to the firmware through SDL audio.
- Controller events are translated into the game's Android input contract.
  `SELECT+START` requests a clean lifecycle exit.
- Optional controller vendor/product queries are resolved at runtime, keeping
  the executable loadable on the public SDL 2.0.4 floor.
- The bionic semaphore bridge retires every destroyed generation before Unity
  can reuse the guest address, preventing an endless load after the tutorial.
- Unity's own mobile-controls visibility decision hides the touch overlay; no
  permanent gameplay buttons are drawn over the image.
- The low-glibc runtime requires at most GLIBC 2.27 and has been designed for
  the public multi-device ceiling of GLIBC 2.30.

### Controls

Version 1.1.2 puts the editable `NEXTOSCONTROLLERS.gptk` (format
`NEXTOS_CONTROLLERS/3`, `FACE_LAYOUT = auto`) in front of the Android
KeyEvent/MotionEvent stream the game already consumes. The firmware SDL2
mapping stays the only physical authority (admitted in-process by the nxinput
C6 seam with the pinned authority-3 bundle); the file maps symbolic controls
to FP2 actions per context. Freedom Planet 2 reads Unity's legacy Input
(`JoystickButtonN` and joystick axes), so every action is delivered as the
Android keycode of its default gamepad binding; the in-game Controls menu can
still rebind, in which case the semantic names describe the default layout.

| Control | Gameplay | Menu | Android keycode -> game binding |
|---|---|---|---|
| A | `fp2.attack` | `fp2.confirm` | 96 -> "Joystick Button 1" (Attack) / 97 -> "Joystick Button 2" (Jump = confirm) |
| B | `fp2.jump` | `fp2.cancel` | 97 -> "Joystick Button 2" (Jump) / 96 -> "Joystick Button 1" (Attack = cancel) |
| X | `fp2.special` | native | 99 -> "Joystick Button 3" (Special) |
| Y | `fp2.guard` | native | 100 -> "Joystick Button 4" (Guard) |
| START | `fp2.pause` | `fp2.pause` | 107 -> "Joystick Button 10" (Pause, the title's "PRESS 10") |
| Left stick | `fp2.move` (vector, radial deadzone 0.15) | native | AXIS_X / AXIS_Y ("Axis 1"/"Axis 2") |
| D-pad, L1/R1, L2/R2, L3/R3, SELECT, right stick | native | native | 19-22, 102/103, 104/105, 106/107, 109, AXIS_Z/RZ |
| SELECT + START | sovereign exit chord (framework, outside the file) | | |

The keycodes were read from inside the engine (the game's own
`InputControl.mKeysList`, 0-based `JoystickInput.mButton`), not assumed: the
game confirms menus with its Jump key and cancels with its Attack key, so the
`[menu]` context puts confirm on A and cancel on B while `[gameplay]` keeps
the game's native layout (A attack, B jump, X special, Y guard).

Contexts are proven from the engine, never from scene-name lists: a live
`FPStage.playerInstance_FPPlayer` (checked with `UnityEngine.Object.op_Implicit`,
so a destroyed player never counts) selects `[gameplay]`; `FPStage.state ==
PAUSED` or `Time.timeScale == 0` selects `[menu]` inside a stage; no live
player (title, menus, world map, shops, cutscenes) selects `[menu]`; an
empty or `Loading` scene, or an unavailable contract, keeps every control on
the native passthrough. Editing the owner copy changes the real consumer
(`A = null` suppresses A everywhere; `R2 = fp2.attack` moves the attack); an
invalid owner copy is preserved and the immutable default is used. Prompt
glyphs: the game prints its own binding names (such as "10" for START or
"Axis 1" for the D-pad) and consults no controller identity for glyphs, so
the port cannot make those prompts symbolic without editing game content.

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

### Game data and first launch

Place a legal compatible Freedom Planet 2 1.2.8 APK in `fp2/gamedata/` and
launch the port. NXExtract 1.3.0 validates and transforms it on the device; the
APK filename is irrelevant. See `INSTALLATION.md` for the exact tested
identity and full directory layout.

The complete reference-container SHA-256 is documentation, not a single-SHA
lock. The recipe accepts legitimate repackaging only when the package, version,
ABI, structure, and critical internal payloads still match.

This build contains English only. There is no hidden language menu.

### Build and release composition

```bash
cd ports/fp2
./build_universal.sh
```

The public runtime is AArch64 and is audited for GLIBC 2.27 or older. Release
composition uses a Framework V4 development snapshot pinned by exact commit
and component-tree hashes in `FRAMEWORK-PIN.json`; it never follows a moving
branch or `latest`. The pinned snapshot commit is
`f01636ef6a33cc40f4bac379482e1bd47a2021e2`. It is not presented as a tagged
or final Framework V4 release.

Every launch uses the generated framework launcher. After the data gate and
before the adapter/game, the canonical bilingual `NEXT OS` / `RETRO ELITE`
NXSplash remains visible for five seconds without a skip option.

### Source map and licenses

- `src/main.c`, `src/nx_elf.c`: native loader and exact Unity lifecycle.
- `src/jni.c`, `src/android.c`, `src/bionic.c`, `src/pthread_bridge.c`: Android
  and JNI compatibility.
- `src/egl.c`, `src/egl_sdl.c`, `src/gles3.c`, `src/unity6_shader.c`: EGL/GLES
  facade, runtime shader compatibility, and presentation.
- `src/nxgl_frame_proof_adapter.c`: run-bound framebuffer proof immediately
  before the real present.
- `src/fp2_graphics_contract.c` and canonical `src/nxgl_graphics_*`: measured
  GLES/ESSL contract and post-first-present evidence gate.
- `src/audio.c`, `src/aaudio_shim.c`, `src/mediandk_shim.c`: FMOD/PCM output.
- `src/input.c`, `src/mobile_controls.c`: controller and touch-HUD policy.
- `nxextract/`: public extraction, shader translation, and vendored tool
  dependencies used on first launch.

Port code is GPL-3.0-only. NXSplash is MIT. Third-party extraction-tool
licenses are included beside their components. Freedom Planet 2 and all
original game content remain copyright GalaxyTrail and their rights holders.

## Português

Freedom Planet 2 1.2.8 roda por um loader Unity IL2CPP AArch64 nativo e pela
stack SDL2/EGL/GLES2 do sistema. O adapter finalizado preserva a ordem de boot
Android da Unity, entrega título, menus, tutorial e gameplay completos, toca o
áudio FMOD, aceita o controle físico e oculta o HUD touch do Android.

O pacote público é BYO-data: contém o port e suas ferramentas livres de
extração/tradução, nunca o APK, módulos Android nativos ou assets da GalaxyTrail.

### Arquitetura

- Carrega `libmain.so`, `libunity.so` e `libil2cpp.so` AArch64 originais com
  init arrays e `JNI_OnLoad` na ordem nativa do jogo.
- Recria os contratos Android/JNI, arquivos, threads, lifecycle, input e áudio
  usados pela Unity `2018.4.36f1`, sem emulador Android.
- Usa somente a SDL2 entregue pelo firmware. O pacote não embarca, faz preload
  nem redireciona para uma SDL privada.
- Apresenta por EGL/GLES2. O contrato gráfico exige GLES 2.0 ou superior com
  ESSL 1.00. Ele compila um shader de prova vivo antes de renderizar, amostra o
  framebuffer imediatamente antes do present e só promove a evidência gráfica
  depois que o primeiro present real retorna.
- Mantém a política de display do jogo; o framework não redimensiona nem muda
  o estilo de um frame já aprovado.

### Conversão dos shaders Vulkan

Os dados Android declaram Vulkan e guardam os programas específicos em
SMOL-V/SPIR-V. Na primeira extração, o port:

1. valida o APK compatível e seus payloads AArch64 críticos;
2. extrai somente os dados Unity e bibliotecas ARM64 necessários;
3. troca a API gráfica serializada de Vulkan para GLES2;
4. traduz os estágios necessários para ESSL 1.00 com o tradutor nativo pinado;
5. injeta os programas cirurgicamente nos arquivos serializados originais.

A transformação aprovada modifica 31 arquivos Unity lógicos e instala 2.736
registros de programa GLES2. O corpus original de texturas permanece intacto;
não existe rebake amplo de texturas na rota universal. A transformação é
determinística, protegida por hashes, transacional e roda somente sobre dados
fornecidos pelo dono.

### Outras fronteiras resolvidas

- A fachada GLES entrega as chamadas lógicas da Unity ausentes na Mali-450,
  preservando o contexto GLES2 e o comportamento de sampler/framebuffer.
- O stencil do número do título e do corredor do tutorial é preservado; o
  antigo vazamento de sombra amarela não conta como frame válido.
- O PCM do FMOD segue para o firmware pelo áudio SDL.
- Eventos do controle entram no contrato Android do jogo. `SELECT+START` pede
  saída limpa pelo lifecycle.
- As consultas opcionais de fabricante/produto do controle são resolvidas em
  runtime, mantendo o executável carregável no piso público SDL 2.0.4.
- A ponte de semáforos bionic aposenta cada geração destruída antes que a Unity
  reutilize o endereço guest, evitando o loading infinito depois do tutorial.
- A própria decisão de visibilidade dos controles móveis da Unity oculta o HUD
  touch; não ficam botões permanentes sobre a gameplay.
- O runtime de glibc baixa exige no máximo GLIBC 2.27, abaixo do teto público
  multi-device de GLIBC 2.30.

### Controles

A versão 1.1.2 coloca o `NEXTOSCONTROLLERS.gptk` editável (formato
`NEXTOS_CONTROLLERS/3`, `FACE_LAYOUT = auto`) na frente do fluxo Android de
KeyEvent/MotionEvent que o jogo já consome. O mapping SDL2 do firmware segue
como única autoridade física (admitido in-process pela costura C6 do nxinput
com o bundle pinado da autoridade 3); o arquivo liga controles simbólicos a
ações do FP2 por contexto. O Freedom Planet 2 lê o Input legado da Unity
(`JoystickButtonN` e eixos), então cada ação é entregue como o keycode Android
do seu binding padrão de gamepad; o menu Controls do jogo ainda pode
rebindar — nesse caso os nomes semânticos descrevem o layout padrão.

| Controle | Gameplay | Menu | Keycode Android -> binding do jogo |
|---|---|---|---|
| A | `fp2.attack` | `fp2.confirm` | 96 -> "Joystick Button 1" (Attack) / 97 -> "Joystick Button 2" (Jump = confirmar) |
| B | `fp2.jump` | `fp2.cancel` | 97 -> "Joystick Button 2" (Jump) / 96 -> "Joystick Button 1" (Attack = cancelar) |
| X | `fp2.special` | native | 99 -> "Joystick Button 3" (Special) |
| Y | `fp2.guard` | native | 100 -> "Joystick Button 4" (Guard) |
| START | `fp2.pause` | `fp2.pause` | 107 -> "Joystick Button 10" (Pause, o "PRESS 10" do título) |
| Analógico esquerdo | `fp2.move` (vetor, deadzone radial 0,15) | native | AXIS_X / AXIS_Y ("Axis 1"/"Axis 2") |
| Direcional, L1/R1, L2/R2, L3/R3, SELECT, analógico direito | native | native | 19-22, 102/103, 104/105, 106/107, 109, AXIS_Z/RZ |
| SELECT + START | chord soberano de saída (framework, fora do arquivo) | | |

Os keycodes foram lidos de dentro da engine (a própria
`InputControl.mKeysList` do jogo, `JoystickInput.mButton` 0-based), não
presumidos: o jogo confirma menus com a tecla de Jump e cancela com a de
Attack, então o contexto `[menu]` põe confirmar no A e cancelar no B, e o
`[gameplay]` mantém o layout nativo do jogo (A ataque, B pulo, X especial,
Y guarda).

Os contextos são provados pela engine, nunca por lista de nomes de cena: uma
`FPStage.playerInstance_FPPlayer` VIVA (conferida por
`UnityEngine.Object.op_Implicit`, então jogadora destruída nunca conta)
seleciona `[gameplay]`; `FPStage.state == PAUSED` ou `Time.timeScale == 0`
seleciona `[menu]` dentro do estágio; sem jogadora viva (título, menus,
mapa-múndi, lojas, cutscenes) é `[menu]`; cena vazia ou `Loading`, ou
contrato indisponível, mantém tudo no passthrough nativo. Editar a cópia do
dono muda o consumidor real (`A = null` suprime o A em todo caminho;
`R2 = fp2.attack` move o ataque); uma cópia inválida é preservada e o default
imutável é usado. Prompts: o jogo imprime os nomes dos próprios bindings
("10" para START, "Axis 1" para o direcional) e não consulta identidade do
controle para glyphs, então o port não consegue torná-los simbólicos sem
editar conteúdo do jogo.

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

### Dados do jogo e primeira abertura

Coloque um APK legal e compatível do Freedom Planet 2 1.2.8 em
`fp2/gamedata/` e abra o port. O NXExtract 1.3.0 valida e transforma os dados no
aparelho; o nome do APK é irrelevante. Veja `INSTALLATION.md` para a identidade
testada exata e o layout completo.

O SHA-256 completo do container de referência é documentação, não trava única.
A receita aceita reempacotamento legítimo somente quando package, versão, ABI,
estrutura e payloads internos críticos continuam equivalentes.

Esta build contém somente inglês. Não existe menu de idioma escondido.

### Build e composição da release

```bash
cd ports/fp2
./build_universal.sh
```

O runtime público é AArch64 e auditado para GLIBC 2.27 ou menor. A composição
usa um snapshot de desenvolvimento do Framework V4 fixado pelo commit exato e
pelos hashes das árvores de componentes em `FRAMEWORK-PIN.json`; nunca segue
branch móvel nem `latest`. O commit pinado é
`f01636ef6a33cc40f4bac379482e1bd47a2021e2`. Ele não é apresentado como tag ou
release final do Framework V4.

Toda abertura usa o launcher gerado pelo framework. Depois do gate de dados e
antes do adapter/jogo, a NXSplash bilíngue canônica `NEXT OS` / `RETRO ELITE`
permanece cinco segundos sem opção de pular.

### Mapa de fontes e licenças

- `src/main.c`, `src/nx_elf.c`: loader nativo e lifecycle Unity exato.
- `src/jni.c`, `src/android.c`, `src/bionic.c`, `src/pthread_bridge.c`:
  compatibilidade Android/JNI.
- `src/egl.c`, `src/egl_sdl.c`, `src/gles3.c`, `src/unity6_shader.c`: fachada
  EGL/GLES, compatibilidade de shader e apresentação.
- `src/nxgl_frame_proof_adapter.c`: prova do framebuffer imediatamente antes
  do present real, ligada à execução.
- `src/fp2_graphics_contract.c` e `src/nxgl_graphics_*` canônicos: contrato
  GLES/ESSL medido e gate de evidência posterior ao primeiro present.
- `src/audio.c`, `src/aaudio_shim.c`, `src/mediandk_shim.c`: saída FMOD/PCM.
- `src/input.c`, `src/mobile_controls.c`: controle e política do HUD touch.
- `nxextract/`: extração pública, tradução de shaders e dependências vendorizadas
  usadas na primeira abertura.

O código do port é GPL-3.0-only. A NXSplash é MIT. As licenças das
ferramentas terceiras de extração acompanham seus componentes. Freedom Planet
2 e todo conteúdo original permanecem copyright GalaxyTrail e seus titulares.

## Download

- [fp2-v1.1.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/fp2-v1.1.5) — `fp2.zip`, `fp2.zip.sha256`
- [fp2-v1.1.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/fp2-v1.1.4) — `fp2.zip`, `fp2.zip.sha256`
- [fp2-v1.1.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/fp2-v1.1.3) — `fp2.zip`

- Todas as versões / all versions: [releases?q=fp2](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=fp2)
- Histórico: 47 downloads no repositório original `fp2-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
