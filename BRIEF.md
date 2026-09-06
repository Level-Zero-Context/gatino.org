# Webshop-Brief — „GATINOS SELECTION — Music & Art"

## Projekt-Kontext

**Marke: „Gatinos Selection"**, Claim **„Music & Art"** (Gatinos = span. Koseform für Katzen —
das Label-Wappen ist ein Katzenkopf im Kreis mit Stern). Der Shop ist die **Art-Edition** des
Labels; der erste Drop sind die Illustrationen aus dem abgeschlossenen Buch-Projekt
**„20 Tage Warten auf Camilla"** (surreal-poetische Tinten-Illustrationen) als
**Motivdruck auf Shirts**. Eine Music-Edition folgt später (max. dezenter Teaser erlaubt —
keine Musik-Produkte im Shop).

Der Shop muss die poetische, literarische Note transportieren — das ist kein Streetwear-Shop,
sondern eine kleine Kunst-Boutique für Buch-/Illustrations-affine Käufer mit Label-Charakter
(„Selection" = kuratiert, nummeriert, Auflage).

**Markenrahmen** (darf variantenabhängig interpretiert werden):
- Marke: „GATINOS SELECTION" — zweizeilig, weit gesperrte elegante Versalien; Subline „Music & Art"
- Der Camilla-Drop kann als „Art Edition 01 — 20 Tage Warten auf Camilla" etikettiert werden
- Sprache des Shop-UI: **Deutsch** (Markenname/Claim bleiben Englisch/Spanisch wie oben)
- Tonalität: leise, poetisch, präzise — keine Marketing-Floskeln

## Logo

- `assets/logo/gatinos_draft.png` — **Logo-Draft** (Katzenkopf-Emblem im Kreis mit Stern,
  darunter Wortmarke; dunkles Blaugrau auf Schwarz). Der Draft enthält einen Schriftfehler
  („NUSIC") und ist nur Platzhalter: **Einbinden maximal auf dunklen Flächen** (Schwarzer
  Grund geht unter). Neue, korrekte Logo-Renderings (`gatinos_dark_*.png` / `gatinos_light_*.png`
  im selben Ordner) werden gerade generiert — falls schon vorhanden, diese bevorzugen.
- Auf hellen Flächen: Wortmarke als **Typografie nachbauen** („GATINOS" gesperrte Versalien,
  darunter „SELECTION" kleiner, Subline „Music & Art") — optional mit kleinen Trennlinien
  wie im Draft. Kein schwarzer Bild-Kasten auf hellem Grund.

## Die Motive (Story in einem Satz je Motiv)

| Datei (web/) | Produktname-Vorschlag | Beschreibung |
|---|---|---|
| `stricher-orig-1.jpg` | „Sich aus dem Staub gemacht" | Segelschiff als Ballon, von winzigen Figuren über ein Seil hochgezogen — HERO-Motiv |
| `stricher-orig-2.jpg` | „Tauziehen" | Schiff an straffen Tauen, das von zwei Gruppen gegeneinander gezogen wird |
| `stromlinien-sanft-3.jpg` | „Wolkenlampe" | Lampe in einer Wolke, S-förmige Lichtbahn führt aus einem Tunnel |
| `stromlinien-sanft-1.jpg` | „Wolke mit Beinen" | Wolke auf Stativbeinen über einer Schneelandschaft |
| `stromlinien-dram-1.jpg` | „Nachtlicht" | Weiße Wolke auf Schwarz — für **schwarze Shirts** |
| `kauz-sanft-2.jpg` | „Der Kauz" | Eule mit Brille und Buch auf der Psychologie-Statik, Halbmond |
| `herz-sanft-2.jpg` | „Found my heart" | Herz-Medallion in einer geöffneten gravierten Schublade |
| `kamera-sanft-1.jpg` | „Momentaufnahme" | Faltkamera auf Tischchen, darunter ein Landschaftsfoto |
| `kamera-dram-1.jpg` | „Die Glocke" | Auge im Glockeninneren, Strahl auf ein Foto — **weiß auf schwarz**, für schwarze Shirts |

## Assets

- `assets/web/*.jpg` — **für den Shop verwenden** (max. 1000 px, ~100–200 KB)
- `assets/images/*.png` — Originaldrucke 1152×1664 (nicht einbinden, nur Fallback)
- **Wichtig:** Alle Motive haben einen cremeweißen Papier-Hintergrund (kein Alphakanal),
  außer `stromlinien-dram-1` und `kamera-dram-1` (weiße Zeichnung auf Schwarz).
  Auf hellen Shirt-Mockups den Print mit `mix-blend-mode: multiply` einbinden, damit der
  Papier-Hintergrund verschwindet. Die Schwarz-Motive ausschließlich auf schwarzen Shirts zeigen.

## Produkte & Commerce (fiktiv, Demo-Shop)

- 9 Produkte (Tabelle oben), Preis 39 € (39–44 € erlaubt), Unisex-Schnitt
- Größen S–XXL, Shirt-Farben: Naturweiß / Sand / Schwarz
- Warenkorb mit localStorage, Größen-/Farbwahl pro Produkt
- Mock-Checkout (kein echtes Payment — sauber als „Demo" kennzeichnen)
- Produkt-Detailansicht (Modal oder Unterseite), Produkt-Grid, Mobile responsive

## Technische Vorgaben (alle Varianten)

1. **Statisch & offline:** reines HTML + CSS + Vanilla JS, **keine externen Requests**
   (keine CDNs, keine Google Fonts, keine Tracker). System-Font-Stacks erlaubt und erwünscht.
2. Eigener Ordner: `webshop/<varianten-ordner>/`, Einstieg immer `index.html`.
   Bilder per relativem Pfad einbinden (`../assets/web/*.jpg`).
3. Shirt-Präsentation: Motiv als Print auf einem Shirt (SVG-/CSS-Silhouette oder
   flächige Produktkarte mit Print). Der Print muss groß und glaubwürdig wirken.
4. Sauberer, semantischer Code; keine Build-Tools, kein Node nötig.
5. Zusätzlich `DESIGN-NOTIZ.md` im Varianten-Ordner: verwendete Design-Quelle(n),
   extrahierte Tokens (Farben/Typo/Spacing/Radien), begründete Abweichungen.
