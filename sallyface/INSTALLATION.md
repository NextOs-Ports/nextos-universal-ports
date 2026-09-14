# Sally Face — Installation / Instalação

## English

1. Install the release ZIP through PortMaster, or extract it at the ROM root so
   `Sally Face.sh` is in `ports/` and this directory is `ports/sallyface/`.
2. Create `ports/sallyface/gamedata/` if it does not exist.
3. Copy your legally obtained Android copy of the game (APK, APKM, APKS or
   XAPK) into `gamedata/`; the filename is irrelevant.
4. Start **Sally Face**. NXExtract validates the package structurally, selects
   the AArch64 payload, extracts the Unity engine libraries and the complete
   `assets/bin/Data` tree (including the asset pack the game streams at
   runtime), and commits the installation transactionally. The first boot
   needs about 1.5 GB free on the card.

Reference owner data (identification only, never an acceptance lock):

- Game: Sally Face **1.5.53** (Portable Moose)
- Package ID: `com.portablemoose.sallyface`
- ABI used by this port: `arm64-v8a` (AArch64 only)
- Reference APK container size: `748326788` bytes
- Reference APK SHA-256:
  `25b912a6db96f9562781ceb851c11bc287c18fc39f6a679a43bf07fd496f68ea`
- Acceptance uses the package family, AArch64 ABI, required structure, bounded
  ELF/Unity payload contracts and authenticated internal patch selectors. It
  never uses the outer filename, signature, exact version, exact size or full
  APK SHA-256 as an acceptance condition. Renamed or compatibly repackaged
  copies remain accepted.

NXExtract transactionally unbundles the selected payload and applies only the
authenticated GLES2 retag profile. At runtime, the loader streams the prepared
assets and applies the selected quality policy plus the GPU's mandatory size
clamp. Nothing changes the owner copy inside `gamedata/`.

Saves live in `ports/sallyface/home/`. SELECT + START quits and saves.
Updating the port never touches `gamedata/`, saves, or your edited
settings/controller files.

`NEXTOSSETTINGS.txt` accepts `quality=auto|low|medium|high`. `auto` selects by
installed RAM; `low` is the memory-saving profile for 1 GB-class devices,
`medium` balances memory and quality, and `high` preserves original assets.

After the data gate, the canonical bilingual NEXT OS / RETRO ELITE splash is
shown for five seconds before the game. The physical release scope and its
gameplay limits are listed in README.md.

## Português

1. Instale o ZIP pelo PortMaster, ou extraia na raiz de ROMs de modo que
   `Sally Face.sh` fique em `ports/` e este diretório seja `ports/sallyface/`.
2. Crie `ports/sallyface/gamedata/` se não existir.
3. Copie a sua cópia Android legalmente obtida do jogo (APK, APKM, APKS ou
   XAPK) para `gamedata/`; o nome do arquivo não importa.
4. Abra **Sally Face**. O NXExtract valida o pacote de forma estrutural,
   seleciona o payload AArch64, extrai as bibliotecas da engine Unity e a
   árvore `assets/bin/Data` completa (incluindo o asset pack que o jogo lê em
   streaming), e conclui a instalação de forma transacional. O primeiro boot
   precisa de cerca de 1,5 GB livres no cartão.

Dados de referência (somente identificação, nunca trava de aceitação):

- Jogo: Sally Face **1.5.53** (Portable Moose)
- Package ID: `com.portablemoose.sallyface`
- ABI usada por este port: `arm64-v8a` (somente AArch64)
- Tamanho do container APK de referência: `748326788` bytes
- SHA-256 do APK de referência:
  `25b912a6db96f9562781ceb851c11bc287c18fc39f6a679a43bf07fd496f68ea`
- A aceitação usa família do package, ABI AArch64, estrutura obrigatória,
  contratos limitados dos ELFs/payloads Unity e seletores internos
  autenticados. Nome externo, assinatura, versão exata, tamanho exato e SHA
  integral do APK nunca decidem a aceitação. Cópias renomeadas ou
  reempacotadas de forma compatível continuam aceitas.

O NXExtract desmonta o payload de forma transacional e aplica somente o perfil
GLES2 interno autenticado. Em runtime, o loader lê os assets preparados em
streaming e aplica a qualidade escolhida mais o clamp de tamanho obrigatório
da GPU. Nenhum byte da cópia em `gamedata/` é alterado.

Saves ficam em `ports/sallyface/home/`. SELECT + START sai salvando.
Atualizar o port nunca toca `gamedata/`, saves, nem os seus arquivos editados
de configuração/controles.

`NEXTOSSETTINGS.txt` aceita `quality=auto|low|medium|high`. `auto` escolhe pela
RAM instalada; `low` economiza memória em aparelhos da classe de 1 GB,
`medium` equilibra memória/qualidade e `high` preserva os assets originais.

Depois do gate dos dados, a NXSplash canônica bilíngue NEXT OS / RETRO ELITE
aparece por cinco segundos antes do jogo. O escopo físico da release e os
limites de gameplay estão descritos no README.md.
