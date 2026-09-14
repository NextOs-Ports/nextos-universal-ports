# Castle of Illusion Starring Mickey Mouse — native port for Linux handhelds

A native AArch64 port of the 2013 Android release of *Castle of Illusion
Starring Mickey Mouse* (Sega's "oz" engine). The Android game library runs
directly on Linux through a compatibility loader — no emulator, no Android
runtime, no Java. Video goes through the firmware's own SDL/EGL/GLES, audio
through FMOD Ex bridged to SDL, and the controller is read natively.

**You provide your own legally obtained APK and OBB.** This package contains no
game data; the bundled installer extracts and validates yours on first launch.

<p align="center">
  <img src="screenshots/01-titulo-nextos-1280x720.png" width="49%"
       alt="Title screen running on the port">
  <img src="screenshots/02-gameplay-nextos-1280x720.png" width="49%"
       alt="Gameplay running on the port">
</p>

## Community

Questions, device reports and help: **<https://discord.gg/DHfY62eDNN>**

## Install

Full steps in **[INSTALLATION.md](INSTALLATION.md)**. The short version:

1. unzip the release into your `ports` folder;
2. drop your own Castle of Illusion **APK 1.4.5 (arm64)** and the **`main.154`
   OBB** into `ports/castleofillusion/gamedata/`;
3. open the port. The installer validates and installs your data once; later
   launches skip straight to the game.

Filenames do not matter — payloads are selected by content and validated
structurally: entry name, ELF machine and size range for the libraries, file
signature and size range for the OBB. Any Play Store build of 1.4.5 is
accepted.

## Devices

Only physically tested combinations are listed as supported. Everything else
stays off this table until someone runs the full cycle — install, play, audio,
controller, save, reload, clean exit — on a real device.

| Device / firmware | Status |
|---|---|
| R36T/K36S clone — ArkOS, Mali-G31, AArch64, glibc 2.30 | plays — full session on real hardware |
| NextOS Amlogic (Mali-450, fbdev) | plays — developed here and re-validated on this packaging |

Measured on an R36T/K36S (ArkOS, Mali-G31, 640 MB) with this build:

| Area | Result |
|---|---|
| BYO-data install (NXExtract 1.2.2) | works — install, resume, marker, adoption, wrong-build rejection |
| Video | KMSDRM 640×480, OpenGL ES 2 context on Mali-G31, real drawable adopted |
| Audio | FMOD Ex → SDL, zero underruns across a full play session |
| Controller | A/B/X/Y positionally correct, D-pad correct, through PortMaster |
| Menus and intro | reachable with the controller; **loading is slow — be patient at the title** |
| Gameplay | reached and played |
| SELECT+START and SIGTERM | pause → engine save → clean exit, no leftover process |
| Performance | 24–30 fps in menus/cutscenes, **≈16–18 fps in gameplay** |
| Save and reload | save path verified in the engine and loader code: reads and writes are symmetric into `userdata/`, and every `userdata/` access is logged |

Gameplay framerate on this class of device is honest-but-modest. If a save ever
fails to come back, `debug.log` records every `userdata/` read and write — send
it on Discord.

The loader itself makes no assumption about the device: it asks SDL for the
display mode, walks a ladder of GL configurations until it gets a real OpenGL
ES context, adopts the real drawable size, and takes the controller mapping
from PortMaster and the firmware's `gamecontrollerdb.txt`. No SDL backend is
ever forced. Other handhelds are likely to work — but "likely" is not a
support claim, so report yours on Discord and it gets tested.

## Controls

| Button | In game |
|---|---|
| D-pad / left stick | move (8 directions) |
| A | jump / confirm |
| B, X, Y | action |
| START | pause menu |
| **SELECT + START** | save and quit |

`SELECT`+`START` and the frontend's own close (`SIGTERM`) follow the same path:
pause, let the engine write its save, then exit.

## Requirements

- AArch64 Linux firmware with SDL2, EGL and OpenGL ES 2.0 from the vendor;
- `python3` (used by the data installer on first launch only);
- about 1.3 GiB free while installing, ~600 MiB after;
- your own APK and OBB.

Every binary this project builds and ships requires at most **GLIBC 2.27**,
below the 2.30 public floor.

## Build

```bash
SYSROOT=/path/to/aarch64-sysroot ./build_universal.sh   # needs docker
./package/build-package.sh                              # zip + sha256
```

`build_universal.sh` compiles inside `debian:buster` and refuses to finish if
the result needs more than GLIBC 2.30. `build-package.sh` refuses to produce a
zip that contains game data, a personal path or an IP address.

## Licence and credits

The loader is GPL-3.0 (`LICENSE`). The bundled NXExtract installer is MIT
(`licenses/NXExtract-MIT.txt`). Game data is proprietary, is not included and
is not covered by either — see **[NOTICE.md](NOTICE.md)**.

Independent interoperability project. Not affiliated with or endorsed by Sega,
Disney or Firelight Technologies.

---

# Português

Port nativo AArch64 do lançamento Android de 2013 de *Castle of Illusion
Starring Mickey Mouse* (engine "oz" da Sega). A biblioteca Android do jogo roda
direto no Linux através de um loader de compatibilidade — sem emulador, sem
runtime Android, sem Java. O vídeo passa pelo SDL/EGL/GLES do próprio firmware,
o áudio pelo FMOD Ex em ponte com o SDL, e o controle é lido nativamente.

**Você fornece o seu APK e o seu OBB, obtidos legalmente.** Este pacote não
contém dado de jogo nenhum; o instalador embutido extrai e valida os seus na
primeira abertura.

### Comunidade

Dúvidas, relatos de aparelho e ajuda: **<https://discord.gg/DHfY62eDNN>**

### Instalação

Passo a passo completo em **[INSTALLATION.md](INSTALLATION.md)**. Resumindo:

1. descompacte a release na sua pasta `ports`;
2. ponha o seu **APK 1.4.5 (arm64)** e o **OBB `main.154`** do Castle of
   Illusion em `ports/castleofillusion/gamedata/`;
3. abra o port. O instalador valida e instala os dados uma vez; nas próximas
   vezes o jogo abre direto.

O nome do arquivo não importa — os payloads são escolhidos pelo conteúdo e
validados estruturalmente: nome da entrada, arquitetura do ELF e faixa de
tamanho para as bibliotecas, assinatura e faixa de tamanho para o OBB.
Qualquer build da Play Store da 1.4.5 é aceito.

### Aparelhos

Só entra na tabela a combinação testada fisicamente, com o ciclo inteiro:
instalar, jogar, áudio, controle, save, recarregar e sair limpo.

| Aparelho / firmware | Estado |
|---|---|
| Clone R36T/K36S — ArkOS, Mali-G31, AArch64, glibc 2.30 | joga — sessão completa em hardware real |
| NextOS Amlogic (Mali-450, fbdev) | joga — desenvolvido aqui e revalidado neste empacotamento |

Medido num R36T/K36S (ArkOS, Mali-G31, 640 MB) com este build:

| Área | Resultado |
|---|---|
| Instalação BYO-data (NXExtract 1.2.2) | funciona — instalação, retomada, marker, adoção, recusa de build errada |
| Vídeo | KMSDRM 640×480, contexto OpenGL ES 2 no Mali-G31, drawable real adotado |
| Áudio | FMOD Ex → SDL, zero underruns numa sessão inteira de jogo |
| Controle | A/B/X/Y posicionalmente corretos, D-pad correto, via PortMaster |
| Menus e abertura | alcançáveis pelo controle; **o loading é lento — tenha paciência no título** |
| Gameplay | alcançado e jogado |
| SELECT+START e SIGTERM | pausa → save da engine → saída limpa, sem processo residual |
| Desempenho | 24–30 fps em menu/cutscene, **≈16–18 fps em gameplay** |
| Save e reload | caminho do save verificado no código da engine e do loader: leitura e escrita simétricas em `userdata/`, e todo acesso a `userdata/` vai para o log |

O framerate em gameplay nessa classe de aparelho é honesto, porém modesto. Se
um save não voltar, o `debug.log` registra toda leitura e escrita em
`userdata/` — mande no Discord.

O loader não presume nada sobre o aparelho: pergunta o modo de vídeo ao SDL,
percorre uma escada de configurações GL até conseguir um contexto OpenGL ES de
verdade, adota o tamanho real do drawable e pega o mapeamento de controle do
PortMaster e do `gamecontrollerdb.txt` do firmware. Nenhum backend SDL é
forçado. Outros handhelds têm boa chance de funcionar — mas "boa chance" não é
promessa de suporte: relate o seu no Discord que a gente testa.

### Controles

| Botão | No jogo |
|---|---|
| D-pad / analógico esquerdo | mover (8 direções) |
| A | pular / confirmar |
| B, X, Y | ação |
| START | menu de pausa |
| **SELECT + START** | salvar e sair |

`SELECT`+`START` e o "fechar" do próprio frontend (`SIGTERM`) seguem o mesmo
caminho: pausa, a engine grava o save, e só então o processo sai.

### Requisitos

- firmware Linux AArch64 com SDL2, EGL e OpenGL ES 2.0 do fabricante;
- `python3` (usado pelo instalador só na primeira abertura);
- cerca de 1,3 GiB livres durante a instalação, ~600 MiB depois;
- o seu APK e o seu OBB.

Todo binário que este projeto constrói e distribui exige no máximo **GLIBC
2.27**, abaixo do piso público de 2.30.

### Licença e créditos

O loader é GPL-3.0 (`LICENSE`). O instalador NXExtract embutido é MIT
(`licenses/NXExtract-MIT.txt`). Os dados do jogo são proprietários, não são
distribuídos e não são cobertos por nenhuma das duas — veja
**[NOTICE.md](NOTICE.md)**.

Projeto independente de interoperabilidade. Sem vínculo com Sega, Disney ou
Firelight Technologies.

## Download

- [castleofillusion-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/castleofillusion-v1.0.1) — `castleofillusion.zip`, `castleofillusion.zip.sha256`

- Todas as versões / all versions: [releases?q=castleofillusion](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=castleofillusion)
- Histórico: 125 downloads no repositório original `castleofillusion-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
