# Final Fantasy IV — NextOS ports (3D Remake + The After Years)

One repository, two games — native AArch64 ports (so-loader) of Square Enix's
cuore/Matrix engine (GLES1) for Linux handhelds: NextOS, dArkOS/R36S, ROCKNIX
and other PortMaster-class devices.

| Game | Folder | Version | Release zip |
|---|---|---|---|
| Final Fantasy IV 3D Remake | [`ff4/`](ff4/) | 1.0.4 | `ff4-1.0.4.zip` |
| Final Fantasy IV: The After Years | [`ff4a/`](ff4a/) | 1.0.6 | `ff4a-1.0.6.zip` |

**BYO-data: no game data is included** in this repository or in the release
zips. Drop your own APK into `gamedata/` and the extractor sets everything up
on first launch. See each game's `INSTALLATION.md`.

## Features

- Native gamepad controls (world, battles and menus) — no touch emulation.
- Perfect audio (OpenSL → SDL), stable 30 fps, built-in virtual keyboard for
  the naming screen.
- SELECT+START quits back to the frontend at any time.

## Build

Each game builds from its own folder: `cd ff4 && ./build_universal.sh` (same
for `ff4a/`). The NextOS runtime modules ship as compiled vendor binaries
(`nxsplash-nextos`, the launcher ELF and the NXExtract runtime); their pins
are recorded in `nxrelease.json` / `nxproject.json`.

## Support

Questions, device reports and bug reports: <https://discord.gg/DHfY62eDNN>

## Download

- [ff4-1.0.4_ff4a-1.0.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/ff4-1.0.4_ff4a-1.0.6) — `ff4-1.0.4.zip`, `ff4-1.0.4.zip.sha256`, `ff4a-1.0.6.zip`, `ff4a-1.0.6.zip.sha256`, `SHA256SUMS`

- Todas as versões / all versions: [releases?q=ff4](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=ff4)
- Histórico: 99 downloads no repositório original `ff4-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
