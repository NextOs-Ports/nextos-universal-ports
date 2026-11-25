# Brotato: Premium — installation / instalação

## English

Install the PortMaster ZIP with the PortMaster application. The archive installs
exactly this layout:

```text
ports/Brotato.sh
ports/brotato/
```

Owner data required by this port:

- game name and tested version: **Brotato: Premium 1.3.489**;
- package ID: **com.brotato.shooting.survivors.games.paid.android**;
- accepted ABI: **aarch64** (`arm64-v8a` inside the Android package);
- reference container size and SHA-256: **175043547 bytes**,
  `990eb207e00a65e8f6a1fddafdff897237106950a4f3fdd734ca60335ca479f6`.

That hash identifies only the copy this port was tested with; it is never the
only compatibility condition. The extraction recipe also validates the package
identity and version contract, ABI, exact native libraries, pinned shader
inputs, and the complete selected runtime tree by count, size and tree
fingerprint. A legitimately renamed or repackaged container can therefore pass
when it carries the same compatible internal game payload; a different game,
ABI or internal build fails closed. Do not publish the original container file
name or any download source.

First run:

1. copy the Android package you lawfully own into `ports/brotato/gamedata/`
   (the file name does not matter, and the package is never deleted);
2. launch `Brotato.sh` from the frontend;
3. NXExtract shows its own screen while it validates the package, extracts the
   three native libraries and the whole asset tree, and then prepares the data
   on the device: the shaders of your own copy are marked as GLES2 so the
   handheld GPU receives a renderer it can compile. The preparation touches 32
   files (about 5 MiB) and needs no network;
4. when the extractor reports success, the game starts. Later launches skip
   extraction entirely.

Space: about **1.4 GiB free** during the first run (the package you supply plus
the extracted payload of roughly 740 MiB), and about **740 MiB** afterwards.

Logs: `ports/brotato/nxextract.log` for the installation and
`ports/brotato/log.txt` for the game.

Updating: install the new ZIP over the old one. The extracted payload and the
save are kept; NXExtract re-validates them and only re-extracts if the recipe
changed. Release 1.0.6 retains the Abyssal Terrors owned/purchased state and
the exact X55 A/B/R3 profile, restores click plus hold-and-drag/scroll, and
allows A/B/X/Y, L1/R1, L2/R2, L3 and R3 to click only outside a wave. It also
serializes START with the single Android pointer, limits pause/resume touches to
the verified fight/pause screens, makes the main-menu Exit confirmation use the
safe lifecycle, keeps the bundled EGL provider repair, and launches only
`brotato-nextos`. The texture
profile is selected by editing `BROTATO_TEXTURE_PROFILE` in
`ports/brotato/port-env.sh`; `low` is the default, `medium` reduces fewer large
textures, and `high` preserves the original textures. Profiles never change
window resolution. The default runtime profile also applies the game's internal
quality level 0 in memory, 0.80 render scale, disabled HDR/shadows, hidden damage
numbers and disabled camera shake. An experimental between-wave low-memory
request remains available for diagnostics but is off by default because its
first physical measurement did not recover memory. This is a first measured
performance pass and can be refined further. Set
`BROTATO_EXPERIMENTAL_LOWMEM=1` in `port-env.sh` only for a comparison test;
the default is `0`. Uninstalling
through PortMaster removes the port directory, so copy
`ports/brotato/home/` first if you want to keep the save.

This update does not change the required owner data. It does update the
NXExtract recipe to accept equivalent packaging of the same pinned internal
payload, so the next launch re-validates the installed data and may perform one
new extraction; the save is preserved.

Saves live in `ports/brotato/home/`. The Android package and the extracted game
data are never uploaded, shared or included in this project.

## Português

Instale o ZIP pelo aplicativo PortMaster. O pacote instala exatamente esta
estrutura:

```text
ports/Brotato.sh
ports/brotato/
```

Dados do proprietário exigidos por este port:

- nome e versão testada do jogo: **Brotato: Premium 1.3.489**;
- package ID: **com.brotato.shooting.survivors.games.paid.android**;
- ABI aceita: **aarch64** (`arm64-v8a` dentro do pacote Android);
- tamanho e SHA-256 do container de referência: **175043547 bytes**,
  `990eb207e00a65e8f6a1fddafdff897237106950a4f3fdd734ca60335ca479f6`.

Esse hash identifica apenas a cópia com que o port foi testado e nunca é a única
condição de compatibilidade: a receita também valida a identidade e o contrato
de versão do pacote, a ABI, as bibliotecas nativas exatas, as entradas de shader
fixadas e toda a árvore de runtime selecionada por contagem, tamanho e impressão
digital. Assim, um container legitimamente renomeado ou reempacotado pode passar
se trouxer o mesmo payload interno compatível; outro jogo, ABI ou build interna
falha fechado. Não publique o nome original do arquivo nem qualquer origem de
download.

Primeira abertura:

1. copie para `ports/brotato/gamedata/` o pacote Android que você possui
   legalmente (o nome do arquivo não importa e o pacote nunca é apagado);
2. abra o `Brotato.sh` pelo frontend;
3. o NXExtract mostra a própria tela enquanto valida o pacote, extrai as três
   bibliotecas nativas e a árvore de assets e depois prepara os dados no
   aparelho: os shaders da sua cópia são marcados como GLES2 para a GPU do
   portátil receber um renderer que ela consegue compilar. A preparação mexe em
   32 arquivos (cerca de 5 MiB) e não usa rede;
4. quando o extrator informar sucesso, o jogo abre. As aberturas seguintes não
   repetem a extração.

Espaço: cerca de **1,4 GiB livres** na primeira abertura (o pacote que você
forneceu mais o payload extraído de ~740 MiB) e cerca de **740 MiB** depois.

Registros: `ports/brotato/nxextract.log` para a instalação e
`ports/brotato/log.txt` para o jogo.

Atualizar: instale o ZIP novo por cima. O payload extraído e o save são
preservados; o NXExtract revalida e só extrai de novo se a receita mudar.
A versão 1.0.6 mantém o estado de propriedade/compra da expansão Abyssal
Terrors e o perfil exato A/B/R3 do X55, restaura clique e também
segurar-e-arrastar/rolar, e deixa A/B/X/Y, L1/R1, L2/R2, L3 e R3 clicarem
somente fora da wave. Ela também serializa o START com o único ponteiro Android,
limita os toques de pausa/retorno às telas de luta/pausa comprovadas, faz a
confirmação Sair do menu inicial usar o ciclo de vida seguro, mantém o reparo
EGL já incluído e inicia somente
`brotato-nextos`. O perfil de texturas é escolhido editando
`BROTATO_TEXTURE_PROFILE` em `ports/brotato/port-env.sh`; `low` é o padrão,
`medium` reduz menos texturas grandes e `high` preserva as texturas originais.
Os perfis não mudam a resolução da janela. O perfil de runtime padrão também
aplica em memória o nível interno de qualidade 0 do jogo, render scale 0,80,
HDR/sombras desligados, números de dano ocultos e tremor de câmera desligado.
Uma solicitação experimental de pouca memória entre waves continua disponível
para diagnóstico, mas fica desligada por padrão porque a primeira medição física
não recuperou memória. Esta é uma primeira etapa medida e ainda pode ser
refinada. Use `BROTATO_EXPERIMENTAL_LOWMEM=1` em `port-env.sh` somente num
teste comparativo; o padrão é `0`. Desinstalar pelo
PortMaster apaga a pasta do port — copie antes o
`ports/brotato/home/` se quiser guardar o save.

Esta atualização não altera os dados exigidos do proprietário. Ela atualiza a
receita do NXExtract para aceitar empacotamentos equivalentes do mesmo payload
interno fixado; por isso, a próxima abertura revalida os dados instalados e pode
fazer uma nova extração. O save é preservado.

Os saves ficam em `ports/brotato/home/`. O pacote Android e os dados extraídos
do jogo nunca são enviados, compartilhados ou incluídos neste projeto.
