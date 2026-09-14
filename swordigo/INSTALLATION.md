# Swordigo — installation / instalação

## English

1. Extract the release ZIP **into the `ports` folder** of the ROM card — the
   canonical PortMaster layout. The launcher and the game folder must end up
   side by side:

   ```text
   roms/ports/Swordigo.sh
   roms/ports/swordigo/
   ```

   Firmware notes:

   - **muOS** (RG40XXH and friends): the card path is `mmc/roms/ports` (or
     `sdcard/roms/ports`). A `.sh` in `mmc/ports` never appears in the list.
   - **ArkOS / ROCKNIX / Knulli / JELOS**: `roms/ports/`.
   - **NextOS / EmuELEC**: EmulationStation lists launchers from
     `roms/ports_scripts/`, so copy `Swordigo.sh` there as well and leave the
     game folder at `roms/ports/swordigo/`.

2. Copy a legally obtained **Swordigo 1.4.12 APK** (`com.touchfoo.swordigo`,
   containing `lib/arm64-v8a/libswordigo.so`) into:

   ```text
   roms/ports/swordigo/gamedata/
   ```

3. Launch **Swordigo** from the frontend. NXExtract prepares and validates the
   owner data once; later launches use a fast marker check.

4. A successful install creates `libswordigo.so`, `assets/` and `res/`.

### Updating an existing installation

Extract v1.0.15 over the existing installation. You do **not** need to remove
the APK, `assets/`, `res/`, `libswordigo.so` or saves. The launcher selects the
stable `swordigo-nextos` executable directly. A clean install is recommended
when replacing the failed v1.0.10 test candidate.

Logs: `swordigo/log.txt`, the rotated `swordigo/log.prev.txt`, and
`swordigo/nxextract.log`.
The release also contains `swordigo/.nxrelease/NXRELEASE-METADATA.json`,
`swordigo/.nxrelease/MANIFEST.sha256` and
`swordigo/.nxrelease/SBOM.cdx.json` so the public ZIP can be reopened and
verified without trusting the build directory.

## Português

1. Extraia o ZIP **dentro da pasta `ports`** do cartão. O launcher e a pasta do
   jogo ficam lado a lado:

   ```text
   roms/ports/Swordigo.sh
   roms/ports/swordigo/
   ```

   - **muOS**: `mmc/roms/ports` (ou `sdcard/roms/ports`).
   - **ArkOS / ROCKNIX / Knulli / JELOS**: `roms/ports/`.
   - **NextOS / EmuELEC**: copie o `.sh` também para `roms/ports_scripts/`.

2. Coloque o APK legal do **Swordigo 1.4.12** em
   `roms/ports/swordigo/gamedata/`.

3. Abra **Swordigo** pelo frontend e deixe o NXExtract terminar uma vez.

4. O sucesso cria `libswordigo.so`, `assets/` e `res/`.

### Atualizar uma instalação existente

Extraia a v1.0.15 por cima da instalação existente. Não apague o APK,
`assets/`, `res/`, `libswordigo.so` nem os saves. O launcher chama diretamente
o executável estável `swordigo-nextos`. Recomenda-se instalação limpa ao
substituir a candidata v1.0.10 que falhou.

Logs: `swordigo/log.txt`, o anterior em `swordigo/log.prev.txt` e
`swordigo/nxextract.log`.
O ZIP também leva metadados, manifesto de hashes e SBOM em
`swordigo/.nxrelease/`, para ser reaberto e verificado sem confiar na árvore
local da build.
