# Horizon Chase — installation / instalação

This package contains only the free port loader and compatibility files. It
does not contain Horizon Chase, its APKs, Unity libraries, art, audio or other
proprietary data. You must supply a legal copy that you own.

Este pacote contém somente o loader livre do port e os arquivos de
compatibilidade. Ele não inclui Horizon Chase, APKs, bibliotecas Unity, arte,
áudio nem outros dados proprietários. Você deve fornecer uma cópia legal que
possui.

## Required owner data / Dados obrigatórios do proprietário

| Field / Campo | Required value / Valor obrigatório |
|---|---|
| Game / Jogo | Horizon Chase – Arcade Racing |
| Version / Versão | 2.6.9 |
| Android package ID | `com.aquiris.horizonchase` |
| Runtime ABI / ABI usada | `arm64-v8a` |
| NXExtract recipe / Receita | `horizonchase` version `2.6.9-2` |

The following packages are the three exact source identities validated for
this port. A filename may be changed without changing its content or SHA-256.

Os pacotes abaixo são as três identidades exatas de origem validadas para este
port. O nome do arquivo pode ser alterado sem mudar seu conteúdo ou SHA-256.

| Container / Contêiner | Android versionCode | Size / Tamanho (bytes) | SHA-256 |
|---|---:|---:|---|
| Complete APKM / APKM completo | 2054272382 | 465921049 | `7068c98b8f13d6a7a311ec857022921db09f4d97e324f25da70828efdddd985f` |
| Complete APKM / APKM completo | 2054272383 | 465921256 | `e7f341a9051c0425a9f94938b49b7e8418d5e80cceae4083c90a4f3daac51da5` |
| Complete APK / APK completo | 2054272382 | 475642792 | `f5453fadc1f0b8a8a854c90ae0fa149b48240ff00163af4e42da15d520088982` |

NXExtract also understands a complete APKS/APKM/XAPK bundle or all loose APK
splits when their internal payload is identical to one of those builds. It
does not trust the outer filename: the recipe validates the ARM64 Unity and
IL2CPP libraries, complete asset trees, sizes, SHA-256 hashes and ELF machine.
Do not mix splits from different packages or builds.

O NXExtract também entende um APKS/APKM/XAPK completo ou todos os APKs split
soltos quando o conteúdo interno é idêntico a um desses builds. Ele não confia
no nome externo: a receita valida bibliotecas Unity e IL2CPP ARM64, árvores de
assets completas, tamanhos, hashes SHA-256 e máquina ELF. Não misture splits
de pacotes ou builds diferentes.

## Install / Instalar

1. Extract `horizonchase.zip` into the firmware's ports directory. It must
   create the launcher `Horizon Chase.sh` beside the `horizonchase/` folder.
2. Put one complete supported bundle, or every matching split APK, in
   `horizonchase/gamedata/`.
3. Launch **Horizon Chase** from the frontend. Keep the device powered while
   NXExtract validates and prepares the data on the first run.
4. Subsequent starts use the validated marker and do not need to scan or
   unpack the source again. The source archive is never deleted.

1. Extraia `horizonchase.zip` no diretório de ports do firmware. O launcher
   `Horizon Chase.sh` deve ficar ao lado da pasta `horizonchase/`.
2. Coloque um bundle completo suportado, ou todos os APKs split
   correspondentes, em `horizonchase/gamedata/`.
3. Abra **Horizon Chase** pelo frontend. Mantenha o aparelho ligado enquanto o
   NXExtract valida e prepara os dados na primeira execução.
4. As próximas aberturas usam o marcador validado e não precisam reler nem
   descompactar a origem. O arquivo fornecido pelo usuário nunca é apagado.

After validation, every launch shows the five-second NextOS identity screen
and then starts the game through its original Unity/Android lifecycle.

Depois da validação, toda abertura mostra por cinco segundos a tela de
identidade do NextOS e inicia o jogo pelo lifecycle Unity/Android original.

## Acceleration choice / Escolha de aceleração

Automatic acceleration is the default. Both choices use Horizon Chase's own
native controller modes and persist across port updates:

- `AUTO_ACCELERATE=on` — automatic acceleration;
- `AUTO_ACCELERATE=off` — manual acceleration: **A** or **RT** accelerates and
  **LT** brakes.

A aceleração automática é o padrão. As duas escolhas usam modos nativos do
próprio Horizon Chase e continuam valendo depois de atualizar o port:

- `AUTO_ACCELERATE=on` — aceleração automática;
- `AUTO_ACCELERATE=off` — aceleração manual: **A** ou **RT** acelera e **LT**
  freia.

To switch, close the game, edit the single matching line in
`horizonchase/userdata/horizonchase.cfg`, and launch again. You may also run,
from inside the `horizonchase/` directory:

Para trocar, feche o jogo, edite a única linha correspondente em
`horizonchase/userdata/horizonchase.cfg` e abra novamente. Também é possível
executar, dentro da pasta `horizonchase/`:

```sh
python3 tools/import_android_save.py --set-acceleration automatic -g .
python3 tools/import_android_save.py --set-acceleration manual -g .
```

In menus, the right stick moves the arrow cursor and **R3** clicks. The cursor
is hidden during races, where the right stick keeps the game's native action.

Nos menus, o analógico direito move o cursor em forma de seta e **R3** clica.
O cursor some durante as corridas, nas quais o analógico direito mantém a ação
nativa do jogo.

## Installed layout / Layout instalado

```text
ports/
├── Horizon Chase.sh
└── horizonchase/
    ├── INSTALLATION.md
    ├── FRAMEWORK-PINS.json
    ├── gamedata/                 # owner-supplied APK/APKM/APKS/XAPK or splits
    ├── prepare-port.sh
    ├── port-env.sh
    ├── nxport.json
    ├── nxextract/
    │   ├── run-extractor.sh
    │   ├── nxextract-runtime-env.sh
    │   ├── nxextract.py
    │   └── nxextract-ui
    ├── extractor.json
    ├── horizonchase-nextos       # public loader
    ├── libastcUtil.so
    ├── libunity.so               # created by NXExtract
    ├── libil2cpp.so              # created by NXExtract
    ├── libmain.so                # created by NXExtract
    ├── bin/                      # created by NXExtract
    ├── Android/                  # created by NXExtract
    └── userdata/                 # persistent save and preferences
```

Release 1.2.2 used the historical loader filename `horizonchase`. Updating the
port package must preserve `userdata/` and the extracted payload; never erase
the game directory merely to update the loader.

O release 1.2.2 usava o nome histórico `horizonchase` para o loader. A
atualização do pacote deve preservar `userdata/` e o conteúdo já extraído;
nunca apague a pasta do jogo apenas para atualizar o loader.
