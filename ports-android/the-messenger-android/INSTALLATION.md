# The Messenger – instalação / installation

O ZIP v1.2.1 também inclui estas instruções em `gamedata/README.txt`.

~~~text
THE MESSENGER — APK ORIGINAL / ORIGINAL OWNER DATA

1. Instale o ZIP pelo PortMaster ou extraia na pasta Ports, mantendo The Messenger Android.sh ao lado de the-messenger-android/.
2. Copie seu APK original universal Android do The Messenger versão1.2 (versionCode1) para the-messenger-android/gamedata/. Deixe apenas um APK nessa pasta. Package: com.vocies61.TheMessenger. O extrator seleciona os três módulos ARM64 e todos os assets; splits, OBBs e outras versões não estão qualificados nesta entrega.
3. Abra The Messenger Android. O NXExtract prepara shaders e dados no aparelho e depois mostra a abertura de cinco segundos. A primeira preparação pode levar vários minutos conforme o cartão; as próximas aberturas reaproveitam os dados válidos. O aparelho não precisa de Python ou pacotes instalados pelo usuário.

Preserve home/, NEXTOSSETTINGS.txt e NEXTOSCONTROLLERS.gptk ao atualizar: home/ contém os saves e preferências existentes. A pasta data/game/ contém apenas dados preparados e não substitui os saves. Idioma e opções do jogo permanecem nos menus originais. Select+Start juntos encerram pelo controle.

Requer sistema Linux ARM64, SDL2 do firmware e GLES2 compatível. Um contexto GLES superior compatível é admitido. O port usa a engine original Unity2022.3.62f1/IL2CPP. A versão do port é1.2.1; ela não identifica a versão do framework nem certifica a correção do chefe. Esta atualização corrige a sobreposição de comandos dos controles no APK1.2. Suporte físico e limites dependem das provas do candidato; aparelhos não testados permanecem sem certificação.

ENGLISH

1. Install with PortMaster or extract into Ports, keeping The Messenger Android.sh beside the-messenger-android/.
2. Put your original universal The Messenger Android1.2 APK (versionCode1) in the-messenger-android/gamedata/. Keep exactly one APK there. Package: com.vocies61.TheMessenger. Preparation selects the three ARM64 engine modules and all assets. Split sets, OBBs and other editions have not been qualified for this candidate.
3. Open The Messenger Android. NXExtract prepares shaders and data on the device, followed by the five-second opening. First preparation can take several minutes depending on storage; subsequent starts reuse valid data. No user-installed Python or packages are needed.

Keep home/, NEXTOSSETTINGS.txt and NEXTOSCONTROLLERS.gptk when updating. Existing saves and preferences remain in home/; data/game/ contains prepared data only. Original game menus own language/game options. Select+Start together exits through the controller.

Requires an ARM64 Linux OS, firmware SDL2 and compatible GLES2; compatible newer GLES contexts are admitted. Original engine: Unity2022.3.62f1/IL2CPP. Port version1.2.1 is separate from the framework and original APK versions. This update fixes overlapping controller input paths in Android1.2. Boss behavior is unqualified at this stage. Physical support is limited to the exact candidate evidence; untested systems are not certified.
~~~
