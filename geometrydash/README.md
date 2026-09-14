# Geometry Dash + Geometry Dash SubZero — NextOS Ports

Native **AArch64** ports of **Geometry Dash** and **Geometry Dash SubZero**
(RobTop, Cocos2d-x 2.x) for Linux handhelds. No Android emulation and no
translation layer: the game's own native library runs inside a normal Linux
process, and everything Android would provide — JNI, OpenSL ES, EGL,
preferences, lifecycle, touch and the asset reader — is served in C.

Both games share the engine and the loader, so they live in one repository:
`src/` is the common core, byte for byte, and `games/<game>/src/` holds only
what genuinely differs.

**This repository ships no game data.** No APK, no assets, no RobTop libraries.
You provide the APK you legally own; the installer validates it and publishes
the data on the device.

|  |  |
|---|---|
| ![Geometry Dash running on an R36S](screenshots/01-geometrydash-menu.png) | ![Geometry Dash SubZero running on an R36S](screenshots/02-gdsubzero-menu.png) |

*Captured on an R36S at 640×480, by the game's own GPU — that is what the
device drew.*

## Community

Questions, device reports and bug reports: <https://discord.gg/DHfY62eDNN>

A useful report has the device model, the firmware and its version, plus the
`debug.log` and `nxextract.log` that sit next to the port.

## Install

1. Unzip into your **ports** folder, keeping the layout (`<ROMS>/ports/`).
2. Drop the APK you legally own into `ports/<game>/gamedata/`. The name does
   not matter — `.apk`, `.apkm`, `.apks`, `.xapk` and `.zip` all work, and the
   installer identifies the package by content.
3. Launch from the Ports menu. The first launch extracts and validates; later
   ones go straight to the game. **Your APK is never deleted or modified.**

Each port accepts its own game only — `com.robtopx.geometryjump` for Geometry
Dash, `com.robtopx.geometrydashsubzero` for SubZero — and says which package
arrived when the wrong one shows up. Full steps in
[`INSTALLATION.md`](INSTALLATION.md).

### Which APK

| Port | Android package | Validated build | ABI |
|---|---|---|---|
| Geometry Dash | `com.robtopx.geometryjump` | **2.2.144** | `arm64-v8a` |
| Geometry Dash SubZero | `com.robtopx.geometrydashsubzero` | **2.2.147** | `arm64-v8a` |

Those are the builds physically tested here — **not a requirement**. The recipe
validates by structure and by the Android package, so a different build of the
same game is accepted without any change to the port. What is refused, with the
reason written to `nxextract.log`, is a package of a different app, a build with
no `arm64-v8a` library, or a file missing what every build of the game has.

An **armeabi-v7a-only** APK cannot work here: the port is AArch64 and RobTop's
32-bit library is not interchangeable. A `.xapk`/`.apkm` bundle is fine — the
installer picks the base APK and the `arm64-v8a` split by itself.

**Copy the bundle whole.** A `.xapk`/`.apkm`/`.apks` is a base APK (assets
only) plus a `config.arm64_v8a.apk` that carries the game code. Unpacking it
and copying only the base APK leaves the library behind; the installer then
says so in `nxextract.log` ("no native code at all … only the BASE part of a
split install"). Copying the base **and** `config.arm64_v8a.apk` into
`gamedata/` works just as well.

## Controls

| Button | Action |
|---|---|
| A / B / X / Y / L / R | jump (holding counts: the ship and wave modes need it) |
| D-pad / left stick | walk left and right — Geometry Dash only, platformer levels (the Tower) |
| Right stick | moves the arrow through the touch menus |
| R3 | taps where the arrow sits — anywhere, always |
| START | pause |
| SELECT + START | quit |

Inside a level the jump is sent as the game's own key rather than as a touch.
It has to be: the platformer levels draw the game's left/right arrows over the
bottom-left corner, and a tap parked on one of them walks instead of jumping.
R3 keeps tapping everywhere, so the pause menu of a level is still pressed with
it. SubZero runs the same 2.2 engine and takes the same path — its levels are
all classic, so nothing walks there, but the jump inside a level is the same
key.

On many handhelds SELECT, START, L3 and R3 reach the system as
`BTN_TRIGGER_HAPPY1..4`, outside any SDL mapping. The loader reads those codes
straight from evdev — including for a pad plugged in while the game is already
running — so they work even when the firmware does not declare them.

## Device support

Evidence level, never a promise:

| Device / firmware | State |
|---|---|
| R36S / ArkOS (RK3326, Mali-G31, glibc 2.30) | **physically validated** — clean install from the ZIP itself, 60 fps, audio, native pad, clean exit |
| NextOS Elite (Amlogic, Mali-450, glibc 2.43) | **physically validated** |
| Other AArch64 CFW with SDL2 and GLES2 | plausible, **not tested** |

The public executable is built with a **GLIBC 2.30** ceiling and needs only
`libSDL2`, `libGLESv2`, `libEGL`, `libfreetype` and the firmware's libc. No SDL
video or audio backend is ever forced.

## Build

```sh
./build_universal.sh geometrydash      # -> geometrydash-universal
./build_universal.sh gdsubzero         # -> gdsubzero-universal
package/build-package.sh geometrydash  # audited public zip
package/build-package.sh ambos         # one zip with both games
```

The cross build runs in a Debian Buster container to hold the glibc ceiling;
SDL2/GLES/EGL/FreeType are linked only against SONAME stubs, because the device
firmware is what provides them. The build is **reproducible**: the same source
gives the same sha256, and so does the ZIP, so the released binary can be
checked against this repository. The packager runs
`package/audit-portability.sh` over the tree before closing the ZIP; the
exceptions, each with its contract, are written in `package/audit-allow.txt`.

## Credits and licence

Port code: **GPL-3.0** (see [`LICENSE`](LICENSE)). The bundled NXExtract is MIT
(`licenses/NXExtract-MIT.txt`).

**Geometry Dash** and **Geometry Dash SubZero** are works and trademarks of
**RobTop Games AB**. This project is not affiliated with, sponsored by or
endorsed by RobTop Games. FMOD belongs to Firelight Technologies. Nothing here
is distributed on their behalf — see [`NOTICE.md`](NOTICE.md).

---

# Português

Ports nativos **AArch64** de **Geometry Dash** e **Geometry Dash SubZero**
(RobTop, Cocos2d-x 2.x) para portáteis Linux. Sem emulação de Android e sem
camada de tradução: a biblioteca nativa do próprio jogo roda dentro de um
processo Linux comum, e tudo o que o Android daria — JNI, OpenSL ES, EGL,
preferências, ciclo de vida, toque e o leitor de assets — é servido em C.

Os dois jogos compartilham engine e loader, então vivem no mesmo repositório:
`src/` é o núcleo comum, byte a byte, e `games/<jogo>/src/` guarda só o que
diverge de verdade.

**Este repositório não contém dado de jogo.** Nenhum APK, nenhum asset, nenhuma
biblioteca da RobTop. Quem joga fornece o APK que possui legalmente; o
instalador valida e publica os dados no aparelho.

### Comunidade

Dúvidas, relatos de aparelho e bugs: <https://discord.gg/DHfY62eDNN>

Relato útil traz o modelo do aparelho, o firmware e a versão, mais o
`debug.log` e o `nxextract.log` que ficam ao lado do port.

### Instalar

1. Descompacte na sua pasta **ports**, mantendo o layout (`<ROMS>/ports/`).
2. Coloque o APK que você possui legalmente em `ports/<jogo>/gamedata/`. O nome
   não importa — `.apk`, `.apkm`, `.apks`, `.xapk` e `.zip` servem, e o
   instalador reconhece o pacote pelo conteúdo.
3. Abra pelo menu Ports. A primeira abertura extrai e valida; as seguintes vão
   direto para o jogo. **O seu APK nunca é apagado nem modificado.**

Cada port aceita só o seu jogo — `com.robtopx.geometryjump` no Geometry Dash e
`com.robtopx.geometrydashsubzero` no SubZero — e diz qual pacote chegou quando
vem o errado. Passo a passo em [`INSTALLATION.md`](INSTALLATION.md).

### Qual APK

| Port | Pacote Android | Build validada | ABI |
|---|---|---|---|
| Geometry Dash | `com.robtopx.geometryjump` | **2.2.144** | `arm64-v8a` |
| Geometry Dash SubZero | `com.robtopx.geometrydashsubzero` | **2.2.147** | `arm64-v8a` |

Essas são as builds testadas fisicamente aqui — **não são exigência**. A receita
valida por estrutura e pelo pacote Android, então uma build diferente do mesmo
jogo é aceita sem mudar nada no port. O que é recusado, com o motivo escrito no
`nxextract.log`, é pacote de outro aplicativo, build sem biblioteca
`arm64-v8a`, ou arquivo a que falte o que toda build do jogo tem.

APK **só armeabi-v7a** não serve: o port é AArch64 e a biblioteca 32-bit da
RobTop não é intercambiável. Bundle `.xapk`/`.apkm` serve — o instalador escolhe
sozinho o APK base e o split `arm64-v8a`.

**Copie o bundle inteiro.** Um `.xapk`/`.apkm`/`.apks` é um APK base (só os
assets) mais um `config.arm64_v8a.apk` com o código do jogo. Descompactar e
copiar só o APK base deixa a biblioteca para trás; o instalador então diz isso
no `nxextract.log` ("no native code at all … only the BASE part of a split
install"). Copiar o base **e** o `config.arm64_v8a.apk` em `gamedata/` também
funciona.

### Controles

| Botão | Ação |
|---|---|
| A / B / X / Y / L / R | pular (segurar vale: nave e onda precisam) |
| D-pad / analógico esquerdo | andar para os lados — só no Geometry Dash, níveis de plataforma (a Torre) |
| Analógico direito | move a seta nos menus de toque |
| R3 | toca onde a seta está — em qualquer lugar, sempre |
| START | pausa |
| SELECT + START | sai |

Dentro de um nível o pulo vai como TECLA do próprio jogo, não como toque. Tem
que ser: os níveis de plataforma desenham as setas do jogo no canto inferior
esquerdo, e um toque parado em cima de uma delas anda em vez de pular. O R3
continua tocando em todo lugar, então o menu de pause de um nível continua
sendo apertado com ele. O SubZero roda a mesma engine 2.2 e segue o mesmo
caminho — os níveis dele são todos clássicos, então nada anda lá, mas o pulo
dentro do nível é a mesma tecla.

Em vários portáteis SELECT, START, L3 e R3 chegam ao sistema como
`BTN_TRIGGER_HAPPY1..4`, fora de qualquer mapping da SDL. O loader lê esses
códigos direto do evdev — inclusive para um controle plugado com o jogo já
aberto — então funcionam mesmo quando o firmware não os declara.

### Aparelhos

Nível de evidência, nunca promessa:

| Aparelho / firmware | Estado |
|---|---|
| R36S / ArkOS (RK3326, Mali-G31, glibc 2.30) | **validado fisicamente** — instalação limpa a partir do próprio ZIP, 60 fps, áudio, controle nativo, saída limpa |
| NextOS Elite (Amlogic, Mali-450, glibc 2.43) | **validado fisicamente** |
| Outros CFW AArch64 com SDL2 e GLES2 | plausível, **não testado** |

O executável público é construído com teto **GLIBC 2.30** e depende apenas de
`libSDL2`, `libGLESv2`, `libEGL`, `libfreetype` e a libc do firmware. Nenhum
backend SDL de vídeo ou áudio é forçado em lugar nenhum.

### Construir

```sh
./build_universal.sh geometrydash      # -> geometrydash-universal
./build_universal.sh gdsubzero         # -> gdsubzero-universal
package/build-package.sh geometrydash  # zip público, auditado
package/build-package.sh ambos         # um zip com os dois jogos
```

A build cruzada roda num container Debian Buster para manter o teto de glibc;
SDL2/GLES/EGL/FreeType entram só como stubs de SONAME, porque quem fornece
essas bibliotecas é o firmware do aparelho. A build é **reproduzível**: a mesma
fonte sai com o mesmo sha256, e o ZIP também, então dá para conferir o binário
da release contra este repositório. O empacotador roda
`package/audit-portability.sh` sobre a árvore antes de fechar o ZIP; as
exceções, com o contrato de cada uma, estão em `package/audit-allow.txt`.

### Créditos e licença

Código do port: **GPL-3.0** (veja [`LICENSE`](LICENSE)). O NXExtract embutido é
MIT (`licenses/NXExtract-MIT.txt`).

**Geometry Dash** e **Geometry Dash SubZero** são obras e marcas da **RobTop
Games AB**. Este projeto não é afiliado, patrocinado nem endossado pela RobTop
Games. FMOD é da Firelight Technologies. Nada aqui é distribuído em nome deles
— veja [`NOTICE.md`](NOTICE.md).

## Download

- [gdsubzero-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/gdsubzero-v1.0.3) — `gdsubzero.zip`, `SHA256SUMS.txt`
- [geometrydash-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/geometrydash-v1.0.2) — `Geometry.Dash.NextOS.zip`, `Geometry.Dash.SubZero.NextOS.zip`, `SHA256SUMS.txt`
- [geometrydash-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/geometrydash-v1.0.1) — `Geometry.Dash.NextOS.zip`, `Geometry.Dash.SubZero.NextOS.zip`
- [geometrydash-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/geometrydash-v1.0.0) — `Geometry.Dash.NextOS.zip`, `Geometry.Dash.SubZero.NextOS.zip`

- Todas as versões / all versions: [releases?q=geometrydash](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=geometrydash)
- Histórico: 293 downloads no repositório original `geometrydash-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
