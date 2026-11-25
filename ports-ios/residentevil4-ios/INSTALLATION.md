# Resident Evil 4 Platinum (iOS) — Instalação / Installation

**Português primeiro. English below.**

---

## Português

Este pacote **não contém o jogo**. Ele traz somente o runtime que faz o
executável iOS original rodar no seu aparelho. Você precisa fornecer a sua
própria cópia legal do aplicativo — o `.ipa` que você possui.

### O que você precisa

O `.ipa` de iPhone/iPod do Resident Evil 4 Platinum (Mobile Edition), contendo:

| Item | Valor da cópia de referência |
|---|---|
| Nome | Resident Evil 4 Platinum |
| Versão | **1.04.10** |
| Bundle | `jp.co.capcom.res4` |
| ABI | ARMv7 (Mach-O de 32 bits) |
| Executável ARMv7 | 3.794.688 bytes — SHA-256 `84a2f3988d0780bf8a10048eb724bee832c296e1a914c748a64c105aef7c311b` |
| IPA de referência | 80.574.900 bytes — SHA-256 `81f4befd43e8af684dfa62e45a819be406229f30874eb20aa87153b8e1fc4b7c` |

O SHA e o tamanho do **IPA** descrevem a cópia de referência e **não** são
exigência (um repack muda o container). A identidade real é decidida pelo
bundle `jp.co.capcom.res4` e pelo **executável ARMv7 da versão 1.04.10**,
cuja identidade de código o instalador confere — variações legítimas de assinatura
são aceitas; código diferente ou ainda cifrado é recusado.

### Como instalar

1. Copie a pasta `residentevil4-ios/` e o `Resident Evil 4 Platinum.sh` para
   `ports/` (ou `roms/ports/`) do seu aparelho.
2. Ponha o SEU `.ipa` do Resident Evil 4 Platinum em `residentevil4-ios/gamedata/`.
3. Abra "Resident Evil 4 Platinum" pelo menu de Ports. Na primeira execução o port
   instala os dados do dono a partir do `.ipa` (executável + recursos),
   confere a identidade do executável e ajusta o aparelho. Isso acontece **uma vez só**;
   as aberturas seguintes vão direto ao jogo.
4. Sair: **SELECT + START**.

Os dados extraídos e o save ficam dentro da pasta do port e **não** são publicados.

### Controles

O jogo original é de toque: o port aperta os próprios botões da tela.

| Botão | Jogo | Menus e janelas |
|---|---|---|
| Analógico esquerdo | Andar (pad original) | — |
| Analógico direito ou esquerdo | — | Mover a seta (vale o mais inclinado) |
| R3 | Zoom da mira (quando o botão Scope aparece) | Tocar na seta; segure A ou R3 e mova qualquer analógico para arrastar (sliders, "→ Yes") |
| A | Ação contextual indicada na tela (itens, escadas, portas, chute, escapar) | Tocar na seta; nas janelas de evento mantém Próximo |
| B | Sair da mira | Voltar no inventário/Opções; Cancelar nas escolhas; alternativa ao A nos avisos |
| R1 ou R2 | Arma (segurar mira e atirar) | — |
| L1 ou L2 | Faca | — |
| L3 | Ordens para Ashley (quando oferecidas) | — |
| X | Sacudir para recarregar (o jogo decide a disponibilidade) | — |
| Y | Mapa/inventário (botão Status do HUD) | — |
| Start ou A durante um filme | Pular o filme | Pular o filme |
| Start | Pausa / Pular cena | — |
| SELECT + START | Sair | Sair |

A também aciona Ashley quando não há outra ação contextual oferecida. L3 permite
acioná-la diretamente. Nas escolhas de inventário, mova a seta com um analógico
e clique com A ou R3. A confirma os avisos com Próximo visível; B volta no inventário e em Opções, ou cancela a escolha.

O mapa padrão não editado da 1.0.3 é atualizado com backup. Mapas personalizados
são preservados: para ativar os novos botões, use `L3 = action:pad.l3` em `[base]`;
nos dois grupos `[trigger.left]` e `[trigger.right]`, use `mode = digital` e
`analog = null`. Defina `digital = action:pad.l1` no esquerdo e
`digital = action:pad.r1` no direito. Preserve as demais opções.

Remapeie editando `residentevil4-ios/NEXTOSCONTROLLERS.gptk` (grupos
`[base]`, `[stick.*]` e `[trigger.*]`). Enquadramento de tela: `NEXTOSSETTINGS.txt`
(`video.aspect=auto|engine|preserve|stretch`).

### Requisitos

Host AArch64 para a UI do instalador; o jogo é ARMHF (32 bits). Bibliotecas
ARMHF do sistema (SDL2, EGL/GLES do fabricante, libz) e um kernel que permita
`vm.mmap_min_addr` baixo — o port ajusta para 4096 na abertura (root direto,
ou `sudo` em ArkOS/dArkOS/ROCKNIX/muOS). `libcairo.so.2`, `libpixman-1.so.0`,
`libmpg123.so.0` e um FFmpeg mínimo (filmes) já vêm em `residentevil4-ios/libs/`.

---

## English

This package **does not contain the game**. It only provides the runtime that
runs the original iOS executable on your device. You must supply your own legal
copy — the `.ipa` you own.

### What you need

The iPhone/iPod `.ipa` of Resident Evil 4 Platinum (Mobile Edition), containing:

| Item | Reference-copy value |
|---|---|
| Name | Resident Evil 4 Platinum |
| Version | **1.04.10** |
| Bundle | `jp.co.capcom.res4` |
| ABI | ARMv7 (32-bit Mach-O) |
| ARMv7 executable | 3,794,688 bytes — SHA-256 `84a2f3988d0780bf8a10048eb724bee832c296e1a914c748a64c105aef7c311b` |
| Reference IPA | 80,574,900 bytes — SHA-256 `81f4befd43e8af684dfa62e45a819be406229f30874eb20aa87153b8e1fc4b7c` |

The IPA size/SHA describe the reference copy and are **not** a requirement (a
repack changes the container). Identity is decided by the `jp.co.capcom.res4`
bundle and by the **1.04.10 ARMv7 executable**. The installer verifies program
identity while accepting signing differences; different or encrypted program
code is rejected.

### How to install

1. Copy `residentevil4-ios/` and `Resident Evil 4 Platinum.sh` to your device's
   `ports/` (or `roms/ports/`).
2. Put YOUR OWN `.ipa` of Resident Evil 4 Platinum into `residentevil4-ios/gamedata/`.
3. Launch it from the Ports menu. First run installs the owner data from the
   `.ipa`, verifies executable identity and tunes the device — **once**. Later
   launches boot straight in.
4. Exit: **SELECT + START**.

Extracted data and saves stay inside the port folder and are never published.

### Controls

The original game is touch-only: the port presses its own on-screen buttons.
Left stick walks (original pad); either stick moves the menu pointer (the stronger one wins) and A or R3
touches it; A activates the offered contextual action (items, ladders, doors, kick, break free); B leaves aim, returns from inventory/Options, or cancels item choices; A confirms notices with a visible Next button (B also remains available);
R3 scope zoom when offered in gameplay (menu click remains unchanged); R1/R2 gun (hold to aim and fire); L1/L2 knife; L3 Ashley; X shake to reload; Y map/inventory (HUD Status button); Start pause/skip; Start or A skip a movie;
hold A or R3 and move either stick to drag (sliders, "→ Yes"); SELECT+START exit.
A also addresses Ashley when no other contextual action is offered. L3 addresses
her directly. For inventory choices, move the pointer with either stick and
click with A or R3. The game decides whether each action or reload is available.

The unedited 1.0.3 map is upgraded with a backup. Customized maps are preserved.
To enable the new buttons, set `L3 = action:pad.l3` in `[base]`; set
`mode = digital` and `analog = null` in both `[trigger.left]` and `[trigger.right]`.
Use `digital = action:pad.l1` for the left and `digital = action:pad.r1` for the
right. Retain other settings.

Remap in `residentevil4-ios/NEXTOSCONTROLLERS.gptk` (`[base]`, `[stick.*]`, `[trigger.*]`);
screen framing in `NEXTOSSETTINGS.txt` (`video.aspect=auto|engine|preserve|stretch`).

### Requirements

An AArch64 host runs the installer UI; the game is ARMHF (32-bit). System ARMHF
libraries (SDL2, vendor EGL/GLES, libz) and a kernel that allows a low
`vm.mmap_min_addr` — the port sets it to 4096 at launch (as root, or via `sudo`
on ArkOS/dArkOS/ROCKNIX/muOS). `libcairo.so.2`, `libpixman-1.so.0`,
`libmpg123.so.0` and a minimal FFmpeg (movies) are bundled in
`residentevil4-ios/libs/`.
