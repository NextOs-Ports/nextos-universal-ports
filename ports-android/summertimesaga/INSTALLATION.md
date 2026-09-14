# Installation / Instalação

**Language / Idioma:** [English](#english) · [Português](#português)

## English

### 1. What you need

- **`summertimesaga.zip`** from the
  [latest release](https://github.com/NextOs-Ports/summertimesaga-nextos/releases/latest)
  (never GitHub's "Code → Download ZIP" — that is source only).
- The **official free Android Preview APK of Summertime Saga**, provided by
  Kompas Productions on the game's official website / official channels.
  The game is free — support the developers there.
  - Accepted builds: **Preview (Tech-Update) generation 21 or newer**
    (reference payload `21.0.0-wip.7722`, Ren'Py 8.5.3), containing the
    AArch64 (`arm64-v8a`) `librenpython.so`.
  - Accepted formats: `.apk`, `.apks`, `.apkm`, `.xapk` (split bundles fine).
    The filename does not matter — NXExtract identifies content, not names.
  - The legacy 0.20.x builds use a different engine and are **not** supported.
- Free space: the APK is ~1.4 GB and the installed game ~2.8 GB, so keep
  **~4.5 GB free** during the first run (the source APK can be deleted or
  kept afterwards; it is never modified).

### 2. Install

1. Extract `summertimesaga.zip` into your firmware's ports directory
   (ArkOS: `/roms/ports/`; NextOS/EmuELEC: `/storage/roms/ports/`).
   You get `Summertime Saga.sh` plus a `summertimesaga/` folder.
2. Copy the official APK into **`summertimesaga/gamedata/`**.
3. Launch **Summertime Saga** from the Ports menu. The first run shows the
   NXExtract screen while it verifies, extracts and prepares everything
   transactionally (20-60 min on SD cards), then the game starts.
   Every later launch validates instantly and boots straight to the title.

### 3. Controls

| Control | Action |
|---|---|
| Left stick / D-pad | Move the pointer |
| Bottom face button | Click / confirm |
| Right face button | Universal back (closes phone, backpack, map, dialogs) |
| Left face button | Keyboard Enter — submits text screens (character name) |
| Top face button | Phone |
| L1 / R1 | Backpack / Town map |
| L2 / R2 | Save screen / Quick save |
| Select + Start | Clean exit |

Shortcuts are tap macros in `summertimesaga/summertimesaga.gptk`
(`button = tap:X,Y`, normalized to the game's 16:9 area) — edit or add your
own without rebuilding.

### 4. Updating to a newer Preview build

```sh
./summertimesaga/tools/update-game-data.sh /path/to/new-preview.apk
```

The old installation stays live until the new one is fully validated.

## Português

### 1. O que você precisa

- **`summertimesaga.zip`** da
  [última release](https://github.com/NextOs-Ports/summertimesaga-nextos/releases/latest)
  (nunca o "Code → Download ZIP" do GitHub — aquilo é só código).
- O **APK Preview Android oficial e gratuito do Summertime Saga**,
  distribuído pela Kompas Productions no site/canais oficiais do jogo.
  O jogo é gratuito — apoie os desenvolvedores por lá.
  - Builds aceitas: **Preview (Tech-Update) geração 21 ou mais nova**
    (referência `21.0.0-wip.7722`, Ren'Py 8.5.3), contendo a
    `librenpython.so` AArch64 (`arm64-v8a`).
  - Formatos aceitos: `.apk`, `.apks`, `.apkm`, `.xapk` (bundles com splits
    funcionam). O nome do arquivo não importa — o NXExtract identifica pelo
    conteúdo.
  - As versões antigas 0.20.x usam outra engine e **não** são suportadas.
- Espaço livre: o APK tem ~1,4 GB e o jogo instalado ~2,8 GB; deixe
  **~4,5 GB livres** na primeira execução (depois o APK pode ser apagado ou
  guardado; ele nunca é modificado).

### 2. Instalar

1. Extraia o `summertimesaga.zip` na pasta de ports do sistema
   (ArkOS: `/roms/ports/`; NextOS/EmuELEC: `/storage/roms/ports/`).
   Ficam `Summertime Saga.sh` e a pasta `summertimesaga/`.
2. Copie o APK oficial para **`summertimesaga/gamedata/`**.
3. Abra **Summertime Saga** no menu de Ports. A primeira execução mostra a
   tela do NXExtract verificando, extraindo e preparando tudo de forma
   transacional (20-60 min em cartão SD) e o jogo abre em seguida.
   As aberturas seguintes validam na hora e vão direto para o título.

### 3. Controles

| Controle | Ação |
|---|---|
| Analógico esquerdo / Direcional | mover o ponteiro |
| Botão inferior | clicar / confirmar |
| Botão direito | VOLTAR universal (fecha telefone, mochila, mapa, diálogos) |
| Botão esquerdo | Enter de teclado — submete telas de texto (nome) |
| Botão de cima | Telefone |
| L1 / R1 | Mochila / Mapa da cidade |
| L2 / R2 | Tela de saves / Quick save |
| Select + Start | sair de forma limpa |

Os atalhos são macros de toque em `summertimesaga/summertimesaga.gptk`
(`botao = tap:X,Y`, normalizado na área 16:9 do jogo) — edite ou crie novos
sem recompilar.

### 4. Atualizar para uma Preview mais nova

```sh
./summertimesaga/tools/update-game-data.sh /caminho/da/nova-preview.apk
```

A instalação antiga continua válida até a nova ser totalmente validada.
