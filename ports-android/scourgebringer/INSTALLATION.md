# ScourgeBringer 1.0.0-test.8 — community test

## Português

APKs exatos validados por este teste:

| Jogo/versão | Package ID | ABI | Tamanho | SHA-256 |
|---|---|---|---:|---|
| ScourgeBringer 1.61.16, assembly store clássico | `com.pid.scourgebringer` | `arm64-v8a` | 154.803.705 bytes | `6ee2082eebaed3d3ddb736295cc38760edb2f4f74b29ea1f2d424c7f9e15fd1e` |
| ScourgeBringer 1.61 b19, `libassemblies.arm64-v8a.blob.so` | `com.pid.scourgebringer` | `arm64-v8a` | 141.799.538 bytes | `3a5818273e3b0dba528a69e4a0321378fcb43bf1dc6a10d95c56c15dfef277d3` |

Esta versão substitui a `1.0.0-test.7`. Ela preserva o bridge completo de sinais
e os providers de baixa glibc da test.7. A test.8 corrige a seleção do menu
principal: a lógica Android ainda aceitava direita para uma entrada Discord
que não é desenhada, deixando as opções visíveis sem destaque. O adapter agora
restaura somente essa seleção invisível para a última opção desenhada; nenhum
botão ou eixo é filtrado, e cima/baixo, Configurações, diálogos e controles de
gameplay continuam nativos. Este ZIP
exato ainda precisa de teste físico em glibc 2.30 antes de declarar essa família
suportada.

O nome do arquivo é livre e não comprova compatibilidade. O NXExtract confere
o pacote, a ABI, uma faixa flexível da árvore de conteúdo, os 12 idiomas e as
bibliotecas essenciais. Isso permite b17, b18 e outras variantes 1.61.x com
pequenas diferenças internas, desde que satisfaçam o mesmo contrato seguro; um
APK apenas renomeado continua sendo rejeitado.

1. Extraia o ZIP na pasta `ports` das ROMs, mantendo `ScourgeBringer.sh` na
   raiz e `scourgebringer/` ao lado.
2. Coloque uma cópia legal de um APK compatível em
   `scourgebringer/gamedata/`.
3. Abra `ScourgeBringer` no menu Ports. A primeira execução valida e extrai os
   dados; as próximas reutilizam a instalação selada.

Idiomas disponíveis: inglês, francês, italiano, alemão, espanhol, russo,
português do Brasil, chinês simplificado, japonês, coreano, polonês e chinês
tradicional. O idioma pode ser trocado nas opções do próprio jogo. Para definir
o idioma inicial do launcher, edite somente `GAME_LANGUAGE="auto"` no começo de
`ScourgeBringer.sh`, usando um código listado no comentário dessa linha.

Configurações e progresso ficam em
`scourgebringer/data/.config/.isolated-storage/`. Ao atualizar uma instalação
antiga, o port copia os arquivos conhecidos da antiga pasta `libs/.config` sem
apagar a origem e sem sobrescrever um save já migrado.

Se aparecer `payload tree monogame-content failed count/size validation`, o
pacote foi reconhecido, mas a variante não possui o conjunto de dados seguro
esperado. Não use assets pré-extraídos de outra pessoa.

## English

Exact APKs validated for this test:

| Game/version | Package ID | ABI | Size | SHA-256 |
|---|---|---|---:|---|
| ScourgeBringer 1.61.16, classic assembly store | `com.pid.scourgebringer` | `arm64-v8a` | 154,803,705 bytes | `6ee2082eebaed3d3ddb736295cc38760edb2f4f74b29ea1f2d424c7f9e15fd1e` |
| ScourgeBringer 1.61 b19, `libassemblies.arm64-v8a.blob.so` | `com.pid.scourgebringer` | `arm64-v8a` | 141,799,538 bytes | `3a5818273e3b0dba528a69e4a0321378fcb43bf1dc6a10d95c56c15dfef277d3` |

This version supersedes `1.0.0-test.7`. It retains the complete signal bridge
and test.7's old-glibc providers. Test.8 fixes main-menu selection: the Android
logic still moved right to a Discord entry that this build does not draw,
leaving no visible choice highlighted. The adapter now restores only that
hidden selection to the last drawn entry; it filters no button or axis, while
up/down, Settings, dialogs and gameplay controls remain native. This exact ZIP still requires
physical validation on glibc 2.30 before that family can be claimed.

The filename is unrestricted and does not prove compatibility. NXExtract
checks the package, ABI, a flexible content-tree range, all 12 languages and
the essential runtime libraries. This allows b17, b18 and other 1.61.x
variants with small internal differences when they satisfy the same safe
contract; renaming an APK cannot bypass validation.

1. Extract the ZIP into the ROMs `ports` directory, keeping
   `ScourgeBringer.sh` at the top level beside `scourgebringer/`.
2. Put a legally obtained compatible APK in `scourgebringer/gamedata/`.
3. Start `ScourgeBringer` from Ports. The first launch validates and extracts
   the data; later launches reuse the sealed installation.

Available languages are English, French, Italian, German, Spanish, Russian,
Brazilian Portuguese, Simplified Chinese, Japanese, Korean, Polish and
Traditional Chinese. Change language in the game's own options. To select the
launcher's initial language, edit only `GAME_LANGUAGE="auto"` near the top of
`ScourgeBringer.sh`, using a code listed in its comment.

Settings and progress are stored in
`scourgebringer/data/.config/.isolated-storage/`. When upgrading an older
installation, the port copies known files from the former `libs/.config`
location without deleting the source or overwriting an already migrated save.

If `payload tree monogame-content failed count/size validation` appears, the
package was recognized but that variant lacks the expected safe data set. Do
not use pre-extracted assets from another user.
