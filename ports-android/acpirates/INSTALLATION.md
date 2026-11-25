# Assassin's Creed Pirates — Installation / Instalação

**English below. / Português primeiro.**

---

## Português

Este pacote **não contém o jogo**. Ele traz somente o runtime que faz o jogo
rodar no seu aparelho. Você precisa fornecer a sua própria cópia legal do
aplicativo Android.

### O que você precisa

O pacote Android do jogo **e** o arquivo de expansão (`.obb`) dele, num
`.xapk`/`.apkm`/`.apks` ou como `.apk` + `.obb` soltos:

| Item | Valor da cópia de referência |
|---|---|
| Nome | Assassin's Creed Pirates |
| Versão | 2.9.1 (versionCode 253) |
| Pacote | `com.ubisoft.assassin.pirates` |
| ABI | `armeabi-v7a` |
| XAPK | 855.570.895 bytes — SHA-256 `22dc25fb7c923a8845f3cc706ace3f68ed353985e5aa52cce0c5c55958415ada` |
| APK | 36.500.772 bytes — SHA-256 `49ac6c666f1c8482d09af0a8c33c2eadcc3c64e36173c416f7669de36d76d838` |
| Expansão (`main.253.com.ubisoft.assassin.pirates.obb`) | 817.249.909 bytes — SHA-256 `0bd4bb085dd8b6fbd37d31c9adb55a4ad891f9a91ee49454759497127f6cd704` |

Esses números descrevem a cópia **de referência**, usada para desenvolver e
provar o port. O que a instalação confere é o conteúdo: a família do pacote, a
biblioteca `libSparkApp.so` da 2.9.1 e a expansão dela.

### Como instalar

1. Copie o XAPK (ou o APK e a expansão) para `acpirates/gamedata/`, a pasta de
   dados do dono dentro da pasta do port.
2. Abra o port pelo menu do seu aparelho.
3. Na primeira execução o instalador aparece na tela, confere o pacote e
   extrai os dados (~840 MB). Isso acontece **uma vez só**.
4. Ao terminar, o jogo abre. O vídeo de abertura não é exibido neste port: o port pula essa tela sozinho.

A partir da segunda execução o instalador não roda de novo: um marcador
registra que os dados já estão no lugar. Os dados extraídos ficam dentro da
pasta do port e **não** são publicados em lugar nenhum. O XAPK pode ser
apagado de `gamedata/` depois da instalação para liberar espaço.

### Controles

O jogo é **só de toque**: o port desenha uma seta e transforma os botões em
toques nos controles de tela do próprio jogo.

| Botão | Ação |
|---|---|
| Analógico esquerdo **ou** direito | Move a seta |
| A | Encosta o dedo onde a seta está (segurar = arrastar; segurar ~4 s e soltar = salva de canhões) |
| R1 / L1 (segurado) | Leme para a direita / esquerda |
| R2 / L2 | Aumentar velocidade / reduzir (âncora) |
| X ou D-pad esquerda | Esquiva para a esquerda |
| B ou D-pad direita | Esquiva para a direita |
| Y ou D-pad baixo | Botão do meio da batalha (arma / spider shot) |
| D-pad cima | Sobe a seta |
| R3 / L3 (clique do analógico) | Pinça: fecha (afasta a câmera) / abre (aproxima) |
| START | Abre / fecha a pausa |
| SELECT | Voltar |
| **SELECT + START** | **Sai do jogo, salvando antes** |

Os botões seguem a posição Xbox do seu controle (o `A` é o botão de baixo).
Tudo pode ser remapeado no `NEXTOSCONTROLLERS.gptk`.

### Arquivos seus (nunca sobrescritos)

- `acpirates/NEXTOSSETTINGS.txt` — ajustes tipados, inclusive
  `video.aspect=auto|engine|preserve|stretch` (`auto` = tela cheia em todo
  aparelho; `preserve` = 16:9 centralizado com barras num painel 4:3).
- `acpirates/port-env.sh` — hook de ambiente do dono (ex.:
  `export NX_VIDEO_ASPECT=preserve`). A lógica do port fica no
  `adapter-env.sh` selado; não edite esse.
- `acpirates/NEXTOSCONTROLLERS.gptk` — mapa de controles **editável**
  (`NEXTOS_CONTROLLERS/4`, posicional Xbox): troque as ações à direita para
  remapear; o port carrega a sua cópia em runtime.

Semeados uma vez a partir de `acpirates/defaults/`; uma atualização nunca os
sobrescreve. Para voltar ao padrão, apague o arquivo e abra o jogo.

### Espaço em disco

Reserve cerca de **1,2 GB** livres na instalação (os dados extraídos ocupam
~840 MB e a extração precisa de folga). Depois, o XAPK pode ser apagado.

### Saves

Ficam em `acpirates/home/` e sobrevivem a atualizações do port.

### Logs

`acpirates/log.txt` (execução), `acpirates/nxextract.log` (instalação). Cite-os
em qualquer relato.

### NextOS / EmuELEC — a entrada do frontend

O EmulationStation dessas imagens lista somente `/storage/roms/ports_scripts/*.sh`.
O instalador do NextOS cria essa entrada sozinho; extraindo o ZIP na mão em
`roms/ports/`, copie o launcher:
`cp "ports/Assassins Creed Pirates.sh" ports_scripts/`.
No R36S/ArkOS/dArkOS e no muOS o frontend lê `ports/` diretamente.

---

## English

This package **does not contain the game**. It only provides the runtime that
makes the game run on your device. You must supply your own legal copy of the
Android application.

### What you need

The game's Android package **and** its expansion file (`.obb`), inside an
`.xapk`/`.apkm`/`.apks` or as a loose `.apk` + `.obb`:

| Item | Reference copy value |
|---|---|
| Name | Assassin's Creed Pirates |
| Version | 2.9.1 (versionCode 253) |
| Package | `com.ubisoft.assassin.pirates` |
| ABI | `armeabi-v7a` |
| XAPK | 855,570,895 bytes — SHA-256 `22dc25fb7c923a8845f3cc706ace3f68ed353985e5aa52cce0c5c55958415ada` |
| APK | 36,500,772 bytes — SHA-256 `49ac6c666f1c8482d09af0a8c33c2eadcc3c64e36173c416f7669de36d76d838` |
| Expansion (`main.253.com.ubisoft.assassin.pirates.obb`) | 817,249,909 bytes — SHA-256 `0bd4bb085dd8b6fbd37d31c9adb55a4ad891f9a91ee49454759497127f6cd704` |

These values describe the **reference** copy used to develop and prove the
port. Installation checks content: the package family, the 2.9.1
`libSparkApp.so` and its expansion file.

### How to install

1. Copy the XAPK (or the APK and the expansion file) into
   `acpirates/gamedata/`, the owner-data folder inside the port folder.
2. Launch the port from your device menu.
3. On first run the installer appears on screen, verifies the package and
   extracts the data (~840 MB). This happens **only once**.
4. When it finishes, the game starts. The opening video is not shown by this port: it skips that screen on its own.

From the second run onwards the installer does not run again. Extracted data
stays inside the port folder and is **never** published anywhere. The XAPK may
be deleted from `gamedata/` after installation to free space.

### Controls

The game is **touch-only**: the port draws a pointer and turns buttons into
taps on the game's own on-screen controls.

| Button | Action |
|---|---|
| Left **or** right stick | Move the pointer |
| A | Touch where the pointer is (hold = drag; hold ~4 s and release = cannon volley) |
| R1 / L1 (held) | Helm right / left |
| R2 / L2 | Speed up / slow down (anchor) |
| X or D-pad left | Dodge left |
| B or D-pad right | Dodge right |
| Y or D-pad down | Middle battle button (weapon / spider shot) |
| D-pad up | Pointer up |
| R3 / L3 (stick click) | Pinch: in (zoom out) / out (zoom in) |
| START | Open / close pause |
| SELECT | Back |
| **SELECT + START** | **Quit the game, saving first** |

Buttons follow your controller's Xbox positions (`A` is the bottom button).
Everything can be remapped in `NEXTOSCONTROLLERS.gptk`.

### Your files (never overwritten)

- `acpirates/NEXTOSSETTINGS.txt` — typed settings, including
  `video.aspect=auto|engine|preserve|stretch` (`auto` = full screen on every
  device; `preserve` = centered 16:9 with bars on a 4:3 panel).
- `acpirates/port-env.sh` — owner environment hook (e.g.
  `export NX_VIDEO_ASPECT=preserve`). The port's logic lives in the sealed
  `adapter-env.sh`; do not edit that one.
- `acpirates/NEXTOSCONTROLLERS.gptk` — **editable** controls map
  (`NEXTOS_CONTROLLERS/4`, Xbox positional): change the actions on the right to
  remap; the port loads your copy at runtime.

Seeded once from `acpirates/defaults/`; an update never overwrites them. To go
back to the default, delete the file and launch the game.

### Disk space

Keep about **1.2 GB** free during installation (extracted data takes ~840 MB
and extraction needs headroom). The XAPK can be deleted afterwards.

### Saves

They live in `acpirates/home/` and survive port updates.

### Logs

`acpirates/log.txt` (runtime), `acpirates/nxextract.log` (installation). Quote
them in any report.

### NextOS / EmuELEC — the frontend entry

EmulationStation on those images only lists `/storage/roms/ports_scripts/*.sh`.
The NextOS installer creates that entry by itself; when extracting the ZIP by
hand into `roms/ports/`, copy the launcher:
`cp "ports/Assassins Creed Pirates.sh" ports_scripts/`.
On R36S/ArkOS/dArkOS and muOS the frontend reads `ports/` directly.
