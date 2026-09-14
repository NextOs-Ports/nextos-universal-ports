# Tearscape 1.0.0 — Installation

## English

This is a public, data-free PortMaster package. It does not include the game.
You must own a compatible Android copy of **Tearscape 1.0.0**.

1. Install `tearscape.zip` through PortMaster, or extract it into the normal
   Ports collection while preserving the archive layout.
2. Copy your compatible APK into `ports/tearscape/gamedata/`. The APK filename
   is not significant.
3. Start **Tearscape**. NXExtract validates the package, ABI and critical
   internal payloads, installs the data transactionally, and then shows the
   mandatory NEXT OS / RETRO ELITE splash before starting the game.

When updating from 0.2.18, replace the packaged launcher and runtime files together.
Keep `gamedata/`, `game/`, `.local/` and owner configuration files. Version 0.2.19
corrects graphics-library selection without rebuilding the engine or replacing the
firmware driver. It has host validation only; device confirmation remains pending.
Explicit graphics-library overrides in your `port-env.sh` remain authoritative.

Tested reference copy:

- Game: Tearscape 1.0.0 (version code 2)
- Android package ID: `com.nerdstakeover.tearscape`
- ABI: `arm64-v8a`
- APK size: `200616501` bytes
- APK SHA-256: `2a08b352ab25c38d01d1d59002cf1b68c69923d217961e88cbd9e42fcb93569a`

The complete APK hash identifies the tested reference copy; it is not the sole
acceptance rule. A renamed or legitimately repackaged container remains
compatible when its package, ABI, structure and required internal payloads are
the same. Other games, wrong ABIs and incompatible payloads fail closed.

Requirements: AArch64 Linux, GLIBC 2.28 or newer, EGL/GLES2, ALSA, Python 3 for
the first-run installer, and a native PortMaster controller mapping. Press
SELECT+START on the same controller to exit. Saves stay below
`ports/tearscape/.local/share/`.

Screen aspect: `ports/tearscape/NEXTOSSETTINGS.txt` is yours and is never
overwritten. `video.aspect=auto` fills every display as before. Owners of a
720x720 display who prefer centred 16:9 letterbox should change that single
line to `video.aspect=preserve`.

## Português

Este é um pacote público do PortMaster sem dados do jogo. Ele não inclui o
jogo. Você precisa possuir uma cópia Android compatível do
**Tearscape 1.0.0**.

1. Instale `tearscape.zip` pelo PortMaster, ou extraia-o na coleção normal de
   Ports preservando o layout do arquivo.
2. Copie seu APK compatível para `ports/tearscape/gamedata/`. O nome do arquivo
   APK não é relevante.
3. Abra **Tearscape**. O NXExtract valida pacote, ABI e payloads internos
   críticos, instala os dados de forma transacional e então mostra a NXSplash
   obrigatória NEXT OS / RETRO ELITE antes de iniciar o jogo.

Na atualização da 0.2.18, substitua juntos o launcher e os arquivos de runtime do
pacote. Preserve `gamedata/`, `game/`, `.local/` e as configurações do dono. A 0.2.19
corrige a seleção de bibliotecas gráficas sem recompilar a engine ou substituir o
driver do firmware. Foi validada somente no host; falta confirmação no aparelho.
Overrides explícitos de bibliotecas gráficas no seu `port-env.sh` continuam valendo.

Cópia de referência testada:

- Jogo: Tearscape 1.0.0 (version code 2)
- Package ID Android: `com.nerdstakeover.tearscape`
- ABI: `arm64-v8a`
- Tamanho do APK: `200616501` bytes
- SHA-256 do APK: `2a08b352ab25c38d01d1d59002cf1b68c69923d217961e88cbd9e42fcb93569a`

O hash completo identifica apenas a cópia de referência testada; ele não é a
única regra de aceitação. Um container renomeado ou legitimamente reempacotado
continua compatível quando pacote, ABI, estrutura e payloads internos exigidos
são os mesmos. Outro jogo, ABI errada ou payload incompatível falha fechado.

Requisitos: Linux AArch64, GLIBC 2.28 ou mais nova, EGL/GLES2, ALSA, Python 3
para o instalador da primeira abertura e mapping nativo do PortMaster. Pressione
SELECT+START no mesmo controle para sair. Os saves ficam abaixo de
`ports/tearscape/.local/share/`.

Proporção da tela: `ports/tearscape/NEXTOSSETTINGS.txt` é seu e nunca é
sobrescrito. `video.aspect=auto` preenche qualquer tela como antes. Donos de
tela 720x720 que prefiram 16:9 centralizado com barras devem alterar somente
essa linha para `video.aspect=preserve`.
