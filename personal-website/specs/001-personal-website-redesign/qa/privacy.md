# T039 Privacy and Content-Safety QA

**Feature:** Davis Odom Personal Website Redesign
**Task:** T039 only
**Checked:** 2026-08-01
**Worktree:** `codex/redesign`
**Fresh build artifact:** `/private/tmp/personal-website-t039-fixed.AE1NLd`
**Overall result:** `PASS` for source and local production artifact; deployed parity remains `BLOCKED`.

## Evidence boundary

This is a source and fresh Vite production-artifact audit. It does not claim
that an external deployment or preview URL was checked. The initial audit
found source-only review metadata in the bundle; the remediation removed those
fields from `src/content/siteContent.js`, and this record reflects the fresh
post-fix artifact.

The visitor-facing React projection is safe for the checks below: the archive
render test does not expose internal review notes or a `Play in browser`
control. The post-fix production JavaScript also omits the source-only review
metadata, so visitor-downloadable output now passes this boundary.

## Result summary

| Area | Result | Evidence |
| --- | --- | --- |
| Personal/privacy details in public content | `PASS` | No phone, personal email, address, family-detail, or spouse matches in the content source or fresh build data scan. |
| Employer safety of visitor-facing copy | `PASS` | Home Depot is named only with the approved general developer-tools context; no actual team, project, incident, metric, architecture, credential, or secret detail was found. |
| Private-source and secret URLs | `PASS` | No private/local host or secret-bearing URL matched in source or build; WIP entries have no links or media. |
| Placeholder/release-copy search | `PASS` | No placeholder/TODO/TBD/lorem/sample/replace-me text in non-test source or fresh build; `example.com` occurs only in test fixtures. |
| Attribution | `PASS` | Seven project records contain only approved Davis roles and public team/event/client context; no collaborator or organizer names were inferred. |
| Unsupported claims and historical/playability boundaries | `PASS` | Eleven links validate, all seven project records are non-playable, and historical/source evidence retains archive/download/repository/video labels. |
| Visitor-facing `visibilityNotes` boundary | `PASS` | `ProjectArchive.test.jsx`: 2 tests passed; `Keep the source private` and `Play in browser` were absent from rendered project content. |
| Production-output source-only metadata | `PASS` | After removing internal-only fields from `src/content/siteContent.js`, the fresh artifact contains no `visibilityNotes`, private-source review text, or employer-safety note matches. |
| Deployed-output parity | `BLOCKED` | No deployed or preview URL was supplied; this record makes no deployment claim. |

## Fresh production build

Exact commands and results:

```sh
mktemp -d /private/tmp/personal-website-t039-fixed.XXXXXX
# /private/tmp/personal-website-t039-fixed.AE1NLd

npm run build -- --outDir /private/tmp/personal-website-t039-fixed.AE1NLd
```

Result: exit `0`; Vite `6.4.3` transformed 41 modules and emitted
`index.html`, `assets/index-DMmkImBP.js`, and `assets/index-BnGZyO4I.css`.
The out-of-root `outDir` warning was expected; the `mktemp` directory was new
and empty, so this was a fresh artifact.

## Exact searches and results

### Privacy

```sh
rg -n -i '(phone|cell[[:space:]_-]*phone|cell[[:space:]_-]*number|mobile[[:space:]_-]*phone|mobile[[:space:]_-]*number|personal[[:space:]_-]*email|street[[:space:]_-]*address|exact[[:space:]_-]*address|home[[:space:]_-]*address|family[[:space:]]+(member|detail|information)|spouse)' src/content/siteContent.js index.html public/manifest.json public/robots.txt
```

Result: exit `1`, no output.

```sh
rg -n -i '(phone|cell[[:space:]_-]*phone|cell[[:space:]_-]*number|mobile[[:space:]_-]*phone|mobile[[:space:]_-]*number|personal[[:space:]_-]*email|street[[:space:]_-]*address|exact[[:space:]_-]*address|home[[:space:]_-]*address|family[[:space:]]+(member|detail|information)|spouse)' /private/tmp/personal-website-t039-fixed.AE1NLd --glob '*.js' --glob '*.html'
```

Result: exit `1`, no output. This supports `PASS` for actual public content;
generic `children`, `font-family`, `mailto:` and `tel:` strings found by
broad implementation scans are framework or input-validation code, not
visitor data.

### Employer safety

```sh
rg -n -i '(The Home Depot|developer-tools|confidential|incident|metric|architecture|team|private|internal|production[-[:space:]]*ready)' src/content/siteContent.js
```

Result: exit `0`. Matches were limited to the approved Home Depot
general-level context and public archive team/event facts. The internal-only
review fields were removed from the shipped content source; no confidential
employer fact was found.

The corresponding fresh-build lead-count command was:

```sh
rg -n -o -i '(confidential|internal|secret|credential|password|token|incident|architecture|metric|sensitive|private|production[-[:space:]]*readiness|production[-[:space:]]*ready)' /private/tmp/personal-website-t039-fixed.AE1NLd --glob '*.js' --glob '*.html' | sed -E 's#^[^:]+:[0-9]+:##' | sort | uniq -c
```

Result: exit `0`; only implementation guard-token counts were returned. The
fresh bundle contains no source-only employer-safety or private-source review
notes.

### Private-source and URL review

```sh
rg -n -i --glob '!*.test.*' '(https?://(localhost|127[.]0[.]0[.]1|::1|[^[:space:]/"<>]+[.]internal)([/?:#]|$)|https?://[^[:space:]"<>]*[?&](access[_-]?token|api[_-]?key|auth|code|key|password|private[_-]?key|secret|session|signature|sig|state|token)=[^&[:space:]]+)' src public index.html
```

Result: exit `1`, no output.

```sh
rg -n -i '(https?://(localhost|127[.]0[.]0[.]1|::1|[^[:space:]/"<>]+[.]internal)([/?:#]|$)|https?://[^[:space:]"<>]*[?&](access[_-]?token|api[_-]?key|auth|code|key|password|private[_-]?key|secret|session|signature|sig|state|token)=[^&[:space:]]+)' /private/tmp/personal-website-t039-fixed.AE1NLd --glob '*.js' --glob '*.html'
```

Result: exit `1`, no output. WIP records at
`src/content/siteContent.js:304-352` have empty `links` and `media` arrays.

The source URL inventory command was:

```sh
rg -n -o 'https?://[^[:space:]"<>]+' src/content/siteContent.js
```

Result: 17 URLs, all public approved destinations: LinkedIn; GitHub
`My-Site`, `Support`, `CDCJam-14`, and `UPBETOD`; the two GGDA pages; itch.io;
the legacy Dropbox URL with non-secret `dl=0`; two YouTube video URLs; Global
Game Jam; and Trello. The build inventory additionally contained public React,
Vercel Analytics, and W3C namespace URLs. `https://github.com/example/...`
appears only in `ProjectCard.test.jsx` fixtures and was not emitted in the
build. Local-host strings in the bundle belong to defensive URL validation and
service-worker guards; no local/private URL value was found.

### Placeholder and release-copy search

```sh
rg -n -i '(TODO|TBD|lorem([[:space:]]+ipsum)?|placeholder|sample[[:space:]_-]*text|replace[[:space:]_-]*me|coming[[:space:]]+soon)' src/content src/components public index.html --glob '!*.test.*'
```

Result: exit `1`, no output.

```sh
rg -n -i '(TODO|TBD|lorem([[:space:]]+ipsum)?|placeholder|sample[[:space:]_-]*text|replace[[:space:]_-]*me|example[.]com|coming[[:space:]]+soon)' /private/tmp/personal-website-t039-fixed.AE1NLd --glob '*.js' --glob '*.html'
```

Result: exit `1`, no output. The broader source scan found only
`https://example.com/verified-project` at
`src/components/ProjectCard.test.jsx:73,87`; these are test-only fixtures and
not visitor-facing or present in the build.

### Attribution and unsupported-claim search

```sh
rg -n -i '(collaborator|organizer|with [A-Z][A-Za-z]+|team|sole creator|sole-created|winning submission|hired)' src/content/siteContent.js
```

Result: exit `0`; matches were limited to the approved seven-person Support
team, Flux winning-submission context, Battle of the Masses Global Game Jam
context, UPBETOD's explicit “no team attribution” statement, and the approved
BBQ App sole-creator/TAG/Atlanta BBQ Club story. No collaborator name or
unsupported organizer relationship was present.

The structured claim/link audit command was:

```sh
node --input-type=module -e 'import { projectEntries } from "./src/content/siteContent.js"; import { getLinkPresentation, isBrowserPlayable, validateLinkEvidence } from "./src/content/projectLinks.js"; let links = 0; let invalid = 0; let playable = 0; for (const project of projectEntries) { const projectPlayable = isBrowserPlayable(project); if (projectPlayable) playable += 1; console.log([project.id, "date=" + project.dateLabel, "status=" + project.status, "projectPlayable=" + projectPlayable].join("|")); for (const link of project.links || []) { links += 1; const validation = validateLinkEvidence(link); if (!validation.valid) invalid += 1; const presentation = getLinkPresentation(link, project); console.log("  " + link.id + "|type=" + link.type + "|status=" + link.status + "|playable=" + presentation.playable + "|label=" + presentation.label + "|valid=" + validation.valid); } } console.log("summary|projects=" + projectEntries.length + "|links=" + links + "|invalidLinks=" + invalid + "|playableProjects=" + playable);'
```

Result: exit `0`; `projects=7`, `links=11`, `invalidLinks=0`, and
`playableProjects=0`. The two WIP records are `Current (unpublished)` with no
links. Support and Flux are `download-only`; Battle of the Masses is
`historical-link`; UPBETOD is `repository-only`; and BBQ App is `archived`.
Every link presentation returned `playable=false`, including repositories,
downloads, historical pages, videos, and the project board. Node emitted only
the non-failing `MODULE_TYPELESS_PACKAGE_JSON` warning.

### Visitor-facing and production-output boundary

```sh
npm test -- --run src/components/ProjectArchive.test.jsx
```

Result: exit `0`; 1 test file and 2 tests passed. The test explicitly asserts
that `Keep the source private` and `Play in browser` are absent from the
rendered project archive.

```sh
rg -n -o 'visibilityNotes|Keep the source private|internal URL|private source|Do not publish team' /private/tmp/personal-website-t039-fixed.AE1NLd --glob '*.js' --glob '*.html'
```

Result: exit `1`; no internal-only content was found in the fresh artifact.

The source count was also recorded with:

```sh
rg -n -o 'visibilityNotes' src/content/siteContent.js
```

Result: exit `1`; no source-only `visibilityNotes` fields remain in the public
content module.

The fresh-build claim-token scan also found `Play in browser` twice and
`browser-verified` three times in helper logic. That is a safe exception: the
current structured catalog has zero browser-verified projects, the render test
found zero play controls, and the helper is fail-closed unless a project has a
verified demo destination.

## Final handoff

T039 passes for source and the fresh local production artifact after removing
source-only review metadata from `src/content/siteContent.js`. The actual
visitor-facing content also passes the personal-detail, employer-safe, URL,
placeholder, attribution, and historical/playability checks. Deployment parity
remains `BLOCKED` until an exact preview or production URL is available.
