# Dutch Bitcoin Embassy brand style

The Commons interface uses the same brand style as the current Dutch Bitcoin Embassy website. The reference was inspected directly in a browser on 11 October 2026 and compared with the corresponding source files in `Vinnybtc/dbe-site`.

## Design system

| Token | Exact source value |
|---|---|
| Paper | `#f3f1eb` |
| Paper 2 | `#e8e5dc` |
| Ink / night | `#0f0f0d` |
| Night 2 | `#1a1a17` |
| Bitcoin orange | `#f7931a` |
| Sans | Schibsted Grotesk, variable 400–900 |
| Serif | Source Serif 4, variable 200–900 |
| Mono | JetBrains Mono, 400 |
| Header | 64 px, fixed; logo 34 px |
| Buttons | 52 px, radius 999 px; small 42 px |
| Cards | Radius 18 px |
| Gutter | `clamp(16px, 3.6vw, 56px)` |
| Hero heading | Weight 720, tracking `-.045em`, line height `.9` |

The dark hero uses the same six ring coordinates and aspect ratio as the DBE mark. Commons navigation and content retain their own functions. Country forks display their own name and country code. The Commons interface and public guidance are in English.

Sources: [current website](https://www.dutchbitcoinembassy.com/), [global.css](https://github.com/Vinnybtc/dbe-site/blob/main/src/styles/global.css), [header](https://github.com/Vinnybtc/dbe-site/blob/main/src/components/Nav.astro), [footer](https://github.com/Vinnybtc/dbe-site/blob/main/src/components/Footer.astro), [hero](https://github.com/Vinnybtc/dbe-site/blob/main/src/pages/index.astro).

## Fonts

The three WOFF2 files actually used by DBE were copied from the public `/fonts/` paths. `dist/fonts.css` contains them as data URLs so the generator and standalone source ZIP can continue using text files, and typography works without a font CDN. Full SIL Open Font License texts and copyright notices are included in `dist/font-licenses/`.

These fonts use **OFL-1.1**, separately from the MIT code licence. Official licence sources: [Schibsted Grotesk](https://github.com/google/fonts/blob/main/ofl/schibstedgrotesk/OFL.txt), [Source Serif](https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md), [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt).

## Brand and photography

The DBE preview includes the original black and white logos and favicon in `dist/brand.js`. These brand assets fall outside the toolkit's MIT, CC BY and CC0 licences. The client requested their use for its own DBE interface. Their inclusion grants no general DBE brand licence to other organizations.

The hero references a public DBE photograph on DBE's own domain. That image is not included in downloads as a separate photograph or open-content file. Provenance and image rights remain with the source material. A local team uses its own name, logo and imagery; replace the asset references in `dist/brand.js` as appropriate.

The licensing policy for public data and source code remains unchanged. See [CONTENT-LICENSE.md](../CONTENT-LICENSE.md), [DATA-LICENSE.md](../DATA-LICENSE.md) and [LICENSE](../LICENSE).
