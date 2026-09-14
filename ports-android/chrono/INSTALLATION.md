# Installation / Instalação

## English

1. Copy the whole ZIP content into your **ports** folder, keeping the layout:

   ```text
   <ROMS>/ports/Chrono Trigger.sh
   <ROMS>/ports/chrono/…
   ```

   `<ROMS>` is whatever your firmware uses — `/roms`, `/roms2`,
   `/storage/roms`, `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` or
   `/userdata/roms`. On EmuELEC/NextOS the visible `Chrono Trigger.sh` may also
   live in `ports_scripts/`; the self-contained launcher finds the `chrono/`
   runtime directory either way.

2. Put the **Chrono Trigger APK you legally own** (arm64 / arm64-v8a) into
   `<ROMS>/ports/chrono/gamedata/`. The file name does not matter: the
   installer identifies the package by content (`.apk`, `.apkm`, `.apks`,
   `.xapk` and `.zip` all work).

3. Launch **Chrono Trigger** from the Ports menu. The first launch extracts,
   validates and publishes the data (a few minutes on a slow card); later
   launches go straight to the game.

4. Your APK is never deleted. You can remove it after the install if you want
   the space back — keep a copy, it is required to reinstall.

**Language** — edit only `GAME_LANGUAGE="en"` near the top of
`Chrono Trigger.sh`. Supported values: `en` and `ja`.

**Controls** — native pad, Xbox layout. `A` confirms, `B` cancels, the D-pad
navigates. **SELECT + START quits** (saving through the game's own pause path).

**Troubleshooting** — everything is logged next to the port:
`chrono/log.txt` (runtime) and `chrono/nxextract.log` (data installer). If Bash
enters the launcher but it fails before `log.txt` opens, it writes an owner-only
`chrono-launcher-error.<pid>.log`: first in the resolved game directory, then
beside the visible script, and finally in `/tmp`. No new log means the early
trap was not proven or every destination was unwritable; report that boundary.

## Português

1. Copie todo o conteúdo do ZIP para a sua pasta **ports**, mantendo o layout:

   ```text
   <ROMS>/ports/Chrono Trigger.sh
   <ROMS>/ports/chrono/…
   ```

   `<ROMS>` é o que o seu firmware usar — `/roms`, `/roms2`, `/storage/roms`,
   `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` ou `/userdata/roms`. No EmuELEC/NextOS o
   `Chrono Trigger.sh` visível também pode ficar em `ports_scripts/`; o launcher
   autocontido acha o diretório `chrono/` nos dois casos.

2. Coloque o **APK do Chrono Trigger que você possui legalmente** (arm64 /
   arm64-v8a) em `<ROMS>/ports/chrono/gamedata/`. O nome do arquivo não importa:
   o instalador identifica o pacote pelo conteúdo (`.apk`, `.apkm`, `.apks`,
   `.xapk` e `.zip` funcionam).

3. Abra **Chrono Trigger** no menu Ports. A primeira abertura extrai, valida e
   publica os dados (alguns minutos em cartão lento); as próximas vão direto
   para o jogo.

4. O seu APK nunca é apagado. Você pode removê-lo depois da instalação se
   quiser o espaço de volta — guarde uma cópia, ela é necessária para
   reinstalar.

**Idioma** — edite somente `GAME_LANGUAGE="en"` perto do início de
`Chrono Trigger.sh`. Valores suportados: `en` e `ja`.

**Controles** — controle nativo, padrão Xbox. `A` confirma, `B` cancela, o
direcional navega. **SELECT + START fecha** (salvando pelo caminho de pausa do
próprio jogo).

**Se der errado** — tudo fica registrado ao lado do port: `chrono/log.txt`
(runtime) e `chrono/nxextract.log` (instalador de dados). Se o Bash entrar no
launcher mas ele falhar antes de abrir `log.txt`, será criado um
`chrono-launcher-error.<pid>.log` privado: primeiro no diretório resolvido do
jogo, depois ao lado do script visível e por fim em `/tmp`. Nenhum log novo
significa trap precoce não comprovado ou todos os destinos sem escrita; relate
essa fronteira.
