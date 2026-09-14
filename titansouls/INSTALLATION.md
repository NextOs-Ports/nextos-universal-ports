# Installation / Instalação

## English

1. Extract the complete public ZIP into the firmware's `ports` directory. Keep
   this layout:

   ```text
   <ROMS>/ports/
   ├── Titan Souls.sh
   └── titansouls/
       ├── titansouls-nextos
       ├── nxport.json
       ├── extractor.json
       ├── nxextract/
       │   ├── nxextract.py
       │   ├── nxextract-ui
       │   ├── nxextract-runtime-env.sh
       │   └── run-extractor.sh
       ├── README.md
       ├── NOTICE.md
       ├── LICENSE
       └── gamedata/
   ```

2. Copy a lawfully obtained Titan Souls Android v1.0.3 APK and its matching
   cache/OBB source into `titansouls/gamedata/`. A loose
   `main.31.com.devolver.titansouls.obb` or an archive containing it is accepted.
   Do not unpack the APK or rename files inside either source.

3. Start **Titan Souls** from the ports menu. NXExtract 1.2.6 identifies the
   inputs by content, validates the exact ARMv7 libraries, assets and OBB, then
   installs them transactionally. Keep the device powered until setup reports
   success.

Language is selected inside the game's native **Options → Language** menu.
Available choices are System Language, English, Français, Deutsch, Português,
Español and Titan; the game saves the choice itself. There is no language
setting to edit in the launcher.

Later launches validate the installation marker and do not repeat extraction.
NXExtract preserves the files in `gamedata/`; a wrong or incomplete edition is
rejected before a working installation is replaced. If setup fails, inspect
`nxextract.log`. Once the game phase starts, the launcher log is preserved as
`titansouls-bootstrap.log` and the game's separate stdout/stderr goes to
`titansouls-runtime.log`; the previous copies use the `.prev.log` suffix. These
distinct names avoid a case-insensitive `LOG.txt`/`log.txt` collision. Raw logs
never belong in a public release. A support bundle must first be sanitized by
the host-side observability tool and is not part of the ZIP.

## Português

1. Extraia o ZIP público completo na pasta `ports` do firmware, mantendo
   `Titan Souls.sh` na raiz e a pasta `titansouls/` conforme a árvore acima.

2. Copie para `titansouls/gamedata/` um APK Android v1.0.3 de Titan Souls obtido
   legalmente e o cache/OBB correspondente. Pode ser o arquivo solto
   `main.31.com.devolver.titansouls.obb` ou um pacote que o contenha. Não
   descompacte o APK nem altere arquivos dentro dessas fontes.

3. Abra **Titan Souls** no menu de ports. O NXExtract 1.2.6 identifica as fontes
   pelo conteúdo, valida as bibliotecas ARMv7, os assets e o OBB exatos e instala
   tudo de forma transacional. Mantenha o aparelho ligado até a mensagem de
   sucesso.

Escolha o idioma dentro do menu nativo **Opções → Idioma**. As opções são
Idioma do Sistema, English, Français, Deutsch, Português, Español e Titan; o
próprio jogo salva a escolha. Não existe configuração de idioma para editar no
launcher.

Nos próximos lançamentos, o marcador validado evita repetir a extração. O
NXExtract preserva os arquivos em `gamedata/`; uma edição errada ou incompleta é
recusada antes de substituir uma instalação funcional. Em caso de erro de
instalação, consulte `nxextract.log`. Para falhas posteriores, `log.txt` é o log
do launcher até começar a fase do jogo; então ele é preservado como
`titansouls-bootstrap.log`, enquanto `titansouls-runtime.log` recebe o
stdout/stderr separado do jogo. As cópias anteriores usam o sufixo `.prev.log`.
Os nomes distintos evitam colisão entre `LOG.txt` e `log.txt` em sistemas sem
distinção de maiúsculas. Logs brutos nunca entram na release pública. Um bundle
de suporte precisa ser sanitizado antes pela ferramenta de observabilidade do
host e não faz parte do ZIP.
