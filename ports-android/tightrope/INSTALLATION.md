# Installation / Instalação

**Language / Idioma:** [English](#english) · [Português](#português)

## English

### Required owner data

This port contains no APK, Android library, artwork, music or other proprietary
game data. Provide your own legal copy. The values below identify the tested
reference container; its complete size and SHA-256 are evidence, not the sole
acceptance lock:

| Field | Accepted value |
|---|---|
| Game | Tightrope Theatre 1.0.5 (version code 33) |
| Package ID | `com.adventureislands.tightropetheatre` |
| ABI | `arm64-v8a` |
| Bundle size | 64,616,112 bytes |
| Bundle SHA-256 | `61d53441d9ea84ded90e67b4b87ae4f16bf2755a35a8c2e966ab5693785eaa49` |
| Base APK | `com.adventureislands.tightropetheatre.apk`, 18,829,193 bytes, SHA-256 `83f1f4e9d76bf15523b3ce8e24b406c49ef78374cc8d936e65cbed25fd5c61d5` |
| Native split | `config.arm64_v8a.apk`, 45,658,688 bytes, SHA-256 `e6c1bd3825c2380552024f92396898520b8b9f78824ce874cb63685efcfb30e1` |

The bundle must contain `lib/arm64-v8a/liblime.so`,
`lib/arm64-v8a/libApplicationMain.so`, `libpairipcore.so` and the original
assets. ARMv7-only packages are not supported. NXExtract 1.2.9 accepts a
differently named, signed or ZIP-packed APK/APKM/APKS/XAPK when package ID,
version contract, ABI, structure and the pinned hashes of critical internal
payloads still match. A different game, ABI or incompatible build is rejected.

### Install

Use PortMaster's local ZIP installer when available. Version 1.0.5-test.1 installs
this exact layout:

```text
PortMaster scripts_dir/Tightrope Theatre.sh
PortMaster ports_dir/tightrope/
  INSTALLATION.md
  gamedata/
  tightrope-nextos
  nxsplash-nextos
  nxextract/
  ...
```

For a manual installation, copy `tightrope/` into the firmware's PortMaster
`ports_dir` and copy `Tightrope Theatre.sh` into its `scripts_dir`. Do not move
the files inside `tightrope/` or add another directory level.

Then:

1. Put the legal XAPK in `tightrope/gamedata/`. Keep that source file there;
   extraction never consumes, renames or deletes it.
2. Launch **Tightrope Theatre** from the frontend.
3. On the first run, the graphical SDL2 NXExtract interface reconstructs all
   owner data. After the complete extraction is committed, the separate
   colored bilingual NextOS/RETRO ELITE splash is shown for five seconds.
4. On the second run, NXExtract uses its validated marker without extracting
   again; the same colored splash must still remain visible for five seconds.

For an update from the legacy 1.0.1 layout, back up `tightrope/home/` and your
owner bundle, remove only the old Tightrope launcher and port directory, then
install this ZIP cleanly and restore those two items. Do not overlay it on the
old `run.sh`/`ports_scripts` package; otherwise the frontend may still execute
the retired launcher.

### Controls and logs

- D-pad left/right: precise character movement during gameplay
- D-pad up: jump during gameplay; D-pad down is neutral
- Right stick: move the menu pointer continuously
- R1 or R3: click/confirm in menus
- Left stick: progressive gameplay movement with a larger deadzone
- A: jump during gameplay
- SELECT + START: save and return to the frontend

D-pad, left stick and A are neutral on title, settings and selection screens;
only the right-stick arrow and R1/R3 operate the menus.

Normal diagnostics are in `tightrope/log.txt`; the preceding run is
`tightrope/log.prev.txt`, and extraction details are in
`tightrope/nxextract.log`. A failure before the normal log creates an
owner-only `tightrope-launcher-error.<pid>.log` (mode `0600`) beside the port,
launcher or in the temporary directory.

## Português

### Dados obrigatórios do dono

Este port não inclui APK, biblioteca Android, arte, música nem qualquer outro
dado proprietário do jogo. Forneça sua cópia legal. Os valores abaixo
identificam o container de referência testado; tamanho e SHA-256 completos são
evidência, não a única trava de aceitação:

| Campo | Valor aceito |
|---|---|
| Jogo | Tightrope Theatre 1.0.5 (version code 33) |
| Package ID | `com.adventureislands.tightropetheatre` |
| ABI | `arm64-v8a` |
| Tamanho do bundle | 64.616.112 bytes |
| SHA-256 do bundle | `61d53441d9ea84ded90e67b4b87ae4f16bf2755a35a8c2e966ab5693785eaa49` |
| APK base | `com.adventureislands.tightropetheatre.apk`, 18.829.193 bytes, SHA-256 `83f1f4e9d76bf15523b3ce8e24b406c49ef78374cc8d936e65cbed25fd5c61d5` |
| Split nativo | `config.arm64_v8a.apk`, 45.658.688 bytes, SHA-256 `e6c1bd3825c2380552024f92396898520b8b9f78824ce874cb63685efcfb30e1` |

O bundle precisa conter `lib/arm64-v8a/liblime.so`,
`lib/arm64-v8a/libApplicationMain.so`, `libpairipcore.so` e os assets originais.
Pacotes somente ARMv7 não são aceitos. O NXExtract 1.2.9 aceita APK/APKM/APKS/
XAPK com outro nome, assinatura ou empacotamento ZIP quando package ID,
contrato de versão, ABI, estrutura e hashes pinados dos payloads internos
críticos ainda conferem. Outro jogo, ABI ou build incompatível é recusado.

### Instalação

Use o instalador de ZIP local do PortMaster quando disponível. A versão 1.0.5-test.1
instala exatamente este layout:

```text
PortMaster scripts_dir/Tightrope Theatre.sh
PortMaster ports_dir/tightrope/
  INSTALLATION.md
  gamedata/
  tightrope-nextos
  nxsplash-nextos
  nxextract/
  ...
```

Na instalação manual, copie `tightrope/` para o `ports_dir` do PortMaster no
firmware e copie `Tightrope Theatre.sh` para o `scripts_dir`. Não mova os
arquivos internos de `tightrope/` nem crie outro nível de pasta.

Depois:

1. Coloque o XAPK legal em `tightrope/gamedata/`. Mantenha o arquivo-fonte ali;
   a extração nunca o consome, renomeia ou apaga.
2. Abra **Tightrope Theatre** pelo frontend.
3. No primeiro arranque, a interface gráfica SDL2 do NXExtract reconstrói todos
   os dados do dono. Depois do commit completo, a tela colorida e separada
   NextOS/RETRO ELITE aparece por cinco segundos.
4. No segundo arranque, o NXExtract usa o marcador validado sem extrair outra
   vez; a mesma tela colorida ainda precisa durar cinco segundos.

Ao atualizar o layout legado 1.0.1, guarde `tightrope/home/` e seu bundle,
remova somente o launcher e a pasta antigos do Tightrope, instale este ZIP do
zero e devolva esses dois itens. Não sobreponha ao pacote antigo com
`run.sh`/`ports_scripts`, pois o frontend pode continuar executando o launcher
aposentado.

### Controles e logs

- D-pad esquerda/direita: movimento preciso durante o gameplay
- D-pad para cima: pula durante o gameplay; para baixo fica neutro
- Analógico direito: move continuamente o ponteiro do menu
- R1 ou R3: clica/confirma nos menus
- Analógico esquerdo: movimento progressivo com deadzone maior
- A: pula durante o gameplay
- SELECT + START: salva e volta ao frontend

D-pad, analógico esquerdo e A ficam neutros no título, configurações e telas de
seleção; somente a seta do analógico direito e R1/R3 operam os menus.

O diagnóstico normal fica em `tightrope/log.txt`; a execução anterior fica em
`tightrope/log.prev.txt`, e a extração em `tightrope/nxextract.log`. Uma falha
anterior ao log normal cria `tightrope-launcher-error.<pid>.log`, exclusivo do
dono (modo `0600`), ao lado do port, do launcher ou no diretório temporário.
