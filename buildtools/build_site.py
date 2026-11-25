#!/usr/bin/env python3
"""Build the public website catalog from GitHub release metadata, without downloading ZIPs."""

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
REPO = "https://github.com/NextOs-Ports/nextos-universal-ports"
RAW = "https://raw.githubusercontent.com/NextOs-Ports/nextos-universal-ports/main"
PLATFORMS = ("android", "ios", "switch", "gamecube", "wii", "ps2", "vita", "pc", "web")
TAG = re.compile(r"(?P<slug>[a-z0-9._-]+?)-v(?P<version>\d+(?:\.\d+){0,2})(?:-r(?P<revision>\d+))?", re.I)
ASSET_VERSION = re.compile(r"\d+\.\d+(?:\.\d+)?")
SLUG = re.compile(r"[a-z0-9][a-z0-9._-]*")


def version_key(match):
    parts = [int(part) for part in match["version"].split(".")]
    return tuple((parts + [0, 0])[:3]) + (int(match["revision"] or 0),)


def asset_for(release, names):
    assets = {asset["name"].lower(): asset for asset in release["assets"]
              if asset["state"] == "uploaded" and asset["name"].lower().endswith(".zip")
              and asset["size"] > 0}
    for name in names:
        if name.lower() in assets:
            return assets[name.lower()]
    return None


def select_release(entry, releases, stable):
    tag = entry["release_tag"]
    configured = releases.get(tag)
    configured_asset = asset_for(configured, [entry["asset"]]) if configured else None
    # Legacy releases can have combined tags or a project slug different from the ZIP name.
    anchor = TAG.match(tag)
    slug = anchor["slug"] if anchor else entry["key"]
    floor = version_key(anchor) if anchor else (0, 0, 0, 0)
    preview = configured and (configured["prerelease"] or re.search(r"-(?:rc|test|beta|alpha)", tag, re.I))
    candidates = []
    for match, release in stable.get(slug.lower(), []):
        version = version_key(match)
        if version < floor or (version == floor and not preview):
            continue
        names = [f'{entry["key"]}.zip', entry["asset"]]
        versions = ASSET_VERSION.findall(entry["asset"])
        if len(versions) == 1:
            names.append(entry["asset"].replace(versions[0], match["version"], 1))
        asset = asset_for(release, names)
        if asset:
            candidates.append((version, release["published_at"], release, asset, release["tag_name"][match.start("version"):]))
    if candidates:
        _, _, release, asset, version = max(candidates, key=lambda x: x[:2])
        return release, asset, version
    if configured_asset:
        version = ASSET_VERSION.search(entry["asset"])
        label = tag[anchor.start("version"):] if anchor else version[0] if version else tag
        return configured, configured_asset, label
    return None


def new_entries(manifest, stable):
    claimed_keys = {entry["key"].lower() for entry in manifest}
    claimed_paths = {entry["folder"] for entry in manifest}
    folders = {}
    for platform in PLATFORMS:
        for readme in (ROOT / f"ports-{platform}").glob("*/README.md"):
            if SLUG.fullmatch(readme.parent.name):
                folders.setdefault(readme.parent.name, []).append((platform, readme))
    for slug, paths in sorted(folders.items()):
        if len(paths) != 1 or slug in claimed_keys or slug not in stable:
            continue
        platform, readme = paths[0]
        folder = readme.parent.relative_to(ROOT).as_posix()
        if folder in claimed_paths:
            continue
        matches = [(match, release) for match, release in stable[slug]
                   if asset_for(release, [f"{slug}.zip"])]
        if not matches:
            continue
        match, release = max(matches, key=lambda pair: (version_key(pair[0]), pair[1]["published_at"]))
        heading = next((line[2:].strip() for line in readme.read_text(encoding="utf-8").splitlines()
                        if line.startswith("# ")), slug.replace("-", " ").title())
        yield {
            "key": slug, "title": heading, "folder": folder, "platform": platform,
            "release_tag": release["tag_name"], "asset": f"{slug}.zip",
            "screenshot": f"{slug}.screenshot.jpg", "portmaster": None,
        }


def catalog(manifest, existing, release_list):
    releases = {release["tag_name"]: release for release in release_list
                if not release["draft"] and release["published_at"]}
    stable = {}
    for tag, release in releases.items():
        match = TAG.fullmatch(tag)
        if match and not release["prerelease"]:
            stable.setdefault(match["slug"].lower(), []).append((match, release))
    existing = {port["name"]: port for port in existing}
    result = []
    for entry in [*manifest, *new_entries(manifest, stable)]:
        name = f'{entry["key"]}.zip'
        selected = select_release(entry, releases, stable)
        if not selected:
            print(f'{name}: nenhum ZIP publicado encontrado para {entry["release_tag"]}', file=sys.stderr)
            continue
        release, asset, version = selected
        previous = existing.get(name, {})
        attr = previous.get("attr", {}) | {
            "title": entry["title"],
            "genres": entry.get("genres", []),
            "availability": entry.get("availability"),
        }
        if release["tag_name"] != previous.get("source", {}).get("release_tag"):
            for key in ("items", "items_opt"):
                previous.pop(key, None)
            attr.pop("min_glibc", None)
            attr.pop("inst", None)
        for key in ("arch", "desc", "inst"):
            if key in entry:
                attr[key] = entry[key]
        folder = entry["folder"]
        image_path = f'{folder}/{entry["screenshot"]}'
        result.append({
            **previous, "version": 4, "name": name, "attr": attr,
            "source": {
                "platform": entry.get("platform", "android"),
                "folder": folder,
                "readme_url": f"{REPO}/blob/main/{quote(folder)}/README.md",
                "guide_url": (f"{REPO}/blob/main/{quote(folder)}/INSTALLATION.md"
                              if (ROOT / folder / "INSTALLATION.md").is_file() else None),
                "screenshot_url": f"{RAW}/{quote(image_path)}" if (ROOT / image_path).is_file() else None,
                "release_tag": release["tag_name"], "release_version": version,
                "release_url": release["html_url"], "download_url": asset["browser_download_url"],
                "asset": asset["name"], "size": asset["size"], "published_at": release["published_at"],
                "digest": asset.get("digest"),
                "date_updated": release["published_at"][:10], "first_seen": entry.get("first_seen"),
                "downloads": asset["download_count"], "legacy_downloads": entry.get("legacy_downloads", 0),
                "portmaster": entry.get("portmaster", True), "prerelease": release["prerelease"],
                "note": entry.get("note", ""),
            },
        })
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    manifest = json.loads((ROOT / "buildtools/manifest.json").read_text())
    existing = json.loads((ROOT / "docs/ports.json").read_text())
    releases = [release for page in json.load(sys.stdin) for release in page]
    ports = catalog(manifest, existing, releases)
    if not ports:
        sys.exit("O GitHub não retornou nenhum port com ZIP publicado.")
    args.output.write_text(json.dumps(ports, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(ports)} ports com ZIP publicado.")
