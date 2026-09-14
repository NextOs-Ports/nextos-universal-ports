# Angry Birds Classic 1.1.2-test.3 — Installation / Instalação

## English

This is a bring-your-own-data PortMaster package. It contains no APK or other
proprietary Angry Birds data. You must provide one of the exact official Angry
Birds Classic 8.0.3 APKs listed below.

### Install the port

1. Extract `angrybirds.zip` into the firmware's PortMaster `ports` directory.
2. Keep the archive layout unchanged:

   ```text
   ports/
   ├── Angry Birds Classic.sh
   └── angrybirds/
       ├── angrybirds-nextos
       ├── INSTALLATION.md
       ├── extractor.json
       ├── nxextract/
       └── gamedata/
   ```

3. Copy your legally obtained APK into `ports/angrybirds/gamedata/`. Its
   filename does not matter; do not modify its contents.
4. Start **Angry Birds Classic** from the Ports menu. On the first launch,
   NXExtract validates the APK and installs it transactionally as
   `ports/angrybirds/game.apk`. The source APK in `gamedata/` is retained.

For an update over an older port version, extract the new ZIP over the same
`ports` directory. Do not delete `angrybirds/gamedata/`, `angrybirds/saves/` or
`angrybirds/cache/`.

### Accepted owner APKs

Both rows are official Angry Birds Classic 8.0.3 builds signed by Rovio.

| Game | Package ID | Required ABI | Size | APK SHA-256 |
|---|---|---|---:|---|
| Angry Birds Classic 8.0.3 | `com.rovio.angrybirds` | `armeabi-v7a` | `103362175` bytes | `0d533148bde4e2067f9138736dde22e49dcc6d7191d20d5061e2afb7dd35b75d` |
| Angry Birds Classic 8.0.3 (8031) | `com.rovio.angrybirds` | `armeabi-v7a` | `103772201` bytes | `8cdea1ef39a2a5c3bad5ac27050b491dbdf68050754241390cf9f0d3d24979b8` |

Shared Rovio signing-certificate SHA-256:
`3bf281705398004c6f8e4ba8426c3ba2490385c3aeaf6b05b6440396c6a1a50d`.

Modified, truncated or differently signed files are rejected before valid
installed data is replaced. If installation fails, inspect
`angrybirds/nxextract.log` and confirm the APK's size and SHA-256.

## Português

Este é um pacote PortMaster BYO (traga seus próprios dados). Ele não contém APK
nem outro dado proprietário do Angry Birds. Você precisa fornecer um dos APKs
oficiais exatos do Angry Birds Classic 8.0.3 listados abaixo.

### Instalar o port

1. Extraia `angrybirds.zip` na pasta `ports` usada pelo PortMaster do firmware.
2. Preserve o layout do ZIP:

   ```text
   ports/
   ├── Angry Birds Classic.sh
   └── angrybirds/
       ├── angrybirds-nextos
       ├── INSTALLATION.md
       ├── extractor.json
       ├── nxextract/
       └── gamedata/
   ```

3. Copie seu APK obtido legalmente para `ports/angrybirds/gamedata/`. O nome do
   arquivo não importa; não modifique o conteúdo interno.
4. Abra **Angry Birds Classic** no menu Ports. No primeiro boot, o NXExtract
   confere o APK e o instala transacionalmente como
   `ports/angrybirds/game.apk`. O APK de origem continua em `gamedata/`.

Para atualizar uma versão anterior, extraia o ZIP novo sobre a mesma pasta
`ports`. Não apague `angrybirds/gamedata/`, `angrybirds/saves/` nem
`angrybirds/cache/`.

### APKs do dono aceitos

As duas linhas são builds oficiais do Angry Birds Classic 8.0.3 assinadas pela
Rovio.

| Jogo | Package ID | ABI exigida | Tamanho | SHA-256 do APK |
|---|---|---|---:|---|
| Angry Birds Classic 8.0.3 | `com.rovio.angrybirds` | `armeabi-v7a` | `103362175` bytes | `0d533148bde4e2067f9138736dde22e49dcc6d7191d20d5061e2afb7dd35b75d` |
| Angry Birds Classic 8.0.3 (8031) | `com.rovio.angrybirds` | `armeabi-v7a` | `103772201` bytes | `8cdea1ef39a2a5c3bad5ac27050b491dbdf68050754241390cf9f0d3d24979b8` |

SHA-256 compartilhado do certificado de assinatura da Rovio:
`3bf281705398004c6f8e4ba8426c3ba2490385c3aeaf6b05b6440396c6a1a50d`.

Arquivos modificados, incompletos ou assinados de outra forma são recusados
antes de substituir dados válidos. Se a instalação falhar, confira
`angrybirds/nxextract.log`, o tamanho e o SHA-256 do APK.
