# Dead Trigger — NextOS / PortMaster

**Language / Idioma:** [English](#english) · [Português](#português)

Independent AArch64 Linux compatibility port for **Dead Trigger 1 v2.1.0**
(Unity 2019.4 IL2CPP). The release follows the real Android lifecycle and is
BYO-data: no APK, Android library, Unity asset, artwork, audio or save is
included.

## English

### Status and supported payload

Release 1.1.1 supports the universal Android package:

```text
package: com.madfingergames.deadtrigger
version: 2.1.0 (210000062)
ABI:     arm64-v8a
APK SHA-256: 578d4f34cc5b5d2a3d1872f5edda356f2bb1a00c894730f8fa6109d3abf1461b
```

Do not mix libraries, metadata or assets from v2.0.1, an ARMv7/BogoDroid
package or another release. IL2CPP code and metadata must be an exact set.

The complete framework flow was validated on three NextOS families:

- Amlogic Mali-450 through native `mali`/framebuffer GLES2 and PulseAudio;
- X5M through KMSDRM/Mali-G310 and ALSA;
- Ark through KMSDRM/Mali-G31 and ALSA.

On all three, the clean NXExtract screen appeared, installed the owner data
transactionally, detected the physical controller, opened live 48 kHz stereo
audio, reached nxcompat `READY 10/10` and rendered game frames. The validated
runtime includes mission gameplay, a completed tutorial, a real transition to
the following mission and the native focus-loss/pause exit flow.

### Architecture and native flow

`Dead Trigger.sh` is a self-contained nxbootstrap 0.6.4 launcher. It searches
the supported PortMaster roots for a real `control.txt` (including the NextOS
configuration root), calls `get_controls`, runs NXExtract before the guest,
verifies all required payload files, applies only private runtime library
paths, prevents double launch and returns control to the frontend on exit.

The host reproduces the original order:

1. create the Java VM, Activity and Android service contract;
2. map `libmain.so`, execute constructors and call `JNI_OnLoad`;
3. invoke the registered `NativeLoader.load` method;
4. map `libunity.so`; Unity then requests `libil2cpp.so`;
5. execute initializer arrays and JNI registration in native order;
6. call `UnityPlayer.initJni`, surface callbacks, focus gain and resume;
7. let `nativeRender` drive the normal Unity/IL2CPP PlayerLoop;
8. on exit send focus loss and `nativePause` before process termination.

The recursive ARM64 loader supports the package's aligned segments,
relocations, constructors and `dl_iterate_phdr`. NXExtract keeps owner ELFs in
`lib/`; the loader resolves Unity's legacy root-level `libil2cpp.so` request to
that canonical directory without duplicate files.

### Video and framework

The adapter creates a real SDL GLES2 window and publishes measured EGL/GLES
strings, config and drawable dimensions. This gives KMSDRM on newer devices
and the working native Mali framebuffer path on Mali-450 without choosing by
device name. No global NPOT wrap, backbuffer-alpha workaround or forced GLES3
translation is enabled.

nxcompat owns the universal requirements and accepts launch only after real
graphics, audio and controller receipts. Generic host library discovery also
recognizes valid AArch64 shared objects in firmware `/usr/lib` and `/lib`
locations by ELF identity rather than path name.

### Audio, input and persistence

The OpenSL ES object/vtable flow used by Unity/FMOD is bridged to SDL2. The
validated stream is signed 16-bit stereo at 48 kHz with nonzero PCM samples
and live callbacks. SDL keeps the firmware-selected PulseAudio or ALSA path.

Dead Trigger's own `PlayerControlsGamepad` methods are found from IL2CPP
metadata at runtime; fixed method offsets are not used. Buttons and axes remain
on the game's semantic input path. Touch menus get a polished arrow:

- right stick moves it with radial deadzone, progressive response, smoothing
  and frame-time-independent motion;
- R3 or A/Cross clicks in menu context;
- A/Cross is still published on the game's native semantic path; the menu
  adapter only mirrors its press to the paired touch click;
- D-pad and left stick are never stolen from native input;
- when the game consumes `PlayerControlsGamepad` axes, the arrow disappears
  automatically and the right stick returns to native camera/aim;
- `SELECT + START` held briefly requests a graceful exit.

The obsolete MOGA popup is neutralized only at its two unique entry points;
all scene, mission and result transitions stay native. PlayerPrefs use a typed,
checksummed atomic store under `userdata/`, so progress and settings survive.
Unity's occasionally unnormalized absolute semaphore deadline is carried into
valid seconds/nanoseconds before the glibc wait, preserving the Android timing
while preventing a CPU spin during mission transitions.

nxinput 0.2.0 first preserves the real PortMaster mapping. In standalone
layouts, it can repair the exact contradicted topology seen in the field:
face buttons `b0..b3`, shoulders `b4/b5`, Start/Back `b6/b7`, L3 `b8`, R3
mislabelled as `guide:b9`, triggers `b10/b11` and four declared stick axes.
Only that complete capability signature is normalized to PortMaster face
semantics and R3; near misses and complete mappings remain unchanged. The
older classic 12-button L2/R2/R3 recovery remains adapter-local. Neither path
selects by device name, GUID, VID/PID, firmware or graphics backend.

### Owner-data installation

Put the exact supported APK in `deadtrigger/gamedata/` and launch the port.
NXExtract 1.2.6 verifies package identity, the complete 1,441-file Unity Data
tree (306,315,658 bytes) and SHA-256 of all three ARM64 libraries. It publishes
`assets/` and `lib/` atomically and preserves the APK. A wrong or partial
payload cannot replace a working installation.

### Build and verification

```bash
./build.sh
./tests/run-host.sh
./package/build-package.sh
```

The reproducible public build uses pinned GCC 16 object generation with Buster
libc headers and a pinned offline Debian Buster link/strip stage. GCC 8 is not
used for object code because it miscompiles this Unity host's atomics/thread
bridge. The final executable is AArch64 PIE and requires only GLIBC 2.17.

Release gates build twice, reject nondeterminism, GLIBC above 2.30, RPATH,
RUNPATH, RWE segments, unexpected dependencies, private paths and owner data.
NXRelease creates a deterministic allowlisted ZIP, audits both included Linux
ELFs and reopens the result for verification.

### Source map and licenses

- `src/main.c`: Activity/Unity lifecycle, UI loop and contextual controls;
- `src/loader.c`: recursive ARM64 Android ELF loader;
- `src/falsojni_dt.c`: Dead Trigger Android/JNI profile;
- `src/shims.c`: bionic/libc, EGL/GLES and filesystem bridges;
- `src/egl_sdl.c`: portable SDL-owned EGL facade;
- `src/opensles_dt.c`: OpenSL buffer queue to SDL audio;
- `src/gamepad_dt.c`: metadata-based semantic controller bridge;
- `src/sem_shim_dt.c`: Unity absolute-time normalization for scene waits;
- `src/prefs_dt.c`, `src/media_dt.c`: persistence and native-flow video;
- `src/framework_bridge.c`: nxcompat runtime evidence;
- `extractor.json`, `nxextract/`: transactional BYO installation.

Project code is GPL-3.0-only (`LICENSE`). NXExtract is MIT
(`licenses/NXExtract-MIT.txt`). Dead Trigger and all owner data remain property
of Madfinger Games or their respective rightsholders and are not distributed.
See `NOTICE.md`.

## Português

### Estado e versão

Este port independente executa **Dead Trigger 1 v2.1.0 (210000062)** em Linux
AArch64 seguindo o fluxo Android/Unity real. O baseline foi validado no
Mali-450 por framebuffer, no X5M por KMSDRM/Mali-G310 e no Ark por
KMSDRM/Mali-G31.

Nos três aparelhos a tela limpa do NXExtract apareceu, o payload foi instalado
de forma transacional, o controle físico foi reconhecido, áudio 48 kHz foi
aberto e o jogo publicou `READY 10/10` com frames renderizados. O teste inclui
gameplay de missão, conclusão do tutorial, transição real para a missão
seguinte e saída pelo fluxo nativo de perda de foco/pause.

### Framework, dados e controles

`Dead Trigger.sh` é o launcher autossuficiente do nxbootstrap 0.6.4. Ele procura
um `control.txt` real em todas as raízes PortMaster suportadas, incluindo a
raiz de configuração do NextOS, chama `get_controls`, roda o extrator antes do
jogo, valida arquivos obrigatórios, impede duas instâncias e isola as
bibliotecas privadas. O loader preserva `libmain`, `JNI_OnLoad`,
`NativeLoader`, `libunity`, `libil2cpp`, `initJni`, surface, foco, resume e
PlayerLoop na ordem original.

Coloque o APK universal exato v2.1.0 em `deadtrigger/gamedata/`. O NXExtract
confere o pacote, 1.441 arquivos/306.315.658 bytes e os hashes das três
bibliotecas ARM64 antes de publicar `assets/` e `lib/`. O APK não é apagado e
um payload incorreto não substitui uma instalação boa.

Nos menus, apenas o analógico direito move a seta; R3 ou A/Cross clica. A seta
tem deadzone radial, resposta progressiva e suavização por tempo. A/Cross
continua publicado também na ação semântica nativa — o adapter apenas espelha
o press para o toque enquanto o menu está ativo. D-pad e analógico esquerdo
continuam nativos. Quando o próprio
`PlayerControlsGamepad` comprova gameplay, a seta some e o direito volta para
câmera/mira. `SELECT + START` pede saída limpa.

O nxinput 0.2.0 respeita primeiro o mapping real do PortMaster. Se ele estiver
ausente, somente a assinatura completa observada — face `b0..b3`, shoulders
`b4/b5`, Start/Back `b6/b7`, L3 `b8`, R3 incorretamente em `guide:b9`,
gatilhos `b10/b11` e quatro eixos — pode ser normalizada para a ordem do
PortMaster e R3. Qualquer combinação parcial fica intocada. Mapeamentos SDL
antigos do layout clássico ainda têm L2/R2/R3 ausentes recuperados pelo adapter.
Nenhuma correção depende de aparelho, GUID, VID/PID, firmware ou backend. O
prazo absoluto ocasionalmente inválido do Unity também é normalizado antes da
espera glibc, evitando o loop de CPU nas transições entre missões.

### Build e licenças

Use os três comandos da seção inglesa. O binário público reproduzível exige
somente GLIBC 2.17 e o gate rejeita GLIBC acima de 2.30, RPATH/RWX, dependência
inesperada, caminho privado ou dado proprietário. O ZIP determinístico é
reaberto e auditado.

O código do projeto é GPL-3.0-only; NXExtract é MIT. Dead Trigger, APK,
bibliotecas, assets, arte, áudio e marcas continuam pertencendo à Madfinger
Games ou aos respectivos titulares e não fazem parte do ZIP.

## Download

- [deadtrigger-v1.1.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.1.1) — `DeadTrigger.NextOS-v1.1.1-FINAL.zip`
- [deadtrigger-v1.1.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.1.0) — `DeadTrigger.NextOS-v1.1.0-FINAL.zip`, `DeadTrigger.NextOS-v1.1.0-FINAL.zip.sha256`
- [deadtrigger-v1.0.9](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.9) — `DeadTrigger.NextOS-v1.0.9-FINAL.zip`
- [deadtrigger-v1.0.8](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.8) — `DeadTrigger.NextOS-v1.0.8-FINAL.zip`, `DeadTrigger.NextOS-v1.0.8-FINAL.zip.sha256`
- [deadtrigger-v1.0.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.7) — `DeadTrigger.NextOS-v1.0.7-FINAL.zip`, `DeadTrigger.NextOS-v1.0.7-FINAL.zip.sha256`
- [deadtrigger-v1.0.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.6) — `DeadTrigger.NextOS-v1.0.6-FINAL.zip`
- [deadtrigger-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.5) — `DeadTrigger.NextOS-v1.0.5-FINAL.zip`
- [deadtrigger-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.4) — `DeadTrigger.NextOS-v1.0.4-FINAL.zip`, `DeadTrigger.NextOS-v1.0.4-FINAL.zip.sha256`
- [deadtrigger-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.0.0) — `deadtrigger.zip`, `deadtrigger.zip.sha256`

- Todas as versões / all versions: [releases?q=deadtrigger](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=deadtrigger)
- Histórico: 372 downloads no repositório original `deadtrigger-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
