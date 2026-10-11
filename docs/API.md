# Public data interface

Version: 1.0.0 · Updated: 2026-10-11

This is a static public JSON interface. It requires no API key, account, database or paid service. The supplied server listens only on `127.0.0.1`. Publish `dist/` on your own static host to make the interface public. URL paths below are relative to that host's application directory, so subdirectory hosting works.

| Path | Response | Use |
| --- | --- | --- |
| `data/manifest.json` | Version, endpoint paths, licenses, counts and SHA-256 hashes | Discover the public dataset |
| `data/registry.json` | `{schemaVersion, updatedAt, chapters: [...]}` | Source example and explicitly fictional templates |
| `data/resources.json` | `{schemaVersion, updatedAt, resources: [...]}` | Eight original Dutch/English educational playbooks |
| `data/config.json` | Local draft chapter settings | Branding and starter configuration |
| `source-template.json` | `{schemaVersion, version, licenses, files: {path: text}}` | Generate a complete local fork in the browser |
| `downloads/embassy-commons.zip` | ZIP archive with canonical source files | Download, inspect and self-host the full source |
| `schema/*.schema.json` | JSON Schema 2020-12 documents | Validate and integrate the four public datasets |
| `docs/*.md` | Public documentation | Architecture, governance, licenses and this interface |

GET and HEAD are supported by the included server. It rejects mutation methods, hidden files, directory traversal and symlink paths outside `dist/`. These files do not implement a live registry submission, login, payments, messaging, member management or synchronized editing.

## Example: retrieve the educational resources

```js
const base = new URL('./', window.location.href);
const response = await fetch(new URL('data/resources.json', base));
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const { resources } = await response.json();
const lessons = resources.filter(resource => resource.category === 'education');
console.log(lessons.map(resource => resource.title.en));
```

Preserve `schemaVersion` and IDs when exchanging data. Check each record's status: `source` means a cited public example, `template` means a fictional demonstration, and `draft` means an unconfirmed local starter. None represents network membership or endorsement. Registry coordinates are approximate city centres and must not be used as an embassy address. A local draft has `coordinates: null` until its location is confirmed through a future publication process.

## Browser modules

```js
import { validateConfig, createStarterFiles, resourceMarkdown } from './lib/kit.js';
import { zipFiles } from './lib/zip.js';

const errors = validateConfig(config); // array of readable validation messages
if (errors.length) throw new Error(errors.join('\n'));
const response = await fetch('./source-template.json');
const files = createStarterFiles(await response.json(), config);
const zip = zipFiles(files); // Uint8Array; attach to a Blob download
const markdown = resourceMarkdown(resource, 'en');
```

`createStarterFiles` returns a new path-to-text mapping and does not mutate the source template. It copies public source, writes local config, replaces the registry with one draft record, resets manifest hashes and updates record counts, and adds `README.local.md`. It excludes hosted project identity, hidden configuration, conventional credential files and generated downloads. No secrets or existing private Dutch Bitcoin Embassy data are imported. It rejects absolute paths and traversal paths before processing a template.

`zipFiles` writes standard ZIP archives using STORE compression, UTF-8 paths and CRC-32. File contents must be text. ZIP64 and binary source assets are not supported. The build deliberately uses local text/SVG assets so the full starter is portable without dependencies. ZIP metadata uses a fixed date for reproducible archives.

## Integrity and caching

`manifest.integrity` maps the three dataset paths `data/config.json`, `data/registry.json` and `data/resources.json` to SHA-256 hashes of their exact UTF-8 bytes. Run `npm run build` after changing them. `npm run validate` checks these hashes. The manifest is not signed; a hash detects accidental mismatches, not a malicious host changing both the file and manifest.

The localhost server sends `Cache-Control: no-store` for iteration. On a public host, configure your own update and caching policy. For permanent integrations, keep a dated copy of the data and its manifest. Cross-origin access needs the static host's explicit CORS configuration; the included local server provides same-origin access only.

## Rights

Code is MIT. Original playbooks are CC BY 4.0, requiring attribution, a license link and disclosure of adaptations. Original demonstration templates use CC0-1.0. The Dutch Bitcoin Embassy public record is an independently written summary of external facts with source rights recorded separately. No license here grants third-party brand, logo, website content, personal data or unpublished-material rights. See `docs/LICENSES.md`.
