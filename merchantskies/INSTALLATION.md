# Merchant of the Skies — Installation / Instalação

## English

1. Install the release ZIP through PortMaster, or extract it at the ROM root so
   `Merchant of the Skies.sh` is in `ports/` and this directory is
   `ports/merchantskies/`.
2. Create `ports/merchantskies/gamedata/` if it does not exist.
3. Copy your legally obtained Android copy of the game (APK, APKM, APKS or
   XAPK) into `gamedata/`; the filename is irrelevant.
4. Start **Merchant of the Skies**. NXExtract validates the package
   structurally, selects the AArch64 payload, extracts the Unity engine
   libraries and the `assets/bin/Data` tree, and commits the installation
   transactionally. The first boot needs about 400 MB free on the card.

Accepted owner data (the copy family this port was validated against):

- Game: Merchant of the Skies **2.0** (Coldwild Games)
- Package ID: `com.astralride.mots`
- ABI used by this port: `arm64-v8a` (AArch64 only)
- The recipe is structural: it validates package, ABI, ELF identity of the
  engine libraries and the critical Unity data payloads. No container
  filename, signature, size or hash is ever an acceptance condition, so any
  legitimate build of this version family installs.

Installed layout:

```text
ports/
├── Merchant of the Skies.sh
└── merchantskies/
    ├── merchantskies-nextos      # loader
    ├── nxsplash-nextos
    ├── gamedata/                 # place the owner's APK/APKM/APKS/XAPK here
    ├── lib/                      # installed by NXExtract
    ├── assets/bin/Data/          # installed by NXExtract
    ├── defaults/                 # immutable controller/settings defaults
    ├── NEXTOSSETTINGS.txt        # your editable copy (language, options)
    └── NEXTOSCONTROLLERS.gptk    # your editable copy (controls)
```

Logs live in `ports/merchantskies/log.txt` and `nxextract.log`. Updating the
port never touches `gamedata/`, saves, or your edited settings/controller
files. Uninstalling is deleting `Merchant of the Skies.sh` and the
`merchantskies/` directory; keep `gamedata/` and the save directory if you
want to reinstall later.

This build is a **prerelease/test**: only the devices and firmwares listed in
README.md are proven.

## Português

1. Instale o ZIP pelo PortMaster, ou extraia na raiz de ROMs de modo que
   `Merchant of the Skies.sh` fique em `ports/` e este diretório seja
   `ports/merchantskies/`.
2. Crie `ports/merchantskies/gamedata/` se não existir.
3. Copie a sua cópia Android legalmente obtida do jogo (APK, APKM, APKS ou
   XAPK) para `gamedata/`; o nome do arquivo não importa.
4. Abra **Merchant of the Skies**. O NXExtract valida o pacote de forma
   estrutural, seleciona o payload AArch64, extrai as bibliotecas da engine
   Unity e a árvore `assets/bin/Data`, e conclui a instalação de forma
   transacional. O primeiro boot precisa de cerca de 400 MB livres no cartão.

Dados do proprietário aceitos (a família de cópias validada por este port):

- Jogo: Merchant of the Skies **2.0** (Coldwild Games)
- Package ID: `com.astralride.mots`
- ABI usada por este port: `arm64-v8a` (somente AArch64)
- A receita é estrutural: valida package, ABI, identidade ELF das bibliotecas
  da engine e os payloads críticos de dados da Unity. Nome de arquivo,
  assinatura, tamanho ou hash do container jamais são condição de aceitação,
  então qualquer build legítima desta família de versão instala.

Estrutura instalada: a mesma do bloco em inglês acima.

Os logs ficam em `ports/merchantskies/log.txt` e `nxextract.log`. Atualizar o
port nunca toca `gamedata/`, saves, nem os seus arquivos editados de
configuração/controles. Desinstalar é apagar `Merchant of the Skies.sh` e o
diretório `merchantskies/`; preserve `gamedata/` e o diretório de save se
quiser reinstalar depois.

Este pacote é **prerelease/teste**: somente os devices e firmwares listados no
README.md estão comprovados.
