# Skateboard Party 3 — NextOS (Amlogic Mali-450, aarch64)

Port nativo do build Android (Unity 2022.3.45f1, IL2CPP, arm64-v8a) para o
NextOS Retro Elite Edition. O jogo roda pelo **so-loader**: as bibliotecas
originais (`libmain.so`, `libunity.so`, `libil2cpp.so`) são carregadas por um
loader ELF próprio que implementa a JNI, o bionic e o ciclo de vida do
`UnityPlayer` que elas esperam.

## Estado

Gameplay completo, validado no device Mali-450: menus, criação de perfil,
carreira, sessão livre, áudio e controle de gamepad nativo.

- Vídeo: EGL/fbdev cru, `DeviceType: OpenGLES2` (o build declara GLES3, a Unity
  cai para o backend GLES2 presente na `libunity`).
- Texturas: ETC1 nativo do APK; as 9 texturas ETC2_RGB8 são decodificadas em
  runtime. Nenhuma conversão offline é necessária.
- Áudio: FMOD → OpenSL ES → SDL2 (PulseAudio), 24 kHz estéreo.
- Memória: ~330 MB de RSS no menu, sem swap adicional.

## Arquitetura

```
skate3                 loader ELF (este código)
lib/*.so               bibliotecas do jogo, vindas do APK
assets/                árvore `assets/` do APK (dados do jogo)
es_map.sh, es2sdl.awk  derivam o mapping SDL do es_input.cfg do usuário
home/                  estado do jogo (prefs, cache de shader) — criado no 1º boot
```

`src/` contém o loader: `nx_elf.c` (carregador ELF), `bionic.c` (libc do
Android), `jni.c` (JNI + classes Android), `egl*.c` (EGL/GLES + janela),
`input.c` (gamepad, cursor, integração com o jogo), `audio.c`, `android.c`,
`pthread_bridge.c`, `etc2_decode.c`.

## Build

```bash
./build.sh          # usa o toolchain/sysroot corrente do NextOS (aarch64)
```

O binário de release é gerado com esse toolchain e depois `strip --strip-all`.
`cosh`/`sinh` são pinados em `GLIBC_2.17` por `.symver`, porque o sysroot já
está à frente da glibc do firmware.

## Runtime

Um único launcher (`Skateboard Party 3.sh`, instalado em `ports_scripts/`)
segue o padrão PortMaster: resolve `controlfolder`, aplica `get_controls`,
publica o mapping do pad e executa o binário em **foreground**. Ele nunca para
nem reinicia o EmulationStation. A trava de instância única fica no binário
(`flock` em `/proc/self/exe`).

## Controles

| Posição no pad | Ação |
|---|---|
| Baixo (A do Xbox) | Pular / Ollie · Confirmar |
| Direita | Grab de trás · Voltar |
| Esquerda | Grab da frente |
| Cima | Grind |
| Analógico esquerdo | Andar / push (frente) |
| Analógico direito | Cursor das telas de toque |
| R3 ou R1 | Clique do cursor |
| L2 / R2 | Gatilhos do jogo |
| Start / Select | Start / Select nativos |
| Select + Start | Sair |

O jogo lê o gamepad como HID no layout Xbox (`joystick button 0..3` =
pular/grab-trás/grab-frente/grind). Como o `es_input.cfg` nomeia os botões pelo
rótulo Nintendo, `es2sdl.awk` troca `a`↔`b` e `x`↔`y` ao derivar o mapping, de
modo que a posição física corresponda ao ícone desenhado na tela.

## Correções aplicadas neste port

- `getPackageName`, `getApplicationInfo` (`dataDir`, `sourceDir`,
  `nativeLibraryDir`): sem eles a `libunity` não encontra o arquivo de
  PlayerPrefs e o jogo não salva nada.
- `PackageManager.getPackageInfo`/`versionName`, `getInstallerPackageName`,
  `String.getBytes`, `AudioManager.getDevices`: o Unity Analytics repetia a
  falha a cada quadro, gerando exceção engolida e log infinito.
- `Ivory_*` (SDK de loja/notificação, P/Invoke numa lib Android que não carrega
  aqui): resolvido para um stub inerte, evitando milhares de
  `EntryPointNotFoundException` por partida.
- Verificação de idade: o pop-up não aceita gamepad e o canvas dele não captura
  toque. O loader chama o caminho oficial do jogo
  (`UIMainMenu.HandleAgeVerificationSucceeded`) e marca `HasCheckedAge` /
  `IsValidAge` no perfil, para a tela não voltar.
- `inet_ntop` defensivo e `getifaddrs`: a camada de rede formata um endereço
  local inválido durante o boot.

## Limitações

- Serviços online (Play Games, SmartFox, anúncios, compras) não funcionam: o
  jogo roda offline.
- O teclado virtual usa o teclado por gamepad do loader; a tela de nome do
  jogador também aceita **Cancel**.

## Licenças

Loader sob GPL-3.0 (`licenses/GPL-3.0.txt`), com partes derivadas de
`syberia_arm64` / `lswtcs_arm64` sob Apache-2.0 (`licenses/Apache-2.0.txt`).
Os dados do jogo são propriedade da Ratrod Studio e não são distribuídos com o
código — veja `NOTICE.md`.

## Download

- [skate3-v1.0.0](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/skate3-v1.0.0) — `skate3-universal-v1.0.0.zip`, `skate3-universal-v1.0.0.zip.sha256`

- Todas as versões / all versions: [releases?q=skate3](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=skate3)
- Histórico: 74 downloads no repositório original `skate3-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
