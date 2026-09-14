# Installation

## 1. Install the port

Unzip the release into your `ports` folder. You end up with:

```text
ports/
├── Castle of Illusion.sh
└── castleofillusion/
    ├── castleofillusion          <- the loader
    ├── run.sh                    <- the real launcher
    ├── extractor.json            <- BYO-data recipe
    ├── nxextract*                <- the data installer
    └── gamedata/                 <- you put your files here
```

The exact path depends on your firmware — `/roms/ports`, `/roms2/ports`,
`/storage/roms/ports`, `/mnt/mmc/ports`, `/userdata/roms/ports`. The visible
`Castle of Illusion.sh` finds `castleofillusion/run.sh` on all of them, and it
also works when the frontend shows a symlink or a copy of it (muOS does this).

## 2. Provide your own game data

This package contains **no game data**. Put the files from your own, legally
obtained Castle of Illusion into `castleofillusion/gamedata/`:

- the **APK** for version 1.4.5, including the `arm64-v8a` library; and
- the **`main.154` OBB** (~587 MiB), loose, inside the `.zip` most backup tools
  produce, or inside an `.xapk`/`.apkm` that already carries both.

Filenames do not matter. The installer opens the contents, recognises the
structure and validates every payload — entry name, ELF machine and size range
for the libraries, file signature and size range for the OBB. Any Play Store
build of 1.4.5 is accepted.

## 3. First launch

Open the port from your frontend. The installer runs first, on screen, and:

1. finds your files by content;
2. extracts the engine library, FMOD Ex and the OBB pack into a staging area;
3. validates the whole set; and
4. publishes it in one transaction, then writes a marker.

It takes a few minutes on a slow card, shows progress, and **resumes** if it is
interrupted. Your original files are never deleted. From the second launch on,
the marker is checked in milliseconds and the source is not even looked for —
you can remove the APK and OBB from `gamedata/` at that point if you want the
space back.

That is safe because `gamedata/` only ever holds *your input files*. The game's
own save and settings live in `castleofillusion/userdata/`, which the installer
never touches and you should keep.

## 4. Controls

Controls come from your firmware: PortMaster's mapping first, then the CFW's
`gamecontrollerdb.txt`. Nothing is hardcoded per device.

| Button | In game |
|---|---|
| D-pad / left stick | move (8 directions) |
| A | jump / confirm |
| B, X, Y | action |
| START | pause menu |
| **SELECT + START** | save and quit |

`SELECT`+`START` and the frontend's own "close" (SIGTERM) both go through the
same path: the game is paused, the engine writes its save, and only then does
the process exit. The game also saves at its own checkpoints — pick
**CONTINUE** on the title screen.

## 5. If something goes wrong

Two logs, both inside `castleofillusion/`:

- `nxextract.log` — the data installer;
- `debug.log` — the launcher and the game (the previous run is kept as
  `debug.prev.log`).

If the launcher itself cannot start, it writes
`castleofillusion-launcher-error.log` next to the visible `.sh` and prints the
reason on the frontend's console — it never fails silently.

`required payload ... was not found` or `probably a different build` means the
content does not match version 1.4.5 / versionCode 154. Google Play sometimes
ships more than one build under the same version name; if your package is
original and was still rejected, open an issue with the first lines of
`nxextract.log`. Adding your build's hash is a recipe fix and ships as a new
release.
