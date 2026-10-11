# Dutch Bitcoin Embassy huisstijl

De Commons-interface gebruikt dezelfde huisstijl als de actuele Dutch Bitcoin Embassy website. De referentie is op 11 oktober 2026 rechtstreeks in de browser bekeken en vergeleken met de bijbehorende bronbestanden in `Vinnybtc/dbe-site`.

## Ontwerpsysteem

| Token | Exacte bronwaarde |
|---|---|
| Paper | `#f3f1eb` |
| Paper 2 | `#e8e5dc` |
| Ink / night | `#0f0f0d` |
| Night 2 | `#1a1a17` |
| Bitcoin orange | `#f7931a` |
| Sans | Schibsted Grotesk, variabel 400–900 |
| Serif | Source Serif 4, variabel 200–900 |
| Mono | JetBrains Mono, 400 |
| Header | 64 px, fixed; logo 34 px |
| Knoppen | 52 px, radius 999 px; small 42 px |
| Cards | Radius 18 px |
| Gutter | `clamp(16px, 3.6vw, 56px)` |
| Heroheading | Gewicht 720, tracking `-.045em`, regelhoogte `.9` |

De donkere hero gebruikt dezelfde zes ringcoördinaten en beeldverhouding als het DBE-beeldmerk. De Commons-navigatie en inhoud behouden hun eigen functies. Landenforks tonen hun eigen naam en landcode.

Bronnen: [actuele website](https://www.dutchbitcoinembassy.com/), [global.css](https://github.com/Vinnybtc/dbe-site/blob/main/src/styles/global.css), [header](https://github.com/Vinnybtc/dbe-site/blob/main/src/components/Nav.astro), [footer](https://github.com/Vinnybtc/dbe-site/blob/main/src/components/Footer.astro), [hero](https://github.com/Vinnybtc/dbe-site/blob/main/src/pages/index.astro).

## Lettertypen

De drie daadwerkelijk door DBE gebruikte WOFF2-bestanden zijn overgenomen uit de openbare `/fonts/`-paden. `dist/fonts.css` bevat ze als data-URL, zodat de generator en zelfstandige bron-ZIP tekstbestanden kunnen blijven gebruiken en de typografie ook zonder font-CDN werkt. De volledige SIL Open Font License en copyrightnotices zijn meegeleverd in `dist/font-licenses/`.

Deze lettertypen vallen onder **OFL-1.1**, afzonderlijk van de MIT-code. Officiële licentiebronnen: [Schibsted Grotesk](https://github.com/google/fonts/blob/main/ofl/schibstedgrotesk/OFL.txt), [Source Serif](https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md), [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt).

## Merk en fotografie

De DBE-preview bevat het originele zwarte en witte logo en favicon, opgenomen in `dist/brand.js`. Deze merkassets vallen buiten de MIT-, CC BY- en CC0-licenties van de toolkit. De opdrachtgever heeft het gebruik voor de eigen DBE-interface gevraagd. Het opnemen van die assets geeft andere organisaties geen algemene DBE-merklicentie.

De hero verwijst naar een openbaar DBE-sfeerbeeld op het eigen DBE-domein. Dat beeld is niet als zelfstandig foto- of open-contentbestand opgenomen in de downloads. De oorsprong en beeldrechten blijven bij het bronmateriaal. Een lokaal team gebruikt eigen naam, eigen logo en eigen beeldmateriaal; vervang desgewenst de assetverwijzingen in `dist/brand.js`.

De inhoud van de openbare data en de broncode zijn ongewijzigd in hun licentiebeleid. Zie [CONTENT-LICENSE.md](../CONTENT-LICENSE.md), [DATA-LICENSE.md](../DATA-LICENSE.md) en [LICENSE](../LICENSE).
