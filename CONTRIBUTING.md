# Contributing to Embassy Commons

You can contribute software, a translation, a lesson, a playbook, a correction or reviewed open data. Every country may use the foundation independently. Contributions to the shared repository are voluntary and reviewed before inclusion in a release.

Read the [README](README.md), [governance](docs/GOVERNANCE.md), [data policy](docs/DATA-POLICY.md) and [code of conduct](CODE_OF_CONDUCT.md) first. Use [SECURITY.md](SECURITY.md) for secrets, vulnerabilities and unwanted personal data; do not put them in a public issue.

## A good first contribution

Start with a bounded change: an incorrect link, missing explanation, translation of one article or bug in the starter generator. Propose a new feature, larger schema or policy change first. Describe the concrete user problem and consequences for existing local projects.

The public upstream is https://github.com/Vinnybtc/embassy-commons. The usual route is through issues, forks and pull requests. The private preview supports product review; sensitive reports follow SECURITY.md.

## Workflow

1. Make your own copy or fork and use the local start and validation commands in the README.
2. Create a branch for one coherent change.
3. Edit the relevant source file. Change generated exports through their source so a new build preserves the change.
4. Add provenance, licence and status where the content requires them. Keep local data separate from the shared foundation.
5. Run the validator and relevant tests. Check the website in a browser for interface changes and inspect generated downloads for export changes.
6. Submit the change with its problem, result, checks, rights and any migration.

The starter targets Node.js 22 or later and needs no external runtime dependencies. The README is the source for current filenames and commands.

## What a pull request describes

- The user problem and concrete result.
- Whether the change concerns code, knowledge, template data or third-party material.
- The applicable source and licence, and why you may contribute the material.
- The checks performed and what remains unchecked.
- Effects on existing configurations, translations and downstream projects.

A reviewer assesses correctness, usefulness, accessibility, compatibility and suitability for publication. New real data and larger content changes require a second review. A review may request a smaller scope or source evidence. The final decision and reason remain visible with the change.

## Licences and rights

By offering a contribution for inclusion, you confirm that you may provide it under the licence applicable to that material. You retain your own copyright where applicable. This starter includes no separate copyright assignment or contributor licence agreement.

Original code uses MIT. Original knowledge uses CC BY 4.0; include your name or chosen public attribution and the source when adapting existing material. Original template data may use CC0 1.0 after rights and publication checks. Third-party material keeps its original licence; avoid copying it when reuse rights are unclear.

Do not add a logo, photograph, collection or text under a new licence merely because the original is public somewhere. The Dutch Bitcoin Embassy brand and any future recognition labels require separate arrangements. A code contribution grants no right to claim official affiliation.

## Knowledge and translations

Write for someone starting a local community. Explain the action and its purpose; avoid investment promises and broad claims unsupported by the content. Time-sensitive financial, legal or security information requires a clear scope, current primary source and review. An operational playbook may explain what the local team must assess without assuming the same outcome for every country.

A translation identifies its source language, original file and source version or hash. Do not change the meaning to make a local organization sound more official. Local content adaptations are allowed, but mark them as adaptations and explain relevant differences. Review the translation again when the original changes.

## Data and safety

Follow the publication gate in the data policy. Use only original, reviewed templates or genuinely released records. Example countries and fictional records must remain identifiable as examples. The validator cannot determine a record's truth or every privacy risk in free text.

Never contribute seed phrases, keys, tokens, passwords, private contact details, member lists or internal messages. Tests use artificial fixtures. Do not link private evidence files in a public pull request; provide necessary evidence through the agreed private review route.

## Compatibility and local differences

Do not change a required field or its meaning without a migration proposal. Version software, schemas and content separately. A major version includes migration instructions and an example. Country differences that concern only one local team stay in its own configuration or content; a general capability can be offered as a reusable improvement.

For a local update, pin the chosen upstream release, create an update branch, compare shared files, validate local configuration and test the local website. Publish after local review. Upstream cannot force automatic updates on a local website.
