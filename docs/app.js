(() => {
  const RAW = "https://raw.githubusercontent.com/NextOs-Ports/nextos-universal-ports/main/";
  const PLAT = { android: "Android", ios: "iOS", switch: "Switch", gamecube: "GameCube" };
  const I18N = {
    pt: { tagline: "Ports universais de jogos para portáteis Linux AArch64 · NextOS · ArkOS / R36S · ROCKNIX · muOS · PortMaster",
      how: "Como instalar", filters: "Filtros", search: "Buscar…", platform: "Plataforma de origem", genre: "Gênero", type: "Tipo", install: "Instalação", sort: "Ordenar",
      all: "Todos", free: "Jogo gratuito", paid: "Jogo pago", manual: "Manual", alpha: "A–Z", recent: "Mais recentes", downloads: "Mais baixados",
      download: "Baixar", details: "Detalhes", ports: "ports", releases: "releases", soon: "Em breve", none: "Nenhum port encontrado.",
      legal: "Nenhum pacote inclui jogo ou dados de jogo. Você precisa da sua própria cópia legítima.",
      glibc: "glibc", installpm: "PortMaster", installmanual: "manual", updated: "atualizado",
      howto: `<li>Baixe o <b>.zip</b> do port.</li><li>Copie para a pasta de ports do aparelho: <code>ports/</code> (PortMaster/ArkOS) ou <code>roms/ports</code> (NextOS).</li><li>Coloque o <b>APK/XAPK original</b> do jogo onde o README do port indicar (normalmente <code>&lt;port&gt;/gamedata/</code>).</li><li>Abra pelo menu. A primeira abertura extrai e valida os dados.</li><li><b>SELECT + START</b> sai com segurança.</li>`,
      pm: `<b>Dentro do app PortMaster:</b> baixe <a href="https://github.com/NextOs-Ports/nextos-universal-ports/releases/download/ports-latest/040_nextos.source.json">040_nextos.source.json</a> e coloque em <code>PortMaster/config/</code> (ao lado de <code>020_portmaster.source.json</code>). Na próxima abertura o PortMaster lista estes ports.`,
      footer: `Todos os jogos e marcas pertencem aos seus respectivos detentores. Os pacotes contêm apenas código de compatibilidade e documentação. · <a href="https://github.com/NextOs-Ports/nextos-universal-ports#%EF%B8%8F-aviso-legal--legal-notice">Aviso legal</a>` },
    en: { tagline: "Universal game ports for AArch64 Linux handhelds · NextOS · ArkOS / R36S · ROCKNIX · muOS · PortMaster",
      how: "How to install", filters: "Filters", search: "Search…", platform: "Source platform", genre: "Genre", type: "Type", install: "Install", sort: "Sort",
      all: "All", free: "Free game", paid: "Paid game", manual: "Manual", alpha: "A–Z", recent: "Recently updated", downloads: "Most downloaded",
      download: "Download", details: "Details", ports: "ports", releases: "releases", soon: "Coming soon", none: "No ports found.",
      legal: "No package includes the game or its data. You need your own legitimate copy.",
      glibc: "glibc", installpm: "PortMaster", installmanual: "manual", updated: "updated",
      howto: `<li>Download the port's <b>.zip</b>.</li><li>Copy it to the device's ports folder: <code>ports/</code> (PortMaster/ArkOS) or <code>roms/ports</code> (NextOS).</li><li>Place the game's <b>original APK/XAPK</b> where the port README says (usually <code>&lt;port&gt;/gamedata/</code>).</li><li>Launch from the menu. First launch extracts and validates the data.</li><li><b>SELECT + START</b> exits safely.</li>`,
      pm: `<b>Inside the PortMaster app:</b> download <a href="https://github.com/NextOs-Ports/nextos-universal-ports/releases/download/ports-latest/040_nextos.source.json">040_nextos.source.json</a> into <code>PortMaster/config/</code> (next to <code>020_portmaster.source.json</code>). PortMaster lists these ports on next launch.`,
      footer: `All games and trademarks belong to their respective owners. Packages contain compatibility code and documentation only. · <a href="https://github.com/NextOs-Ports/nextos-universal-ports#%EF%B8%8F-aviso-legal--legal-notice">Legal notice</a>` }
  };
  let lang = (localStorage.getItem("nxp-lang") || (navigator.language || "pt").slice(0, 2)) === "en" ? "en" : "pt";
  let ports = [], plat = "all";
  const $ = (s) => document.querySelector(s);
  const t = (k) => I18N[lang][k] ?? k;
  const fmtSize = (b) => b > 1e9 ? (b / 1e9).toFixed(2) + " GB" : b > 1e6 ? (b / 1e6).toFixed(1) + " MB" : Math.round(b / 1e3) + " KB";
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $("#lang").textContent = lang === "pt" ? "EN" : "PT";
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    render();
  }

  function stats() {
    const n = ports.length, pm = ports.filter((p) => p.source.portmaster).length, dl = ports.reduce((a, p) => a + (p.source.legacy_downloads || 0), 0);
    $("#stats").innerHTML = `<span class="stat"><b>${n}</b> ${t("ports")}</span><span class="stat"><b>${pm}</b> PortMaster</span><span class="stat"><b>${dl.toLocaleString()}</b> downloads</span>`;
  }

  function tabs() {
    const counts = {}; ports.forEach((p) => { counts[p.source.platform] = (counts[p.source.platform] || 0) + 1; });
    const all = [["all", t("all"), ports.length], ...Object.entries(PLAT).map(([k, v]) => [k, v, counts[k] || 0])];
    $("#tabs").innerHTML = all.map(([k, v, c]) => `<button class="tab${plat === k ? " active" : ""}" data-p="${k}">${v} <small>${c || (k === "all" ? 0 : "· " + t("soon"))}</small></button>`).join("");
    $("#tabs").querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => { plat = b.dataset.p; $("#platform").value = plat; tabs(); render(); }));
  }

  function genres() {
    const g = new Set(); ports.forEach((p) => (p.attr.genres || []).forEach((x) => g.add(x)));
    const sel = $("#genre"); const cur = sel.value;
    sel.innerHTML = `<option value="all">${t("all")}</option>` + [...g].sort().map((x) => `<option value="${x}">${x}</option>`).join("");
    sel.value = cur || "all";
  }

  function card(p) {
    const a = p.attr, s = p.source;
    const tags = [s.portmaster ? `<span class="tag pm">PortMaster</span>` : `<span class="tag manual">${t("manual")}</span>`, a.availability === "free" ? `<span class="tag free">${t("free")}</span>` : ""].join("");
    const meta = [(a.arch || []).join(" / "), a.min_glibc ? `${t("glibc")} ≥ ${a.min_glibc}` : "", ...(a.genres || [])].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join("");
    return `<article class="card" data-key="${esc(p.name)}">
      <div class="shot" style="background-image:url('${s.screenshot_url}')"><div class="tags">${tags}</div></div>
      <div class="body">
        <h3 class="title">${esc(a.title)}</h3>
        <div class="meta">${meta}</div>
        <p class="desc">${esc(a.desc)}</p>
        <div class="actions">
          <a class="btn primary" href="${s.download_url}" rel="noopener">⬇ ${t("download")}</a>
          <button class="btn details" type="button">${t("details")}</button>
        </div>
        <div class="size">${fmtSize(s.size)} · <a href="${s.release_url}" target="_blank" rel="noopener">${esc(s.release_tag)}</a>${s.date_updated ? ` · ${t("updated")} ${s.date_updated}` : ""}</div>
      </div></article>`;
  }

  function render() {
    if (!ports.length) return;
    const q = $("#q").value.trim().toLowerCase(), g = $("#genre").value, av = $("#avail").value, pmf = $("#pmf").value, sort = $("#sort").value;
    let list = ports.filter((p) => (plat === "all" || p.source.platform === plat)
      && (g === "all" || (p.attr.genres || []).includes(g))
      && (av === "all" || p.attr.availability === av)
      && (pmf === "all" || (pmf === "pm") === !!p.source.portmaster)
      && (!q || (p.attr.title + " " + p.name + " " + p.attr.desc + " " + (p.attr.genres || []).join(" ")).toLowerCase().includes(q)));
    list.sort((x, y) => sort === "recent" ? (y.source.date_updated || "").localeCompare(x.source.date_updated || "")
      : sort === "downloads" ? (y.source.legacy_downloads || 0) - (x.source.legacy_downloads || 0)
      : x.attr.title.localeCompare(y.attr.title));
    $("#grid").innerHTML = list.length ? list.map(card).join("") : `<div class="empty">${t("none")}</div>`;
    $("#grid").querySelectorAll(".details").forEach((b) => b.addEventListener("click", () => openReadme(b.closest(".card").dataset.key)));
  }

  async function openReadme(name) {
    const p = ports.find((x) => x.name === name); if (!p) return;
    $("#modal-title").textContent = p.attr.title; $("#modal-dl").href = p.source.download_url; $("#modal-rel").href = p.source.release_url;
    $("#modal-body").innerHTML = `<p class="muted">…</p>`; $("#modal").hidden = false; document.body.style.overflow = "hidden";
    try {
      const md = await (await fetch(p.source.readme_url, { cache: "no-cache" })).text();
      const base = p.source.readme_url.replace(/README\.md$/, "");
      const html = window.marked ? marked.parse(md) : `<pre>${esc(md)}</pre>`;
      $("#modal-body").innerHTML = (p.source.note ? `<p class="pm">${esc(p.source.note)}</p>` : "") + html;
      $("#modal-body").querySelectorAll("img").forEach((img) => { const s = img.getAttribute("src"); if (s && !/^https?:/.test(s)) img.src = base + s; });
      $("#modal-body").querySelectorAll("a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; const h = a.getAttribute("href"); if (h && !/^(https?:|#|mailto:)/.test(h)) a.href = "https://github.com/NextOs-Ports/nextos-universal-ports/blob/main/" + p.source.folder + "/" + h; });
    } catch (e) { $("#modal-body").innerHTML = `<p>README indisponível. <a href="${p.source.readme_url}" target="_blank" rel="noopener">${p.source.readme_url}</a></p>`; }
  }
  function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; }

  async function init() {
    $("#lang").addEventListener("click", () => { lang = lang === "pt" ? "en" : "pt"; localStorage.setItem("nxp-lang", lang); applyLang(); tabs(); stats(); genres(); });
    ["#q", "#genre", "#avail", "#pmf", "#sort"].forEach((s) => $(s).addEventListener("input", render));
    $("#platform").addEventListener("input", () => { plat = $("#platform").value; tabs(); render(); });
    $("#modal-close").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    try { ports = await (await fetch("ports.json", { cache: "no-cache" })).json(); }
    catch (e) { $("#grid").innerHTML = `<div class="empty">ports.json indisponível</div>`; return; }
    ports.forEach((p) => { p.source.screenshot_url = p.source.screenshot_url || (RAW + p.source.folder + "/" + p.attr.image.screenshot); });
    genres(); stats(); tabs(); applyLang();
    const key = new URLSearchParams(location.search).get("port"); if (key) openReadme(key.endsWith(".zip") ? key : key + ".zip");
  }
  init();
})();
