# Swordigo — NextOS / PortMaster universal port

Native **AArch64** port of **Swordigo** (TouchFoo, *Caver* engine, GLES 1.1) for
Linux handhelds. No Android emulation and no translation layer: the game's own
native library runs inside a normal Linux process, and everything Android would
provide — JNI, the asset reader, the music player, lifecycle, preferences and
touch — is served in C. Audio goes through the firmware's OpenAL Soft, the BGM
through mpg123, and video through SDL2 + GLES 1.1.

**This repository ships no game data.** No APK, no assets, no TouchFoo library.
You provide the APK you legally own; the installer validates it and publishes
the data on the device.

|  |  |
|---|---|
| ![Swordigo title screen on an R36S](screenshots/01-title-r36s.png) | ![Swordigo gameplay on an R36S](screenshots/02-gameplay-r36s.png) |

*Captured on an R36S at 640×480, by the game's own GPU — that is what the
device drew.*

## Community

Questions, device reports and bug reports: <https://discord.gg/DHfY62eDNN>

A useful report has the device model, the firmware and its version, plus
`log.txt`, `log.prev.txt` and `nxextract.log` from the `swordigo/` folder.

## Install

1. Unzip into your **ports** folder, keeping the layout — `Swordigo.sh` and the
   `swordigo/` folder end up side by side in `<ROMS>/ports/`.
2. Drop the APK you legally own into `ports/swordigo/gamedata/`. The name does
   not matter — `.apk`, `.apkm`, `.apks`, `.xapk` and `.zip` all work, and the
   installer identifies the package by content.
3. Launch **Swordigo** from the Ports menu. The first launch extracts and
   validates with a progress screen; later ones go straight to the game.
   **Your APK is never deleted or modified.**

A successful install creates `libswordigo.so`, `assets/` and `res/` inside
`ports/swordigo/`. Full steps, including the per-firmware card paths, in
[`INSTALLATION.md`](INSTALLATION.md).

Updating from an earlier release preserves extracted data and saves. Version
1.0.15 keeps the stable public executable name `swordigo-nextos` and adds two
capability-gated repairs. If SDL creates a real drawable but resolves EGL and
GLES through different broken paths, the loader re-executes once with both
providers bound to the same validated object. If a mapping advertises a right
stick whose raw axes do not exist, the loader reports the real topology rather
than trusting the host-wide stick count.

Firmware note: on **NextOS / EmuELEC** EmulationStation lists launchers from
`roms/ports_scripts/`, so `Swordigo.sh` also goes there while the game folder
stays at `roms/ports/swordigo/`. On **muOS** the card path is
`mmc/roms/ports` (or `sdcard/roms/ports`). On **ArkOS / ROCKNIX / Knulli /
JELOS** it is plain `roms/ports/`.

### Which APK

| Android package | Validated build | ABI |
|---|---|---|
| `com.touchfoo.swordigo` | **1.4.12** (`1.4.12-47` and one alternative build) | `arm64-v8a` |

That is the build physically tested here — **not a requirement**. The recipe
validates by structure and by content, so a different build of the same game is
accepted without any change to the port. What is refused, with the reason
written to `nxextract.log`, is a package of a different app, a build with no
`arm64-v8a` library, or a file missing what every build of the game has
(`assets/resources`, the `res/*.mp3` music, `lib/arm64-v8a/libswordigo.so`).

An **armeabi-v7a-only** APK cannot work here: the port is AArch64 and the
32-bit library is not interchangeable. A `.xapk`/`.apkm` bundle is fine — the
installer picks the base APK and the `arm64-v8a` split by itself. **Copy the
bundle whole**: unpacking it and copying only the base APK leaves the library
behind, and the installer says exactly that in `nxextract.log`.

## Controls (SDL Xbox layout)

| Input | Action |
|---|---|
| D-pad / left stick | move |
| A | jump |
| X | attack |
| B | magic |
| Y | item |
| LB | magic equip |
| RB | back |
| START | pause / menu |
| Right stick | smooth on-screen cursor |
| R2 or R3 | cursor press / drag / release (touch) |
| SELECT + START | quit |

PortMaster's mapping remains the button-layout authority, but the loader also
checks every binding against the raw joystick topology. A firmware that omits
`ABS_RX/ABS_RY` cannot be repaired inside a port because no movement events
reach SDL; its device-tree/controller configuration must expose the physical
right stick.

## Device support

Evidence level, never a promise:

| Device / firmware | State |
|---|---|
| R36S / ArkOS-class (RK3326, Mali-G31, glibc 2.30, 640×480) | **physically validated** — clean install from the ZIP itself, on-device extraction, title, gameplay, audio and music, exit chord, frontend restored |
| K36S / dArkOSRE (RK3326, Mali-G31, 640×480) | **physically validated** — clean NXExtract, coherent Mali provider, non-black frame, audio/music, normal right-stick cursor and clicks; the firmware DTB must expose `ABS_RX/ABS_RY` instead of carrying `skip-absr` |
| NextOS Elite (Amlogic, Mali-450, glibc 2.43) | **physically validated** |
| X5M / NextOS (Amlogic, Mali-G310, KMSDRM, 1920×1080) | **physically validated** — video, audio, music, controls, R2/R3 cursor press/drag/release |
| AmberELEC / BusyBox without `stat -c` | v1.0.12 launcher/extraction physically accepted; the stat-free launcher contract remains mandatory |
| Other AArch64 CFW with SDL2, OpenAL and GLES 1.1 | plausible, **not tested** |

Those rows describe prior accepted releases. Version 1.0.15 is validated by
host/build/package gates first and is recorded as physically accepted only
after a clean run of this exact ZIP.

The public executable is audited at a maximum requirement of `GLIBC_2.27`.
The release bundles only a pinned low-glibc `libmpg123.so.0`; SDL2, GLES/EGL,
OpenAL, zlib and libc remain firmware/PortMaster dependencies. No SDL video or
audio backend is ever forced.

## Architecture

The original arm64 `libswordigo.so` is loaded by so-loader. Shims: `AAsset` →
`assets/`, a fake JNI (MusicPlayer + lifecycle), OpenAL on the host stack and
GLES 1.1 through SDL2. C++ exceptions need a custom `dl_iterate_phdr` so the
in-binary unwinder can see the `PT_GNU_EH_FRAME` of the mmap'd module, and the
stack canary is anchored in a thread-local pad because the game reads it from
the Bionic TLS slot. `STUDY.md` has the full reverse-engineering notes.

The public package has one launcher chain only:
`Swordigo.sh → swordigo/swordigo-nextos`. The generated nxbootstrap 0.6.8
logic is self-contained in the visible launcher; there is no second-stage
`run.sh` or bootstrap library. NXExtract 1.2.6 runs as an isolated foreground
phase before the owner data gate. The game-specific OpenAL and graphics policy
stays inside the loader adapter.

The release ZIP is assembled from the explicit `nxrelease.json` allowlist by
content-pinned NXRelease 0.2.5. Its embedded `swordigo/.nxrelease/` inventory,
checksum manifest, ELF audit and SBOM make the exact launcher chain,
dependencies and source pins independently verifiable after packaging.

The launcher rotates the previous runtime log to `log.prev.txt` and writes the
current attempt to `log.txt`. The loader records explicit lifecycle phases; a
fatal signal report includes the phase and guest PC/LR offsets without trying
to continue after the fault. Graphics repair is capability-driven: a failed
provider is replaced only when an alternate object matches the active
transport, exports the required symbols and initializes EGL against the live
kernel. On KMSDRM, the adapter drains the GLES queue before swap; the
opaque-backbuffer operation preserves and restores framebuffer, colour mask,
clear colour and scissor state.

The sanitized v1.0.5 acceptance receipt is in the
[`references/v1.0.5-multi-device-acceptance.json`](https://github.com/NextOs-Ports/swordigo-nextos/blob/v1.0.5/references/v1.0.5-multi-device-acceptance.json)
source record.
It records the package hash and the two available physical regression runs;
confirmation on the original dArkOSRE report remains pending.

## Build

```sh
./build_universal.sh          # -> swordigo-nextos
package/build-package.sh      # public BYO-data zip
```

The cross build runs in a Debian Buster container to hold the glibc ceiling;
SDL2, OpenAL and mpg123 are linked against stable SONAME stubs. The release
supplies the pinned mpg123 build while device providers come from the target
firmware. Both the build recipe and
NXRelease reject `RPATH`/`RUNPATH`; the packager re-runs the launcher tests and
refuses the ZIP if any Linux ELF is not the declared architecture, dependencies
or low-glibc profile. Repeating the same manifest build produces identical ZIP
bytes.

## Credits and licence

Port code: **GPL-3.0** (see [`LICENSE`](LICENSE)). The bundled NXExtract is MIT
(`licenses/NXExtract-MIT.txt`). Architecture reference: NaGaa95's `swordigo_nx`
(same 1.4.12).

**Swordigo** is a work and trademark of **TouchFoo**. This project is not
affiliated with or endorsed by TouchFoo, and nothing here is
distributed on their behalf — see [`NOTICE.md`](NOTICE.md). Obtain the game
legally.

---

# Português

Port nativo **AArch64** do **Swordigo** (TouchFoo, engine *Caver*, GLES 1.1)
para portáteis Linux. Sem emulação de Android e sem camada de tradução: a
biblioteca nativa do próprio jogo roda dentro de um processo Linux comum, e
tudo o que o Android daria — JNI, leitor de assets, tocador de música, ciclo de
vida, preferências e toque — é servido em C. O áudio sai pelo OpenAL Soft do
firmware, a música pelo mpg123, e o vídeo pelo SDL2 + GLES 1.1.

**Este repositório não contém dado de jogo.** Nenhum APK, nenhum asset, nenhuma
biblioteca da TouchFoo. Quem joga fornece o APK que possui legalmente; o
instalador valida e publica os dados no aparelho.

### Comunidade

Dúvidas, relatos de aparelho e bugs: <https://discord.gg/DHfY62eDNN>

Relato útil traz o modelo do aparelho, o firmware e a versão, mais
`log.txt`, `log.prev.txt` e `nxextract.log` da pasta `swordigo/`.

### Instalar

1. Descompacte na sua pasta **ports**, mantendo o layout — `Swordigo.sh` e a
   pasta `swordigo/` ficam lado a lado em `<ROMS>/ports/`.
2. Coloque o APK que você possui legalmente em `ports/swordigo/gamedata/`. O
   nome não importa — `.apk`, `.apkm`, `.apks`, `.xapk` e `.zip` servem, e o
   instalador reconhece o pacote pelo conteúdo.
3. Abra **Swordigo** pelo menu Ports. A primeira abertura extrai e valida com
   tela de progresso; as seguintes vão direto para o jogo. **O seu APK nunca é
   apagado nem modificado.**

A instalação bem-sucedida cria `libswordigo.so`, `assets/` e `res/` dentro de
`ports/swordigo/`. Passo a passo, com o caminho do cartão de cada firmware, em
[`INSTALLATION.md`](INSTALLATION.md).

No **NextOS / EmuELEC** o EmulationStation lista launcher de
`roms/ports_scripts/`, então o `Swordigo.sh` vai também para lá e a pasta do
jogo fica em `roms/ports/swordigo/`. No **muOS** o caminho é `mmc/roms/ports`
(ou `sdcard/roms/ports`). No **ArkOS / ROCKNIX / Knulli / JELOS** é
`roms/ports/`.

### Qual APK

| Pacote Android | Build validada | ABI |
|---|---|---|
| `com.touchfoo.swordigo` | **1.4.12** (`1.4.12-47` e uma build alternativa) | `arm64-v8a` |

Essa é a build testada fisicamente aqui — **não é exigência**. A receita valida
por estrutura e por conteúdo, então uma build diferente do mesmo jogo é aceita
sem mudar nada no port. O que é recusado, com o motivo escrito no
`nxextract.log`, é pacote de outro aplicativo, build sem biblioteca
`arm64-v8a`, ou arquivo a que falte o que toda build do jogo tem
(`assets/resources`, as músicas `res/*.mp3`, `lib/arm64-v8a/libswordigo.so`).

APK **só armeabi-v7a** não serve: o port é AArch64 e a biblioteca 32-bit não é
intercambiável. Bundle `.xapk`/`.apkm` serve — o instalador escolhe sozinho o
APK base e o split `arm64-v8a`. **Copie o bundle inteiro**: descompactar e
copiar só o APK base deixa a biblioteca para trás, e o instalador diz
exatamente isso no `nxextract.log`.

### Controles (layout Xbox da SDL)

| Botão | Ação |
|---|---|
| D-pad / analógico esquerdo | andar |
| A | pular |
| X | atacar |
| B | magia |
| Y | item |
| LB | equipar magia |
| RB | voltar |
| START | pausa / menu |
| Analógico direito | cursor suave na tela |
| R2 ou R3 | pressionar / arrastar / soltar o cursor (toque) |
| SELECT + START | sair |

O mapping do PortMaster continua sendo a autoridade do layout, mas o loader
também confere cada binding contra a topologia crua do joystick. Um firmware
que omite `ABS_RX/ABS_RY` não pode ser corrigido dentro do port, pois nenhum
evento de movimento chega à SDL; a configuração do controle/device tree do
firmware precisa expor o analógico direito físico.

### Aparelhos

Nível de evidência, nunca promessa:

| Aparelho / firmware | Estado |
|---|---|
| R36S / classe ArkOS (RK3326, Mali-G31, glibc 2.30, 640×480) | **validado fisicamente** — instalação limpa a partir do próprio ZIP, extração no aparelho, título, gameplay, áudio e música, atalho de saída, frontend restaurado |
| K36S / dArkOSRE (RK3326, Mali-G31, 640×480) | **validado fisicamente** — NXExtract limpo, provider Mali coerente, quadro não preto, áudio/música, cursor normal no analógico direito e cliques; o DTB do firmware precisa expor `ABS_RX/ABS_RY` em vez de conter `skip-absr` |
| NextOS Elite (Amlogic, Mali-450, glibc 2.43) | **validado fisicamente** |
| X5M / NextOS (Amlogic, Mali-G310, KMSDRM, 1920×1080) | **validado fisicamente** — vídeo, áudio, música, controles e cursor R2/R3 com pressionar/arrastar/soltar |
| AmberELEC / BusyBox sem `stat -c` | launcher/extração da v1.0.12 aceitos fisicamente; o contrato sem `stat` continua obrigatório |
| Outros CFW AArch64 com SDL2, OpenAL e GLES 1.1 | plausível, **não testado** |

Essas linhas registram releases aceitas anteriormente. A v1.0.15 passa
primeiro pelos gates de host/build/pacote e só é registrada como aceita
fisicamente depois de um teste limpo deste mesmo ZIP.

O executável público é auditado com teto de `GLIBC_2.27`. O release empacota
somente uma `libmpg123.so.0` fixada e de glibc baixa; SDL2, GLES/EGL, OpenAL,
zlib e libc continuam vindo do firmware/PortMaster. Nenhum backend SDL de
vídeo ou áudio é forçado.

### Arquitetura

O `libswordigo.so` arm64 original é carregado via so-loader. Shims: `AAsset` →
`assets/`, JNI falso (MusicPlayer + ciclo de vida), OpenAL no host e GLES 1.1
pela SDL2. Exceções C++ exigem um `dl_iterate_phdr` custom para o unwinder
embutido enxergar o `PT_GNU_EH_FRAME` do módulo mmapado, e o canário de pilha
fica ancorado num pad thread-local porque o jogo o lê do slot TLS do bionic.
As notas completas de engenharia reversa estão em `STUDY.md`.

O pacote público tem uma única cadeia de lançamento:
`Swordigo.sh → swordigo/swordigo-nextos`. A lógica gerada do nxbootstrap 0.6.8
fica autocontida no launcher visível; não existe `run.sh` nem biblioteca de
bootstrap intermediária. O NXExtract 1.2.6 roda como fase isolada em
foreground antes do gate dos dados. As políticas OpenAL e gráficas específicas
do jogo ficam no adapter do loader.

O ZIP é montado da allowlist explícita `nxrelease.json` pelo NXRelease 0.2.5
fixado por conteúdo. O inventário, manifesto de hashes, auditoria ELF e SBOM
embutidos em `swordigo/.nxrelease/` permitem verificar depois do empacotamento
a cadeia de launcher, dependências e pins exatos.

O launcher move o log anterior para `log.prev.txt` e grava a tentativa atual em
`log.txt`. O loader registra fases explícitas do ciclo nativo; um sinal fatal
inclui fase e offsets PC/LR do guest, sem tentar continuar depois da falha. A
correção gráfica é guiada por capacidade: um provider só é trocado quando o
alternativo combina com o transporte ativo, exporta os símbolos obrigatórios
e inicializa EGL contra o kernel real. No KMSDRM, o adapter drena a fila GLES
antes do swap; a correção de alpha preserva e restaura framebuffer, máscara de
cor, clear color e scissor.

O recibo sanitizado da v1.0.5 está no registro-fonte
[`references/v1.0.5-multi-device-acceptance.json`](https://github.com/NextOs-Ports/swordigo-nextos/blob/v1.0.5/references/v1.0.5-multi-device-acceptance.json).
Ele registra o hash do pacote e as duas regressões físicas disponíveis; a
confirmação no aparelho dArkOSRE do relato original continua pendente.

### Construir

```sh
./build_universal.sh          # -> swordigo-nextos
package/build-package.sh      # zip público BYO-data
```

A build cruzada roda num container Debian Buster para manter o teto de glibc;
SDL2, OpenAL e mpg123 entram por stubs de SONAME estáveis. O release fornece o
build fixado do mpg123, enquanto os providers do aparelho vêm do firmware. A
receita e o NXRelease rejeitam
`RPATH`/`RUNPATH`; o empacotador repete os testes do launcher e recusa o ZIP se
qualquer ELF Linux divergir da arquitetura, dependências ou perfil de glibc
baixa declarados. Repetir a build do mesmo manifesto produz bytes idênticos.

### Créditos e licença

Código do port: **GPL-3.0** (veja [`LICENSE`](LICENSE)). O NXExtract embutido é
MIT (`licenses/NXExtract-MIT.txt`). Referência de arquitetura: `swordigo_nx` do
NaGaa95 (mesma 1.4.12).

**Swordigo** é obra e marca da **TouchFoo**. Este projeto não é afiliado,
patrocinado nem endossado pela TouchFoo, e nada aqui é distribuído em nome
deles — veja [`NOTICE.md`](NOTICE.md). Obtenha o jogo legalmente.

## Download

- [swordigo-v1.0.15](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/swordigo-v1.0.15) — `Swordigo.NextOS-v1.0.15.zip`, `Swordigo.NextOS-v1.0.15.zip.sha256`
- [swordigo-v1.0.13](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/swordigo-v1.0.13) — `Swordigo.NextOS-v1.0.13-FINAL.zip`, `Swordigo.NextOS-v1.0.13-FINAL.zip.sha256`

- Todas as versões / all versions: [releases?q=swordigo](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=swordigo)
- Histórico: 116 downloads no repositório original `swordigo-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
