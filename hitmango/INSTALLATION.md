# Hitman GO — instalação BYO / BYO installation

## Português

Este ZIP contém somente o port aberto. Ele não contém nem baixa dados do jogo.

### 1. Instale o port

Extraia o ZIP na pasta de ports do firmware, preservando exatamente:

```text
Hitman GO.sh
hitmango/
  INSTALLATION.md
  bin/aarch64/hitmango-nextos
  gamedata/
```

### 2. Forneça sua cópia legal

Build de referência aceita:

- jogo: `Hitman GO` versão `1.18.1`;
- package ID: `com.squareenixmontreal.hitmango`;
- ABI: `arm64-v8a`;
- tamanho: `512169180` bytes;
- SHA-256: `d88c418ddb72f23842138cf4ac2476a30687b9d16138be3ea7a4bfec66ef096a`.

Copie o APK/APKM/APKS/XAPK para `hitmango/gamedata/`. O NXExtract 1.2.9
também aceita outro SHA do arquivo externo quando ele é apenas outra
assinatura, compressão ou embalagem da mesma build: o package ID deve ser
`com.squareenixmontreal.hitmango`, a ABI deve ser `arm64-v8a` e estes arquivos
críticos precisam ser idênticos:

| Payload | Bytes | SHA-256 |
|---|---:|---|
| `libmain.so` | 6728 | `d9c2bb9a4b819270989f2ed8ff93dd47b7e38538c98ad784eb7b29c0a61a8917` |
| `libunity.so` | 17144392 | `105c61a07c2cc1317c786e825d7e3e0311aa51c7488450cb23cd7f81d33c5fe5` |
| `libil2cpp.so` | 32927536 | `bf0b5a8f3b033f2c3929244866a49d3ecf166d84cf5a085de3d763f143a63d2f` |
| `libFirebaseCppApp-12_10_1.so` | 6040520 | `177ed0095d067af7123bbf6e704f819422a3ed923966479e6bd966459aa3d148` |
| `boot.config` | 212 | `e3979e348d51f2f5296167cb7aa5cd3f6704855458655f8464bf04702ac03d04` |
| `globalgamemanagers` | 540892 | `b74032bb67f53e6497300c7641debc0d9a146fc7e7c902f62de7108c5bc3cbb6` |
| `global-metadata.dat` | 7065868 | `846ec2aaa2c050ac9193909692df1570cd107f2b49aa11c04e442f1d907a646c` |

Na primeira abertura a interface do NXExtract aparece, valida e instala de
forma transacional. O arquivo do dono nunca é apagado. Depois da instalação,
o NXSplash obrigatório aparece por cinco segundos e o jogo abre. Nas próximas
aberturas, a validação usa o marker rápido e o NXSplash continua aparecendo.
No ArkOS/KMSDRM, o jogo tenta primeiro os providers do firmware e faz um único
retry automático com os nomes EGL/GLES portáveis somente se a janela falhar.

Controles principais da v1.2.0: D-pad/analógico direito movem; analógico
esquerdo move a seta; A clica e, segurado, arrasta até ser solto. O layout
alternativo direita/R3 exige `HGO_SWAP_STICKS=0` e `HGO_CLICK_A=0`.

Saves ficam em `hitmango/home/`. O log atual é `hitmango/log.txt` e o anterior
é `hitmango/log.prev.txt`.

## English

This ZIP contains only the open port. It neither contains nor downloads game
data.

### 1. Install the port

Extract the ZIP into the firmware's ports directory, preserving exactly:

```text
Hitman GO.sh
hitmango/
  INSTALLATION.md
  bin/aarch64/hitmango-nextos
  gamedata/
```

### 2. Supply your legitimate copy

Accepted reference build:

- game: `Hitman GO` version `1.18.1`;
- package ID: `com.squareenixmontreal.hitmango`;
- ABI: `arm64-v8a`;
- size: `512169180` bytes;
- SHA-256: `d88c418ddb72f23842138cf4ac2476a30687b9d16138be3ea7a4bfec66ef096a`.

Copy the APK/APKM/APKS/XAPK into `hitmango/gamedata/`. NXExtract 1.2.9 also
accepts a different whole-file SHA when it is only another signature,
compression or wrapper of the same build: package ID must be
`com.squareenixmontreal.hitmango`, ABI must be `arm64-v8a`, and these critical
files must be identical:

| Payload | Bytes | SHA-256 |
|---|---:|---|
| `libmain.so` | 6728 | `d9c2bb9a4b819270989f2ed8ff93dd47b7e38538c98ad784eb7b29c0a61a8917` |
| `libunity.so` | 17144392 | `105c61a07c2cc1317c786e825d7e3e0311aa51c7488450cb23cd7f81d33c5fe5` |
| `libil2cpp.so` | 32927536 | `bf0b5a8f3b033f2c3929244866a49d3ecf166d84cf5a085de3d763f143a63d2f` |
| `libFirebaseCppApp-12_10_1.so` | 6040520 | `177ed0095d067af7123bbf6e704f819422a3ed923966479e6bd966459aa3d148` |
| `boot.config` | 212 | `e3979e348d51f2f5296167cb7aa5cd3f6704855458655f8464bf04702ac03d04` |
| `globalgamemanagers` | 540892 | `b74032bb67f53e6497300c7641debc0d9a146fc7e7c902f62de7108c5bc3cbb6` |
| `global-metadata.dat` | 7065868 | `846ec2aaa2c050ac9193909692df1570cd107f2b49aa11c04e442f1d907a646c` |

On first launch, the visible NXExtract UI validates and installs the data
transactionally. The owner's file is never deleted. The mandatory five-second
NXSplash then appears and the game starts. Later launches use the fast marker;
NXSplash still appears every time.
On ArkOS/KMSDRM, the game first tries the firmware providers and performs one
automatic retry with the portable EGL/GLES names only if window creation fails.

Main v1.2.0 controls: D-pad/right stick move; left stick moves the arrow; A
clicks and drags while held, then releases touch. The right-stick/R3 alternative
requires `HGO_SWAP_STICKS=0` and `HGO_CLICK_A=0`.

Saves live in `hitmango/home/`. Current diagnostics are in `hitmango/log.txt`;
the previous launch is `hitmango/log.prev.txt`.
