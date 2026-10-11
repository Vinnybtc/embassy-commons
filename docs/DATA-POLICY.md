# Embassy Commons data policy

Embassy Commons publishes only data deliberately selected for reuse. Open source code does not automatically make Dutch Bitcoin Embassy's existing private data public. Using a public website as a source does not automatically establish the right to republish or relicense its content either.

This policy applies to the shared repository, release bundles and a future directory maintained by the original publisher. Independent local teams can use these checks as guidance and choose their own publication process. Each local organisation assesses its own responsibilities and any additional requirements.

## Separate three types of material

| Type | Examples | Publication |
| --- | --- | --- |
| Open knowledge | Original lessons, playbooks, explanations and translations | Only with traceable rights and the applicable knowledge licence |
| Open data | Original generic templates, explicitly released organisation details, publishable programme descriptions | Only after checking each record and its data licence |
| Private administration | Members, participants, donors, personnel matters, contracts and internal messages | Outside public repositories, exports, issues and release bundles |

Keys, seed phrases, recovery codes, login credentials, API tokens, private contact details and personal financial information must never appear in the open publication. Wallet addresses may identify people and are not a standard field in the base dataset. A future local donation system requires a separate design and a reviewed publication procedure.

## Licences at record level

Original generic template data may be released under CC0 1.0 when the publisher holds the necessary rights. Original knowledge uses CC BY 4.0. Third-party material retains its original licence. The data export must keep those differences visible. A general repository licence does not override a third party's rights.

A record with public source references to Dutch Bitcoin Embassy is an attribution or description. It does not release the linked website content under CC0. Copying logos, photographs, full texts, presentations or compiled datasets requires a separate rights review. Where rights are unclear, the catalogue publishes only a carefully selected reference or excludes the material.

CC0 does not grant permission to use trademarks or remove privacy rights. CC BY requires, among other things, attribution, a licence link and an indication of changes. [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Publication gate for every real record

An author checks the criteria below; a second person reviews the release of new real data. A missing or negative answer keeps the record out of the public bundle.

1. The record has a useful public purpose and contains only the fields that purpose needs.
2. The author, source, intended licence and reason the record may be published are traceable.
3. Rights to text, images and any attachments have been checked. The record does not imply rights the publisher does not hold.
4. It contains no private contact details, account information, secrets, membership lists or hidden personal data in free text, metadata or files.
5. Information is verifiable and sufficiently current; time-sensitive content has a date and a review point.
6. An example is explicitly marked as an example. A submitted record does not imply a review that did not take place.
7. Images, URLs, downloads and free text are treated as untrusted input and technically checked.
8. The record meets the schema and can be exported and read back with the corresponding version.
9. A responsible maintainer and correction route are known.

The technical validator checks structural requirements and known prohibited patterns. It cannot establish that rights, source accuracy, consent or all personal data in free text are correct. Successful validation does not replace the substantive publication gate.

## Provenance and currency

A dataset describes its version, date, licences and sources. Records containing checked facts need a provenance record with at least a source URL or internal source evidence, review date, review status and responsible role. Private evidence is stored separately; it does not belong in public JSON.

The starter uses schemas to protect the structure. A future schema may add more detailed metadata per record. The publication gate applies from the first real data release, even if part of the assessment is initially kept in a review register.

For local organisations that register themselves, it must be visible who supplied the information and what scope was actually reviewed. There is no automatic enrichment with personal social profiles or contact details. A reusable organisational role email is included only when the local team deliberately wants to make it public and that publication has been reviewed.

## Exports and a future federation

The release export contains only publishable files. Internal review evidence, access keys and private administration are held in a separate environment and are not included. Downloads state the version and licences. A downstream team adding data repeats the publication checks and becomes the publisher of its own additions.

A future federation retrieves only manifests and datasets that the local team explicitly offers. Submitted content is treated as untrusted input and reviewed before publication. Opting into the directory does not grant permission to retrieve all that team's pages, private data or social profiles.

## Corrections, removal and incidents

Ordinary factual errors receive an issue without sensitive attachments. The maintainer corrects the source file and publishes a new version; the release description identifies the changes. Time-sensitive inaccuracies immediately receive a 'needs review' label or are removed from the current publication.

A report involving personal data, secrets or harmful unwanted publication uses the private channel in [SECURITY.md](../SECURITY.md). The team stops further distribution, removes the record from the current export and determines whether Git history or release files also need to be cleaned. Leaked credentials are revoked or replaced; removing them from the repository alone is insufficient.

Copies already made public may remain available. For a relevant correction, the maintainer identifies the affected versions and asks known downstream teams to update their copies. There is no guarantee that all external copies can be removed.

## Preparing the Dutch data release

The data maintainer inventories original texts, lessons, processes, images, organisation details and any public activities. Each source receives an owner, licence, publication purpose and outcome: release, limited release, link only or keep private.

The first release selects a small reviewed set. Further versions follow. Internal repository access or an earlier public website is sufficient to investigate material, but is not independent evidence that all content may be distributed under a new open licence.

## Responsible roles

The author is responsible for the source and requested change. The data maintainer manages the rights and publication checks. The release maintainer ensures the reviewed version is the only version in the new bundle. The local maintainer is responsible for local additions. Before public use, the initial publisher establishes a reachable private reporting channel.

## Local ownership

This policy governs the shared publisher release. Independent forks decide their own publication processes and are responsible for their own data. No DBE system collects or synchronises their records by default. They choose whether to share any public improvements upstream. Private member data is excluded from the supplied open-source toolkit.
