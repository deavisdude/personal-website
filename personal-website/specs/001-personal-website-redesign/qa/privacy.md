# Privacy and Content-Safety Evidence

**Feature:** Davis Odom Personal Website Redesign
**Task:** T013 foundational evidence record; final privacy execution is T039
**Recorded:** 2026-08-01
**Overall status:** `BLOCKED`

## Evidence boundary

The planning documents define the public-safe boundary, but this record is not
a source or production-build audit. The redesign content records, final
rendered copy, production output, and final analytics/privacy settings have not
been audited here. No zero-findings or production-safety claim is made.

## Current result

| Area | Status | Evidence or blocker |
| --- | --- | --- |
| Privacy boundary in planning documents | `PASS` at planning level | The approved exclusions cover phone, personal email, exact location, sensitive family details, and confidential employer information. |
| Approved final content | `BLOCKED` | BBQ App wording and sole-creator role, plus the supplied archive roles, are recorded as approved; collaborator/organizer attribution and final rendered-copy review remain open. |
| Source-content search | `BLOCKED` | The redesign content source is not yet the subject of the required final audit. |
| Production-build search | `BLOCKED` | The release artifact and deployed target are not available in this record. |
| Private-source/URL review | `BLOCKED` | WIP and project records/links have not completed the rendered and source review. |
| Placeholder/unsupported-claim review | `BLOCKED` | Story implementation and approved-vs-published copy comparison are pending. |
| Analytics/privacy configuration | `BLOCKED` | `@vercel/analytics` is selected, but event scope, retention, and final privacy settings remain open. |

No `FAIL` is recorded: no final source/build privacy audit was run. `BLOCKED`
does not mean that the eventual audit will pass.

## Exact prerequisites before execution

- T008 and later content tasks provide the final source records and rendered
  copy to compare with `content-approval.md` and `contracts/content-entry.md`.
- The final role, WIP wording/media, BBQ App wording, archive roles, and
  collaborator/organizer attribution are approved or explicitly deferred.
- A production-like build exists at the path emitted by the approved Vite
  workflow (expected `dist/`) and the exact deployment/preview URL is recorded.
- The final analytics integration and privacy configuration are documented;
  no unapproved data service or secret-bearing value may be introduced.
- The reviewer can inspect source, generated output, rendered text, link
  destinations, and deployment configuration without logging OAuth payloads,
  tokens, or other secrets.

## Repeatable checks

Run these searches against source and production output separately. Treat a
match as an investigation lead, not automatically as a violation; compare the
rendered claim to the approval and contract records before assigning the final
status.

| ID | Check | Repeatable procedure | Expected evidence | Current result |
| --- | --- | --- | --- | --- |
| PRIV-01 | Disallowed personal details | Search the implemented source and build for phone/mobile/cell terms, personal-email patterns, exact addresses/locations, family-detail terms, and other sensitive personal data. | No disallowed personal or family detail is published. | `BLOCKED` |
| PRIV-02 | Employer safety | Search for confidential project, incident, internal-system, secret, credential, metric, architecture, or team-detail language; compare every Home Depot claim to the approved general-level wording. | Only approved employer-safe context is present. | `BLOCKED` |
| PRIV-03 | Private-source and secret URLs | Enumerate every URL in source, generated output, and rendered anchors. Flag private/internal hosts, localhost/dev endpoints, query-string secrets, private repositories, and unapproved asset paths. | WIP entries expose no private source, internal URL, secret, or unapproved asset. | `BLOCKED` |
| PRIV-04 | Placeholder text | Search rendered/source output for `TODO`, `TBD`, `lorem`, `placeholder`, `sample text`, `replace me`, and equivalent release-only copy. | No stale placeholder is visible; any explicit deferral is intentional and labeled. | `BLOCKED` |
| PRIV-05 | Unsupported claims | Compare names, roles, dates, metrics, ownership, attribution, statuses, and play labels in rendered output against `content-approval.md`, `data-model.md`, and the link/playability evidence. | No fabricated or silently inferred claim remains. | `BLOCKED` |
| PRIV-06 | WIP boundaries | Inspect Restaurant Tracker and Football Idle Game copy/media/links from source and the rendered page. | Only approved high-level copy/media is present; no private implementation detail or production-readiness claim appears. | `BLOCKED` |
| PRIV-07 | BBQ/archive approvals | Inspect BBQ App, Support, Flux, Battle of the Masses, and UPBETOD wording and attribution. | Approved BBQ wording/role and supplied archive roles are preserved; missing collaborator or organizer attribution is deferred or explicitly labeled `BLOCKED`, and no collaborator is guessed. | `BLOCKED` |
| PRIV-08 | Build/deployment parity | Run the same privacy searches against the production artifact and the exact deployed target, then compare visible copy. | Source, build, and deployed page agree on the approved safe content. | `BLOCKED` |

Suggested command pattern after implementation (adjust paths only to the
approved artifact):

```bash
rg -n -i \
  --glob '!node_modules/**' \
  --glob '!coverage/**' \
  '(phone|mobile|cell|personal[[:space:]_-]*email|street|exact[[:space:]_-]*address|internal|confidential|secret|private|TODO|TBD|lorem|placeholder|sample[[:space:]_-]*text)' \
  src public dist
```

Then inspect all URL-bearing records and rendered `a[href]` values manually;
the regular expression is not a substitute for approval comparison or a
deployed-page review.

## Evidence log template

| Date | Scope | Reviewer | Search/tool | Findings | Result | Artifact/notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-01 | Planning documents only | Not assigned | Document review | Boundaries and open approvals recorded; source/build audit not run. | `BLOCKED` | No production privacy claim. |

## Handoff

Keep a `BLOCKED` result for missing approvals or unavailable deployment state.
Use `FAIL` for an observed disclosure, unsupported claim, secret-bearing URL,
or stale placeholder, and record the exact file/route and remediation. Mark
`PASS` only after both source and production/deployed output have been checked.
