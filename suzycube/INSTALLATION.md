# Suzy Cube — instalação / installation

Este é um pacote **BYO-data**: ele contém apenas o loader, o launcher e o
instalador. Você precisa fornecer os dados de uma cópia legal compatível do
jogo. O pacote público nunca contém o jogo.

This is a **BYO-data** package: it contains only the loader, launcher, and
installer. You must provide data from a compatible lawfully owned copy of the
game. The public package never contains the game.

## Português

### 1. Identidade dos dados testados

| Campo | Valor |
|---|---|
| Jogo e versão | Suzy Cube 1.0.13 |
| Package ID | `com.noodlecake.suzycube` |
| ABI obrigatória | `arm64-v8a` |
| Tamanho do APK de referência | `113052018` bytes |
| SHA-256 do APK de referência | `49afbb38b5be44d2edbbb7ec4b3d0f8a8d805e6a39541e79e4d6d0c41e27ab0b` |

O tamanho e o SHA-256 identificam o container exato usado como referência de
teste. Eles não são a única condição de aceitação: o NXExtract valida package
ID, contrato de versão, ABI, estrutura e payloads internos críticos. Uma cópia
legítima com assinatura ou empacotamento diferente pode ser aceita quando
entrega o mesmo conteúdo compatível; outro jogo, ABI errada ou build interna
incompatível falha fechado.

### 2. Instale o ZIP

Extraia o ZIP sobre a pasta `ports` do firmware. O layout final obrigatório é:

```text
ports/
├── Suzy Cube.sh
└── suzycube/
    ├── INSTALLATION.md
    ├── port.json
    ├── suzycube-nextos
    ├── nxsplash-nextos
    ├── nxextract/
    └── gamedata/
```

Diretórios comuns incluem `/roms/ports`, `/roms2/ports` e
`/storage/roms/ports`. Preserve maiúsculas, espaços e nomes exatamente como no
ZIP.

### 3. Coloque os seus dados

Copie o APK ARM64 para:

```text
ports/suzycube/gamedata/
```

Se a sua cópia legal inclui um OBB separado, copie também o arquivo `*.obb`
correspondente para o mesmo diretório. Não renomeie os conteúdos internos nem
extraia manualmente o APK/OBB.

### 4. Primeira abertura

Abra **Suzy Cube** pelo frontend. O NXExtract:

1. identifica package, versão e ABI;
2. valida as três bibliotecas nativas e a árvore Unity;
3. une dados do APK e do OBB e remonta `.splitN` em ordem numérica;
4. valida o resultado completo em staging privado;
5. publica `assets/` e `lib/` atomicamente somente após sucesso.

Reserve aproximadamente 1 GiB livre durante a instalação. Uma falha não
publica uma árvore parcial; corrija os dados e abra novamente. Nas aberturas
seguintes, o jogo usa os dados já validados.

### 5. Controles e diagnóstico

| Entrada | Ação |
|---|---|
| D-pad / analógico esquerdo | mover e navegar |
| Botão de face sul | pular / confirmar |
| L1 / R1 | trocar de mundo no mapa |
| START | iniciar / pausar |
| SELECT + START | salvar e sair |

Desde a v1.1.11, `SC_FACE_LAYOUT=auto` é o padrão. Um controle Xbox comum fica como está; quando o SDL e o `evdev` provam um layout com rótulos Nintendo, o port normaliza para as posições que o jogo mostra: A/Cruz no botão de baixo e B/Círculo no da direita. Confirmado fisicamente no dArkOSRE com o GO-Super Gamepad. `SC_FACE_LAYOUT=firmware` preserva o mapeamento do firmware sem normalizar.

O log principal fica em `ports/suzycube/log.txt`. O instalador mantém seu log
detalhado e um resumo terminal estruturado dentro do diretório do port, sem
registrar a origem pública dos dados.

## English

### 1. Tested owner-data identity

| Field | Value |
|---|---|
| Game and version | Suzy Cube 1.0.13 |
| Package ID | `com.noodlecake.suzycube` |
| Required ABI | `arm64-v8a` |
| Reference APK size | `113052018` bytes |
| Reference APK SHA-256 | `49afbb38b5be44d2edbbb7ec4b3d0f8a8d805e6a39541e79e4d6d0c41e27ab0b` |

The size and SHA-256 identify the exact container used as test evidence. They
are not the only acceptance condition: NXExtract validates package ID, version
contract, ABI, structure, and critical internal payloads. A lawful copy with a
different signature or packaging may be accepted when it supplies the same
compatible content; another game, wrong ABI, or internally incompatible build
fails closed.

### 2. Install the ZIP

Extract the ZIP over the firmware's `ports` directory. The required result is:

```text
ports/
├── Suzy Cube.sh
└── suzycube/
    ├── INSTALLATION.md
    ├── port.json
    ├── suzycube-nextos
    ├── nxsplash-nextos
    ├── nxextract/
    └── gamedata/
```

Common roots include `/roms/ports`, `/roms2/ports`, and
`/storage/roms/ports`. Preserve case, spaces, and names exactly as shipped.

### 3. Supply your data

Copy the ARM64 APK into `ports/suzycube/gamedata/`. If your lawful copy also
contains a separate OBB, place the matching `*.obb` in the same directory. Do
not manually extract or rearrange APK/OBB contents.

### 4. First launch

Launch **Suzy Cube** from the frontend. NXExtract identifies package/version/
ABI, validates the native libraries and Unity tree, merges APK and OBB data,
reassembles numeric `.splitN` parts, and atomically publishes only a fully
validated result. Allow about 1 GiB of temporary free space. A failed attempt
does not leave a partial installation; correct the input and launch again.

The main log is `ports/suzycube/log.txt`. NXExtract also keeps a detailed log
and an atomic terminal summary without publishing the origin of owner data.

Since v1.1.11, `SC_FACE_LAYOUT=auto` is the default. A normal Xbox controller
is left unchanged; when SDL plus `evdev` prove a Nintendo-labelled layout, the
port normalizes it to the positions shown by the game: A/Cross on the south
button and B/Circle on the right button. This behavior was physically confirmed
on dArkOSRE with the GO-Super Gamepad. `SC_FACE_LAYOUT=firmware` preserves the
CFW's published letters, while `SC_FACE_LAYOUT=xbox` forces Xbox positions when
an unambiguous `evdev` snapshot is available.
