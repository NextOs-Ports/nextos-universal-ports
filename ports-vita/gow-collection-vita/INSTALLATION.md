# God of War Collection – instalação / installation

Use o guia abaixo da versão 1.9.1. The port ships with this guide in `gamedata/README.txt`.

~~~text
Game: God of War Collection (PS Vita), PCSA00126, app 01.00, ARM32 guest.
Content ID: UP9000-PCSA00126_00-GOWCUS030100SHIP
Reference original PKG: 3336914560 bytes; SHA-256 e00a3198376e2e1f99c70786f7d5454a8b9bdf3f8021aaa503e2199e95547417
Port runtime: ARMHF; framework V7 pin 74bef22354b1cc5cf21f725755c0a62751f95810

COMMON PROBLEMS
- "put the owner work.bin OR license.zrif...": the ZIP holds the PKG but the licence is missing. Put the work.bin or license.zrif of YOUR game in gamedata/, beside the ZIP. Do not extract the game ZIP: keep it zipped, one .zip in the folder.
- "game ZIP is damaged...": the game file reached the card corrupted. Copy it again and test it on a PC (7-Zip: Test archive).
- Action buttons swapped on your device: edit gow-collection-vita/NEXTOSCONTROLLERS.gptk.
- Auto QTE: after starting the action, release the buttons. Any input of yours hands control back to you for a moment.
- Cheat that would not turn off (1.8.0): fixed. Load the save in this version and save again.
- Infinite health: Kratos loses no health in combat, but falls and scripted deaths still apply.

1. Extraia este ZIP na pasta ports.
2. Coloque o seu God of War Collection PCSA00126 01.00 em gow-collection-vita/gamedata/, do jeito que voce tem: o ZIP NoNpDrm/VitaShell (pasta app/PCSA00126 com sce_sys/package/work.bin), ou o ZIP com o PKG dentro (como vem no download) com work.bin OU license.zrif ao lado. Um unico .zip na pasta. Nada disso acompanha este pacote.
3. Abra God of War Collection: a tela NXExtract prepara o jogo no aparelho uma unica vez (decifra, converte e verifica 469 shaders). Reserve 12 GB livres. O primeiro preparo pode levar varios minutos; o tempo depende do aparelho e do cartao, sem prazo maximo medido antes desta primeira validacao.
4. Escolha GoW1 ou GoW2 pelo menu original. SELECT+START encerra.
Menu de opcoes (graficos, FPS, cheats, trofeus): com o jogo pausado (START), aperte SELECT; L1/R1 trocam de aba.
Idioma dos textos (menus, dicas, tutoriais): edite gow-collection-vita/NEXTOSSETTINGS.txt e troque language=auto por language=pt-BR, es, fr, it, de ou ru (auto = ingles original). Vale na proxima abertura; nada e baixado nem reinstalado. Vozes e videos continuam os originais. Creditos em runtime/translations/CREDITOS.txt.
Russo (so GoW1, com menu principal e fonte russa da MVO): language=ru, ja vem no pacote. O GoW2 continua em ingles.
Saves: gow-collection-vita/save/. Configuracoes e saves pertencem ao dono e persistem.

PROBLEMAS COMUNS
- "put the owner work.bin OR license.zrif...": o ZIP tem o PKG mas falta a licenca. Coloque o work.bin ou o license.zrif do SEU jogo dentro de gamedata/, ao lado do ZIP. Nao extraia o ZIP do jogo: ele fica compactado, um unico .zip na pasta.
- "game ZIP is damaged...": o arquivo do jogo chegou corrompido ao cartao. Copie de novo e teste no PC (7-Zip: Testar arquivo).
- Botoes de acao trocados no seu aparelho: edite gow-collection-vita/NEXTOSCONTROLLERS.gptk.
- QTE automatico: depois de iniciar a acao, solte os botoes. Qualquer toque seu devolve o controle a voce por um instante.
- Cheat que nao desligava (versao 1.8.0): corrigido. Basta carregar o save nesta versao e salvar de novo.
- Vida infinita: Kratos nao perde vida em combate, mas quedas e mortes de roteiro continuam valendo.
- Portugues no GoW1: menus, dicas e tutoriais. As cenas em video nao tem legenda neste idioma.

1. Extract this ZIP into ports.
2. Put your own God of War Collection PCSA00126 01.00 in gow-collection-vita/gamedata/ as you have it: the NoNpDrm/VitaShell ZIP (app/PCSA00126 with sce_sys/package/work.bin), or the ZIP holding the PKG (as downloaded) with work.bin OR license.zrif beside it. Only one .zip in the folder. None of it is included.
3. Open God of War Collection: NXExtract prepares the game on the device once (decrypts, converts and verifies 469 shaders). Reserve 12 GB free. Initial preparation can take several minutes; device and card speed determine the time, with no measured device maximum before this first validation.
4. Select GoW1 or GoW2 through the original menu. SELECT+START exits.
Options menu (graphics, FPS, cheats, trophies): pause the game (START), then press SELECT; L1/R1 switch tabs.
Text language (menus, hints, tutorials): edit gow-collection-vita/NEXTOSSETTINGS.txt and change language=auto to language=pt-BR, es, fr, it, de or ru (auto = original English). It applies on the next launch; nothing is downloaded or reinstalled. Voices and videos stay original. Credits in runtime/translations/CREDITOS.txt.
Russian (GoW1 only, main menu and MVO Russian font included): language=ru, built in. GoW2 stays in English.
Saves: gow-collection-vita/save/. Owner settings and saves persist.
~~~

## KNULLI Gladiator I

Se o jogo sair antes de criar `gow-collection-vita/log.txt`, abra o PortMaster pelo menu Ports. Se ele abrir, envie o arquivo `gow-collection-vita-startup.*.log` ou `gow-collection-vita-launcher-error.*.log` mais recente. Procure na pasta do jogo, ao lado do lançador e, antes de reiniciar, em `/tmp`.
