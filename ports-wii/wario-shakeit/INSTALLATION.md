# Wario Land: Shake It! – instalação / installation

Instruções do pacote v1.0.1-x3. Abra `wario-shakeit/gamedata/README.txt` no ZIP para consultar este guia offline.

~~~text
Wario Land: Shake It! — instruções do disco do proprietário (BYO-data, PT-BR / EN)

==============================================================================
PORTUGUÊS (PT-BR)
==============================================================================

Este pacote não distribui código ou assets da Nintendo / Good-Feel. Coloque a sua própria cópia do
disco norte-americano de Wii (Game ID RWLE01, disco 0, revisão 0) neste diretório:

  ports/wario-shakeit/gamedata/

Formatos aceitos (um único arquivo em gamedata/):
  *.rvz  *.iso  *.wbfs  *.ciso  *.wia  *.gcz

Na primeira abertura, o NXRun exibe a tela gráfica de progresso do NXExtract enquanto o nodtool
valida o disco RWLE01 revisão 0 e extrai a partição DATA para ports/wario-shakeit/data/DATA/
(~3,5 GB; aguarde cerca de 4,5 a 11 minutos no armazenamento do portátil, sem limite de tempo imposto).
Se nenhuma imagem de disco estiver em gamedata/, o preparo recusa de forma limpa (código 79) e orienta
você a colocar sua imagem de disco. Após o preparo inicial, as aberturas seguintes iniciam o jogo
diretamente e preservam os dados extraídos e os saves em UserData/ entre atualizações do pacote.

Configurações de execução em ports/wario-shakeit/NEXTOSSETTINGS.txt:
  quality=auto           cadência uniforme de lógica x2 a 100% da resolução original de renderização
  quality=low            cadência uniforme x3 a 100% da resolução original de renderização
  video.aspect=auto      apresentação 4:3 completa em telas 4:3; widescreen em telas 16:9
  video.aspect=preserve  enquadramento 4:3 original

==============================================================================
ENGLISH (EN)
==============================================================================

This package distributes no Nintendo / Good-Feel game code or assets. Place your own copy of the
North American Wii disc (Game ID RWLE01, disc 0, revision 0) in this directory:

  ports/wario-shakeit/gamedata/

Accepted formats (one file in gamedata/):
  *.rvz  *.iso  *.wbfs  *.ciso  *.wia  *.gcz

On the first launch, NXRun displays the graphical NXExtract UI progress screen while nodtool
validates RWLE01 revision 0 and extracts the DATA partition into ports/wario-shakeit/data/DATA/
(~3.5 GB; allow roughly 4.5 to 11 minutes on handheld storage, with no time limit imposed).
If no disc image is present in gamedata/, preparation refuses cleanly (exit 79) and prompts you
to place your disc image. Once prepared, subsequent launches open the game directly and preserve
prepared data and UserData/ saves across package updates.

Runtime settings in ports/wario-shakeit/NEXTOSSETTINGS.txt:
  quality=auto           uniform x2 logic cadence at 100% original render resolution
  quality=low            uniform x3 logic cadence at 100% original render resolution
  video.aspect=auto      full 4:3 presentation on 4:3 handheld screens; widescreen on 16:9 displays
  video.aspect=preserve  original 4:3 framing
~~~
