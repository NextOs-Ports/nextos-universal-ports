# Freedom Planet 2 1.2.8 — Instalação / Installation

## Português

Este pacote público contém somente o port livre para AArch64. Ele não inclui o
APK, as bibliotecas Android nem os dados de Freedom Planet 2. Você precisa
fornecer uma cópia legal e compatível do jogo.

### Arquivos e destino

Instale `fp2.zip` pelo PortMaster. Na instalação manual, extraia o conteúdo do
ZIP dentro do diretório de Ports das ROMs. O resultado deve ser:

```text
ports/Freedom Planet 2.sh
ports/fp2/
ports/fp2/gamedata/
```

Coloque um APK compatível dentro de:

```text
ports/fp2/gamedata/
```

O nome do arquivo não é usado como identidade. Não extraia o APK manualmente e
não copie `assets/` ou `lib/` por conta própria.

### Primeira abertura

1. Inicie **Freedom Planet 2** pelo menu de Ports.
2. O NXExtract valida o package ID, a versão, a ABI AArch64, a estrutura e os
   payloads internos críticos.
3. O extrator publica `assets/AVConfig.json`, `assets/bin/Data/` e as três
   bibliotecas ARM64 de forma transacional. Ele também troca a API gráfica
   serializada de Vulkan para GLES2 e traduz/injeta os shaders necessários
   para ESSL 1.00.
4. Se qualquer verificação ou transformação falhar, a instalação anterior é
   preservada e o jogo não é iniciado.
5. Depois da extração, a NXSplash canônica `NEXT OS` / `RETRO ELITE` aparece
   por cinco segundos; ela é obrigatória e não pode ser pulada.

O APK em `gamedata/` não é apagado. As próximas aberturas reutilizam a extração
validada enquanto os dados publicados permanecerem íntegros.

Antes da primeira abertura, mantenha pelo menos 2 GiB livres no filesystem de
Ports para o stage transacional. O NXExtract também mede o espaço
necessário e recusa a operação antes de alterar os dados se não houver margem.
O resumo fica em `fp2/nxextract.log`, o detalhe em
`fp2/nxextract-detail.log` e o resultado terminal em
`fp2/nxextract-result.json`.

### Identidade técnica de referência

- Jogo: **Freedom Planet 2 1.2.8** (`versionCode` 1)
- Package ID: `com.GalaxyTrail.FP2`
- Engine: Unity `2018.4.36f1`, IL2CPP
- ABI exigida: `arm64-v8a`
- APK de referência: 268.381.928 bytes
- SHA-256 do APK de referência:
  `4a7ad45335ecefd813f4e0c6abce132d1cd781ff97d1325ebc66c7cb80ed4986`
- `libmain.so`: 6.144 bytes; SHA-256
  `a2936f885499c4af4923b40277d0f1c8a5c4dc7c11945e91384d7887c6c17624`
- `libunity.so`: 20.086.992 bytes; SHA-256
  `56aeb87858b60cd102f3a0dce8a219c7ea414c37393000e45f87beb7fb052479`
- `libil2cpp.so`: 22.824.344 bytes; SHA-256
  `f373c5507f073b358d5f4fa7acdfcaab3e7a07c2ca0c85e42532816dc5002bf4`

O tamanho e o SHA-256 completos do APK identificam somente o container de
referência testado. Eles não são a única condição de aceitação: um container
legitimamente reempacotado pode ser aceito quando package ID, contrato de
versão, ABI, estrutura e payloads internos críticos forem equivalentes. Outro
jogo, outra ABI ou payload incompatível é recusado.

### Dados, saves e atualização

- Dados publicados pelo extrator: `ports/fp2/assets/` e `ports/fp2/lib/`.
- Progresso e preferências: `ports/fp2/home/`.
- Dados fornecidos pelo dono: `ports/fp2/gamedata/`.

Ao atualizar o port, preserve `home/` e `gamedata/`. Nunca coloque o pacote ou
o APK em uma pasta de atualização de firmware. Antes de desinstalar, faça
backup de `home/` e do APK em `gamedata/`; remover a pasta inteira do port
remove também esses dados.

### Controles

O port usa a SDL2 do sistema e entrega os controles pelo adapter nativo do
jogo. Direcional, analógicos, botões frontais, ombros e gatilhos permanecem
passthrough nativo; `START` abre/fecha a pausa e `SELECT+START` encerra pelo
ciclo de vida seguro do port. O HUD touch do Android fica oculto durante a
gameplay.

Esta edição do jogo contém somente inglês e não possui seletor de idioma.

## English

This public package contains only the free AArch64 port. It does not include
the APK, Android libraries, or Freedom Planet 2 data. You must provide a legal,
compatible copy of the game.

### Files and destination

Install `fp2.zip` with PortMaster. For a manual installation, extract the ZIP
contents inside the ROMs Ports directory. The resulting layout must be:

```text
ports/Freedom Planet 2.sh
ports/fp2/
ports/fp2/gamedata/
```

Place a compatible APK inside:

```text
ports/fp2/gamedata/
```

The filename is not used as identity. Do not unpack the APK manually or copy
`assets/` and `lib/` yourself.

### First launch

1. Launch **Freedom Planet 2** from the Ports menu.
2. NXExtract validates the package ID, version, AArch64 ABI, structure, and
   critical internal payloads.
3. The extractor transactionally publishes `assets/AVConfig.json`,
   `assets/bin/Data/`, and the three ARM64 libraries. It also changes the
   serialized graphics API from Vulkan to GLES2 and translates/injects the
   required shaders as ESSL 1.00.
4. If validation or transformation fails, the previous installation is kept
   and the game is not launched.
5. After extraction, the canonical `NEXT OS` / `RETRO ELITE` NXSplash remains
   on screen for five seconds. It is mandatory and cannot be skipped.

The APK in `gamedata/` is not deleted. Later launches reuse the validated
extraction while the published data remains intact.

Keep at least 2 GiB free on the Ports filesystem before the first launch for
the transactional stage. NXExtract also measures the required space
and refuses before changing data when the safety margin is unavailable. The
summary is written to `fp2/nxextract.log`, full detail to
`fp2/nxextract-detail.log`, and the terminal result to
`fp2/nxextract-result.json`.

### Reference technical identity

- Game: **Freedom Planet 2 1.2.8** (`versionCode` 1)
- Package ID: `com.GalaxyTrail.FP2`
- Engine: Unity `2018.4.36f1`, IL2CPP
- Required ABI: `arm64-v8a`
- Reference APK size: 268,381,928 bytes
- Reference APK SHA-256:
  `4a7ad45335ecefd813f4e0c6abce132d1cd781ff97d1325ebc66c7cb80ed4986`
- `libmain.so`: 6,144 bytes; SHA-256
  `a2936f885499c4af4923b40277d0f1c8a5c4dc7c11945e91384d7887c6c17624`
- `libunity.so`: 20,086,992 bytes; SHA-256
  `56aeb87858b60cd102f3a0dce8a219c7ea414c37393000e45f87beb7fb052479`
- `libil2cpp.so`: 22,824,344 bytes; SHA-256
  `f373c5507f073b358d5f4fa7acdfcaab3e7a07c2ca0c85e42532816dc5002bf4`

The complete APK size and SHA-256 identify only the tested reference
container. They are not the sole acceptance condition: a legitimately
repacked container may be accepted when its package ID, version contract, ABI,
structure, and critical internal payloads are equivalent. A different game,
wrong ABI, or incompatible payload is rejected.

### Data, saves, and updates

- Extracted data: `ports/fp2/assets/` and `ports/fp2/lib/`.
- Progress and preferences: `ports/fp2/home/`.
- Owner-provided data: `ports/fp2/gamedata/`.

Preserve `home/` and `gamedata/` when updating the port. Never place the port
package or APK in a firmware-update directory. Back up `home/` and the APK in
`gamedata/` before uninstalling; removing the entire port directory removes
those files too.

### Controls

The port uses system SDL2 and feeds controls through its native game adapter.
D-pad, sticks, face buttons, shoulders, and triggers remain native passthrough;
`START` opens/closes pause, and `SELECT+START` exits through the port's safe
lifecycle. The Android touch HUD stays hidden during gameplay.

This game build contains English only and has no language selector.
