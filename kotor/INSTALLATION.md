# Installation / Instalação

## 🇬🇧 English

1. Download the release ZIP and extract it into your `ports/` folder so you
   end up with `ports/kotor/` and the `Star Wars KOTOR.sh` launcher next to it.
2. Copy your legally-owned Aspyr Android files into `ports/kotor/gamedata/`:
   the APK plus the OBB cache (a `.zip` containing
   `main.53.com.aspyr.swkotor.obb` and `patch.53.com.aspyr.swkotor.obb`, or
   the two loose `.obb` files).
3. Optional: select the language in the visible `Star Wars KOTOR.sh` launcher.
   Change `NXPORT_LANGUAGE=${NXPORT_LANGUAGE:-en}` to one of `en`, `fr`, `it`,
   `de`, `es` or `pl`. An exported `NXPORT_LANGUAGE` value takes precedence.
   Unsupported values safely fall back to English; this Android build does
   not contain Portuguese or Russian language data.
4. Launch the game from your frontend. The installer runs in the foreground,
   shows progress, and only starts the game after the payload is fully
   validated. Interrupted installs resume; wrong packages are named
   explicitly (e.g. a KOTOR II APK is rejected as a different game).
5. Your source files in `gamedata/` are never deleted. After a successful
   install you may remove them yourself to free space.

The package intentionally has no `run.sh`: the visible PortMaster launcher
is a self-contained render of the pinned `nxbootstrap` source and loads the
declarative `nxport.json` contract directly.

Launcher, extraction and runtime diagnostics are written to `kotor/log.txt`;
the previous run is retained as `kotor/log.prev.txt`.

## 🇧🇷 Português

1. Baixe o ZIP da release e extraia na sua pasta `ports/`, ficando com
   `ports/kotor/` e o atalho `Star Wars KOTOR.sh` ao lado.
2. Copie seus arquivos legais da versão Android da Aspyr para
   `ports/kotor/gamedata/`: o APK mais o cache OBB (um `.zip` contendo
   `main.53.com.aspyr.swkotor.obb` e `patch.53.com.aspyr.swkotor.obb`, ou os
   dois `.obb` soltos).
3. Opcional: escolha o idioma no launcher visível `Star Wars KOTOR.sh`.
   Troque `NXPORT_LANGUAGE=${NXPORT_LANGUAGE:-en}` por `en`, `fr`, `it`, `de`,
   `es` ou `pl`. Uma variável `NXPORT_LANGUAGE` exportada tem prioridade.
   Valores inválidos voltam com segurança para inglês; esta versão Android
   não contém dados em português ou russo.
4. Abra o jogo pelo frontend. O instalador roda em primeiro plano, mostra o
   progresso e só inicia o jogo com o payload totalmente validado.
   Instalação interrompida retoma; pacote errado é nomeado explicitamente
   (um APK do KOTOR II, por exemplo, é rejeitado como jogo diferente).
5. Seus arquivos em `gamedata/` nunca são apagados. Depois da instalação você
   pode removê-los manualmente para liberar espaço.

O pacote não possui `run.sh`: o launcher visível do PortMaster é gerado como
arquivo autocontido pelo fonte `nxbootstrap` fixado e carrega diretamente o
contrato declarativo `nxport.json`.

Os diagnósticos do launcher, extrator e runtime ficam em `kotor/log.txt`; a
execução anterior é preservada em `kotor/log.prev.txt`.
