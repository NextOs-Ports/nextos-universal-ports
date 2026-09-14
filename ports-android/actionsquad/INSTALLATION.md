# Door Kickers: Action Squad — Installation / Instalação

## English

1. Install the release ZIP through PortMaster, or extract it at the ROM root so
   `Action Squad.sh` is in `ports/` and this directory is
   `ports/actionsquad/`.
2. Create `ports/actionsquad/gamedata/` if it does not exist.
3. Copy your legally obtained Android APK into `gamedata/`; its filename is
   irrelevant.
4. Start **Door Kickers: Action Squad**. NXExtract validates the package,
   selects only AArch64, extracts the engine library and complete asset tree,
   validates them, and commits the installation transactionally. The APK is
   retained for future verification.

Accepted owner data:

- Game: Door Kickers: Action Squad 1.2.4
- Package ID: `com.khg.actionsquad`
- versionCode: `10241`
- ABI used by this port: `arm64-v8a` (AArch64 only)
- APK size: `61225272` bytes
- APK SHA-256: `53763a026dfdf0bbd96f4dc1aef6168bebbee55e313a1fde7146abde3f1c3bc3`
- Extracted `libAndroidEntryPoint.so`: `4654112` bytes, SHA-256
  `d97e40f99e788ea13097e54e4726d5becd3788e93cae90a698ddb5fbaa773f41`
- Extracted `assets/all/`: 831 files, `103830815` bytes

Installed layout:

```text
ports/
├── Action Squad.sh
└── actionsquad/
    ├── actionsquad-nextos        # loader
    ├── nxsplash-nextos
    ├── gamedata/                 # place the owner's APK here
    ├── libAndroidEntryPoint.so   # installed by NXExtract
    ├── assets/all/               # installed by NXExtract
    ├── alsoft.conf
    ├── README.md
    └── INSTALLATION.md
```

Keep `gamedata/` and `userdata/` when updating because the engine stores
settings and progress there.

## Português

1. Instale o ZIP da release pelo PortMaster ou extraia-o na raiz das ROMs,
   deixando `Action Squad.sh` em `ports/` e esta pasta em
   `ports/actionsquad/`.
2. Crie `ports/actionsquad/gamedata/` caso ela ainda não exista.
3. Copie para `gamedata/` o APK Android obtido legalmente; o nome do arquivo não
   importa.
4. Abra **Door Kickers: Action Squad**. O NXExtract valida o pacote, escolhe
   somente AArch64, extrai a biblioteca da engine e todos os assets, valida o
   resultado e publica a instalação de forma transacional. O APK é preservado
   para verificações futuras.

Dados do dono aceitos:

- Jogo: Door Kickers: Action Squad 1.2.4
- Package ID: `com.khg.actionsquad`
- versionCode: `10241`
- ABI usada pelo port: `arm64-v8a` (somente AArch64)
- Tamanho do APK: `61225272` bytes
- SHA-256 do APK: `53763a026dfdf0bbd96f4dc1aef6168bebbee55e313a1fde7146abde3f1c3bc3`
- `libAndroidEntryPoint.so` extraída: `4654112` bytes, SHA-256
  `d97e40f99e788ea13097e54e4726d5becd3788e93cae90a698ddb5fbaa773f41`
- `assets/all/` extraída: 831 arquivos, `103830815` bytes

Layout instalado:

```text
ports/
├── Action Squad.sh
└── actionsquad/
    ├── actionsquad-nextos        # loader
    ├── nxsplash-nextos
    ├── gamedata/                 # coloque aqui o APK do dono
    ├── libAndroidEntryPoint.so   # instalada pelo NXExtract
    ├── assets/all/               # instalada pelo NXExtract
    ├── alsoft.conf
    ├── README.md
    └── INSTALLATION.md
```

Preserve `gamedata/` e `userdata/` nas atualizações porque a engine grava nelas
as configurações e o progresso.
