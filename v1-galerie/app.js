/* ═══════════════════════════════════════════════════════════════
   GATINOS SELECTION — „Stille Galerie“ · App-Logik (Vanilla JS)
   Warenkorb: localStorage · Mock-Checkout: Demo, kein Payment
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/* ── Daten ─────────────────────────────────────────────────── */

const ASSETS = "../assets/web/";

const COLORS = {
  natur:   { label: "Naturweiß", hex: "#f2eee4", dark: false },
  sand:    { label: "Sand",      hex: "#d9cdb2", dark: false },
  schwarz: { label: "Schwarz",   hex: "#1a1a1a", dark: true  },
};

const SIZES = ["S", "M", "L", "XL", "XXL"];

const PRODUCTS = [
  { id: "staub",     nr: 1, img: "stricher-orig-1.jpg",     title: "Sich aus dem Staub gemacht", story: "Ein Segelschiff als Ballon, von winzigen Figuren über ein Seil hochgezogen.", price: 44, colors: ["natur", "sand", "schwarz"], hero: true },
  { id: "tau",       nr: 2, img: "stricher-orig-2.jpg",     title: "Tauziehen",                  story: "Ein Schiff an straffen Tauen, das von zwei Gruppen gegeneinander gezogen wird.", price: 39, colors: ["natur", "sand", "schwarz"] },
  { id: "lampe",     nr: 3, img: "stromlinien-sanft-3.jpg", title: "Wolkenlampe",                story: "Eine Lampe in der Wolke, eine S-förmige Lichtbahn führt aus dem Tunnel.", price: 39, colors: ["natur", "sand", "schwarz"] },
  { id: "beine",     nr: 4, img: "stromlinien-sanft-1.jpg", title: "Wolke mit Beinen",           story: "Eine Wolke auf Stativbeinen, wandernd über einer Schneelandschaft.", price: 39, colors: ["natur", "sand", "schwarz"] },
  { id: "nachtlicht",nr: 5, img: "stromlinien-dram-1.jpg",  title: "Nachtlicht",                 story: "Eine weiße Wolke in der Nacht — die Zeichnung kehrt das Papier um.", price: 39, colors: ["schwarz"], dram: true },
  { id: "kauz",      nr: 6, img: "kauz-sanft-2.jpg",        title: "Der Kauz",                   story: "Eine Eule mit Brille und Buch auf der Psychologie-Statik, darüber der Halbmond.", price: 39, colors: ["natur", "sand", "schwarz"] },
  { id: "herz",      nr: 7, img: "herz-sanft-2.jpg",        title: "Found my heart",             story: "Ein Herz-Medallion in einer geöffneten, gravierten Schublade.", price: 42, colors: ["natur", "sand", "schwarz"] },
  { id: "moment",    nr: 8, img: "kamera-sanft-1.jpg",      title: "Momentaufnahme",             story: "Eine Faltkamera auf dem Tischchen, darunter ein Landschaftsfoto.", price: 39, colors: ["natur", "sand", "schwarz"] },
  { id: "glocke",    nr: 9, img: "kamera-dram-1.jpg",       title: "Die Glocke",                 story: "Ein Auge im Inneren der Glocke, ihr Strahl fällt auf ein Foto.", price: 42, colors: ["schwarz"], dram: true },
];

const CART_KEY = "gatinos_cart_v1";
const fmt = (n) => n + " €";
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const pad2 = (n) => String(n).padStart(2, "0");
const nrLabel = (p) => `${pad2(p.nr)} / ${pad2(PRODUCTS.length)}`;

/* ── Mockup: Shirt-Silhouette + Print ──────────────────────── */

let uid = 0;

function teeSVG(hex, dark) {
  const g = "tee-g" + (++uid);
  const grad = dark
    ? `<stop offset="0" stop-color="#ffffff" stop-opacity=".08"/><stop offset=".45" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".4"/>`
    : `<stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".07"/>`;
  const seam = dark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.06)";
  const collar = dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)";
  const body = "M110 40 C122 64 198 64 210 40 L262 62 C274 68 283 79 287 93 L306 160 C308.5 169 303 178 294 181 L252 194 L250 326 C250 339 240 349 227 349 L93 349 C80 349 70 339 70 326 L68 194 L26 181 C17 178 11.5 169 14 160 L33 93 C37 79 46 68 58 62 Z";
  return `<svg viewBox="0 0 320 360" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">${grad}</linearGradient></defs>
    <path d="${body}" fill="${hex}"/>
    <path d="${body}" fill="url(#${g})"/>
    <path d="M58 62 C62 104 65 150 68 194" fill="none" stroke="${seam}" stroke-width="1.5"/>
    <path d="M262 62 C258 104 255 150 252 194" fill="none" stroke="${seam}" stroke-width="1.5"/>
    <path d="M74 338 L246 338" fill="none" stroke="${seam}" stroke-width="1.5"/>
    <path d="M110 40 C122 64 198 64 210 40" fill="none" stroke="${collar}" stroke-width="8"/>
    <path d="M115 45 C128 61 192 61 205 45" fill="none" stroke="${seam}" stroke-width="3"/>
  </svg>`;
}

/**
 * Shirt-Mockup mit Print.
 * helle Motive (cremeweißes Papier) → mix-blend-mode: multiply auf hellem Shirt,
 * Schwarz-Motive (weiße Zeichnung auf Schwarz) → screen, ausschließlich auf schwarzem Shirt.
 */
function mockupHTML(p, colorKey, label) {
  const c = COLORS[colorKey];
  const blend = p.dram ? "print-screen" : "print-multiply";
  const alt = label || `Shirt (${c.label}) mit Motiv „${p.title}“`;
  return `<div class="mockup">
    ${teeSVG(c.hex, c.dark)}
    <img class="print ${blend}" src="${ASSETS}${p.img}" alt="${alt}" loading="lazy" draggable="false">
  </div>`;
}

/* ── localStorage-Warenkorb ────────────────────────────────── */

let cart = loadCart();

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch { return {}; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Demo-tolerant */ }
}
const cartKey = (id, size, color) => `${id}|${size}|${color}`;
const cartCount = () => Object.values(cart).reduce((s, it) => s + it.qty, 0);
const cartTotal = () => Object.values(cart).reduce((s, it) => s + it.qty * byId(it.id).price, 0);

function addToCart(id, size, color, qty) {
  const k = cartKey(id, size, color);
  if (cart[k]) cart[k].qty += qty; else cart[k] = { id, size, color, qty };
  saveCart(); renderBadge();
}
function setQty(k, qty) {
  if (qty <= 0) delete cart[k]; else cart[k].qty = qty;
  saveCart(); renderBadge();
}

/* ── Grid rendern ──────────────────────────────────────────── */

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = PRODUCTS.map((p) => {
    const defColor = p.colors[0];
    return `<article class="exhibit reveal" data-id="${p.id}">
      <button class="exhibit-stage" data-open="${p.id}" aria-haspopup="dialog" aria-label="Exponat ${nrLabel(p)}: ${p.title}, Details öffnen">
        <span class="wire" aria-hidden="true"></span>
        ${mockupHTML(p, defColor)}
      </button>
      <div class="plaque">
        <span class="nr">${nrLabel(p)}${p.hero ? " · Herzstück" : ""}</span>
        <h3>${p.title}</h3>
        <p class="story">${p.story}</p>
        <div class="meta">
          <span class="price">${fmt(p.price)}</span>
          <button class="link-btn" data-open="${p.id}">Ansehen</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

/* ── Overlays: Scrim / Drawer / Modal ──────────────────────── */

const scrim   = document.getElementById("scrim");
const drawer  = document.getElementById("cartDrawer");
const modal   = document.getElementById("detailModal");
const cartBody = document.getElementById("cartBody");
const detailContent = document.getElementById("detailContent");
const toastEl = document.getElementById("toast");

let openOverlay = null;       // "cart" | "modal"
let lastFocus = null;
let toastTimer = null;
let cartView = "list";        // list | checkout | success
let lastOrderNo = "";

function lock(on) { document.body.classList.toggle("locked", on); }

function showScrim() {
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add("open"));
}
function hideScrim() {
  scrim.classList.remove("open");
  setTimeout(() => { if (!openOverlay) scrim.hidden = true; }, 300);
}

function openDialog(which) {
  lastFocus = document.activeElement;
  openOverlay = which;
  lock(true); showScrim();
  const el = which === "cart" ? drawer : modal;
  el.hidden = false;
  requestAnimationFrame(() => el.classList.add("open"));
  const target = which === "cart" ? cartBody.querySelector("button, input") : modal.querySelector(".modal-close");
  if (target) target.focus();
}
function closeDialogs() {
  if (!openOverlay) return;
  const els = [drawer, modal];
  els.forEach((el) => { if (!el.hidden) el.classList.remove("open"); });
  hideScrim(); lock(false);
  const was = openOverlay; openOverlay = null;
  setTimeout(() => {
    if (openOverlay !== was) {
      els.forEach((el) => { if (!el.classList.contains("open")) el.hidden = true; });
    }
    if (was === "cart" && cartView === "success") { cartView = "list"; }
  }, 360);
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

/* Fokus im Dialog halten */
function trapFocus(e) {
  if (e.key !== "Tab" || !openOverlay) return;
  const root = openOverlay === "cart" ? drawer : modal;
  const f = root.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])');
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDialogs();
  trapFocus(e);
});
scrim.addEventListener("click", closeDialogs);

/* ── Toast ─────────────────────────────────────────────────── */

function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ── Detail-Modal ──────────────────────────────────────────── */

let sel = null; // Auswahl im Detail: { id, size, color, qty, stage }

function renderDetail(p) {
  sel = { id: p.id, size: null, color: p.colors[0], qty: 1, stage: "getragen" };
  const c = COLORS[sel.color];
  const colorBtns = p.colors.map((k) => {
    const cc = COLORS[k];
    return `<button class="swatch" role="radio" aria-checked="${k === sel.color}" data-color="${k}"
      style="background:${cc.hex}" aria-label="Shirt-Farbe ${cc.label}" title="${cc.label}"></button>`;
  }).join("");

  const sizeBtns = SIZES.map((s) =>
    `<button class="size-btn" role="radio" aria-checked="false" data-size="${s}">${s}</button>`
  ).join("");

  detailContent.innerHTML = `
    <div class="detail-stage">
      <div class="stage-toggle" role="group" aria-label="Ansicht wählen">
        <button data-stage="getragen" aria-pressed="true">Getragen</button>
        <button data-stage="exponat" aria-pressed="false">Exponat</button>
      </div>
      <div class="stage-view" id="stageView">${mockupHTML(p, sel.color)}</div>
      <p class="artwork-cap">Motiv ${nrLabel(p)} · „20 Tage Warten auf Camilla“</p>
    </div>
    <div class="detail-info">
      <span class="nr">Exponat ${nrLabel(p)}${p.hero ? " · Herzstück der Edition" : ""}</span>
      <h2 id="detailTitle">${p.title}</h2>
      <p class="detail-story">${p.story}</p>
      <p class="edition-line">Art Edition 01 · Nummerierte Auflage · Unisex-Schnitt, S–XXL</p>
      <div class="detail-price">${fmt(p.price)}</div>

      <span class="opt-label">Farbe — <b id="colorName">${c.label}</b></span>
      <div class="swatches" role="radiogroup" aria-label="Shirt-Farbe">${colorBtns}</div>
      ${p.dram ? `<p class="color-note">Dieses Motiv erscheint ausschließlich auf Schwarz.</p>` : ""}

      <span class="opt-label">Größe — <b id="sizeName">bitte wählen</b></span>
      <div class="sizes" role="radiogroup" aria-label="Größe">${sizeBtns}</div>
      <p class="opt-hint" id="sizeHint" role="alert"></p>

      <div class="buy-row">
        <div class="stepper" aria-label="Anzahl">
          <button data-qty="-1" aria-label="Anzahl verringern">−</button>
          <span id="qtyVal">1</span>
          <button data-qty="1" aria-label="Anzahl erhöhen">+</button>
        </div>
        <button class="btn btn-primary" id="addBtn">In den Warenkorb — ${fmt(p.price)}</button>
      </div>
      <p class="ship-note">Demo-Shop: kein echter Kauf · Versand (fiktiv) aus der Editionswerkstatt in 2–4 Tagen</p>
    </div>`;
}

function updateAddBtn() {
  const p = byId(sel.id);
  const btn = document.getElementById("addBtn");
  if (btn) btn.textContent = `In den Warenkorb — ${fmt(p.price * sel.qty)}`;
  const qv = document.getElementById("qtyVal");
  if (qv) qv.textContent = sel.qty;
}

function switchStage(p) {
  const view = document.getElementById("stageView");
  if (!view) return;
  if (sel.stage === "getragen") {
    view.innerHTML = mockupHTML(p, sel.color);
  } else {
    view.innerHTML = `<img class="artwork" src="${ASSETS}${p.img}" alt="Exponat „${p.title}“ — Tintenzeichnung auf Papier">`;
  }
  const wrap = view.closest(".detail-stage");
  const cap = wrap && wrap.querySelector(".artwork-cap");
  if (cap) cap.textContent = sel.stage === "getragen"
    ? `Motiv ${nrLabel(p)} · „20 Tage Warten auf Camilla“`
    : `Original-Illustration · Tinte auf Papier`;
}

function openDetail(id) {
  const p = byId(id);
  if (!p) return;
  renderDetail(p);
  openDialog("modal");
}

/* Delegation fürs Modal — Klick neben das Panel schließt ebenfalls */
modal.addEventListener("click", (e) => {
  if (e.target === modal) { closeDialogs(); return; }
  const p = byId(sel && sel.id);
  if (!p) return;
  const t = e.target.closest("button");
  if (!t) return;

  if (t.hasAttribute("data-close")) { closeDialogs(); return; }

  if (t.hasAttribute("data-stage")) {
    sel.stage = t.getAttribute("data-stage");
    modal.querySelectorAll("[data-stage]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b === t)));
    switchStage(p);
    return;
  }
  if (t.hasAttribute("data-color")) {
    sel.color = t.getAttribute("data-color");
    modal.querySelectorAll("[data-color]").forEach((b) =>
      b.setAttribute("aria-checked", String(b === t)));
    const name = document.getElementById("colorName");
    if (name) name.textContent = COLORS[sel.color].label;
    if (sel.stage === "getragen") switchStage(p);
    return;
  }
  if (t.hasAttribute("data-size")) {
    sel.size = t.getAttribute("data-size");
    modal.querySelectorAll("[data-size]").forEach((b) =>
      b.setAttribute("aria-checked", String(b === t)));
    const name = document.getElementById("sizeName");
    if (name) name.textContent = sel.size;
    const hint = document.getElementById("sizeHint");
    if (hint) hint.textContent = "";
    return;
  }
  if (t.hasAttribute("data-qty")) {
    sel.qty = Math.min(9, Math.max(1, sel.qty + Number(t.getAttribute("data-qty"))));
    updateAddBtn();
    return;
  }
  if (t.id === "addBtn") {
    if (!sel.size) {
      const hint = document.getElementById("sizeHint");
      if (hint) hint.textContent = "Bitte eine Größe wählen.";
      const sizes = modal.querySelector(".sizes");
      if (sizes) sizes.querySelector(".size-btn").focus();
      return;
    }
    addToCart(sel.id, sel.size, sel.color, sel.qty);
    const c = COLORS[sel.color];
    toast(`Hinzugefügt — Exponat ${nrLabel(p)} · „${p.title}“ · ${sel.size} · ${c.label}`);
    closeDialogs();
    setTimeout(openCart, 420);
  }
});

/* ── Warenkorb-Drawer ──────────────────────────────────────── */

function renderBadge() {
  const n = cartCount();
  const el = document.getElementById("cartCount");
  el.textContent = n;
  el.hidden = n === 0;
}

function renderCart() {
  if (cartView === "checkout") return renderCheckout();
  if (cartView === "success") return renderSuccess();

  const entries = Object.entries(cart);
  document.getElementById("cartTitle").textContent =
    `Warenkorb${entries.length ? ` (${cartCount()})` : ""}`;

  if (!entries.length) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <p class="empty-serif">Der Raum ist leer.</p>
        <p>Noch hängt nichts in Ihrem Korb — der Rundgang wartet.</p>
        <button class="btn btn-ghost" id="goHall">Zur Ausstellung</button>
      </div>`;
    return;
  }

  const items = entries.map(([k, it]) => {
    const p = byId(it.id);
    const c = COLORS[it.color];
    return `<div class="cart-item" data-key="${k}">
      <div class="ci-thumb">${mockupHTML(p, it.color)}</div>
      <div>
        <h3 class="ci-title">${p.title}</h3>
        <p class="ci-variant">Größe ${it.size} · ${c.label} · Exponat ${nrLabel(p)}</p>
        <span class="ci-qty">
          <button data-dec aria-label="Anzahl verringern">−</button>
          <span>${it.qty}</span>
          <button data-inc aria-label="Anzahl erhöhen">+</button>
        </span>
      </div>
      <div class="ci-side">
        <span class="ci-price">${fmt(p.price * it.qty)}</span>
        <button class="ci-remove" data-remove>Entfernen</button>
      </div>
    </div>`;
  }).join("");

  cartBody.innerHTML = items + `
    <div class="cart-foot">
      <div class="cart-row"><span>Zwischensumme</span><span class="sum">${fmt(cartTotal())}</span></div>
      <button class="btn btn-primary btn-full" id="toCheckout">Zur Kasse</button>
      <p class="demo-note">Demo-Shop — es findet kein echter Kauf statt.</p>
    </div>`;
}

/* Listener am Drawer (nicht nur cartBody), damit auch der Kopf-× reagiert */
drawer.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;

  if (t.hasAttribute("data-close")) { closeDialogs(); return; }

  if (t.id === "goHall") {
    closeDialogs();
    document.getElementById("ausstellung").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const itemEl = t.closest(".cart-item");
  if (itemEl) {
    const k = itemEl.getAttribute("data-key");
    const it = cart[k];
    if (!it) return;
    if (t.hasAttribute("data-inc")) { setQty(k, Math.min(9, it.qty + 1)); renderCart(); return; }
    if (t.hasAttribute("data-dec")) { setQty(k, it.qty - 1); renderCart(); return; }
    if (t.hasAttribute("data-remove")) {
      const p = byId(it.id);
      setQty(k, 0); renderCart();
      toast(`Entfernt — „${p.title}“ (${it.size})`);
      return;
    }
  }

  if (t.id === "toCheckout") { cartView = "checkout"; renderCart(); return; }
  if (t.id === "backToCart") { cartView = "list"; renderCart(); return; }
  if (t.id === "placeOrder") { submitOrder(t); return; }
  if (t.id === "doneOk") { cartView = "list"; renderCart(); closeDialogs(); }
});

cartBody.addEventListener("input", (e) => {
  if (e.target.matches("input")) {
    e.target.classList.remove("invalid");
    const f = e.target.closest(".field");
    if (f) f.classList.remove("show-err");
  }
});

function renderCheckout() {
  document.getElementById("cartTitle").textContent = "Kasse — Demo";
  cartBody.innerHTML = `
    <p class="checkout-intro">
      Dies ist ein <strong>Demo-Checkout</strong>: Es werden keine Daten übertragen,
      keine Zahlung ausgelöst und nichts versendet.
    </p>
    <div class="field" data-field="name">
      <label for="fName">Name</label>
      <input id="fName" type="text" autocomplete="name" placeholder="Vor- und Nachname">
      <span class="err">Bitte einen Namen angeben.</span>
    </div>
    <div class="field" data-field="email">
      <label for="fEmail">E-Mail</label>
      <input id="fEmail" type="email" autocomplete="email" placeholder="name@beispiel.de">
      <span class="err">Bitte eine gültige E-Mail angeben.</span>
    </div>
    <div class="field" data-field="city">
      <label for="fCity">Stadt</label>
      <input id="fCity" type="text" autocomplete="address-level2" placeholder="Wohnort">
      <span class="err">Bitte eine Stadt angeben.</span>
    </div>
    <div class="cart-foot">
      <div class="cart-row"><span>${cartCount()} Artikel — Gesamt</span><span class="sum">${fmt(cartTotal())}</span></div>
      <button class="btn btn-primary btn-full" id="placeOrder">Bestellung abschließen — Demo</button>
      <button class="btn btn-quiet btn-full" id="backToCart" style="margin-top:10px">Zurück zum Warenkorb</button>
    </div>`;
  document.getElementById("fName").focus();
}

function submitOrder(btn) {
  let ok = true;
  const need = [
    ["name",  (v) => v.trim().length >= 2],
    ["email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())],
    ["city",  (v) => v.trim().length >= 2],
  ];
  need.forEach(([key, test]) => {
    const wrap = cartBody.querySelector(`[data-field="${key}"]`);
    const input = wrap.querySelector("input");
    const valid = test(input.value);
    input.classList.toggle("invalid", !valid);
    wrap.classList.toggle("show-err", !valid);
    if (!valid && ok) { input.focus(); ok = false; }
  });
  if (!ok) return;

  btn.disabled = true;
  btn.textContent = "Wird abgeschlossen …";
  lastOrderNo = "GAT-" + Date.now().toString(36).toUpperCase().slice(-6);

  setTimeout(() => {
    cart = {}; saveCart(); renderBadge();
    cartView = "success"; renderCart();
    toast("Demo-Bestellung aufgegeben.");
  }, 700);
}

function renderSuccess() {
  document.getElementById("cartTitle").textContent = "Vielen Dank";
  cartBody.innerHTML = `
    <div class="success">
      <div class="success-mark" aria-hidden="true">✓</div>
      <h3>Die Edition ist unterwegs.</h3>
      <p>(In der Realität des Demo-Shops: nichts ist unterwegs.)</p>
      <div class="order-no">Bestell-Nr. ${lastOrderNo} · Demo</div>
      <p>Ihre Auswahl wurde aus dem Warenkorb entfernt. Der Rundgang beginnt von vorn.</p>
      <button class="btn btn-ghost" id="doneOk" style="margin-top:22px">Rundgang fortsetzen</button>
    </div>`;
}

function openCart() {
  cartView = "list";
  renderCart();
  openDialog("cart");
}

/* ── Globale Delegation ────────────────────────────────────── */

document.getElementById("cartBtn").addEventListener("click", openCart);

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (opener) { openDetail(opener.getAttribute("data-open")); }
});

/* Header-Haarschwelle beim Scrollen */
const head = document.getElementById("siteHead");
const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ── Reveal — Exponate gehen leise ins Licht ───────────────── */

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
  els.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 60 + "ms"; /* sanfte Versetzung je Reihe */
    io.observe(el);
  });
}

/* ── Start ─────────────────────────────────────────────────── */
renderGrid();
renderBadge();
initReveal();
