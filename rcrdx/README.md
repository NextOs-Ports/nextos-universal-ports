# Retro City Rampage DX — NextOS/PortMaster

## Português

Port nativo AArch64 que carrega a biblioteca Android original de **Retro City
Rampage DX** e reproduz o fluxo real do aplicativo: construtores, `JNI_OnLoad`,
superfície, `nativeInit` e `SDL_main`. O jogo e seus dados não são distribuídos.

### Compatibilidade e arquitetura

- framework: nxbootstrap 0.6.14, NXExtract 1.2.9 e NXSplash 0.1.2;
- vídeo: caminho GLES2 SDL/KMSDRM para o alvo ArkOS e EGL/fbdev preservado no Mali-450;
- áudio: ponte do AudioTrack Android para o SDL do sistema, sem fixar backend;
- entrada: controle nativo do jogo com mapeamento SDL;
- saída: `SELECT + START` solicita `nativePause` e `nativeQuit`;
- executável Linux AArch64 com requisito máximo `GLIBC_2.27`.

### Controles

- D-pad/analógico esquerdo: mover e navegar;
- A: confirmar/ação;
- B: voltar;
- X/Y e gatilhos: ações do jogo;
- SELECT + START: sair com segurança.

Leia `INSTALLATION.md` antes da primeira abertura. O NXExtract valida o package,
ABI e os arquivos internos antes de publicar os dados de forma transacional.

## English

Native AArch64 port that loads the original Android library for **Retro City
Rampage DX** and follows the application's real lifecycle: constructors,
`JNI_OnLoad`, surface callbacks, `nativeInit`, and `SDL_main`. The game and its
data are not distributed.

### Compatibility and architecture

- framework: nxbootstrap 0.6.14, NXExtract 1.2.9, and NXSplash 0.1.2;
- video: an SDL/KMSDRM GLES2 path for the ArkOS target, with the proven Mali-450 EGL/fbdev path kept;
- audio: Android AudioTrack bridge to system SDL without forcing a backend;
- input: the game's native controller path with SDL mappings;
- exit: `SELECT + START` requests `nativePause` and `nativeQuit`;
- AArch64 Linux executable requiring at most `GLIBC_2.27`.

Read `INSTALLATION.md` before the first launch. NXExtract validates the package,
ABI, and internal payload before publishing the data transactionally.

## Download

- Última versão: [rcrdx-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/rcrdx-v1.0.0) — `rcrdx.zip` (227.528 bytes)
- Todas as versões: [releases?q=rcrdx](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=rcrdx)
- Histórico: 66 downloads no repositório original (até 13/09/2026).

Retro City Rampage DX remains the property of its respective owner. The package
does not include the game or its data (BYO-data).
