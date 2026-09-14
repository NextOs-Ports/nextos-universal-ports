# Off The Road — installation / instalação

## English

Install the final PortMaster ZIP with the PortMaster application. The archive
installs exactly this layout:

```text
ports/Off The Road.sh
ports/offtheroad/
```

Owner data for this port:

- game name and tested version: **Off The Road — Open World Driving 1.18.2**;
- package ID: **com.dogbytegames.offtheroad**;
- accepted ABI: **aarch64** (arm64-v8a);
- reference container: **563 848 921 bytes**, SHA-256
  `9e24980ff7fa31e741dc4f03806386bd09c47a60eb4c46b2b41f3403c97f5976`.

The reference container hash identifies the tested copy; it is never the only
compatibility condition. The extraction recipe validates the package ID, ABI,
structural layout, and the exact size/SHA-256 of the internal runtime payloads
`libgame.so` (9,501,104 bytes,
`5258d644cbb023b137719901fa84acf8a8ae3da01c573b52a7a31255245628dd`) and
`libc++_shared.so` (1,292,904 bytes,
`4397241b4bd20a8e579bfb41d21107857e12985f6a01ca0c2a5f83380d1270b4`).
This accepts a renamed or re-signed/repackaged container carrying the same
compatible runtime. `data_001.xpk` is required; `AVConfig.json` is optional.
Do not publish the original container filename or any download source.

First run:

1. Copy your legally owned APK of Off The Road into
   `ports/offtheroad/gamedata/` (the filename does not matter).
2. Launch `Off The Road.sh` from the frontend. The installer (NXExtract)
   extracts and validates `lib/libgame.so`, `lib/libc++_shared.so` and about
   522 MB of `assets/`, then starts the game. Allow ~1.1 GB free space during
   the first run (the APK may be removed afterwards).
3. Logs: `ports/offtheroad/log.txt` (runtime) and the NXExtract logs next to
   it. Saves live in `ports/offtheroad/` (`config.datC`) and per-user caches
   in `ports/offtheroad/userdata/`.

Update: install the new ZIP over the old one; game data and saves are kept.
Uninstall: remove `ports/offtheroad/` and `ports/Off The Road.sh`; back up
`config.datC` first if you want to keep your progress.

## Português

Instale o ZIP final pelo aplicativo PortMaster. O pacote instala exatamente
esta estrutura:

```text
ports/Off The Road.sh
ports/offtheroad/
```

Dados do proprietário deste port:

- nome e versão testada do jogo: **Off The Road — Open World Driving 1.18.2**;
- package ID: **com.dogbytegames.offtheroad**;
- ABI aceita: **aarch64** (arm64-v8a);
- container de referência: **563 848 921 bytes**, SHA-256
  `9e24980ff7fa31e741dc4f03806386bd09c47a60eb4c46b2b41f3403c97f5976`.

O hash integral identifica somente a cópia testada e nunca é a única condição
de compatibilidade. A receita valida package ID, ABI, estrutura e tamanho/hash
SHA-256 exatos dos payloads internos `libgame.so` (9.501.104 bytes,
`5258d644cbb023b137719901fa84acf8a8ae3da01c573b52a7a31255245628dd`) e
`libc++_shared.so` (1.292.904 bytes,
`4397241b4bd20a8e579bfb41d21107857e12985f6a01ca0c2a5f83380d1270b4`).
Isso aceita container renomeado ou reassinado/reempacotado que carregue o
mesmo runtime compatível. `data_001.xpk` é obrigatório; `AVConfig.json` é
opcional. Não publique o nome original do container nem qualquer origem de
download.

Primeiro boot:

1. Copie o **seu APK** de Off The Road, adquirido legalmente, para
   `ports/offtheroad/gamedata/` (o nome do arquivo não importa).
2. Abra `Off The Road.sh` pelo frontend. O instalador (NXExtract) extrai e
   valida `lib/libgame.so`, `lib/libc++_shared.so` e ~522 MB de `assets/`, e
   então inicia o jogo. Reserve ~1,1 GB livres durante o primeiro boot (o APK
   pode ser removido depois).
3. Logs: `ports/offtheroad/log.txt` (runtime) e os logs do NXExtract ao lado.
   O save fica em `ports/offtheroad/` (`config.datC`) e os caches em
   `ports/offtheroad/userdata/`.

Atualização: instale o ZIP novo por cima; dados do jogo e save são mantidos.
Remoção: apague `ports/offtheroad/` e `ports/Off The Road.sh`; se quiser
manter o progresso, copie antes o `config.datC`.
