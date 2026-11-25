# Dan the Man Classic – instalação / installation

Instruções do pacote v1.0.4. Abra `danmanclassic/gamedata/README.txt` no ZIP para consultar este guia offline.

~~~text
DAN THE MAN CLASSIC — DADOS DO JOGO / GAME DATA

PORTUGUÊS

JOGO DE REFERÊNCIA TESTADO
Dan the Man Classic, Android, versão 1.14.92 (código 11492002).
Identificador do aplicativo: com.halfbrick.danthemanplus.
Arquitetura necessária: arm64-v8a (64 bits).
Port universal V7: versão 1.0.4.

O QUE COLOCAR NESTA PASTA
Coloque em danmanclassic/gamedata/ UMA cópia legal compatível do jogo:
- um arquivo .xapk contendo o APK base e o split config.arm64_v8a; ou
- um arquivo .apk único contendo lib/arm64-v8a/libmortargame.so e
  lib/arm64-v8a/libc++_shared.so.
Não extraia manualmente o XAPK e não deixe várias cópias nesta pasta.
A cópia usada nos testes tem 114276751 bytes e SHA-256
f2338d9eedf44baad437421408d5bf994354ed6c1d5494bddc9d0f32332dd35c.
Esse hash identifica a referência testada. O preparador aceita contêineres
tecnicamente equivalentes pela estrutura e ABI; não exige esse hash global.

COMO O V7 PREPARA O JOGO
V7 é o framework do port, não a versão do APK. Extraia o ZIP no formato
PortMaster, mantendo o launcher Dan The Man Classic.sh junto da pasta
danmanclassic. Depois de colocar o original em gamedata/, abra o jogo pelo
menu. O NXExtract gráfico valida e extrai os dados e cria um APK armazenado
alinhado; a saída pronta fica em danmanclassic/image/dtmc/.
Concluído o preparo, aparecem as logos por cinco segundos e o jogo abre.
Nas próximas aberturas, o recibo válido é reaproveitado, sem reextrair.
Este ZIP não inclui o jogo e não instala uma assinatura/conta Halfbrick+.
O port foi verificado offline, sem login obrigatório.

TEMPO DA PRIMEIRA ABERTURA
Na rodada medida, o preparo levou 3min24s no handheld dArkOS/Mali-G31 e
28min02s no NextOS/Mali-450. O tempo varia com aparelho e armazenamento.
O preparador pode permanecer bastante tempo na mesma etapa: aguarde a tela
GAME DATA READY e mantenha o aparelho alimentado. Se houver interrupção,
abra novamente: etapas concluídas e verificadas podem ser reaproveitadas.
Esse é o preparo inicial; os dados válidos são mantidos nas aberturas seguintes.

SEUS SAVES E COMPATIBILIDADE
Preserve danmanclassic/native-saves/ ao atualizar: ali fica seu progresso.
SELECT + START juntos encerram o jogo. O uso normal não tem limite de tempo.
O pacote foi testado fisicamente em NextOS/Mali-450 e dArkOS/Mali-G31.
Outros aparelhos e firmwares não foram certificados nesta entrega.
Consulte também danmanclassic/INSTALLATION.md.

ENGLISH

TESTED GAME REFERENCE
Dan the Man Classic for Android, version 1.14.92 (build 11492002).
Application ID: com.halfbrick.danthemanplus. Required architecture: arm64-v8a (64-bit).
Universal V7 port version: 1.0.4.

WHAT TO PLACE HERE
Place ONE compatible legal game copy in danmanclassic/gamedata/:
- a .xapk containing the base APK and config.arm64_v8a split; or
- a single .apk containing lib/arm64-v8a/libmortargame.so and
  lib/arm64-v8a/libc++_shared.so.
Do not unpack the XAPK manually or leave several copies in this folder.
Tested XAPK: 114276751 bytes, SHA-256
f2338d9eedf44baad437421408d5bf994354ed6c1d5494bddc9d0f32332dd35c.
The hash identifies the tested input; structurally equivalent compatible
containers are accepted by structure and ABI rather than this hash alone.

HOW V7 WORKS
V7 is the port framework, not the APK version. Extract the PortMaster ZIP,
keeping Dan The Man Classic.sh beside danmanclassic. Place your original
in gamedata/ and launch from the menu. The graphical NXExtract validates
and extracts the data and creates a stored, aligned APK under
image/dtmc/. After preparation, the five-second logos play and the game opens.
Later launches reuse the valid preparation receipt without extracting again.
The ZIP contains no game data. The port was checked offline without mandatory login.

FIRST LAUNCH TIME
Measured preparation: 3min24s on the dArkOS/Mali-G31 handheld and 28min02s
on NextOS/Mali-450. Storage and hardware affect this time. The preparation
screen can stay on the same step for a while: wait for GAME DATA READY and
keep the device powered. After interruption, launch again; completed and
verified steps can be reused. Valid prepared data is kept on later launches.

SAVES AND SUPPORT
Keep danmanclassic/native-saves/ when updating. SELECT + START exits cleanly;
normal play has no test timeout. Physical tests covered NextOS/Mali-450 and
dArkOS/Mali-G31 only. Other hardware/firmware combinations are not certified.
See INSTALLATION.md for the complete bilingual installation guide.
~~~
