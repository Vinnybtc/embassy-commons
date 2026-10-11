# Embassy Commons

Een open fundament waarmee een lokaal team zijn eigen Bitcoin Embassy kan starten. Gebouwd als voorstel voor Dutch Bitcoin Embassy. Versie **0.1.0** is een zelfstandig werkende starter, met originele voorbeeldcontent en een onderbouwd plan om openbare DBE-data later gecontroleerd beschikbaar te stellen.

## Probeer het

Vereist: Node.js 22 of nieuwer. Er zijn geen externe runtime- of npm-dependencies.

```sh
npm run build
npm test
npm start
```

Open `http://127.0.0.1:4173`. De HTTP-server serveert alleen `dist/`. Dubbelklikken op `index.html` werkt niet voor het ophalen van JSON-data; gebruik de server.

## Wat werkt

- Responsive website met Nederlands en Engels en zes pagina’s: overzicht, landregister, kennisbank, startergenerator, open data en voorstel.
- Zoekbaar landregister met een openbare Nederlandse bronverwijzing en drie expliciet gemarkeerde voorbeeldtemplates. Er zijn geen bevestigde internationale partners opgenomen.
- Gestructureerde openbare DBE-brondata: de drie circles en twee historische bijeenkomsten, inclusief herkomst en rechten. Dit is een afzonderlijke bronreferentie en bevat geen ledengegevens.
- Acht originele playbooks in beide talen, met leesvenster en Markdown-download.
- Drie stappen om naam, land, stad, taal, kleur en missie in te vullen. De generator levert de volledige broncode, documentatie en een lokale landconfiguratie als ZIP.
- Openbare JSON-bestanden, JSON Schema’s, datavalidatie en een onafhankelijke CLI voor het genereren van een starter.
- Een volledig voorstel, governance, bijdragehandleiding, licentiebeleid en een draaiboek voor de eerste 90 dagen.

## Maak een lokale embassy

Gebruik de startergenerator op de website of de CLI:

```sh
npm run create -- --config ./my-country.json --out ./my-embassy
```

Voorbeeldconfiguratie:

```json
{
  "schemaVersion": "1.0.0",
  "name": "Belgian Bitcoin Embassy",
  "countryCode": "BE",
  "country": "België",
  "city": "Brussel",
  "language": "nl",
  "accent": "#f7931a",
  "mission": "Een lokale ontmoetingsplek om samen over Bitcoin te leren en te bouwen.",
  "status": "draft"
}
```

Het nieuwe pakket bevat alleen jouw lokale concept in het landregister. Het maakt geen account, publiceert niets en meldt geen organisatie aan. Daarna kun je de website en openbare inhoud zelfstandig aanpassen en hosten.

## Structuur

```text
dist/               Website, originele kennis en openbare voorbeelddata
  data/             Configuratie, register, resources en manifest
  lib/              Configvalidatie, startergenerator en ZIP-schrijfmodule
schema/             JSON Schema-contracten
scripts/            Build, lokale server, CLI en datavalidatie
tests/              Functionele tests
docs/               Voorstel, governance, hosting, databeleid en pilot
```

`npm run build` valideert de data en maakt de bron-template en downloadbare ZIP. Het kopieert de canonieke documentatie en schema’s naar de website. Bewerk de oorspronkelijke bestanden in `docs/` en `schema/`, daarna bouw je opnieuw.

## Licenties en bronrechten

- **Code:** MIT, zie [LICENSE](LICENSE).
- **Originele kennis en documentatie:** CC BY 4.0, zie [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
- **Eigen voorbeelddata:** CC0 1.0, zie [DATA-LICENSE.md](DATA-LICENSE.md).
- **Externe bronmetadata:** behoud de bron- en rechteninformatie. Een verwijzing naar een website verleent geen rechten op de oorspronkelijke teksten of foto’s.
- Namen en bestaande DBE-merken worden niet automatisch onder deze licenties vrijgegeven. Een lokaal initiatief gebruikt zijn eigen identiteit, tenzij afzonderlijk merkgebruik is afgesproken.

De openbare DBE-website is bekeken als bron voor het bestaande circle-model. Bestaande private DBE-code, ledenlijsten, chat, wallets, presentaties, foto’s en databases zijn niet in deze starter opgenomen. De bestaande repositories zijn niet veranderd of openbaar gemaakt. Zie [onderzoek en aansluiting](docs/EXISTING-SOURCES.md).

## Publiceren en samenwerken

Upload na het bouwen de inhoud van `dist/` naar een statische host. De website heeft geen serverdatabase nodig. De complete broncode hoort in een eigen repository; verwijder eventuele eigenaargebonden `.openai/`-hostconfiguratie bij een fork. De gegenereerde downloads sluiten zulke hostidentiteiten uit.

De oorspronkelijke starter staat openbaar op [GitHub: Vinnybtc/embassy-commons](https://github.com/Vinnybtc/embassy-commons). De eigenaarpreview is privé. Het downloadbare bronpakket is zelfstandig bruikbaar. Gecontroleerde vrijgave van bestaande DBE-content is een afzonderlijke vervolgstap.

Lees het [volledige voorstel](docs/VOORSTEL.md), het [beheerplan](docs/GOVERNANCE.md), [bijdragen](CONTRIBUTING.md), [databeleid](docs/DATA-POLICY.md) en het [pilotdraaiboek](docs/LAUNCH-PLAYBOOK.md).
