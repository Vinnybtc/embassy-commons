# Data contracts and validation

All public JSON documents use `schemaVersion: "1.0.0"`. Canonical machine-readable schemas live in `schema/`; build copies them to `dist/schema/`. They use JSON Schema draft 2020-12. The included dependency-free checker implements the keywords actually used by these files and checks additional relations between records. Tests guard the keyword inventory so an unsupported keyword cannot silently weaken validation.

## Config

Required fields are `schemaVersion`, `name`, `countryCode`, `country`, `city`, `language`, `accent`, `mission`, and `status`. Unknown fields are rejected. New chapter status must be `draft`. `countryCode` is an uppercase two-letter code; the starter validates its form but does not maintain a current ISO country-code directory. Organizers must choose their real country's code.

`language` is `nl` or `en`. Country support and language support are separate: every country can generate a starter, while this release contains two interface/content languages. Accent uses `#RRGGBB`. Name, country, city and mission must be plain text within the documented schema lengths; control characters and HTML brackets are rejected. Display code must still use text rendering rather than interpolate arbitrary data as HTML.

## Registry

The document is `{schemaVersion, updatedAt, chapters}`. `updatedAt` is an actual calendar date in `YYYY-MM-DD` format. Each chapter has:

| Field | Meaning |
| --- | --- |
| `id` | Stable lowercase slug, unique within the registry |
| `countryCode` | Uppercase two-letter country code |
| `country` | Complete `{nl, en}` names |
| `name`, `city` | Public display text |
| `status` | `source`, `template` or `draft` |
| `languages` | Nonempty, unique selection of `nl`, `en` |
| `summary` | Complete `{nl, en}` descriptive text |
| `website` | HTTP(S) URL without credentials, or `null` |
| `source` | `{url, accessedAt, rights}` or `null` |
| `coordinates` | `[longitude, latitude]`, or `null` |

Coordinates are approximate city centres, not building locations. Longitude is within -180 to 180; latitude within -90 to 90. Source records require a website, source URL and coordinates. Template records have no website or source URL and explicitly identify demonstration rights. A local draft has no source or website assertion and may have null coordinates. Status is provenance, never an implicit membership or quality badge.

The published example has one Netherlands source record and three fictional country templates. A generated country starter replaces them with one local draft. In that one-record case, its name, city and country code must match the config. Copying a template does not create a partner relationship.

## Resources

The document is `{schemaVersion, updatedAt, resources}`. Every resource has a unique `id`, complete bilingual `title` and `summary`, a `category`, `format`, `durationMinutes`, `level`, `license`, `sections`, and `checklist`.

Categories are `community`, `education`, `operations`, `business`, `governance`, and `localization`. Format is `playbook`. Levels are `beginner`, `intermediate`, or `advanced`. Duration is an integer from 5 through 480 minutes. License is `CC-BY-4.0`.

Each section is `{title: {nl, en}, paragraphs: {nl: [text], en: [text]}}`. Checklists are `{nl: [text], en: [text]}`. Both languages must be present and nonempty. Markdown exports retain attribution and license instructions. No actual wallet credentials, participant lists or payment records belong in this dataset.

## Public origin reference

`dbe-public.json` is `{schemaVersion, updatedAt, datasetType, source, organization, circles, events}`. Its type is `origin-reference`, distinguishing public origin facts from each country's local registry and current activities. Source metadata is `{url, accessedAt, rights}`. Organization contains `{name, city, website, summary: {nl, en}}`. Circles contain `{id, name, summary: {nl, en}}`. Events contain `{id, date, venue, city, status: "past"}`.

Circle and event IDs must be unique within their respective lists. The organization's website must match the official source URL. Historical event dates must precede the source access date, and the rights statement explicitly identifies externally sourced public facts. The dataset has no fields for prices, named individuals, participants or private records. Its source's content and branding are not assigned an open license by this project. Country forks preserve this separate reference file while replacing the local registry.

## Manifest and cross-record checks

The manifest specifies endpoint paths, schema paths, licenses, capabilities, counts and dataset SHA-256 hashes. Code is MIT, original resources are CC-BY-4.0, and original demo data is CC0-1.0. External-fact rights are stated separately. `stats` must match actual chapter/resource counts and statuses. Endpoint/schema paths must match the documented names. URLs cannot embed login credentials.

`npm run build` validates data, recalculates counts and hashes, then regenerates the source template/archive and public doc/schema copies. `npm run validate` checks both shape and relations and detects stale hashes after manual data edits. A hash is an integrity check, not a signed authenticity guarantee. The manifest does not hash itself or the ZIP to avoid circular generation.

## Extending the contract

Add fields deliberately in the schemas, update the checker and consumers, add relevant fixture tests, and bump the schema version when compatibility changes. New statuses or languages require explicit UI behavior and data review. Do not overload `source` to imply partnership. Keep private operational data in a separate system and publish only reviewed exports with clear rights.
