# Vampire Survivors

## Português (Brasil)

# Vampire Survivors — LEIA-ME

## O que é este port

Adaptação nativa em C da edição Phaser de Vampire Survivors, com o framework NextOS V7 para aparelhos Linux ARM64 compatíveis. O ZIP contém o port e as ferramentas de preparação. Os arquivos do jogo devem vir da sua cópia da Steam.

A versão de dados usada como referência é **Vampire Survivors 1.5.101, edição Phaser do ramo `old-engine`, depot Windows 1794681**. A versão atual em Unity e o bundle Linux Early Access 0.7.220 não são compatíveis com este port.

## 1. Obter a edição correta na Steam

1. Abra a **Biblioteca** da Steam.
2. Clique com o botão direito em **Vampire Survivors** e entre em **Propriedades → Betas**.
3. No campo de código de acesso às betas, digite `PhaserVersion2023` e confirme.
4. Selecione o ramo **`old-engine`** e aguarde o download terminar.
5. Use os arquivos da edição **Windows**, depot **1794681**.

Confira a pasta antes de copiar:

- Deve existir `VampireSurvivors.exe`.
- Deve existir `resources/app/.webpack/renderer/main.bundle.js`.
- **Não deve existir `UnityPlayer.dll`.** Se ele estiver presente, a cópia é da edição Unity ou mistura arquivos de edições diferentes.

### Se você usa Steam no Linux

A instalação Linux pode trazer o depot **1794685**, com o bundle antigo **0.7.220 EA**. Baixe o depot Windows separadamente:

1. Faça a seleção da beta `old-engine` pelos passos acima.
2. Com a Steam aberta, abra este endereço no navegador ou no diálogo de executar do sistema: `steam://open/console`.
3. Na aba **Console** da Steam, digite:

   ```text
   download_depot 1794680 1794681
   ```

4. Aguarde a mensagem de conclusão. O console informa onde salvou os arquivos; o caminho termina em `steamapps/content/app_1794680/depot_1794681/`.
5. Abra **essa pasta do depot Windows** e confira `VampireSurvivors.exe`, `main.bundle.js` e a ausência de `UnityPlayer.dll`.
6. Copie o conteúdo dela para o cartão conforme a próxima seção. Use essa cópia separada, para não misturá-la com o bundle da instalação Linux.

## 2. Instalar o port e copiar os dados

Instale o ZIP pelo PortMaster ou extraia seus dois itens na pasta `ports/` usada pelo aparelho, por exemplo `roms/ports/`. Mantenha o lançador e a pasta do port lado a lado:

```text
ports/
├── Vampire Survivors.sh
└── vampiresurvivors/
    └── gamedata/
```

Copie o **CONTEÚDO** da pasta do jogo Windows para `vampiresurvivors/gamedata/`. O executável deve ficar diretamente em `gamedata/`, sem uma pasta intermediária chamada “Vampire Survivors” ou “depot_1794681”.

A estrutura deve conter:

```text
vampiresurvivors/
└── gamedata/
    ├── VampireSurvivors.exe
    ├── resources/
    │   └── app/
    │       └── .webpack/
    │           └── renderer/
    │               └── main.bundle.js
    ├── 2230760/    ← DLC opcional
    ├── 2313550/    ← DLC opcional
    └── ...demais arquivos da cópia Windows
```

Deixe pelo menos **400 MB livres além dos arquivos copiados em `gamedata/`**, para a preparação.

## 3. DLCs opcionais

As DLCs da edição Phaser são opcionais:

| DLC | Pasta |
|---|---|
| Legacy of the Moonspell | `2230760/` |
| Tides of the Foscari | `2313550/` |

Se você possui essas DLCs, copie suas pastas completas para `gamedata/`, ao lado de `resources/`. Ao baixar o depot Windows pelo console, obtenha essas pastas da sua instalação da Steam e acrescente-as à mesma cópia antes da primeira abertura.

O jogo base pode ser preparado sem DLC. As expansões posteriores exclusivas da edição Unity não fazem parte deste port.

## 4. Primeira abertura

Abra **Vampire Survivors** no menu de ports do aparelho.

Na primeira abertura, o **NXExtract** prepara automaticamente os dados no próprio aparelho: extrai as tabelas, copia os recursos e integra as DLCs presentes. Você não precisa instalar Python, pip, Node ou ffmpeg no aparelho.

Aguarde a conclusão. O tempo depende do cartão e do aparelho. Com o preparo concluído e os dados válidos, as próximas aberturas reutilizam o resultado, sem extrair tudo novamente.

Se a preparação for interrompida, abra o jogo novamente. Preserve `gamedata/` e `userdata/`.

## 5. Controles

| Ação | Controle |
|---|---|
| Mover o personagem ou navegar | Analógico esquerdo ou direcional |
| Confirmar uma escolha | Botão inferior do grupo de quatro botões — A no padrão Xbox |
| Voltar | Botão da direita — B no padrão Xbox |
| Pausar durante a partida | START |
| Sair do jogo | **SELECT + START juntos** |

As letras impressas nos botões podem variar conforme o aparelho e o mapeamento do controle. Os ataques durante a partida são automáticos, conforme as armas escolhidas.

## 6. Saves e atualização

Os saves ficam separados dos dados preparados, em:

```text
vampiresurvivors/userdata/saves/
```

Ao atualizar ou reinstalar o port, **preserve toda a pasta `userdata/`**. Faça uma cópia dela para guardar seu progresso. Preserve também `NEXTOSSETTINGS.txt` se tiver personalizado as opções do pacote.

## 7. Se o preparo falhar

Leia o motivo mostrado pelo NXExtract. A tela ou o log também pode informar um código de saída:

| Código | Significado | O que fazer |
|---|---|---|
| **20** | Os dados do jogo não estão no local esperado | Copie o conteúdo da edição Windows `old-engine` para `gamedata/`, com `VampireSurvivors.exe` diretamente nessa pasta. |
| **21** | Bundle Linux Early Access 0.7.220 incompatível | Baixe o depot Windows **1794681** pelo console da Steam: `download_depot 1794680 1794681`. |
| **22** | Versão do jogo incompatível | Selecione a beta **`old-engine`** com o código **`PhaserVersion2023`** e use a edição Windows. |
| **23** | Arquivos obrigatórios incompletos ou corrompidos | Verifique a integridade dos arquivos na Steam ou baixe novamente o depot correto; depois copie os arquivos completos. |
| **24** | Falta de espaço ou erro de gravação | Libere espaço no cartão e confira se ele permite gravação. Preserve os saves. |
| **25** | Erro interno do preparador | Preserve os arquivos e envie o log da pasta `.runs/` do port para análise. |

Se aparecer `nothing in gamedata/ matches VampireSurvivors.exe`, confira o local da cópia: o executável precisa estar diretamente em `vampiresurvivors/gamedata/`.

Os registros de diagnóstico ficam na pasta `.runs/` do port. Ela pode estar oculta no gerenciador de arquivos; habilite a exibição de arquivos ocultos para encontrá-la.

## 8. Opções do pacote — NEXTOSSETTINGS

As opções ficam em `vampiresurvivors/NEXTOSSETTINGS.txt`. O V7 cria esse
arquivo a partir do padrão incluído no ZIP. Para mudar a proporção da imagem,
edite o valor de `video.aspect` e reabra o jogo:

| Valor | Modo |
|---|---|
| `video.aspect=auto` | Tela cheia, padrão do pacote, ajustada ao painel do aparelho |
| `video.aspect=preserve` | Mantém a proporção original do jogo; pode apresentar faixas |

Preserve o cabeçalho `# NEXTOS_SETTINGS/2` e as demais opções existentes.
Guarde esse arquivo ao atualizar o port para conservar suas preferências.

## 9. Requisitos

Linux AArch64, glibc 2.28 ou mais nova, SDL2 do sistema e GPU com OpenGL ES 2.
O NXExtract e os componentes do V7 necessários ao preparo acompanham o pacote.

## 10. Licenças

Código do port MIT; raylib zlib; SDL2 do sistema sob zlib; QuickJS MIT; fonte Noto Sans CJK OFL 1.1; framework NextOS V7 GPL-3.0. O vídeo
do baú usa `runtime/lib/libvsmp4.so.1`, com FFmpeg 4.4.8 mínimo sob LGPL 2.1+ (`LICENSES/FFMPEG-*`). Detalhes em
`LICENSES/THIRD-PARTY-NOTICES.md`. Os dados do jogo são da poncle e vêm da sua cópia da Steam.

## English

1. Extract the ZIP into the device ports folder, keeping Vampire Survivors.sh next to vampiresurvivors/.
2. Use Vampire Survivors 1.5.101, Phaser edition: Steam beta old-engine, access code PhaserVersion2023, WINDOWS depot 1794681. resources/app/.webpack/renderer/main.bundle.js must exist and UnityPlayer.dll must not. Copy the folder CONTENTS into vampiresurvivors/gamedata/, with VampireSurvivors.exe directly inside. Optional owned DLC folders: 2230760 (Moonspell), 2313550 (Foscari).
3. On Linux, open steam://open/console and run download_depot 1794680 1794681. Use the depot_1794681 directory reported by Steam; the Linux depot 1794685 EA 0.7.220 bundle is incompatible.
4. Launch Vampire Survivors. NXExtract prepares once on the device and reuses valid outputs. Keep at least 400 MB free beyond the copied originals; preparation time depends on the card and device.
5. Move with the left stick or D-pad; confirm with the bottom face button, go back with the right face button, pause with START. SELECT+START quits.
6. Saves: vampiresurvivors/userdata/saves/. Preserve userdata/ and NEXTOSSETTINGS.txt when updating. Set video.aspect=auto or preserve in NEXTOSSETTINGS.txt and restart the game.
Setup statuses:20 missing input,21 Linux EA,22 incompatible version,23 incomplete/corrupt data,24 write/space error,25 internal preparer error. See LEIA-ME.txt for details.
Requires Linux AArch64, glibc>=2.28, system SDL2 and an OpenGL ES2 GPU.
