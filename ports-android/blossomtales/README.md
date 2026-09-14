# Blossom Tales: The Sleeping King — port universal

Runtime que roda a versão Android de **Blossom Tales: The Sleeping King** em
consoles portáteis Linux, pelo padrão PortMaster.

O pacote **não traz o jogo**. Os dados vêm da cópia legal do próprio usuário e
são extraídos no aparelho na primeira execução. Leia `INSTALLATION.md`.

## O que este port é

Um *so-loader*: ele mapeia as bibliotecas nativas Android do jogo no processo,
sobe a MonoVM / .NET for Android, responde a JNI que o jogo espera e entrega ao
MonoGame um contexto GLES2 criado pelo SDL do sistema. Não há emulação, não há
Android rodando por baixo e não há dex sendo interpretado.

## Arquitetura e compatibilidade

| Item | Valor |
|---|---|
| Arquitetura | AArch64 |
| GLIBC exigida | no máximo `GLIBC_2.27` (teto público da casa: 2.30) |
| Gráficos | OpenGL ES 2.0 |
| SDL | **a do sistema**, sempre; o pacote não traz `libSDL*` nem sombreia a do CFW |
| Áudio | OpenAL do sistema |
| Resolução | a que o SDL reportar; o port **não** crava resolução |

## Áudio: por que existe um decodificador embutido

A trilha são 43 arquivos `.m4a` — AAC-LC, 48 kHz, estéreo, em container MP4.
A versão anterior deste port, feita para um sistema específico, decodificava
chamando `ffmpeg`/`ffprobe` do sistema. Isso não vale para um pacote universal:
num aparelho sem essas ferramentas o jogo abre **mudo**, e "abre sem música" é
falha.

O decodificador agora é interno (`src/aac_decoder.c`): **minimp4** para o
container e **FDK-AAC** para o AAC, ligado estaticamente. Nenhum processo
externo, nenhum `system()`, nenhum caminho do dono da máquina.

O alinhamento da saída desconta o `outputDelay` do decodificador **mais** o
`media_time` da *edit list* do MP4, respeita a duração declarada e drena o
decodificador no fim da faixa. Sem isso a faixa começa com ~58 ms de silêncio e
termina 36 ms cedo — audível como costura a cada volta do loop. Medido arquivo
a arquivo: as 43 faixas saem com o **mesmo número de amostras** que o `ffmpeg`
e diferença média de ~6 LSB (−58 dB), que é só arredondamento entre
decodificadores.

## Controles

Os controles vêm do `NEXTOSCONTROLLERS.gptk` da pasta do jogo e são LIDOS EM
TEMPO DE EXECUÇÃO (nxinput 0.11.8): edite as ações à direita para trocar
botões; `null` desliga um botão; `native` deixa o comportamento original. A
lista de ações válidas está em `adapter/adapter-contract.json`. Padrão:

| Controle | Ação (gameplay) | Menu |
|---|---|---|
| A | player.attack (ação/falar/confirmar) | menu.accept |
| B | player.use_item | menu.back |
| X | player.use_tool | nativo |
| Y | player.open_menu | nativo |
| L1 / R1 | player.select_previous / player.select_next | nativo |
| L3 | player.open_journal | nativo |
| START | system.pause | nativo |
| SELECT | system.back | nativo |
| D-pad, analógicos, L2/R2, R3 | nativos (R3 = clique da seta / mapa) | nativos |

O analógico direito move uma seta (P1) e R3 clica; a seta some após 2 s.

Versão 1.4.5 (framework V5): além do mapa vivo `NEXTOS_CONTROLLERS/4`, a
costura identifica a SDL realmente carregada **antes** de tocar no mapping do
CFW. Quando o provider não é provado, a linha fica no ambiente e a própria SDL
a importa sem tradução; quando é provado, a tradução usa a tabela medida. Isso
corrige o caso em que o controle aparecia como conectado, mas A, D-pad e
`SELECT+START` não chegavam ao jogo.

No dArkOS/KMSDRM, o menu cria três FBOs válidos. A 1.4.2 esperava um quarto
antes de procurar o quadro 16:9, desligava sem diagnóstico o compositor e
deixava as barras mesmo com `video.aspect=stretch`. A 1.4.3 passou a examinar
qualquer conjunto não vazio, mas o teste físico revelou que a geometria das
texturas ainda dependia do downscale opcional. A 1.4.4 desacoplou as duas
responsabilidades, mas o teste seguinte mostrou que `GAMEDIR` é protegido pelo
launcher e não exportado ao processo: o settings caía silenciosamente no
padrão. A 1.4.5 lê a pasta física corrente, como o input já fazia, rastreia
somente ID e dimensão nos uploads e aplica `stretch` por padrão. `preserve`
continua sendo a opção explícita para painéis quadrados.

No vídeo, uma fachada de capacidade específica deste port anuncia
`GL_EXT_framebuffer_object` ao MonoGame somente quando as 13 entradas
equivalentes do core GLES estão disponíveis, e resolve os nomes `*EXT` para
essas mesmas funções. Isso permite ao Mesa/Wayland passar pelo gate legado do
MonoGame sem fingir uma implementação parcial; drivers que já oferecem os
nomes EXT continuam intocados.

Desde a versão 1.4.1, o mapa do dono usa o `NEXTOS_CONTROLLERS/4`
(um `[base]` posicional Xbox — A = sul, B = leste, X = oeste, Y = norte —
com `[override.menu]` esparso); os bundles por legenda sumiram. O provider
SDL2 do firmware é identificado pelos bytes mapeados (`NXC6-PROVIDER`) e um
mapping sem fonte provada nunca é reescrito nem injetado. A lógica do hook do
port vive no `adapter-env.sh` selado; `port-env.sh` é semeado uma vez de
`defaults/` e pertence a você. **Vídeo/aspect:** `NEXTOSSETTINGS.txt`
(`NEXTOS_SETTINGS/2`) ganha `video.aspect=auto|engine|preserve|stretch`
(`stretch` é o padrão do pacote; `auto` = engine quando a proporção do painel
coincide com a da imagem 16:9, senão `preserve`); num painel 720×720,
`preserve` mostra a imagem em
720×405 centralizada com barras opacas e `stretch` preenche esticando; a seta
e o toque são transformados pelo mesmo retângulo. O receipt `NX-VIDEO/1`
registra requested/effective/drawable/content rect. O hook do dono pode
exportar `NX_VIDEO_ASPECT` (prevalece sobre o settings).

`SELECT + START` encerra: o port entrega `onPause` (que grava o save) e só
então sai. SELECT num controle e START noutro NUNCA encerram.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/` | fonte do loader, shims e decodificador |
| `build_buster.sh` | build público reproduzível (Debian buster, glibc 2.28) |
| `Dockerfile.builder` | imagem do build |
| `vendor/PINS.txt` | versões e SHA-256 dos componentes de terceiros |
| `devtools/` | ferramentas de bancada (medição, pad sintético, roteiro de entrada) |
| `extractor.json` | receita do NXExtract |
| `nxproject.json` | manifesto V4 do port |

## Build

```sh
./build_buster.sh          # -> blossomtales-nextos
```

O build roda dentro de um container Debian 10 para garantir o teto de GLIBC.
O FDK-AAC é baixado por URL fixa e conferido por SHA-256 antes de compilar
(`vendor/PINS.txt`).

## Licenças

Código do port: GPL-3.0-only (`LICENSE`). Terceiros embutidos e componentes do
sistema: `NOTICE.md` e `SBOM.md`.

## Download

- [blossomtales-v1.4.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/blossomtales-v1.4.5) — `blossomtales.zip`, `blossomtales.zip.sha256`
- [blossomtales-v1.4.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/blossomtales-v1.4.0) — `blossomtales.zip`

- Todas as versões / all versions: [releases?q=blossomtales](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=blossomtales)
- Histórico: 49 downloads no repositório original `blossomtales-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
