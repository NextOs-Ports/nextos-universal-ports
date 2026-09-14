# Oceanhorn: Chronos Dungeon 4.0b54 — port universal AArch64 (framework v2)

**Language / Idioma:** [English](#english) · [Português](#português)

## English

Native AArch64 port of **Oceanhorn: Chronos Dungeon 4.0b54** for Linux handhelds.
It drives the original Android Unity 2022.3.61f1 IL2CPP libraries through a
native so-loader and keeps the Android lifecycle order intact. **No game data is
distributed here** — you bring your own legal copy (see `INSTALLATION.md`).

A single public runtime requires only **GLIBC_2.27**, so the same binary serves
every AArch64 firmware we can reach. Video, audio, memory profile and controls
are negotiated at runtime from real capabilities: no SDL backend, resolution or
device name is ever hardcoded.

**2.0.1** is built from the immutable NextOS **framework v2** release
(`framework-v2-onda1`: nxbootstrap 0.6.30, NXExtract 1.2.18, nxgl 0.2.14,
nxrelease 0.2.30). It keeps the single generated launcher and the four
memory/performance profiles introduced in 2.0.0, and adds an evidence-driven
EGL/GLES provider recovery for dArkOSRE-class KMSDRM systems.

Status: **PLAYABLE**. The exact 2.0.1 public ZIP was installed over 2.0.0 and
device-proven on dArkOS RE / GO-Super (RK3326, Mali-G31, 1 GB). Preflight,
NXExtract and the mandatory five-second NXSplash passed; the default provider
failure recovered automatically; `auto` selected `low`; and three frame-proof
samples showed a complete fullscreen title at 100% non-black with opaque
alpha. Separate launches also proved `medium` and `high`. Observed RSS was
about 275 MB (`low`), 276 MB (`medium`) and 281 MB (`high`), with clean runtime
shutdown in every test. The v1.0.x heritage validation additionally covers:

| Aparelho | Vídeo | Resultado |
|---|---|---|
| **R36S / ArkOS** (RK3326, Mali-G31) | KMSDRM, ES3.0, 640×480 | título, cutscene e dungeon jogável, áudio, controle, `SELECT+START`; pico de 352 MB de RSS |
| **NextOS Elite** (Amlogic-old, Mali-450) | fbdev, GLES2, 1280×720 | mesmo binário universal, sem regressão |

Other AArch64 CFWs (muOS, ROCKNIX, Batocera, Knulli and similar) are handled by
capability detection, but still lack physical proof and are not claimed as
validated yet.

## Memory/performance profiles / Perfis de memória e desempenho (2.0.1)

Edit `ports/oceanhorn/port-env.sh` (or export the variable) to pick one:

| `OCEANHORN_PROFILE` | What it does |
|---|---|
| `auto` (default) | `low` on ~1 GB devices, `high` elsewhere |
| `low` | half-resolution render with **pixel-perfect integer upscale** (`CUP_RENDERSCALE=2`, NEAREST — the fill-rate remedy) plus 2x texture economy: caps at 512 (`CUP_TEXHALF`) as RGBA4444 (`CUP_TEX16`) |
| `medium` | 1.5x texture economy (cap 768), native render |
| `high` | everything native (1x) |

Any individual `CUP_*` variable exported in the environment (or set in
`userdata/ocean-env.sh`, which updates never overwrite) wins over the profile.
On the ES3/KMSDRM path the loader runs the scale in **LO-REPORT mode**: the
engine is told the low resolution from the first frame (Unity there bypasses
the viewport wrappers) and the blit upscales pixel-perfect to the real panel
— proved by capture on device (title screen, 100.0% identical 2x2 blocks).
The fbdev/Mali-450 path keeps the legacy mode (full-size engine + viewport
scaling), which is the proven recipe there. `CUP_RS_FILTER=linear` opts back
into smoothing.
The Mali-450 GPU performance pin (all pixel processors at the top official
level, with a thermal guard) now lives inside the binary and restores the
original governor values on exit; `OCEAN_GPU_PERFORMANCE=0` disables it.


## Comunidade / Community

Dúvidas, relatos de bug, ajuda pra rodar o port e novidades dos próximos:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

### Capturas

| R36S / ArkOS (640×480) | NextOS Elite / Mali-450 (1280×720) |
|---|---|
| ![gameplay no R36S](package/images/03-gameplay-r36s.png) | ![título no Mali-450](package/images/04-mali450.png) |

| Título | Abertura |
|---|---|
| ![título](package/images/01-titulo-r36s.png) | ![abertura](package/images/02-abertura-r36s.png) |

### Architecture

The loader reproduces the native Android sequence instead of replacing it:

1. Map and relocate the original `libunity.so`.
2. Run its constructors and `JNI_OnLoad`.
3. Map `libil2cpp.so` and expose the original IL2CPP metadata and resources.
4. Register and call the UnityPlayer JNI entry points in their native order.
5. Create the real EGL/fbdev GLES context and deliver surface, resume and focus.
6. Run `nativeRender` while pumping Java callbacks, FMOD and controller input.
7. On exit, deliver focus loss and pause, flush preferences, stop audio and
   leave through the loader's teardown-safe path.

### Main fixes

| Area | Problem | Solution |
|---|---|---|
| Boot | Unity proxy handles crashed in `JNIBridge.invoke` | Keep ReflectionHelper GC handles and native JNIBridge pointers on their correct, separate paths |
| Data | Android APK/files paths do not exist on NextOS | Redirect Unity and IL2CPP reads to the original `bin/Data` tree |
| Rendering | Mali-450 is GLES2-only and some external-alpha sprites disappeared | Preserve the authored GLES2 variants and sample alpha from the decoded main texture |
| Display | Phase-1 render scaling damaged framing (wrong panel size) and blurred the pixel art (linear filter), and never presented on KMSDRM | Scale FBO sized from the real panel, pixel-perfect NEAREST integer upscale, presented on both fbdev and KMSDRM paths; enabled by the `low` profile |
| EGL provider | dArkOSRE can expose a driverless versioned dispatcher while the working Mali provider is available through the portable names | Try the firmware defaults first; after an exhausted KMSDRM failure only, perform one clean re-exec with `libEGL.so` + `libGLESv2.so`, preserving explicit firmware/user choices |
| Audio | FMOD asynchronous Android streams ended in `ERR_INTERNAL` | Open the original FSB data synchronously as resident samples before the Android worker fails |
| Audio output | Android OpenSL ES is unavailable | Bridge OpenSL ES to SDL/PulseAudio, with soft limiting and a validated 1.5× output gain |
| Controller | Rewired accepted Android events but did not bind left-stick movement | Publish the real Android InputDevice ranges and mirror the left stick to the working d-pad KeyEvent path, with dead zone and hysteresis |
| Exit | No standard handheld exit chord | `SELECT+START` leaves the render loop, pauses Unity, flushes saves and returns to the frontend |
| Performance | Mali scaling kept only part of the GPU active at 400 MHz | Use all three pixel processors at the official 666 MHz level, add tile-buffer discard and cap the native cadence at 30 FPS |
| Thermals | Maximum GPU level should not remain forced above safe temperature | Drop one frequency level at 82 °C, restore it below 76 °C and restore the original governor values on exit |

### Controls

| Control | Action |
|---|---|
| Left stick / D-pad | Move |
| A | Attack / confirm |
| B | Dash / cancel |
| X | Item |
| L1 / R1 | Change hero |
| Start | Menu / pause |
| Select + Start | Save-safe exit to EmulationStation |

The current bridge publishes the first SDL game controller. Local multiplayer
with additional controllers has not been validated for this release.

### Game data

Game libraries and assets are proprietary and are not stored in the source
repository. A runtime installation has this public port layout; proprietary
files appear only after NXExtract validates the owner's copy:

```text
ports/
├── Oceanhorn Chronos Dungeon.sh
└── oceanhorn/
    ├── oceanhorn-nextos
    ├── nxport.json
    ├── port.json
    ├── nxsplash-nextos
    ├── gamedata/
    ├── userdata/
    ├── libunity.so       # installed owner data
    ├── libil2cpp.so      # installed owner data
    ├── libmain.so        # installed owner data
    └── bin/Data/         # installed owner data
```

The release ZIP contains no game data. It also excludes development logs,
personal saves, diagnostic captures, old binaries and source containers.

### Build and run

```sh
cd oceanhorn-nextos
./build_universal.sh
```

`build_universal.sh` uses the pinned offline Debian Buster AArch64 builder and
audits the resulting ELF. The 2.0.1 binary's highest requirement is
`GLIBC_2.27`, below the public `GLIBC_2.30` ceiling. Package generation then
uses the exact framework commit and tree hashes in `FRAMEWORK-PIN.json`.

Normal frontend entry:

```sh
/roms/ports/Oceanhorn\ Chronos\ Dungeon.sh
```

On NextOS Elite, PortMaster maps that launcher to
`/storage/roms/ports_scripts/Oceanhorn Chronos Dungeon.sh`.

Direct engineering run:

```sh
cd /roms/ports
./Oceanhorn\ Chronos\ Dungeon.sh
```

### Runtime options

| Variable | Effect |
|---|---|
| `OCEAN_FRAME_LIMIT` | Frame cadence; production default is 30 |
| `HC_AUDIO_GAIN` | Output makeup gain; production default is 1.5 |
| `OCEAN_GPU_PERFORMANCE=0` | Disable the NextOS GPU performance profile |
| `OCEAN_GPU_THERMAL_HIGH` | GPU fallback threshold in millidegrees Celsius |
| `OCEAN_GPU_THERMAL_LOW` | GPU restore threshold in millidegrees Celsius |
| `OCEAN_INPUTLOG=1` | Diagnostic controller event log |
| `OCEAN_LOWMEM_KB` | `MemAvailable` threshold that triggers the Android low-memory signal (default 120000) |
| `OCEAN_TRUE_MEMINFO=1` | Let the engine see the device's real free memory instead of a fixed value (opt-in) |
| `OCEAN_RESIDENT_MAX_MB` | Ceiling for the FMOD stream→resident fallback (default 16) |

Put any of these in `ports/oceanhorn/userdata/ocean-env.sh` (one `export` per
line). That file survives port updates and is never shipped, so trying a knob
never means editing a distributed file:

```sh
# ports/oceanhorn/userdata/ocean-env.sh
export OCEAN_TRUE_MEMINFO=1
```

The profile values are defaults, not locks: an explicit `CUP_*` export in
`port-env.sh` or `userdata/ocean-env.sh` takes precedence. The tested `low`
profile sets `CUP_RENDERSCALE=2`, while `medium` and `high` keep native render.

### Source map

- `src/main.c` — ELF loader integration, Android lifecycle, Unity/FMOD hooks,
  data redirects, one-shot provider recovery, render loop and safe shutdown.
- `src/jni_shim.c` — fake Java/JNI environment, InputDevice publication,
  SharedPreferences persistence and callbacks.
- `src/ocean_input.c` — SDL controller to Android KeyEvent/MotionEvent bridge,
  left-stick movement and `SELECT+START`.
- `src/opensles_shim.c` — OpenSL ES to SDL/PulseAudio bridge and output gain.
- `src/egl_shim.c`, `src/renderscale.c` — EGL/GLES routing and the
  profile-controlled pixel-perfect render scale.
- `src/sem_shim.c`, `src/pthread_fake.c` — Android/bionic synchronization
  compatibility on glibc.
- `src/so_util.c` — AArch64 Android ELF mapping and relocation.
- generated launcher + `port-env.sh` — one-instance guard, memory/performance
  profiles, runtime environment and PortMaster handoff.

### License

The loader and launcher are GPL-3.0. Original game libraries and assets remain
proprietary and are not covered by that license. See `LICENSE` and the runtime
notice included with the public BYO-data release.

## Português

Port universal AArch64 de **Oceanhorn: Chronos Dungeon 4.0b54** para handhelds
Linux. O so-loader dirige as bibliotecas Android originais do Unity
2022.3.61f1 IL2CPP e preserva a ordem do ciclo de vida nativo. O executável
público exige no máximo `GLIBC_2.27`.

Estado: **JOGÁVEL**. A 2.0.1 mantém os perfis `auto`, `low`, `medium` e `high`.
No dArkOSRE com cerca de 1 GB, `auto` escolhe `low`: render 320×240 ampliado
pixel-perfect para 640×480, texturas com teto 512 e RGBA4444. Também foram
validados separadamente `medium` e `high`, ambos em render nativo 640×480. O
ZIP exato passou por preflight, NXExtract, NXSplash obrigatória, recuperação
EGL, três provas de frame por perfil e saída limpa.

### Como funciona

O loader reproduz o fluxo Android em vez de atalhá-lo:

1. Mapeia e reloca a `libunity.so` original.
2. Executa construtores e `JNI_OnLoad`.
3. Mapeia a `libil2cpp.so` e expõe metadata e resources originais.
4. Registra e chama os pontos JNI do UnityPlayer na ordem nativa.
5. Cria EGL/fbdev GLES real e entrega superfície, resume e foco.
6. Executa `nativeRender` bombeando callbacks Java, FMOD e controle.
7. Na saída, remove foco, pausa a Unity, persiste preferências, para o áudio e
   usa o caminho seguro de encerramento do so-loader.

### Correções principais

| Área | Problema | Solução |
|---|---|---|
| Boot | Handles de proxy do Unity quebravam em `JNIBridge.invoke` | Separação correta entre GCHandle da ReflectionHelper e ponteiro nativo do JNIBridge |
| Dados | Caminhos Android de APK/files não existem no NextOS | Redirecionamento para a árvore original `bin/Data` |
| Render | Mali-450 só oferece GLES2 e sprites de alpha externo sumiam | Variantes GLES2 originais preservadas e alpha lido da textura principal decodificada |
| Imagem | O render-scale antigo estragava enquadramento e qualidade | FBO baseado no painel real e upscale inteiro NEAREST, ativado somente pelo perfil `low` |
| Provider EGL | dArkOSRE pode expor dispatcher versionado sem driver | Tenta primeiro a firmware; após falha KMSDRM comprovada, um único re-exec limpo usa `libEGL.so` + `libGLESv2.so` |
| Áudio | Streams assíncronos do FMOD terminavam em `ERR_INTERNAL` | FSB original aberto de forma síncrona e residente antes da falha do worker Android |
| Saída sonora | OpenSL ES Android não existe no sistema | Bridge OpenSL ES para SDL/PulseAudio, limitador suave e ganho validado de 1,5× |
| Controle | Rewired aceitava eventos, mas não associava movimento ao analógico | InputDevice Android completo e analógico esquerdo espelhado no caminho funcional do direcional, com zona morta e histerese |
| Saída | Faltava o combo padrão de handheld | `SELECT+START` sai do loop, pausa a Unity, grava o save e volta ao frontend |
| Performance | O scaler do Mali mantinha parte da GPU em apenas 400 MHz | Três pixel processors no nível oficial de 666 MHz, descarte de tile buffer e cadência nativa limitada a 30 FPS |
| Temperatura | O nível máximo não deve ficar forçado acima da faixa segura | Recua um nível a 82 °C, volta abaixo de 76 °C e restaura o governor original ao sair |

### Controles

| Controle | Ação |
|---|---|
| Analógico esquerdo / Direcional | Mover |
| A | Atacar / confirmar |
| B | Dash / cancelar |
| X | Item |
| L1 / R1 | Trocar herói |
| Start | Menu / pausa |
| Select + Start | Saída com persistência para o EmulationStation |

O bridge atual publica o primeiro controle SDL. Multiplayer local com controles
adicionais ainda não foi validado nesta entrega.

### Dados e instalação

As bibliotecas e os assets do jogo são proprietários e não ficam no repositório
nem no ZIP público. O pacote traz launcher, loader, manifestos, NXExtract,
NXSplash, licença, documentação e `userdata` vazio. A árvore Unity e as três
bibliotecas ARM64 só são instaladas a partir da cópia legal do dono. O pacote
não inclui containers do jogo, logs, saves pessoais, capturas, backups, fontes
ou binários antigos.

O port é BYO-data. O SHA-256 do container de referência identifica a cópia
testada, mas não é a única trava: a receita valida package ID, versão, ABI,
estrutura e payloads internos críticos. Uma build incompatível falha com
diagnóstico preciso antes de iniciar o jogo.

Ajustes de testador vão em `ports/oceanhorn/userdata/ocean-env.sh` (um `export`
por linha); esse arquivo sobrevive à atualização do port. Ver a tabela de
opções na seção em inglês.

### Compilar e executar

```sh
cd oceanhorn-nextos
./build_universal.sh
```

O script usa o builder AArch64 Debian Buster fixado e audita todos os requisitos
do ELF. A entrega 2.0.1 exige no máximo `GLIBC_2.27`, respeitando o teto público
`GLIBC_2.30`.

Entrada normal pelo frontend PortMaster:

```sh
/roms/ports/Oceanhorn\ Chronos\ Dungeon.sh
```

Execução direta de engenharia:

```sh
cd /roms/ports
./Oceanhorn\ Chronos\ Dungeon.sh
```

### Licença

Loader e launcher são GPL-3.0. As bibliotecas e os assets originais do jogo
continuam proprietários e não são cobertos por essa licença. Consulte `LICENSE`
e o aviso incluído na entrega pública BYO-data.

## Download

- [oceanhorn-v2.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v2.0.1) — `oceanhorn.zip`, `oceanhorn.zip.sha256`
- [oceanhorn-v1.0.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.7) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.7.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.7.zip.sha256`
- [oceanhorn-v1.0.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.6) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.6.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.6.zip.sha256`
- [oceanhorn-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.5) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.5.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.5.zip.sha256`
- [oceanhorn-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.4) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.4.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.4.zip.sha256`
- [oceanhorn-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.3) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.3.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.3.zip.sha256`
- [oceanhorn-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.2) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.2.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.2.zip.sha256`
- [oceanhorn-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.1) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.1.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.1.zip.sha256`
- [oceanhorn-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v1.0.0) — `Oceanhorn.Chronos.Dungeon.Universal.v1.0.0.zip`, `Oceanhorn.Chronos.Dungeon.Universal.v1.0.0.zip.sha256`

- Todas as versões / all versions: [releases?q=oceanhorn](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=oceanhorn)
- Histórico: 244 downloads no repositório original `oceanhorn-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
