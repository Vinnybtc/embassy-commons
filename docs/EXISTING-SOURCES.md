# Integration with the existing DBE platform

Investigated on 11 October 2026 through the authorized GitHub connection. This was a limited, read-only review of repository structure, package files and the community app's README. No existing backend code or operational data has been included in Embassy Commons. At the client's request, the interface now uses the current DBE brand style and its font and brand assets; see [BRAND.md](BRAND.md). Functionality described in a README is no confirmation of production readiness.

## Existing website

[`Vinnybtc/dbe-site`](https://github.com/Vinnybtc/dbe-site) uses Astro, TypeScript and Node 24. Its package file includes Supabase and Vercel libraries and build and test flows for administration, content, media and publication. Its source structure includes `src/content`, `src/data`, `src/i18n`, components, pages and API files.

Sources: [package.json](https://github.com/Vinnybtc/dbe-site/blob/main/package.json), [src](https://github.com/Vinnybtc/dbe-site/tree/main/src), [src/data](https://github.com/Vinnybtc/dbe-site/tree/main/src/data), [api](https://github.com/Vinnybtc/dbe-site/tree/main/api).

Integration could add an export step to the existing publication flow: convert selected educational content to the Commons data model, then check rights, schema and publication status. The existing API files were not reviewed in detail, so no ready-made Commons API or import compatibility has been demonstrated.

## Existing community app

[`Vinnybtc/dbe-app`](https://github.com/Vinnybtc/dbe-app) is a PWA using vanilla HTML, JavaScript and CSS. Its README describes Supabase as the backend and Cloudflare Pages as hosting, with LNURL-auth and a magic-link fallback. The README mentions a working demo and authentication that is not yet live. This is a README status, not an independent live verification.

Concepts relevant to the international model include events, a knowledge base, educational learning paths, local groups and a community marketplace. Commons supplies a portable public data model and local website; a production community with user authentication, chat and RSVP storage is a separate integration phase.

Sources: [README.md](https://github.com/Vinnybtc/dbe-app/blob/main/README.md), [package.json](https://github.com/Vinnybtc/dbe-app/blob/main/package.json), [source files](https://github.com/Vinnybtc/dbe-app).

## Publication boundary

Potentially reusable candidates include general education, event templates, public event information, translations and workflows. Each candidate needs established copyright, provenance, chosen licence and publication status.

Member data, private chat, registrations, personal data and operational configuration do not automatically form part of the public dataset. Country teams manage such data in their own environments. Both repositories were private when investigated; their visibility and content were not changed. No separate LICENSE file appeared in the reviewed root listings. A definitive open-source release of existing DBE code therefore first requires an explicit licence and content review.

## Concrete next step

1. Select a small public DBE collection and record provenance and rights for each record.
2. Build an adapter that exports the collection to the Commons schema.
3. Have existing CI validate the export; publish only records that pass the publication rules.
4. Test the export in an independent country fork with its own domain, branding and local data.

The Commons starter was independently written and contains demonstration data. This review provides a technical integration plan, not a migration of the existing DBE platform.
