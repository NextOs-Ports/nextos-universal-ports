# Prizefighters 2 v1.09.3 — universal ARM64 handheld port

**Language / Idioma:** [English](#english) · [Português](#português)

![Prizefighters 2 running natively](docs/images/main-menu.png)

## Community

Questions, bug reports, help getting the port running, and news about the next ones:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

## English

This repository contains a native ARM64 loader and PortMaster-style package for
the Android release of **Prizefighters 2 v1.09.3**. It runs the original Unity
2022.3.62f2 IL2CPP engine directly, without Android emulation or a PC runtime.

Status: **playable and release-tested**. The original title, control selector,
tutorial, menus, career flow, controller keyboard, FMOD audio, persistent saves
and frontend exit hotkey are working.

The release uses one AArch64 executable with a maximum `GLIBC_2.27`
requirement. Its runtime backend selection preserves the proven Mali-450/fbdev
path and adds KMSDRM/Wayland-style SDL contexts for newer devices. The pointer
uses the real Unity and drawable sizes; it is not fixed to 1280×720.

### Tested profiles

| Profile | Result |
|---|---|
| Mali-450 + fbdev/legacy EGL | Native GLES2 path, cursor and controls validated |
| ArkOS/R36S-class KMSDRM + Mali-G31, 640×480 | Clean XAPK extraction, GLES2 video, ALSA audio and 820-frame gameplay boot validated |
| PortMaster controller mappings | Position-first face buttons across Xbox- and Nintendo-labelled pads, raw `/dev/input/js*` fallback and hotplug |

The v1.0.2 ordinal correction reuses the physically proven detector from the
approved GTA ports. Confirmation on the specific community-reported PF2 device
is still pending, so this release does not present that device as newly
validated.

The launcher also negotiates firmware-provided SDL, EGL, Mali and audio
libraries at runtime, following the portable patterns proven by Horizon Chase,
Stardew Valley and The Amazing Spider-Man 2. Hardware not listed above still
needs real-device confirmation; compatibility is never inferred from a boot
logo alone.

### Architecture and native lifecycle

The loader maps the owner's `libmain.so`, `libil2cpp.so` and `libunity.so`,
relocates their Android imports onto native Linux services and follows Unity's
Android sequence:

1. Execute the real `DT_INIT_ARRAY` constructors.
2. Call each original `JNI_OnLoad` in NativeLoader order.
3. Call `UnityPlayer.initJni`.
4. Send `nativeRecreateGfxState`, surface change, `nativeResume` and focus.
5. Pump the original `nativeRender` loop.

No scene or game state is skipped. The JNI layer supplies only the Activity,
filesystem, input, preferences and audio services expected by the native
player.

### Main fixes

| Problem | Solution |
|---|---|
| Version-protected ARM64 windows | NXExtract validates the exact owner libraries, applies four version-pinned XOR transformation masks and verifies the reconstructed SHA-256 values |
| Extractor inherits game-private libraries | NXExtract 1.2.0 runs inside the canonical firmware-first runtime boundary and filters game-directory paths, including symlink targets |
| PairIP runtime crashes outside Android | Normal extraction and gameplay never load `libpairipcore.so` |
| Unity data contains GLES3-only shader programs | Vendored Python-3.7-compatible UnityPy adds verified GLES2 platform-5 variants to the owner's staged asset |
| Mali-450 needs the legacy framebuffer EGL path | Raw EGL remains authoritative when SDL reports the Mali backend |
| Newer firmware uses KMSDRM or Wayland | SDL owns the GLES2 window/contexts and page flips while Unity keeps its Android EGL lifecycle |
| Cursor hitboxes shifted between devices | Drawable size and Unity logical screen are refreshed independently before every UI hit test |
| Android FMODAudioDevice is absent | The original FMOD mixer writes unchanged signed-16 PCM into firmware-native SDL audio |
| Menus are touch-first | South/Start invokes the original title/control listeners; the right stick and South/R3 drive a real managed Input System mouse |
| Old kernels expose face buttons by HID report order | The proven NextOS ordinal-pad detector repairs only the affected evdev layout and preserves modern semantic mappings |
| Android software keyboard is absent | A pixel-art controller keyboard commits text through the focused Unity InputField |
| PlayerPrefs needs SharedPreferences | A typed, atomic store persists under `home/shared-preferences.bin` |

### Controls

| Control | Action |
|---|---|
| Left stick / D-pad | Boxer movement and menu navigation where native focus exists |
| South — B on R36S/Nintendo, A on Xbox | Menu pointer click; left middle/body punch |
| East — A on R36S/Nintendo, B on Xbox | Back/delete in keyboard; right middle/body punch |
| West — Y on R36S/Nintendo, X on Xbox | Toggle keyboard case; left high/head punch |
| North — X on R36S/Nintendo, Y on Xbox | Right high/head punch |
| L1 or LT | High guard, left side |
| R1 or RT | High guard, right side |
| Start | Pause/confirm |
| Right stick | Move the menu pointer |
| R3 | Pointer click |
| Select + Start | Exit safely to the frontend |

On R36S/Nintendo-labelled controls the four punches are exactly **Y = left
high**, **X = right high**, **B = left middle/body** and **A = right
middle/body**.

Keyboard mode: D-pad/right stick selects, South/R3 types, East deletes, West
changes case and Start activates **DONE**.

The launcher defaults `PF2_CURSOR_SPEED` to `1400` design pixels per second.
Edit that value in `pf2-nextos.sh`, or export a value from `200` to `5000`, to
tune the pointer without rebuilding the loader.

![Controller keyboard](docs/images/controller-keyboard.png)

### Install with NXExtract

The release is BYO-data. It contains the loader, launchers, extraction runtime,
shader converter and small version-pinned transformation masks. It does **not**
contain an APK/XAPK, complete game library, Unity asset, raw runtime overlay,
save, receipt or purchase state.

1. Extract the release ZIP into the `ports` folder of the ROM card
   (`roms/ports/`, `mmc/roms/ports` on muOS). It supplies the launcher and
   the `pf2/` game folder, which must stay side by side.
2. Put your legally obtained **v1.09.3 XAPK** in
   `ports/pf2/gamedata/`. It must include `config.arm64_v8a.apk`; an ARMv7-only
   bundle is rejected.
3. Start **Prizefighters 2** from the frontend.
4. NXExtract 1.2.0 selects the package by content, stages 30 files, checks available
   space, reconstructs the supported runtime windows, generates GLES2 shaders,
   validates the complete tree and commits it transactionally.
5. Keep the XAPK as a repair source or remove it after a successful install.

See [INSTALLATION.md](INSTALLATION.md) for the exact layout and troubleshooting.

### Saves, premium and network features

All writable state remains inside `ports/pf2/home/`, including career saves,
custom fighters/leagues and typed PlayerPrefs.

`import-owned-save.sh` can import an owner-exported Android app-data directory
or Unity PlayerPrefs XML. It backs up replaced files, copies only known PF2 save
directories and deliberately keeps the handheld's resolution/session keys.
This prevents an Android-resolution save from restoring the old zoom bug.

The importer does not fabricate an entitlement or receipt. If a legitimately
purchased premium state is present in portable game save data, the original
game remains responsible for accepting it. Google Play Billing itself is not
available on these Linux firmwares, and premium transfer is still
**experimental/unconfirmed** until tested with an owner export. Details are in
[docs/OWNED-SAVE-IMPORT.md](docs/OWNED-SAVE-IMPORT.md).

The native socket/DNS surface is available to the original player. Version
1.09.3 uses network services for Unity/purchase/time-related tasks, but no
online multiplayer mode or compatible matchmaking backend was identified.
This port does not emulate Google Play services or bypass server
authentication.

### Build and package

The universal release build is intentionally compiled against the compatible
glibc profile authorized for this port:

```bash
./build_universal.sh
./package/build-package.sh
```

The build fails if the executable requires a glibc newer than 2.30 or if the
audited Bionic TLS guard layout changes. The package builder uses an explicit
allowlist and rejects game data, saves, logs and APK-like files.

### Repository map

- `src/` — ELF loader, Bionic/JNI bridges, EGL backends, audio and input.
- `nxextract.py`, `nxextract-ui`, `extractor.json` — transactional BYO-data
  installer.
- `nxextract-runtime-env.sh` — canonical firmware-first library boundary for
  the extractor/UI process.
- `tools/prepare_pf2_data.py` — exact-input runtime reconstruction and GLES2
  preparation.
- `tools/patches/` — four small v1.09.3 transformation masks.
- `tools/vendor/python/` — pinned UnityPy 1.22.5, attrs and local LZ4 binding.
- `tools/import_owned_android_save.py` — backed-up legal save importer.
- `analysis/`, `STUDY.md` — engineering evidence and reproducibility tools.
- `package/` — release package builder and audit.

### Licences and ownership

Port source code is GPL-3.0. NXExtract is MIT; LZ4 is BSD-2-Clause; UnityPy is
MIT; attrs is MIT. Their notices are shipped under `licenses/`.

Prizefighters 2, Koality Game, Unity, game libraries, assets and user purchase
data remain property of their respective owners. See [NOTICE.md](NOTICE.md) and
[docs/PROVENANCE.md](docs/PROVENANCE.md).

---

## Português

Este repositório contém um loader ARM64 nativo e um pacote no padrão PortMaster
para o **Prizefighters 2 v1.09.3** de Android. Ele executa diretamente a engine
IL2CPP original do Unity 2022.3.62f2, sem emulador Android ou runtime de PC.

Estado: **jogável e validado para release**. Título, seletor de controle,
tutorial, menus, carreira, teclado pelo controle, áudio FMOD, saves persistentes
e o atalho de retorno ao frontend estão funcionando.

A release usa um único executável AArch64 com requisito máximo
`GLIBC_2.27`. A seleção automática preserva o caminho Mali-450/fbdev comprovado
e usa contextos SDL em KMSDRM/Wayland nos aparelhos modernos. Cursor e clique
usam o tamanho real do drawable e da tela lógica do Unity — nada fica preso em
1280×720.

### Comunidade

Dúvidas, relatos de bug, ajuda pra colocar o port pra rodar e novidades dos próximos:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

### Perfis validados

| Perfil | Resultado |
|---|---|
| Mali-450 + fbdev/EGL legado | Caminho GLES2 nativo, cursor e controles validados |
| ArkOS/R36S com KMSDRM + Mali-G31, 640×480 | Extração limpa do XAPK, vídeo GLES2, áudio ALSA e boot jogável de 820 frames validados |
| Mapeamentos do PortMaster | Botões por posição em controles com etiquetas Xbox ou Nintendo, hotplug e fallback `/dev/input/js*` |

A correção ordinal da v1.0.2 reutiliza o detector comprovado fisicamente nos
ports GTA aprovados. A confirmação no aparelho específico do relato da
comunidade ainda está pendente; a release não apresenta esse aparelho como uma
nova validação física.

O launcher negocia as bibliotecas SDL, EGL, Mali e áudio do próprio firmware,
seguindo os padrões portáteis comprovados em Horizon Chase, Stardew Valley e
The Amazing Spider-Man 2. Outros hardwares ainda precisam de teste físico.

### Arquitetura e fluxo nativo

O loader mapeia `libmain.so`, `libil2cpp.so` e `libunity.so` do usuário, religa
seus imports Android aos serviços Linux e segue a ordem original:

1. construtores `DT_INIT_ARRAY` reais;
2. `JNI_OnLoad` de cada biblioteca na ordem do NativeLoader;
3. `UnityPlayer.initJni`;
4. criação gráfica, evento de superfície, resume e foco;
5. loop original `nativeRender`.

Nenhuma cena ou etapa é pulada.

### Principais correções

| Problema | Solução |
|---|---|
| Janelas ARM64 protegidas e presas à versão | NXExtract valida as bibliotecas exatas do usuário, aplica quatro máscaras XOR e confirma os SHA-256 reconstruídos |
| Extrator herda bibliotecas privadas do jogo | O NXExtract 1.2.0 roda na barreira canônica firmware-first e filtra caminhos internos, inclusive alvos de symlink |
| PairIP falha fora do Android | Extração e gameplay normais nunca carregam `libpairipcore.so` |
| Shaders somente GLES3 | UnityPy compatível com Python 3.7 acrescenta variantes GLES2 verificadas ao asset do usuário |
| Mali-450 depende do framebuffer | EGL bruto continua sendo a autoridade quando o SDL informa backend Mali |
| KMSDRM/Wayland usa outro fluxo de janela | SDL controla janela/contextos/page flip sem mudar o ciclo Android do Unity |
| Clique deslocado entre aparelhos | Drawable físico e tela lógica do Unity são atualizados separadamente antes do hit-test |
| Falta o FMODAudioDevice Android | O mixer FMOD original entrega PCM intacto ao áudio SDL do firmware |
| Interface prioriza toque | Sul/Start chama listeners originais; analógico direito e Sul/R3 controlam um Mouse real do Input System |
| Kernel antigo expõe os botões pela ordem do relatório HID | O detector ordinal comprovado no NextOS corrige apenas o layout evdev afetado e preserva mapeamentos semânticos modernos |
| Falta o teclado Android | Teclado pixel-art confirma texto pelo InputField realmente focado |
| PlayerPrefs depende de Java | Store tipado e atômico persiste em `home/shared-preferences.bin` |

### Controles

| Controle | Ação |
|---|---|
| Analógico esquerdo / direcional | Movimento do lutador e navegação nativa disponível |
| Sul — B no R36S/Nintendo, A no Xbox | Clique do cursor; soco médio/de corpo esquerdo |
| Leste — A no R36S/Nintendo, B no Xbox | Voltar/apagar no teclado; soco médio/de corpo direito |
| Oeste — Y no R36S/Nintendo, X no Xbox | Maiúsculas/minúsculas; soco alto/de cabeça esquerdo |
| Norte — X no R36S/Nintendo, Y no Xbox | Soco alto/de cabeça direito |
| L1 ou LT | Guarda alta esquerda |
| R1 ou RT | Guarda alta direita |
| Start | Pausar/confirmar |
| Analógico direito | Mover cursor |
| R3 | Clicar com o cursor |
| Select + Start | Sair com segurança para o frontend |

No R36S ou controle com etiquetas Nintendo, os quatro golpes ficam exatamente
como solicitado: **Y = alto esquerdo**, **X = alto direito**, **B = médio/de
corpo esquerdo** e **A = médio/de corpo direito**.

No teclado: direcional/analógico direito seleciona, Sul/R3 digita, Leste apaga,
Oeste troca maiúsculas/minúsculas e Start confirma **DONE**.

O launcher define `PF2_CURSOR_SPEED=1400` por padrão, em pixels por segundo no
espaço lógico do port. Esse valor pode ser editado no `pf2-nextos.sh` ou
sobrescrito entre `200` e `5000`, sem recompilar o loader.

![Lutador criado com o teclado do controle](docs/images/created-fighter.png)

### Instalação com NXExtract

A release é BYO-data. Ela contém loader, launchers, extrator, conversor de
shaders e pequenas máscaras de transformação. **Não** inclui APK/XAPK,
biblioteca completa do jogo, asset Unity, overlay bruto, save, recibo ou estado
de compra.

1. Extraia o ZIP dentro de `roms/ports/` do cartão; ele contém o launcher e a pasta `pf2/`.
2. Coloque seu XAPK legal **v1.09.3** em `ports/pf2/gamedata/`. Ele precisa ter
   `config.arm64_v8a.apk`; pacote somente ARMv7 será rejeitado.
3. Abra **Prizefighters 2** pelo frontend.
4. O NXExtract 1.2.0 escolhe o pacote pelo conteúdo, prepara 30 arquivos, gera os
   shaders GLES2, valida tudo e publica os dados numa transação atômica.
5. Depois do sucesso, mantenha o XAPK como fonte de reparo ou remova-o.

Veja [INSTALLATION.md](INSTALLATION.md).

### Saves, premium e rede

Todo dado gravável fica em `ports/pf2/home/`.

`import-owned-save.sh` importa um diretório de dados Android pertencente ao
usuário ou um XML PlayerPrefs real. Antes de substituir algo ele cria backup;
também ignora resolução e identidade de sessão do celular para não trazer de
volta o bug de zoom ligado ao save.

O importador não cria entitlement nem recibo. Caso a compra premium legítima
esteja num estado portátil do próprio jogo, o jogo original ainda decide se a
aceita. O Google Play Billing não existe nesses firmwares Linux, e a
transferência premium permanece **experimental/não confirmada** até recebermos
um export legal para teste. Veja
[docs/OWNED-SAVE-IMPORT.md](docs/OWNED-SAVE-IMPORT.md).

A superfície nativa de sockets/DNS está disponível. A versão 1.09.3 usa rede
para tarefas do Unity, compra e horário, mas não foi encontrado modo
multiplayer online nem backend de matchmaking compatível. O port não simula
Google Play e não ignora autenticação de servidor.

### Compilar e empacotar

```bash
./build_universal.sh
./package/build-package.sh
```

O build falha se exigir glibc acima de 2.30 ou se o layout TLS auditado mudar.
O empacotador usa allowlist e rejeita dados do jogo, saves, logs e APKs.

### Mapa e licenças

- `src/`: loader ELF, bridges Bionic/JNI, vídeo, áudio e controles.
- `nxextract.py`, `nxextract-ui`, `extractor.json`: instalação BYO transacional.
- `nxextract-runtime-env.sh`: isolamento canônico firmware-first do extrator/UI.
- `tools/prepare_pf2_data.py`: reconstrução exata e shaders GLES2.
- `tools/patches/`: quatro máscaras pequenas da v1.09.3.
- `tools/vendor/python/`: UnityPy/attrs/LZ4 fixados.
- `tools/import_owned_android_save.py`: importador legal com backup.
- `analysis/`, `STUDY.md`: evidências e ferramentas reproduzíveis.
- `package/`: criação e auditoria da release.

O código do port é GPL-3.0. NXExtract é MIT; LZ4 é BSD-2-Clause; UnityPy e
attrs são MIT. Prizefighters 2, Koality Game, Unity, assets, bibliotecas e dados
de compra continuam pertencendo aos respectivos donos. Consulte
[NOTICE.md](NOTICE.md) e [docs/PROVENANCE.md](docs/PROVENANCE.md).

## Download

- [prizefighters2-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/prizefighters2-v1.0.3) — `Prizefighters.2.NextOS-v1.0.3.zip`, `Prizefighters.2.NextOS-v1.0.3.zip.sha256`
- [prizefighters2-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/prizefighters2-v1.0.2) — `Prizefighters.2.NextOS-v1.0.2.zip`, `Prizefighters.2.NextOS-v1.0.2.zip.sha256`
- [prizefighters2-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/prizefighters2-v1.0.1) — `Prizefighters.2.NextOS-v1.0.1.zip`, `Prizefighters.2.NextOS-v1.0.1.zip.sha256`
- [prizefighters2-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/prizefighters2-v1.0.0) — `Prizefighters.2.NextOS-v1.0.0.zip`, `Prizefighters.2.NextOS-v1.0.0.zip.sha256`

- Todas as versões / all versions: [releases?q=prizefighters2](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=prizefighters2)
- Histórico: 74 downloads no repositório original `prizefighters2-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
