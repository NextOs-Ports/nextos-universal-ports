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
cujo SHA-256 o instalador confere — só essa build é aceita.

### Como instalar

1. Copie a pasta `residentevil4-ios/` e o `Resident Evil 4 Platinum.sh` para
   `ports/` (ou `roms/ports/`) do seu aparelho.
2. Ponha o SEU `.ipa` do Resident Evil 4 Platinum em `residentevil4-ios/gamedata/`.
3. Abra "Resident Evil 4 Platinum" pelo menu de Ports. Na primeira execução o port
   instala os dados do dono a partir do `.ipa` (executável + recursos),
   confere a versão pelo SHA e ajusta o aparelho. Isso acontece **uma vez só**;
   as aberturas seguintes vão direto ao jogo.
4. Sair: **SELECT + START**.

Os dados extraídos e o save ficam dentro da pasta do port e **não** são publicados.

### Controles

O jogo original é de toque: o port aperta os próprios botões da tela.

| Botão | Jogo | Menus e janelas |
|---|---|---|
| Analógico esquerdo | Andar (pad original) | — |
| Analógico direito ou esquerdo | — | Mover a seta (vale o mais inclinado) |
| R3 | — | Tocar na seta; segure R3 e mova o analógico direito para arrastar (sliders, "→ Yes") |
| A | Pegar item / Escapar do agarrão / Chute / Próximo | — |
| B | Sair da mira / confirmar mensagem | Próximo (▲) |
| R1 | Arma (segurar mira e atirar) | — |
| L1 | Faca | — |
| Y | Mapa/inventário (botão Status do HUD) | — |
| Start ou A durante um filme | Pular o filme | Pular o filme |
| Start | Pausa / Pular cena | — |
| SELECT + START | Sair | Sair |

Remapeie editando `residentevil4-ios/NEXTOSCONTROLLERS.gptk` (contextos
`[menu]` e `[gameplay]`). Enquadramento de tela: `NEXTOSSETTINGS.txt`
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
bundle and by the **1.04.10 ARMv7 executable**, whose SHA-256 the installer
verifies — only that build is accepted.

### How to install

1. Copy `residentevil4-ios/` and `Resident Evil 4 Platinum.sh` to your device's
   `ports/` (or `roms/ports/`).
2. Put YOUR OWN `.ipa` of Resident Evil 4 Platinum into `residentevil4-ios/gamedata/`.
3. Launch it from the Ports menu. First run installs the owner data from the
   `.ipa`, verifies the version by SHA and tunes the device — **once**. Later
   launches boot straight in.
4. Exit: **SELECT + START**.

Extracted data and saves stay inside the port folder and are never published.

### Controls

The original game is touch-only: the port presses its own on-screen buttons.
Left stick walks (original pad); either stick moves the menu pointer (the stronger one wins) and R3
touches it; A picks up / breaks free / kicks / next; B leaves aim / confirms;
R1 gun (hold to aim and fire); L1 knife; Y map/inventory (HUD Status button); Start pause/skip; Start or A skip a movie;
hold R3 and move the right stick to drag (sliders, "→ Yes"); SELECT+START exit.
Remap in `residentevil4-ios/NEXTOSCONTROLLERS.gptk` (`[menu]`/`[gameplay]`);
screen framing in `NEXTOSSETTINGS.txt` (`video.aspect=auto|engine|preserve|stretch`).

### Requirements

An AArch64 host runs the installer UI; the game is ARMHF (32-bit). System ARMHF
libraries (SDL2, vendor EGL/GLES, libz) and a kernel that allows a low
`vm.mmap_min_addr` — the port sets it to 4096 at launch (as root, or via `sudo`
on ArkOS/dArkOS/ROCKNIX/muOS). `libcairo.so.2`, `libpixman-1.so.0`,
`libmpg123.so.0` and a minimal FFmpeg (movies) are bundled in
`residentevil4-ios/libs/`.
