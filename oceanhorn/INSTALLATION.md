# Oceanhorn Chronos Dungeon — installation / instalação (BYO-data)

**Language / Idioma:** [English](#english) · [Português](#português)

This package contains **only the port**. The game is yours and is not
distributed here. / Este pacote contém **apenas o port**. O jogo é seu e não é
distribuído aqui.

## English

### 1. Install the ZIP

Install the PortMaster ZIP with the PortMaster application, or unpack it into
your device's ports folder. The archive installs exactly this layout:

```text
ports/Oceanhorn Chronos Dungeon.sh
ports/oceanhorn/
```

On NextOS Elite the launcher goes to `/storage/roms/ports_scripts/` and the
`oceanhorn/` folder to `/storage/roms/ports/`.

### 2. Bring your own game data

Copy the APK/APKM/XAPK of your lawful copy of the game to:

```text
ports/oceanhorn/gamedata/
```

Required owner-data identity (the tested bundle):

- game: **Oceanhorn: Chronos Dungeon**, tested version **4.0b54**;
- package ID: **com.FDGEntertainment.OceanhornChronosDungeon.gp**;
- accepted ABI: **aarch64** (`arm64-v8a`);
- reference container: **242 MB**, SHA-256
  `62e2a182e5f74f10d33467f35289376afb4299ed3588eef542a160d6b221f725`.

The reference hash identifies only the tested copy — it is never the sole
compatibility condition. The NXExtract recipe also validates package identity,
version contract, ABI, tree structure and the critical internal payloads
(`libunity.so`, `libil2cpp.so`, `libmain.so`, `bin/Data`), so other builds of
the same version install with a precise message instead of a fake
"file missing" error. The file name does not matter.

### 3. First run

On the first launch NXExtract validates ABI, sizes and hashes, installs the
data transactionally (progress bar on screen, resumable after a power cut) and
the game starts. Your original file is **never deleted**. Expect roughly
250 MB of installed data plus temporary space during extraction.

**SELECT + START** saves and returns to the frontend. Logs stay next to the
launcher (`log.txt`); a previous valid installation is adopted without asking
for the APK again. Updating the port never touches `gamedata/`, `userdata/` or
the installed game data. To uninstall, delete `ports/oceanhorn/` and the
launcher — saves live under `userdata/` if you want to keep them.

### Memory/performance profiles

`port-env.sh` selects `OCEANHORN_PROFILE`: `auto` (default; `low` on ~1 GB
devices), `low` (half-resolution render with pixel-perfect integer upscale +
memory-saving textures), `medium`, `high` (everything native). See README.

## Português

### 1. Instale o ZIP

Instale o ZIP pelo aplicativo PortMaster, ou descompacte na pasta de ports do
aparelho. O pacote instala exatamente esta estrutura:

```text
ports/Oceanhorn Chronos Dungeon.sh
ports/oceanhorn/
```

No NextOS Elite o launcher vai para `/storage/roms/ports_scripts/` e a pasta
`oceanhorn/` para `/storage/roms/ports/`.

### 2. Traga seus dados do jogo

Copie o APK/APKM/XAPK da sua cópia legal do jogo para:

```text
ports/oceanhorn/gamedata/
```

Identidade obrigatória dos dados do proprietário (o bundle testado):

- jogo: **Oceanhorn: Chronos Dungeon**, versão testada **4.0b54**;
- package ID: **com.FDGEntertainment.OceanhornChronosDungeon.gp**;
- ABI aceita: **aarch64** (`arm64-v8a`);
- container de referência: **242 MB**, SHA-256
  `62e2a182e5f74f10d33467f35289376afb4299ed3588eef542a160d6b221f725`.

O hash de referência identifica somente a cópia testada — nunca é a única
condição de compatibilidade. A receita do NXExtract também valida package,
contrato de versão, ABI, estrutura da árvore e os payloads internos críticos
(`libunity.so`, `libil2cpp.so`, `libmain.so`, `bin/Data`); outra build da mesma
versão instala com mensagem precisa em vez de um falso "falta arquivo". O nome
do arquivo não importa.

### 3. Primeira execução

Na primeira execução o NXExtract valida ABI, tamanhos e hashes, instala os
dados de forma transacional (barra de progresso na tela, retomável após queda
de energia) e o jogo abre. O seu arquivo original **nunca é apagado**. Reserve
cerca de 250 MB para os dados instalados, mais espaço temporário durante a
extração.

**SELECT + START** salva e volta ao frontend. Os logs ficam ao lado do
launcher (`log.txt`); uma instalação anterior válida é adotada sem pedir o APK
de novo. Atualizar o port nunca toca `gamedata/`, `userdata/` nem os dados
instalados. Para desinstalar, apague `ports/oceanhorn/` e o launcher — os
saves moram em `userdata/` se quiser preservá-los.

### Perfis de memória e desempenho

O `port-env.sh` seleciona `OCEANHORN_PROFILE`: `auto` (padrão; vira `low` em
aparelho de ~1 GB), `low` (render na metade da resolução com upscale inteiro
pixel-perfect + texturas econômicas), `medium`, `high` (tudo nativo). Detalhes
no README.
