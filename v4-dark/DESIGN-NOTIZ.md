# DESIGN-NOTIZ — v4 „Schwarzes Samt-Theater“

## Design-Quellen

**Primärquellen (Brief):** `designmd.me`, `designmd.supply`, `design-md.hyperbrowser.ai`
– alle drei am 06.09.2026 versucht (WebFetch + curl): `designmd.supply` → HTTP 429,
`designmd.me` → Vercel-Security-Checkpoint (JS-gate), `design-md.hyperbrowser.ai` →
Next.js-App „Booting DESIGNMD“, rendert nur clientseitig. **Fallback gemäß Brief:**
die drei Ziel-Referenzen aus dem Refero/getdesign-Universum:

1. **Resend — „black velvet with violet neon“**: Samt-Schwarztöne statt Reinschwarz,
   EIN Violett-Neon als einziger Akzent, weiche radiale Glows auf dunklem Grund.
2. **Linear — „midnight precision instrument“**: 1px-Hairlines (weiß, ~8–16 % Alpha)
   statt Schattenkästen, kleine Radien, zurückhaltende Grays, präzise Ausrichtung,
   kompakte Uppercase-Labels mit weiter Laufweite.
3. **ORYZO — „Darkroom product editorial“**: Motive wirken wie im Dunkelraum
   ausgeleuchtet (Weiß-auf-Schwarz-Studien als große Atmosphäre-Bilder), editoriale
   Bildunterschriften, ruhige numerierte Abfolgen (Nr. 01–09).

## Tokens

| Token | Wert | Verwendung |
|---|---|---|
| `--velvet-0` | `#070709` | Footer, dunkelste Ebene |
| `--velvet-1` | `#0b0b0e` | Seitengrund (nie `#000`) |
| `--velvet-2` | `#101014` | Karten, Drawer, Modale |
| `--velvet-3` | `#16161c` | Hover/raised, Toast |
| `--hair` | `rgba(233,228,248,.09)` | 1px-Hairlines |
| `--hair-strong` | `rgba(233,228,248,.16)` | hervorgehobene Hairlines |
| `--text-hi` | `#f3f0e9` | warmes Off-White („Bühnenlicht“) |
| `--text-mid` / `--text-low` | `#b6b1a6` / `#7e796f` | Fließtext / Nebentext |
| `--violet` / `--violet-soft` / `--violet-deep` | `#9d86ff` / `#c3b6ff` / `#5743c9` | EIN Akzent: Eyebrows, Fokus, aktive States, CTA |
| `--violet-glow` | `rgba(122,95,255,.16)` | einzige Glow-Nutzung (Hero, Karten-Stages) |
| Shirt-Farben | `#eae4d6` / `#d2bd97` / `#191920` | Naturweiß / Sand / Schwarz |
| Typo Display | `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif` | Headlines, Preise, Zitate |
| Typo UI | `-apple-system, …, Arial` | Labels, Body, Buttons |
| Radien | 12px Karten · 8px Buttons · 5px klein | |
| Spacing/Rhythmus | 8pt-Grid, Sektionen `clamp(76px,10vw,132px)`, Container 1180px | |

## Motiv-Strategie (angepasstes Multiply-Konzept aus dem Brief)

- Helle Motive auf **Naturweiß/Sand**: `mix-blend-mode: multiply` → Papiergrund verschwindet im Shirt.
- Helle Motive auf **Schwarz**: `invert(1)` + `mix-blend-mode: screen` → Nachtdruck (weiße Linie).
- Dunkle Motive (`stromlinien-dram-1`, `kamera-dram-1`) **ausschließlich auf Schwarz** wählbar
  (Swatches deaktiviert + Hinweis „nur auf Schwarz“): `mix-blend-mode: screen`, Schwarzgrund verschwindet.
- Atmosphäre: Weiß-auf-Schwarz-Motive groß im Hero (Nachtlicht) und als Editorial-Band (Die Glocke).

## Logo

`gatinos_draft.png` nur auf dunklen Flächen: Emblem als Kreis-Crop im Header
(`object-position` + `scale`, die fehlerhafte „NUSIC“-Zeile ist beschnitten).
Wortmarke daneben/darunter als Typo nachgebaut (GATINOS / SELECTION / Music & Art).

## Abweichungen & Begründungen

- **Serif als Display-Größe** (statt Linear-typischer Grotesk): „Opernhaus statt Dashboard“ —
  die literarische Note des Buch-Projekts verlangt eine klassische Stimme; System-Serif hält die
  No-External-Requests-Regel ein.
- **Wärmeres Off-White (`#f3f0e9`)** statt Linears kühlem Grau-Weiß: Samt/Theater-Lesart,
  harmonischer mit den cremeweißen Papiermotiven.
- **Violett statt Bernstein**: Resend-Referenz folgt, Akzent bewusst sparsam (keine violetten
  Flächen im Content, nur Linien/States/CTA).
- **Kein Grain-/Noise-Overlay**: Hairlines + Glows reichen; Grain würde die Tuschescans verrauschen.
- Preisstaffel 39–44 €, Auflage „100 Drucke je Motiv“ und „240 g/m²“ sind Demo-Inhalte gemäß Brief (fiktiv).

## Technik

Eine Datei (`index.html`, inline CSS/JS), Vanilla JS, `localStorage`-Warenkorb
(`gatinos_v4_dark_cart`), Mock-Checkout klar als „Demo“ gekennzeichnet, keine externen Requests,
Bilder relativ aus `../assets/web/` bzw. `../assets/logo/`, mobil ab ~360 px, Fokus-Falle +
ESC + `prefers-reduced-motion`.
