# Off The Road — NextOS (universal)

Port de `Off The Road — Open World Driving` (DogByte Games, engine
xGen/Horde3D+bgfx sobre casca Cocos2d-x) para handhelds Linux aarch64, via
so-loader. Pacote **universal** no framework NextOS: launcher nxbootstrap,
instalador NXExtract e runtime GL do nxgl (reparo de provider e prova de
imagem). Binário GLIBC ≤ 2.27.

Port of `Off The Road — Open World Driving` (DogByte Games) to aarch64 Linux
handhelds via a native so-loader. **Universal** package on the NextOS
framework: nxbootstrap launcher, NXExtract installer and the nxgl GL runtime
(provider repair and frame proof). Binary needs GLIBC ≤ 2.27 only.

## Instalação / Install

1. Instale o ZIP pelo PortMaster (ou extraia `Off The Road.sh` + `offtheroad/`
   na pasta de ports da sua CFW).
2. Coloque **o seu APK** de Off The Road em `ports/offtheroad/gamedata/`.
3. Abra `Off The Road` pelo menu. Na primeira vez o instalador (NXExtract)
   extrai do seu APK a `libgame.so`, a `libc++_shared.so` e os ~522 MB de
   `assets/`. Só depois disso o jogo abre.

O pacote **não contém dado de jogo**: o conteúdo sai do APK que você já
possui. / The package ships **no game data**: everything is extracted from
your own APK. Details in `INSTALLATION.md`.

## Controles / Controls

O jogo tem suporte **nativo** a controle. O arquivo editável
`NEXTOSCONTROLLERS.gptk` passa pelo parser/dispatcher do nxinput e chega uma
única vez aos sinks reais `cocos2d::nativeGamepad*`; os controles que o GPTK
assume não percorrem também a rota crua.

O jogo é de mundo aberto e a interface é de toque, então o ponteiro é um
**modo**, do jogo inteiro: **L3** liga e desliga a seta. Com a seta ligada, o
analógico direito a move (deadzone radial, resposta progressiva e suavização) e
**R3** clica; parada por ~2,5 s, ela some sozinha e reaparece ao primeiro
movimento. Com a seta desligada, o analógico direito é só a câmera e o esquerdo
a direção — nada de cursor na tela. O L3 é reservado ao modo e não chega ao
jogo. **SELECT + START** é observado por um watcher
host independente do `nativeRender`: SDL é a autoridade quando o mapping possui
BACK e START; o fallback evdev canônico só fica ativo sem esse mapping completo.
A entrega é sticky e única, solicita pause/stop/save e mantém um deadline
terminal caso a engine não devolva o frame.

The editable `NEXTOSCONTROLLERS.gptk` is parsed and dispatched exactly once to
the game's native controller sinks. The game is open-world with a touch UI, so
the pointer is a whole-game **mode**: **L3** toggles it. Pointer on — the right
stick moves it, **R3** clicks, and it hides itself after ~2.5 s of inactivity;
pointer off — the right stick is the camera alone. L3 is reserved for the
toggle and never reaches the game. A host watcher observes **SELECT + START**
independently from `nativeRender`, with SDL as the primary authority and the
canonical evdev fallback only when BACK/START mapping is incomplete. It
delivers once, then saves and exits.

## Estado da promoção / Promotion state

No schema 3 do `nxproject.json`, `adapter.skeleton="contract-only"` identifica
o formato estrutural do adapter; a documentação autoral está explicitamente em
`documentation.status="authored"`. A fonte autoritativa da promoção runtime é
`promotion.claims` junto do
`adapter/adapter-contract.json`, atualmente `implemented_release` e
`release_ready=true`. Suporte físico continua falso até receipts do artefato
exato existirem.

In schema 3, `adapter.skeleton="contract-only"` identifies the structural
adapter format, while authored documentation is explicitly declared through
`documentation.status="authored"`. Runtime promotion is authoritatively
described by `promotion.claims` plus `adapter/adapter-contract.json`. Physical
support stays false until receipts exist for the exact artifact.

## ROCKNIX e contrato gráfico / ROCKNIX and graphics contract

A evidência de campo da 1.0.3 mostrou que SDL/nxgl criavam um contexto
Panfrost válido antes do crash, mas o `libgame.so` caía ao chamar
`eglGetCurrentContext`: no GLVND, o
`libEGL.so.1` carregado localmente pelo SDL não aparecia em
`dlsym(RTLD_DEFAULT)`, deixando 14 imports EGL sem relocação. A 1.0.4 descobre
o provider do contexto corrente, promove sua visibilidade sem criar um segundo
contexto e registra todos esses imports explicitamente antes de carregar o
guest. A abertura só continua depois de provar 15/15 rotas EGL (14 do provider
+ `eglGetProcAddress` pelo SDL) e um contexto corrente não nulo.

Field evidence from version 1.0.3 showed that SDL/nxgl created a valid
Panfrost context before the crash, but `libgame.so` failed on
`eglGetCurrentContext`: under GLVND, SDL's locally
loaded `libEGL.so.1` was invisible to `dlsym(RTLD_DEFAULT)`, leaving 14 EGL
imports unrelocated. Version 1.0.4 discovers the provider of the current
context, promotes its visibility without creating another context, and binds
all guest EGL imports explicitly before loading the game. Boot proceeds only
after proving all 15 routes and a non-null current context.

## Recuperação de áudio / Audio recovery

Uma parada mensurada dos callbacks é registrada honestamente como
`callback-stalled`, nunca como EPIPE sem errno do backend. O adapter permite um
único reopen SDL do mesmo backend e só confirma recuperação depois de observar
callback do dispositivo substituto. O arquivo de evidência persiste tanto
`AUDIO-RECEIPT` quanto `AUDIO-RECOVERY`.

A measured callback stall is reported as `callback-stalled`, never as EPIPE
without a backend errno. The adapter performs at most one same-backend SDL
reopen and accepts it only after a callback from the replacement device. Both
the audio and recovery receipts are persisted.

## Perfil gráfico / Graphics profile (`OT_DETAIL`)

O jogo tem 4 níveis internos de detalhe (0–3), mas o auto-benchmark dele mede
só *fill-rate* e crava o nível máximo em qualquer handheld — e a gameplay
afunda. O port força **low** por padrão (no R36S/Mali-G31: ~11 fps em ultra →
**~79 fps** em low). Para mudar, exporte antes de abrir:

| `OT_DETAIL` | efeito |
|---|---|
| `low` *(padrão)* | nível 0 — máximo fps |
| `medium` / `high` / `ultra` | níveis 1 / 2 / 3 |
| `auto` | comportamento original do jogo (benchmark decide) |

The game's own auto-benchmark only measures fill-rate and always picks the
maximum tier on handhelds. The port forces **low** by default (R36S: ~11 fps
on ultra → **~79 fps** on low). Set `OT_DETAIL` as above to change it.

## Baseline físico histórico / Historical physical baseline

As medições abaixo identificam o baseline anterior. A promoção V3 atual
permanece deliberadamente `physical_support_proven=false` até que um futuro ZIP
exato e seus receipts sejam testados; este branch não reutiliza aqueles testes
como prova dos bytes novos.

The measurements below identify the previous baseline. This V3 promotion stays
`physical_support_proven=false` until an exact future ZIP and its receipts are
tested; old runs do not promote the new bytes.

- NextOS Mali-450 (Amlogic, GLES2, 1280x720): ~31 fps no mundo aberto,
  60 fps em menu, RSS ~167 MB, áudio sem underruns
- dArkOSRE R36S (RK3326/Mali-G31, 640x480): ~79 fps em low (menu/título),
  frame proof 99,7%, extração do zero NXE0000 em 100 s

## Download

- [offtheroad-v1.0.5](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/offtheroad-v1.0.5) — `offtheroad.zip`, `offtheroad.zip.sha256`
- [offtheroad-v1.0.4](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/offtheroad-v1.0.4) — `offtheroad.zip`, `offtheroad.zip.sha256`
- [offtheroad-v1.0.3](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/offtheroad-v1.0.3) — `offtheroad.zip`, `offtheroad.zip.sha256`
- [offtheroad-v1.0.1](https://github.com/NextOs-Ports/nextos-universal-ports/releases/tag/offtheroad-v1.0.1) — `offtheroad.zip`, `offtheroad.zip.sha256`

- Todas as versões / all versions: [releases?q=offtheroad](https://github.com/NextOs-Ports/nextos-universal-ports/releases?q=offtheroad)
- Histórico: 105 downloads no repositório original `offtheroad-nextos` (até 13/09/2026).

O pacote não inclui o jogo nem seus dados (BYO-data). / The package does not include the game or its data.
