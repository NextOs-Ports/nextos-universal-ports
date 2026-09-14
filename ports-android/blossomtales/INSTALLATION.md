# Blossom Tales: The Sleeping King — Installation / Instalação

**English below. / Português primeiro.**

---

## Português

Este pacote **não contém o jogo**. Ele traz somente o runtime que faz o jogo
rodar no seu aparelho. Você precisa fornecer a sua própria cópia legal do
aplicativo Android — a mesma que você comprou.

### O que você precisa

Um pacote Android do jogo, no formato `.apk`, `.apkm`, `.apks`, `.xapk` ou o
`.zip` exportado pelo seu instalador de splits, contendo:

| Item | Valor da cópia de referência |
|---|---|
| Nome | Blossom Tales: The Sleeping King |
| Versão | 1.0.0 |
| Pacote | `com.FDGEntertainment.BlossomTales.gp` |
| versionCode | 25 |
| ABI | `arm64-v8a` |
| Tamanho | 99.073.099 bytes |
| SHA-256 | `2c9c6756aea948a3aef2313082d20b1c584c85883551bd74cae996140ebf32aa` |

Esses números descrevem a cópia **de referência**, usada para desenvolver e
provar o port. Eles **não** são uma exigência: a instalação é decidida por
capacidade — família do pacote, ABI, membros obrigatórios e limites
estruturais. Outra build do mesmo jogo, com o mesmo formato, instala do mesmo
jeito.

### Como instalar

1. Copie o pacote do jogo para `blossomtales/gamedata/`, a pasta de dados do
   dono que este pacote cria dentro da pasta do port.
2. Abra o port pelo menu do seu aparelho.
3. Na primeira execução, o instalador aparece na tela, confere o pacote e
   extrai os dados. Isso acontece **uma vez só**.
4. Ao terminar, o jogo abre.

A partir da segunda execução o instalador não roda de novo: um marcador
registra que os dados já estão no lugar. Os dados extraídos ficam dentro da
pasta do port e **não** são publicados em lugar nenhum.

### Controles

Na versão 1.4.5, o mapping permanece sob autoridade da SDL do próprio sistema
quando o provider não puder ser provado. Isso evita o sintoma de o jogo detectar
um controle, mas ignorar A, D-pad e `SELECT+START`.

| Botão | No jogo | Nos menus |
|---|---|---|
| A | Ataque | Confirmar |
| B | Usar item | Voltar |
| X | Usar ferramenta | Usar ferramenta |
| Y | Menu | Menu |
| D-pad / Analógico esquerdo | Mover | Navegar |
| L1 / R1 | Item anterior / próximo | Item anterior / próximo |
| L3 / R3 | Diário / Mapa | Diário / Mapa |
| START | Pausa | Pausa |
| **SELECT + START** | **Sai do jogo, salvando antes** | idem |

O layout dos botões de face segue o mapeamento do seu sistema. Se o seu
aparelho usa o layout retrô, o botão que confirma é o que o seu sistema chama
de A — o port não força posição de botão.

### Arquivos seus (nunca sobrescritos)

- `blossomtales/NEXTOSCONTROLLERS.gptk` — mapa de controles (`NEXTOS_CONTROLLERS/4`,
  padrão Xbox posicional: A = sul, B = leste, X = oeste, Y = norte).
- `blossomtales/NEXTOSSETTINGS.txt` — ajustes tipados, inclusive
  `video.aspect=auto|engine|preserve|stretch` (painel 720×720: `preserve` =
  imagem 16:9 centralizada com barras; `stretch` = padrão, preenche esticando).
- `blossomtales/port-env.sh` — hook de ambiente do dono (`export NX_VIDEO_ASPECT=...`
  também vale). A lógica do port fica no `adapter-env.sh` selado; não edite esse.

Semeados uma vez a partir de `blossomtales/defaults/`; uma atualização nunca os
sobrescreve (default novo aparece como `.new`). Para voltar ao padrão, apague o
arquivo e abra o jogo.

### Espaço em disco

Reserve cerca de **400 MB** livres: os dados extraídos ocupam ~181 MB e a
extração precisa de folga para trabalhar com segurança.

---

## English

This package **does not contain the game**. It only provides the runtime that
makes the game run on your device. You must supply your own legal copy of the
Android application — the one you bought.

### What you need

An Android package of the game, as `.apk`, `.apkm`, `.apks`, `.xapk` or the
`.zip` exported by your split installer, containing:

| Item | Reference copy value |
|---|---|
| Name | Blossom Tales: The Sleeping King |
| Version | 1.0.0 |
| Package | `com.FDGEntertainment.BlossomTales.gp` |
| versionCode | 25 |
| ABI | `arm64-v8a` |
| Size | 99,073,099 bytes |
| SHA-256 | `2c9c6756aea948a3aef2313082d20b1c584c85883551bd74cae996140ebf32aa` |

These values describe the **reference** copy used to develop and prove the
port. They are **not** a requirement: installation is decided by capability —
package family, ABI, required members and structural floors. Another build of
the same game with the same layout installs the same way.

### How to install

1. Copy the game package into `blossomtales/gamedata/`, the owner-data folder
   this package creates inside the port folder.
2. Launch the port from your device menu.
3. On first run the installer appears on screen, verifies the package and
   extracts the data. This happens **only once**.
4. When it finishes, the game starts.

From the second run onwards the installer does not run again: a marker records
that the data is already in place. Extracted data stays inside the port folder
and is **never** published anywhere.

### Controls

In version 1.4.5, the mapping remains under the system SDL's own authority when
its provider cannot be proven. This prevents the game from detecting a
controller while ignoring A, the D-pad and `SELECT+START`.

| Button | In game | In menus |
|---|---|---|
| A | Attack | Confirm |
| B | Use item | Back |
| X | Use tool | Use tool |
| Y | Menu | Menu |
| D-pad / Left stick | Move | Navigate |
| L1 / R1 | Previous / next item | Previous / next item |
| L3 / R3 | Journal / Map | Journal / Map |
| START | Pause | Pause |
| **SELECT + START** | **Quits the game, saving first** | same |

Face button layout follows your system's mapping. If your device uses the retro
layout, the confirm button is the one your system calls A — the port never
forces a button position.

### Your files (never overwritten)

- `blossomtales/NEXTOSCONTROLLERS.gptk` — controls map (`NEXTOS_CONTROLLERS/4`,
  positional Xbox standard: A = south, B = east, X = west, Y = north).
- `blossomtales/NEXTOSSETTINGS.txt` — typed settings, including
  `video.aspect=auto|engine|preserve|stretch` (720×720 panel: `preserve` =
  16:9 image centered with bars; `stretch` = default, fills by stretching).
- `blossomtales/port-env.sh` — the owner's environment hook (`export
  NX_VIDEO_ASPECT=...` works too). The port's own logic lives in the sealed
  `adapter-env.sh`; do not edit that.

Seeded once from `blossomtales/defaults/`; an update never overwrites them (a
new default appears as `.new`). To reset, delete the file and launch the game.

### Disk space

Keep about **400 MB** free: extracted data is ~181 MB and the extraction needs
headroom to work safely.
