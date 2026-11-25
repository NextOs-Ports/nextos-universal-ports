# Gran Turismo 4 – instalação / installation

Use o guia abaixo da versão 1.1.0. The port ships with this guide in `gamedata/README.txt`.

~~~text
Game: Gran Turismo 4 (PlayStation 2), NTSC-U, SCUS_973.28 (SYSTEM.CNF version 1.01; 2.00 also works).
Reference image: 5314478080 bytes; CORE.GT4 SHA-1 30031137ce494323816bb707b90d3ec0d07937d2.
Also accepted: Gran Turismo 4 Spec II 1.10 (SCUS_974.36 on the GT4 Online volume), 3683418112 bytes, MD5 2c89bc11ccf68dc68f8af39c9e75096a; recognised by its contents, the game then opens in Spec II.
Port runtime: native ARM64, based on OpenGT4; framework V7 pin e32ccde11993b73ccda45155253402b5e2472122

PORTUGUES

VERSOES ACEITAS (uma imagem .iso so em gt4/gamedata; o port reconhece pelo conteudo, o nome do arquivo nao importa)
  a) Gran Turismo 4 americano (NTSC-U, SCUS-97328), versao 1.01 ou 2.00.
  b) Gran Turismo 4 Spec II 1.10 (veja "COMO FAZER O SPEC II" abaixo).
Recusados: GT4 europeu (PAL, SCES-...), japones (SCPS-...), GT4 Prologue e o "Online Public Beta" sem o patch.
Com esses discos o NXExtract para com erro e nao mexe em nada; o motivo (qual disco encontrou) fica no
registro gt4/.runs/<ultima execucao>/prepare.log.

CARTAO
exFAT ou ext4. FAT32 NAO serve (a imagem passa de 4 GB).

INSTALAR O GRAN TURISMO 4 NORMAL
1. Extraia este ZIP na pasta ports do cartao.
2. Copie a SUA imagem do GT4 NTSC-U (um arquivo .iso so) para gt4/gamedata/.
3. Abra Gran Turismo 4 no menu Ports. A tela NXExtract confere o disco e prepara o jogo uma unica vez.
   Espaco livre necessario alem da sua copia: cerca de 5,4 GB. Em exFAT e uma copia: cerca de 16 minutos
   no R36S/R36T (depende do cartao). Em ext4 e instantaneo.
4. Depois que o jogo abrir, a copia em gt4/gamedata pode ser apagada para liberar espaco.

COMO FAZER O SPEC II 1.10 (no PC)
1. Voce precisa da imagem do "Gran Turismo 4 Online Public Beta" americano (NTSC-U, SCUS-97436),
   MD5 3306538778dda2ded87ceaf52c944a98, e do patch "Spec II 1.10 Full" (.xdelta) do site oficial do mod:
   www.theadmiester.co.uk/specii
2. Aplique o patch na imagem da beta com um aplicador xdelta (por exemplo Delta Patcher, ou
   xdelta3 -d -s <beta.iso> <patch.xdelta> <spec2.iso>).
3. A imagem resultante deve ter MD5 2c89bc11ccf68dc68f8af39c9e75096a (3.683.418.112 bytes).

INSTALAR O SPEC II
1. Extraia este ZIP na pasta ports do cartao.
2. Copie SO a imagem do Spec II ja pronta para gt4/gamedata/ (nada de .xdelta e nada da beta original).
3. Abra Gran Turismo 4: o NXExtract prepara uma vez (espaco livre: cerca de 3,7 GB; em exFAT cerca de
   11 minutos no R36T) e o jogo abre direto no Spec II.
4. Depois disso a copia em gt4/gamedata pode ser apagada.

TROCAR ENTRE GT4 E SPEC II
1. Guarde uma copia da pasta gt4/saves (os dois jogos usam a mesma pasta).
2. Apague gt4/data/gt4.iso (a copia preparada).
3. Deixe em gt4/gamedata somente a outra imagem .iso e abra o jogo: o NXExtract prepara de novo.

ATUALIZAR DA 1.0.x
Extraia o ZIP por cima da pasta gt4; saves, opcoes e controles ficam. Na primeira abertura a 1.1.0 confere o
disco de novo uma vez (a conferencia mudou por causa do Spec II). Se a ISO ainda esta em gt4/gamedata, e
automatico; se voce apagou, copie de novo para gt4/gamedata antes de abrir.

JOGANDO
- SELECT+START juntos fecham o jogo na hora (durante os ~30 s de carregamento da corrida, so quando a corrida aparece).
- Options > Screen (nos dois jogos): proporcao, resolucao interna, filtro, nitidez do texto e VSync; fica salvo.
- Options > Spec II > Settings (so no Spec II, no fim da lista de Options): menu do proprio mod; convive com o Screen.
- Controles: gt4/NEXTOSCONTROLLERS.gptk (veja CONTROLS.txt). Saves e opcoes em gt4/saves/, preservados nas atualizacoes.
- Mais detalhes: gt4/README.txt.

ENGLISH

ACCEPTED VERSIONS (one .iso only in gt4/gamedata; the port recognises it by its contents, the file name does not matter)
  a) Gran Turismo 4 USA (NTSC-U, SCUS-97328), version 1.01 or 2.00.
  b) Gran Turismo 4 Spec II 1.10 (see "MAKING THE SPEC II IMAGE" below).
Refused: European GT4 (PAL, SCES-...), Japanese (SCPS-...), GT4 Prologue and the "Online Public Beta" without the patch.
With those discs NXExtract stops with an error and changes nothing; the reason (which disc it found) is in
gt4/.runs/<latest run>/prepare.log.

CARD
exFAT or ext4. FAT32 does NOT work (the image is larger than 4 GB).

INSTALLING GRAN TURISMO 4
1. Extract this ZIP into the ports folder of the card.
2. Copy YOUR GT4 NTSC-U image (one .iso file) into gt4/gamedata/.
3. Start Gran Turismo 4 from the Ports menu. The NXExtract screen checks the disc and prepares the game once.
   Free space needed besides your copy: about 5.4 GB. On exFAT this is a copy: about 16 minutes on an
   R36S/R36T (depends on the card). On ext4 it is instant.
4. Once the game opens, the copy in gt4/gamedata may be deleted to save space.

MAKING THE SPEC II 1.10 IMAGE (on a PC)
1. You need the "Gran Turismo 4 Online Public Beta" USA image (NTSC-U, SCUS-97436),
   MD5 3306538778dda2ded87ceaf52c944a98, and the "Spec II 1.10 Full" patch (.xdelta) from the official
   mod site: www.theadmiester.co.uk/specii
2. Apply the patch to the beta image with an xdelta patcher (for example Delta Patcher, or
   xdelta3 -d -s <beta.iso> <patch.xdelta> <spec2.iso>).
3. The resulting image must have MD5 2c89bc11ccf68dc68f8af39c9e75096a (3,683,418,112 bytes).

INSTALLING SPEC II
1. Extract this ZIP into the ports folder of the card.
2. Copy ONLY the finished Spec II image into gt4/gamedata/ (no .xdelta, not the original beta).
3. Start Gran Turismo 4: NXExtract prepares it once (free space: about 3.7 GB; on exFAT about
   11 minutes on an R36T) and the game opens straight into Spec II.
4. After that the copy in gt4/gamedata may be deleted.

SWITCHING BETWEEN GT4 AND SPEC II
1. Keep a copy of the gt4/saves folder (both games use the same folder).
2. Delete gt4/data/gt4.iso (the prepared copy).
3. Leave only the other .iso in gt4/gamedata and start the game: NXExtract prepares it again.

UPDATING FROM 1.0.x
Extract the ZIP over the gt4 folder; saves, options and controls are kept. At the first start 1.1.0 checks
the disc again once (the check changed because of Spec II). If your .iso is still in gt4/gamedata this is
automatic; if you deleted it, copy it into gt4/gamedata again before starting.

PLAYING
- SELECT+START together close the game at once (during the ~30 s race loading, only once the race appears).
- Options > Screen (both games): aspect ratio, internal resolution, UI filter, text clarity and VSync; saved.
- Options > Spec II > Settings (Spec II only, at the end of the Options list): the mod's own page; works next to Screen.
- Controls: gt4/NEXTOSCONTROLLERS.gptk (see CONTROLS.txt). Saves and options in gt4/saves/, kept across updates.
- More details: gt4/README.txt.
~~~
