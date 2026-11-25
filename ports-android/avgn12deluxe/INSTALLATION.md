# AVGN I & II Deluxe – instalação / installation

Instruções do pacote v1.0.1-docs1. Abra `avgn12deluxe/INSTALLATION.md` no ZIP para consultar este guia offline.

~~~text
# Instalação / Installation

## Português

Instruções do ZIP público universal AArch64 1.0.1 para testes da comunidade. Este ZIP não contém dados do jogo.

### Qual APK preciso usar?

Use o **APK completo do port não oficial de AVGN I & II Deluxe para Android, versão 1.2.5, ARM64 (`arm64-v8a`, 64 bits)**. Essa é a adaptação Android compatível com a receita deste pacote. A versão `1.2.5` é a versão declarada no manifesto do APK de referência; `1.0.1` é a versão deste port público universal para PortMaster.

Os arquivos da edição para PC/Steam não são a entrada deste instalador. O NXExtract precisa do APK Android completo e confere seu Package ID, arquitetura e conteúdo interno; apenas ter “AVGN” no nome do arquivo ou declarar a mesma versão não garante compatibilidade. Confira a identidade técnica abaixo. Você fornece sua própria cópia compatível; o ZIP não inclui nem baixa o APK.

### Como instalar

1. Extraia o ZIP na pasta `ports` do seu PortMaster. Mantenha `AVGN I & II Deluxe.sh` ao lado de `avgn12deluxe/`, incluindo os arquivos ocultos.
2. Crie `avgn12deluxe/gamedata/` e coloque ali o APK completo do port Android 1.2.5 identificado acima. Não é necessário renomeá-lo, instalar o APK em um celular, descompactá-lo manualmente ou preparar texturas no computador.
3. Abra o port. O NXExtract mostra sua interface gráfica, extrai e prepara os dados automaticamente, incluindo fontes, ícones Xbox, texturas, controles e PRESS START. Aguarde a conclusão da primeira instalação.
4. Após a extração aparece a NXSplash NEXT OS / RETRO ELITE obrigatória de cinco segundos. Pressione Start na tela PRESS START.
5. A tela é preenchida por padrão. Para manter 16:9, altere `video.aspect=preserve` em `NEXTOSSETTINGS.txt` e reabra. Select+Start sai. Configurações e progresso pertencem ao usuário; não estão neste ZIP.

O APK original permanece intacto. Atualizações preservam os dados já instalados quando seus hashes correspondem à receita aprovada. Dados incompatíveis são recusados antes de iniciar o jogo. APK renomeado ou reempacotado é aceito quando preserva a identidade do pacote e os payloads internos exigidos. O SHA integral abaixo identifica apenas a referência testada.

## Identidade técnica / Technical identity

- Jogo / Game: AVGN I & II Deluxe
- Edição dos dados / Data edition: port não oficial para Android / unofficial Android port
- Versão do APK de referência / Reference APK versionName: 1.2.5
- Versão do port público universal / Public universal port version: 1.0.1
- Package ID: com.ScreenwaveMediaInc.AVGNIIIDeluxeunofficialandroidportbyplayer1444
- ABI: arm64-v8a
- Reference APK size: 111579027 bytes
- Reference APK SHA-256: 23177ec4fc6acadfb6343184bb645d29f52635e4f16d15f14983a212ca049960
- Prepared data.unity3d SHA-256: 1b445c1ac2ea0aff789b2ffdd37a4f73b2ea23e9a022a8f5cc3fb9209c452b5a

## English

Instructions for the public universal AArch64 ZIP version 1.0.1 for community testing. No game data is included.

### Which APK do I need?

Use the **complete APK of the unofficial Android port of AVGN I & II Deluxe, version 1.2.5, ARM64 (`arm64-v8a`, 64-bit)**. This is the Android adaptation supported by this package's extraction recipe. `1.2.5` is the version declared in the reference APK manifest; `1.0.1` is the version of this public universal port for PortMaster.

PC/Steam game files are not input for this installer. NXExtract requires the complete Android APK and checks its Package ID, architecture and internal payloads; an “AVGN” filename or matching version label alone does not establish compatibility. Check the technical identity above. Supply your own compatible copy; this ZIP neither includes nor downloads the APK.

### Installation steps

1. Extract this ZIP into your PortMaster `ports` directory. Keep `AVGN I & II Deluxe.sh` beside `avgn12deluxe/`, including hidden files.
2. Create `avgn12deluxe/gamedata/` and copy the complete APK of the Android port version 1.2.5 identified above into it. You do not need to rename it, install it on a phone, unpack it manually or prepare textures on a computer.
3. Launch the port. NXExtract displays its canonical graphical interface, extracts the APK and prepares the approved fonts, Xbox prompts, textures, controls and PRESS START label. Wait for the initial installation to finish.
4. Extraction is followed by the mandatory five-second NEXT OS / RETRO ELITE splash. Press Start at PRESS START.
5. Full screen is the default. Set `video.aspect=preserve` in `NEXTOSSETTINGS.txt` and restart to keep 16:9. Select+Start exits. User settings and progress are preserved and are not bundled.

Your APK remains unchanged. Compatible installed data can be reused. Acceptance checks the package and critical internal payloads; renaming or repacking the same compatible game is supported. The complete APK hash above is reference identity, not an exclusive acceptance gate. Other devices require community validation; see PHYSICAL-SUPPORT.json.
~~~
