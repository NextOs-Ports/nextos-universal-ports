<div align="center">

# NEXTOS UNIVERSAL PORTS

**Ports universais de jogos para portáteis Linux AArch64**
NextOS · ArkOS / R36S · ROCKNIX · muOS · PortMaster

[![Releases](https://img.shields.io/github/v/release/NextOs-Ports/nextos-universal-ports?label=%C3%BAltima%20release&sort=date)](https://github.com/NextOs-Ports/nextos-universal-ports/releases)
[![Downloads](https://img.shields.io/github/downloads/NextOs-Ports/nextos-universal-ports/total?label=downloads)](https://github.com/NextOs-Ports/nextos-universal-ports/releases)
[![Site](https://img.shields.io/badge/site-nextos--ports.github.io-22c55e)](https://nextos-ports.github.io/nextos-universal-ports/)
[![Discord](https://img.shields.io/badge/Discord-comunidade-5865F2?logo=discord&logoColor=white)](https://discord.gg/DHfY62eDNN)

[Site](https://nextos-ports.github.io/nextos-universal-ports/) · [Ports Android](#-ports-android) · [Ports iOS](#-ports-ios) · [Ports Switch](#-ports-switch) · [Ports GameCube](#-ports-gamecube) · [Ferramentas](#%EF%B8%8F-ferramentas--tools) · [Instalação](#-instalação--install) · [Aviso legal](#%EF%B8%8F-aviso-legal--legal-notice)

</div>

---

## 📖 Sobre / About

Cada port é um pacote pronto para o menu de ports do aparelho. O pacote traz o carregador
nativo, a documentação e o instalador; **o jogo não vem junto**. Na primeira abertura o
instalador extrai os dados da cópia legítima do próprio usuário (APK/XAPK, IPA ou dump),
valida e instala de forma transacional. Uma pasta por jogo, organizada pela plataforma de
origem; os pacotes ficam nas [Releases](https://github.com/NextOs-Ports/nextos-universal-ports/releases), com a tag `<jogo>-vX.Y.Z`.

Each port is a ready-to-use package for the device's ports menu: native loader, docs and
installer. **The game itself is not included.** On first launch the installer extracts
the data from the user's own legitimate copy (APK/XAPK, IPA or dump), validates it and
installs it transactionally. One folder per game, organized by source platform; packages
live in [Releases](https://github.com/NextOs-Ports/nextos-universal-ports/releases), tagged `<game>-vX.Y.Z`.

| Plataforma de origem | Pasta | Ports |
|---|---|---|
| 🤖 Android | [`ports-android/`](ports-android/) | 38 |
| 🍎 iOS | [`ports-ios/`](ports-ios/) | em breve |
| 🎮 Nintendo Switch | [`ports-switch/`](ports-switch/) | em breve |
| 🟣 GameCube | [`ports-gamecube/`](ports-gamecube/) | em breve |
| 🛠️ Ferramentas | [`tools/`](tools/) | 1 |

## 🌐 Site e app PortMaster / Website and PortMaster app

- **Site:** <https://nextos-ports.github.io/nextos-universal-ports/> — catálogo com capas, filtros por plataforma/gênero e botão de download.
- **Dentro do app PortMaster:** baixe [`040_nextos.source.json`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/download/ports-latest/040_nextos.source.json) e coloque em `PortMaster/config/` (ao lado de `020_portmaster.source.json`):
  - ArkOS e similares: `/roms/ports/PortMaster/config/` (ou `/roms/tools/PortMaster/config/`)
  - ROCKNIX, muOS, Knulli: `.local/share/PortMaster/config/`
  
  Na próxima abertura o PortMaster lista e instala estes ports como se fossem do catálogo oficial.
- **Release rolante [`ports-latest`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/ports-latest):** sempre a versão mais nova de cada port com nome fixo `<port>.zip`, mais `ports.json` e `images.zip` (catálogo PortMasterV3). As releases versionadas `<jogo>-vX.Y.Z` continuam existindo para histórico.

Website with covers, filters and downloads; drop `040_nextos.source.json` into `PortMaster/config/` to browse and install these ports inside the PortMaster app; `ports-latest` always carries the newest `<port>.zip` of every port plus the PortMasterV3 catalog.

## 📥 Instalação / Install

1. Baixe o `.zip` do jogo na release indicada na tabela e confira o `.sha256`.
2. Copie o conteúdo para a pasta de ports do aparelho (`ports/` no PortMaster/ArkOS, `roms/ports` no NextOS).
3. Coloque o APK/XAPK (ou IPA/dump) **original e completo** do jogo onde o `INSTALLATION.md` da pasta do jogo indicar.
4. Abra o port pelo menu. A primeira abertura extrai e valida os dados; as seguintes vão direto ao jogo.
5. Para sair com segurança: `SELECT + START`.

Cada pasta tem um `README.md` com controles e requisitos e, quando necessário, um `INSTALLATION.md` detalhado.

Download the game's `.zip` from the release in the table, verify the `.sha256`, copy it to
the device's ports folder, place your own complete APK/XAPK (or IPA/dump) where the game's
`INSTALLATION.md` says, and launch from the menu. `SELECT + START` exits safely.

## 🤖 Ports Android

| Jogo | Pasta | Última release | Versões | Arquitetura | Sistemas |
|---|---|---|---|---|---|
| **Angry Birds Classic** | [`angrybirds`](ports-android/angrybirds/) | [`angrybirds-v1.1.9`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/angrybirds-v1.1.9) | 8 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Beach Buggy Racing + Beach Buggy Racing 2** | [`beachbuggy`](ports-android/beachbuggy/) | [`beachbuggy-v1.1.2-bbracing2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/beachbuggy-v1.1.2-bbracing2) | 4 | AArch64 | NextOS, ArkOS / R36S |
| **Blossom Tales: The Sleeping King** | [`blossomtales`](ports-android/blossomtales/) | [`blossomtales-v1.4.5`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/blossomtales-v1.4.5) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Bomb Chicken + Gunbrick Reloaded** | [`bombchicken-gunbrick`](ports-android/bombchicken-gunbrick/) | [`bombchicken-v1.1.7`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/bombchicken-v1.1.7) | 6 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Castle of Illusion Starring Mickey Mouse** | [`castleofillusion`](ports-android/castleofillusion/) | [`castleofillusion-v1.0.1`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/castleofillusion-v1.0.1) | 1 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Chrono Trigger** | [`chrono`](ports-android/chrono/) | [`chrono-v1.1.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/chrono-v1.1.2) | 11 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Dead Trigger** | [`deadtrigger`](ports-android/deadtrigger/) | [`deadtrigger-v1.1.1`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/deadtrigger-v1.1.1) | 9 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Door Kickers: Action Squad** | [`actionsquad`](ports-android/actionsquad/) | [`actionsquad-v1.0.5`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/actionsquad-v1.0.5) | 8 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Final Fantasy IV** | [`ff4`](ports-android/ff4/) | [`ff4-1.0.4_ff4a-1.0.6`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/ff4-1.0.4_ff4a-1.0.6) | 1 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |
| **Forager Nuclear** | [`forager`](ports-android/forager/) | [`forager-v1.0.4`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/forager-v1.0.4) | 5 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Freedom Planet 2** | [`fp2`](ports-android/fp2/) | [`fp2-v1.1.5`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/fp2-v1.1.5) | 3 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Geometry Dash + Geometry Dash SubZero** | [`geometrydash`](ports-android/geometrydash/) | [`gdsubzero-v1.0.3`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/gdsubzero-v1.0.3) | 4 | AArch64 | NextOS, ArkOS / R36S |
| **Hitman GO** | [`hitmango`](ports-android/hitmango/) | [`hitmango-v1.2.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/hitmango-v1.2.2) | 5 | AArch64 | NextOS, ArkOS / R36S |
| **Horizon Chase** | [`horizonchase`](ports-android/horizonchase/) | [`horizonchase-v1.2.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/horizonchase-v1.2.2) | 10 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |
| **Huntdown** | [`huntdown`](ports-android/huntdown/) | [`huntdown-v1.0.7`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/huntdown-v1.0.7) | 3 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Magic Rampage** | [`magicrampage`](ports-android/magicrampage/) | [`magicrampage-v1.1.9`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/magicrampage-v1.1.9) | 11 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Merchant of the Skies** | [`merchantskies`](ports-android/merchantskies/) | [`merchantskies-v1.0.0`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/merchantskies-v1.0.0) | 1 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Nameless Cat** | [`namelesscat`](ports-android/namelesscat/) | [`namelesscat-v1.2.8`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/namelesscat-v1.2.8) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Oceanhorn: Chronos Dungeon 4.0b54** | [`oceanhorn`](ports-android/oceanhorn/) | [`oceanhorn-v2.0.1`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/oceanhorn-v2.0.1) | 9 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Off The Road** | [`offtheroad`](ports-android/offtheroad/) | [`offtheroad-v1.0.5`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/offtheroad-v1.0.5) | 4 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |
| **Party Hard GO** | [`partyhard`](ports-android/partyhard/) | [`partyhard-v1.0.8-rc1`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/partyhard-v1.0.8-rc1) | 7 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Prizefighters 2 v1.09.3** | [`prizefighters2`](ports-android/prizefighters2/) | [`prizefighters2-v1.0.3`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/prizefighters2-v1.0.3) | 4 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster, muOS |
| **Retro City Rampage DX** | [`rcrdx`](ports-android/rcrdx/) | [`rcrdx-v1.0.0`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/rcrdx-v1.0.0) | 1 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Sally Face** | [`sallyface`](ports-android/sallyface/) | [`sallyface-v1.1.4`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sallyface-v1.1.4) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **ScourgeBringer 1.61.x** | [`scourgebringer`](ports-android/scourgebringer/) | [`scourgebringer-v1.0.0`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/scourgebringer-v1.0.0) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Skateboard Party 3** | [`skate3`](ports-android/skate3/) | [`skate3-v1.0.0`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/skate3-v1.0.0) | 1 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Sonic The Hedgehog 4: Episode II** | [`sonic4ep2`](ports-android/sonic4ep2/) | [`sonic4ep2-v6`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sonic4ep2-v6) | 1 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Star Wars: Knights of the Old Republic** | [`kotor`](ports-android/kotor/) | [`kotor-v1.1.7`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/kotor-v1.1.7) | 3 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster, muOS |
| **Stardew Valley** | [`stardewvalley`](ports-android/stardewvalley/) | [`stardewvalley-v1.1.8`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/stardewvalley-v1.1.8) | 10 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Streets of Rage 4** | [`sor4`](ports-android/sor4/) | [`sor4-v2.0.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sor4-v2.0.2) | 3 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Summertime Saga Preview** | [`summertimesaga`](ports-android/summertimesaga/) | [`summertimesaga-v1.1.1`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/summertimesaga-v1.1.1) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |
| **Suzy Cube** | [`suzycube`](ports-android/suzycube/) | [`suzycube-v1.1.12`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/suzycube-v1.1.12) | 11 | AArch64 | NextOS, ArkOS / R36S, PortMaster |
| **Swordigo** | [`swordigo`](ports-android/swordigo/) | [`swordigo-v1.0.15`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/swordigo-v1.0.15) | 2 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Tearscape** | [`tearscape`](ports-android/tearscape/) | [`tearscape-v0.2.18`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tearscape-v0.2.18) | 3 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Terraria Android 1.4.5&#46;6.4 / 1.4.5&#46;8.5** | [`terraria`](ports-android/terraria/) | [`terraria-v2.0.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v2.0.2) | 11 | AArch64 | NextOS, ArkOS / R36S, PortMaster, muOS |
| **The Amazing Spider-Man 2 1.2.7d /** | [`tasm2`](ports-android/tasm2/) | [`tasm2-v1.1.9`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tasm2-v1.1.9) | 7 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX, muOS |
| **Tightrope Theatre 1.0.5-test.1** | [`tightrope`](ports-android/tightrope/) | [`tightrope-v1.0.8`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/tightrope-v1.0.8) | 6 | AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |
| **Titan Souls** | [`titansouls`](ports-android/titansouls/) | [`titansouls-v1.0.7`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/titansouls-v1.0.7) | 9 | ARMv7 + AArch64 | NextOS, ArkOS / R36S, PortMaster, ROCKNIX |

## 🍎 Ports iOS

Em breve / coming soon. Pasta: [`ports-ios/`](ports-ios/)

## 🎮 Ports Switch

Em breve / coming soon. Pasta: [`ports-switch/`](ports-switch/)

## 🟣 Ports GameCube

Em breve / coming soon. Pasta: [`ports-gamecube/`](ports-gamecube/)

## 🛠️ Ferramentas / Tools

| Ferramenta | Pasta | Última release | Versões | Arquitetura | Sistemas |
|---|---|---|---|---|---|
| **NXExtract** | [`nxextract`](tools/nxextract/) | [`nxextract-v1.1.2`](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/nxextract-v1.1.2) | 3 | AArch64 | NextOS, ArkOS / R36S |

## 🧭 Legenda / Legend

- **Arquitetura**: `AArch64` = pacote 64-bit; `ARMv7 + AArch64` = o pacote também atende firmwares 32-bit (ARMHF).
- **Sistemas**: onde o port foi validado. `NextOS` inclui os aparelhos Amlogic Mali-450 (NextOS Retro Elite); `ArkOS / R36S` cobre os RK3326/RK3566 e derivados (dArkOS, AmberELEC); `PortMaster` indica pacote compatível com HarbourMaster.
- **Versões**: quantidade de releases publicadas para o jogo. Prefira sempre a mais recente.

## 🐞 Problemas / Issues

Abra uma [issue](https://github.com/NextOs-Ports/nextos-universal-ports/issues/new/choose) informando aparelho, firmware, jogo, versão do port e o log gerado na pasta do port. Pedidos de jogos são bem-vindos na mesma página.

## ⚖️ Aviso legal / Legal notice

Os pacotes contêm apenas código de compatibilidade e documentação. **Nenhum jogo, dado de
jogo, biblioteca proprietária ou asset é distribuído.** O usuário precisa possuir a cópia
legítima do jogo. Todas as marcas e jogos pertencem aos seus respectivos detentores.
Detentores de direitos que queiram falar conosco: abram uma issue ou contatem pelo Discord.

Packages contain compatibility code and documentation only. **No game, game data,
proprietary library or asset is distributed.** Users must own a legitimate copy of the
game. All trademarks and games belong to their respective owners. Rights holders: please
open an issue or reach us on Discord.

---

<div align="center">

38 jogos · 195 releases · [NextOs-Ports](https://github.com/NextOs-Ports)

</div>
