# Installation / Instalação

## English

1. Extract the complete `deadtrigger.zip` into the firmware's `ports`
   directory, preserving:

   ```text
   <ROMS>/ports/Dead Trigger.sh
   <ROMS>/ports/deadtrigger/
   ├── deadtrigger-nextos
   ├── nxport.json
   ├── extractor.json
   ├── nxextract/
   └── gamedata/README.txt
   ```

2. Copy the supported Dead Trigger universal APK, version 2.1.0 build
   210000062, into `<ROMS>/ports/deadtrigger/gamedata/`.

3. Start **Dead Trigger** from the ports menu. Wait for the clean NXExtract
   screen to report success. Later launches use the validated marker and do
   not repeat full extraction.

The APK is preserved. NXExtract rejects a wrong or incomplete version before
replacing valid data. For diagnostics, read `nxextract.log` and `log.txt`
inside the port directory.

## Português

1. Extraia o `deadtrigger.zip` completo na pasta `ports`, mantendo
   `Dead Trigger.sh` na raiz e a pasta `deadtrigger/` conforme a árvore acima.

2. Copie o APK universal suportado, Dead Trigger 2.1.0 build 210000062, para
   `<ROMS>/ports/deadtrigger/gamedata/`.

3. Abra **Dead Trigger** no menu e aguarde a tela limpa do NXExtract informar
   sucesso. As próximas execuções usam o marcador validado.

O APK é preservado. Uma versão errada ou incompleta é recusada antes de trocar
dados válidos. Para diagnóstico, consulte `nxextract.log` e `log.txt`.
