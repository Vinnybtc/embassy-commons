# Embassy Commons proposal for Dutch Bitcoin Embassy

Embassy Commons makes Dutch Bitcoin Embassy's methods, knowledge and software reusable for local Bitcoin communities. A team in any country can start its own repository, website and programme, translate the material and manage it independently. Dutch Bitcoin Embassy becomes the first publisher of the shared foundation without becoming a central owner of organisations abroad.

The proposal is to begin with a small starter release that teams can host themselves and a 90-day pilot. That release contains a public knowledge base, example data, a country starter and agreements for contributions and publication. The current delivery is a built starter and demonstration with original example material, eight new original NL/EN playbooks and one Dutch public source record. The interface follows the current DBE design system exactly, with the same fonts, colours, component dimensions and ring shapes; see [BRAND.md](BRAND.md). The interface is entirely in English, and generated starters default to English. Existing Dutch and English resource and source-data translations remain available for compatibility and reuse. A separate reusable DBE source reference contains the three circles and two historical meetups from the public website, with provenance and rights information. The playbooks are draft material for substantive review, rather than a migration of existing official educational content. Dutch Bitcoin Embassy's existing internal data is not yet part of this publication. An inventory, rights check and substantive review precede the first real Dutch data release.

## The product and its users

A local organiser must be able to start without seeking permission to use the licensed software and knowledge. The team chooses its own name, language, domain, legal structure and methods. It may use a derivative version without joining a network or contributing improvements back. The original material retains the notices required by the applicable licence.

The knowledge base serves three user groups. Organisers receive practical playbooks for a first meetup, volunteers, education and maintaining public information. Visitors receive understandable educational material and a visible route to local activities. Contributors receive simple files, traceable sources and a review process for proposing a translation or improvement.

The name Bitcoin Embassy describes an independent community initiative here. The website and local derivatives must explain that visibly. The product grants no diplomatic status, government mandate or official representation. Local parties must not suggest affiliation, certification or support from Dutch Bitcoin Embassy that has not been separately agreed.

## What the first release delivers

| Component | Starter release | Expansion after the pilot |
| --- | --- | --- |
| Public website | Six English views: overview, country register, library, country starter, open data and proposal | Additional local translations, an accessibility audit and more extensive local content |
| Country starter | Three-step generator for a complete standalone ZIP that teams can host themselves; CLI for configuration and output directory | Import of existing local repositories and guided migration |
| Knowledge | Eight original NL/EN draft playbooks with reading and Markdown downloads | Reviewed real Dutch Bitcoin Embassy knowledge and new local contributions |
| Open data | Manifest, JSON, schemas, version and downloads; original templates and one separate Dutch source record | Approved real datasets, corrections and versions |
| Publication checks | Validation of release files and explicit agreements on rights and sensitive information | Automated publication checks with a traceable review history |
| Collaboration | Documented pull request workflow and optional contributions back | A voluntary public directory and federation protocol |
| Management | Files and Git as the source; no central account requirement | An optional editorial environment for teams that need one |

A download or example country is not an existing local partner. Country examples illustrate how a derivative version works. The site does not treat them as recognised embassies, pilot participants or affiliated organisations.

The country register contains the Netherlands as a public source record and Germany, Kenya and Brazil as demonstration templates. The foundation works with Node.js 22 or higher and has no external runtime dependencies. The public interface is a static website. The standalone country ZIP and full source release make the system transferable without a central service. The preview is private and intended for review. The new, independently written source code is public at [Vinnybtc/embassy-commons](https://github.com/Vinnybtc/embassy-commons).

The starter release does not collect money, manage wallets, store private keys, process membership registrations or handle event payments. A local organisation may add its own services later and then becomes responsible for the associated operational and local requirements. A static website is sufficient for the foundation; no database, central sign-in or commercial API is needed.

## The everyday user journey

1. A local team explores the knowledge and chooses its own country, language and project name.
2. It downloads the starter package and makes its own copy or fork of the repository.
3. It sets the local configuration, replaces examples and makes its independent identity visible on the website.
4. It checks the rights, provenance, quality and suitability for publication of every local record.
5. It validates the files, publishes the website and organises a first activity using the playbook.
6. It may offer a translation, error correction or improved playbook to the shared foundation as a pull request. Participation is voluntary.

Full access means access to all publicly released source code, source files and knowledge, with the right to use and modify them within their licences. It does not mean access to existing private accounts, passwords, internal correspondence, membership lists or other people's data.

## Architecture for independent countries

The shared foundation, also called upstream, contains the software, shared knowledge, data schemas, governance and releases. Each local derivative, also called downstream, contains its own configuration, local content and selected foundation version. A local team can contribute changes back without sharing its entire repository or internal administration.

Files remain the source. Public data is stored as readable JSON; knowledge and methods as Markdown. A website uses these files to present them. Exports must remain usable without the original website. Git history shows who changed what. Release files bundle the exact versions of code, schema, content and licences.

The MVP uses local files and downloads. There is no automatic synchronisation between countries yet, no live register of verified organisations and no central management of local websites. The federation model below describes how this can grow later without making countries dependent on the Dutch website.

The new public source repository is `Vinnybtc/embassy-commons`, with starter version 0.1.0. Vincent may later transfer it to a Dutch Bitcoin Embassy organisation of his choice. No new GitHub organisation has been created. The starter is independently written; private access to existing DBE repositories is not a decision to make those repositories public.

A later voluntary federation allows a local organisation to register a public manifest URL. Such a manifest contains only the project identity, country code, website, version, licences and references to its own publishable datasets. The directory retrieves only that explicitly released information. Changes first appear as proposals to review. No country automatically receives write access to another country's data. Leaving removes the directory listing; the local repository and website remain usable.

## Compatibility and updates

The software, dataset schema and content receive separate versions. A patch fixes errors; a minor version adds compatible features; a major version may require migration. Each major version includes a readable migration path, an example and a check that rejects incompatible files.

A local organisation pins its chosen upstream version and keeps local content separate from shared files. Updates go through a local branch and review, never a mandatory central push. The maintainer compares the change, validates the local configuration and publishes only afterwards. One starter line is supported during the pilot. Capacity for maintaining older versions is decided before multiple lines are offered.

Translations state their source language and the version or hash of the translated original. When that original changes, the translation receives a 'needs review' status. An outdated translation does not disappear silently; readers can see which version they are reading.

## Licences and local branding

| Material | Choice | Practical use |
| --- | --- | --- |
| Original software | MIT | Use, adapt and distribute while retaining the required licence and copyright notices |
| Original knowledge and playbooks | CC BY 4.0 | Reuse and translate with attribution, a licence link and an indication of changes |
| Original reviewed open datasets | CC0 1.0 | Only for explicitly released records whose necessary rights have been checked by the publisher |
| Third-party material | Original licence | Bundle only when its terms allow reuse and attribution is included |
| Name, logo and recognition labels | Separate brand policy | The software licence does not grant permission to claim affiliation or recognition |

MIT permits broad software reuse and requires retention of the licence and copyright text. It does not require derivative software to use the same licence. If Vincent wants all published code changes to remain open as well, a different licence choice should be considered before the first public release. [MIT licence](https://opensource.org/license/mit).

CC BY 4.0 supports reuse and adaptation of original knowledge with attribution, a licence link and an indication of changes. CC0 applies only to deliberately released data; it grants no trademark rights and does not remove any privacy rights. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

All generated example records are marked as examples. Data on someone else's public website does not automatically become our data. The team checks each source to establish whether information may be copied and under which licence. Where rights are unclear, the catalogue can link to the source without republishing the material.

## Quality and trust

Content labels with clear meanings are proposed for the pilot: 'example', 'submitted', 'content reviewed' and 'needs review'. Where relevant, a label states the review date, scope and reviewer role. 'Content reviewed' means a specific substantive check took place. It is not a permit, organisation certificate, safety promise or government status. The initial interface distinguishes the source record from demonstration templates; the full review process develops during the pilot.

Organisation listings separately use 'self-registered' or, when an actual process and decision exist, 'network confirmed'. No organisations are network confirmed in the starter. Country examples remain examples. A local team using the shared code is not automatically included in the directory.

## Connecting to the existing Dutch platform

A read-only exploration of the existing website and community app supports a phased connection. The website may later receive an export adapter for selected knowledge and public records. The community app can use the transferable knowledge and local configuration while users, chat and registrations remain in its own operational environment.

No existing application code has been copied, no private operational data has been included and no existing live feature has been proven as a Commons integration. The adapter is a later phase: select material, check rights, export to the Commons schema and test the output in an independent country fork. The concrete source exploration and its limitations are in [EXISTING-SOURCES.md](EXISTING-SOURCES.md).

## Organisation and responsibilities

Vincent decides on the Dutch publication, the initial rights holder and brand owner, pilot capacity and which original source files may be released. A release maintainer checks tests, bundles, versions and licences. A content maintainer reviews educational material, sources and translations. A data maintainer monitors provenance, suitability for publication and corrections. Local teams are responsible for their own organisations and local publications.

In the first pilot, one person may perform several roles, but a publication containing new data receives a second substantive review. Public discussion takes place in issues and pull requests. Vulnerabilities and sensitive information go through the private reporting process. The Dutch maintainer cannot take back a local copy, but can correct inaccurate information in the shared foundation or remove a directory listing.

The governance gains a network council only when independent participants actually exist. The pilot invites potential teams without assuming participation. More countries on a screen are not evidence of adoption.

## A 90-day pilot

The pilot starts when Vincent establishes the publication package and assigns the roles. Days are calendar days from that start; no participants or start date have been confirmed yet.

| Period | Work | Result to review |
| --- | --- | --- |
| Days 1 to 14 | Inventory Dutch sources; decide rights, name and roles; check the starter and publication process | Rights matrix, release candidate, local data selection and clearly accountable maintainers |
| Days 15 to 30 | Find two independent pilot teams; have them use the starter and complete their first local playbook | Two working local trial copies if two teams participate; obstacles and support needs |
| Days 31 to 60 | Have each participating team translate or adapt material and prepare one real activity | Local content, at least one reviewed upstream contribution per active team and documented improvements |
| Days 61 to 90 | Test an update, recovery and publication; evaluate use and maintenance | Release decision, revised guides and a decision on a voluntary directory |

Pilot goals can be measured in advance: a team can start its own website from a clean download without Dutch accounts; a relevant contribution can be returned upstream; an upstream update does not damage local content; an error can be corrected with a new release. The content goals are a useful local introductory programme and a clear explanation of independent status.

Measurements are simple project records: time from first download to local publication, identified obstacles, accepted contributions, successful update tests and active maintainers per team. No individual visitor tracking is needed. After 90 days, a decision is made to continue, reduce the scope or pause support. Previously released material remains usable under its licence.

## Costs and sustainability

The foundation avoids fixed software subscriptions. The main commitment is time for content, translation, review and maintenance. Local teams choose their own hosting and domain. Paid support is optional; access to the licensed foundation remains free.

For the pilot, Vincent prepares a capacity plan with hours for release management, content, data checks, guidance and evaluation. Without that plan, there is no reliable budget. Domains, hosting, storage, meetups and any independent reviews are listed separately using current quotes. This proposal contains no fixed vendor prices or promised income.

Sponsorship, voluntary donations or paid workshops may later help fund maintenance. A sponsor does not gain control over educational content, recognition or data. The shared organisation's income and expenses can be published as its own summaries while individual donor details remain private. The MVP contains no payment processing.

## Key decisions for Vincent

1. Confirm Embassy Commons as the working name and its intended relationship with Dutch Bitcoin Embassy. Establish brand use and visible independent status.
2. Determine which party publishes the first material, which owners and contributions cover the rights and whether MIT provides the desired freedom.
3. Choose the first Dutch knowledge and datasets to actually release. Keep internal personal data and secrets outside the package.
4. Assign release, content and data roles and reserve pilot capacity.
5. After that preparation, choose at most two initial pilot teams; record their participation separately.
6. After the pilot, decide on a directory, support for local translations and additional management features.

A concrete first public starter release consists of the validated starter package, proposal, governance, applicable licences, explicitly licensed original templates and knowledge, the separate source record and a working independent example website. The current package makes this software and approach reviewable. The first real Dutch data release can follow separately and must meet the publication criteria in [the data policy](DATA-POLICY.md).

## Related documents

- [Governance](GOVERNANCE.md) defines roles, decisions, federation and quality labels.
- [Data policy](DATA-POLICY.md) describes which records may be made public and how errors are corrected.
- [Launch playbook](LAUNCH-PLAYBOOK.md) takes a local team from download to its first activity.
- [Contributing](../CONTRIBUTING.md), [code of conduct](../CODE_OF_CONDUCT.md) and [security reports](../SECURITY.md) support everyday maintenance.

## Introduction before the next pilot

The next pilot starts with a short introduction and a conversation. The Commons interface includes an English Open source explanation and a form that prepares an email to the official DBE contact for the applicant to review and send. This is optional volunteer assistance, not permission to use the open-source toolkit. It does not claim a message has been received, issue membership or unlock files automatically. The owner preview and its direct file routes are protected by the hosting access policy; changing buttons is not an access boundary.

On the main DBE website, the introduction belongs immediately after the three circles on the Community page, with a short homepage teaser and an Embassy Commons footer link. The final English landing page is proposed at `/commons/`; that main website has not been modified. Ready copy and the access boundaries are in [OPEN-SOURCE-INTRODUCTION.md](OPEN-SOURCE-INTRODUCTION.md). Existing open licence rights remain in effect.

## Voluntary help and full local autonomy

The purpose is to help people and Bitcoin. Each team owns and runs its website, source repository, hosting, records, programme and decisions. No DBE account, subscription, central service, ongoing permission, exclusivity or compulsory contribution is required. The publisher may review its own shared releases and optional collaboration, but does not control local forks.

Public integration uses the separate minimal introduction build, not the full review application. That protects unpublished review material without implying that the publicly licensed code can no longer be reused. The existing website has not yet been modified.
