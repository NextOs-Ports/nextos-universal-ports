# Crash Twinsanity – instalação / installation

Use o guia abaixo da versão 1.1.0. The port ships with this guide in `gamedata/README.txt`.

~~~text
Game: Crash Twinsanity (PlayStation 2), NTSC-U SLUS-20909 version 2.00, or PAL SLES-52568.
Reference image (NTSC-U 2.00): 2108489728 bytes, SHA-1 4f1a56f633c1b500bf3e39a0df1fdc8f101018ff.
Port runtime: native ARM64, based on TwinsanityEvolved (MIT); framework V7 pin e32ccde11993b73ccda45155253402b5e2472122

PORTUGUES

VERSOES ACEITAS (uma imagem .iso so em twinsanity/gamedata; o port reconhece pelo conteudo, o nome nao importa)
  a) Crash Twinsanity americano (NTSC-U, SLUS-20909), versao 2.00.
  b) Crash Twinsanity europeu (PAL, SLES-52568).
Recusados: a primeira versao americana (1.00), a japonesa e qualquer outro disco. O motivo aparece na tela.

INSTALAR
1. Extraia este ZIP na pasta ports do cartao.
2. Copie a SUA imagem do jogo (um arquivo .iso so) para twinsanity/gamedata/.
3. Abra Crash Twinsanity no menu Ports. A tela NXExtract confere o disco e prepara o jogo uma unica vez
   (espaco livre: cerca de 2,2 GB alem da sua copia; em ext4 e instantaneo).
4. Depois que o jogo abrir, a copia em twinsanity/gamedata pode ser apagada.

JOGANDO
- SELECT+START juntos fecham o jogo na hora.
- Controles: twinsanity/NEXTOSCONTROLLERS.gptk (veja CONTROLS.txt).
- Saves e opcoes em twinsanity/saves/, preservados nas atualizacoes.
- Na primeira abertura o jogo prepara os shaders uma vez (barra na tela, de 10 a 20 segundos); depois abre direto.

VIDEO
- Auto conserva a resolucao da versao anterior. A resolucao interna e independente da tela do aparelho. Testado no R36T (Mali-G31, dArkOS) com o disco americano.
- O disco europeu e aceito, mas ainda nao foi testado neste port. Telas 16:9 e outras GPUs tambem nao.
- Durante a partida: START > Options > Graphic Options. Use esquerda/direita para ajustar proporcao, resolucao interna (auto, 360p, 480p, 720p ou 1080p), VSync, filtro e contador de FPS. As escolhas ficam em saves/ps2r.ini.
- Relate problemas com o arquivo twinsanity/log.txt e o nome do aparelho.

ENGLISH

ACCEPTED VERSIONS (one .iso only in twinsanity/gamedata; recognised by its contents, the file name does not matter)
  a) Crash Twinsanity USA (NTSC-U, SLUS-20909), version 2.00.
  b) Crash Twinsanity Europe (PAL, SLES-52568).
Refused: the first American pressing (1.00), the Japanese release and any other disc. The screen tells you why.

INSTALLING
1. Extract this ZIP into the ports folder of the card.
2. Copy YOUR disc image (one .iso file) into twinsanity/gamedata/.
3. Start Crash Twinsanity from the Ports menu. The NXExtract screen checks the disc and prepares the game once
   (about 2.2 GB of free space besides your copy; instant on ext4).
4. Once the game opens, the copy in twinsanity/gamedata may be deleted.

PLAYING
- SELECT+START together close the game at once.
- Controls: twinsanity/NEXTOSCONTROLLERS.gptk (see CONTROLS.txt).
- Saves and options in twinsanity/saves/, kept across updates.
- On the first start the game prepares its shaders once (a bar on the screen, 10 to 20 seconds); later starts are direct.

VIDEO
- Auto keeps the previous render resolution. Internal resolution is independent of the display resolution. Tested on the R36T (Mali-G31, dArkOS) with the American disc.
- The European disc is accepted but not tested in this port yet; neither are 16:9 panels and other GPUs.
- During play: START > Options > Graphic Options. Use left/right for aspect ratio, internal resolution (auto, 360p, 480p, 720p or 1080p), VSync, filtering and the FPS counter. Choices are saved in saves/ps2r.ini.
- Report problems with the file twinsanity/log.txt and your device's name.
~~~
