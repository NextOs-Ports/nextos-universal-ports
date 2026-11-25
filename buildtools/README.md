# buildtools

- `manifest.json` — fonte da verdade do catálogo: um item por port (`key`, `title`, `folder`, `release_tag`, `asset`, `genres`, `availability`, `screenshot`, `portmaster`). Para publicar uma versão nova: crie a release `<jogo>-vX.Y.Z` com o zip, atualize `release_tag`/`asset` aqui e faça push (ou rode o workflow *Catálogo*).
- `build_catalog.py` — lê o manifesto, baixa os zips das releases versionadas, extrai `port.json` de dentro deles e gera `docs/ports.json` (site), `catalog/ports.json` + `catalog/images.zip` (PortMasterV3). Com `--upload`, publica tudo na release rolante `ports-latest` com nomes fixos `<port>.zip`.

Nenhum código de port entra neste repositório: só os zips já publicados, READMEs e screenshots (`ports-*/<jogo>/<port>.screenshot.jpg`).

## Site NextOS Ports

O workflow **Site NextOS Ports** publica o site e o `ports.json` no GitHub Pages após mudanças na página, na documentação dos ports ou nas Releases. A sincronização diária também confere alterações nos anexos. O gerador lê a API do GitHub e vincula o ZIP da release versionada.

Para um port novo aparecer automaticamente:

1. Adicione `ports-<plataforma>/<jogo>/README.md` em `main`, com o nome do jogo no primeiro título. Use um nome de pasta único, em minúsculas.
2. Use `<jogo>.screenshot.jpg` para a imagem e `INSTALLATION.md` para o guia detalhado, quando disponíveis.
3. Publique uma release estável `<jogo>-vX.Y.Z` e anexe `<jogo>.zip` com o port sem os dados do jogo.

Para nomes fora desse padrão, inclua o port no manifesto existente com o nome exato da tag e do ZIP. Para ports já listados, o site aceita versões estáveis mais novas com o ZIP canônico ou com o nome do ZIP registrado, incluindo a troca do número da versão no nome. O manifesto continua definindo a seleção distribuída em `ports-latest` para o PortMaster.

Os filtros de aparelho e firmware usam o campo opcional `verification` de cada port no manifesto. Informe em `digest` o SHA-256 do ZIP testado no formato do GitHub (`sha256:…`) e em `tested_on` os pares de `device` e `firmware` documentados nas provas da versão. O site mostra esses pares enquanto eles corresponderem ao ZIP publicado.

O campo opcional `variants` apresenta ZIPs adicionais na ficha de um port. Cada entrada usa `title`, `version`, `release_tag` e `asset`. O download principal continua seguindo a release padrão. A ficha identifica como prévia as variantes marcadas como pre-release no GitHub.
