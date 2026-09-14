# Huntdown — universal AArch64 Unity/IL2CPP port

**Language / Idioma:** [English](#english) · [Português](#português)

> **Status: PLAYABLE / JOGÁVEL.** Release 1.0.7 supports two internally
> correlated Android builds of Huntdown: version code `200023` (Unity
> 2022.3.47f1) and version code `200036` (Unity 6000.2.6f2). The port contains
> no game data.

[Download the latest release / Baixar a versão mais recente](https://github.com/NextOs-Ports/huntdown-nextos/releases/latest)

## Community / Comunidade

Questions, device reports and bug reports / Dúvidas, relatos de aparelhos e bugs:
[NextOS Discord](https://discord.gg/DHfY62eDNN)

---

## English

This directory contains an independent Linux compatibility loader for the
AArch64 Android releases of Huntdown listed below. It runs the original
Unity/IL2CPP code and preserves the Android boot, video, scene and shutdown
order.

| Profile | Android version | Unity | Physical evidence |
|---|---|---|---|
| `200023` | Huntdown 0.1.23 | 2022.3.47f1 | Playable on NextOS Mali-450/fbdev and ArkOS Mali-G31/KMS; the earlier external-movie path was physically exercised before 1.0.7 made presentation opt-in |
| `200036` | Huntdown 0.1 | 6000.2.6f2 | Native title/menu flow validated at 1280×720 on Mali-450/fbdev and at 640×480 on Mali-G31/KMS; 1.0.7 skips opening presentation through the normal callbacks |

The PowerVR/TrimUI, muOS and ROCKNIX paths were corrected from supplied device
logs and capability contracts. They are part of the universal release but are
not claimed as physical validation on hardware that was unavailable during this
release.

### Architecture

1. The runtime validates a correlated build profile before applying any private
   bridge or RVA.
2. It maps `libmain.so`, `libunity.so` and `libil2cpp.so` as the original
   Android flow requires, preserving constructors and `JNI_OnLoad` order.
3. Unity 2022 follows its classic loader path. Unity 6 follows the registered
   `NativeLoader` path and defers Unity/IL2CPP initialization until that path
   requests each library.
4. A typed JNI layer supplies Activity, package, storage, display, looper,
   reflection, persistent preferences and normal unavailable-service behavior.
5. SDL owns host input/audio. EGL chooses native Mali fbdev or SDL/KMS from the
   effective provider, vendor and renderer instead of trusting a firmware name.
6. The host drives the normal `nativeRender()` loop. Huntdown remains owner of
   scene changes, video-end callbacks, gameplay and teardown.

No managed boot state is skipped. Release 1.0.7 intentionally suppresses the
two authored opening-movie presentations and advances each one through its
normal Unity end callback; `HD_PLAY_MOVIES=1` retains the external decoder only
as a diagnostic opt-in. No future or mixed build receives offsets belonging to
a known profile.

### Problems solved

| Problem | Root cause | Solution |
|---|---|---|
| The game occupied only part of the screen on some devices | The adapter ignored the launcher's visible-display contract and could consume SDL's fallback size or a double-buffered framebuffer's virtual height | Share one display resolver across the window, EGL, JNI, video and render-scale bridges; prefer `DISPLAY_WIDTH`/`DISPLAY_HEIGHT` and use only visible framebuffer geometry |
| TrimUI/muOS had sound and controls but a black picture | Some PowerVR firmware reports the SDL driver as `mali`, causing raw Mali EGL ownership to be selected | Verify the real GL vendor/renderer and retain SDL ownership for PowerVR |
| ROCKNIX could show the splash and then a black screen | Unity required one coherent RGBA8888 SDL/KMS EGL contract | Enumerate real configs, select exact RGBA8888 and keep one context across Unity threads |
| Unity 6 stopped during native engine loading | The new build uses `NativeLoader`, AAudio and additional GLES3/Choreographer entry points | Preserve the Unity 6 loader order and provide typed AAudio, choreographer and GL bridges |
| Unity 6 waited forever for its render callback | `Class.forName` returned a generic object, so HandlerThread/Choreographer proxies lost their Java type | Resolve the requested class and reproduce the main-looper/HandlerThread lifecycle |
| Unity 6 aborted after a UI callback | A reflected `Runnable` was sent through the older JNIBridge and its exception leaked into UnityMain | Route ReflectionHelper proxies through `nativeProxyInvoke` and isolate JNI exception state per callback/thread |
| Unity 6 shaders require ES3 syntax on GLES2-only targets | Unity 6 emits ESSL 300 constructs absent from Mali-450 GLES2 | Translate only the recognized shader contract and emulate the required GLES3 calls; reject unsupported shaders |
| Unity 6 produced a correct first logo followed by corrupted geometry on Mali-450 | Utgard exposed unusable GLES3 dispatch thunks and GLES2 consumed Unity's GLES3 texture row/format state literally | Try native ES3 first, then negotiate a bounded ES2 EGL contract, prefer measured emulation, and translate pixel-store/sized-texture semantics only at the physical API boundary |
| Opening movies can stall or leave a decoder painting behind the menu | Native Linux firmware does not provide Android MediaNDK/Surface decoding consistently | Suppress their presentation by default and finish each through the native Unity `VideoPlayer` callback; retain external decoding only as an explicit diagnostic |
| Video presentation damaged the following Unity scene | The presenter reused Unity GL objects/state | Use presenter-owned objects and restore the complete GL state |
| FMOD stream creation failed for Android-style paths | The host path cannot satisfy the original `CREATESTREAM` request | Retry as a sample only after the exact FMOD stream failure |
| ETC2 assets on GLES2-only Mali | The device cannot upload every required ETC2 RGBA8 texture | Decode only the required textures in software; do not advertise fabricated ASTC support |
| Controller input was ignored | Huntdown reads its own IL2CPP `GamePad` layer | Bridge 19 exact methods selected by the correlated profile |
| A complete owner copy appeared as a trial | Android store entitlement is unavailable on native Linux | Restore only the exact validated `LocalStorage.IsPayed` contract |
| A 200 MB log could be produced during diagnosis | Developer tracing was enabled while repeating a render failure | Diagnostic tracing remains opt-in and is not enabled by the public launcher |

The port deliberately does not force global NPOT texture wrapping and does not
call the external `stat` command. Both choices avoid known cross-device
regressions.

### Controls

| Control | Action |
|---|---|
| Left stick / D-pad | Move and menu navigation |
| A | Jump / confirm |
| B | Interact in gameplay; cancel/back in menus |
| X or RB | Fire |
| Y | Throw / secondary action |
| LB or LT | Alternate action/interact binding |
| R2 or R3 | Dash |
| Start | Start / pause |
| Back | Back |
| Back + Start | Exit through native focus-loss and pause |

Player 1 was physically validated. A second SDL controller slot uses the same
normalized mapping. The firmware/PortMaster mapping has priority, canonical
controller databases are discovered across the supported CFW layouts, and the
canonical ordinal correction is applied only when an old `BTN_C`/`BTN_Z`
mapping belongs to an external USB/Bluetooth controller. Internal
`BUS_HOST`/I2C/SPI controls and modern semantic mappings are never rewritten.
`HUNTDOWN_PAD_MAP` remains an explicit manual override.

### Required game data

Use a legitimate copy from your own installation. NXExtract accepts a single
APK, a split APK set, APKM, APKS, XAPK or a compatible repack. It does **not**
lock compatibility to the container name, signature or whole-file SHA-256.
Instead it validates package ID `com.coffeestain.huntdown`, AArch64 ABI,
structure, exact internal engine/data identities and bridge signatures as one
correlated profile.

The tested reference container identities, sizes and complete installation
steps are recorded in `INSTALLATION.md`. Those whole-container hashes identify
the two tested copies only. Renaming, signing or harmlessly repacking a
container remains compatible when its critical internal payload is unchanged.
Mixed splits, a wrong ABI, another game or an unknown future build fail closed
before launch.

For a standalone APK during development:

```bash
# Run from the repository root.
./tools/prepare_data.sh /path/to/owner-copy.apk payload/runtime
./tools/verify_payload.sh payload/runtime
```

The public package performs the equivalent transactional preparation on the
device. Keep the owner container in `gamedata/` for recovery.

### Build, audit and run

```bash
# Run from the repository root.
./tests/run-egl-config-contract.sh
./tests/run-display-contract.sh
./tests/run-input-bindings.sh
./build_universal.sh
./tools/audit_candidate.sh ./huntdown-nextos /path/to/prepared/runtime
```

The public executable is `huntdown-nextos`. Every project-built Linux ELF in
the release is audited against the public `GLIBC <= 2.30` ceiling; the loader's
actual maximum is GLIBC 2.27. The public tree is generated from the immutable
`framework-v3` tag at commit `272165635235b9ac856e7a772930b038539a532a`:
nxbootstrap 0.6.37, NXExtract 1.2.21, nxgenerator 0.2.20, NXRelease 0.2.43 and
the unchanged canonical five-second NXSplash 0.1.2.

The resulting PortMaster layout is:

```text
Huntdown.sh
huntdown/
├── huntdown-nextos
├── INSTALLATION.md
├── nxport.json
├── port.json
├── nxsplash-nextos
├── nxextract/
├── tools/
├── video-compat/libvulkan.so.1
└── gamedata/
```

The launcher remains in the foreground, enforces a single game instance,
preserves the firmware-selected video/audio environment and always runs the
canonical NXSplash after the data gate and before the game.

### Source map

- `src/main.c` — ELF mapping, Android lifecycle, NativeLoader order and render loop.
- `src/huntdown_display.c` — visible-display contract shared by fbdev, DRM/KMS, JNI, EGL and render-scale.
- `src/huntdown_build.c` — correlated runtime profile selection.
- `src/jni_shim.c`, `src/nx_jni.c` — Java/JNI, reflection, loopers and preferences.
- `src/huntdown_input.c`, `src/huntdown_entitlement.c` — profile-specific input and entitlement bridges.
- `src/huntdown_paths.c`, `src/huntdown_video.c` — StreamingAssets and authored-video callbacks.
- `src/huntdown_audio.c`, `src/opensles_shim.c`, `src/aaudio_shim.c` — FMOD, OpenSL ES and Unity 6 AAudio.
- `src/egl_shim.c`, `src/gles3.c`, `src/unity6_shader.c` — EGL ownership, GLES3 compatibility and bounded shader translation.
- `src/etc2_decode.c`, `src/astc_decode.c` — texture capability fallbacks.
- `tools/validate_huntdown_data.py` — exact correlated payload and bridge-signature gate.
- `extractor.json` — multi-container BYO-data recipe.

### Licenses

The compatibility-loader source is GPL-3.0-only with inherited notices in
`NOTICE.md` and `licenses/`. Huntdown, Unity/IL2CPP libraries and all game data
remain proprietary works of their respective rightsholders and are not part of
the public ZIP.

---

## Português

Esta pasta contém um loader Linux independente para duas versões Android
AArch64 do Huntdown. Ele executa o código Unity/IL2CPP original e preserva a
ordem nativa de boot, vídeos, cenas e encerramento.

| Perfil | Versão Android | Unity | Evidência física |
|---|---|---|---|
| `200023` | Huntdown 0.1.23 | 2022.3.47f1 | Jogável em NextOS Mali-450/fbdev e ArkOS Mali-G31/KMS; o caminho antigo de filmes externos foi exercitado fisicamente antes de a 1.0.7 tornar sua apresentação opt-in |
| `200036` | Huntdown 0.1 | 6000.2.6f2 | Fluxo nativo de título/menu validado em 1280×720 no Mali-450/fbdev e em 640×480 no Mali-G31/KMS; a 1.0.7 pula a apresentação pelos callbacks normais |

Os caminhos PowerVR/TrimUI, muOS e ROCKNIX foram corrigidos usando os logs
fornecidos e contratos de capacidade. Eles integram a release universal, mas
não são apresentados como prova física em aparelhos que não estavam
disponíveis nesta release.

### Arquitetura

1. O runtime valida um perfil correlacionado antes de aplicar qualquer bridge
   privado ou RVA.
2. `libmain.so`, `libunity.so` e `libil2cpp.so` são mapeadas na ordem exigida
   pelo fluxo Android, preservando construtores e `JNI_OnLoad`.
3. A Unity 2022 usa o caminho clássico. A Unity 6 usa o `NativeLoader`
   registrado e só inicializa Unity/IL2CPP quando esse fluxo pede cada módulo.
4. O JNI tipado cobre Activity, pacote, storage, display, looper, reflexão,
   preferências persistentes e falhas normais de serviços ausentes.
5. A SDL cuida de controle/áudio. O EGL escolhe Mali fbdev nativo ou SDL/KMS
   pelo provider, vendor e renderer reais, sem confiar no nome do firmware.
6. O host dirige `nativeRender()` normalmente. O jogo continua dono de cenas,
   callbacks de fim dos vídeos, gameplay e teardown.

Nenhum estado gerenciado é pulado. A release 1.0.7 suprime deliberadamente a
apresentação dos dois vídeos iniciais e avança cada um pelo callback normal de
fim da Unity; `HD_PLAY_MOVIES=1` conserva o decoder externo apenas como opt-in
de diagnóstico. Nenhum build misturado ou futuro recebe offsets de um perfil
conhecido.

### Problemas resolvidos

| Problema | Causa | Correção |
|---|---|---|
| O jogo ocupava somente parte da tela em alguns aparelhos | O adapter ignorava o contrato de display visível do launcher e podia consumir o fallback da SDL ou a altura virtual dobrada do framebuffer | Usar um resolvedor único na janela, EGL, JNI, vídeo e render-scale; priorizar `DISPLAY_WIDTH`/`DISPLAY_HEIGHT` e aceitar do framebuffer somente a geometria visível |
| TrimUI/muOS tinha som e controle, mas imagem preta | Alguns firmwares PowerVR chamam o driver SDL de `mali`, selecionando indevidamente EGL cru Mali | Conferir vendor/renderer GL real e manter ownership SDL no PowerVR |
| ROCKNIX podia mostrar o splash e depois ficar preto | A Unity precisava de um contrato EGL SDL/KMS RGBA8888 coerente | Enumerar configs reais, selecionar RGBA8888 exato e manter um contexto entre as threads Unity |
| Unity 6 parava ao carregar a engine | O novo build usa `NativeLoader`, AAudio e entradas extras GLES3/Choreographer | Preservar a ordem Unity 6 e fornecer bridges tipados para AAudio, choreographer e GL |
| Unity 6 aguardava indefinidamente o callback gráfico | `Class.forName` devolvia objeto genérico e os proxies perdiam o tipo Java | Resolver a classe pedida e reproduzir o lifecycle de main looper/HandlerThread |
| Unity 6 abortava depois de callback de UI | Um `Runnable` refletido passava pelo JNIBridge antigo e vazava exceção para UnityMain | Enviar ReflectionHelper por `nativeProxyInvoke` e isolar exceções JNI por callback/thread |
| Shaders Unity 6 usam sintaxe ES3 em alvos apenas GLES2 | A Unity 6 emite construções ESSL 300 inexistentes no Mali-450 | Traduzir somente o contrato reconhecido e emular as chamadas GLES3 necessárias |
| Unity 6 mostrava o primeiro logo correto e depois geometria corrompida no Mali-450 | O Utgard expunha thunks GLES3 inutilizáveis e o GLES2 consumia literalmente o estado GLES3 de linhas/formatos de textura | Tentar ES3 nativo primeiro, negociar uma ponte EGL ES2 limitada quando necessário, preferir a emulação medida e traduzir pixel-store/formatos somente na fronteira física |
| Vídeos iniciais podiam travar ou deixar decoder desenhando atrás do menu | O firmware Linux não oferece MediaNDK/Surface Android de modo uniforme | Suprimir a apresentação por padrão e concluir cada vídeo pelo callback nativo do `VideoPlayer`; manter decode externo somente como diagnóstico explícito |
| A cena posterior ao vídeo podia ficar preta | O presenter reutilizava objetos/estado GL da Unity | Objetos próprios e restauração completa do estado GL |
| FMOD falhava ao abrir stream | O caminho Android não satisfazia `CREATESTREAM` no host | Repetir como sample só depois da falha FMOD exata |
| ETC2 num Mali apenas GLES2 | Nem toda textura ETC2 RGBA8 podia ser enviada | Decode por software somente das texturas exigidas, sem ASTC inventado |
| Controle físico era ignorado | Huntdown usa sua própria camada IL2CPP `GamePad` | Bridge de 19 métodos exatos selecionados pelo perfil |
| Cópia completa aparecia como demo | O entitlement da loja Android não existe no Linux nativo | Restaurar somente o contrato exato e validado `LocalStorage.IsPayed` |
| Log podia chegar a 200 MB durante diagnóstico | Tracing de desenvolvimento ficou ativo ao repetir uma falha de render | Diagnósticos continuam opt-in e não são ligados pelo launcher público |

O port não força wrap NPOT global e não chama o comando externo `stat`, evitando
duas regressões conhecidas entre firmwares.

### Controles

| Controle | Ação |
|---|---|
| Analógico esquerdo / D-pad | Movimento e navegação |
| A | Pular / confirmar |
| B | Interagir no gameplay; cancelar/voltar nos menus |
| X ou RB | Atirar |
| Y | Arremessar / ação secundária |
| LB ou LT | Ação/interação alternativa |
| R2 ou R3 | Dash |
| Start | Start / pause |
| Back | Voltar |
| Back + Start | Sair por perda de foco e pause nativo |

O jogador 1 foi validado fisicamente. Um segundo controle SDL usa o mesmo
mapeamento normalizado. O mapping explícito do firmware/PortMaster tem
prioridade, bancos canônicos são descobertos nos layouts dos CFWs suportados e
a correção ordinal canônica só entra quando o mapeamento antigo `BTN_C`/`BTN_Z`
pertence a um controle USB/Bluetooth externo. Controles internos
`BUS_HOST`/I2C/SPI e mappings semânticos modernos nunca são reescritos.
`HUNTDOWN_PAD_MAP` continua disponível como override manual.

### Dados obrigatórios

Use uma cópia legítima da sua própria instalação. O NXExtract aceita APK único,
conjunto de APKs split, APKM, APKS, XAPK ou repack compatível. A compatibilidade
**não** fica presa ao nome, assinatura nem SHA-256 do container inteiro. A
receita valida package ID `com.coffeestain.huntdown`, ABI AArch64, estrutura,
identidades internas exatas e assinaturas dos bridges como um perfil
correlacionado.

As identidades e tamanhos dos dois containers de referência, além do passo a
passo completo, estão em `INSTALLATION.md`. Os hashes do container inteiro
servem apenas para identificar as cópias testadas. Renomear, assinar ou
reempacotar sem mudar o payload crítico continua aceito. Splits misturados, ABI
errada, outro jogo ou build futuro desconhecido falham antes do lançamento.

Para preparar um APK único durante o desenvolvimento:

```bash
# Execute a partir da raiz do repositório.
./tools/prepare_data.sh /caminho/para/copia-do-dono.apk payload/runtime
./tools/verify_payload.sh payload/runtime
```

O pacote público faz a preparação transacional equivalente no aparelho.
Mantenha o container em `gamedata/` para recuperação.

### Compilar, auditar e executar

```bash
# Execute a partir da raiz do repositório.
./tests/run-egl-config-contract.sh
./tests/run-display-contract.sh
./tests/run-input-bindings.sh
./build_universal.sh
./tools/audit_candidate.sh ./huntdown-nextos /caminho/para/runtime/preparado
```

O executável público é `huntdown-nextos`. Todos os ELFs Linux construídos pelo
projeto são auditados contra o teto público `GLIBC <= 2.30`; o máximo real do
loader é GLIBC 2.27. A árvore pública nasce da tag imutável `framework-v3`,
commit `272165635235b9ac856e7a772930b038539a532a`: nxbootstrap 0.6.37, NXExtract
1.2.21, nxgenerator 0.2.20, NXRelease 0.2.43 e NXSplash canônica 0.1.2 de cinco
segundos, sem alteração visual.

O layout PortMaster resultante é:

```text
Huntdown.sh
huntdown/
├── huntdown-nextos
├── INSTALLATION.md
├── nxport.json
├── port.json
├── nxsplash-nextos
├── nxextract/
├── tools/
├── video-compat/libvulkan.so.1
└── gamedata/
```

O launcher fica em foreground, impede duas instâncias, preserva o ambiente de
vídeo/áudio escolhido pelo firmware e sempre executa a NXSplash canônica depois
do gate de dados e antes do jogo.

### Mapa de fontes

- `src/main.c` — mapeamento ELF, lifecycle Android, ordem NativeLoader e render loop.
- `src/huntdown_display.c` — contrato de display visível compartilhado por fbdev, DRM/KMS, JNI, EGL e render-scale.
- `src/huntdown_build.c` — seleção correlacionada do perfil em runtime.
- `src/jni_shim.c`, `src/nx_jni.c` — Java/JNI, reflexão, loopers e preferências.
- `src/huntdown_input.c`, `src/huntdown_entitlement.c` — input e entitlement por perfil.
- `src/huntdown_paths.c`, `src/huntdown_video.c` — StreamingAssets e callbacks dos vídeos.
- `src/huntdown_audio.c`, `src/opensles_shim.c`, `src/aaudio_shim.c` — FMOD, OpenSL ES e AAudio Unity 6.
- `src/egl_shim.c`, `src/gles3.c`, `src/unity6_shader.c` — EGL, compatibilidade GLES3 e tradução limitada de shaders.
- `src/etc2_decode.c`, `src/astc_decode.c` — fallbacks de textura por capacidade.
- `tools/validate_huntdown_data.py` — gate exato do payload e das assinaturas.
- `extractor.json` — receita BYO-data multi-container.

### Licenças

O código do loader de compatibilidade é GPL-3.0-only, com avisos herdados em
`NOTICE.md` e `licenses/`. Huntdown, bibliotecas Unity/IL2CPP e todos os dados do
jogo continuam obras proprietárias dos seus titulares e não integram o ZIP
público.

## Download

- [huntdown-v1.0.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/huntdown-v1.0.7) — `huntdown-nextos-v1.0.7.zip`, `huntdown-nextos-v1.0.7.zip.sha256`
- [huntdown-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/huntdown-v1.0.5) — `huntdown-nextos-v1.0.5.zip`, `huntdown-nextos-v1.0.5.zip.sha256`
- [huntdown-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/huntdown-v1.0.4) — `huntdown-nextos-v1.0.4.zip`, `huntdown-nextos-v1.0.4.zip.sha256`

- Todas as versões / all versions: [releases?q=huntdown](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=huntdown)
- Histórico: 172 downloads no repositório original `huntdown-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
