# Terraria — instalação / installation (BYO-data)

**Idioma / Language:** [Português](#português) · [English](#english)

Este pacote contém somente o port. Os dados do jogo não são distribuídos.
This package contains only the port. Game data is not distributed.

## Português

### 1. Instale o ZIP

Instale `terraria.zip` pelo PortMaster ou extraia seu conteúdo diretamente na
pasta de ports do aparelho. A estrutura inicial precisa ser exatamente:

```text
ports/
├── Terraria.sh
└── terraria/
    ├── terraria-nextos
    ├── nxsplash-nextos
    ├── nxport.json
    ├── extractor.json
    ├── nxextract/
    └── gamedata/
```

Em firmwares que separam scripts e dados, o instalador do PortMaster coloca
`Terraria.sh` na pasta de scripts e `terraria/` na pasta normal de ports. Não
crie um nível extra chamado `terraria.zip/`.

### 2. Traga seus dados legais do jogo

Copie o APK/APKM/APKS/XAPK da sua própria cópia para:

```text
ports/terraria/gamedata/
```

Identidade técnica da cópia de referência validada:

- jogo: **Terraria Android 1.4.5&#46;6.4** (versionCode de referência `301544`);
- package ID do container de referência: `com.and.games505.Terraria`;
- package ID histórico também aceito com o mesmo payload validado:
  `com.and.games505.TerrariaPaid`;
- ABI: **AArch64** (`arm64-v8a`);
- container de referência: **180.308.735 bytes**;
- SHA-256 do container de referência:
  `74dde861c154e6de3aefec5847c9f9905a9a27809575d67deaf6394376ba7044`.

Builds validados em aparelho (extração + abertura), além da referência:

- **1.4.5&#46;6.4** (versionCode `301544`) — build de referência histórica;
- **1.4.5&#46;8.5** (versionCode `301709`) — validado em 08/09/2026 no NextOS
  Retro Elite (Amlogic, Mali-450) e no R36S/dArkOS: extração aceita como build
  compatível desconhecido, jogo abre nos menus, cria personagem e gera/salva
  mundo Large. Container testado: `.apkm` de **193.727.472 bytes**, SHA-256
  `156777863633c4d07ff0b575e4b398a27dbfd07baebd0cdf61fc18d4f7fdda52`.

O nome, a assinatura e o empacotamento externo não importam. APK único, conjunto
de splits, APKM, APKS, XAPK e reempacotamento legítimo são aceitos quando
entregam o mesmo jogo compatível. O tamanho, SHA, versionCode e versão acima
identificam somente a cópia testada e **não são travas de compatibilidade**. O
NXExtract 1.2.18 valida a família de package ID, ABI, estrutura do conjunto de
APKs, formato Unity/IL2CPP e coerência dos payloads críticos. Outro jogo, ABI
errada, payload misturado ou build tecnicamente incompatível falha antes de
substituir a instalação.

### 3. Primeira abertura e atualização

Abra `Terraria`. Na primeira execução, a interface gráfica canônica do
NXExtract valida e instala os dados transacionalmente. Depois aparece por cinco
segundos a tela bilíngue `NEXT OS` / `RETRO ELITE`, e só então o jogo inicia.
Não desligue o aparelho durante a extração.

Uma atualização do port preserva `gamedata/`, `userdata/`, `Players/` e
`Worlds/`. Antes de atualizar, saia do jogo e faça backup de `Players/` e
`Worlds/`. Extraia o ZIP novo sobre a instalação anterior; não copie bibliotecas
extraídas manualmente.

`SELECT + START` solicita o mesmo ciclo de foco, pausa e encerramento usado pelo
Android. Os controles de menu e gameplay seguem o perfil Xbox/InControl nativo
do Terraria. Na entrada de nomes, use o teclado virtual exibido pelo port.

## English

### 1. Install the ZIP

Install `terraria.zip` through PortMaster, or unpack it directly into the
device's ports folder. The initial layout must be exactly:

```text
ports/
├── Terraria.sh
└── terraria/
    ├── terraria-nextos
    ├── nxsplash-nextos
    ├── nxport.json
    ├── extractor.json
    ├── nxextract/
    └── gamedata/
```

On firmware layouts that separate scripts from data, the PortMaster installer
places `Terraria.sh` in the scripts folder and `terraria/` in the regular ports
folder. Do not create an extra `terraria.zip/` directory level.

### 2. Bring your lawful game data

Copy the APK/APKM/APKS/XAPK from your own copy to:

```text
ports/terraria/gamedata/
```

Technical identity of the validated reference copy:

- game: **Terraria Android 1.4.5&#46;6.4** (reference versionCode `301544`);
- reference-container package ID: `com.and.games505.Terraria`;
- historical package ID also accepted with the same validated payload:
  `com.and.games505.TerrariaPaid`;
- ABI: **AArch64** (`arm64-v8a`);
- reference container: **180,308,735 bytes**;
- reference container SHA-256:
  `74dde861c154e6de3aefec5847c9f9905a9a27809575d67deaf6394376ba7044`.

Builds verified on hardware (extraction + launch), besides the reference one:

- **1.4.5&#46;6.4** (versionCode `301544`) — historical reference build;
- **1.4.5&#46;8.5** (versionCode `301709`) — verified on 2026-09-08 on NextOS
  Retro Elite (Amlogic, Mali-450) and on the R36S/dArkOS: accepted as an
  unknown compatible build, reaches the menus, creates a character and
  generates/saves a Large world. Tested container: `.apkm` of **193,727,472
  bytes**, SHA-256
  `156777863633c4d07ff0b575e4b398a27dbfd07baebd0cdf61fc18d4f7fdda52`.

The filename, signature and outer packaging do not matter. Single APKs, split
sets, APKM, APKS, XAPK and legitimate repacks are accepted when they carry the
same compatible game. The size, hash, versionCode and version above identify
only the tested copy and are **not compatibility gates**. NXExtract 1.2.18
validates the package-ID family, ABI, APK-set structure, Unity/IL2CPP format and
critical-payload coherence. Another game, wrong ABI, mixed payload or a
technically incompatible build fails before replacing the installed data.

### 3. First launch and updates

Launch `Terraria`. On first run, the canonical graphical NXExtract interface
validates and installs the data transactionally. The bilingual `NEXT OS` /
`RETRO ELITE` screen then runs for five seconds before the game starts. Do not
power off the device during extraction.

Port updates preserve `gamedata/`, `userdata/`, `Players/` and `Worlds/`. Before
updating, exit the game and back up `Players/` and `Worlds/`. Unpack the new ZIP
over the existing installation; do not copy extracted libraries manually.

`SELECT + START` requests the same focus-loss, pause and shutdown lifecycle used
on Android. Menus and gameplay use Terraria's native Xbox/InControl profile.
Use the port's on-screen keyboard for name entry.
