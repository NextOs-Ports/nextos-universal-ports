# Nameless Cat — Installation / Instalação

## Português

Este é o pacote público universal **BYO-data** (traga seus próprios dados) do
Nameless Cat para aparelhos portáteis Linux AArch64 com PortMaster. O ZIP não
contém nenhum dado do jogo: você fornece o pacote Android que possui
legalmente.

### Instalação

1. Extraia `namelesscat.zip` na pasta de ports do seu firmware, preservando a
   estrutura:

   ```text
   ports/Nameless Cat.sh
   ports/namelesscat/
   ```

   (Em firmwares que usam outra raiz de ports, use a pasta equivalente.)

2. Copie o pacote Android do Nameless Cat 1.15.2 que você possui para
   `namelesscat/gamedata/` (base + split `arm64-v8a`, ou o pacote completo
   `.apkm`/`.apks`/`.xapk`/`.zip`). O nome dos arquivos não importa: o
   instalador identifica o jogo pelo conteúdo.

3. Abra **Nameless Cat** pelo menu. Na primeira abertura o NXExtract valida e
   publica os dados na frente de você; em seguida a tela canônica
   `NEXT OS` / `RETRO ELITE` fica visível por cinco segundos e o jogo começa.
   Ela é obrigatória e não possui opção de pular ou desativar.

O progresso fica em `namelesscat/home/` e sobrevive a atualizações do port.

### Controles

Movimento no analógico esquerdo/D-pad, pulo no A, interação no X. O analógico
direito move uma seta para a interface de toque do jogo; o clique é o **R3**
(R1 e R2 também clicam; o A clica apenas em menus, diálogos e telas de
seleção/save — durante o gameplay o A continua sendo o pulo). START abre o
pause nativo; SELECT+START sai do jogo com o progresso salvo.

### Identidade técnica dos dados aceitos

- Jogo: **Nameless Cat 1.15.2** (versionCode 174)
- Package ID: `com.kotobagames.namelesscat`
- ABI: `arm64-v8a`
- Pacote base de referência: 58.624.109 bytes; SHA-256
  `6ac626dcbacd03bc7c4b45c81aad7c1dcfb0a577c5c2a9d3517f80fe44f7035e`
- Split ARM64 de referência: 29.784.129 bytes; SHA-256
  `7fe33cb12296c77f011c86ab49e0bbcf1f0be3768e3ed5a858beac5d89947d53`

Esses hashes identificam os containers de referência testados e documentam a
procedência técnica; a receita valida package ID, versão, ABI, estrutura e os
payloads internos críticos, e aceita um container legitimamente
renomeado/reempacotado com o mesmo conteúdo compatível.

## English

This is the public universal **BYO-data** (bring your own data) Nameless Cat
package for AArch64 Linux handhelds with PortMaster. The ZIP ships no game
data: you supply the Android package you legally own.

### Install

1. Extract `namelesscat.zip` into your firmware's ports folder, preserving the
   layout:

   ```text
   ports/Nameless Cat.sh
   ports/namelesscat/
   ```

   (On firmwares with a different ports root, use the equivalent folder.)

2. Copy the Android package of Nameless Cat 1.15.2 you own into
   `namelesscat/gamedata/` (base + `arm64-v8a` split, or the whole
   `.apkm`/`.apks`/`.xapk`/`.zip` bundle). File names do not matter: the
   installer identifies the game by content.

3. Launch **Nameless Cat** from the menu. On the first run NXExtract validates
   and publishes the data in front of you; then the canonical
   `NEXT OS` / `RETRO ELITE` screen stays visible for five seconds and the
   game starts. It is mandatory and cannot be skipped or disabled.

Progress lives in `namelesscat/home/` and survives port updates.

### Controls

Move with the left stick/D-pad, jump with A, interact with X. The right stick
moves an arrow pointer for the game's touch UI; **R3** clicks (R1 and R2 also
click; A clicks only in menus, dialogs and selection/save screens — during
gameplay A stays the jump button). START opens the native pause menu;
SELECT+START exits cleanly with progress saved.

### Accepted data identity

- Game: **Nameless Cat 1.15.2** (versionCode 174)
- Package ID: `com.kotobagames.namelesscat`
- ABI: `arm64-v8a`
- Reference base package: 58,624,109 bytes; SHA-256
  `6ac626dcbacd03bc7c4b45c81aad7c1dcfb0a577c5c2a9d3517f80fe44f7035e`
- Reference ARM64 split: 29,784,129 bytes; SHA-256
  `7fe33cb12296c77f011c86ab49e0bbcf1f0be3768e3ed5a858beac5d89947d53`

These hashes identify the tested reference containers and document technical
provenance; the recipe validates package ID, version, ABI, structure and the
critical internal payloads, and accepts a legitimately renamed/repackaged
container with the same compatible content.
