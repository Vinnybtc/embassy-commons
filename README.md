# Embassy Commons

An open foundation that lets a local team start its own Bitcoin Embassy. Built as a proposal for Dutch Bitcoin Embassy. Version **0.1.0** is a working, independent starter with original example content and a documented plan to make public DBE data available through a controlled release process.

## Try it

Requires Node.js 22 or later. There are no external runtime or npm dependencies.

```sh
npm run build
npm test
npm start
```

Open `http://127.0.0.1:4173`. The HTTP server serves only `dist/`. Opening `index.html` directly does not support fetching the JSON data; use the server.

## What works

- The DBE brand style: original typography, colours, logo, rings, navigation and component dimensions. Fonts work locally and include their OFL licences; DBE brand assets have separately reserved rights. See [BRAND.md](docs/BRAND.md).
- A responsive English interface with six pages: overview, country registry, library, starter generator, open data and proposal. Public guidance and documentation are in English.
- A searchable country registry with one public Netherlands source reference and three explicitly marked example templates. No confirmed international partners are listed.
- Structured public DBE source data: three circles and two historical gatherings, with provenance and rights. This is a separate origin reference and contains no member data.
- Eight original playbooks, displayed and downloaded in English. Existing Dutch/English translations remain in the source datasets as reusable material.
- Three steps to enter a name, country, city, colour and mission. The generator provides the complete source, documentation and an English local country configuration as a ZIP. The data schema and CLI retain support for Dutch configurations.
- Public JSON files, JSON Schemas, data validation and an independent CLI for generating a starter.
- A complete proposal, governance, contribution guide, licensing policy and a playbook for the first 90 days.

## Create a local embassy

Use the website's starter generator or the CLI:

```sh
npm run create -- --config ./my-country.json --out ./my-embassy
```

Example configuration:

```json
{
  "schemaVersion": "1.0.0",
  "name": "Belgian Bitcoin Embassy",
  "countryCode": "BE",
  "country": "Belgium",
  "city": "Brussels",
  "language": "en",
  "accent": "#f7931a",
  "mission": "A local meeting place to learn and build together around Bitcoin.",
  "status": "draft"
}
```

The new package contains only your local draft in the country registry. It creates no account, publishes nothing and registers no organization. You can then adapt and host the website and public content independently.

## Structure

```text
dist/               Website, original knowledge and public example data
  data/             Configuration, registry, resources and manifest
  lib/              Config validation, starter generator and ZIP writer
schema/             JSON Schema contracts
scripts/            Build, local server, CLI and data validation
tests/              Functional tests
docs/               Proposal, governance, hosting, data policy and pilot
```

`npm run build` validates the data and creates the source template and downloadable ZIP. It copies canonical documentation and schemas to the website. Edit the original files in `docs/` and `schema/`, then rebuild.

## Licences and source rights

- **Code:** MIT; see [LICENSE](LICENSE).
- **Original knowledge and documentation:** CC BY 4.0; see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
- **Original example data:** CC0 1.0; see [DATA-LICENSE.md](DATA-LICENSE.md).
- **External source metadata:** preserve provenance and rights information. A website reference grants no rights to its original text or photographs.
- Names and existing DBE brands are not automatically released under these licences. A local initiative uses its own identity unless separate brand use has been agreed.

The public DBE website was consulted as a source for the existing circle model. Existing private DBE code, member lists, chat, wallets, presentations, photographs and databases are not included in this starter. The existing repositories were neither changed nor made public. See [research and integration](docs/EXISTING-SOURCES.md).

## Publish and collaborate

After building, upload the contents of `dist/` to a static host. The website needs no server database. Keep the complete source in your own repository; remove any owner-specific `.openai/` hosting configuration when forking. Generated downloads exclude such hosting identities.

The original starter is public on [GitHub: Vinnybtc/embassy-commons](https://github.com/Vinnybtc/embassy-commons). The owner's preview is private. The downloadable source package works independently. Controlled release of existing DBE content is a separate next step.

Read the [full proposal](docs/VOORSTEL.md), [governance](docs/GOVERNANCE.md), [contribution guide](CONTRIBUTING.md), [data policy](docs/DATA-POLICY.md) and [launch playbook](docs/LAUNCH-PLAYBOOK.md).
