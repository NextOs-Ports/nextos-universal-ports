# Mega Man W — installation / instalação

**Language / Idioma:** [English](#english) · [Português](#português)

This package contains **no game data**. Mega Man W is a free fan game and you
bring your own copy; the port installs it for you on the first launch.

Este pacote **não contém dados do jogo**. Mega Man W é um fan game gratuito e
você traz a sua própria cópia; o port a instala sozinho na primeira abertura.

---

## English

### 1. Install the port

1. Copy `mmw.zip` to your device and let **PortMaster** install it (recommended),
   or unzip the complete archive into your ports folder so that you end up with:

   ```text
   ports/Mega Man W.sh
   ports/mmw/
   ports/mmw/.nxruntime/
   ports/mmw/.nxruntime/generations/
   ```

2. Do not rename the launcher or the `mmw` folder. The hidden `.nxruntime`
   directory and its complete `generations/` closure are authenticated runtime
   files, not a cache. Never copy only the visible files or only the files shown
   by a source commit.

### Safe manual repacking

If you want to add your own data and zip the port again for personal
installation, first extract the original release in full, add data only under
`mmw/gamedata/`, and recreate the archive with both `Mega Man W.sh` and `mmw/`
at its root. Use an archive tool that includes hidden files. A shell wildcard
such as `*` normally omits `mmw/.nxruntime`, producing a package that can appear
complete but cannot launch after installation.

Before moving the repacked archive, inspect it and confirm that the entire
`mmw/.nxruntime/generations/` tree is still present. Do not synthesize, prune or
mix generations from different releases.

### 2. Bring your own game data

Download the **Linux** distribution of **Mega Man W** (release 1.0.6, revision 1)
from the author's official page. Then put **either** of these inside `ports/mmw/gamedata/`:

- the whole Linux `.zip` exactly as you downloaded it (recommended), or
- just the `.pck` file taken out of it, under any name you like.

If you unpack the `.zip` yourself, the `.pck` must sit **directly** inside
`gamedata/`. The port does not look inside sub-folders, so the `linux/` folder
that comes in the archive has to go:

```text
ports/mmw/gamedata/mega-man-w-linux.zip ✅ the archive as downloaded
ports/mmw/gamedata/mmw.pck             ✅ the .pck on its own
ports/mmw/gamedata/linux/mmw.pck       ❌ not found — too deep
```

Copying the `.zip` is the safe route: one file, no folder to get wrong.

The port identifies the data by its contents, never by its filename, so a
renamed or repacked copy of the same data is accepted just the same.

Accepted payload:

| Field | Value |
|---|---|
| Game | Mega Man W, Linux release 1.0.6, revision 1 |
| Engine | Godot 3.5.3 |
| Format | Godot PCK, magic `GDPC` |
| Size | `155897648` bytes |
| SHA-256 | `ed9a71da6660df9bad52017375d4d6c3cde0a6b5566cb47708027070114b4665` |

Anything that is not exactly this payload is refused, and the setup screen tells
you why. Nothing is written into the port until the data has been validated.

### 3. First launch

Open **Mega Man W** from your frontend's Ports list. On the first launch the
setup screen installs your data, then the NEXT OS splash appears for five
seconds and the game starts. Later launches go straight to the game.

Saves and settings stay inside `ports/mmw/home`.

**SELECT + START** quits the game normally, saving first.

On the game's first process, its upstream controller flow creates `cntrl.cnf`
but would only apply it after a restart. Version 1.0.3 repairs that first-run
gap after `SceneTree` initialization: if `ui_cancel` has no joypad binding, it
copies the game's existing **X**/button-2 shoot event and adds **B**/button 1 as
a menu-back alias. Existing bindings are never removed or replaced. The same
version prepares PortMaster mappings only after the native Godot 3 evdev
backend has measured the controller, which also restores the correct mapped
SELECT + START exit chord without manual remapping.

| Owner control | Action |
|---|---|
| D-pad (12–15) | move and aim |
| A (0) | jump |
| B (1) | slide / go back from Options |
| X (2) | shoot / go back from Options |
| Y (3) | interface selection (`ui_select`) |
| L1 (4) / R1 (5) | previous / next weapon |
| L2 (6) | quick restart |
| SELECT (10) | skip cutscene |
| START (11) | enter / pause / accept |
| SELECT + START | normal port exit |
| R2 / R3 | no action assigned by the owner data |

The default performance profile is `classic`, which preserves the original
scenes. `MMW_PERF_PROFILE=balanced` is an optional low-end profile limited to
the measured Cinder Lady background and Gladiator Man sand effects; it remains
opt-in until physical A/B testing is complete. `NX_PERF_LOG=1` enables
five-second structured performance receipts for diagnosis.

---

## Português

### 1. Instalar o port

1. Copie o `mmw.zip` para o aparelho e deixe o **PortMaster** instalar
   (recomendado), ou descompacte o arquivo completo na sua pasta de ports até
   ficar assim:

   ```text
   ports/Mega Man W.sh
   ports/mmw/
   ports/mmw/.nxruntime/
   ports/mmw/.nxruntime/generations/
   ```

2. Não renomeie o launcher nem a pasta `mmw`. A pasta oculta `.nxruntime` e o
   fechamento completo de `generations/` são arquivos autenticados do runtime,
   não cache. Nunca copie somente os arquivos visíveis ou apenas os arquivos
   mostrados por um commit de fonte.

### Reempacotamento manual seguro

Se quiser acrescentar os seus dados e compactar o port novamente para uso
pessoal, primeiro extraia a release original inteira, acrescente dados somente
em `mmw/gamedata/` e recrie o arquivo com `Mega Man W.sh` e `mmw/` na raiz. Use
uma ferramenta que inclua arquivos ocultos. Um curinga de shell como `*`
normalmente deixa `mmw/.nxruntime` de fora, criando um pacote que parece
completo, mas não consegue abrir depois da instalação.

Antes de transferir o pacote recompactado, confira o conteúdo e confirme que a
árvore inteira `mmw/.nxruntime/generations/` continua presente. Não invente,
apague ou misture gerações de releases diferentes.

### 2. Traga os seus dados do jogo

Baixe a distribuição **Linux** do **Mega Man W** (versão 1.0.6, revisão 1) na
página oficial do autor. Depois coloque **uma** destas coisas dentro de `ports/mmw/gamedata/`:

- o `.zip` de Linux inteiro, exatamente como você baixou (recomendado); ou
- só o arquivo `.pck` tirado de dentro dele, com o nome que você quiser.

Se você mesmo descompactar o `.zip`, o `.pck` precisa ficar **direto** dentro do
`gamedata/`. O port não procura em subpasta, então a pasta `linux/` que vem no
arquivo tem que sair:

```text
ports/mmw/gamedata/mega-man-w-linux.zip ✅ o arquivo como você baixou
ports/mmw/gamedata/mmw.pck             ✅ o .pck sozinho
ports/mmw/gamedata/linux/mmw.pck       ❌ não é encontrado — fundo demais
```

Copiar o `.zip` é o caminho seguro: um arquivo só, sem pasta para errar.

O port reconhece o dado pelo conteúdo, nunca pelo nome do arquivo: uma cópia
renomeada ou reempacotada do mesmo dado é aceita do mesmo jeito.

Payload aceito:

| Campo | Valor |
|---|---|
| Jogo | Mega Man W, versão Linux 1.0.6, revisão 1 |
| Engine | Godot 3.5.3 |
| Formato | PCK da Godot, magic `GDPC` |
| Tamanho | `155897648` bytes |
| SHA-256 | `ed9a71da6660df9bad52017375d4d6c3cde0a6b5566cb47708027070114b4665` |

Qualquer coisa que não seja exatamente esse payload é recusada, e a tela de
instalação diz o motivo. Nada é gravado no port antes de o dado ser validado.

### 3. Primeira abertura

Abra **Mega Man W** na lista de Ports do seu frontend. Na primeira vez a tela de
instalação instala o seu dado, depois a tela NEXT OS aparece por cinco segundos
e o jogo começa. Nas próximas vezes ele abre direto.

Saves e configurações ficam em `ports/mmw/home`.

**SELECT + START** sai do jogo normalmente, salvando antes.

No primeiro processo do jogo, o fluxo upstream de controle cria `cntrl.cnf`,
mas só aplicaria a configuração depois de reiniciar. A versão 1.0.3 corrige
essa lacuna depois da inicialização da `SceneTree`: se `ui_cancel` não tiver
binding de joypad, copia o evento de tiro **X**/botão 2 já existente no jogo e
acrescenta **B**/botão 1 como alias de voltar no menu. Nenhum binding existente
é removido ou substituído. A mesma versão prepara os mappings PortMaster somente
depois que o backend evdev nativo da Godot 3 mede o controle, o que também
restaura o chord SELECT + START mapeado corretamente sem remapeamento manual.

| Controle do dono | Ação |
|---|---|
| D-pad (12–15) | anda e mira |
| A (0) | pula |
| B (1) | desliza / volta de Options |
| X (2) | atira / volta de Options |
| Y (3) | seleção de interface (`ui_select`) |
| L1 (4) / R1 (5) | arma anterior / próxima arma |
| L2 (6) | reinício rápido |
| SELECT (10) | pula cutscene |
| START (11) | entra / pausa / confirma |
| SELECT + START | saída normal do port |
| R2 / R3 | sem ação nos dados do dono |

O perfil de desempenho padrão é `classic`, que preserva as cenas originais.
`MMW_PERF_PROFILE=balanced` é um perfil opcional para aparelhos modestos,
limitado ao fundo da Cinder Lady e aos efeitos de areia do Gladiator Man; ele
continua opt-in até terminar o A/B físico. `NX_PERF_LOG=1` habilita recibos
estruturados de desempenho a cada cinco segundos para diagnóstico.
