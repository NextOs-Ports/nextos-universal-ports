"use strict";

const text = {
  pt: {
    rights: "Direitos e créditos", rightsContact: "Correções de crédito e pedidos de retirada",
    rightsIntro: "A NextOS desenvolve e integra ports para portáteis Linux e mantém este catálogo. Os jogos, marcas e artes pertencem aos respectivos titulares. Os dados originais do jogo vêm da cópia legítima do jogador.",
    rightsComponents: "Consulte os créditos do port na ficha do jogo e os avisos de licença no ZIP da versão que você baixou.",
    rightsHelp: "Informe o título do jogo, o link da ficha, o material em questão e o ajuste solicitado.",
    rightsIssue: "Abrir solicitação no GitHub ↗", rightsDiscord: "Contatar a equipe no Discord ↗",
    integration: "Integração do port", authors: "Autoria do port", holder: "Direitos do jogo", components: "Projetos e componentes",
    notices: "Avisos dentro do ZIP", readCredits: "Documentação do port ↗", artSource: "Fonte da imagem",
    artLocal: "Acervo NextOS", artProvided: "Capa fornecida para o catálogo", artZip: "Imagem do pacote do port", artPlaceholder: "Imagem de identificação do catálogo",
    contactRights: "Solicitar correção de crédito ou retirada ↗",

    specSource: "Especificações de referência · PortMaster ↗", steamFilter: "Biblioteca Steam", owned: "Tenho na Steam", notOwned: "Não tenho na Steam", forget: "Esquecer biblioteca",
    importSteam: "Importar biblioteca Steam", openSteam: "Abrir minha lista na Steam ↗", steamFile: "Arquivo da biblioteca",
    steamHelp: "Com a loja Steam conectada, abra sua lista, salve a página como JSON e selecione o arquivo abaixo. Os IDs ficam neste navegador. Confira no guia a edição exigida pelo port.",
    badSteam: "Escolha um JSON da biblioteca Steam com a lista de jogos adquiridos.", matches: "ports encontrados na sua biblioteca",
    trending: "Em alta", period: "Downloads dos ZIPs", measuring: "A contagem começou. Os primeiros destaques aparecerão quando houver novos downloads.",
    similar: "Jogos semelhantes", checkDevice: "Roda no meu aparelho?", deviceModel: "Aparelho", os: "Firmware",
    unspecified: "Selecione", otherDevice: "Outro", abi: "Aplicativos ARM suportados pelo firmware", ram: "RAM instalada (MB)",
    gpu: "OpenGL ES disponível", runtime: "Bibliotecas exigidas instaladas?", yes: "Sim", no: "Não",
    passed: "Combinação testada com este ZIP.", unknown: "Compatibilidade em aberto. Confira os requisitos e o guia do port.",
    mismatch: "Requisito não atendido", minimum: "Requisitos declarados", measuredRam: "RAM do aparelho testado",
    hide: "Ocultar incompatíveis", measured: "A arquitetura informada é aceita. Confira os demais requisitos no guia.",
    weeklyUnit: "downloads no período", firstWeek: "Primeira semana em medição",

    skip: "Ir para o catálogo", catalog: "Catálogo", updates: "Atualizações", install: "Como instalar",
    support: "Suporte", architecture: "Arquitetura", discordSupport: "Suporte no Discord",
    supportCopy: "Para pedir ajuda ou relatar um bug, use o canal #port-help.",
    supportDetails: "Inclua o nome e a versão do port, o modelo do aparelho, o firmware e o log do erro, se houver.",
    joinDiscord: "Entrar no servidor ↗", openHelp: "Abrir #port-help ↗", reportBug: "Relatar bug no Discord ↗",
    heroLabel: "EM DESTAQUE · PS VITA", heroCopy: "God of War I e II em um port da edição de PS Vita para portáteis Linux.",
    viewPort: "Ver port ↗", joinCommunity: "Entrar no Discord",
    explore: "Explorar catálogo ↓", available: "ports disponíveis", origins: "plataformas de origem",
    catalogCopy: "Ports universais, desenvolvidos para atender à maioria dos portáteis Linux ARM. Confira os requisitos de cada jogo e use os dados da sua própria cópia.",
    search: "Buscar por jogo, apelido ou plataforma…", searchLabel: "Buscar ports", sourcePlatform: "Plataforma de origem",
    sortBy: "Ordenar por", featured: "Em destaque", newest: "Adicionados recentemente", recent: "Atualizados recentemente", alphabetical: "Nome A–Z",
    glibc: "glibc do firmware", device: "Aparelho testado", firmware: "Firmware testado", tested: "Testado nesta versão",
    coverage: "Use estes filtros para encontrar testes registrados no seu aparelho e firmware. Configure seu aparelho na ficha de um jogo para ocultar incompatibilidades conhecidas.",
    remove: "Remover filtro", copyLink: "Copiar link", linkCopied: "Link copiado", copyFromAddress: "Copie o link na barra de endereço",
    variants: "Outras versões",
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
    rights: "Rights and credits", rightsContact: "Credit corrections and removal requests",
    rightsIntro: "NextOS develops and integrates ports for Linux handhelds and maintains this catalog. Games, trademarks and artwork belong to their respective rights holders. Players supply the original game data from their own legitimate copies.",
    rightsComponents: "See the port credits on the game page and the license notices in the ZIP for the version you downloaded.",
    rightsHelp: "Include the game title, catalog link, material in question and the change requested.",
    rightsIssue: "Open a request on GitHub ↗", rightsDiscord: "Contact the team on Discord ↗",
    integration: "Port integration", authors: "Port authors", holder: "Game rights", components: "Projects and components",
    notices: "Notices inside the ZIP", readCredits: "Port documentation ↗", artSource: "Image source",
    artLocal: "NextOS collection", artProvided: "Cover supplied for the catalog", artZip: "Image from the port package", artPlaceholder: "Catalog identification image",
    contactRights: "Request a credit correction or removal ↗",

    specSource: "Reference specifications · PortMaster ↗", steamFilter: "Steam library", owned: "I own it on Steam", notOwned: "I don’t own it on Steam", forget: "Forget library",
    importSteam: "Import Steam library", openSteam: "Open my Steam list ↗", steamFile: "Library file",
    steamHelp: "Sign in to the Steam store, open your list, save the page as JSON and select the file below. IDs stay in this browser. Check the port guide for the required edition.",
    badSteam: "Choose a Steam library JSON containing your owned games.", matches: "matching ports in your library",
    trending: "Trending", period: "ZIP downloads", measuring: "Measurement has started. Games will appear here as new downloads arrive.",
    similar: "Similar games", checkDevice: "Will it run on my device?", deviceModel: "Device", os: "Firmware",
    unspecified: "Select", otherDevice: "Other", abi: "ARM apps supported by your firmware", ram: "Installed RAM (MB)",
    gpu: "Available OpenGL ES", runtime: "Required libraries installed?", yes: "Yes", no: "No",
    passed: "This ZIP was tested on this combination.", unknown: "Compatibility unconfirmed. Check the requirements and the port guide.",
    mismatch: "Unmet requirement", minimum: "Declared requirements", measuredRam: "RAM on tested hardware",
    hide: "Hide incompatible ports", measured: "The selected architecture is supported. Check the guide for the remaining requirements.",
    weeklyUnit: "downloads in this period", firstWeek: "Measuring the first week",

    skip: "Skip to catalog", catalog: "Catalog", updates: "Updates", install: "How to install",
    support: "Support", architecture: "Architecture", discordSupport: "Discord support",
    supportCopy: "Ask for help or report a bug in #port-help.",
    supportDetails: "Include the port name and version, your device model, firmware, and error log if available.",
    joinDiscord: "Join the server ↗", openHelp: "Open #port-help ↗", reportBug: "Report a bug on Discord ↗",
    heroLabel: "FEATURED · PS VITA", heroCopy: "God of War I and II in a port of the PS Vita edition for Linux handhelds.",
    viewPort: "View port ↗", joinCommunity: "Join Discord",
    explore: "Explore the catalog ↓", available: "ports available", origins: "source platforms",
    catalogCopy: "Universal ports designed for a broad range of ARM Linux handhelds. Check each game’s requirements and use the files from your own copy.",
    search: "Search by game, nickname or platform…", searchLabel: "Search ports", sourcePlatform: "Source platform",
    sortBy: "Sort by", featured: "Featured", newest: "Recently added", recent: "Recently updated", alphabetical: "Name A–Z",
    glibc: "Firmware glibc", device: "Tested device", firmware: "Tested firmware", tested: "Tested on this version",
    coverage: "Use these filters to find recorded tests for your device and firmware. Set up your device on a game page to hide known incompatibilities.",
    remove: "Remove filter", copyLink: "Copy link", linkCopied: "Link copied", copyFromAddress: "Copy the link from the address bar",
    variants: "Other versions",
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
const featured = ["gow-collection-vita.zip", "wind-waker-nextos.zip", "gt4.zip", "twinsanity.zip", "celosia.zip",
  "residentevil4-ios.zip", "asm2.zip", "horizonchase.zip", "Stardew.Valley.NextOS.zip", "sor4.zip"];
const aliases = {
  "gow-collection-vita.zip": "gow gow1 gow2 god of war 1 god of war 2 kratos",
  "wind-waker-nextos.zip": "zelda wind waker tww",
  "gt4.zip": "gt4 gt 4 gran turismo",
  "twinsanity.zip": "crash bandicoot",
  "residentevil4-ios.zip": "re4 resident evil biohazard",
  "asm2.zip": "tasm2 homem aranha spider man 2",
  "acpirates.zip": "ac pirates assassins creed",
};
const platformAliases = { ios: "iphone ipad", ps2: "ps2 playstation2", vita: "vita psvita", gamecube: "gc ngc", switch: "nintendo switch", pc: "windows" };
const pageSize = 12;
const repo = "https://github.com/NextOs-Ports/nextos-universal-ports";
const query = (selector) => document.querySelector(selector);
const search = query("#search");
const facetIds = ["genre", "availability", "install-mode", "architecture", "device", "firmware", "steam-filter", "compat-mode"];
let ownedApps = null;
let steamError = false;
const hardware = {};
let deviceProfiles = {};
const dialog = query("#port-dialog");
const state = { lang: "pt", platform: "all", ports: null, limit: pageSize, activePort: null, failed: false };

try {
  Object.assign(hardware, JSON.parse(localStorage.getItem("nxp-hardware") || "{}"));
  const saved = JSON.parse(localStorage.getItem("nxp-steam") || "null");
  if (Array.isArray(saved)) ownedApps = new Set(saved.filter(Number.isSafeInteger));
  state.lang = localStorage.getItem("nxp-lang") === "en" ? "en" : "pt";
} catch { /* The language switch works without storage. */ }

const t = (key) => text[state.lang][key];
const locale = () => state.lang === "pt" ? "pt-BR" : "en";
const genreLabel = (key) => state.lang === "pt" ? genres[key] || key : key.replaceAll("-", " ").replace(/^./, (character) => character.toUpperCase());
const clean = (value) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
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
  const anchor = link(label, portURL(port), className);
  anchor.dataset.port = port.name;
  return anchor;
}

function portURL(port) {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set("port", port.name.replace(/\.zip$/, ""));
  url.hash = "catalogo";
  return url.href;
}

function screenshot(port) {
  const image = element("div", "shot");
  image.dataset.title = port.attr.title;
  image.dataset.port = port.name;
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
    ...(attr.genres || []).slice(0, 2).map(genreLabel), ...(source.variants || []).map(({ title }) => title)].filter(Boolean);
  const actions = element("div", "card-actions");
  const zip = download(port, "button card-download");
  if (zip) actions.append(zip);
  actions.append(portLink(port, t("details"), "button button-quiet"));

  const file = element("div", "file-meta");
  file.append(element("span", "", releaseName(source) + (source.prerelease ? " · " + t("prerelease") : "")),
    element("span", "", sizeLabel(source.size)));
  const visual = element("div", "card-visual");
  visual.append(cover, heading);
  info.append(element("p", "card-meta", meta.join(" · ")), actions, file);
  article.append(visual, info);
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

function renderTestedOptions() {
  for (const field of ["device", "firmware"]) {
    const select = query("#" + field);
    const previous = select.value;
    const values = new Set(state.ports.flatMap(({ source }) => (source.verified_on || []).map((test) => test[field])));
    select.replaceChildren(new Option(t("all"), "all"),
      ...[...values].sort((a, b) => a.localeCompare(b, locale())).map((value) => new Option(value, value)));
    select.value = values.has(previous) ? previous : "all";
    select.disabled = values.size === 0;
  }
}

function renderChips() {
  const applied = facetIds.map((id) => [id, query("#" + id).selectedOptions[0]?.textContent])
    .filter(([id]) => query("#" + id).value !== "all");
  if (state.platform !== "all") applied.unshift(["platform", platforms[state.platform]]);
  if (search.value.trim()) applied.unshift(["q", search.value.trim()]);
  query("#active-filters").hidden = applied.length === 0;
  const chips = applied.map(([id, label]) => {
    const button = element("button", "chip", label + " ×");
    button.type = "button";
    button.setAttribute("aria-label", t("remove") + " " + label);
    button.addEventListener("click", () => {
      if (id === "platform") {
        state.platform = "all";
        renderPlatforms();
      } else if (id === "q") {
        search.value = "";
      } else {
        query("#" + id).value = "all";
      }
      resetLimit();
      query("#chips button")?.focus();
      if (!query("#chips button")) search.focus();
    });
    return button;
  });
  query("#chips").replaceChildren(...chips);
}

function filteredPorts() {
  const [genre, availability, mode, architecture, device, firmware, steam, compat] = facetIds.map((id) => query("#" + id).value);
  const term = clean(search.value);
  const queryTerms = term ? term.split(" ") : [];
  const testedFilter = device !== "all" || firmware !== "all";
  const list = state.ports.filter((port) => {
    const { name, attr, source } = port;
    const haystack = clean([attr.title, name, aliases[name], source.platform, platforms[source.platform],
      platformAliases[source.platform], ...(attr.genres || []).flatMap((key) => [key, genreLabel(key)]),
      ...(source.variants || []).map(({ title }) => title)].join(" "));
    return (state.platform === "all" || source.platform === state.platform) &&
      (genre === "all" || (attr.genres || []).includes(genre)) &&
      (availability === "all" || attr.availability === availability) &&
      (mode === "all" || source.portmaster === (mode === "portmaster")) &&
      (architecture === "all" || (attr.arch || []).some((abi) =>
        architecture === "aarch64" ? /^(aarch64|arm64|arm64-v8a)$/i.test(abi) : /^(armhf|armv7l?|arm32|armeabi-v7a)$/i.test(abi))) &&
      (!testedFilter || (source.verified_on || []).some((record) =>
        (device === "all" || device === record.device) && (firmware === "all" || firmware === record.firmware))) &&
      (compat === "all" || !incompatibleWith(port).length) &&
      (steam === "all" || (ownedApps && source.steam_appid && ownedApps.has(source.steam_appid) === (steam === "owned"))) &&
      queryTerms.every((term) => haystack.includes(term));
  });
  const rank = (port) => featured.includes(port.name) ? featured.indexOf(port.name) : featured.length;
  const relevance = (port) => term && [clean(port.attr.title), clean(port.name.replace(/\.zip$/, ""))].includes(term) ? 1 : 0;
  const byName = (a, b) => a.attr.title.localeCompare(b.attr.title, locale());
  const added = (port) => port.source.first_seen || dateKey(port);
  const by = {
    featured: (a, b) => relevance(b) - relevance(a) || rank(a) - rank(b) || byName(a, b),
    trending: (a, b) => (b.source.period_downloads || 0) - (a.source.period_downloads || 0) || byName(a,b),
    added: (a, b) => added(b).localeCompare(added(a)) || byName(a, b), recent: (a, b) => recent(a, b) || byName(a, b),
    name: byName, downloads: (a, b) => downloadCount(b) - downloadCount(a) || byName(a, b),
  };
  const active = [genre, availability, mode, architecture, device, firmware, steam, compat].filter((filter) => filter !== "all").length;
  query("#filter-count").hidden = active === 0;
  query("#filter-count").textContent = active;
  return list.sort(by[query("#sort").value]);
}

function renderCatalog() {
  if (!state.ports) return;
  renderChips();
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

function relatedGames(port) {
  const genres = new Set(port.attr.genres || []);
  return state.ports.filter((game) => game.name !== port.name).map((game) => {
    const shared = (game.attr.genres || []).filter((genre) => genres.has(genre)).length;
    return { game, score: 3 * shared + Number(game.source.platform === port.source.platform) };
  }).filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.game.attr.title.localeCompare(b.game.attr.title, locale()))
    .slice(0, 4).map((item) => item.game);
}

function incompatibleWith({ attr, source }) {
  const problems = [];
  const needs = source.requirements || {};
  const arch = (attr.arch || []).map((value) => {
    if (/^(armhf|armv7l?|arm32|armeabi-v7a)$/i.test(value)) return "armhf";
    if (/^(aarch64|arm64|arm64-v8a)$/i.test(value)) return "aarch64";
    return value;
  });
  if (hardware.abi && arch.length && !arch.some((abi) => hardware.abi.split("+").includes(abi))) {
    problems.push(arch.join(" / "));
  }
  const minGlibc = needs.glibc || attr.min_glibc;
  if (hardware.glibc && minGlibc && hardware.glibc.localeCompare(String(minGlibc), "en", {numeric: true}) < 0) {
    problems.push("glibc ≥ " + minGlibc);
  }
  if (hardware.gpu && needs.gles && Number(hardware.gpu) < needs.gles) problems.push("OpenGL ES " + needs.gles);
  if (Number(hardware.ram) > 0 && needs.ram_mb > Number(hardware.ram)) problems.push(needs.ram_mb + " MB RAM");
  // Runtime answers are specific to a port's list of required libraries.
  if (needs.libraries?.length && hardware["libs:" + needs.libraries.join("|")] === "no") problems.push(needs.libraries.join(", "));
  return problems;
}

function deviceChecker(port) {
  const panel = element("details", "compatibility checker");
  panel.append(element("summary", "", t("checkDevice")));
  const form = element("div", "check-fields");
  const result = element("p", "check-result");
  result.setAttribute("role", "status");
  const needs = port.source.requirements || {};
  const requirements = [...(port.attr.arch || []), ...(needs.libraries || [])];
  if (needs.gles) requirements.push("OpenGL ES " + needs.gles);
  const glibc = needs.glibc || port.attr.min_glibc;
  if (glibc) requirements.push("glibc ≥ " + glibc);
  if (needs.ram_mb) requirements.push(needs.ram_mb + " MB RAM");
  if (requirements.length) panel.append(element("h3", "", t("minimum")), element("p", "", requirements.join(" · ")));
  if (needs.tested_ram_mb) panel.append(element("p", "", t("measuredRam") + " · " + needs.tested_ram_mb + " MB"));
  function verdict() {
    const tested = (port.source.verified_on || []).some((test) => test.device === hardware.device && test.firmware === hardware.firmware);
    const conflicts = incompatibleWith(port);
    const hasAbi = hardware.abi && port.attr.arch?.length;
    result.textContent = conflicts.length ? t("mismatch") + " · " + conflicts.join(", ")
      : tested ? t("passed") : hasAbi ? t("measured") : t("unknown");
  }
  function addField(key, label, choices) {
    const wrap = element("label");
    wrap.append(element("span", "", t(label)));
    const select = element("select");
    select.name = key;
    select.add(new Option(t("unspecified"), ""));
    for (const [value, name] of choices) select.add(new Option(name, value));
    select.value = hardware[key] || "";
    select.addEventListener("change", () => {
      let rebuild = false;
      if (key === "device" || key === "firmware") {
        const device = key === "device" ? select.value : hardware.device;
        const systems = Object.keys(deviceProfiles[device] || {});
        const firmware = key === "firmware" ? select.value : systems.length === 1 ? systems[0] : "";
        for (const saved of Object.keys(hardware)) delete hardware[saved];
        Object.assign(hardware, {device, firmware}, deviceProfiles[device]?.[firmware] || {});
        rebuild = true;
      } else hardware[key] = select.value;
      try { localStorage.setItem("nxp-hardware", JSON.stringify(hardware)); } catch { /* Storage is optional. */ }
      if (rebuild) {
        const updated = deviceChecker(port);
        updated.open = true;
        panel.replaceWith(updated);
        updated.querySelector('[name="' + key + '"]').focus();
      } else verdict();
      renderCatalog();
    });
    wrap.append(select);
    form.append(wrap);
  }
  for (const [field, label] of [["device","deviceModel"],["firmware","os"]]) {
    const tested = [...query("#" + field).options].filter((o) => o.value !== "all").map((o) => o.value);
    const models = field === "device" ? deviceProfiles : deviceProfiles[hardware.device];
    const names = new Set(models ? Object.keys(models) : []);
    if (field === "device" || !models) tested.forEach((value) => names.add(value));
    const values = [...names].sort().map((value) => [value,value]);
    values.push(["other", t("otherDevice")]);
    addField(field, label, values);
  }
  addField("abi", "abi", [["armhf","ARMHF (32-bit)"],["aarch64","ARM64"],["aarch64+armhf","ARM64 + ARMHF"]]);
  if (glibc) addField("glibc", "glibc", [...new Set(["2.17","2.27","2.28","2.30","2.31","2.36","2.39","2.41","2.43", hardware.glibc, glibc].filter(Boolean))].sort((a,b) => a.localeCompare(b,"en",{numeric:true})).map((v) => [v,v]));
  if (needs.gles) addField("gpu", "gpu", ["1.1","2.0","3.0","3.1","3.2"].map((v) => [v,v]));
  if (needs.ram_mb || needs.tested_ram_mb) addField("ram","ram",["256","512","1024","2048","4096","8192"].map((v) => [v,v]));
  if (needs.libraries?.length) addField("libs:" + needs.libraries.join("|"), "runtime", [["yes",t("yes")],["no",t("no")]]);
  verdict();
  panel.append(form, result);
  if (deviceProfiles[hardware.device]?.[hardware.firmware]) {
    panel.append(external(t("specSource"), "https://portmaster.games/installation/supported-handhelds/", "dialog-link"));
  }
  return panel;
}

function renderTrending() {
  const source = state.ports.find((p) => p.source.period_since)?.source;
  const list = state.ports.filter((p) => p.source.period_downloads > 0)
    .sort((a,b) => b.source.period_downloads - a.source.period_downloads || a.attr.title.localeCompare(b.attr.title, locale())).slice(0,4);
  const period = query("#trend-period");
  if (source) {
    const days = (Date.parse(source.period_until) - Date.parse(source.period_since)) / 86400000;
    period.textContent = [days < 7 ? t("firstWeek") : "", t("period"), dateLabel(source.period_since) + " – " + dateLabel(source.period_until)].filter(Boolean).join(" · ");
  } else period.textContent = "";
  const cards = list.map((port) => {
    const item = card(port);
    item.querySelector(".card-meta").textContent = port.source.period_downloads + " " + t("weeklyUnit");
    return item;
  });
  query("#trending-grid").replaceChildren(...(cards.length ? cards : [element("p","empty",t("measuring"))]));
}

function renderSteam() {
  query("#steam-filter").disabled = !ownedApps;
  query("#steam-forget").hidden = !ownedApps;
  const count = state.ports.filter((p) => ownedApps?.has(p.source.steam_appid)).length;
  query("#steam-status").textContent = steamError ? t("badSteam") : ownedApps ? count + " " + t("matches") : "";
}

query("#steam-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || !state.ports) return;
  try {
    const data = JSON.parse(await file.text());
    const ids = data.rgOwnedApps ?? data.response?.games?.map((game) => game.appid);
    if (!Array.isArray(ids) || !ids.every((id) => Number.isSafeInteger(id) && id > 0)) throw new Error("Invalid Steam list");
    ownedApps = new Set(ids);
    steamError = false;
    try { localStorage.setItem("nxp-steam", JSON.stringify([...ownedApps])); } catch { /* Optional persistence. */ }
    query("#steam-filter").value = "owned";
  } catch { steamError = true; }
  event.target.value = "";
  renderSteam();
  resetLimit();
});
query("#steam-forget").addEventListener("click", () => {
  ownedApps = null;
  steamError = false;
  try { localStorage.removeItem("nxp-steam"); } catch { /* Optional persistence. */ }
  query("#steam-filter").value = "all";
  renderSteam();
  resetLimit();
});

function portCredits(port) {
  const { attr, source } = port;
  const credits = source.credits || {};
  const panel = element("details", "compatibility port-credits");
  panel.append(element("summary", "", t("rights")));
  function line(label, value) {
    const item = element("p");
    item.append(element("strong", "", t(label) + " · "), value);
    panel.append(item);
  }
  line("integration", credits.integration || "NextOS");
  const porters = [attr.porter || []].flat().filter((name) => !["nextos", "nextos-ports"].includes(String(name).toLowerCase()));
  if (porters.length) line("authors", porters.join(", "));
  if (credits.game_rightsholder) line("holder", credits.game_rightsholder);
  if (credits.components?.length) line("components", credits.components.join(", "));
  if (credits.notices?.length) line("notices", credits.notices.join(" · "));
  const image = credits.image_source;
  const origins = { local: "artLocal", zip: "artZip", placeholder: "artPlaceholder", "provided-cover": "artProvided" };
  if (Object.hasOwn(origins, image)) line("artSource", t(origins[image]));
  else if (typeof image === "string" && image.startsWith("https://")) {
    line("artSource", external(new URL(image).hostname + " ↗", image, "dialog-link"));
  }
  const actions = element("div", "dialog-actions");
  const docs = githubURL(source.readme_url);
  if (docs) actions.append(external(t("readCredits"), docs, "button button-quiet"));
  const request = new URL(repo + "/issues/new");
  request.searchParams.set("title", t("rights") + " · " + attr.title + " · " + releaseName(source));
  request.searchParams.set("body", portURL(port) + "\n" + source.release_url + "\n\n");
  actions.append(external(t("contactRights"), request.href, "button button-quiet"));
  panel.append(actions);
  return panel;
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
  if (source.verified_on?.length) {
    const tested = element("ul", "tested-list");
    tested.append(...source.verified_on.map(({ device, firmware }) => element("li", "", device + " · " + firmware)));
    info.append(element("h3", "", t("tested")), tested);
  }
  const actions = element("div", "dialog-actions");
  const zip = download(port, "button button-primary");
  if (zip) actions.append(zip);
  const guide = githubURL(source.guide_url || source.readme_url) || repo + "/tree/main/" + source.folder;
  actions.append(external(t("guide"), guide, "button button-quiet"), releaseLink(port, "button button-quiet"));
  const help = query("#suporte a[href*='discord.com/channels/']").href;
  actions.append(external(t("reportBug"), help, "button button-quiet"));
  const copy = element("button", "button button-quiet", t("copyLink"));
  copy.type = "button";
  copy.setAttribute("aria-live", "polite");
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(portURL(port));
      copy.textContent = t("linkCopied");
    } catch {
      copy.textContent = t("copyFromAddress");
    }
  });
  actions.append(copy);
  info.append(actions);
  if (source.variants?.length) {
    info.append(element("h3", "", t("variants")));
    for (const variant of source.variants) {
      const row = element("div", "variant");
      const metadata = [variant.title, "v" + variant.version, variant.prerelease ? t("prerelease") : "", sizeLabel(variant.size)];
      row.append(element("p", "", metadata.filter(Boolean).join(" · ")));
      const zipURL = githubURL(variant.download_url);
      if (zipURL) row.append(link(t("download"), zipURL, "button button-quiet"));
      const notesURL = githubURL(variant.release_url);
      if (notesURL) row.append(external(t("release"), notesURL, "button button-quiet"));
      info.append(row);
    }
  }
  info.append(portCredits(port), deviceChecker(port));
  const related = relatedGames(port);
  if (related.length) {
    info.append(element("h3", "", t("similar")));
    const links = element("div", "related");
    for (const game of related) {
      const anchor = portLink(game, "", "related-game");
      anchor.append(screenshot(game), element("span", "", game.attr.title));
      links.append(anchor);
    }
    info.append(links);
  }
  query("#port-content").replaceChildren(image, info);
}

function openPort(name) {
  const port = state.ports?.find((entry) => entry.name === name);
  if (!port) return false;
  const switching = dialog.open;
  state.activePort = port;
  renderDialog(port);
  if (!switching) dialog.showModal();
  else { dialog.scrollTop = 0; query(".dialog-close").focus({preventScroll: true}); }
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
    renderTestedOptions();
    renderCatalog();
    renderUpdates();
    renderTrending();
    renderSteam();
  } else if (state.failed) renderFailure();
  if (state.activePort) renderDialog(state.activePort);
}

function filterURL() {
  const url = new URL(location.href);
  const filters = { q: search.value.trim(), platform: state.platform, sort: query("#sort").value };
  for (const id of facetIds) filters[id] = query("#" + id).value;
  for (const [id, value] of Object.entries(filters)) {
    if (!value || value === "all" || (id === "sort" && value === "featured")) url.searchParams.delete(id);
    else url.searchParams.set(id, value);
  }
  history.replaceState(null, "", url);
}

function restoreFilters() {
  const params = new URLSearchParams(location.search);
  search.value = params.get("q") || "";
  const platform = params.get("platform");
  if (state.ports.some(({ source }) => source.platform === platform)) state.platform = platform;
  for (const id of [...facetIds, "sort"]) {
    const select = query("#" + id);
    const value = params.get(id);
    if (id === "steam-filter" && !ownedApps) continue;
    if (id === "compat-mode" && !Object.values(hardware).some(Boolean)) continue;
    if ([...select.options].some((option) => option.value === value)) select.value = value;
  }
}

function resetLimit() {
  state.limit = pageSize;
  if (state.ports) filterURL();
  renderCatalog();
}

async function loadCatalog() {
  state.failed = false;
  query("#results").textContent = t("loading");
  query("#grid").replaceChildren();
  try {
    const [response, profiles] = await Promise.all([
      fetch("ports.json", { cache: "no-cache" }),
      fetch("hardware.json").then((r) => r.ok ? r.json() : {}).catch(() => ({})),
    ]);
    deviceProfiles = profiles;
    if (!response.ok) throw new Error("Catalog unavailable");
    const ports = await response.json();
    if (!Array.isArray(ports)) throw new Error("Invalid catalog");
    state.ports = ports;
    renderGenres();
    renderTestedOptions();
    restoreFilters();
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
  search.focus();
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
function closePort() {
  state.activePort = null;
  const url = new URL(location.href);
  url.searchParams.delete("port");
  history.replaceState(null, "", url);
  dialog.close();
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closePort();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closePort();
});
dialog.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  closePort();
});
applyLanguage();
loadCatalog();
