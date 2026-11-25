"""Measure downloads between published UTC snapshots using immutable GitHub asset IDs."""
from datetime import date, timedelta
import json


def update(history_file, ports, releases, today):
    snapshots = json.loads(history_file.read_text()) if history_file.exists() else {}
    day = today.isoformat()
    cutoff = today - timedelta(days=7)
    snapshots = {key: value for key, value in snapshots.items()
                 if cutoff <= date.fromisoformat(key) <= today}
    assets = {a["browser_download_url"]: a for release in releases if not release["draft"]
              for a in release["assets"] if a["state"] == "uploaded" and a["name"].lower().endswith(".zip")}
    counts = {str(asset["id"]): asset["download_count"] for asset in assets.values()}
    selected = {p["name"]: str(assets[p["source"]["download_url"]]["id"]) for p in ports}
    current = {"counts": counts, "ports": selected}
    daily = snapshots.setdefault(day, current)
    observed = daily.setdefault("observed", {})
    for name, asset_id in selected.items():
        observed.setdefault(name, {})[asset_id] = counts[asset_id]
    since = min(snapshots)
    baseline = snapshots[since]["counts"]
    latest = {}
    assets_by_port = {}
    for _, snapshot in sorted(snapshots.items()):
        latest.update(snapshot["counts"])
        for name, asset_id in snapshot["ports"].items():
            assets_by_port.setdefault(name, set()).add(asset_id)
        for name, observations in snapshot.get("observed", {}).items():
            latest.update(observations)
            assets_by_port.setdefault(name, set()).update(observations)
    latest.update(counts)
    for port in ports:
        ids = assets_by_port[port["name"]]
        port["source"]["period_downloads"] = sum(max(0, latest[i] - baseline.get(i, 0)) for i in ids)
        port["source"]["period_since"] = since
        port["source"]["period_until"] = day
    history_file.write_text(json.dumps(snapshots, separators=(",", ":"))+"\n")
