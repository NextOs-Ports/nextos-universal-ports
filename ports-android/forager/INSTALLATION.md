# Forager Nuclear — Installation / Instalação

## Português

1. Instale o PortMaster no aparelho.
2. Extraia `forager.zip` diretamente na pasta `ports` do cartão. Ao concluir,
   devem existir `ports/Forager.sh` e `ports/forager/`.
3. Coloque em `ports/forager/gamedata/` um pacote Android **Forager 1.0.13**
   adquirido legalmente. O nome do arquivo não importa.
4. O pacote pode ser um APK solto ou um APK base dentro de um arquivo
   APKM, APKS ou XAPK. Não extraia manualmente o conteúdo do jogo.
5. Abra **Forager Nuclear** pelo menu Ports e escolha o idioma.

Na primeira abertura, o NXExtract valida o pacote e monta o runtime. As próximas
aberturas reutilizam a instalação validada. Configurações e saves ficam em
`ports/forager/data/` e são preservados nas atualizações.

Se o pacote não for reconhecido, confirme que é a versão Android 1.0.13 e consulte
`ports/forager/log.txt` e `ports/forager/nxextract.log`. A release não inclui o
jogo, APK, assets proprietários nem saves.

## English

1. Install PortMaster on the device.
2. Extract `forager.zip` directly into the card's `ports` directory. The result
   must contain `ports/Forager.sh` and `ports/forager/`.
3. Put a lawfully obtained Android **Forager 1.0.13** package in
   `ports/forager/gamedata/`. Its filename does not matter.
4. The package may be a loose APK or the base APK inside an APKM, APKS or XAPK
   container. Do not extract the game contents manually.
5. Start **Forager Nuclear** from the Ports menu and select a language.

On first launch, NXExtract validates the package and builds the runtime. Later
launches reuse the validated installation. Settings and saves live in
`ports/forager/data/` and are preserved across updates.

If the package is rejected, confirm that it is Android version 1.0.13 and inspect
`ports/forager/log.txt` and `ports/forager/nxextract.log`. The release contains no
game, APK, proprietary assets or saves.
