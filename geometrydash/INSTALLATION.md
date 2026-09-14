# Installation / Instalação

Cada jogo tem o seu proprio ZIP. Os passos sao os mesmos; troque
`<JOGO>` por `geometrydash` ou `gdsubzero`, e `<NOME>` por
`Geometry Dash` ou `Geometry Dash SubZero`.

## English

1. Copy the whole ZIP content into your **ports** folder, keeping the layout:

   ```text
   <ROMS>/ports/<NOME>.sh
   <ROMS>/ports/<JOGO>/…
   ```

   `<ROMS>` is whatever your firmware uses — `/roms`, `/roms2`,
   `/storage/roms`, `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` or `/userdata/roms`.
   On EmuELEC/NextOS the visible `<NOME>.sh` may also live in
   `ports_scripts/`; the launcher finds `<JOGO>/run.sh` either way.

2. Put the **APK you legally own** (arm64 / arm64-v8a) into
   `<ROMS>/ports/<JOGO>/gamedata/`. Builds validated here: Geometry Dash
   **2.2.144** (`com.robtopx.geometryjump`) and Geometry Dash SubZero
   **2.2.147** (`com.robtopx.geometrydashsubzero`) — a different build of the
   same game is accepted too, because the recipe validates by structure and by
   package, not by version number. An armeabi-v7a-only APK cannot work: this
   port is AArch64. The file name does not matter: the installer identifies
   the package by content (`.apk`, `.apkm`, `.apks`,
   `.xapk` and `.zip` all work). Copy a split bundle **whole**: inside a
   `.xapk`/`.apkm` the game code lives in `config.arm64_v8a.apk`, not in the
   base APK, so copying only the unpacked base APK leaves the library behind
   (the installer says so in `nxextract.log`). Each port accepts its own game only —
   `com.robtopx.geometryjump` for Geometry Dash,
   `com.robtopx.geometrydashsubzero` for SubZero — and says so when the wrong
   one arrives.

3. Launch the game from the Ports menu. The first launch extracts, validates
   and publishes the data (a few minutes on a slow card); later launches go
   straight to the game.

4. Your APK is never deleted or modified. You can remove it after the install
   to get the space back — keep a copy, it is required to reinstall.

**Controls** — native pad. `A/B/X/Y/L/R` jump (holding counts: the ship and
wave modes need it), the right stick moves an on-screen arrow through the
touch menus, `R3` taps where it sits, `START` pauses and **SELECT + START
quits**. On handhelds whose firmware reports SELECT/START/L3/R3 as
`BTN_TRIGGER_HAPPY`, the port reads them from evdev, so they work even when
SDL's own mapping does not list them.

**Troubleshooting** — everything is logged next to the port:
`<JOGO>/debug.log` (runtime) and `<JOGO>/nxextract.log` (data installer).
If the launcher itself cannot start, it writes `<JOGO>-launcher-error.log`
beside the visible script. "Nothing happened and there is no log" is not a
possible state — if it happens, that is the bug to report.

## Português

1. Copie todo o conteúdo do ZIP para a sua pasta **ports**, mantendo o layout:

   ```text
   <ROMS>/ports/<NOME>.sh
   <ROMS>/ports/<JOGO>/…
   ```

   `<ROMS>` é o que o seu firmware usar — `/roms`, `/roms2`, `/storage/roms`,
   `/mnt/mmc/ROMS`, `/mnt/sdcard/ROMS` ou `/userdata/roms`. No EmuELEC/NextOS
   o `<NOME>.sh` visível pode ficar em `ports_scripts/`; o launcher acha o
   `<JOGO>/run.sh` de qualquer jeito.

2. Coloque em `<ROMS>/ports/<JOGO>/gamedata/` o **APK que você possui
   legalmente** (arm64 / arm64-v8a). Builds validadas aqui: Geometry Dash
   **2.2.144** (`com.robtopx.geometryjump`) e Geometry Dash SubZero **2.2.147**
   (`com.robtopx.geometrydashsubzero`) — uma build diferente do mesmo jogo
   também é aceita, porque a receita valida por estrutura e por pacote, não por
   número de versão. APK só armeabi-v7a não serve: este port é AArch64. O nome
   do arquivo não importa: o instalador reconhece o pacote pelo conteúdo
   (`.apk`, `.apkm`, `.apks`,
   `.xapk` e `.zip` servem). Copie o bundle dividido **inteiro**: dentro de um
   `.xapk`/`.apkm` o código do jogo está no `config.arm64_v8a.apk`, não no APK
   base, então copiar só o base descompactado deixa a biblioteca para trás (o
   instalador avisa isso no `nxextract.log`). Cada port aceita só o seu jogo —
   `com.robtopx.geometryjump` no Geometry Dash e
   `com.robtopx.geometrydashsubzero` no SubZero — e avisa quando vem o errado.

3. Abra o jogo pelo menu Ports. Na primeira vez o instalador extrai, valida e
   publica os dados (alguns minutos em cartão lento); nas próximas ele vai
   direto para o jogo.

4. O seu APK nunca é apagado nem modificado. Depois da instalação você pode
   removê-lo para recuperar espaço — guarde uma cópia, ela é necessária para
   reinstalar.

**Controles** — pad nativo. `A/B/X/Y/L/R` pulam (segurar vale: nave e onda
precisam), o analógico direito move uma seta nos menus de toque, `R3` toca onde
ela está, `START` pausa e **SELECT + START sai**. Em portáteis cujo firmware
entrega SELECT/START/L3/R3 como `BTN_TRIGGER_HAPPY`, o port lê esses botões
pelo evdev — eles funcionam mesmo quando o mapping da SDL não os declara.

**Problemas** — tudo fica registrado ao lado do port: `<JOGO>/debug.log`
(runtime) e `<JOGO>/nxextract.log` (instalador de dados). Se nem o launcher
subir, ele grava `<JOGO>-launcher-error.log` ao lado do script visível.
"Não aconteceu nada e não tem log" não é um estado possível — se acontecer, é
esse o bug a relatar.
