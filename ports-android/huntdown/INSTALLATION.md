# Huntdown — instalação / installation

## Português

Este port não inclui o jogo. Coloque uma cópia legítima pertencente ao usuário
em `ports/huntdown/gamedata/`. O NXExtract aceita APK único, conjunto de APKs
split, APKM, APKS, XAPK ou ZIP compatível. O nome, a assinatura e o SHA-256 do
container não são usados como trava única: a seleção usa o package ID, ABI,
estrutura e um perfil correlacionado dos payloads internos críticos.

Perfis de referência testados:

| Campo | Perfil 200023 | Perfil 200036 |
|---|---|---|
| Jogo/versão Android | Huntdown 0.1.23 | Huntdown 0.1 |
| Version code | `200023` | `200036` |
| Package ID | `com.coffeestain.huntdown` | `com.coffeestain.huntdown` |
| ABI | `arm64-v8a` | `arm64-v8a` |
| Formato de referência | APK | APKM |
| Tamanho do container | `426898294` bytes | `438127892` bytes |
| SHA-256 do container | `3642a0052d3eaef72be7b9b91470db6bb68222a392eccdcdc29abbd4aa59a011` | `e73173cd7274ea796614c298ac3be623c31febda475bac15c56c0e71820a87ae` |

Esses hashes apenas identificam as cópias testadas. Um container renomeado ou
reempacotado continua aceito quando fornece o mesmo jogo, ABI e um dos perfis
internos compatíveis. Misturar splits ou bibliotecas de versões diferentes,
usar outra ABI ou fornecer uma atualização futura ainda não analisada falha
fechado, com diagnóstico, antes de iniciar o jogo.

Estrutura no cartão:

```text
ports/Huntdown.sh
ports/huntdown/
├── huntdown-nextos
├── INSTALLATION.md
├── gamedata/
│   └── <container legítimo do usuário>
└── ...arquivos do port
```

Extraia o ZIP na raiz compatível com PortMaster, preservando essa estrutura, e
abra **Huntdown** pelo frontend. Na primeira abertura, a interface gráfica do
NXExtract valida e instala os dados; depois aparece a NXSplash obrigatória de
cinco segundos e o jogo inicia. Mantenha o container em `gamedata/` para
recuperação. Reserve aproximadamente 1,2 GiB livres durante a instalação.

## English

This port does not include the game. Place a legitimate user-owned copy in
`ports/huntdown/gamedata/`. NXExtract accepts a standalone APK, split APK set,
APKM, APKS, XAPK or compatible ZIP. Container name, signing and whole-file
SHA-256 are not a sole lock: selection uses package ID, ABI, structure and one
correlated profile of critical internal payloads.

Tested reference profiles:

| Field | Profile 200023 | Profile 200036 |
|---|---|---|
| Android game/version | Huntdown 0.1.23 | Huntdown 0.1 |
| Version code | `200023` | `200036` |
| Package ID | `com.coffeestain.huntdown` | `com.coffeestain.huntdown` |
| ABI | `arm64-v8a` | `arm64-v8a` |
| Reference format | APK | APKM |
| Container size | `426898294` bytes | `438127892` bytes |
| Container SHA-256 | `3642a0052d3eaef72be7b9b91470db6bb68222a392eccdcdc29abbd4aa59a011` | `e73173cd7274ea796614c298ac3be623c31febda475bac15c56c0e71820a87ae` |

These hashes identify the tested copies only. A renamed or repacked container
is still accepted when it supplies the same game, ABI and one compatible
internal profile. Mixed-version splits or libraries, a wrong ABI, or a future
update that has not yet been analyzed fails closed with a diagnostic before
the game starts.

Card layout:

```text
ports/Huntdown.sh
ports/huntdown/
├── huntdown-nextos
├── INSTALLATION.md
├── gamedata/
│   └── <legitimate user-owned container>
└── ...port files
```

Extract the ZIP at the PortMaster-compatible root while preserving this
layout, then launch **Huntdown** from the frontend. On first launch, the
graphical NXExtract interface validates and installs the data; the mandatory
five-second NXSplash follows, then the game starts. Keep the container in
`gamedata/` for recovery. Allow approximately 1.2 GiB free during installation.
