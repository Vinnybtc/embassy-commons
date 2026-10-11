# Self-host and start a country chapter

You can operate this project without the creators' infrastructure. Everything needed for the supplied static app, its original educational content and its country generator is included. Node.js 22 or later is needed for build, validation, the command-line generator and the included local server. There are no package dependencies and no `npm install` step.

## Run the source locally

Extract the source ZIP, open a terminal in its directory, then run:

```sh
npm run build
npm test
npm run validate
npm start
```

Open `http://127.0.0.1:4173`. Use `npm start -- --port 4180` if that port is busy. The server binds to localhost for local development. Stop it with Ctrl-C.

Double-clicking `dist/index.html` is not supported because browser modules and JSON retrieval require HTTP. After the page and its data have loaded, navigation and starter editing happen locally. This version has no service worker; a fresh page load still needs the static host or local server to be available.

## Generate an independent local fork

Use the browser's country starter to download a configured ZIP, or save this config as `local-config.json`:

```json
{
  "schemaVersion": "1.0.0",
  "name": "Lisbon Bitcoin Community",
  "countryCode": "PT",
  "country": "Portugal",
  "city": "Lisbon",
  "language": "en",
  "accent": "#f7931a",
  "mission": "Independent Bitcoin education and a welcoming local community.",
  "status": "draft"
}
```

Create a new directory from it:

```sh
npm run create -- --config local-config.json --out ../lisbon-community
cd ../lisbon-community
npm run build
npm test
npm start
```

The output directory must not already exist. The generator refuses to overwrite it, including an empty existing directory. A local fork receives only its own draft registry record. Its country name and mission initially use the chosen config text for both language fields; translate those fields before publication. An independently operated fork is not automatic membership, official representation or permission to use any third-party brand.

The separate `dist/data/dbe-public.json` remains an origin-reference dataset in the fork. It documents public Dutch Bitcoin Embassy facts and historical events from the cited official website. It does not describe the local fork's current organization or scheduled events, and it includes no private data or live connection to Dutch Bitcoin Embassy systems.

## Edit and publish

Edit `dist/data/config.json` for name, country, city, mission, language and accent. The interface and generated guidance are English. The language field still accepts Dutch and English as content metadata for compatibility, and the resource datasets retain both translations. Changing the language field does not switch the interface. Additional interface languages need corresponding UI behavior, resource translations, schemas and validators.

Edit original lessons in `dist/data/resources.json`. Keep both `nl` and `en` fields complete, retain IDs, and credit adaptations under CC BY 4.0. Before publishing, check source rights, local rules and whether any contact data is approved for publication. This starter includes no private member directory, authentication, wallet custody or payment collection.

Run build and validation after edits. Publish the entire contents of `dist/` using an HTTPS static host of your choice, preserving its folders. The app uses relative paths and works below a subdirectory. The build copies canonical `docs/` and `schema/` into `dist/` and generates the public source template and ZIP. Keep the original source directory as your editable repository; `dist/docs/` and `dist/schema/` are generated copies.

Do not put secrets anywhere under `dist/`. A static host makes every deployed file public. Generated templates exclude conventional hidden identity and credential files, but filenames are not a general secret scanner: review source before making a public release. Keep unpublished content outside this repository and import only a reviewed public export.

## Versioning and updates

Commit your local public source to a repository and record your upstream version. Review upstream changes before merging them, especially content licenses, source facts and config. Keep local branding and content in separate commits so changes can be reviewed. There is no automatic remote synchronization or central approval service.

The project can be deployed by any static host; no hosting account is configured or provisioned here. Local-server MIME types, HEAD, traversal protection and symlink checks are tested. Configure equivalent security headers and HTTPS on your public host.

## Public introduction for the publisher

The publisher build also creates `dist/public-introduction/`, a separate minimal introduction for the existing DBE website. It contains no toolkit datasets, source template, source ZIP or internal documentation. For a public `/commons/` page, publish only this folder, preserving its subfolders. Do not publish the full review `dist/` in place of it. The introduction deliberately links to the public open-source repository and provides optional volunteer contact. Integration into the existing website has not been performed.

A generated local fork keeps its own identity and skips this publisher introduction, even if its chosen name is Embassy Commons. Its source includes the introduction builder so it can adapt the code independently.
