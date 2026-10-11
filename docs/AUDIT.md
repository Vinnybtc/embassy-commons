# Embassy Commons release audit

Reviewed on 11 October 2026. Scope: the reusable starter, English interface, original playbooks, selected public reference records, source packaging, introduction form, independent country generation and the separate public introduction build.

## Result

No known blocking defect remains in the checked scope. The starter builds and validates successfully. All 22 automated tests pass in the publisher project and in an actual independently generated Lisbon community project. The generated project needs Node.js, its own files and hosting; it does not require a DBE account, API, database or service.

This is a release assessment, not a guarantee that every future modification, hosting configuration or workshop implementation will be correct.

## Verified behaviour

| Area | Evidence and result |
| --- | --- |
| Independent operation | Generated a Portugal/Lisbon project through the CLI, built it, validated its data and ran its 22 tests. The browser displays its local identity and mission. No hosted project identity or publisher introduction bundle is included. |
| Local navigation | Local forks do not display the DBE introduction links. Legacy introduction routes resolve to their own starter or data page. Their header does not inherit DBE branding, even when a local project chooses the publisher's name. |
| English interface | All eight publisher views render in English. The source retains reusable Dutch translations of the original playbooks. |
| Browser flows | Checked the overview, registry, library, generator, open data, proposal, open-source page and introduction. Checked the independently generated library and starter. No unexpected console errors were observed in the normal preview flow. |
| Accessibility and recovery | Skip to content focuses the main region while preserving the current view. An isolated missing-data failure was restored and the Try again button successfully reloaded the toolkit under the supplied CSP. |
| Introduction | The form validates inputs and prepares a draft addressed to the public DBE contact address. Editing an input invalidates the prepared draft. No test email was sent. There is no application backend or automatic acceptance, storage or access grant. |
| Responsive introduction | Inspected the introduction at normal browser widths and in an isolated 390-pixel embedded viewport. The open-source page and form had no horizontal document overflow. Physical phones and every browser engine were not tested. |
| Public introduction boundary | The separate build contains 11 explicitly selected interface and brand files. It makes no toolkit data requests. HTTP checks return 404 for toolkit JSON, the source template, source ZIP and schema paths. |
| Preview access | Sites reports an owner-only audience. Anonymous requests to the preview root and direct data/archive paths return 403. This hosting boundary is separate from the intentionally public GitHub repository. |
| Data and archive integrity | Schemas, relations, multilingual content, counts, ZIP paths, CRCs and reproducibility pass the automated checks. Private identity and generated build copies are excluded from canonical source packaging. |
| Static server | Tests cover GET/HEAD, prohibited methods, hidden identity paths, traversal and symlink escapes. The server binds to loopback for local use. Production hosts must apply their own deployment controls. |
| Documentation | All 41 existing local Markdown links were checked and resolve. The new audit document uses no additional local links. Licence files and attribution distinguish code, original content, templates, fonts and DBE brand material. |

## Corrected defects

- Replaced the CSP-blocked inline retry handler with the delegated click handler.
- Preserved the current view when using the skip link.
- Fixed generated registry IDs when truncation ends on a separator.
- Matched configuration character limits to JSON Schema Unicode code-point limits.
- Prevented a local draft from acquiring publisher presentation by choosing the same name.
- Removed DBE introduction navigation and private-preview claims from independent local views.
- Made introduction, contributions and collaboration explicitly optional throughout the interface and governance documentation.
- Corrected the public reference labels to Business Club and the historical Flora Filmtheater venue; existing record IDs remain stable.
- Corrected the licence document reference.
- Created the allowlisted public introduction build so publishing that introduction does not also publish toolkit data and archives.

## Content and rights

All eight original English playbooks were reviewed. No concrete unsafe or incorrect Bitcoin instruction was identified. Wallet/key guidance and the use of test coins follow the principles in the primary Bitcoin documentation:

- [Wallet guidance](https://developer.bitcoin.org/devguide/wallets.html)
- [Bitcoin risks and transaction basics](https://bitcoin.org/en/you-need-to-know)
- [Testing without production funds](https://developer.bitcoin.org/examples/testing.html)

The workshop does not select or implement a particular wallet, device or test network. Each local team must rehearse its chosen setup. Local legal and tax questions remain local decisions.

The circles and selected historical events were checked against the public [DBE community](https://www.dutchbitcoinembassy.com/community/) and [events](https://www.dutchbitcoinembassy.com/events/) pages on the review date. The dataset is a curated historical reference, not a current events feed. The library contains newly written starter material; existing private DBE lessons, member records and databases have not been exported.

Code uses MIT, original playbooks use CC BY 4.0 and original generic demo data uses CC0. Fonts retain their open licences. Names, logos, photography and third-party material retain separate rights. A local team can choose its own identity without depending on DBE.

## Publication and integration

The source repository remains public for independent reuse. An introduction is optional volunteer guidance, not a licence condition. The review website remains owner-private. Public source can be copied or indexed; preview access controls do not revoke those existing reuse rights.

The existing DBE website has not been changed. A separate English introduction is ready to mount at `/commons/`. Recommended placement: a Community section after the three circles, a small homepage teaser and a footer link. Publish only `dist/public-introduction/` for that entry. Integration into the existing site still requires checking its actual routing, asset paths, navigation and deployment configuration.
