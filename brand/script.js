/* ============================================================
   Hải Có Gì Hay? — landing page interactions

   Service data comes from window.PRICING, which build.py generates
   from pricing.csv into index.html. Edit pricing.csv, then run
   `python build.py` — nothing here needs to change for price edits.
   ============================================================ */

/* ---------- Service data ---------- */
const DEFAULT_PRICING = [
  { id: "content", price: 15, min: 1, max: 60, weight: 30,
    name: { en: "Content", vi: "Content" }, unit: { en: "post", vi: "bài" },
    card: { en: "Social posts, captions, blogs & scripts. Priced per post.",
            vi: "Social posts, caption, blog & kịch bản. Tính theo bài viết." } },
  { id: "consulting", price: 15, min: 0, max: 20, weight: 20,
    name: { en: "Consulting", vi: "Tư vấn" }, unit: { en: "hour", vi: "giờ" },
    card: { en: "Marketing, brand & strategy consulting. Priced per hour.",
            vi: "Tư vấn marketing, thương hiệu & chiến lược. Tính theo giờ." } },
  { id: "video", price: 40, min: 0, max: 20, weight: 30,
    name: { en: "Video", vi: "Video" }, unit: { en: "video", vi: "video" },
    card: { en: "TikTok, Reels, Shorts & video editing. Priced per video.",
            vi: "TikTok, Reels, Shorts & dựng video. Tính theo video." } },
  { id: "management", price: 100, min: 0, max: 12, weight: 20,
    name: { en: "Management", vi: "Quản lý" }, unit: { en: "week", vi: "tuần" },
    card: { en: "Channel management, scheduling & community. Priced per week.",
            vi: "Quản lý kênh, lên lịch & cộng đồng. Tính theo tuần." } }
];

const SERVICES = (Array.isArray(window.PRICING) && window.PRICING.length ? window.PRICING : DEFAULT_PRICING)
  .map((s) => ({ ...s, price: +s.price, min: +s.min, max: +s.max, weight: +s.weight }));

const ICONS = { content: "✍️", consulting: "💡", video: "🎬", management: "📊" };

/* ---------- i18n ----------
   All on-page text lives in i18n.json. build.py injects it as window.I18N.
   Edit i18n.json, then run `python build.py`. */
const I18N =
  window.I18N && typeof window.I18N === "object" && Object.keys(window.I18N).length
    ? window.I18N
    : { vi: {}, en: {} };

if (!Object.keys(I18N[Object.keys(I18N)[0]] || {}).length) {
  console.warn("[hcgh] window.I18N is empty — run `python build.py` to inject i18n.json.");
}

const LANGS = Object.keys(I18N);
let lang = localStorage.getItem("hcgh-lang");
if (!LANGS.includes(lang)) lang = LANGS.includes("vi") ? "vi" : LANGS[0];

const t = (key) => (I18N[lang] && I18N[lang][key]) || key;

/* ---------- Currency ----------
   Prices in PRICING are USD. config.json (window.CONFIG) maps each language to
   a currency: amount shown = usd * perUsd, rounded to roundTo. */
const CONFIG =
  window.CONFIG && typeof window.CONFIG === "object" ? window.CONFIG : {};
const CURRENCIES = CONFIG.currencies || {};
const FALLBACK_CURRENCY = { code: "USD", symbol: "$", position: "before", perUsd: 1, roundTo: 1, locale: "en-US" };

function currency() {
  return CURRENCIES[lang] || CURRENCIES.en || FALLBACK_CURRENCY;
}

/* format a USD amount into the active language's currency */
function price(usd) {
  const c = currency();
  const step = +c.roundTo || 1;
  const amount = Math.round((usd * (+c.perUsd || 1)) / step) * step;
  const num = amount.toLocaleString(c.locale || "en-US");
  return c.position === "after" ? `${num} ${c.symbol}` : `${c.symbol}${num}`;
}

/* plain USD, for the internal package summary sent with the contact form */
const usd = (n) => "$" + n.toLocaleString("en-US");

/* pluralise a counter word for English only */
function unitLabel(s, qty) {
  const u = s.unit[lang];
  if (lang === "en" && qty !== 1 && !u.endsWith("s")) return u + "s";
  return u;
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (el.tagName === "TITLE") { document.title = t(key); return; }
    if (el.tagName === "META") { el.setAttribute("content", t(key)); return; }
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll(".lang-opt").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.lang === lang);
  });
  renderServiceCards();
  renderPackage();
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
  localStorage.setItem("hcgh-lang", lang);
  applyLang();
});

/* ---------- Theme ---------- */
const savedTheme = localStorage.getItem("hcgh-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("hcgh-theme", next);
});

/* ---------- Mobile nav ---------- */
const navLinks = document.getElementById("navLinks");
document.getElementById("navBurger").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

/* ---------- Carousel ---------- */
(function carousel() {
  const track = document.getElementById("carouselTrack");
  const slides = track.children.length;
  const dotsWrap = document.getElementById("carouselDots");
  let index = 0, timer;

  for (let i = 0; i < slides; i++) {
    const b = document.createElement("button");
    b.addEventListener("click", () => go(i));
    dotsWrap.appendChild(b);
  }
  const dots = [...dotsWrap.children];

  function go(i) {
    index = (i + slides) % slides;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle("is-active", di === index));
    restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(index + 1), 6000); }

  document.getElementById("carPrev").addEventListener("click", () => go(index - 1));
  document.getElementById("carNext").addEventListener("click", () => go(index + 1));
  go(0);
})();

/* ---------- Service cards ---------- */
function renderServiceCards() {
  const wrap = document.getElementById("serviceCards");
  wrap.innerHTML = SERVICES.map((s) => `
    <article class="card">
      <div class="card-icon">${ICONS[s.id] || "✨"}</div>
      <h3>${s.name[lang]}</h3>
      <p>${s.card[lang]}</p>
      <span class="card-unit">${t("unit.from")} ${price(s.price)} / ${s.unit[lang]}</span>
    </article>`).join("");

  const addonEl = document.getElementById("addonPrice");
  if (addonEl) addonEl.textContent = `${t("unit.from")} ${price(+CONFIG.addonPriceUsd || 300)}`;
}

/* ---------- Budget builder ---------- */
const state = {}; // id -> quantity
const budgetInput = document.getElementById("budget");
const budgetValueEl = document.getElementById("budgetValue");
const packageTotalEl = document.getElementById("packageTotal");
const packageSummaryEl = document.getElementById("packageSummary");

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const totalWeight = SERVICES.reduce((s, x) => s + x.weight, 0);

/* Allocate a budget across services by weight, then convert to integer quantities. */
function allocateFromBudget(budget) {
  SERVICES.forEach((s) => {
    const alloc = (budget * s.weight) / totalWeight;
    state[s.id] = clamp(Math.round(alloc / s.price), s.min, s.max);
  });
}

const currentTotal = () => SERVICES.reduce((sum, s) => sum + state[s.id] * s.price, 0);

function renderPackage() {
  const list = document.getElementById("packageList");
  list.innerHTML = SERVICES.map((s) => `
    <li data-key="${s.id}">
      <span class="pk-name">${s.name[lang]}</span>
      <span class="pk-qty">
        <button type="button" data-act="dec" aria-label="minus">−</button>
        <span class="pk-count">${state[s.id]} ${unitLabel(s, state[s.id])}</span>
        <button type="button" data-act="inc" aria-label="plus">+</button>
      </span>
    </li>`).join("");

  list.querySelectorAll("li").forEach((li) => {
    const id = li.dataset.key;
    li.querySelector('[data-act="dec"]').onclick = () => step(id, -1);
    li.querySelector('[data-act="inc"]').onclick = () => step(id, +1);
  });

  const total = currentTotal();
  packageTotalEl.textContent = price(total);
  budgetValueEl.textContent = price(+budgetInput.value);
  packageSummaryEl.value =
    SERVICES.map((s) => `${s.name.en}: ${state[s.id]} ${s.unit.en}`).join(", ") +
    ` | ${usd(total)}` +
    (currency().code !== "USD" ? ` (~${price(total)})` : "");
}

/* Manual +/- : change one item, then sync the budget slider to the new total. */
function step(id, dir) {
  const s = SERVICES.find((x) => x.id === id);
  state[id] = clamp(state[id] + dir, s.min, s.max);
  budgetInput.value = clamp(currentTotal(), +budgetInput.min, +budgetInput.max);
  renderPackage();
}

budgetInput.addEventListener("input", () => {
  allocateFromBudget(+budgetInput.value);
  renderPackage();
});

/* ---------- Contact form ---------- */
const CONTACT = CONFIG.contact || {};
const contactForm = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setStatus(kind, msg) {
  statusEl.hidden = false;
  statusEl.className = "form-status " + kind;
  const icon = kind === "ok" ? "✓ " : kind === "error" ? "⚠ " : "";
  statusEl.textContent = icon + msg;
}

/* Human-readable message the owner receives (Zalo / Telegram / email). */
function buildRequestMessage(f) {
  const lines = [
    t("msg.title"),
    "",
    `• ${t("contact.name")}: ${f.name.value.trim()}`,
    `• ${t("contact.phone")}: ${f.phone.value.trim()}`,
    `• ${t("contact.email")}: ${f.email.value.trim()}`,
  ];
  const note = f.message.value.trim();
  if (note) lines.push(`• ${t("contact.message")}: ${note}`);

  const picked = SERVICES.filter((s) => state[s.id] > 0).map(
    (s) => `   - ${s.name[lang]}: ${state[s.id]} ${unitLabel(s, state[s.id])}`
  );
  if (picked.length) {
    lines.push("", t("msg.package"), ...picked);
    lines.push(`   ${t("builder.total")}: ${price(currentTotal())}${t("builder.perMonth")}`);
  }
  return lines.join("\n");
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;
  const btn = f.querySelector('button[type="submit"]');
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim());
  const phoneOk = /^[+()\d][\d\s().-]{7,}$/.test(f.phone.value.trim());

  if (!f.name.value.trim() || !emailOk || !phoneOk) {
    setStatus("error", t("contact.err"));
    return;
  }

  const text = buildRequestMessage(f);
  const payload = {
    source: "haicogihay-landing",
    lang,
    name: f.name.value.trim(),
    phone: f.phone.value.trim(),
    email: f.email.value.trim(),
    message: f.message.value.trim(),
    package: packageSummaryEl.value,
    text,
  };
  // Web3Forms and similar services take an access key + email-labelling fields
  if (CONTACT.accessKey) {
    payload.access_key = CONTACT.accessKey;
    payload.subject = `${t("msg.title")} — ${payload.name}`;
    payload.from_name = "Hải Có Gì Hay? website";
  }

  const endpoint = CONTACT.submitEndpoint;
  if (endpoint) {
    btn.disabled = true;
    setStatus("info", t("contact.sending"));
    try {
      // Form services (Web3Forms etc.) send an access key and handle JSON + CORS.
      // A bare relay (Apps Script) needs text/plain to skip the CORS preflight.
      const isFormService = !!CONTACT.accessKey;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": isFormService ? "application/json" : "text/plain;charset=utf-8",
          ...(isFormService ? { Accept: "application/json" } : {}),
        },
        body: JSON.stringify(payload),
      });
      let body = {};
      try { body = await res.json(); } catch (_) { /* relay may reply non-JSON */ }
      if (!res.ok || body.ok === false || body.success === false) {
        throw new Error(body.message || body.error || "HTTP " + res.status);
      }
      setStatus("ok", t("contact.ok"));
      f.reset();
      allocateFromBudget(+budgetInput.value);
      renderPackage();
    } catch (err) {
      console.error("[hcgh] submit failed:", err);
      setStatus("error", t("contact.errNet"));
    } finally {
      btn.disabled = false;
    }
    return;
  }

  /* No relay configured yet — open a pre-filled email draft as a fallback. */
  const to = CONTACT.email || "nguyenquyhai2002@gmail.com";
  window.location.href =
    `mailto:${to}?subject=${encodeURIComponent(t("msg.title"))}&body=${encodeURIComponent(text)}`;
  setStatus("ok", t("contact.ok"));
});

/* ---------- Init ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
allocateFromBudget(+budgetInput.value);
applyLang();
