# Tearscape — universal AArch64 PortMaster port

## English

Tearscape runs through a deterministic, frozen-input Godot 4.6.1 Mono AArch64 engine built for
the public GLIBC 2.30 ceiling. The public ZIP is BYO-data: NXExtract obtains the
exported project and four owner assemblies from the user's compatible APK on
first launch. The official Microsoft .NET 10.0.3 Linux arm64 runtime is packaged
separately and no Android executable enters the Linux runtime path.

### Architecture

- Godot 4.6.1 compatibility renderer, patched only for the port's Linux video,
  controller and EGL/GLES adaptation boundaries.
- Video provider: the raw framebuffer/EGL provider drives the shim on every
  family (`NX_TEARSCAPE_VIDEO=fbdev` is the normal policy); `sdl2` and `auto`
  are reserved for diagnosis.
- On a compositor session (Wayland) the launcher selects the `sdl2` provider
  and, since 0.2.16, the window geometry is SDL's own: the display bounds are
  requested, the window is FULLSCREEN_DESKTOP, the first authoritative
  configure is awaited (bounded), fullscreen is re-asserted from inside the
  runtime when the compositor did not grant it, and every later resize
  reaches the Godot viewport through `rect_changed_callback`. The raw
  `/dev/fb0` geometry is never the window size there; it stays authoritative
  only for the raw fbdev/EGL provider. A JSON-lines receipt
  (`nxgeometry-receipt.jsonl`, schema `nx-geometry-proof/1`) records the
  measured geometry for the release gate.
- Every family runs on a physical GLES2 context through the port-local shim
  that translates the Godot GLES3 compatibility stream to GLES2. On DRM
  devices the shim additionally drives the firmware's SDL2/KMSDRM as the
  window, context and page-flip owner (the physically proven ES2 facade);
  on legacy fbdev devices it keeps the raw EGL path. Neither path changes
  the game's native initialization or frame order.
- The 0.2.10 source integrates Framework V4 nxinput 0.10.0 into Godot's pinned,
  static joystick-only SDL 3.2.30 subset. The ZIP carries no private SDL shared
  library and does not replace the firmware video provider. It admits each
  real pad before SDL announces it, using PortMaster's sovereign mapping,
  measured capabilities and GUID readback. SDL3's bounded name-CRC identity
  projection is accepted only when every other GUID byte is identical. No
  controller name or model authorizes a binding rewrite. The joydev/evdev
  domain of every candidate line is decided by SEMANTIC PROOF against the
  measured key set of the exact event node (nxinput 0.10.0); an ambiguous or
  invalid source yields to the next authority instead of passing silently.
  No virtual keyboard process owns the controller. The in-engine GPTK live
  boundary starts unproven and keeps input native until the current scene and
  every real InputMap sink are confirmed. On the muOS family A/B and X/Y are
  a USER PREFERENCE (two official database halves re-linked by the boot), so
  the invariant `controllers.nxb` base retains only the physically measured
  GO-Super line, while the two authenticated variants
  `controllers-modern.nxb`/`controllers-retro.nxb` carry the official
  modern/retro halves byte-intact. The `NEXTOS_CONTROLLERS/3` map's
  `FACE_LAYOUT = auto|modern|retro` (default auto) selects only WHICH of the
  three may serve as authority 3; a live env mapping or the CFW's current
  database always wins, and when the CFW's runtime database symlink is still
  being recreated by the boot, the engine waits for it briefly (bounded,
  snapshot-stable) instead of freezing a layout. Everything is declared
  before SDL initialization and never guessed.
- ALSA provides audio. The game keeps its native menus, gameplay flow and C#
  assemblies.
- The CRT post-processing pass is intentionally disabled. Its menu switch and
  saved value remain compatible, but ON is an effect-free no-op: the launcher
  replaces only the extracted CRT shader with an inert fragment before Godot
  starts and disables the unused screen-mipmap emulation. This avoids the
  Mali-450 cost and the black-screen-with-audio failure without rebuilding or
  replacing the physically approved Godot executable.

### Runtime data

See `INSTALLATION.md` for the exact reference game identity. NXExtract rejects
another package, wrong ABI, missing structure and incompatible critical
payloads. Container filename, signature, member ordering and whole-file hash do
not independently decide compatibility.

### Owner settings: screen aspect (NEXTOS_SETTINGS/2)

`ports/tearscape/NEXTOSSETTINGS.txt` is yours. The launcher seeds it once from
`defaults/NEXTOSSETTINGS.txt` and never overwrites it (a newer template is
offered as `NEXTOSSETTINGS.txt.new`). Schema `NEXTOS_SETTINGS/2` keeps the
strict `key=value` grammar. Its key `video.aspect` accepts `auto` (default),
`preserve`, `stretch` and `engine`. `auto` preserves the established behavior:
it fills every panel, including 4:3 and square panels. On a 720x720 display,
change only `video.aspect=auto` to `video.aspect=preserve` for centred 16:9
letterbox. `engine` leaves `game/override.cfg` (also editable) in control.
The logical
640x360 viewport is never changed: only Godot's `keep`/`ignore` are applied,
because the game derives its camera zoom from the viewport height. The
decision is logged as `nx/video: aspect ...` and written as one `aspect` line
in `nxgeometry-receipt.jsonl` (requested/effective/source/content rect).

### Controls and lifecycle

The left stick/D-pad navigate and move. The firmware/PortMaster mapping first
normalizes physical controls; the live NEXTOSCONTROLLERS map then delivers the
selected semantic actions to Tearscape's real InputMap sinks. START keeps the
game's pause/menu behavior. SELECT+START on one controller requests a clean
port exit the instant both are down; cross-pad combinations do not, and no hold
or delay may ever be inserted between the gesture and the exit. The editable map governs only the
primary pad in single-player. Additional pads and all co-op input stay on
Tearscape's native device-aware path. Starting co-op and the map's native
button zoom therefore retain the physical event identity the game requires.

### Build

`build_low_glibc.sh` performs exactly one frozen-input engine build with at
most two workers and low priority. A second build is rejected; any successor
requires a new frozen commit. The final package
builder verifies a clean pinned Framework V5 checkout, materializes the exact
.NET execution closure (excluding optional debugger/tracing libraries that
carry an upstream RUNPATH or a non-universal tracing dependency), generates
the launcher through nxgenerator, and invokes one
nxrelease 0.4.9 human-authority build that stages, packages and verifies the
deterministic ZIP once.

### Changelog

- 0.2.19: fixes DRM graphics-library selection that could force an older Mali
  userspace library despite the firmware's library search order. SDL now uses
  the same versioned EGL/GLES sonames as the frozen translation shims; complete
  and partial explicit overrides are preserved. Godot and both GLES2 facade
  libraries remain byte-identical to 0.2.18. This update is host-tested only;
  the reported ArkOS `user 10.6, kernel 11.7` failure still needs device confirmation.
- 0.2.18: V5 `auto-stretch` keeps the proven full-panel presentation on every
  drawable. Owners of 720x720 panels opt into 16:9 letterbox by changing the
  single line to `video.aspect=preserve`; no model/CFW heuristic is used.
  Controls and their live mappings are unchanged in behavior.
- 0.2.17: owner settings `NEXTOSSETTINGS.txt` (NEXTOS_SETTINGS/2, key `aspect`),
  seeded once by the launcher and never overwritten; the display server applies
  `auto|preserve|stretch|native` before the root window exists, keeps 16:9 and
  4:3 panels byte-for-byte on the proven fill behaviour and letterboxes square
  panels (RG CubeXX 720x720 field report). Decision logged and recorded as an
  `aspect` line in the geometry receipt; gate `make_geometry_proof.py` checks
  its geometry. Host tests: `tests/video/test_aspect_policy.c`,
  `tests/video/test_nextossettings.sh`.
- 0.2.16: SDL2 window geometry authority for compositor sessions. The
  display server no longer requests the raw framebuffer size from SDL2; it
  uses SDL's display bounds, waits for the first authoritative configure,
  sets the `SDL_APP_ID` hint / `SDL_VIDEO_WAYLAND_WMCLASS` before video init
  (env first, else executable basename), ensures fullscreen from inside the
  runtime and forwards live resizes to the engine. New receipt
  `nx-geometry-proof/1` (`NXGEOMETRY_RECEIPT`), gate consumer
  `recipes/make_geometry_proof.py`, host gate `tests/video/run-geometry-host.sh`
  with a fake libSDL2. The fbdev/EGL provider is unchanged. The shim's
  `GL_VERSION` string is now the neutral `OpenGL ES 3.0 (NextOS nxgles3 facade)`.
- 0.2.11: disables the optional CRT pass fail-safe on every device. The menu
  option remains present, but OFF and ON now render the same native image;
  no SCREEN_TEXTURE copy or mip pyramid is requested. The Godot executable
  is preserved byte-for-byte.
- 0.2.10: the muOS layout authority. A/B and X/Y are a user preference on
  muOS, so the frozen bundle never decides them again: invariant base +
  authenticated modern/retro variants, `NEXTOS_CONTROLLERS/3` with
  `FACE_LAYOUT = auto` by default, the GPTK read moved to a single pre-init
  boundary before SDL_Init, the benign `0` of the bundle declaration no
  longer kills the joypad driver, the live database symlink gets a bounded
  snapshot-stable wait, the joydev/evdev domain is decided by semantic
  proof, and every C6 admission receipt reaches the normal log.
- 0.2.9 (immutable framework pin closed; one-shot build and physical muOS
  proof pending): opts this port into nxinput 0.9.0. The C6 seam retains
  the exact `Deeplay-keys` line from the official muOS 2601.1 ROM as the first
  authority-3 fallback, projects only its zero name-CRC GUID to the matching
  live GUID, and then converts legacy joydev button ordinals to the measured
  current SDL evdev domain. Conversion requires capabilities from that exact
  event node plus the two volume-key markers, is never selected by controller
  name/model, and is a byte-for-byte no-op for native mappings. The previously
  approved GO-Super profile remains as the second exact-GUID source. Release
  refresh and packaging fix and verify the exact annotated
  `nxinput-v0.9.0` tag object and its commit before any candidate can exist.
- 0.2.8: in-world dialogue can be closed again, and the SELECT+START chord no
  longer fires by accident. Tearscape's own InputMap binds JoypadButton 0 to
  BOTH `roll` and `ui_accept`, and `DialogueManager` advances a sign or NPC line
  on `ui_accept` without ever pausing the tree. The live governor suppressed the
  physical button and synthesized only `roll`, so during gameplay no press could
  dismiss a dialogue: the text stayed on screen for good. A governed button now
  also delivers the companion action the same physical button carries in the
  game, on the same edge and the same latch, and a companion that cannot be
  delivered fails the delivery instead of half-succeeding. The SELECT+START
  lifecycle chord keeps firing on the instant both buttons are down: a 600 ms
  hold was tried in this same version and reverted after physical proof showed
  it stopped closing the game, which is a release-blocking guarantee. The chord
  now prints an unconditional receipt when it fires, so a support log can tell
  a deliberate exit from a real fault — the clean status 0 it produces reads
  like a crash otherwise. The engine was rebuilt from the same frozen inputs;
  no other runtime behavior changes.
- 0.2.7: fixes the live GPTK governor without reverting the engine. Tearscape's
  custom menu focus no longer gets mistaken for gameplay: UI scene paths prove
  standalone menus, while the game's own `SceneTree.paused` transition proves
  pause/map/dialog/inventory overlays over gameplay. Every
  declared InputMap sink is checked at runtime, unknown scenes or missing sinks
  fail safe to native controls, and every delivery requires an ACK from the
  adapter sink. Player movement targets the assembly-confirmed `move_*` actions;
  the byte after each length-prefixed name in `project.binary` is Variant
  metadata, never an action-name suffix.
  START now reaches the assembly-confirmed `menu` action consumed by
  `UiManager`; the unrelated `pause` action is no longer mistaken for the
  pause-menu sink.
  GPTK governs only the primary single-player pad; additional pads and co-op
  remain native, preserving player identity. `start_coop` is deliberately
  native, and the generated default no longer turns the button-only map zoom
  into a continuously repeated right-stick action. An older owner mapping that
  still assigns a stick to zoom is accepted only while the proved gameplay
  context is active and is reduced to one edge per radial gesture; it is not a
  claim that right-stick zoom remains editable inside the paused minimap.
  A failed adapter enqueue/release ACK latches the session fatal, blocks the
  health receipt (revoking it if already published) and terminates nonzero
  rather than replaying or accepting later physical input. Hotplug promotion
  snapshots every button and six SDL axes before a remaining pad becomes P1,
  so a gesture that began natively cannot be stolen midway. Enqueue is not
  claimed as semantic consumption; that
  binding remains port-owned release evidence.
  nxrelease binds the final ELF, generated map, promoted adapter, contexts and
  sinks through an external input-proof lock. The physically approved GLES2
  render route is preserved and now carries a bounded, pre-present non-black
  frame proof; extraction and the healthy fast path keep their established UI.
- 0.2.6: adopts the latest integrated V4 boot line: nxbootstrap 0.7.6 and
  nxrelease 0.3.11. The O(1) healthy fast path from 0.7.5 is preserved, and a
  fresh installation can no longer lock its only authenticated generation
  after repeated launches without an adapter health receipt. The approved
  0.2.5 engine and both GLES2-facade shims are reused byte-for-byte; graphics,
  shaders, controls, audio and gameplay are unchanged.
- 0.2.5: NEXTOSCONTROLLERS.gptk becomes a LIVE runtime. The engine loads the
  owner-editable mapping (or the immutable default) through the canonical
  nxinput GPTK loader, decides action/null/native per control and per
  context (menu/gameplay), suppresses governed controls before the native
  path and delivers real InputMap actions. Editing the file remaps the game
  with no rebuild. SELECT+START stays sovereign and unmappable. Framework
  moves to nxgenerator 0.3.8 / nxrelease 0.3.10, whose new gate verifies the
  runtime is really linked before any editable claim ships.
- 0.2.4: adopts Framework V4 at the nxbootstrap 0.7.5 integration commit.
  Healthy boots become O(1): the launcher no longer re-verifies and re-heals
  the whole 197-member closure on every start (minutes of silent black screen
  on FAT cards); deep verification moves to real recovery events, is batched
  and always announced. nxinput moves to 0.7.2 (GUID name-CRC projection on
  the SDL2 route), nxgenerator 0.3.7 and nxrelease 0.3.9 (visible-seed protection). The graphics path
  is byte-unchanged from 0.2.3.
- 0.2.3: the DRM/Mali path returns to the physical-GLES2 floor. 0.2.2 kept a
  native-GLES3 SDL2/KMSDRM main path that produced a black screen with audio
  on DRM Mali devices even though the context, page flip and shader log were
  healthy. The shim now ships its SDL2/KMSDRM ES2 facade, the adapter selects
  it whenever a usable DRM node exists, and a source gate forbids promoting
  native GLES3 to the main path again.
- 0.2.2: fixes the black screen on DRM/Mali-G31 devices. The patched canvas
  shader compared a signed light count with unsigned operands; strict ESSL
  3.00 compilers rejected the fragment shader, so nothing was drawn while
  audio played. The count is now unsigned and a source gate rejects the
  mixed form. Engine bytes change; shims, adapter and providers do not.
- 0.2.1: invalidated by that black screen.

### Licensing

Port code and the integrated nxinput sources are GPL-3.0-only. Godot, SDL,
.NET and Khronos notices are included in `licenses/`. Tearscape game data and
assemblies remain the property of their authors and are never redistributed.

## Português

Tearscape roda por uma engine Godot 4.6.1 Mono AArch64 reproduzível, construída
para o teto público GLIBC 2.30. O ZIP público é BYO-data: na primeira abertura,
o NXExtract obtém do APK compatível do dono o projeto exportado e quatro
assemblies do jogo. O runtime oficial Microsoft .NET 10.0.3 Linux arm64 segue
separado, e nenhum executável Android entra no caminho de execução Linux.

### Arquitetura

- Renderer de compatibilidade do Godot 4.6.1, alterado somente nas fronteiras
  Linux de vídeo, controles e adaptação EGL/GLES do port.
- Provider de vídeo: o provider de framebuffer/EGL cru dirige o shim em toda
  família (`NX_TEARSCAPE_VIDEO=fbdev` é a política normal); `sdl2` e `auto`
  servem apenas para diagnóstico.
- Toda família roda em contexto físico GLES2 pelo shim local que traduz o
  fluxo de compatibilidade GLES3 do Godot para GLES2. Em devices DRM o shim
  também dirige o SDL2/KMSDRM do firmware como dono de janela, contexto e
  page flip (a fachada ES2 comprovada fisicamente); em devices fbdev legados
  mantém o caminho EGL cru. Nenhum caminho pula a inicialização nem altera a
  ordem de frames nativa do jogo.
- A fonte 0.2.10 integra o Framework V4 nxinput 0.10.0 ao subconjunto SDL 3.2.30
  estático, fixado e limitado a joystick dentro do Godot. O ZIP não leva uma
  biblioteca SDL compartilhada privada nem substitui o provider de vídeo do
  firmware. Cada pad real é
  admitido antes do anúncio do SDL, usando mapping soberano do PortMaster,
  capacidades medidas e readback por GUID. A projeção limitada do CRC de nome
  do SDL3 só é aceita quando todos os demais bytes do GUID são idênticos.
  Nome ou modelo do controle jamais autorizam reescrever bindings. O domínio
  joydev/evdev de cada linha candidata é decidido por PROVA SEMÂNTICA contra
  o conjunto de teclas medido do event node exato (nxinput 0.10.0); fonte
  ambígua ou inválida cede à próxima autoridade em vez de passar em silêncio.
  Nenhum processo de teclado virtual toma posse do controle. A fronteira GPTK
  viva dentro da engine começa não provada e mantém a entrada nativa até
  confirmar a cena atual e todos os sinks reais da InputMap. No muOS, A/B e
  X/Y são PREFERÊNCIA do usuário (duas metades oficiais religadas pelo boot):
  a base invariante `controllers.nxb` retém somente a linha GO-Super medida
  fisicamente, e as variantes autenticadas `controllers-modern.nxb`/
  `controllers-retro.nxb` carregam byte-intactas as metades oficiais. O
  `FACE_LAYOUT = auto|modern|retro` do mapa `NEXTOS_CONTROLLERS/3` (default
  auto) escolhe apenas QUAL dos três pode servir de autoridade 3; env viva ou
  o banco corrente do CFW sempre vencem, e quando o symlink do banco de
  runtime ainda está sendo recriado pelo boot a engine espera brevemente
  (limitado, snapshot estável) em vez de congelar um layout. Tudo é declarado
  antes da inicialização do SDL e jamais sintetizado por palpite.
- ALSA fornece o áudio. Menus, gameplay e assemblies C# nativos são preservados.
- O pós-processamento CRT fica intencionalmente desativado. A opção do menu e
  o valor salvo continuam compatíveis, mas ON vira um no-op sem efeito: antes
  do Godot iniciar, o launcher troca somente o shader CRT extraído por um
  fragmento inerte e desliga a emulação de mipmaps de tela que deixou de ser
  usada. Isso elimina o custo no Mali-450 e a falha de tela preta com áudio
  sem recompilar nem substituir o executável Godot aprovado fisicamente.

### Dados de runtime

Consulte `INSTALLATION.md` para a identidade exata do jogo de referência. O
NXExtract rejeita outro pacote, ABI errada, estrutura ausente e payload crítico
incompatível. Nome, assinatura, ordem dos membros e hash integral do container
não decidem compatibilidade isoladamente.

### Ajustes do dono: proporção da tela (NEXTOS_SETTINGS/2)

`ports/tearscape/NEXTOSSETTINGS.txt` é seu. O launcher o semeia uma vez a partir
de `defaults/NEXTOSSETTINGS.txt` e nunca o sobrescreve (um modelo novo aparece
como `NEXTOSSETTINGS.txt.new`). O schema `NEXTOS_SETTINGS/2` mantém a gramática
estrita `chave=valor`. Sua chave `video.aspect` aceita `auto` (padrão),
`preserve`, `stretch` e `engine`. `auto` mantém o comportamento já aprovado:
preenche qualquer painel, inclusive 4:3 e quadrado. Em uma tela 720x720, altere
somente `video.aspect=auto` para `video.aspect=preserve` para obter 16:9
centralizado com barras. `engine` deixa o `game/override.cfg` (também editável)
no controle. O viewport
lógico 640x360 nunca muda: só o `keep`/`ignore` do Godot é aplicado, porque o
jogo deriva o zoom da câmera da altura do viewport. A decisão sai no log como
`nx/video: aspect ...` e como uma linha `aspect` em `nxgeometry-receipt.jsonl`
(requested/effective/source/content rect).

### Controles e lifecycle

Analógico esquerdo/D-pad navegam e movem. O mapping do firmware/PortMaster
normaliza primeiro os controles físicos; o NEXTOSCONTROLLERS vivo entrega as
ações semânticas escolhidas aos sinks reais da InputMap do Tearscape. START
preserva o pause/menu do jogo. SELECT+START no mesmo controle solicitam saída
limpa no instante em que os dois estão pressionados; a combinação entre pads
diferentes não dispara, e nenhum hold ou atraso pode ser inserido entre o gesto
e a saída. O mapping editável
governa apenas o pad primário no modo de um jogador. Pads adicionais e todo o
co-op permanecem no caminho nativo do Tearscape, que conserva a identidade do
device. Assim, iniciar co-op e o zoom nativo por botão continuam recebendo o
tipo de evento físico exigido pelo jogo.

### Build

`build_low_glibc.sh` faz exatamente um build com inputs congelados, no máximo
dois workers e prioridade baixa. Um segundo build é recusado; qualquer sucessor
exige novo commit congelado. O empacotador final valida o
checkout limpo e fixado do Framework V5, materializa a closure de execução .NET
exata (sem bibliotecas opcionais de depuração/tracing que trazem RUNPATH ou uma
dependência de tracing não universal), gera o launcher pelo nxgenerator e chama
um único build em autoridade humana do nxrelease 0.4.9, que faz stage, ZIP
determinístico e uma única verificação do arquivo final.

### Changelog

- 0.2.19: corrige a seleção de bibliotecas gráficas em DRM que podia forçar uma
  Mali antiga apesar da ordem de busca do firmware. A SDL passa a usar os mesmos
  sonames versionados EGL/GLES dos shims congelados; overrides explícitos completos
  ou parciais são preservados. Godot e as duas bibliotecas da fachada GLES2 mantêm
  exatamente os bytes da 0.2.18. Atualização testada somente no host; o relato
  ArkOS `user 10.6, kernel 11.7` ainda precisa de confirmação no aparelho.
- 0.2.18: o `auto-stretch` V5 mantém o preenchimento já aprovado em todo
  drawable. Donos de tela 720x720 escolhem 16:9 com barras alterando uma única
  linha para `video.aspect=preserve`; não há heurística por modelo/CFW.
  O comportamento dos controles e dos mappings vivos permanece igual.
- 0.2.17: ajustes do dono `NEXTOSSETTINGS.txt` (NEXTOS_SETTINGS/2, chave
  `aspect`), semeado uma vez pelo launcher e nunca sobrescrito; o display server aplica
  `auto|preserve|stretch|native` antes de existir a janela raiz, mantém painéis
  16:9 e 4:3 exatamente no preenchimento provado e coloca letterbox em painéis
  quadrados (relato de campo RG CubeXX 720x720). Decisão no log e como linha
  `aspect` no receipt de geometria; o gate `make_geometry_proof.py` confere a
  geometria. Testes de host: `tests/video/test_aspect_policy.c`,
  `tests/video/test_nextossettings.sh`.
- 0.2.16: autoridade de geometria da janela SDL2 em sessões com compositor.
  O display server deixa de pedir à SDL2 o tamanho bruto do framebuffer; usa
  os bounds do display da SDL, espera o primeiro configure autoritativo,
  define o hint `SDL_APP_ID` / `SDL_VIDEO_WAYLAND_WMCLASS` antes do vídeo
  (env primeiro, senão basename do executável), garante fullscreen de dentro
  do runtime e repassa redimensionamentos ao motor. Recibo novo
  `nx-geometry-proof/1` (`NXGEOMETRY_RECEIPT`), consumidor
  `recipes/make_geometry_proof.py`, gate host `tests/video/run-geometry-host.sh`
  com libSDL2 falsa. O provider fbdev/EGL não muda. A string `GL_VERSION` do
  shim passa a ser a neutra `OpenGL ES 3.0 (NextOS nxgles3 facade)`.
- 0.2.11: desativa de forma fail-safe o efeito CRT opcional em todos os
  aparelhos. A opção continua no menu, porém OFF e ON mostram a mesma imagem
  nativa; não há cópia de SCREEN_TEXTURE nem pirâmide de mipmaps. O executável
  Godot permanece byte a byte.
- 0.2.10: a autoridade de layout do muOS. A/B e X/Y são preferência do
  usuário no muOS, então o bundle congelado nunca mais os decide: base
  invariante + variantes autenticadas modern/retro, `NEXTOS_CONTROLLERS/3`
  com `FACE_LAYOUT = auto` por default, leitura do GPTK numa única fronteira
  pré-init antes do SDL_Init, o `0` benigno da declaração de bundle não
  derruba mais o driver de joypad, o symlink do banco vivo ganha espera
  limitada com snapshot estável, o domínio joydev/evdev é decidido por prova
  semântica e todo receipt de admissão C6 chega ao log normal.
- 0.2.9 (pin imutável do framework fechado; build one-shot e prova física no
  muOS pendentes): faz opt-in deste port no nxinput 0.9.0. A seam C6
  preserva como primeiro fallback da autoridade 3 a linha `Deeplay-keys` exata
  da ROM oficial muOS 2601.1, projeta somente o GUID com CRC de nome zero para
  o GUID vivo correspondente e depois converte os ordinais joydev legados para
  o domínio evdev medido do SDL atual. A conversão exige capacidades daquele
  event node exato e os dois marcadores de volume, nunca é escolhida por
  nome/modelo e é no-op byte a byte para mapping nativo. O perfil GO-Super já
  aprovado permanece como a segunda fonte de GUID exato. Refresh e pacote
  fixam e verificam o objeto exato da tag anotada `nxinput-v0.9.0`, seu
  SHA-256 canônico e o commit antes de aceitar qualquer candidato.
- 0.2.8: o diálogo do mundo volta a fechar e o chord SELECT+START para de
  disparar sem querer. A InputMap do próprio Tearscape liga o JoypadButton 0 a
  `roll` E a `ui_accept`, e o `DialogueManager` avança a placa ou a fala de NPC
  por `ui_accept` sem nunca pausar a árvore. O governador vivo suprimia o botão
  físico e sintetizava só `roll`, então durante o jogo nenhum toque fechava o
  diálogo: o texto ficava preso na tela. Agora um botão governado entrega também
  a ação companheira que o mesmo botão físico carrega no jogo, na mesma borda e
  no mesmo latch, e uma companheira que não pode ser entregue reprova a entrega
  em vez de meio-suceder. O chord de ciclo de vida SELECT+START continua
  disparando no instante em que os dois botões estão pressionados: um hold de
  600 ms foi tentado nesta mesma versão e revertido depois que a prova física
  mostrou que ele deixava de fechar o jogo — fechar o port é garantia que
  bloqueia release. O chord passa a imprimir um recibo incondicional quando
  dispara, para o log de suporte separar saída proposital de defeito real: o
  status 0 limpo que ele produz, sozinho, se lê como queda. A engine foi
  reconstruída com os mesmos insumos congelados; nenhum outro comportamento de
  runtime muda.
- 0.2.7: corrige o governador GPTK vivo sem voltar a engine. O foco próprio dos
  menus do Tearscape não é mais confundido com gameplay: caminhos de cena UI
  provam menus independentes, e a transição `SceneTree.paused` do próprio jogo
  prova overlays de pause/mapa/diálogo/inventário sobre o gameplay.
  Todo sink da InputMap é conferido em runtime, cena desconhecida ou sink
  ausente falha seguro para controles nativos, e toda entrega exige ACK do sink
  do adapter. O movimento usa as ações `move_*` confirmadas pelo assembly; o byte
  depois de cada nome length-prefixed em `project.binary` é metadata Variant,
  nunca um sufixo da ação. START agora chega à ação `menu`, confirmada no
  assembly e consumida pelo `UiManager`; a ação `pause`, sem consumidor do menu,
  não é mais confundida com esse sink. O GPTK governa
  somente o pad primário no single-player; pads adicionais e co-op ficam
  nativos, preservando a identidade dos jogadores. `start_coop` permanece
  deliberadamente nativo, e o default gerado não transforma mais o zoom de
  mapa, que é um botão, numa ação contínua do analógico direito. Um arquivo do
  dono antigo que ainda associe stick ao zoom é aceito somente durante o
  contexto gameplay comprovado e gera uma borda por gesto radial; isso não
  promete zoom editável no minimapa pausado. ACK falho no enqueue/release do
  adapter trava a sessão como fatal, bloqueia o receipt de saúde (revogando-o
  caso já tenha sido publicado) e encerra com status não zero, sem replay nem
  aceitação de eventos físicos posteriores. Na promoção por hotplug, todos os
  botões e os seis eixos SDL são fotografados antes de outro pad virar P1; um
  gesto iniciado no caminho nativo nunca muda de dono pela metade.
  Enqueue não é declarado como consumo semântico; essa ligação continua sendo
  evidência de release do port. O nxrelease
  liga o ELF final, mapping gerado, adapter promovido, contextos e sinks num
  input-proof externo. A rota GLES2 aprovada fisicamente é preservada e agora
  inclui prova limitada de frame não preto antes do present; extração e fast
  path saudável preservam suas interfaces estabelecidas.
- 0.2.6: adota a linha de boot V4 integrada mais recente: nxbootstrap 0.7.6 e
  nxrelease 0.3.11. O fast path saudável O(1) da 0.7.5 permanece, e uma
  instalação nova não pode mais bloquear sua única geração autenticada após
  aberturas repetidas sem receipt de saúde do adapter. A engine aprovada da
  0.2.5 e os dois shims da fachada GLES2 são reutilizados byte a byte; vídeo,
  shaders, controles, áudio e gameplay não mudam.
- 0.2.5: o NEXTOSCONTROLLERS.gptk vira runtime VIVO. A engine carrega o
  mapping editável do dono (ou o default imutável) pelo loader GPTK canônico
  do nxinput, decide ação/null/nativo por controle e por contexto
  (menu/gameplay), suprime controles governados antes do caminho nativo e
  entrega ações reais da InputMap. Editar o arquivo remapeia o jogo sem
  rebuild. SELECT+START continua soberano e não mapeável. Framework sobe
  para nxgenerator 0.3.8 / nxrelease 0.3.10, cujo gate novo verifica que o
  runtime está realmente linkado antes de embarcar a promessa de edição.
- 0.2.4: adota o Framework V4 no commit de integração do nxbootstrap 0.7.5.
  O boot saudável vira O(1): o launcher não reverifica nem re-cura a closure
  de 197 membros a cada abertura (minutos de tela preta muda em cartão FAT);
  a verificação profunda passa a eventos reais de recuperação, em lote e
  sempre anunciada. nxinput sobe para 0.7.2 (projeção GUID por CRC de nome na
  rota SDL2), nxgenerator 0.3.7 e nxrelease 0.3.9 (proteção do seed visível). O caminho gráfico segue
  byte-idêntico ao 0.2.3.
- 0.2.3: o caminho DRM/Mali volta ao piso físico GLES2. A 0.2.2 mantinha um
  caminho principal GLES3 nativo por SDL2/KMSDRM que dava tela preta com
  áudio em devices DRM Mali mesmo com contexto, page flip e log de shader
  saudáveis. O shim passa a incluir a fachada ES2 por SDL2/KMSDRM, o adapter
  a seleciona sempre que existe nó DRM utilizável e um gate de fonte proíbe
  promover GLES3 nativo de novo.
- 0.2.2: corrige a tela preta em devices DRM/Mali-G31. O shader de canvas
  remendado comparava a contagem de luzes com sinal contra operandos sem
  sinal; compiladores ESSL 3.00 estritos recusavam o fragment shader e nada
  era desenhado enquanto o áudio tocava. A contagem agora é sem sinal e um
  gate de fonte rejeita a forma mista. Mudam os bytes da engine; shims,
  adapter e providers não.
- 0.2.1: invalidada por essa tela preta.

### Licenças

O código do port e as fontes nxinput integradas usam GPL-3.0-only. Avisos do
Godot, SDL, .NET e Khronos estão em `licenses/`. Dados e assemblies do jogo
continuam propriedade de seus autores e nunca são redistribuídos.

## Download

- [tearscape-v0.2.19](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tearscape-v0.2.19) (pre-release) — `BUILD-PROVENANCE.json`, `tearscape.zip`, `tearscape.zip.sha256`
- [tearscape-v0.2.18](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tearscape-v0.2.18) — `tearscape.zip`, `tearscape.zip.sha256`
- [tearscape-v0.2.16](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tearscape-v0.2.16) — `tearscape.zip`

- Todas as versões / all versions: [releases?q=tearscape](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=tearscape)
- Histórico: 49 downloads no repositório original `tearscape-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
