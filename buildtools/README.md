# buildtools

- `manifest.json` — fonte da verdade do catálogo: um item por port (`key`, `title`, `folder`, `release_tag`, `asset`, `genres`, `availability`, `screenshot`, `portmaster`). Para publicar uma versão nova: crie a release `<jogo>-vX.Y.Z` com o zip, atualize `release_tag`/`asset` aqui e faça push (ou rode o workflow *Catálogo*).
- `build_catalog.py` — lê o manifesto, baixa os zips das releases versionadas, extrai `port.json` de dentro deles e gera `docs/ports.json` (site), `catalog/ports.json` + `catalog/images.zip` (PortMasterV3). Com `--upload`, publica tudo na release rolante `ports-latest` com nomes fixos `<port>.zip`.

Nenhum código de port entra neste repositório: só os zips já publicados, READMEs e screenshots (`ports-*/<jogo>/<port>.screenshot.jpg`).
