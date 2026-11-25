"use strict";

const text = {
  pt: {
    skip: "Ir para o catálogo", catalog: "Catálogo", updates: "Atualizações", install: "Como instalar",
    heroLabel: "PORTS PARA PORTÁTEIS LINUX", heroLine1: "Jogue onde", heroLine2: "quiser.",
    heroCopy: "Encontre seu próximo port, confira os requisitos e baixe o pacote direto do GitHub.",
    explore: "Explorar catálogo", available: "ports disponíveis", origins: "plataformas de origem",
    fromGithub: "Downloads pelo GitHub", catalogCopy: "Os ZIPs incluem o port. Use os dados da sua cópia do jogo.",
    search: "Buscar um jogo…", searchLabel: "Buscar um jogo", sourcePlatform: "Plataforma de origem",
    sortBy: "Ordenar por", featured: "Em destaque", recent: "Mais recentes", alphabetical: "Nome A–Z",
    mostDownloaded: "Mais baixados", filters: "Filtros", genre: "Gênero", gameType: "Tipo de jogo",
    installMode: "Instalação", all: "Todos", free: "Gratuito", paid: "Pago", manual: "Manual",
    reset: "Limpar filtros", loading: "Carregando catálogo…", showMore: "Carregar mais ports",
    updatesCopy: "Versões publicadas recentemente no GitHub.", allReleases: "Todas as releases",
    guideCopy: "Consulte o guia do port para ver os requisitos do seu aparelho.",
    step1: "Baixe o port", step1Copy: "Abra os detalhes do jogo e baixe o ZIP da versão que você quer instalar.",
    step2: "Prepare o aparelho", step2Copy: "Siga a estrutura de pastas indicada no guia. Os caminhos variam por sistema.",
    step3: "Adicione os dados", step3Copy: "Use os arquivos da sua cópia original e abra o port pelo menu do aparelho.",
    pmImport: "Adicionar os ports ao PortMaster", pmCopy: "Baixe o arquivo da fonte e coloque em PortMaster/config/. Os ports compatíveis aparecerão quando você abrir o aplicativo novamente.",
    legal: "Os jogos e suas marcas pertencem aos respectivos titulares.", jsonCatalog: "Catálogo JSON ↗",
    close: "Fechar", details: "Detalhes", download: "Baixar ZIP", release: "Ver release ↗",
    guide: "Abrir guia ↗", prerelease: "Prévia", noResults: "Nenhum port encontrado com esses filtros.",
    unavailable: "O catálogo está temporariamente indisponível.", retry: "Tentar de novo",
    count: (shown, total) => shown < total ? "Mostrando " + shown + " de " + total + " ports" : total + (total === 1 ? " port encontrado" : " ports encontrados"),
  },
  en: {
    skip: "Skip to catalog", catalog: "Catalog", updates: "Updates", install: "How to install",
    heroLabel: "PORTS FOR LINUX HANDHELDS", heroLine1: "Play wherever", heroLine2: "you want.",
    heroCopy: "Find your next port, check the requirements and download it straight from GitHub.",
    explore: "Explore the catalog", available: "ports available", origins: "source platforms",
    fromGithub: "Downloads from GitHub", catalogCopy: "The ZIPs contain the port. Use the data from your own copy of the game.",
    search: "Search for a game…", searchLabel: "Search for a game", sourcePlatform: "Source platform",
    sortBy: "Sort by", featured: "Featured", recent: "Most recent", alphabetical: "Name A–Z",
    mostDownloaded: "Most downloaded", filters: "Filters", genre: "Genre", gameType: "Game type",
    installMode: "Installation", all: "All", free: "Free", paid: "Paid", manual: "Manual",
    reset: "Clear filters", loading: "Loading catalog…", showMore: "Load more ports",
    updatesCopy: "Versions published recently on GitHub.", allReleases: "All releases",
    guideCopy: "Read the port’s guide for your device requirements.",
    step1: "Download the port", step1Copy: "Open the game’s details and download the ZIP for the version you want to install.",
    step2: "Prepare your device", step2Copy: "Follow the folder structure in the guide. Paths vary by system.",
    step3: "Add your game data", step3Copy: "Use the files from your own copy of the game and launch the port from your device menu.",
    pmImport: "Add ports to PortMaster", pmCopy: "Download the source file and place it in PortMaster/config/. Compatible ports will appear the next time you open the app.",
    legal: "Games and trademarks belong to their respective owners.", jsonCatalog: "JSON catalog ↗",
    close: "Close", details: "Details", download: "Download ZIP", release: "View release ↗",
    guide: "Open guide ↗", prerelease: "Preview", noResults: "No ports match these filters.",
    unavailable: "The catalog is temporarily unavailable.", retry: "Try again",
    count: (shown, total) => shown < total ? "Showing " + shown + " of " + total + " ports" : total + (total === 1 ? " port found" : " ports found"),
  }
};

const platforms = {
  android: "Android", ios: "iOS", switch: "Switch", gamecube: "GameCube", wii: "Wii",
  ps2: "PlayStation 2", vita: "PS Vita", pc: "PC", web: "Web",
};
const genres = {
  action: "Ação", adventure: "Aventura", arcade: "Arcade", casual: "Casual", platformer: "Plataforma",
  puzzle: "Quebra-cabeça", racing: "Corrida", rpg: "RPG", shooter: "Tiro", simulation: "Simulação",
  sports: "Esportes", strategy: "Estratégia", horror: "Terror", other: "Outros",
  fps: "Tiro em primeira pessoa", rhythm: "Ritmo", "visual novel": "Visual novel",
  beatemup: "Beat ’em up", fighting: "Luta", metroidvania: "Metroidvania",
};
const featured = ["horizonchase.zip", "Stardew.Valley.NextOS.zip", "sor4.zip", "oceanhorn.zip", "castleofillusion.zip", "sonic4ep2.zip", "actionsquad.zip", "titansouls.zip"];
const pageSize = 12;
const repo = "https://github.com/NextOs-Ports/nextos-universal-ports";
const query = (selector) => document.querySelector(selector);
const search = query("#search");
const facetIds = ["genre", "availability", "install-mode"];
const dialog = query("#port-dialog");
const state = { lang: "pt", platform: "all", ports: null, limit: pageSize, activePort: null, failed: false };

try {
  state.lang = localStorage.getItem("nxp-lang") === "en" ? "en" : "pt";
} catch { /* The language switch works without storage. */ }

const t = (key) => text[state.lang][key];
const locale = () => state.lang === "pt" ? "pt-BR" : "en";
const genreLabel = (key) => state.lang === "pt" ? genres[key] || key : key.replaceAll("-", " ").replace(/^./, (character) => character.toUpperCase());
const clean = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const releaseName = (source) => source.release_version ? "v" + source.release_version : source.release_tag;
const dateKey = (port) => port.source.published_at || port.source.date_updated || "";
const recent = (a, b) => dateKey(b).localeCompare(dateKey(a));
const downloadCount = (port) => port.source.downloads ?? port.source.legacy_downloads ?? 0;

function element(tag, className, label) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (label) node.textContent = label;
  return node;
}

function githubURL(value) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && ["github.com", "raw.githubusercontent.com"].includes(url.hostname)) {
      return url.href;
    }
  } catch { /* Missing optional URL. */ }
  return null;
}

function link(label, href, className) {
  const anchor = element("a", className, label);
  anchor.href = href;
  return anchor;
}

function external(label, href, className) {
  const anchor = link(label, href, className);
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
}

function portLink(port, label, className) {
  const anchor = link(label, "?port=" + encodeURIComponent(port.name.replace(/\.zip$/, "")) + "#catalogo", className);
  anchor.dataset.port = port.name;
  return anchor;
}

function screenshot(port) {
  const image = element("div", "shot");
  image.dataset.title = port.attr.title;
  const source = githubURL(port.source.screenshot_url);
  if (source) {
    const img = element("img");
    img.src = source;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => img.remove(), { once: true });
    image.append(img);
  }
  return image;
}

function sizeLabel(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const [size, unit] = bytes >= 1e9 ? [bytes / 1e9, "GB"] : bytes >= 1e6 ? [bytes / 1e6, "MB"] : [bytes / 1e3, "KB"];
  return new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(size) + " " + unit;
}

function dateLabel(value) {
  return new Intl.DateTimeFormat(locale(), { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

function download(port, className) {
  const url = githubURL(port.source.download_url);
  return url ? link("↓ " + t("download"), url, className) : null;
}

function releaseLink(port, className) {
  const url = githubURL(port.source.release_url) || repo + "/releases";
  return external(t("release"), url, className);
}

function card(port) {
  const { attr, source } = port;
  const article = element("article", "card");
  const cover = portLink(port, "", "card-image");
  cover.tabIndex = -1;
  cover.setAttribute("aria-hidden", "true");
  cover.append(screenshot(port), element("span", "badge", platforms[source.platform] || source.platform));
  const info = element("div", "card-info");
  const heading = element("h3", "card-title");
  heading.append(portLink(port, attr.title));

  const meta = [source.portmaster ? "PortMaster" : source.portmaster === false ? t("manual") : "",
    ...(attr.genres || []).slice(0, 2).map(genreLabel)].filter(Boolean);
  const actions = element("div", "card-actions");
  const zip = download(port, "button card-download");
  if (zip) actions.append(zip);
  actions.append(portLink(port, t("details"), "button button-quiet"));

  const file = element("div", "file-meta");
  file.append(element("span", "", releaseName(source) + (source.prerelease ? " · " + t("prerelease") : "")),
    element("span", "", sizeLabel(source.size)));
  info.append(heading, element("p", "card-meta", meta.join(" · ")), actions, file);
  article.append(cover, info);
  return article;
}

function renderPlatforms() {
  const container = query("#platforms");
  const counts = new Map([["all", state.ports.length]]);
  for (const { source } of state.ports) counts.set(source.platform, (counts.get(source.platform) || 0) + 1);
  const focused = container.contains(document.activeElement) ? document.activeElement.dataset.platform : null;
  container.replaceChildren(...[["all", t("all")], ...Object.entries(platforms)].filter(([key]) => counts.has(key)).map(([key, label]) => {
    const button = element("button", "pill", label);
    button.type = "button";
    button.dataset.platform = key;
    button.setAttribute("aria-pressed", String(key === state.platform));
    button.append(element("small", "", String(counts.get(key))));
    return button;
  }));
  if (focused) container.querySelector('[data-platform="' + focused + '"]')?.focus();
  query("#port-count").textContent = state.ports.length;
  query("#source-count").textContent = counts.size - 1;
}

function renderGenres() {
  const select = query("#genre");
  const previous = select.value;
  const allGenres = new Set(state.ports.flatMap(({ attr }) => attr.genres || []));
  select.replaceChildren(new Option(t("all"), "all"), ...[...allGenres]
    .sort((a, b) => genreLabel(a).localeCompare(genreLabel(b), locale()))
    .map((key) => new Option(genreLabel(key), key)));
  select.value = allGenres.has(previous) ? previous : "all";
}

function filteredPorts() {
  const [genre, availability, mode] = facetIds.map((id) => query("#" + id).value);
  const queryTerms = clean(search.value.trim()).split(/\s+/).filter(Boolean);
  const list = state.ports.filter(({ name, attr, source }) => {
    const haystack = clean([attr.title, name, source.platform, platforms[source.platform], ...(attr.genres || []).map(genreLabel)].join(" "));
    return (state.platform === "all" || source.platform === state.platform) &&
      (genre === "all" || (attr.genres || []).includes(genre)) &&
      (availability === "all" || attr.availability === availability) &&
      (mode === "all" || source.portmaster === (mode === "portmaster")) &&
      queryTerms.every((term) => haystack.includes(term));
  });
  const rank = (port) => featured.includes(port.name) ? featured.indexOf(port.name) : featured.length;
  const byName = (a, b) => a.attr.title.localeCompare(b.attr.title, locale());
  const by = {
    featured: (a, b) => rank(a) - rank(b) || byName(a, b), recent: (a, b) => recent(a, b) || byName(a, b),
    name: byName, downloads: (a, b) => downloadCount(b) - downloadCount(a) || byName(a, b),
  };
  const active = [genre, availability, mode].filter((filter) => filter !== "all").length;
  query("#filter-count").hidden = active === 0;
  query("#filter-count").textContent = active;
  return list.sort(by[query("#sort").value]);
}

function renderCatalog() {
  if (!state.ports) return;
  const list = filteredPorts();
  const visible = list.slice(0, state.limit);
  query("#grid").replaceChildren(...(visible.length ? visible.map(card) : [element("p", "empty", t("noResults"))]));
  query("#results").textContent = t("count")(visible.length, list.length);
  query("#show-more").hidden = list.length <= state.limit;
}

function renderUpdates() {
  const rows = [...state.ports].filter(dateKey).sort(recent).slice(0, 5).map((port) => {
    const row = element("article", "release-row");
    const heading = element("h3");
    heading.append(portLink(port, port.attr.title));
    const data = element("div");
    data.append(heading, element("p", "", releaseName(port.source)));
    const time = element("time", "", dateLabel(dateKey(port)));
    time.dateTime = dateKey(port);
    row.append(screenshot(port), data, time, releaseLink(port, "button button-quiet"));
    return row;
  });
  query("#release-list").replaceChildren(...rows);
}

function renderDialog(port) {
  const { attr, source } = port;
  const image = screenshot(port);
  const info = element("div", "dialog-copy");
  const heading = element("h2", "", attr.title);
  heading.id = "port-title";
  const metadata = [platforms[source.platform] || source.platform, releaseName(source), sizeLabel(source.size),
    source.prerelease ? t("prerelease") : "", source.portmaster === true ? "PortMaster" : "",
    ...(attr.arch || [])].filter(Boolean);
  info.append(heading, element("p", "", metadata.join(" · ")));
  if (attr.desc) info.append(element("h3", "", t("details")), element("p", "", attr.desc));
  info.append(element("h3", "", t("install")), element("p", "", attr.inst || t("guideCopy")));
  if (source.note) info.append(element("p", "", source.note));
  const actions = element("div", "dialog-actions");
  const zip = download(port, "button button-primary");
  if (zip) actions.append(zip);
  const guide = githubURL(source.guide_url || source.readme_url) || repo + "/tree/main/" + source.folder;
  actions.append(external(t("guide"), guide, "button button-quiet"), releaseLink(port, "button button-quiet"));
  info.append(actions);
  query("#port-content").replaceChildren(image, info);
}

function openPort(name) {
  const port = state.ports?.find((entry) => entry.name === name);
  if (!port) return false;
  state.activePort = port;
  renderDialog(port);
  if (!dialog.open) dialog.showModal();
  const url = new URL(location.href);
  url.searchParams.set("port", port.name.replace(/\.zip$/, ""));
  history.replaceState(null, "", url);
  return true;
}

function renderFailure() {
  query("#results").textContent = t("unavailable");
  const help = element("div", "empty");
  const retry = element("button", "button button-quiet", t("retry"));
  retry.type = "button";
  retry.addEventListener("click", loadCatalog);
  help.append(retry, document.createTextNode(" · "), link(t("allReleases"), repo + "/releases"));
  query("#grid").replaceChildren(help);
}

function applyLanguage() {
  document.documentElement.lang = locale();
  document.querySelectorAll("[data-t]").forEach((node) => { node.textContent = t(node.dataset.t); });
  document.querySelectorAll("[data-placeholder]").forEach((node) => { node.placeholder = t(node.dataset.placeholder); });
  document.querySelectorAll("[data-aria]").forEach((node) => { node.setAttribute("aria-label", t(node.dataset.aria)); });
  const button = query("#lang");
  button.lang = state.lang === "pt" ? "en" : "pt-BR";
  button.textContent = state.lang === "pt" ? "EN" : "PT";
  button.setAttribute("aria-label", state.lang === "pt" ? "English" : "Português");
  if (state.ports) {
    renderPlatforms();
    renderGenres();
    renderCatalog();
    renderUpdates();
  } else if (state.failed) renderFailure();
  if (state.activePort) renderDialog(state.activePort);
}

function resetLimit() {
  state.limit = pageSize;
  renderCatalog();
}

async function loadCatalog() {
  state.failed = false;
  query("#results").textContent = t("loading");
  query("#grid").replaceChildren();
  try {
    const response = await fetch("ports.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Catalog unavailable");
    const ports = await response.json();
    if (!Array.isArray(ports)) throw new Error("Invalid catalog");
    state.ports = ports;
    applyLanguage();
    const key = new URLSearchParams(location.search).get("port");
    if (key) openPort(key.endsWith(".zip") ? key : key + ".zip");
  } catch {
    state.ports = null;
    state.failed = true;
    renderFailure();
  }
}

query("#lang").addEventListener("click", () => {
  state.lang = state.lang === "pt" ? "en" : "pt";
  try { localStorage.setItem("nxp-lang", state.lang); } catch { /* Storage is optional. */ }
  applyLanguage();
});
query("#platforms").addEventListener("click", (event) => {
  const button = event.target.closest("[data-platform]");
  if (!button) return;
  state.platform = button.dataset.platform;
  renderPlatforms();
  resetLimit();
});
query("#filter-toggle").addEventListener("click", (event) => {
  const panel = query("#extra-filters");
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
});
search.addEventListener("input", resetLimit);
[...facetIds, "sort"].forEach((id) => query("#" + id).addEventListener("change", resetLimit));
query("#reset").addEventListener("click", () => {
  state.platform = "all";
  search.value = "";
  facetIds.forEach((id) => { query("#" + id).value = "all"; });
  if (state.ports) renderPlatforms();
  resetLimit();
});
query("#show-more").addEventListener("click", () => {
  const firstNew = state.limit;
  state.limit += pageSize;
  renderCatalog();
  query("#grid").children[firstNew]?.querySelector(".card-title a").focus();
});
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[data-port]");
  if (anchor && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && openPort(anchor.dataset.port)) {
    event.preventDefault();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !dialog.open && !event.target.closest("input, textarea, select, [contenteditable]")) {
    event.preventDefault();
    search.focus();
  }
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => {
  state.activePort = null;
  const url = new URL(location.href);
  url.searchParams.delete("port");
  history.replaceState(null, "", url);
});
applyLanguage();
loadCatalog();
