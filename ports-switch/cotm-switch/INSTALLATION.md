# Bloodstained: Curse of the Moon — instalação / installation

## Português

Versão do port: **1.0.7**.

Inclui a correção do áudio após o terceiro chefe, heap de 500 MiB, pool gráfico
de 308 MiB e menos trabalho repetido em vibração e comandos gráficos. A reserva
virtual menor não representa a mesma redução no uso de RAM residente.

Atualização: corrige uma espera perdida no mutex de carregamento e remove
o limite de laboratório de 2 GiB de memória virtual do runtime universal.
Preserva os limites do firmware, a quota do heap e a correção anterior de
finalização assíncrona. Compilações válidas de shaders continuam após o
limite de capturas de diagnóstico, permitindo repetir partidas.
A confirma e B cancela nos menus. Para atualizar uma versão anterior,
extraia o ZIP no mesmo diretório `ports`, substituindo os arquivos do pacote.
Preserve `save-laboratory`, os arquivos `.seg`, os demais dados extraídos e suas
configurações; não é necessário apagar a instalação nem fornecer chaves novas.

Este pacote universal AArch64 contém o runtime do port e o Framework V6
fixado em `FRAMEWORK-PIN.json`. **Não contém o jogo, chaves ou saves.**
Requer Linux AArch64, glibc 2.30 ou posterior, Python 3, OpenSSL libcrypto,
SDL2/EGL/GLES2 do sistema e um controle reconhecido pela SDL2.

**Errata da versão 1.0.7.** O texto dentro do ZIP diz que três arquivos de código-fonte acompanham esta release. Os anexos publicados são `cotm-switch.zip` (port para instalação) e `cotm-switch.zip.sha256` (verificação de integridade). Os três arquivos de fontes citados estão ausentes desta release.

O pin de compilação permanece em `FRAMEWORK-BUILD-PIN.json`; o pin do pacote está
em `FRAMEWORK-PIN.json`. O novo ELF inclui as correções do port e preserva os componentes de compilação pinados.
A compatibilidade física vale somente para os aparelhos e artefatos registrados
na release; a aprovação anterior do pacote NextOS Elite não aprova automaticamente
esta versão universal.

1. Extraia o ZIP na pasta de ports. Preserve o launcher
   `Bloodstained Curse of the Moon.sh` ao lado da pasta `cotm-switch`.
2. Copie sua cópia **completa** do NSP base compatível para
   `cotm-switch/gamedata/`. O nome pode ser escolhido por você, com extensão
   `.nsp`. Coloque suas chaves privadas em `cotm-switch/gamedata/prod.keys`.
3. Abra **Bloodstained Curse of the Moon** no menu de ports. A interface gráfica
   canônica NXExtract prepara e verifica os dados. Aguarde o receipt de sucesso;
   verificar arquivos já extraídos não equivale a uma instalação nova.
4. A abertura bilíngue NEXT OS / RETRO ELITE dura cinco segundos antes do jogo.
   Siga os menus nativos. Nas próximas aberturas, os dados são reutilizados.

Preserve `cotm-switch-nextos` na raiz e os arquivos Python/configuração que
o acompanham. O supervisor usa esse mesmo executável; não há cópia em `bin/`.

Dados compatíveis: **Bloodstained: Curse of the Moon 1.0.0**, título Switch
`01004B800AF5A000`, programa AArch64. Referência completa: **32.006.920 bytes**,
SHA-256 `e06088ac3a7e3aec23217fb1581063490f6ea588b76022bfcf6178bfc929ee7c`.
Esse SHA identifica o container de referência. O extrator verifica também a
estrutura e os hashes dos módulos, da RomFS e dos shaders definidos no contrato. Renomear
um container compatível não altera a compatibilidade. Atualizações, DLCs,
outro título ou payloads internos diferentes não substituem a versão base.

A preparação produz doze segmentos NSO (`rtld`, `main`, `subsdk0`, `sdk`)
mais `cotm-base-romfs.section` e `cotm-shaders.bin`: 14 arquivos na raiz de `cotm-switch`. O NSP e as chaves não
integram os arquivos de saída nem o ZIP distribuído. Saves locais ficam em
`cotm-switch/save-laboratory`; faça backup dessa pasta antes de remover ou
substituir a instalação.

Use o direcional ou analógico esquerdo para mover. As posições dos botões
preservam o gameplay aprovado: inferior pula e esquerdo ataca. Nos menus,
A confirma e B cancela;
START pausa. **SELECT + START encerra o jogo.** Os demais comandos seguem
as opções nativas. O mapa editável usa uma base global após a admissão do controle pelo jogo:
a posição A usa `npad.b`, equivalente ao botão SDL A original, e os demais
controles conservam a passagem nativa. Antes da admissão, todos seguem
nativos. Esses estados de entrada não selecionam mapas por cena.

O runtime traduz NVN para GLES2 e preenche o drawable medido. Em painéis 4:3,
a imagem original 16:9 é esticada verticalmente, sem corte, por padrão. Para
proporção original com barras, altere `video.aspect=preserve` no arquivo editável
`cotm-switch/NEXTOSSETTINGS.txt` e reabra o jogo. `auto` e `stretch` preenchem
o painel; o arquivo do dono não é sobrescrito. O desempenho
varia com cena, GPU e temperatura. Os cerca de 31–32 swaps/s do perfil anterior
foram medidos em trechos no Mali-450; não representam 30 FPS fixos ou uma
campanha inteira neste alvo. Nenhuma SDL privada ou aumento de clock é instalado.

## English

Port version: **1.0.7**.

Includes the third-boss audio fix, a 500 MiB heap, a 308 MiB graphics allocator
and less repeated work in rumble and graphics commands. Lower virtual reservation
does not represent an equal reduction in resident RAM usage.

Update: fixes a lost wake in the loading mutex and removes the universal
runtime's laboratory 2 GiB virtual-address quota. It preserves inherited
firmware limits, the guest heap budget and the earlier asynchronous completion
fix. Valid shader compilation continues after the diagnostic capture budget
is exhausted, allowing repeated playthroughs. A confirms and B cancels in menus.
To update an earlier version, extract the ZIP into the
same `ports` directory and replace package files. Preserve `save-laboratory`,
the `.seg` files, other extracted game data and your settings. There is no need
to delete the installation or supply new keys.

This AArch64 package contains the port runtime and the Framework V6 composition
pinned in `FRAMEWORK-PIN.json`. **Game data, keys and saves are not included.**
It requires AArch64 Linux, glibc 2.30 or newer, Python 3, OpenSSL libcrypto,
system SDL2/EGL/GLES2 and an SDL2-recognized controller.

**Version 1.0.7 documentation correction.** The text inside the ZIP says that three source archives accompany this release. The published attachments are `cotm-switch.zip` (installable port) and `cotm-switch.zip.sha256` (checksum). The three referenced source archives are absent from this release.

`FRAMEWORK-BUILD-PIN.json` preserves the ELF build identity;
`FRAMEWORK-PIN.json` identifies the package. The new ELF includes the port fixes and retains the pinned build components. Physical support applies
to the devices and exact artifacts recorded with this release; the earlier
NextOS Elite package is a separate artifact.

1. Extract the ZIP into the ports directory. Keep
   `Bloodstained Curse of the Moon.sh` beside the `cotm-switch` directory.
2. Put your **complete**, compatible base `.nsp` in `cotm-switch/gamedata/`
   and your private keys in `cotm-switch/gamedata/prod.keys`.
3. Launch the port. The canonical graphical NXExtract installer prepares and
   validates the data on first launch. Wait for its success receipt.
4. The mandatory NEXT OS / RETRO ELITE opening lasts five seconds.
   Continue through the original menus. Later launches reuse validated data.

Keep `cotm-switch-nextos` and its Python/configuration companions in the port
root. The supervisor uses that same executable; no copy in `bin/` is installed.

Required game: **Bloodstained: Curse of the Moon 1.0.0**, Switch title
`01004B800AF5A000`, AArch64. The complete reference NSP is **32,006,920 bytes**,
SHA-256 `e06088ac3a7e3aec23217fb1581063490f6ea588b76022bfcf6178bfc929ee7c`.
The extractor checks internal module/RomFS/shader identities and container structure.
Renaming a compatible NSP is allowed; updates, DLCs and different internal
builds do not replace the required base game.

The output is twelve NSO segments plus `cotm-base-romfs.section` and
`cotm-shaders.bin`: 14 files in the port root. Saves live in `cotm-switch/save-laboratory`; back them up before replacing
an installation. Use D-pad/left stick to move, bottom face button to jump,
left face button to attack and START to pause. A confirms and B cancels in menus.
**SELECT + START exits.** The editable base map applies after the game admits the controller:
position A maps to `npad.b`, equivalent to the original SDL A button; other
controls keep native passthrough. Before admission all controls stay native.
These input states do not select scene-specific maps.
Rendering fills the measured drawable. On 4:3 panels, the original 16:9 image
is stretched vertically without cropping by default. For the original ratio
with bars, set `video.aspect=preserve` in the editable
`cotm-switch/NEXTOSSETTINGS.txt` and reopen the game. `auto` and `stretch` fill
the panel; owner settings are never overwritten.
Performance depends on scene, GPU and temperature; the earlier measured
31–32 swaps/s are not a whole-game guarantee. No private SDL or clock increase
is installed.
