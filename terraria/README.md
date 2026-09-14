# Terraria Android 1.4.5&#46;6.4 / 1.4.5&#46;8.5 — NextOS / PortMaster

[Português](#português) · [English](#english)

## Português

### Visão geral

Este projeto executa **Terraria Android 1.4.5&#46;6.4 / 1.4.5&#46;8.5** (Unity 2021.3.56f2,
IL2CPP) em portáteis Linux AArch64. É um loader nativo de interoperabilidade:
não é o port FNA, não usa streaming e não distribui o jogo.

A release 2.0.1 mantém o framework público imutável adotado na 2.0.0 e corrige
a aceitação dos dados do dono: SHA, tamanho, versionCode e texto exato de versão
são somente procedência, nunca travas para um payload estruturalmente compatível.
A release 2.0.0 migrou o port para o framework público imutável
`framework-v2-onda1`: nxbootstrap 0.6.30, NXExtract 1.2.18, NXSplash 0.1.2 e
NXRelease 0.2.30. O launcher é gerado, a tela bilíngue `NEXT OS` /
`RETRO ELITE` aparece por cinco segundos em toda abertura e todos os ELFs Linux
do ZIP exigem no máximo GLIBC 2.30.

### Arquitetura e fluxo

```text
Terraria.sh (nxbootstrap)
  → NXExtract valida/instala os dados do dono
  → NXSplash canônica por 5 segundos
  → port-env.sh prepara somente o adapter
  → terraria-nextos carrega libunity + libil2cpp
  → init_array/JNI_OnLoad → initJni → surface → render → teardown
```

O loader intercepta compatibilidade Android/Bionic/JNI, EGL/GLES, FMOD e
controle, mas preserva a ordem nativa da Unity. Nenhum launcher força
`SDL_VIDEODRIVER` ou `SDL_AUDIODRIVER`.

### Problemas resolvidos

- **PowerVR com backend SDL chamado `mali`:** o nome do driver não é mais usado
  como prova do provider EGL. Quando o provider reporta PowerVR/Imagination, o
  SDL cria sua própria janela nativa e as chamadas EGL da Unity passam pelo
  shim SDL. O caminho ARM/Mali fbdev já validado permanece inalterado.
- **Descoberta EGL incompleta:** depois de uma falha real de janela/contexto, o
  adapter pode reinicializar o vídeo uma única vez com os nomes portáveis
  `libEGL.so`/`libGLESv2.so`. Isso só acontece quando firmware e usuário não
  forneceram override; uma configuração explícita nunca é substituída.
- **Loop de orientação:** o JNI agora devolve os valores reais de
  `ActivityInfo.SCREEN_ORIENTATION_*`, mantém o estado de
  `get/setRequestedOrientation` e não recria a janela Linux por uma solicitação
  Android sem efeito físico.
- **Logs gigantes:** cópias idênticas de `EGL_BAD_NATIVE_WINDOW`, dumps longos
  de extensões GL e o transporte Choreographer por frame são limitados depois
  de registrar a evidência útil.
- **Zenith, trilhas e partículas:** desde 1.1.4, `sincos`/`sincosf` escrevem os
  resultados reais; o loader não injeta mais NaN nas transformações de armas.
- **Builds compatíveis:** offsets fixos ficam restritos ao payload conhecido;
  builds aceitas mas diferentes usam resolução IL2CPP por nome e patches com
  assinatura verificada.

O ajuste PowerVR foi criado a partir do trace real da falha e tem fixtures
automatizadas. Não há um aparelho muOS/PowerVR local, portanto esta release não
declara uma prova física nesse firmware; a regressão física é feita no alvo
dArkOSRE autorizado e os caminhos já validados permanecem preservados.

### Compatibilidade

| Item | Contrato |
|---|---|
| Jogo | Android **1.4.5&#46;6.4 / 1.4.5&#46;8.5** (validadas em aparelho), packages validados `com.and.games505.Terraria` / `com.and.games505.TerrariaPaid` |
| Dados aceitos | APK único, splits, APKM, APKS, XAPK ou reempacotamento legítimo com o mesmo payload interno compatível |
| ABI do jogo/loader | `arm64-v8a` / Linux AArch64 |
| Engine | Unity `2021.3.56f2`, IL2CPP, GLES2 |
| Vídeo | EGL do fornecedor em ARM/Mali fbdev; janela SDL em KMSDRM/Wayland/X11 e PowerVR detectado |
| Entrada | perfil Xbox/InControl nativo + teclado de nomes pelo gamepad |
| Áudio | FMOD para fila SDL no formato solicitado pelo jogo |
| Saves | `userdata/`, `Players/` e `Worlds/` preservados em updates |
| Binários públicos | GLIBC máxima real `2.27` no loader; teto do ZIP `2.30` |

### Instalação e controles

Consulte [INSTALLATION.md](INSTALLATION.md) para o layout completo, identidade
exata dos dados do proprietário, primeira extração e atualização.

Terraria recebe o controle pelo caminho Xbox/InControl original. No teclado de
nomes: D-pad navega, `A` ou `R3` ativa, `B` apaga, `X` alterna maiúsculas,
`START` confirma em `DONE` e `SELECT` cancela. `SELECT+START` solicita o teardown
nativo e retorna ao frontend.

### Build e pacote

O build público usa Debian Buster e apenas headers SDL/EGL/GLES de um sysroot
AArch64 completo; o link final usa a ABI SDL2 fornecida pelo firmware.

```sh
./tests/test_android_compat.sh
./build_universal.sh
NEXTOS_FRAMEWORK_ROOT=/caminho/do/framework-fixado \
  ./package/build-package.sh
```

O empacotador reconstrói o loader, renderiza `nxrelease.json`, valida o
manifesto, reabre o ZIP final, audita PortMaster, DT_NEEDED, GLIBC, ausência do
comando externo `stat`, dados proprietários e textos proibidos.

### Mapa do código

- `src/main.c`: carga ELF, lifecycle Unity, vídeo, áudio, input e teardown;
- `src/jni_shim.c`: ambiente JNI, PlayerPrefs, Activity/Display e orientação;
- `src/android_compat.c`: constantes Android e seleção pura do dono da janela;
- `tools/prepare_terraria_data.py`: validação do payload e patch de
  `boot.config`;
- `extractor.json` e `nxextract/`: receita e runtime NXExtract fixados;
- `nxproject.json`, `nxport.json`, `FRAMEWORK-PIN.json`: contratos do framework;
- `package/build-package.sh`: geração e gates do ZIP público.

### Licenças

O loader é GPL-3.0-only. Componentes de terceiros conservam os avisos em
`NOTICE.md` e `licenses/`; NXExtract usa MIT. Terraria e seus dados pertencem
aos respectivos titulares. Este projeto independente não é afiliado nem
endossado pela Re-Logic, 505 Games ou Unity Technologies.

## English

### Overview

This project runs **Terraria Android 1.4.5&#46;6.4 / 1.4.5&#46;8.5** (Unity 2021.3.56f2, IL2CPP)
on AArch64 Linux handhelds. It is a native interoperability loader: it is not
the FNA port, does not stream the game and does not distribute game data.

Release 2.0.1 retains the immutable public framework adopted in 2.0.0 and fixes
owner-data acceptance: SHA, size, versionCode and exact version text are
provenance only, never gates for a structurally compatible payload. Release
2.0.0 migrated the port to the immutable public
`framework-v2-onda1`: nxbootstrap 0.6.30, NXExtract 1.2.18, NXSplash 0.1.2 and
NXRelease 0.2.30. The launcher is generated, the bilingual `NEXT OS` /
`RETRO ELITE` screen runs for five seconds on every launch, and every Linux ELF
in the ZIP requires at most GLIBC 2.30.

### Architecture and flow

```text
Terraria.sh (nxbootstrap)
  → NXExtract validates/installs owner data
  → canonical NXSplash for 5 seconds
  → port-env.sh prepares only the adapter
  → terraria-nextos loads libunity + libil2cpp
  → init_array/JNI_OnLoad → initJni → surface → render → teardown
```

The loader intercepts Android/Bionic/JNI, EGL/GLES, FMOD and controller
compatibility while preserving Unity's native ordering. No launcher forces an
`SDL_VIDEODRIVER` or `SDL_AUDIODRIVER`.

### Solved problems

- **PowerVR with an SDL backend named `mali`:** the driver name is no longer
  treated as proof of the EGL provider. When the provider reports
  PowerVR/Imagination, SDL creates its own native window and Unity EGL calls use
  the SDL-backed shim. The validated ARM/Mali fbdev path remains unchanged.
- **Incomplete EGL discovery:** after a measured window/context failure, the
  adapter may reinitialize video once with the portable
  `libEGL.so`/`libGLESv2.so` names. This only happens when neither firmware nor
  user provided an override; an explicit configuration is never replaced.
- **Orientation loop:** JNI now returns the real
  `ActivityInfo.SCREEN_ORIENTATION_*` values, retains coherent
  `get/setRequestedOrientation` state and never rebuilds the Linux window for a
  physically meaningless Android request.
- **Huge logs:** identical `EGL_BAD_NATIVE_WINDOW` copies, repeated long GL
  extension dumps and the per-frame Choreographer transport are bounded after
  the useful initial diagnostic evidence.
- **Zenith, trails and particles:** since 1.1.4, `sincos`/`sincosf` write their
  real outputs, so weapon transforms no longer receive NaN values.
- **Compatible builds:** fixed offsets remain restricted to the known payload;
  other accepted builds use named IL2CPP resolution and byte-verified patches.

The PowerVR correction was derived from the real failure trace and is covered
by automated fixtures. No local muOS/PowerVR unit is available, so this release
does not claim physical proof on that firmware; physical regression uses the
authorized dArkOSRE target while preserving every previously validated path.

### Compatibility

| Item | Contract |
|---|---|
| Game | Android **1.4.5&#46;6.4 / 1.4.5&#46;8.5** (verified on hardware), validated packages `com.and.games505.Terraria` / `com.and.games505.TerrariaPaid` |
| Accepted data | single APK, splits, APKM, APKS, XAPK or a legitimate repack with the same compatible internal payload |
| Game/loader ABI | `arm64-v8a` / AArch64 Linux |
| Engine | Unity `2021.3.56f2`, IL2CPP, GLES2 |
| Video | vendor EGL on ARM/Mali fbdev; SDL-owned window on KMSDRM/Wayland/X11 and detected PowerVR |
| Input | native Xbox/InControl profile + gamepad name keyboard |
| Audio | FMOD to an SDL queue in the format requested by the game |
| Saves | `userdata/`, `Players/` and `Worlds/` survive updates |
| Public binaries | loader's real maximum is `GLIBC_2.27`; ZIP ceiling is `2.30` |

### Installation and controls

See [INSTALLATION.md](INSTALLATION.md) for the full layout, exact owner-data
identity, first extraction and update procedure.

Terraria receives controllers through its original Xbox/InControl path. On the
name keyboard, the D-pad moves, `A` or `R3` activates, `B` deletes, `X` toggles
case, `START` confirms on `DONE`, and `SELECT` cancels. `SELECT+START` requests
the native teardown and returns to the frontend.

### Build and package

The public build uses Debian Buster and SDL/EGL/GLES headers from a complete
AArch64 sysroot; the final link uses the firmware-provided SDL2 ABI.

```sh
./tests/test_android_compat.sh
./build_universal.sh
NEXTOS_FRAMEWORK_ROOT=/path/to/the/pinned/framework \
  ./package/build-package.sh
```

The packager rebuilds the loader, renders `nxrelease.json`, validates the
manifest, reopens the final ZIP, and audits PortMaster metadata, DT_NEEDED,
GLIBC, external `stat` usage, proprietary data and forbidden public text.

### Source map

- `src/main.c`: ELF loading, Unity lifecycle, video, audio, input and teardown;
- `src/jni_shim.c`: JNI environment, PlayerPrefs, Activity/Display and orientation;
- `src/android_compat.c`: Android constants and pure window-owner selection;
- `tools/prepare_terraria_data.py`: payload validation and `boot.config` patch;
- `extractor.json` and `nxextract/`: pinned recipe and NXExtract runtime;
- `nxproject.json`, `nxport.json`, `FRAMEWORK-PIN.json`: framework contracts;
- `package/build-package.sh`: public ZIP generation and gates.

### Licenses

The loader is GPL-3.0-only. Third-party components retain their notices in
`NOTICE.md` and `licenses/`; NXExtract is MIT. Terraria and its data belong to
their respective rightsholders. This independent project is not affiliated
with or endorsed by Re-Logic, 505 Games or Unity Technologies.

## Download

- [terraria-v2.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v2.0.2) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v2.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v2.0.1) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v2.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v2.0.0) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.1.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.1.4) — `terraria.zip`
- [terraria-v1.1.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.1.3) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.1.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.1.2) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.1.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.1.1) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.0.3) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.0.2) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.0.1) — `terraria.zip`, `terraria.zip.sha256`
- [terraria-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/terraria-v1.0.0) — `terraria.zip`, `terraria.zip.sha256`

- Todas as versões / all versions: [releases?q=terraria](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=terraria)
- Histórico: 710 downloads no repositório original `terraria-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
