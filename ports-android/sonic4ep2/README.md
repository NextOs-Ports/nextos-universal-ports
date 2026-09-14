# Sonic The Hedgehog 4: Episode II — native AArch64 port

**Language / Idioma:** [English](#english) · [Português](#português)

A native Linux port of the ARM64 Android release (3.0.0-109), running on
low-power retro handhelds. It is a BYO-data project: no game assembly, assets,
audio, `libfox.so`, APK or OBB belongs in this repository or in the community ZIP.

## Download

Grab **`sonic4ep2.zip`** from the [latest release](https://github.com/NextOs-Ports/sonic4ep2-nextos/releases/latest),
extract it into your device's `ports/` folder (PortMaster layout: `Sonic4EP2.sh`
next to the `sonic4ep2/` folder), drop your own legal ARM64 Android 3.0.0-109
splits (or `.apks`/`.apkm`) inside `sonic4ep2/` and launch. First run validates
the data and prepares everything automatically.

## Screenshots

Captured straight off a **NextOS Elite handheld** (Amlogic, Mali-450, 916 MB RAM)
running this port at 1280×720 — real hardware, no upscaling or mock-ups:

| | |
|---|---|
| ![Title](docs/screenshots/01-title.png) | ![Sylvania Castle](docs/screenshots/02-gameplay-sylvania.png) |
| ![Platforms](docs/screenshots/03-gameplay-plataformas.png) | ![Checkpoint](docs/screenshots/04-gameplay-checkpoint.png) |
| ![Sonic & Tails](docs/screenshots/05-gameplay-tails.png) | ![Spin](docs/screenshots/06-gameplay-spin.png) |

---

## Community

Questions, bug reports, help getting the port running, and news about the next ones:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

## English

### Status

Playable end to end on Mali-450 class hardware. The engine runs as a plain Linux
process — no Android emulation and no Android runtime: SEGA's native `libfox.so`
engine is loaded by our own loader, with the Android platform calls it expects
answered by a compatibility layer written for this port.

Full technical notes live in [`STATUS.md`](STATUS.md), the `STUDY_*.md` files and
[`PLAN_MULTIDEVICE.md`](PLAN_MULTIDEVICE.md).

### What is in this repository

- `src/` — loader, Android compatibility layer, EGL/GLES shim and audio bridge.
- `package/` — PortMaster package builder, launcher, metadata and the setup tool
  that validates and extracts the user's own game data.
- `tools/` — data validator and helper scripts.
- `docs/`, `STUDY_*.md`, `STATUS.md` — investigation notes kept for whoever wants
  to understand or continue the work.

### Audio

The package ships redistributable fallback audio libraries (mpg123 LGPL, Ogg/Vorbis
BSD) for firmwares that lack them; see `package/sonic4ep2/licenses/`. Sound effect
mapping is documented in [`SFX_MAP.md`](SFX_MAP.md).

### Licences

The port code in this repository is © NextOS and distributed under the
**GNU GPL-3.0** (see [`LICENSE`](LICENSE)) — anyone may use, study, modify and
redistribute it under the same terms. Bundled third-party libraries keep their own
licences (mpg123 LGPL-2.1-or-later, Ogg/Vorbis BSD, SDL zlib), all reproduced in
`package/sonic4ep2/licenses/`. The V6 ZIP published before the relicense still
carries an Apache-2.0 notice for the port code; Apache-2.0 is GPL-compatible, so
that artifact remains valid. The game itself, `libfox.so` and every asset remain
the property of SEGA and are supplied only by the user.

## Português

### Estado

Jogável do início ao fim em hardware da classe Mali-450. O motor roda como
processo Linux comum — sem emulação de Android e sem runtime Android: a
`libfox.so` nativa da SEGA é carregada pelo nosso próprio loader, e as chamadas
de plataforma que ela espera são respondidas por uma camada de compatibilidade
escrita para este port.

As notas técnicas completas estão em [`STATUS.md`](STATUS.md), nos arquivos
`STUDY_*.md` e em [`PLAN_MULTIDEVICE.md`](PLAN_MULTIDEVICE.md).

### Download e instalação

Baixe o **`sonic4ep2.zip`** na [última release](https://github.com/NextOs-Ports/sonic4ep2-nextos/releases/latest)
e extraia na pasta `ports/` do cartão (fica `Sonic4EP2.sh` ao lado da pasta
`sonic4ep2/`). Coloque a sua cópia legal da versão **Android 3.0.0-109 arm64**
dentro de `sonic4ep2/`:

- `split_config.arm64_v8a.apk` + `split_packs.apk` da mesma instalação;
- ou um `.apks`/`.apkm` completo com esses splits;
- ou um APK mesclado com `lib/arm64-v8a/libfox.so` e `assets/data.obb`.

A versão antiga (Android 2.0.0, armv7) **não serve** — ela é de outro motor.
A primeira execução valida, extrai e prepara tudo sozinha.

### O que tem neste repositório

- `src/` — loader, camada de compatibilidade Android, shim EGL/GLES e ponte de áudio.
- `package/` — construtor do pacote PortMaster, launcher, metadados e o setup que
  valida e extrai os dados do próprio usuário.
- `tools/` — validador de dados e utilitários.
- `docs/`, `STUDY_*.md`, `STATUS.md` — notas da investigação, preservadas para quem
  quiser entender ou continuar o trabalho.

### Licenças

O código do port é © NextOS sob **GNU GPL-3.0** — qualquer pessoa pode usar,
estudar, modificar e redistribuir nos mesmos termos. As bibliotecas de terceiros
mantêm suas licenças (mpg123 LGPL-2.1+, Ogg/Vorbis BSD, SDL zlib), todas em
`package/sonic4ep2/licenses/`. O jogo, a `libfox.so` e todos os assets pertencem
à SEGA e são fornecidos apenas pelo usuário.

## Download

- [sonic4ep2-v6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sonic4ep2-v6) — `sonic4ep2.zip`, `sonic4ep2.zip.sha256`

- Todas as versões / all versions: [releases?q=sonic4ep2](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=sonic4ep2)
- Histórico: 97 downloads no repositório original `sonic4ep2-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
