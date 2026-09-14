# Prizefighters 2 — installation / instalação

## English

1. Unzip the release **into the `ports` folder of the ROM card** — the same
   canonical PortMaster layout every other NextOS port uses. The launcher and
   the game folder must end up side by side:

   ```text
   roms/ports/Prizefighters 2.sh
   roms/ports/pf2/
   ```

   Firmware notes:

   - **muOS** (RG40XXH and friends): the card path is `mmc/roms/ports` (or
     `sdcard/roms/ports`). A `.sh` placed in `mmc/ports` never appears in the
     ports list. The `.sh` and the `pf2` folder must sit in the **same**
     `ports` folder.
   - **ArkOS / ROCKNIX / Knulli / JELOS**: `roms/ports/`.
   - **NextOS / EmuELEC**: EmulationStation only lists launchers from
     `roms/ports_scripts/`, so copy `Prizefighters 2.sh` there as well and
     leave the game folder at `roms/ports/pf2/`. The NextOS port installer
     does this for you.

   If the launcher cannot find the `pf2` folder it now writes
   `pf2-launcher-error.log` next to the `.sh` and prints the reason on screen
   instead of returning silently to the ports list.

2. Copy a legally obtained Prizefighters 2 **v1.09.3 XAPK** to:

   ```text
   ports/pf2/gamedata/
   ```

   The bundle must contain the base package
   `com.koalitygame.prizefighters2` and `config.arm64_v8a.apk`. An ARMv7-only
   XAPK cannot run through this ARM64 loader.

3. Launch **Prizefighters 2** from the frontend. NXExtract will show progress
   while it selects, stages, prepares and validates the owner data. On a
   low-power handheld the first preparation can take a few minutes.

4. A successful install creates `assets/`, `lib/`, `.pf2-data.json` and
   `.nxextract-prizefighters2.json`. Later launches use a fast marker check.

NXExtract works transactionally. If power is lost, the previous active data is
kept and the staged transaction can be resumed. Keep the XAPK as a repair
source if space permits.

Logs are written to `ports/pf2/nxextract.log` and `ports/pf2/pf2.log`. Do not
publish logs without checking them for personal paths or account data.

## Português

1. Extraia a release **dentro da pasta `ports` do cartão** — o mesmo layout
   PortMaster canônico dos outros ports do NextOS. O launcher e a pasta do
   jogo têm que ficar lado a lado:

   ```text
   roms/ports/Prizefighters 2.sh
   roms/ports/pf2/
   ```

   Observações por firmware:

   - **muOS** (RG40XXH e similares): o caminho é `mmc/roms/ports` (ou
     `sdcard/roms/ports`). Um `.sh` em `mmc/ports` **não** aparece na lista de
     ports. O `.sh` e a pasta `pf2` precisam ficar na **mesma** pasta `ports`.
   - **ArkOS / ROCKNIX / Knulli / JELOS**: `roms/ports/`.
   - **NextOS / EmuELEC**: o EmulationStation só lista launchers de
     `roms/ports_scripts/`; copie o `Prizefighters 2.sh` também para lá e
     deixe a pasta do jogo em `roms/ports/pf2/`. O instalador do NextOS já
     faz isso.

   Se o launcher não achar a pasta `pf2`, agora ele grava
   `pf2-launcher-error.log` ao lado do `.sh` e mostra o motivo na tela, em vez
   de voltar calado para a lista de ports.

2. Copie um XAPK legal do Prizefighters 2 **v1.09.3** para:

   ```text
   ports/pf2/gamedata/
   ```

   O bundle deve conter o pacote base
   `com.koalitygame.prizefighters2` e `config.arm64_v8a.apk`. Um XAPK somente
   ARMv7 não funciona neste loader ARM64.

3. Abra **Prizefighters 2** no frontend. Na primeira execução, o NXExtract
   seleciona, prepara e valida os dados; em aparelhos lentos isso pode levar
   alguns minutos.

4. O sucesso cria `assets/`, `lib/`, `.pf2-data.json` e
   `.nxextract-prizefighters2.json`. As próximas execuções usam validação rápida.

O processo é transacional: uma queda de energia não substitui dados ativos por
um estágio incompleto. Se houver espaço, mantenha o XAPK como fonte de reparo.

Os logs ficam em `nxextract.log` e `pf2.log`. Revise qualquer log antes de
compartilhar para não expor caminhos ou dados pessoais.
