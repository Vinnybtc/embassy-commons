# Embassy Commons security policy

The starter uses public files, a static interface and a local generator. It manages no wallets, member administration or payments. Security focuses on safe publication, input, downloads, source code and preventing disclosure of sensitive data.

## Private reporting route

Do not put a vulnerability, token, seed phrase or unwanted published personal data in a public issue. A private report should include the affected version, description, minimal reproducible example and expected impact. Use artificial data where possible and share no secret merely to prove it exists.

Before a public community launch, the first publisher must publish a working private contact channel and an independent backup contact. This starter has not assigned that channel yet. During private review of this package, Vincent is the contact for organizing its handling. Once a public repository exists, configured private vulnerability reporting can provide an additional route. Do not assume that feature currently exists.

The project has not established a staffed response time, bug bounty or support for older release lines. The pilot team determines these from available capacity. Research is limited to environments you own or are explicitly authorized to assess; do not disrupt others' websites.

## What to report

- Execution of untrusted data or text in the interface.
- Unsafe filenames, paths or content in generated downloads.
- Disclosure of keys, tokens, passwords or personal data.
- Accidental inclusion of private files or sources without appropriate rights.
- Release files that differ from the reviewed source version.

A normal content error without sensitive information belongs in an issue. An error directly harming people or data may use the private channel.

## Incident handling

1. Acknowledge the report through the private channel and identify affected versions and files.
2. Stop affected publication or downloads where needed and limit further distribution.
3. Revoke or replace leaked credentials with their owner. Removing them from Git does not make them safe again.
4. Correct source and exports, assess whether release files or Git history need cleanup, and validate the repair.
5. Publish a new release and appropriate description identifying affected versions and required actions without sensitive information.
6. Inform known downstream maintainers through authorized project channels and improve the publication process.

Previously downloaded copies may remain. The project guarantees no removal of external copies. A local fork checks its own history and hosting and decides its own recovery action.

## Practical publication requirements

Treat loaded records as untrusted input. Render text as text, validate URL schemes and use only reviewed local paths for generated files. Do not construct shell commands from input. The static foundation needs no credentials; do not add them to configuration files.

Run the validator and relevant tests before a release, inspect the complete download and restrict hosting access to necessary maintainers. Keep private administration and public source files in separate environments. New external dependencies need a reason, licence check and assessment of added maintenance.

Automated checks support these requirements; they do not prove every content, privacy or licensing issue has been resolved. The publication gate in the [data policy](docs/DATA-POLICY.md) remains necessary.
