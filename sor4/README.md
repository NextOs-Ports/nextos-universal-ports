# Streets of Rage 4 — native AArch64 port

**Language / Idioma:** [English](#english) · [Português](#português)

This repository contains a native Linux port of the ARM64 Android v1.4.5 release.
It is a BYO-data project: no runnable game assembly, assets, audio, fonts, APK, or
proprietary Android middleware belongs in the repository or community ZIP. The ZIP
contains only the clearly identified store-style preview images covered by its notices.

## Download

Grab **`sor4.zip`** from the [latest release](https://github.com/NextOs-Ports/sor4-nextos/releases/latest),
extract it into your device's `ports/` folder (PortMaster layout: `StreetsOfRage4.sh`
next to the `sor4/` folder), drop your own legal ARM64 Android v1.4.5 APK/bundle inside
`sor4/` and launch. First run validates the data, extracts and prepares everything
automatically. Works on AArch64 handhelds with as little as **1 GB of RAM**
(R36S, RG351/RG353, TrimUI, and similar).

Do not use GitHub's **Code → Download ZIP** archive: that is source code and
intentionally has no compiled `host_pkg`. On the Releases page, expand **Assets** and
download the file named exactly **`sor4.zip`**.

## Screenshots

Captured directly from a **639 MiB-RAM R36S** (ArkOS, RK3326/Mali-G31) running this
port — original-resolution ASTC art, real hardware:

| | |
|---|---|
| ![Title](docs/screenshots/01-title.png) | ![Main menu](docs/screenshots/02-main-menu.png) |
| ![Fight modes](docs/screenshots/03-fight-modes.png) | ![Character select](docs/screenshots/04-character-select.png) |
| ![Stage map](docs/screenshots/05-stage-map.png) | ![Gameplay — jail](docs/screenshots/06-gameplay-jail.png) |
| ![Gameplay — brawl](docs/screenshots/07-gameplay-brawl.png) | ![Gameplay — gang](docs/screenshots/08-gameplay-gang.png) |

## Community

Questions, bug reports, help getting the port running, and news about the next ones:

💬 **Discord:** [discord.gg/DHfY62eDNN](https://discord.gg/DHfY62eDNN)

## English

### Status

Playable on low-memory AArch64 handhelds through a self-contained .NET 9 CoreCLR host
and a patched MonoGame GLES backend. This is neither Android emulation nor a shared-object
loader: the validated managed game assembly runs directly as a Linux process.

The 2.0.2 recipe accepts a complete merged APK, every APK from a complete Play Store
split installation, or a complete `.apks`, `.apkm`, or `.xapk` export. It keeps the RC2
fixes for local `Config.txt` persistence, native Quit, FreeType/HarfBuzz aliases and
silent Wwise timeline markers that interrupted Stage 2 music.

The native-ASTC path has been play-tested on an RK3326/Mali-G31 device with only 639 MiB
of physical RAM plus 512 MiB zram. It reaches gameplay with original-resolution art,
music and effects, correct HUD/life-bar alpha and colour, and clean hit animations. The
measured process high-water mark during extended stage play was about 495 MiB; the bounded
pager kept GPU-ready texture residency below 80 MiB. The ES2/ETC1 path remains a separate
compatibility target and must not change the proven ASTC path.

### Architecture

```text
PortMaster launcher
  -> real GLES/ASTC/ETC2 capability probe
  -> profile selected from physical RAM (zram is not counted)
  -> transactional BYO-data setup on first run
  -> compiled starter (SDL2/SDL3, native deps, save/audio environment, lifecycle)
  -> self-contained .NET 9 AArch64 host
  -> patched MonoGame GLES2/GLES3
  -> patched SOR4 managed assembly
  -> bounded XNB-backed texture residency
```

The Android data serializes 23,745 ASTC textures as format value `98`; inspection of
the complete tree proves their payload geometry is ASTC 6x6. The native path maps that
value to `GL_COMPRESSED_RGBA_ASTC_6x6_KHR` and uses arithmetic block rounding. Cold
textures lose their large GL allocation and are restored from level 0 of the original
XNB/LZ4 stream before drawing. Embedded SpriteFont atlases stay resident because their
`Texture2D` is not the root object of the font XNB.

### Memory and quality profiles

| Profile | Physical RAM | Texture residency | Native ASTC | Fallback bake |
|---|---:|---:|---|---|
| `1gb` | reported `MemTotal` below ~1.22 GiB | 80 MiB | original resolution | ETC2 1/2 or ETC1 1/3, one worker |
| `2gb` | ~1.22–2.44 GiB | 144 MiB | original resolution | full ETC2 or ETC1 1/2, two workers |
| `high` | ~2.44 GiB+ | 320 MiB | original resolution | full resolution, up to four workers |

`sor4.cfg` can override the automatic profile, budget, streaming, quality, and diagnostics.
The launcher parses an allowlisted `key=value` grammar and never executes that writable file.

### First-run data pipeline

The user places one legal ARM64 Android v1.4.5 merged APK, every split from the same
complete installation, or one complete `.apks`/`.apkm`/`.xapk` bundle beside the port.
Setup then:

1. validates exact fingerprints for `bigfile`, Wwise, the assembly store, and the
   complete path/size/CRC manifest of every asset;
2. accepts the exact 25,905-asset tree (1,836,494,230 bytes), or a proven-compatible
   repack missing exactly one XNB texture; all 613 WEM and every non-XNB asset remain
   mandatory and exact;
3. mounts base/data/ARM64 splits as one collision-safe namespace and extracts with
   same-filesystem temporary files and CRC-checked per-file resume;
4. keeps ASTC unchanged when the GPU supports it, otherwise bakes ETC2/ETC1 with a
   RAM-bounded worker count;
5. patches the managed assembly and prepares the Wwise/OpenAL audio bridge;
6. validates the complete stage and commits it with rollback protection.

All original APKs or bundles are preserved. Interrupted extraction/bake resumes;
interrupted commit rolls back before retrying. Bundles need temporary space for their
inner APKs, which are kept only inside the resumable transaction stage.

The one-missing-XNB exception is not a loose file-count check. Independent SHA-256
sum/XOR/square accumulators prove that every remaining record is from the supported
v1.4.5 tree. If that texture is requested, the runtime substitutes the APK's own
validated `blank.xnb` and writes one `[asset COMPAT]` line to `log.txt`. Missing audio,
code, libraries, or any non-XNB asset is still rejected.

Free-space checks run before the bake. After copying the APK, the conservative minima are
about 2.1 million KiB for native ASTC, 3.2 million KiB for full ETC2, and 4.5 million KiB
for full ETC1; half/third-quality fallbacks need less. Keeping 5 GiB free after copying
the APK covers every automatic recipe and a user-forced full-quality ES2 recipe.

### Build, source map, and release

```bash
port/tools/build-native-tools.sh
port/wwise-native/build-glibc230.sh
port/tools/build-managed-release.sh
package/build-package.sh
```

- `port/host/` — compiled starter plus CoreCLR game/tool runner.
- `port/monogame-gles-patches/` — reproducible GLES/ASTC/pager patch recipe.
- `port/tools/texconv/` — resumable low-memory ETC1/ETC2 bake.
- `port/package/tools/` — safe profile parser, exact validator, extractor, and
  transactional setup.
- `port/wwise-native/` — Wwise/OpenAL compatibility bridge.
- `HANDOFF*.md` — historical investigation notes, not release instructions.

The package builder uses a sorted strict allowlist, rejects proprietary/local/test data,
checks AArch64 and GLIBC compatibility, writes an immutable-payload SHA-256 manifest, and
verifies deterministic ZIP ordering and reproducibility.
The public multi-device Wwise wrapper is always cross-compiled in the pinned Debian
Buster builder and rejected if it requires anything newer than GLIBC 2.30.

### Licences

The port code in this repository is © NextOS and distributed under the
**GNU GPL-3.0** (see [`LICENSE`](LICENSE)) — anyone may use, study, modify and
redistribute it under the same terms. Release ZIPs built before the relicense
shipped with Apache-2.0 notices for the port code; Apache-2.0 is GPL-compatible
and those artifacts remain valid. MonoGame is Ms-PL/MIT, .NET,
Mono.Cecil, Java.Interop and Xamarin.Android support assemblies are MIT, SDL is zlib, and
LZ4 is BSD-2-Clause. Game data and extracted middleware remain the property of their
owners and are supplied only by the user. Full notices ship in `port/package/sor4/licenses/`.

---

## Português

### Download

Baixe o **`sor4.zip`** na [última release](https://github.com/NextOs-Ports/sor4-nextos/releases/latest),
extraia na pasta `ports/` do seu portátil (layout PortMaster: `StreetsOfRage4.sh` ao lado
da pasta `sor4/`), coloque seu APK/bundle ARM64 Android v1.4.5 legal dentro de `sor4/` e
abra o jogo. A primeira execução valida os dados e prepara tudo sozinha. Funciona em
portáteis AArch64 a partir de **1 GB de RAM** (R36S, RG351/RG353, TrimUI e similares).

Não use **Code → Download ZIP** do GitHub: esse arquivo contém apenas o código-fonte e
não traz o `host_pkg` compilado. Na página de Releases, abra **Assets** e baixe o arquivo
chamado exatamente **`sor4.zip`**.

### Estado

Jogável em portáteis AArch64 de pouca memória por um host CoreCLR .NET 9 self-contained e
MonoGame GLES corrigido. Não é emulação Android nem so-loader: o assembly gerenciado validado
roda diretamente como processo Linux.

A receita 2.0.2 aceita APK completo mesclado, todos os APKs de uma instalação split
completa da Play Store ou um bundle `.apks`, `.apkm` ou `.xapk`. Ela mantém os consertos
do RC2: persistência de `Config.txt`, Quit nativo, aliases FreeType/HarfBuzz e rejeição
dos marcadores Wwise silenciosos que interrompiam a música da fase 2.

O caminho ASTC nativo foi testado jogando num RK3326/Mali-G31 com apenas 639 MiB de RAM física
e 512 MiB de zram. Chegou à fase com arte na resolução original, música/efeitos, barra de vida
com cor e alpha corretos e golpes sem quadrados. O pico observado em jogo prolongado ficou em
cerca de 495 MiB; o pager manteve as texturas GPU residentes abaixo de 80 MiB. O caminho
ES2/ETC1 continua sendo um alvo de compatibilidade separado e não deve alterar o ASTC aprovado.

### Como funciona

```text
launcher PortMaster
  -> sonda real GLES/ASTC/ETC2
  -> perfil pela RAM física (zram não entra na conta)
  -> instalação BYO-data transacional na primeira execução
  -> starter compilado (SDL2/SDL3, dependências, save/áudio e lifecycle)
  -> host .NET 9 AArch64 self-contained
  -> MonoGame GLES2/GLES3 corrigido
  -> assembly SOR4 corrigido
  -> residência limitada de texturas relidas do XNB
```

Os 23.745 XNB ASTC da v1.4.5 usam o valor serializado `98`, mas a árvore completa prova
que o bloco real é 6x6. O port envia esse payload como ASTC 6x6 nativo e corrige o
arredondamento de blocos não-potência-de-dois. Texturas frias perdem a alocação GL grande
e voltam do nível 0 do XNB/LZ4 antes do desenho. Atlas embutidos de fonte ficam residentes.

### Perfis

| Perfil | RAM física | Texturas residentes | ASTC nativo | Bake de fallback |
|---|---:|---:|---|---|
| `1gb` | `MemTotal` reportado abaixo de ~1,22 GiB | 80 MiB | resolução original | ETC2 1/2 ou ETC1 1/3, um worker |
| `2gb` | ~1,22–2,44 GiB | 144 MiB | resolução original | ETC2 cheio ou ETC1 1/2, dois workers |
| `high` | ~2,44 GiB ou mais | 320 MiB | resolução original | resolução cheia, até quatro workers |

O usuário pode copiar `sor4.cfg.default` para `sor4.cfg`. O parser aceita somente chaves e
valores conhecidos; o launcher nunca executa o arquivo gravável.

### Dados e primeira execução

O usuário coloca seu APK ARM64 legal completo da Android 1.4.5, todos os splits da mesma
instalação completa ou um bundle `.apks`/`.apkm`/`.xapk` na pasta. O setup confere
fingerprints exatos dos 25.905 assets. Também aceita um repack comprovadamente idêntico
com 25.904 assets quando falta uma única textura XNB; os 613 WEM e todos os arquivos
não-XNB continuam obrigatórios e exatos. O setup monta base/dados/ARM64 numa árvore virtual e extrai de forma
retomável, preserva ASTC ou faz bake ETC2/ETC1 com RAM limitada, corrige o assembly, prepara
o áudio, valida o staging e só então faz commit com rollback. Os APKs/bundles originais
são preservados; bundles usam espaço temporário para os APKs internos dentro do staging.
Essa exceção não é só uma contagem: acumuladores SHA-256 independentes provam que a árvore
restante é a v1.4.5 oficial menos um registro. Se a textura ausente for pedida, o runtime
usa o `blank.xnb` validado do próprio APK e registra `[asset COMPAT]` no `log.txt`.
Depois de copiar o APK, os mínimos conservadores são cerca de 2,1 milhões de KiB para
ASTC, 3,2 milhões para ETC2 cheio e 4,5 milhões para ETC1 cheio. Manter 5 GiB livres cobre
todos os perfis automáticos e também ETC1 cheio forçado pelo usuário.

### Build, fontes e licenças

```bash
port/tools/build-native-tools.sh
port/wwise-native/build-glibc230.sh
port/tools/build-managed-release.sh
package/build-package.sh
```

- `port/host/`: starter compilado e host CoreCLR do jogo/ferramentas.
- `port/monogame-gles-patches/`: receita reproduzível GLES/ASTC/pager.
- `port/tools/texconv/`: bake ETC1/ETC2 retomável de baixa memória.
- `port/package/tools/`: perfil, validação, extração e setup transacional.
- `port/wwise-native/`: bridge Wwise/OpenAL.

O builder usa allowlist ordenada, rejeita conteúdo proprietário e dados locais, valida
AArch64/GLIBC, cria manifesto SHA-256 e prova ordem/timestamps reproduzíveis. MonoGame é
Ms-PL/MIT; .NET, Mono.Cecil e suportes Xamarin são MIT; SDL é zlib; LZ4 é BSD-2-Clause.
O jogo e o middleware extraído pertencem aos seus donos e são fornecidos só pelo usuário.
O wrapper Wwise público/multi-device é sempre cross-compilado no builder Debian Buster
fixado e o build é recusado se exigir qualquer versão posterior à GLIBC 2.30.

## Download

- [sor4-v2.0.2](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sor4-v2.0.2) — `sor4.zip`, `sor4.zip.sha256`
- [sor4-v2.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sor4-v2.0.1) — `sor4.zip`, `sor4.zip.sha256`
- [sor4-v2.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/sor4-v2.0) — `sor4.zip`, `sor4.zip.sha256`

- Todas as versões / all versions: [releases?q=sor4](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=sor4)
- Histórico: 572 downloads no repositório original `sor4-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
