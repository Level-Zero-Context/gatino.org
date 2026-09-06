# DESIGN-NOTIZ — v1 „Stille Galerie“

## 1. Quelle

**Primary:** `http://styles.refero.design` — drei Einträge wurden direkt extrahiert
(Index-Teaser + die verlinkten Style-Seiten; zwei davon via `curl` wegen WebFetch-Timeouts,
mit Zugang zum eingebetteten Seiten-Payload):

| Entry | Extrahierte Kernaussage |
|---|---|
| **Apple — „Cathedral of white space with whispered headlines“** (Apple España, Light E-Commerce) | „A vast pale hall where massive weight-700 type hangs in the air … a single blue thread.“ Primärtinte `#1d1d1f`, Mid-Gray `#707070`, Flächen `#f5f5f7`/`#ffffff`, Hairlines `#e8e8ed`, riesige zentrierte Headline (96 px, −1.44 px Letter-Spacing), Sektions-Padding 100 px vertikal, Pill-CTA (`#0071e3`, 980 px-Radius), dezent pastellige „Tether“-Farben. |
| **Airbnb — „Quiet white gallery wall“** (vollständige Spec abrufbar) | „White-canvas, photograph-first“: Canvas `#f7f7f7` → Karten `#ffffff`, Text `#222222`/`#6a6a6a`, Hairlines `#ebebeb`, **genau eine** Akzentfarbe pro Fläche (Rausch `#ff385c`), **keine Rahmen/Schatten auf Cards** — Trennung nur über Flächenkontrast, 4-px-Space-System, Max-Width 1440 px, Modal-Schatten `0 8px 28px rgba(0,0,0,.28)`. |
| **Cal.com — „Monochrome Utility, Human Touch“** | Schwarz-Weiß-Palette (`#101010`/`#242424` auf `#ffffff`/`#f4f4f4`, Borders `#e5e7eb`, Grau `#6b7280`), eine blaue Akzentfarbe, klare Funktion, freundlich gerundete Formen. |

## 2. Tokens (umgesetzt)

### Farben
| Token | Wert | Herkunft |
|---|---|---|
| `--bg` (Galerie-Wand) | `#f7f6f2` | Apple `#f5f5f7` / Airbnb `#f7f7f7`, **warm verschoben** (s. Abweichungen) |
| `--surface` (Modal/Drawer) | `#ffffff` | Airbnb Level 1 |
| `--ink` (Text) | `#1d1d1f` | Apple „Primary Ink“ |
| `--ink-soft` | `#6b6a66` | Airbnb „Foggy“ `#6a6a6a` (+ warme Nuance) |
| `--ink-faint` | `#98958c` | abgeleitet (Airbnb Grey 500 ≈ entsättigt) |
| `--hairline` / `--hairline-soft` | `#e3dfd5` / `#edeae2` | Airbnb „Bebe“ `#ebebeb`, warm verschoben |
| `--accent` (Tinten-Rot) / `--accent-deep` | `#9e2f24` / `#7f231b` | **bewusster Bruch**: Quellen nutzen Blau (`#0071e3`, `#0099ff`, `#ff385c`) — Richtungsbrief verlangt „nicht Blau-Default“, gedecktes Tinten-Rot passt zur Tinte der Motive |
| Shirts: Naturweiß / Sand / Schwarz | `#f2eee4` / `#d9cdb2` / `#1a1a1a` | Marken-/Produktvorgabe Brief |

### Typografie (System-Fonts, keine externen Requests)
| Rolle | Stack | Einsatz |
|---|---|---|
| Display/Serif | `ui-serif, "Iowan Old Style", Georgia, "Times New Roman", serif` | Wortmarke (weite Sperrung .46em/.74em — Typo-Haltung des Logo-Drafts), Hero, Exponat-Titel, Preise/Summen |
| UI/Sans | `-apple-system, …, "Segoe UI", Roboto, …` | Labels (11 px, Caps, .22em tracking), Body 16 px/1.6, Kleintext |

Held-Headline: clamp(2.7→5.1 rem), line-height 1.06, **−0.02em** (Apple: −1.44 px auf 96 px ≈ −0.015em).

### Spacing & Layout
- 4-px-Basis (Airbnb); Sektionen `clamp(64–128 px)` vertikal (Apple: 100 px)
- Content-Max-Width: Grid 1280 px, Header 1440 px (Airbnb 1440)
- Grid: `repeat(auto-fill, minmax(290px, 1fr))`, Spalten-/Zeilenabstand clamp(28–88 px) — „viel Wand zwischen den Exponaten“

### Radien & Elevation
- Karten/Exponate: **0 px, rahmenlos, schattenlos** (Airbnb-Regel: Trennung nur über Flächenkontrast); Hairlines nur als 1-px-Etikett-Linie
- Pill (`999px`) **nur** für Primär-CTA & Toast (Apple/Cal/Airbnb-Konsens); Inputs rahmenlos mit 1-px-Unterkante
- Einziger Weich-Schatten: Modal `0 8px 28px rgba(0,0,0,.28)` (wörtlich aus der Airbnb-Spec), Drawer-Ausnahme

## 3. Galerie-Übersetzung der Quelle

- „Vast pale hall“ → Seite als Ausstellungsrundgang: **Saal I** (Exponate 01–09), **Saal II** (Zur Edition)
- „Single blue thread“ → **der rote Faden**: 1 px vertikale Akzentlinie im Hero; Akzentfarbe nur für Museums-Nummern („01 / 09“), aktive Zustände, Primär-CTA, Cart-Badge (Airbnb-Regel: eine Akzentfarbe, je Fläche eine Primäraktion)
- „Quiet white gallery wall“ → jedes Exponat hängt **rahmenlos** an der Wand, mit dezentem Aufhänger (Nagel-Punkt + 1-px-Draht) und Museums-Etikett (Hairline, Caps-Nummer, Serifen-Titel, Story-Satz)
- „Whispered headlines“ → eine große, leise Serifen-Headline im Hero, sonst kleine Caps-Labels
- „Monochrome Utility“ (Cal.com) → monochromes UI, funktionale Klarheit, Größe/Farbe/Anzahl als schlichte Radiogruppen

## 4. Begründete Abweichungen

1. **Akzent Blau → Tinten-Rot `#9e2f24`**: explizite Richtungsanforderung; passt zur Schwarz-Tinte der Illustrationen (Buchkontext). Blau würde als „tech-default“ falsch klingen.
2. **Warmer Wandton `#f7f6f2` statt `#f5f5f7`/`#f7f7f7`**: die Motive haben cremeweißes Papier; ein kühler Blau-Stich würde das Papier schmutzig wirken lassen. Warmes Off-White lässt die Prints mit `multiply` ruhig verschwinden.
3. **Serifen-Display statt SF-Pro-700-Block**: Markentypologie verlangt „weit gesperrte elegante Serifen-Versalien“ (Wortmarke) — die Serifenhaltung wurde konsequent auf Hero/Titel verlängert. Apples Prinzip (eine große ruhige Headline, negatives Tracking, massig Luft) bleibt erhalten.
4. **Wortmarke als Typo statt Logo-Bild**: Logo-Draft (`gatinos_draft.png`, dunkel auf Schwarz, enthält Schreibfehler „NUSIC“) wird gemäß Brief **nicht** auf hellem Grund eingebunden; Header/Footer/Favicon bauen die Wortmarke typografisch nach (inkl. kleiner Trennlinien wie im Draft). Neue Renderings (`gatinos_light_*.png`) lagen zum Bauzeitpunkt noch nicht vor — sobald vorhanden: im Footer swap-in.
5. **Schwarz-Motive**: `stromlinien-dram-1` / `kamera-dram-1` erscheinen ausschließlich auf Schwarz (Farbwahl im Detail ist verriegelt + Hinweis). Print-Einbindung dort mit `mix-blend-mode: screen`, sodass der schwarze Bildgrund im Shirt verschwindet; helle Motive mit `multiply` (Papier löst sich im Shirt auf).

## 5. Umgesetzte Anforderungen (Check)

- 9 Produkte (39/42/44 €), Größen S–XXL, Farben Naturweiß/Sand/Schwarz
- Warenkorb in `localStorage` (`gatinos_cart_v1`), Positions-Keys `id|Größe|Farbe`, Anzahl ±/entfernen, Zwischensumme
- Mock-Checkout (Name/E-Mail/Stadt mit Validierung → Demo-Bestell-Nr.), überall klar als Demo gekennzeichnet
- Produkt-Detail als Modal (Tabs „Getragen/Exponat“), Grid, mobil (Grid 1–3 Spalten, Drawer vollbreit, Modal gestapelt)
- Offline: reines HTML/CSS/Vanilla-JS, System-Fonts, Favicon als Inline-SVG-Data-URI, einzige Assets = `../assets/web/*.jpg`
- Details: Esc/Scrim schließen, Fokus-Falle + `:focus-visible`, `aria`-Radiogruppen, Toast-Status, `prefers-reduced-motion`, IntersectionObserver-Entrance
