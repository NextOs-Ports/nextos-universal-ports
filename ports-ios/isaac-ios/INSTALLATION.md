# The Binding of Isaac: Rebirth (iOS) — Instalação / Installation

**Português primeiro. English below.**

---

## Português

Este pacote **não contém o jogo**. Ele traz somente o runtime que faz o
executável iOS original rodar no seu aparelho. Você precisa fornecer a sua
própria cópia legal do aplicativo — o `.ipa` que você possui.

### O que você precisa

O `.ipa` de iPhone/iPad do The Binding of Isaac: Rebirth, contendo:

| Item | Valor da cópia de referência |
|---|---|
| Nome | The Binding of Isaac: Rebirth |
| Versão | **1.4** (build 9) |
| Bundle | `com.Nicalis.Isaac-iOS` |
| ABI | ARM64 (Mach-O de 64 bits) |
| Executável | 11.608.320 bytes — SHA-256 `3eaf1dd1122f7ae5b13ccf93f8af3fdcb9377dc96863f56de7f1e8687b54787f` |
| Arquivos no bundle | 34.808 (2,6 GB extraídos) |

A identidade real é decidida pelo bundle `com.Nicalis.Isaac-iOS` e pelo
**executável ARM64 da versão 1.4 (9)**, cujo SHA-256 o instalador confere —
só essa build é aceita. As correções de instruções do port são específicas
desse executável.

### Espaço e memória

A instalação precisa de **cerca de 5 GB livres** (o `.ipa` de 2,2 GB mais os
2,6 GB extraídos). O jogo foi provado em aparelhos com 1 GB de RAM; em
aparelhos com menos memória a abertura pode demorar mais.

### Como instalar

1. Copie a pasta `isaac-ios/` e o `The Binding of Isaac Rebirth.sh` para
   `ports/` (ou `roms/ports/`) do seu aparelho.
2. Ponha o SEU `.ipa` do The Binding of Isaac: Rebirth em `isaac-ios/gamedata/`.
3. Abra "The Binding of Isaac Rebirth" pelo menu de Ports. Na primeira execução
   o port instala os dados do dono a partir do `.ipa` (executável + recursos)
   e confere a versão pelo SHA. Isso acontece **uma vez só** e demora alguns
   minutos (34 mil arquivos); as aberturas seguintes vão direto ao jogo.
4. Sair: **SELECT + START** (o jogo salva pelo fluxo de suspensão nativo antes
   de fechar; ao reabrir escolha o mesmo arquivo e **Continue**).

Os dados extraídos ficam dentro da pasta do port e **não** são publicados.
Os saves ficam na subpasta `Documents` de `home`, dentro de `isaac-ios`.
Preserve a pasta `home` ao atualizar.

### Controles

| Botão | Ação |
|---|---|
| Analógico esq. / D-pad | Mover |
| Analógico dir. | Atirar |
| A / B / X / Y, L1 / R1, L2 / R2 | Conforme o jogo (GameController nativo) |
| Start | Pausa |
| SELECT + START | Salvar e sair |

### Requisitos

Sistema Linux AArch64 com glibc 2.27 ou superior, SDL2 do firmware/PortMaster,
EGL/GLES2 do fabricante, `libz`, `libpng16` e OpenAL (`libopenal.so.1`) do
sistema. `libc++.so.1` e `libc++abi.so.1` (o ABI do executável iOS) já vêm no
pacote (`isaac-ios/libs/`).

---

## English

This package **does not contain the game**. It only provides the runtime that
runs the original iOS executable on your device. You must supply your own legal
copy — the `.ipa` you own.

### What you need

The iPhone/iPad `.ipa` of The Binding of Isaac: Rebirth, containing:

| Item | Reference-copy value |
|---|---|
| Name | The Binding of Isaac: Rebirth |
| Version | **1.4** (build 9) |
| Bundle | `com.Nicalis.Isaac-iOS` |
| ABI | ARM64 (64-bit Mach-O) |
| Executable | 11,608,320 bytes — SHA-256 `3eaf1dd1122f7ae5b13ccf93f8af3fdcb9377dc96863f56de7f1e8687b54787f` |
| Bundle files | 34,808 (2.6 GB extracted) |

Identity is decided by the `com.Nicalis.Isaac-iOS` bundle and by the
**1.4 (9) ARM64 executable**, whose SHA-256 the installer verifies — only that
build is accepted.

### Space and memory

Installation needs **about 5 GB free** (the 2.2 GB `.ipa` plus 2.6 GB
extracted). The game was proven on 1 GB devices; lower-memory devices may take
longer to start.

### How to install

1. Copy `isaac-ios/` and `The Binding of Isaac Rebirth.sh` to your device's
   `ports/` (or `roms/ports/`).
2. Put YOUR OWN `.ipa` of The Binding of Isaac: Rebirth into `isaac-ios/gamedata/`.
3. Launch it from the Ports menu. First run installs the owner data from the
   `.ipa` and verifies the version by SHA — **once**, a few minutes (34k
   files). Later launches boot straight in.
4. Exit: **SELECT + START** (the game saves through its native suspend path
   first; reopen the same slot and choose **Continue**).

Extracted data stays inside the port folder and is never published. Saves live
in the `Documents` subfolder of `home`, inside `isaac-ios`. Keep `home`
when updating.

### Controls

Left stick/D-pad move; right stick shoots; face buttons, shoulders and
triggers follow the native GameController layout; Start pauses; SELECT+START
saves and exits.

### Requirements

AArch64 Linux with glibc 2.27+, firmware/PortMaster SDL2, vendor EGL/GLES2,
system `libz`, `libpng16` and OpenAL (`libopenal.so.1`). `libc++.so.1` and
`libc++abi.so.1` (the iOS executable's C++ ABI) are bundled in `isaac-ios/libs/`.
