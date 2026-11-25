# The Binding of Isaac: Rebirth – instalação / installation

Instruções do pacote v3.1.2. Abra `isaac-android-nextos/gamedata/README.txt` no ZIP para consultar este guia offline.

~~~text
DADOS DO JOGO / GAME DATA

PT-BR
Coloque aqui um único APK completo de The Binding of Isaac: Rebirth Android
1.7771, package com.tboi.rebirth, arm64-v8a. Essa edição contém o motor iOS
1.4 / Repentance. Não use um IPA, OBB isolado ou outra build da biblioteca.
O APK já contém os recursos completos: não há arquivo OBB adicional.

Referência testada: 1.411.014.719 bytes
SHA-256: 58f9dace8c57822f3d0fb170e4cac83457bf294a0e1b9d39295b2f4e51d671b7
Qualquer nome com extensão .apk é aceito; identidade e payloads críticos são
validados, não somente o nome ou o SHA do container. Mantenha só um APK aqui.

Abra o launcher normal. O V7/NXExtract prepara data/, valida a biblioteca
ARM64, o Mach-O e o pack de recursos, e atualiza as descrições de itens.
Isso pode levar vários minutos em um cartão lento. O original é preservado;
as aberturas seguintes reutilizam os dados verificados. Não crie marcadores
PREPARED.json manualmente. Seus saves ficam fora daqui, em userdata/saves/.
Consulte INSTALLATION.md para requisitos e alcance real do suporte.

ENGLISH
Supply one complete owned Android 1.7771 APK, package com.tboi.rebirth,
arm64-v8a, containing the iOS 1.4 / Repentance engine and full resources.
No separate OBB is needed. Do not supply an IPA or a different native build.
Tested reference: 1,411,014,719 bytes; SHA-256 above. Equivalent filenames,
signatures and repacks are accepted when identity and critical payloads match.
Use the normal launcher: canonical V7/NXExtract prepares data/ and validates
it before starting the game. Setup can take several minutes. Original input
and saves are preserved; later launches reuse valid prepared data.
Saves: userdata/saves/. See INSTALLATION.md. Never invent a PREPARED marker.
~~~
