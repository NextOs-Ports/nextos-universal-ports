# Installation / Instalação

## English

### Supported owner inputs

NXExtract identifies files by their contents, not by their external names.
Release 1.1.8 accepts these exact Android containers:

| Android input | SHA-256 | Runtime scope |
|---|---|---|
| 1.2.7d APK, recovery ZIP layout | `4188a463432b921dfb767a3ddf316e970655789a7bdf806298757f45071a8c87` | ARMv7 + x86 |
| 1.2.7d APK, standard ZIP layout | `2878fec3235a91a0487ee0a3ffdbcb5c534e0d052a573941a10489024b2b1868` | ARMv7 + x86 |
| 1.2.8d APK | `6211d194cb06c6cbb32c2491adef59554eef4d97763a2fbc1e4bbb52d9fcae9b` | ARMv7 + x86 |
| 1.2.8d self-contained installer | `42d1a3ac86708549fb425b8e36338ece56ea384fb2e30062c7a7da6ca34689e3` | ARM32/multilib only |

The matching companion cache ZIP is also accepted intact:

`23f3ef198f731fa1af0f2dfce4902e510dc4bf57edc3a3524e8986b2a4bcc770`

The self-contained installer already carries the required expansions. For any
loose APK, supply the cache ZIP above or the two required OBBs below. Do not
unpack or modify an OBB.

| Expansion | Requirement | SHA-256 |
|---|---|---|
| `main.12032.com.gameloft.android.ANMP.GloftASHM.obb` | required | `276c413051b3349e7738afb23521f972d085a186cb22ab18db230906aab46981` |
| `patch.12723.com.gameloft.android.ANMP.GloftASHM.obb` | required | `0faae1e92ab998b8808e3984e4cdafbe732a87c26da58a44ad11c633e643cb80` |
| `patch.12438.com.gameloft.android.ANMP.GloftASHM.obb` | optional | `58d9ed565ad67ee7362a2376a74387316535975460110eccf3df7eb3b6503981` |

The X5M/Box32 route requires one of the three universal APK profiles. The
self-contained installer is deliberately rejected there because it has no x86
game library.

### Directory layout

1. Extract `asm2.zip` at the storage root that contains the firmware's
   `ports/` directory.
2. Copy one supported input set into
   `ports/asm2_127/gamedata/`.

A loose APK plus the companion cache ZIP:

```text
ports/
└── asm2_127/
    └── gamedata/
        ├── your-supported-copy.apk
        └── matching-cache.zip
```

Or a loose APK plus intact OBBs:

```text
ports/
└── asm2_127/
    └── gamedata/
        ├── your-supported-copy.apk
        ├── main.12032.com.gameloft.android.ANMP.GloftASHM.obb
        └── patch.12723.com.gameloft.android.ANMP.GloftASHM.obb
```

The optional `patch.12438` may be placed beside them. For the ARM32-only
self-contained installer, place that one file in `gamedata`.

3. Launch **The Amazing Spider-Man 2** from Ports.
4. Let NXExtract validate and prepare the inputs. The first preparation
   processes more than 1 GiB and can take several minutes on old storage.
   On ROCKNIX/Wayland the screen can remain black instead of showing the
   NXExtract progress UI. The process is still active: do not power off; wait
   for the game to start. Progress remains available in
   `ports/asm2_127/debug.log`.
5. On a clean profile, wait for each prompt and press one face/action button
   once on the legal screen, update log and cloud notice. The port applies the
   required touch/HID action for each screen and then restores normal input.

NXExtract validates content rather than trusting external names. A renamed
supported input can still be recognized. Wrong, incomplete, truncated or
corrupt inputs are rejected before the transactional install is published.

Internet access is not required. Updates preserve `gamedata`, saves,
preferences and cache.

## Português

### Dados do usuário suportados

O NXExtract identifica os arquivos pelo conteúdo, não pelo nome externo. A
release 1.1.8 aceita estes contêineres Android exatos:

| Insumo Android | SHA-256 | Escopo de runtime |
|---|---|---|
| APK 1.2.7d, layout ZIP de recuperação | `4188a463432b921dfb767a3ddf316e970655789a7bdf806298757f45071a8c87` | ARMv7 + x86 |
| APK 1.2.7d, layout ZIP normal | `2878fec3235a91a0487ee0a3ffdbcb5c534e0d052a573941a10489024b2b1868` | ARMv7 + x86 |
| APK 1.2.8d | `6211d194cb06c6cbb32c2491adef59554eef4d97763a2fbc1e4bbb52d9fcae9b` | ARMv7 + x86 |
| instalador 1.2.8d autocontido | `42d1a3ac86708549fb425b8e36338ece56ea384fb2e30062c7a7da6ca34689e3` | somente ARM32/multilib |

O cache ZIP correspondente também é aceito intacto:

`23f3ef198f731fa1af0f2dfce4902e510dc4bf57edc3a3524e8986b2a4bcc770`

O instalador autocontido já traz as expansões obrigatórias. Para qualquer APK
solto, forneça o cache ZIP acima ou os dois OBBs obrigatórios abaixo. Não abra,
extraia nem modifique um OBB.

| Expansão | Exigência | SHA-256 |
|---|---|---|
| `main.12032.com.gameloft.android.ANMP.GloftASHM.obb` | obrigatória | `276c413051b3349e7738afb23521f972d085a186cb22ab18db230906aab46981` |
| `patch.12723.com.gameloft.android.ANMP.GloftASHM.obb` | obrigatória | `0faae1e92ab998b8808e3984e4cdafbe732a87c26da58a44ad11c633e643cb80` |
| `patch.12438.com.gameloft.android.ANMP.GloftASHM.obb` | opcional | `58d9ed565ad67ee7362a2376a74387316535975460110eccf3df7eb3b6503981` |

A rota X5M/Box32 exige um dos três perfis de APK universal. O instalador
autocontido é recusado nessa rota porque não possui a biblioteca x86 do jogo.

### Organização das pastas

1. Extraia `asm2.zip` na raiz do armazenamento que contém a pasta `ports/`.
2. Copie um conjunto suportado para
   `ports/asm2_127/gamedata/`.

Um APK solto mais o cache ZIP:

```text
ports/
└── asm2_127/
    └── gamedata/
        ├── sua-copia-suportada.apk
        └── cache-correspondente.zip
```

Ou um APK solto mais os OBBs intactos:

```text
ports/
└── asm2_127/
    └── gamedata/
        ├── sua-copia-suportada.apk
        ├── main.12032.com.gameloft.android.ANMP.GloftASHM.obb
        └── patch.12723.com.gameloft.android.ANMP.GloftASHM.obb
```

O `patch.12438` opcional pode ficar ao lado deles. Para o instalador
autocontido ARM32-only, coloque somente esse arquivo em `gamedata`.

3. Abra **The Amazing Spider-Man 2** pelo menu Ports.
4. Aguarde o NXExtract validar e preparar os insumos. A primeira
   preparação processa mais de 1 GiB e pode levar vários minutos em
   armazenamento antigo.
   No ROCKNIX/Wayland, a tela pode permanecer preta em vez de mostrar a
   interface de progresso do NXExtract. O processo continua ativo: não
   desligue; aguarde o jogo iniciar. O progresso permanece em
   `ports/asm2_127/debug.log`.
5. Em um perfil novo, aguarde cada aviso e pressione uma vez um botão
   frontal/de ação nos termos, no log de atualização e no aviso de nuvem. O
   port aplica o toque/HID exigido em cada tela e depois restaura o controle
   normal.

O NXExtract valida o conteúdo em vez de confiar no nome externo. Um insumo
suportado renomeado ainda pode ser reconhecido. Dados errados, incompletos,
truncados ou corrompidos são rejeitados antes da publicação transacional.

Internet não é necessária. Atualizações preservam `gamedata`, saves,
preferências e cache.
