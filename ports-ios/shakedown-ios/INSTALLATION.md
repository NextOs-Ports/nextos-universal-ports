# Shakedown: Hawaii – instalação / installation

Instruções do pacote v1.0.2. Abra `shakedown-ios/INSTALLATION.md` no ZIP para consultar este guia offline.

~~~text
# Shakedown: Hawaii — Instalação / Installation

## Português

Este pacote contém o runtime, o framework e o instalador gráfico NXExtract.
**Não contém o jogo.** Forneça sua cópia completa compatível do aplicativo iOS.

### Dados exigidos

| Item | Cópia de referência |
|---|---|
| Jogo | Shakedown: Hawaii |
| Versão / build | **1.0.2 / 7** |
| Bundle iOS | `Vblank.Shakedown-Hawaii--iOS` |
| ABI do jogo | ARM64/AArch64; Mach-O thin não cifrado |
| IPA | `Shakedown_1.0.2_decrypted.ipa` — **111.824.855 bytes** |
| SHA-256 do IPA | `f15ab25fbe59f72e3e654d444e4211b4aefdf00dc031147e6d7b8814ec835fed` |
| Guest ARM64 | **2.484.592 bytes**; SHA-256 `72d0e952208a6cc8e91deb08548428df0e162feba9670165475e8f63a73790ee` |
| Identidade canônica do guest | `f34ea2980d1285ca3e202526f4c23c0d7631282256b79c9123fe5f75da0b12e8` |

Nome, tamanho e SHA do IPA descrevem a referência; o nome externo pode mudar.
O instalador admite o conteúdo pelo código ARM64 canônico e pelos três bancos
completos do jogo. A assinatura externa pode variar sem trocar o código.
Uma cópia ainda cifrada, outro build ou arquivo reduzido não é compatível.

Se a sua cópia estiver em `Shakedown.7z`, extraia **o IPA** desse arquivo no PC.
O instalador recebe `.ipa` ou um ZIP com `Payload/Shakedown.app/`; não recebe
o contêiner `.7z` externo. A referência desse 7z tem 111.811.110 bytes e SHA-256
`398027c9e074ad17c33f23c3bb540cfe9435067974777d7a2054ed11e14699ac`.

### Instalar e abrir

1. Copie a pasta `shakedown-ios/` e o launcher `Shakedown Hawaii.sh` do pacote
   para a pasta de Ports usada pelo seu frontend (`ports/` ou `roms/ports/`).
2. Coloque seu IPA completo em `shakedown-ios/gamedata/`.
3. Abra **Shakedown Hawaii** no frontend. Na primeira execução, o NXExtract
   mostra sua interface gráfica, prepara e valida os dados. Aguarde o fim.
   Em seguida aparece a abertura NEXT OS / RETRO ELITE de cinco segundos e
   o jogo inicia. Nas próximas aberturas, a instalação válida é reutilizada.
4. Para sair, pressione **SELECT + START juntos**, com um toque curto.

Layout após a preparação:

```text
ports/
├── Shakedown Hawaii.sh
└── shakedown-ios/
    ├── INSTALLATION.md
    ├── gamedata/                 # seu IPA
    ├── extractor.json
    ├── nxextract/                # instalador e UI
    ├── shakedown.macho           # preparado a partir do seu IPA
    └── assets/                   # recursos originais completos
        ├── Info.plist
        ├── gamedata_ios.bfp
        ├── audio_music_PS4.bap
        ├── audio_sfx_PS4.bap
        └── .ipa-study/           # saves e preferências gerados pelo jogo
```

Preserve `assets/.ipa-study/` ao atualizar ou restaurar arquivos. Se a
preparação falhar, consulte `nxextract.log` e `nxextract-result.json` na pasta
do port. Não substitua dados completos por arquivos vazios nem apague saves
para investigar uma falha de imagem ou áudio.

### Resolução opcional

O padrão acompanha a resolução física do aparelho. `video.aspect=auto` no
`NEXTOSSETTINGS.txt` preenche a tela; `preserve` e `engine` continuam disponíveis.
Para renderizar abaixo da resolução física, acrescente ao seu `port-env.sh`, por
exemplo, `export SHAKEDOWN_RENDER_WIDTH=320 SHAKEDOWN_RENDER_HEIGHT=240`.
Informe sempre os dois valores positivos. Pedidos maiores são reduzidos para
caber na tela, mantendo a proporção pedida. Remova as duas variáveis para
restaurar o padrão. As configurações do dono são preservadas nas atualizações.

O runtime exige host AArch64 e provedores compatíveis do sistema para
SDL2/EGL/GLES2 e OpenAL (`libopenal.so.1`). A inclusão do instalador não certifica suporte físico em todo
aparelho; use os alvos e requisitos publicados com esta versão do port.

## English

This package includes the runtime, framework and graphical NXExtract installer.
**It contains no game data.** Supply your complete compatible iOS app copy.

### Required data

| Item | Reference copy |
|---|---|
| Game | Shakedown: Hawaii |
| Version / build | **1.0.2 / 7** |
| iOS bundle | `Vblank.Shakedown-Hawaii--iOS` |
| Game ABI | ARM64/AArch64; unencrypted thin Mach-O |
| IPA | `Shakedown_1.0.2_decrypted.ipa` — **111,824,855 bytes** |
| IPA SHA-256 | `f15ab25fbe59f72e3e654d444e4211b4aefdf00dc031147e6d7b8814ec835fed` |
| ARM64 guest | **2,484,592 bytes**; SHA-256 `72d0e952208a6cc8e91deb08548428df0e162feba9670165475e8f63a73790ee` |
| Canonical guest identity | `f34ea2980d1285ca3e202526f4c23c0d7631282256b79c9123fe5f75da0b12e8` |

The IPA filename, size and digest identify the reference copy; the external
filename may differ. Admission checks canonical ARM64 code and the three
complete game banks. A different signing wrapper may carry identical code.
Encrypted executables, other builds and reduced fixtures are unsupported.

If your copy is inside `Shakedown.7z`, extract **the IPA** on your PC first.
The installer accepts `.ipa` or a ZIP containing `Payload/Shakedown.app/`,
not the outer `.7z`. The reference 7z is 111,811,110 bytes with SHA-256
`398027c9e074ad17c33f23c3bb540cfe9435067974777d7a2054ed11e14699ac`.

### Install and launch

1. Copy `shakedown-ios/` and the supplied `Shakedown Hawaii.sh` launcher into
   your frontend's Ports directory (`ports/` or `roms/ports/`).
2. Put your complete IPA in `shakedown-ios/gamedata/`.
3. Open **Shakedown Hawaii** from the frontend. On first launch, the graphical
   NXExtract installer prepares and validates the data. Wait for completion.
   The five-second NEXT OS / RETRO ELITE opening follows, then the game starts.
   Later launches reuse the valid installation.
4. Exit by briefly pressing **SELECT + START together**.

The layout shown above applies to both languages. The IPA supplies
`shakedown.macho` and the complete `assets/` tree, including Info.plist and
the game/music/sound banks. Saves and preferences are written beneath
`assets/.ipa-study/`; preserve this directory during updates or recovery.

### Optional rendering size

The default follows the device's physical display. `video.aspect=auto` in
`NEXTOSSETTINGS.txt` fills the screen; `preserve` and `engine` remain available.
To render below the physical resolution, add, for example,
`export SHAKEDOWN_RENDER_WIDTH=320 SHAKEDOWN_RENDER_HEIGHT=240` to your
`port-env.sh`. Always provide both positive dimensions. Larger requests are
scaled down to fit the display while retaining the requested ratio. Remove
both variables to restore the default. Updates preserve owner settings.

For installation failures, read `nxextract.log` and `nxextract-result.json`
in the port directory. Do not substitute empty files or delete saves to
diagnose graphics/audio failures. An AArch64 host and compatible system
SDL2/EGL/GLES2 and OpenAL (`libopenal.so.1`) providers are required; consult this port version's published
targets and requirements for actual device support.
~~~
