# Installation / Instalação

## English

1. Copy the whole package into your **ports** folder, preserving the layout:

   ```text
   <ROMS>/ports/Stranger Things 3.sh
   <ROMS>/ports/strangerthings3/…
   ```

   `<ROMS>` is whatever your firmware uses — `/roms`, `/roms2`,
   `/storage/roms`, `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` or
   `/userdata/roms`. On NextOS the launcher `Stranger Things 3.sh` may also
   live in `ports_scripts/`.

2. Place your legally owned **Stranger Things 3 Android APK** (arm64-v8a) into
   `<ROMS>/ports/strangerthings3/gamedata/` (or directly into `<ROMS>/ports/strangerthings3/`).
   The installer automatically identifies the package by content (`.apk`, `.apkm`, `.apks`, `.xapk` and `.zip` are supported).

   **Reference Data Information:**
   - **Game**: Stranger Things 3: The Game
   - **Version**: 1.4.7 (versioncode 28051402)
   - **Package ID**: `com.netflix.NGP.StrangerThings`
   - **Architecture / ABI**: `arm64-v8a` (AArch64)
   - **Container Size**: ~728 MB (728,810,032 bytes)

3. Launch **Stranger Things 3** from the Ports menu.
   On first launch, **NXExtract** will display an on-screen graphical progress interface to extract, validate, and prepare the game data (`game.apk` and libraries). Subsequent launches will jump directly into the game.

4. Your original APK is preserved and never deleted.

**Controls:**
- Native gamepad (the game itself draws the button map on screen: Ⓐ spin,
  Ⓑ block, Ⓧ taunt, Ⓨ bomb, triggers/bumpers and d-pad for party commands).
- Left Stick / D-Pad: move / navigate menus; `A` confirms, `B` cancels.
- Quit from the game's own menu; the frontend takes the screen back.

**Logs & Diagnostics:**
- Runtime log: `strangerthings3/log.txt`
- Extraction log: `strangerthings3/nxextract.log`
- Launcher early error (if any): `strangerthings3-launcher-error.<pid>.log`

---

## Português

1. Copie o pacote completo para a sua pasta **ports**, mantendo o layout:

   ```text
   <ROMS>/ports/Stranger Things 3.sh
   <ROMS>/ports/strangerthings3/…
   ```

   `<ROMS>` é o caminho utilizado pelo seu sistema — `/roms`, `/roms2`,
   `/storage/roms`, `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` ou
   `/userdata/roms`. No NextOS o launcher `Stranger Things 3.sh` também pode
   ficar em `ports_scripts/`.

2. Coloque o seu **APK original do Stranger Things 3** (arm64-v8a) em
   `<ROMS>/ports/strangerthings3/gamedata/` (ou diretamente em `<ROMS>/ports/strangerthings3/`).
   O nome do arquivo não importa: o instalador identifica o pacote pelo conteúdo (`.apk`, `.apkm`, `.apks`, `.xapk` e `.zip` são aceitos).

   **Informações Técnicas do APK de Referência:**
   - **Jogo**: Stranger Things 3: The Game
   - **Versão**: 1.4.7 (versioncode 28051402)
   - **Package ID**: `com.netflix.NGP.StrangerThings`
   - **Arquitetura / ABI**: `arm64-v8a` (AArch64)
   - **Tamanho do container**: ~728 MB (728.810.032 bytes)

3. Inicie **Stranger Things 3** pelo menu de Ports.
   Na primeira execução, o **NXExtract** exibirá uma interface gráfica com barras de progresso na tela para extrair, validar e preparar os dados (`game.apk` e bibliotecas). As execuções seguintes iniciarão o jogo diretamente.

4. O seu APK original é preservado e nunca é excluído.

**Controles:**
- Gamepad nativo (o próprio jogo desenha o mapa de botões na tela: Ⓐ giro,
  Ⓑ bloquear, Ⓧ provocação, Ⓨ bomba, gatilhos/ombros e direcional para os
  comandos do grupo).
- Analógico esquerdo / Direcional: mover / navegar nos menus; `A` confirma,
  `B` cancela.
- Saia pelo menu do próprio jogo; o frontend retoma a tela.

**Registros e Diagnóstico:**
- Log do jogo: `strangerthings3/log.txt`
- Log do extrator: `strangerthings3/nxextract.log`
- Log pré-execução (em caso de falha inicial): `strangerthings3-launcher-error.<pid>.log`
