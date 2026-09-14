#!/usr/bin/env python3
"""Gera o catálogo do NEXTOS UNIVERSAL PORTS a partir de buildtools/manifest.json.

Saídas:
  docs/ports.json      -> lista usada pelo site (GitHub Pages)
  catalog/ports.json   -> catálogo PortMasterV3 (lido pelo app PortMaster via 040_nextos.source.json)
  catalog/images.zip   -> screenshots no padrão <port>.screenshot.jpg
Com --upload, publica na release rolante `ports-latest`: <port>.zip (cópia byte a byte do zip
da release versionada), ports.json, images.zip e 040_nextos.source.json.
Nenhum código de port é necessário: só os zips já publicados, os READMEs e as screenshots.
"""
import argparse, hashlib, json, os, re, shutil, subprocess, sys, tempfile, urllib.request, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO = os.environ.get("GITHUB_REPOSITORY", "NextOs-Ports/nextos-universal-ports")
GH = f"https://github.com/{REPO}"
RAW = f"https://raw.githubusercontent.com/{REPO}/main"
LATEST = f"{GH}/releases/download/ports-latest"
ZIP_EPOCH = (2020, 1, 1, 0, 0, 0)
PORTER = ["NextOS"]

def md5_file(p):
    h = hashlib.md5()
    with open(p, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()

def fetch(url, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "nextos-universal-ports catalog"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dst, "wb") as f:
        shutil.copyfileobj(r, f)

def read_port_json(zpath):
    with zipfile.ZipFile(zpath) as zf:
        names = zf.namelist()
        top = sorted({n.split("/")[0] + ("/" if "/" in n else "") for n in names})
        cand = [n for n in names if n.lower().endswith("port.json") and n.count("/") <= 1]
        pj = json.loads(zf.read(cand[0])) if cand else {}
    return pj, top

def readme_url(entry):
    return f"{RAW}/{entry['folder']}/README.md"

def build(args):
    manifest = json.loads((ROOT / "buildtools/manifest.json").read_text())
    cache = Path(args.cache).resolve(); cache.mkdir(parents=True, exist_ok=True)
    out_dir = Path(args.output).resolve(); out_dir.mkdir(parents=True, exist_ok=True)
    site, pm_ports, uploads = [], {}, []
    for e in manifest:
        key = e["key"]; tag = e["release_tag"]; asset = e["asset"]
        zpath = cache / tag / asset
        if not zpath.exists():
            print(f"baixando {tag}/{asset}"); fetch(f"{GH}/releases/download/{tag}/{asset}", zpath)
        pj, top = read_port_json(zpath)
        attr = dict(pj.get("attr", {}))
        attr.setdefault("title", e["title"]); attr["porter"] = attr.get("porter") or PORTER
        attr["desc"] = attr.get("desc") or e.get("desc") or f"{e['title']} — port universal BYO-data para portáteis Linux AArch64."
        attr["inst"] = attr.get("inst") or e.get("inst") or f"Leia o README/INSTALLATION da pasta {e['folder']}: coloque o APK/XAPK original do jogo onde indicado e abra o port."
        attr["genres"] = e.get("genres") or attr.get("genres") or ["other"]
        attr["image"] = {"screenshot": e["screenshot"]}
        attr.setdefault("rtr", False); attr.setdefault("exp", False)
        attr["runtime"] = attr.get("runtime") or []; attr["store"] = attr.get("store") or []
        attr["availability"] = e.get("availability") or attr.get("availability") or "paid"
        attr["reqs"] = attr.get("reqs") or []; attr["arch"] = attr.get("arch") or ["aarch64"]
        attr["min_glibc"] = attr.get("min_glibc") or ""
        size = zpath.stat().st_size; md5 = md5_file(zpath)
        canon = f"{re.sub(r'[^A-Za-z0-9._-]', '', key)}.zip"
        entry = {
            "version": 4, "name": canon, "items": pj.get("items") or top, "items_opt": pj.get("items_opt") or [],
            "attr": attr,
            "source": {
                "platform": e.get("platform", "android"), "folder": e["folder"], "release_tag": tag, "asset": asset,
                "screenshot_url": f"{RAW}/{e['folder']}/{e['screenshot']}", "readme_url": readme_url(e),
                "download_url": f"{LATEST}/{canon}", "release_url": f"{GH}/releases/tag/{tag}",
                "date_updated": e.get("date_updated") or e.get("first_seen"), "first_seen": e.get("first_seen"),
                "md5": md5, "size": size, "legacy_downloads": e.get("legacy_downloads", 0),
                "portmaster": bool(e.get("portmaster", True)), "note": e.get("note", ""),
            },
        }
        site.append(entry); uploads.append((zpath, canon))
        if entry["source"]["portmaster"]:
            pm_ports[canon] = {
                "version": 4, "name": canon, "items": entry["items"], "items_opt": entry["items_opt"] or None, "attr": attr,
                "source": {"date_added": e.get("first_seen"), "date_updated": entry["source"]["date_updated"],
                           "md5": md5, "size": size, "url": f"{LATEST}/{canon}", "downloads": e.get("legacy_downloads", 0)},
            }
    # images.zip determinístico
    images = out_dir / "images.zip"
    with zipfile.ZipFile(images, "w", zipfile.ZIP_DEFLATED) as zf:
        for e in manifest:
            p = ROOT / e["folder"] / e["screenshot"]
            if not p.exists(): sys.exit(f"screenshot ausente: {p}")
            zi = zipfile.ZipInfo(e["screenshot"], ZIP_EPOCH); zi.compress_type = zipfile.ZIP_DEFLATED
            zf.writestr(zi, p.read_bytes())
    pm = {"ports": pm_ports,
          "utils": {"images.zip": {"name": "images.zip", "md5": md5_file(images), "size": images.stat().st_size, "url": f"{LATEST}/images.zip"}},
          "official_runtimes": {}}
    (out_dir / "ports.json").write_text(json.dumps(pm, indent=2, ensure_ascii=False) + "\n")
    (ROOT / "docs/ports.json").write_text(json.dumps(site, indent=1, ensure_ascii=False) + "\n")
    (ROOT / "catalog/ports.json").write_text(json.dumps(pm, indent=2, ensure_ascii=False) + "\n")
    shutil.copy(images, ROOT / "catalog/images.zip")
    print(f"{len(site)} ports no site, {len(pm_ports)} no catálogo PortMaster, images.zip {images.stat().st_size} B")
    if args.upload:
        upload(out_dir, uploads)

def upload(out_dir, uploads):
    def gh(*a): return subprocess.run(["gh", *a], check=True, text=True, capture_output=True).stdout
    try: gh("release", "view", "ports-latest", "-R", REPO)
    except subprocess.CalledProcessError:
        gh("release", "create", "ports-latest", "-R", REPO, "--title", "Ports (latest)", "--notes",
           "Release rolante: sempre a versão mais nova de cada port, com nome fixo `<port>.zip`.\n\n"
           "Catálogo PortMaster: `ports.json` + `images.zip`; coloque `040_nextos.source.json` em `PortMaster/config/` para ver estes ports dentro do app PortMaster.\n\n"
           "Rolling release: newest version of every port under a stable `<port>.zip` name, plus the PortMaster catalog.")
    with tempfile.TemporaryDirectory() as td:
        files = []
        for zpath, canon in uploads:
            dst = Path(td) / canon; shutil.copy(zpath, dst); files.append(str(dst))
        files += [str(out_dir / "ports.json"), str(out_dir / "images.zip"), str(ROOT / "catalog/040_nextos.source.json")]
        for i in range(0, len(files), 10):
            gh("release", "upload", "ports-latest", "-R", REPO, "--clobber", *files[i:i + 10])
    print("upload concluído em ports-latest")

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", default=str(ROOT / ".cache/zips"))
    ap.add_argument("--output", default=str(ROOT / ".cache/out"))
    ap.add_argument("--upload", action="store_true")
    build(ap.parse_args())
