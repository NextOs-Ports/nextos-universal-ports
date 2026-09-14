# Party Hard GO 0.100038 — Instalação / Installation

## Português

Este pacote público contém somente o port livre para AArch64. Ele não inclui o
APK, as bibliotecas Android nem os dados de Party Hard GO. Você precisa
fornecer uma cópia legal e compatível do jogo.

### Arquivos e destino

Instale `partyhard.zip` pelo PortMaster. Na instalação manual, extraia o
conteúdo do ZIP dentro do diretório de Ports das ROMs. O resultado deve ser:

```text
ports/Party Hard GO.sh
ports/partyhard/
ports/partyhard/gamedata/
```

Em firmwares NextOS/EmuELEC o `.sh` mora em `ports_scripts/` e a pasta em
`ports/partyhard/`; o launcher encontra a pasta a partir de qualquer raiz de
ROMs suportada.

Coloque um APK compatível dentro de:

```text
ports/partyhard/gamedata/
```

O nome do arquivo não é usado como identidade. Não extraia o APK manualmente e
não copie `assets/` ou `lib/` por conta própria.

### Primeira abertura

1. Inicie **Party Hard GO** pelo menu de Ports.
2. O NXExtract valida o package ID, a ABI AArch64, a estrutura e os payloads
   internos críticos.
3. O extrator publica `assets/bin/Data/` e as três bibliotecas ARM64 de forma
   transacional. Ele também desmonta o pacote de assets
   (`datapack.unity3d`) nos sete arquivos serializados soltos que a engine já
   procura — byte a byte, sem reserializar nada.
4. Se qualquer verificação falhar, a instalação anterior é preservada e o jogo
   não é iniciado.
5. Depois da extração, a NXSplash canônica `NEXT OS` / `RETRO ELITE` aparece
   por cinco segundos; ela é obrigatória e não pode ser pulada.

O APK em `gamedata/` não é apagado. As próximas aberturas reutilizam a extração
validada enquanto os dados publicados permanecerem íntegros.

Antes da primeira abertura, mantenha pelo menos 1,5 GiB livres no filesystem
de Ports para o stage transacional. O NXExtract também mede o espaço
necessário e recusa a operação antes de alterar os dados se não houver margem.
O resumo fica em `partyhard/nxextract.log`, o detalhe em
`partyhard/nxextract-detail.log` e o resultado terminal em
`partyhard/nxextract-result.json`.

### Identidade técnica de referência

- Jogo: **Party Hard GO 0.100038**
- Package ID: `com.tinybuild.PartyHardGO`
- Engine: Unity `6000.3.10f1`, IL2CPP
- ABI exigida: `arm64-v8a`
- APK de referência: 187.725.847 bytes
- SHA-256 do APK de referência:
  `482991b54aecb041772a2ca4457c5443b229d8aa6766c1a696809f5d524f53b8`
- `libmain.so`: 6.696 bytes; SHA-256
  `7b13d79f8fa937c7d42bd68c0c30e79fcdb4f214cd3fc1f418fbe854bbd190a0`
- `libunity.so`: 21.527.808 bytes; SHA-256
  `14196f149dac946436fa39bdeed90b912782eb98558a6e1ffde242b44d9dee03`
- `libil2cpp.so`: 58.222.472 bytes; SHA-256
  `65c8f467f4b4e4caf13b187d6a472a7e145458768d73d74939b550f80f0c9af7`
- `assets/bin/Data/datapack.unity3d`: 49.977.550 bytes; SHA-256
  `f22f09e08d62d02db042c56cbf3ac838f4c5030ea5bf37333607658e77f6e7d4`

O tamanho e o SHA-256 completos do APK identificam somente o container de
referência testado. Eles não são a condição de aceitação: um container
legitimamente reempacotado é aceito quando package ID, ABI, estrutura e
payloads internos críticos (bibliotecas ARM64, árvore `assets/bin` e o
conteúdo do pacote de assets) forem idênticos. Outro jogo, outra ABI ou payload
incompatível é recusado com o motivo no log.

### Dados, saves e atualização

- Dados publicados pelo extrator: `ports/partyhard/assets/` e
  `ports/partyhard/lib/`.
- Progresso e preferências: `ports/partyhard/home/`.
- Dados fornecidos pelo dono: `ports/partyhard/gamedata/`.

Ao atualizar o port, preserve `home/` e `gamedata/`. Nunca coloque o pacote ou
o APK em uma pasta de atualização de firmware. Antes de desinstalar, faça
backup de `home/` e do APK em `gamedata/`; remover a pasta inteira do port
remove também esses dados.

### Controles

Atualização para 1.0.6 ou 1.0.7: mapas e saves existentes são preservados; a
correção da diagonal do direcional (1.0.7) e a proteção de soltura não exigem
nenhuma alteração no mapa. Se você vem da 1.0.4 ou anterior e
nunca editou `NEXTOSCONTROLLERS.gptk`, renomeie esse arquivo para
`NEXTOSCONTROLLERS.gptk.backup` antes da primeira abertura para receber o novo
padrão. Se personalizou o mapa, preserve suas alterações e troque apenas
`A = action:partyhard.click` por `A = action:partyhard.action1` na seção
`[override.menu]`. R3 continua sendo o clique da seta. Não altere o save.

| | |
|---|---|
| Analógico esquerdo | anda |
| Analógico direito | move a seta do ponteiro |
| **A** | confirma a opção selecionada; ação nativa no gameplay |
| **R3** | clica com a seta nos menus; ação nativa no gameplay |
| B / X / Y / L1 / R1 / L2 / R2 / direcional | botões do jogo (o D-pad navega uma opção por pressão nos menus) |
| **START** | pausa; com o jogo pausado, fecha o pause |
| **SELECT + START** | salva e sai |

Na primeira tela o jogo pergunta o tipo de controle. Use a **seta** (analógico
direito + R3) para escolher **VIRTUAL** ou **TOUCH**. O mapa
editável `NEXTOSCONTROLLERS.gptk` (`NEXTOS_CONTROLLERS/4`, copiado de
`defaults/`) permite trocar ou anular botões por contexto; o mapping físico do
firmware/PortMaster continua sendo a autoridade. A seta nasce visível para
essa seleção, reaparece ao mover/clicar e, depois do primeiro clique, some
após quatro segundos sem uso. O botão A permanece sempre nativo e não clica.
O direcional usa a mesma rota KeyEvent no menu e no gameplay, sem HAT duplicado;
direções opostas simultâneas são neutralizadas por par. Se a SDL perder uma
soltura, o port só limpa o valor preso quando o nó físico daquele mesmo controle
prova repouso, sem varrer dispositivos ou inventar comandos.

### Opções de vídeo

Edite `ports/partyhard/NEXTOSSETTINGS.txt` antes de abrir o jogo:

```text
video.aspect=auto
```

`auto` é o padrão e preenche toda a tela esticando quando necessário. Em uma
tela 720x720, use `video.aspect=preserve` para manter a imagem 16:9 em 720x405,
centralizada com barras opacas. Também são aceitos `engine` e `stretch`.
Atualizações preservam tanto esse arquivo do dono quanto o mapa de controles.

## English

This public package contains only the free AArch64 port. It does not include
the APK, Android libraries, or Party Hard GO data. You must provide a legal,
compatible copy of the game.

### Files and destination

Install `partyhard.zip` with PortMaster. For a manual installation, extract the
ZIP contents inside the ROMs Ports directory. The resulting layout must be:

```text
ports/Party Hard GO.sh
ports/partyhard/
ports/partyhard/gamedata/
```

On NextOS/EmuELEC firmwares the `.sh` lives in `ports_scripts/` and the folder
in `ports/partyhard/`; the launcher finds the folder from every supported ROM
root.

Place a compatible APK inside:

```text
ports/partyhard/gamedata/
```

The filename is not used as identity. Do not unpack the APK manually or copy
`assets/` and `lib/` yourself.

### First launch

1. Launch **Party Hard GO** from the Ports menu.
2. NXExtract validates the package ID, AArch64 ABI, structure, and critical
   internal payloads.
3. The extractor transactionally publishes `assets/bin/Data/` and the three
   ARM64 libraries. It also unbundles the asset pack (`datapack.unity3d`) into
   the seven loose serialized files the engine already probes — byte for byte,
   nothing is reserialized.
4. If any validation fails, the previous installation is kept and the game is
   not launched.
5. After extraction, the canonical `NEXT OS` / `RETRO ELITE` NXSplash remains
   on screen for five seconds. It is mandatory and cannot be skipped.

The APK in `gamedata/` is not deleted. Later launches reuse the validated
extraction while the published data remains intact.

Keep at least 1.5 GiB free on the Ports filesystem before the first launch for
the transactional stage. NXExtract also measures the required space and
refuses before changing data when the safety margin is unavailable. The
summary is written to `partyhard/nxextract.log`, full detail to
`partyhard/nxextract-detail.log`, and the terminal result to
`partyhard/nxextract-result.json`.

### Reference technical identity

- Game: **Party Hard GO 0.100038**
- Package ID: `com.tinybuild.PartyHardGO`
- Engine: Unity `6000.3.10f1`, IL2CPP
- Required ABI: `arm64-v8a`
- Reference APK size: 187,725,847 bytes
- Reference APK SHA-256:
  `482991b54aecb041772a2ca4457c5443b229d8aa6766c1a696809f5d524f53b8`
- `libmain.so`: 6,696 bytes; SHA-256
  `7b13d79f8fa937c7d42bd68c0c30e79fcdb4f214cd3fc1f418fbe854bbd190a0`
- `libunity.so`: 21,527,808 bytes; SHA-256
  `14196f149dac946436fa39bdeed90b912782eb98558a6e1ffde242b44d9dee03`
- `libil2cpp.so`: 58,222,472 bytes; SHA-256
  `65c8f467f4b4e4caf13b187d6a472a7e145458768d73d74939b550f80f0c9af7`
- `assets/bin/Data/datapack.unity3d`: 49,977,550 bytes; SHA-256
  `f22f09e08d62d02db042c56cbf3ac838f4c5030ea5bf37333607658e77f6e7d4`

The complete APK size and SHA-256 identify only the tested reference
container. They are not the acceptance condition: a legitimately repacked
container is accepted when its package ID, ABI, structure, and critical
internal payloads (ARM64 libraries, the `assets/bin` tree and the asset pack
content) are identical. A different game, wrong ABI, or incompatible payload
is rejected with the reason in the log.

### Data, saves, and updates

- Extracted data: `ports/partyhard/assets/` and `ports/partyhard/lib/`.
- Progress and preferences: `ports/partyhard/home/`.
- Owner-provided data: `ports/partyhard/gamedata/`.

Preserve `home/` and `gamedata/` when updating the port. Never place the port
package or APK in a firmware-update directory. Back up `home/` and the APK in
`gamedata/` before uninstalling; removing the entire port directory removes
those files too.

### Controls

Updating to 1.0.6 or 1.0.7 preserves existing maps and saves; the D-pad diagonal
fix (1.0.7) and the release guard require no mapping change. If you are coming from 1.0.4 or older and never edited
`NEXTOSCONTROLLERS.gptk`, rename it to `NEXTOSCONTROLLERS.gptk.backup` before
launching to receive the new default. For a customized map, keep your edits
and only replace `A = action:partyhard.click` with
`A = action:partyhard.action1` under `[override.menu]`. R3 remains the pointer
click. Do not change or remove saved progress.

| | |
|---|---|
| Left stick | walk |
| Right stick | moves the pointer arrow |
| **A** | confirms the selected menu option; native action in gameplay |
| **R3** | pointer click in menus; native action in gameplay |
| B / X / Y / L1 / R1 / L2 / R2 / D-pad | game buttons (the D-pad moves one menu item per press) |
| **START** | pause; while paused, closes the pause |
| **SELECT + START** | save and exit |

On the first screen the game asks for the controls type. Use the **arrow**
(right stick + R3) to pick **VIRTUAL** or **TOUCH**.
The editable `NEXTOSCONTROLLERS.gptk` (`NEXTOS_CONTROLLERS/4`, copied from
`defaults/`) can remap or null buttons per context; the firmware/PortMaster
physical mapping remains the authority. The arrow starts visible for this
selector, returns when moved/clicked, and hides after four idle seconds once
the first click has happened. A always remains a native game button and never
becomes pointer click.
The D-pad uses the same KeyEvent route in menus and gameplay, without a
duplicate HAT; simultaneous opposite directions are neutralized per pair. If
SDL loses a release, the port clears the latched value only when that exact
controller's physical node proves it is idle, without scanning devices or
inventing commands.

### Video options

Edit `ports/partyhard/NEXTOSSETTINGS.txt` before launching the game:

```text
video.aspect=auto
```

`auto` is the default and fills the complete display, stretching when needed.
On a 720x720 display, set `video.aspect=preserve` for a centered 720x405 16:9
image with opaque bars. `engine` and `stretch` are also accepted. Updates
preserve both this owner file and the controls map.
