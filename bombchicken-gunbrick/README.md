# Bomb Chicken + Gunbrick Reloaded — NextOS / PortMaster

![Bomb Chicken](docs/images/bombchicken/title.png)

Independent universal AArch64 compatibility ports. Both releases are
**BYO-data**: the ZIPs contain the open-source Linux integration, launcher and
installer only. They never include an APK, Android libraries, game assets,
videos or saves.

## Releases

| Game | Version | Download | Status |
| --- | --- | --- | --- |
| Bomb Chicken | 1.1.7 | [Release and checksum](https://github.com/NextOs-Ports/bombchicken-gunbrick-nextos/releases/tag/bombchicken-v1.1.7) | Clean-save/New Game fix physically validated through phase 2 |
| Gunbrick Reloaded | 0.2.5 | [Release and checksum](https://github.com/NextOs-Ports/bombchicken-gunbrick-nextos/releases/tag/gunbrick-v0.2.5) | Physically validated through the bonus/phase-3 memory transition |

## Quick installation

1. Download the ZIP for the game and extract it into the PortMaster `ports`
   directory.
2. Place a compatible, legally obtained Android APK in the game's
   `gamedata/` directory.
3. Launch the port. NXExtract 1.2.6 validates and installs the owner data
   transactionally on first run.

Wrong or incomplete game data is rejected without replacing a working
installation. Public Linux ELFs are AArch64 and audited at GLIBC 2.27, below
the universal GLIBC 2.30 ceiling.

## Community

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

## What changed

### Bomb Chicken 1.1.7

- fixes the two exact IL2CPP `PlayerPrefs.GetString` overload ABIs;
- returns a real managed empty string when a clean save requests a missing key,
  instead of misreading the hidden `MethodInfo*` as `defaultValue`;
- passed physical tests with an existing phase-3 save and from no save through
  New Game, tutorial, save creation and phase 2;
- keeps the portable nxbootstrap 0.6.8 launcher, transactional extraction,
  clean lifecycle exit and two-instance protection.

Full technical notes: [`ports/bombchicken/README.md`](ports/bombchicken/README.md).

### Gunbrick Reloaded 0.2.5

- bounds fake-JNI, FMOD and guest-semaphore ownership;
- delivers Unity's Android low-memory callback before rendering when measured
  RAM/swap pressure rises;
- maps clean guest executable pages from their original files so the kernel
  can reclaim them;
- restores the raw two-axis left stick required by 3D bonus gameplay while
  keeping the D-pad on its independent Android path;
- passed the physical transition that previously exhausted RAM and zram.

Full technical notes: [`ports/gunbrick/README.md`](ports/gunbrick/README.md).

## Screenshots

| Bomb Chicken gameplay | Bomb Chicken gameplay |
| --- | --- |
| ![Bomb Chicken gameplay 1](docs/images/bombchicken/gameplay-1.png) | ![Bomb Chicken gameplay 2](docs/images/bombchicken/gameplay-2.png) |

| Gunbrick Reloaded gameplay | Gunbrick Reloaded cutscene |
| --- | --- |
| ![Gunbrick gameplay](docs/images/gunbrick/gameplay.png) | ![Gunbrick cutscene](docs/images/gunbrick/cutscene.png) |

## Português

São ports universais AArch64 independentes e no formato **BYO-data**. Baixe o
ZIP da release, extraia na pasta `ports`, coloque um APK Android compatível e
obtido legalmente em `gamedata/` e abra o jogo. O NXExtract valida e instala os
dados no primeiro uso. Nenhum APK, biblioteca Android, asset, vídeo ou save é
distribuído.

- **Bomb Chicken 1.1.7:** corrige as ABIs dos dois overloads IL2CPP de
  `PlayerPrefs.GetString`. Foi validado fisicamente com save existente e, sem
  save, do New Game até a fase 2, incluindo criação do novo progresso e saída.
- **Gunbrick Reloaded 0.2.5:** corrige o pico de memória na transição
  bônus/fase 3, limita o ownership JNI/FMOD e preserva os dois eixos do
  analógico na fase bônus 3D. A versão foi validada fisicamente do começo ao
  gameplay além do ponto que antes encerrava o processo.

Os SHA-256 ficam anexados às releases. Os screenshots são apenas material
demonstrativo; Bomb Chicken, Gunbrick Reloaded e seus dados pertencem à Nitrome
ou aos respectivos titulares.

### Comunidade

Dúvidas, relatos de teste e conversa sobre os ports:
https://discord.gg/DHfY62eDNN

## Source and licenses

This repository contains the complete public source of both ports. Project
code is GPL-3.0-only unless a component states another license; NXExtract is
MIT.

## Download

- [bombchicken-v1.1.7](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/bombchicken-v1.1.7) — `bombchicken.zip`, `bombchicken.zip.sha256`
- [bombchicken-v1.1.6](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/bombchicken-v1.1.6) — `bombchicken.zip`, `bombchicken.zip.sha256`
- [gunbrick-v0.2.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/gunbrick-v0.2.5) — `gunbrick.zip`, `gunbrick.zip.sha256`
- [bombchicken-v1.1.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/bombchicken-v1.1.4) — `bombchicken.zip`, `bombchicken.zip.sha256`
- [gunbrick-v0.2.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/gunbrick-v0.2.0) — `gunbrick.zip`, `gunbrick.zip.sha256`
- [bombchicken-v1.1.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/bombchicken-v1.1.2) — `bombchicken.zip`, `bombchicken.zip.sha256`

- Todas as versões / all versions: [releases?q=bombchicken-gunbrick](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=bombchicken-gunbrick)
- Histórico: 156 downloads no repositório original `bombchicken-gunbrick-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
