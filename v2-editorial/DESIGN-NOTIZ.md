# DESIGN-NOTIZ — Variante „v2-editorial“ (Monochromer Editorial)

**Projekt:** GATINOS SELECTION — Music & Art · Art Edition 01 („20 Tage Warten auf Camilla“)
**Einstieg:** `index.html` (reines HTML/CSS/Vanilla-JS, keine Build-Tools, keine externen Requests)

---

## 1. Design-Quelle(n)

**Primärquelle:** `http://getdesign.md` — Katalog abgerufen; die drei referenzierten
Richtungen liegen dort nur als Indexzeilen offen. Die vollständigen DESIGN.md-Spezifikationen
wurden über den auf der Seite dokumentierten Weg geladen (`npx getdesign@latest add nike|bugatti|vercel`)
und als Token-Grundlage verwendet:

| Richtung | Übernommene Kernideen |
|---|---|
| **Nike** — „Monochrome UI, massive uppercase type, full-bleed photography“ | Uppercase-Display-Stufe (96 px, line-height 0,9) exklusiv für Editoral-/Kampagnen-Momente; flache Produktkarten mit 0 px Radius und 0 Schatten, Bild ist die Karte; Produktbühne auf Soft-Cloud-Grau; Filter-Chips, die sich bei Aktivierung voll invertieren; 8-px-Raster; Sticky-Bars mit 1-px-Inset-Hairline; Section-Rhythmus 48 px+ |
| **Bugatti** — „Cinema-black canvas, monochrome austerity, monumental display type“ | Reine schwarze Ganzseiten-Bänder (Manifesto, Nacht-Sektion, Footer); weiße Uppercase-Headlines; Mono-Captions/Buttons in Versalien mit weiter Laufweite (2–2,5 px-Prinzip); transparente Outline-Pillen als CTAs; nur Unterlinie als Eingabefeld („text-input“); spec-cell-Raster (Wert + Mono-Label); 120-px-Sektionsrhythmus; Serifen-Fließtext für literarische Prosa |
| **Vercel** — „Black and white precision“ | Grey-Ladder für Text (#171717 → #4d4d4d → #8f8f8f → #a1a1a1); 1-px-Hairline (#ebebeb-Prinzip) als einziges Struktur- und Tiefenmittel; enges Tracking auf großen Displays; Level-2-„Whisper“-Schatten ausschließlich für Drawer/Modal (dokumentiertes „floating“-Level) |

**Fusion Prinzip:** Papier-Welt (heller Editoral-Canvas, Nike-Karten, Vercel-Hairlines) trägt
die seven Tafeln auf hellen Shirts; Tinten-Welt (Bugatti-Kino-Schwarz) trägt die beiden
invertierten Nachtmotive und schließt Manifesto und Seite. Die Schwarz-Weiß-Illustrationen
werden so zu Kunstdrucken einer Ausgabe.

## 2. Tokens

### Farben (Papier-Welt)
| Token | Wert | Herkunft |
|---|---|---|
| `--paper` (Canvas) | `#fafaf8` | Vercel `canvas` #fafafa, minimal warm verschoben |
| `--paper-hi` (Karten) | `#ffffff` | Vercel `canvas-elevated` |
| `--paper-cream` | `#f3efe6` | warmes Grau, angelehnt an den Papierton der Illustrationen |
| `--stage` (Produktbühne) | `#f5f4f1` | Nike `soft-cloud` #f5f5f5, warm verschoben |
| `--ink` | `#171717` | Vercel `ink` (Brieftext „Tintenschwarz“) |
| `--body / --mute / --faint` | `#4d4d4d / #8f8f8f / #a1a1a1` | Vercel Grey-Ladder |
| `--hairline / --hairline-soft` | `#e5e2da / #edeae3` | Vercel-Hairline-Prinzip, warm verschoben |

### Farben (Tinten-Welt, Bugatti)
| Token | Wert |
|---|---|
| `--void` (Canvas) | `#0a0a0a` (Bugatti #000000, +1 Stufe für Bildschirmruhe) |
| `--void-card` | `#141414` (Bugatti `surface-card`) |
| `--d-hairline / --d-hairline-strong` | `#262626 / #3a3a3a` |
| `--d-strong / --d-body / --d-mute / --d-faint` | `#e6e6e6 / #cccccc / #999999 / #666666` |

Keine Akzentfarbe. Einzige „Chromatik“ bleiben die Illustrationen selbst (Nike-Prinzip:
„photography is the only color source“).

### Shirt-Farben
Naturweiß `#f0ece1` · Sand `#d9cbb0` · Schwarz `#161616`.

### Typografie (System-Stacks, keine Webfonts)
| Rolle | Stack / Setting |
|---|---|
| Display (Hero) | Sans-Stack (SF/Helvetica/Segoe/Arial), 700, UPPERCASE, line-height 0,9, tracking −0,025 em, `clamp(3.4rem, 10.5vw, 9.5rem)` — Nike-Kampagnen-Stufe, Vercel-Negativ-Tracking |
| Sektions-Headlines | 700, UPPERCASE, lh 0,92–0,95, `clamp(2.2rem, 5.5vw, 4.25rem)` |
| Eyebrows / Captions / Buttons / Preise / Nummern | Mono-Stack, 10–12 px, UPPERCASE, tracking 0,16–0,24 em (Bugatti-Mono-Prinzip) |
| Fließtext / Prosa / Gedichtzeilen | Serifen-Stack (Iowan/Palatino/Georgia/Times), 15–17 px, lh 1,6–1,7 (Bugatti „Text Regular“-Rolle — literarische Stimme des Buchs) |
| Wortmarke | „GATINOS“ Serifen-Versalien, tracking 0,42 em; „SELECTION“ Sans 0,58 em; „MUSIC & ART“ Mono 0,5 em mit feinen Trennlinien — Wortmarke typografisch nachgebaut wie im Brief gefordert (Draft enthält Schriftfehler „NUSIC“ und ist ausdrücklich Platzhalter). Emblem (Katzenkopf im Kreis mit Stern) als vereinfachtes Inline-SVG nachgebaut, fehlerfrei und auf hell wie dunkel einsetzbar |

### Layout / Form
- 8-px-Basis; Sektionsrhythmus `clamp(72px, 10vw, 140px)` (Bugatti 120-px-Prinzip).
- Content max. 1280 px; Hero-/Nacht-Bänder full-bleed.
- **Radius:** 0 auf allen Flächen (Karten, Stage, Inputs, Drawer, Modal). Pillen (999 px) nur für CTAs — in allen drei Specs so dokumentiert.
- **Schatten:** keine auf Flächen; einziger „Whisper“-Schatten (Vercel Level 2) auf Warenkorb-Drawer; Sticky-Header mit 1-px-Inset-Hairline (Nike).
- **Hero:** monumentale Uppercase-Headline, die in die full-bleed-Tafel (`stricher-orig-1`, `mix-blend-mode: multiply`) hineingesetzt ist; letztes Wort als Outline-Typo; Ghost-Wort „SELECTION“ als Konturlinie.
- Große Konturnummern (01–09) auf Karten und Sektionen als editoriales Ordnungsmittel.

## 3. Print-Regeln (Brief-konform)
- Helle Motive (7 Tafeln): `mix-blend-mode: multiply` auf Naturweiß/Sand — Papierhintergrund verschwindet auf dem Shirt.
- Schwarze Motive (`stromlinien-dram-1`, `kamera-dram-1`): ausschließlich auf schwarzen Shirts, als rechteckiger Poster-Druck ohne Blend — die JPG-Hintergründe sind nicht gleichmäßig schwarz (kamera-dram-1 hat eine helle Bildhälfte), deshalb wäre Screen/Multiply nicht sauber. Umsetzung konsistent als „Tafel auf der Brust“.

## 4. Begründete Abweichungen von den Quellen
1. **Serif für Fließtext** (Bugatti-Rolle) statt durchgehend Sans (Nike/Vercel): Die Marke ist eine Buch-/Illustrations-Edition; die literarische Stimme ist Brief-Vorgabe („poetisch, literarisch“).
2. **Warm verschobene Grautöne** statt Vercels kühlem Neutralgrau: Die Tafeln haben cremeweißes Papier; kühle Hairlines würden gegen sie kanten.
3. **`#0a0a0a` statt `#000000`**: Bugatti nutzt reines Schwarz; die minimale Aufhellung vermeidet Auslösch-Effekte der weißen Zeichnungen am Bildschirmrand (Logo-Regel im Brief: „Schwarzer Grund geht unter“).
4. **Produktbühne `#f5f4f1` statt Nike `#f5f5f5`**: gleiches Prinzip, auf den Papierton abgestimmt.
5. **Filter-Chips „Alle/Papier/Nacht“** statt Nike-Filterleiste: kleinste funktionale Übersetzung des Chip-Musters; die Nacht-Chips korrespondieren mit dem schwarzen Nacht-Band.
6. **Hero-Tafel als Editorial-Plate statt Foto-Bleed**: Die Vorlage ist eine Papierillustration, keine Fotografie; multiply statt „burned-in photo“, Typo bleibt dennoch monumental über dem Motiv.

## 5. Features (Brief-Anforderungen)
- 9 Produkte (Tabelle des Briefs, 39–44 €), Unisex, Größen S–XXL, Shirt-Farben Naturweiß/Sand/Schwarz (Nachtmotive nur Schwarz — erzwungen).
- Warenkorb mit `localStorage` (`gatinos_selection_cart_v1`), Größen-/Farbwahl pro Position, Mengenstepper, Entfernen, Zwischensumme.
- Mock-Checkout, überall klar als „Demo“ gekennzeichnet (Utility-Bar, Drawer, Kasse, Footer); Validierung ohne Versand; Bestätigung mit fiktiver Bestellnummer; leert nur den lokalen Warenkorb.
- Produkt-Detailansicht als Modal (PDP mit Shirt-Vorschau in gewählter Farbe, Specs, Größe/Farbe/Menge).
- Produkt-Grid mit Filter, Nacht-Band, Editions-Sektion, dezenter Music-Teaser.
- Mobile responsive (3→2→1 Spalten, Drawer/Modal fullscreen, Hero umbaut), Tastatur (Esc, Fokus-Rückgabe, Skip-Link), `prefers-reduced-motion`.
- Keine externen Requests; System-Font-Stacks; Bilder relativ aus `../assets/web/`.
