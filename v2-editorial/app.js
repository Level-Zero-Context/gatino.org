/* ============================================================
   GATINOS SELECTION — Art Edition 01 · Demo-Shop (Vanilla JS)
   Warenkorb in localStorage, Mock-Checkout (kein Payment,
   keine Datenübertragung), Produkt-Detail als Modal.
   ============================================================ */
'use strict';

/* ---------- Daten ---------- */

const IMG_BASE = '../assets/web/';

const COLORS = {
  natur:   { label: 'Naturweiß', hex: '#f0ece1', seam: 'rgba(23,23,23,.16)' },
  sand:    { label: 'Sand',      hex: '#d9cbb0', seam: 'rgba(23,23,23,.18)' },
  schwarz: { label: 'Schwarz',   hex: '#161616', seam: 'rgba(255,255,255,.14)' }
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const PRODUCTS = [
  {
    id: 'stricher-orig-1', nr: 1, tag: 'Hero-Motiv',
    name: 'Sich aus dem Staub gemacht',
    line: 'Ein Segelschiff als Ballon — von winzigen Figuren über ein Seil hochgezogen.',
    desc: 'Das Titelblatt der Edition. Ein Schiff macht sich aus dem Staub, und es sind die Kleinen, die es in den Himmel ziehen. Gedruckt groß genug, um jedes Tau zu lesen.',
    file: 'stricher-orig-1.jpg', price: 44, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'stricher-orig-2', nr: 2,
    name: 'Tauziehen',
    line: 'Ein Schiff an straffen Tauen, das von zwei Gruppen gegeneinander gezogen wird.',
    desc: 'Blaupause und Lustspiel zugleich: niemand wird gewinnen, alle werden müde. Für Menschen, die lange Abende feiern.',
    file: 'stricher-orig-2.jpg', price: 42, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'stromlinien-sanft-3', nr: 3,
    name: 'Wolkenlampe',
    line: 'Eine Lampe in einer Wolke, eine S-förmige Lichtbahn führt aus dem Tunnel.',
    desc: 'Ein Licht, das den Weg aus dem Tunnel zeichnet, bevor man ihn gegangen ist.',
    file: 'stromlinien-sanft-3.jpg', price: 39, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'stromlinien-sanft-1', nr: 4,
    name: 'Wolke mit Beinen',
    line: 'Eine Wolke auf Stativbeinen über einer Schneelandschaft.',
    desc: 'Jemand hat das Wetter aufgestellt und ist gegangen. Es bleibt stehen und schneit nicht.',
    file: 'stromlinien-sanft-1.jpg', price: 39, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'stromlinien-dram-1', nr: 5, tag: 'Nachtmotiv',
    name: 'Nachtlicht',
    line: 'Eine weiße Wolke über dem Tal — die Zeichnung kehrt die Nacht nach innen.',
    desc: 'Die invertierte Tafel: Was im Buch auf schwarzer Papierseite steht, erscheint nur auf schwarzer Baumwolle. Als Poster-Druck gesetzt, mit feiner Umrandung.',
    file: 'stromlinien-dram-1.jpg', price: 42, colors: ['schwarz'], dark: true
  },
  {
    id: 'kauz-sanft-2', nr: 6,
    name: 'Der Kauz',
    line: 'Eine Eule mit Brille und Buch, auf der Psychologie der Statik.',
    desc: 'Der Gelehrte der Edition. Er hat nachgewiesen, dass Statik eine Frage der Haltung ist.',
    file: 'kauz-sanft-2.jpg', price: 39, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'herz-sanft-2', nr: 7,
    name: 'Found my heart',
    line: 'Ein Herz-Medallion in einer geöffneten, gravierten Schublade.',
    desc: 'Verlegt, gefunden, graviert: Die Schublade hat ein Fach mehr, als der Tisch zulässt.',
    file: 'herz-sanft-2.jpg', price: 39, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'kamera-sanft-1', nr: 8,
    name: 'Momentaufnahme',
    line: 'Eine Faltkamera auf dem Tischchen, darunter ein Landschaftsfoto.',
    desc: 'Die Kamera hat bereits ausgelöst. Das Bild darunter zeigt, dass der Auslöser Recht hatte.',
    file: 'kamera-sanft-1.jpg', price: 39, colors: ['natur', 'sand'], dark: false
  },
  {
    id: 'kamera-dram-1', nr: 9, tag: 'Nachtmotiv',
    name: 'Die Glocke',
    line: 'Ein Auge im Glockeninneren, sein Strahl fällt auf ein Foto.',
    desc: 'Die zweite invertierte Tafel: Die Glocke hat geläutet, und was sie gesehen hat, brennt nach. Nur auf schwarzer Baumwolle.',
    file: 'kamera-dram-1.jpg', price: 42, colors: ['schwarz'], dark: true
  }
];

/* ---------- Estado ---------- */

const CART_KEY = 'gatinos_selection_cart_v1';
let cart = loadCart();
let currentFilter = 'alle';
let pdp = null;            // { productId, size, color, qty }
let lastFocus = null;

/* ---------- Helpers ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const byId = id => PRODUCTS.find(p => p.id === id);
const pad2 = n => String(n).padStart(2, '0');

const eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
const eurShort = p => `${p} €`;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(it => byId(it.id) && SIZES.includes(it.size) && COLORS[it.color]) : [];
  } catch { return []; }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Privatsphäre-Modus */ }
}

function cartCount() { return cart.reduce((n, it) => n + it.qty, 0); }
function cartSum()   { return cart.reduce((n, it) => n + it.qty * byId(it.id).price, 0); }

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toast._tm);
  toast._tm = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => { t.hidden = true; }, 300);
  }, 2600);
}

/* ---------- Shirt-Mockup (SVG-Silhouette + Print) ---------- */

function teeHTML(p, colorKey, { printAlt = '' } = {}) {
  const c = COLORS[colorKey];
  const darkShirt = colorKey === 'schwarz';
  const printCls = p.dark ? 'tee-print tee-print--poster' : 'tee-print';
  return `
  <span class="tee" style="--shirt:${c.hex}; --seam:${darkShirt ? 'rgba(255,255,255,.14)' : 'rgba(23,23,23,.15)'}">
    <svg viewBox="0 0 600 620" aria-hidden="true" focusable="false">
      <path fill="var(--shirt)" stroke="var(--seam)" stroke-width="2" d="
        M300 72
        C 258 72 226 79 204 92
        L 88 158 L 128 278 L 198 240
        L 198 552 Q 198 560 206 560 L 394 560 Q 402 560 402 552
        L 402 240 L 472 278 L 512 158 L 396 92
        C 374 79 342 72 300 72 Z"/>
      <path fill="none" stroke="var(--seam)" stroke-width="2" d="M238 88 C 260 132 340 132 362 88"/>
      <path fill="none" stroke="var(--seam)" stroke-width="1.5" d="M244 92 C 264 124 336 124 356 92" opacity=".55"/>
      <path fill="none" stroke="var(--seam)" stroke-width="1.5" stroke-dasharray="5 6" d="M206 546 L 394 546" opacity=".7"/>
      <path fill="none" stroke="var(--seam)" stroke-width="1.5" d="M141 271 L 194 238 M459 271 L 406 238" opacity=".6"/>
      <path fill="none" stroke="var(--seam)" stroke-width="1.5" d="M252 556 C 254 470 252 380 248 310 M348 556 C 346 470 348 380 352 310" opacity=".38"/>
    </svg>
    <img class="${printCls}" src="${IMG_BASE}${p.file}" alt="${printAlt}" loading="lazy" width="692" height="1000">
  </span>`;
}

/* ---------- Grid & Nacht-Band ---------- */

function renderGrid() {
  const grid = $('#grid');
  const items = PRODUCTS.filter(p =>
    currentFilter === 'alle' ? true : currentFilter === 'nacht' ? p.dark : !p.dark
  );
  grid.innerHTML = items.map(p => `
    <article class="card">
      <button class="card-stage" data-product="${p.id}"
              aria-label="${p.name} — Tafel ${pad2(p.nr)}, Details und Auswahl öffnen">
        <span class="card-nr" aria-hidden="true">${pad2(p.nr)}</span>
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
        ${teeHTML(p, p.colors[0], { printAlt: `Print: ${p.name}` })}
        <span class="card-cta" aria-hidden="true">Ansehen →</span>
      </button>
      <div class="card-meta">
        <span class="card-index">Tafel ${pad2(p.nr)} / 09 · ${p.colors.map(c => COLORS[c].label).join(' · ')}</span>
        <div class="card-row">
          <h3 class="card-name">${p.name}</h3>
          <span class="card-price">${eurShort(p.price)}</span>
        </div>
        <p class="card-line">${p.line}</p>
      </div>
    </article>
  `).join('');
}

function renderNight() {
  const wrap = $('#nightGrid');
  wrap.innerHTML = PRODUCTS.filter(p => p.dark).map(p => `
    <button class="night-card" data-product="${p.id}"
            aria-label="${p.name} — Tafel ${pad2(p.nr)}, Details und Auswahl öffnen">
      <span class="night-nr" aria-hidden="true">${pad2(p.nr)}</span>
      ${teeHTML(p, 'schwarz', { printAlt: `Schwarzes Shirt mit Print: ${p.name}` })}
      <span class="night-info">
        <span class="night-name">${p.name}</span>
        <span class="night-desc">${p.line}</span>
        <span class="night-meta">
          <span class="night-price">${eurShort(p.price)}</span>
          <span class="night-cta">Ansehen →</span>
        </span>
      </span>
    </button>
  `).join('');
}

/* ---------- Filter ---------- */

document.querySelectorAll('.chip[data-filter]').forEach(chip => {
  chip.addEventListener('click', () => {
    currentFilter = chip.dataset.filter;
    document.querySelectorAll('.chip[data-filter]').forEach(c =>
      c.setAttribute('aria-pressed', String(c === chip))
    );
    renderGrid();
  });
});

/* ---------- PDP (Produkt-Detail-Modal) ---------- */

function openProduct(id) {
  const p = byId(id);
  if (!p) return;
  pdp = { productId: id, size: null, color: p.colors[0], qty: 1 };
  renderPDP();
  openModal();
}

function renderPDP() {
  const p = byId(pdp.productId);
  $('#modalPanel').innerHTML = `
    <button class="icon-btn modal-close" data-close aria-label="Details schließen">×</button>
    <div class="pdp">
      <div class="pdp-stage">
        <span class="card-nr" aria-hidden="true">${pad2(p.nr)}</span>
        ${teeHTML(p, pdp.color, { printAlt: `Shirt in ${COLORS[pdp.color].label} mit Print: ${p.name}` })}
      </div>
      <div class="pdp-info">
        <p class="eyebrow">Art Edition 01 · Tafel ${pad2(p.nr)} / 09${p.dark ? ' · Nachtmotiv' : ''}</p>
        <h2 class="pdp-name">${p.name}</h2>
        <p class="pdp-line">${p.line}</p>
        <p class="pdp-desc">${p.desc}</p>
        <ul class="pdp-specs">
          <li><span>Auflage</span><span>300 Stück, handnummeriert</span></li>
          <li><span>Druck</span><span>Siebdruck, wasserbasiert</span></li>
          <li><span>Stoff</span><span>100 % Bio-Baumwolle, 190 g/m²</span></li>
          <li><span>Schnitt</span><span>Unisex, regular</span></li>
          <li><span>Pflege</span><span>30 °C, links gedreht</span></li>
        </ul>
        <p class="pdp-price-row">
          <span class="pdp-price">${eur.format(p.price)}</span>
          <span class="mono-note">inkl. MwSt.</span>
        </p>
        <fieldset class="fieldset" id="sizeField">
          <legend>Größe</legend>
          <div class="chip-row">
            ${SIZES.map(s => `
              <button class="chip chip--sq" data-size="${s}" aria-pressed="${pdp.size === s}">${s}</button>
            `).join('')}
          </div>
          <p class="field-error" id="sizeError">Bitte Größe wählen</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend>Farbe${p.colors.length === 1 ? ' — ' + COLORS[p.colors[0]].label : ''}</legend>
          <div class="chip-row">
            ${p.colors.map(c => `
              <button class="chip chip--color" data-color="${c}" aria-pressed="${pdp.color === c}">
                <span class="swatch" style="background:${COLORS[c].hex}"></span>${COLORS[c].label}
              </button>
            `).join('')}
          </div>
          ${p.dark ? '<p class="mono-note">Dieses Motiv erscheint nur auf Schwarz.</p>' : ''}
        </fieldset>
        <div class="buy-row">
          <div class="qty" aria-label="Menge">
            <button data-qty="-1" aria-label="Menge verringern">−</button>
            <output id="pdpQty">${pdp.qty}</output>
            <button data-qty="1" aria-label="Menge erhöhen">+</button>
          </div>
          <button class="btn btn--solid" id="pdpAdd">In den Warenkorb — ${eur.format(p.price)}</button>
        </div>
        <p class="mono-note pdp-meta">
          <span>Auf Lager</span><span>Versand 3–5 Werktage</span><span>Demo</span>
        </p>
      </div>
    </div>
  `;

  $('#modalPanel').querySelectorAll('[data-size]').forEach(b =>
    b.addEventListener('click', () => {
      pdp.size = b.dataset.size;
      $('#sizeError').classList.remove('show');
      $('#modalPanel').querySelectorAll('[data-size]').forEach(x =>
        x.setAttribute('aria-pressed', String(x === b))
      );
    })
  );
  $('#modalPanel').querySelectorAll('[data-color]').forEach(b =>
    b.addEventListener('click', () => {
      if (pdp.color === b.dataset.color) return;
      pdp.color = b.dataset.color;
      const panel = $('#modalPanel');
      const scroll = panel.scrollTop;   // Scroll-Position über den Farbwechsel retten
      renderPDP();
      panel.scrollTop = scroll;
    })
  );
  $('#modalPanel').querySelectorAll('[data-qty]').forEach(b =>
    b.addEventListener('click', () => {
      pdp.qty = Math.min(9, Math.max(1, pdp.qty + Number(b.dataset.qty)));
      $('#pdpQty').textContent = pdp.qty;
      const p = byId(pdp.productId);
      $('#pdpAdd').textContent = `In den Warenkorb — ${eur.format(p.price * pdp.qty)}`;
    })
  );
  $('#pdpAdd').addEventListener('click', () => {
    if (!pdp.size) {
      $('#sizeError').classList.add('show');
      $('#sizeField').querySelector('.chip-row').focus?.();
      return;
    }
    addToCart(pdp.productId, pdp.size, pdp.color, pdp.qty);
    closeModal();
    openDrawer();
  });
}

/* ---------- Warenkorb ---------- */

function addToCart(id, size, color, qty) {
  const found = cart.find(it => it.id === id && it.size === size && it.color === color);
  if (found) found.qty = Math.min(9, found.qty + qty);
  else cart.push({ id, size, color, qty });
  saveCart();
  renderCartBadge();
  renderCart();
  toast(`${byId(id).name} · ${size} · ${COLORS[color].label} — im Warenkorb`);
}

function setQty(index, delta) {
  const it = cart[index];
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCartBadge();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartBadge();
  renderCart();
}

function renderCartBadge() {
  $('#cartCount').textContent = `(${cartCount()})`;
}

function renderCart() {
  const body = $('#cartBody');
  const foot = $('#cartFoot');
  $('#drawerCount').textContent = cartCount() ? `(${cartCount()})` : '';

  if (!cart.length) {
    foot.hidden = true;
    body.innerHTML = `
      <div class="cart-empty">
        <p class="cart-empty-title">Noch leer.</p>
        <p class="prose" style="text-align:center">Wähle ein Motiv — Größe und Farbe folgen im nächsten Schritt.</p>
        <a class="btn" href="#motive" data-close>Zu den Motiven</a>
      </div>
    `;
    return;
  }

  foot.hidden = false;
  body.innerHTML = cart.map((it, i) => {
    const p = byId(it.id);
    return `
      <div class="cart-line">
        <div class="cart-thumb">${teeHTML(p, it.color, { printAlt: '' })}</div>
        <div>
          <p class="cart-line-name">${p.name}</p>
          <p class="cart-line-meta">Tafel ${pad2(p.nr)} · ${it.size} · ${COLORS[it.color].label}</p>
          <div class="qty">
            <button data-step="-1" data-index="${i}" aria-label="Menge verringern">−</button>
            <output>${it.qty}</output>
            <button data-step="1" data-index="${i}" aria-label="Menge erhöhen">+</button>
          </div>
        </div>
        <div class="cart-line-right">
          <span class="cart-line-price">${eur.format(p.price * it.qty)}</span>
          <button class="cart-remove" data-remove="${i}">Entfernen</button>
        </div>
      </div>
    `;
  }).join('');

  $('#cartSubtotal').textContent = eur.format(cartSum());
  $('#cartTotal').textContent = eur.format(cartSum());
}

/* ---------- Drawer / Modal / Scrim ---------- */

function openDrawer() {
  lastFocus = document.activeElement;
  const d = $('#drawer');
  d.hidden = false;
  requestAnimationFrame(() => d.classList.add('open'));
  $('#scrim').hidden = false;
  requestAnimationFrame(() => $('#scrim').classList.add('open'));
  document.body.classList.add('locked');
  d.querySelector('[data-close]').focus();
}

function closeDrawer() {
  const d = $('#drawer');
  d.classList.remove('open');
  $('#scrim').classList.remove('open');
  setTimeout(() => {
    d.hidden = true;
    if ($('#modal').hidden) $('#scrim').hidden = true;
  }, 300);
  if (lastFocus && $('#modal').hidden) { lastFocus.focus(); lastFocus = null; }
  if ($('#modal').hidden) document.body.classList.remove('locked');
}

function openModal() {
  lastFocus = document.activeElement;
  $('#modal').hidden = false;
  $('#scrim').hidden = false;
  requestAnimationFrame(() => $('#scrim').classList.add('open'));
  document.body.classList.add('locked');
  const c = $('#modalPanel').querySelector('.modal-close');
  if (c) c.focus();
}

function closeModal() {
  $('#modal').hidden = true;
  $('#scrim').classList.remove('open');
  setTimeout(() => {
    if ($('#drawer').classList.contains('open') === false) $('#scrim').hidden = true;
  }, 300);
  if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  document.body.classList.remove('locked');
}

$('#scrim').addEventListener('click', () => {
  if (!$('#modal').hidden) closeModal();
  else closeDrawer();
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('#modal').hidden) closeModal();
  else if ($('#drawer').classList.contains('open')) closeDrawer();
});

document.addEventListener('click', e => {
  if (e.target.id === 'modal') { closeModal(); return; }  // Klick auf den Hintergrund

  const opener = e.target.closest('[data-product]');
  if (opener) { openProduct(opener.dataset.product); return; }

  if (e.target.closest('#cartOpen')) { openDrawer(); return; }

  const closer = e.target.closest('[data-close]');
  if (closer) {
    if (!$('#modal').hidden) closeModal();
    else closeDrawer();
    return;
  }

  const step = e.target.closest('[data-step]');
  if (step) { setQty(Number(step.dataset.index), Number(step.dataset.step)); return; }

  const rm = e.target.closest('[data-remove]');
  if (rm) { removeItem(Number(rm.dataset.remove)); return; }

  if (e.target.closest('#checkoutOpen')) { renderCheckout(); closeDrawer(); openModal(); }
});

/* ---------- Mock-Checkout ---------- */

function renderCheckout() {
  const lines = cart.map(it => {
    const p = byId(it.id);
    return `
      <div class="side-line">
        <span>${p.name}<small>Tafel ${pad2(p.nr)} · ${it.size} · ${COLORS[it.color].label} · ${it.qty}×</small></span>
        <span class="p">${eur.format(p.price * it.qty)}</span>
      </div>
    `;
  }).join('');

  $('#modalPanel').innerHTML = `
    <button class="icon-btn modal-close" data-close aria-label="Kasse schließen">×</button>
    <div class="checkout-grid">
      <form class="checkout-form" id="checkoutForm" novalidate>
        <div>
          <p class="eyebrow">Demo-Checkout</p>
          <h2 class="display display--sm" style="margin-top:10px">Kasse</h2>
        </div>
        <div class="form-grid">
          <div class="field"><label for="f-vor">Vorname</label><input id="f-vor" name="vorname" autocomplete="given-name" placeholder="Camilla"></div>
          <div class="field"><label for="f-nach">Nachname</label><input id="f-nach" name="nachname" autocomplete="family-name" placeholder="Muster"></div>
          <div class="field field--wide"><label for="f-str">Straße und Nr.</label><input id="f-str" name="strasse" autocomplete="street-address" placeholder="Wartesaal 20"></div>
          <div class="field"><label for="f-plz">PLZ</label><input id="f-plz" name="plz" inputmode="numeric" autocomplete="postal-code" placeholder="20095"></div>
          <div class="field"><label for="f-ort">Ort</label><input id="f-ort" name="ort" autocomplete="address-level1" placeholder="Hamburg"></div>
          <div class="field field--wide"><label for="f-mail">E-Mail</label><input id="f-mail" name="email" type="email" autocomplete="email" placeholder="camilla@beispiel.de"></div>
        </div>
        <div class="demo-box">
          Demo — kein echter Shop. Es werden keine Daten gesendet, kein Payment ausgeführt,
          nichts berechnet. Nach dem Absenden wird nur der lokale Warenkorb geleert.
        </div>
        <div class="checkout-actions">
          <button type="submit" class="btn btn--solid">Bestellung absenden — Demo</button>
          <button type="button" class="btn" data-close>Weiter stöbern</button>
        </div>
      </form>
      <aside class="checkout-side" aria-label="Bestellübersicht">
        <h3>Deine Auswahl</h3>
        ${lines}
        <div class="sum-row"><span>Versand</span><span>Frei (Demo)</span></div>
        <div class="sum-row sum-row--total"><span>Gesamt</span><span>${eur.format(cartSum())}</span></div>
      </aside>
    </div>
  `;

  $('#checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    let ok = true;
    form.querySelectorAll('input').forEach(inp => {
      const empty = !inp.value.trim();
      const badMail = inp.type === 'email' && !empty && !/^\S+@\S+\.\S+$/.test(inp.value.trim());
      inp.closest('.field').classList.toggle('is-error', empty || badMail);
      if (empty || badMail) ok = false;
    });
    if (!ok) { toast('Bitte alle Felder prüfen'); return; }
    renderSuccess();
  });
}

function renderSuccess() {
  const nr = 'GS-' + String(Date.now()).slice(-6);
  const count = cartCount();
  cart = [];
  saveCart();
  renderCartBadge();
  renderCart();

  $('#modalPanel').innerHTML = `
    <button class="icon-btn modal-close" data-close aria-label="Schließen">×</button>
    <div class="success">
      <p class="eyebrow">Demo-Bestellung · nichts gesendet · nichts berechnet</p>
      <h2 class="display">Danke.</h2>
      <p class="success-order">Bestell-Nr. ${nr} — ${count} Artikel</p>
      <p class="prose" style="text-align:center">
        Im echten Laden stünde jetzt eine Packung auf dem Tisch: ein Shirt aus
        Naturweiß, Sand oder Schwarz, ein Bogen Papier, eine Nummer darauf.
      </p>
      <button class="btn btn--solid" data-close>Zurück zum Shop</button>
    </div>
  `;
  $('#modalPanel').querySelector('.modal-close').focus();
}

/* ---------- Start ---------- */

renderGrid();
renderNight();
renderCartBadge();
renderCart();
