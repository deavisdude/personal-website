# Release QA

**Feature:** Davis Odom Personal Website Redesign  
**Task:** T040  
**Recorded:** 2026-08-01  
**Base commit under test:** `cbe8359` (`codex/redesign`)  
**Application root:** `personal-website/`  
**Local QA URL:** `http://127.0.0.1:5175/`  
**Environment:** Node `v25.6.0`, npm `11.8.0`, Codex in-app browser  
**Overall release result:** `BLOCKED` — local build, tests, metadata, and
content checks pass; deployment, current browser-play, and preference-specific
verification remain unavailable.

The local build, test runner, and linked manifest now pass. Deployment parity
and some external/browser prerequisites are separate `BLOCKED` items; they are
not treated as local build failures.

During finalization, another task left a shared-worktree source delta in
`src/content/siteContent.js` that removes only non-rendered `visibilityNotes`
fields. The bounded test/build rerun below included that delta; it does not
change the rendered fields, links, or layout covered by the browser evidence.
The unrelated dirty QA files and source change were preserved.

## Summary

| Area | Result | Evidence/result |
| --- | --- | --- |
| Project build | `PASS` | `npm run build` exited `0`; Vite emitted `dist/`. |
| Project test runner | `PASS` | `npm test` exited `0`; 5 files and 11 tests passed. |
| Metadata review | `PASS` | Root and emitted document metadata, including the linked manifest identity and dark theme colors, match the approved site. Canonical/`og:url`/`og:image` remain deployment-target items. |
| Quickstart 1: identity/current context | `PASS` | Desktop and 320px local journeys identified Davis, role, Georgia, thesis, current context, About, Experience, and footer. |
| Quickstart 2: work evidence/archive | `PASS` | All seven requested projects rendered with contract fields and honest archive/WIP treatment. |
| Quickstart 3: links/playability | `BLOCKED` | Rendered links are correctly labeled and guarded; LinkedIn and Global Game Jam reachability remained externally blocked, and no current browser game build exists. |
| Quickstart 4: accessibility/responsive | `BLOCKED` | Responsive/semantic/media checks pass, but the browser surface could not complete a full Tab traversal or enable reduced motion. |
| Quickstart 5: privacy/content | `BLOCKED` | Local rendered/source/build content audit passes; exact deployed-target parity is unavailable. |
| Vercel/deployed artifact | `BLOCKED` | Repository has `vercel.json` and CI configuration but no exact deployment URL or deployment credentials/record. |

## Commands and results

### Test runner

Command:

```bash
npm test
```

Result: exit `0`.

```text
Test Files  5 passed (5)
Tests       11 passed (11)
Duration    3.88s
```

Passed files included `src/App.test.js`, `Footer.test.jsx`,
`MobileNavigation.test.jsx`, `ProjectArchive.test.jsx`, and
`ProjectCard.test.jsx`.

### Production build

Command:

```bash
npm run build
```

Result: exit `0`.

```text
vite v6.4.3 building for production...
✓ 41 modules transformed.
dist/index.html                   1.58 kB │ gzip:  0.58 kB
dist/assets/index-BnGZyO4I.css   21.90 kB │ gzip:  4.49 kB
dist/assets/index-CPLarBJ0.js    244.10 kB │ gzip: 74.89 kB
✓ built in 0.88s
```

The build output was ignored by the repository's `/dist` rule; no generated
build files were added to the Git diff.

### Local start

Command from the quickstart, with an explicit loopback host:

```bash
npm start -- --host 127.0.0.1
```

The sandbox-only attempt exited `1` with `listen EPERM` while binding
`127.0.0.1:5173`. A narrowly scoped network-enabled retry started the local
server successfully on `http://127.0.0.1:5175/` because ports 5173 and 5174
were already occupied. The local server was stopped after browser QA.

## Metadata review

### Active Vite document and generated artifact

The active root `index.html` and generated `dist/index.html` both contain:

- document title: `Davis Odom | Senior Software Engineer`;
- `lang="en"`, UTF-8, responsive viewport, dark `theme-color`, and
  `color-scheme`;
- description matching the approved Georgia/software-engineer thesis;
- `robots="index, follow"`;
- Open Graph type/title/description;
- Twitter card/title/description;
- favicon, Apple touch icon, and manifest links.

The generated metadata check reported:

```text
hasLang=true
hasViewport=true
hasThemeColor=true
hasDescription=true
hasOpenGraph=true
hasTwitter=true
hasRobots=true
hasManifest=true
hasCanonical=false
hasOgUrl=false
hasOgImage=false
```

The missing canonical, `og:url`, and `og:image` values are noted for the final
deployment/URL review; no exact public site URL is recorded in this repository.

### Manifest remediation

`dist/index.html` links `/manifest.json`, and the build copies
`public/manifest.json` unchanged. The remediated emitted manifest reports:

```json
{
  "short_name": "Davis Odom",
  "name": "Davis Odom | Senior Software Engineer",
  "theme_color": "#0b0d10",
  "background_color": "#0b0d10"
}
```

The linked manifest is now release-appropriate and avoids the stale React
raster icons. `public/index.html` remains an unused CRA-era template; Vite's
root `index.html` is the emitted document entry, and this unused file is a
follow-up cleanup item rather than a failure of the release artifact.

## Quickstart scenarios

### 1. P1 identity and current context — `PASS`

Executed against the rendered local app at both `1440x900` and `320x800`.

Observed results:

- `Davis Odom`, `Senior Software Engineer`, `Georgia`, the approved thesis, and
  current software-engineering/developer-tools context at The Home Depot were
  all present in the rendered text.
- The Experience section led with The Home Depot and `Current` context.
- The desktop About and Experience anchors resolved to rendered sections.
- At 320px, the rendered `Open menu` control opened `Mobile navigation`; the
  rendered About link resolved to `#about` and Experience resolved to
  `#experience`, closing the menu after activation.
- The footer landmark and Personal context were reachable.
- No form, input, textarea, `mailto:`, or `tel:` control was present.
- At 1440px, `scrollWidth=1440` and `clientWidth=1440`; at 320px,
  `scrollWidth=320` and `clientWidth=320`.

### 2. P2 work evidence and archive — `PASS`

The rendered contract check found `projectCount=7`, all required IDs, complete
title/date/role/status fields, a fallback for every card, and no unexpected
external destination on the two unpublished WIP entries or BBQ App.

| Project | Date | Role | Rendered status | Destination/fallback result |
| --- | --- | --- | --- | --- |
| Restaurant Tracker | Current (unpublished) | Pending Davis approval | In progress | Text-first fallback; no public destination or screenshot. |
| Football Idle Game | Current (unpublished) | Pending Davis approval | In progress | Text-first fallback; no public destination or screenshot. |
| Support | June–July 2014 | Software Engineer | Download only | Team-of-seven attribution; repository/historical/download links remain unverified. |
| Flux | 2013–2014 | Software Engineer | Download only | HHS Game Jam attribution; repository/download/historical links remain unverified. |
| Battle of the Masses | 2016 | Design and Lead Programmer | Historical link | Video and Global Game Jam reference remain unverified. |
| UPBETOD | 2015–2016 (repository evidence) | Software Engineer | Repository only | Repository/video/Trello evidence remains unverified. |
| BBQ App | June 2014–April 2015 | Sole creator | Archived | Approved TAG/Atlanta BBQ Club context; no invented app URL or source. |

The rendered cards expose no private source URL, private media, unstable WIP
implementation detail, or current-production implication. The final rendered
contract assertion returned `allRequiredPass=true`.

### 3. Link and playability evidence — `BLOCKED`

The rendered DOM contained 13 external controls representing 12 unique
destinations; LinkedIn appears in both the identity rail and footer. The 11
project destination controls all used HTTPS URLs, had no credentials or
secret-bearing query keys, had an `Unverified` status, and had a non-play
fallback. The local rendered DOM contained zero `Play in browser` controls.

The exact rendered URLs were checked with:

```bash
for url in <each HTTPS href extracted from the rendered controls>
do
  curl --silent --show-error --location --max-redirs 10 --max-time 20 \
    --compressed --output /dev/null \
    --write-out "$url\\t%{http_code}\\t%{num_redirects}\\t%{url_effective}\\t%{errormsg}\\n" \
    "$url"
done
```

The first sandbox-only run returned DNS `000` for every host. The same
read-only check was retried with network permission. Results on 2026-08-01:

| Rendered destination | Type | HTTP/redirect result | Final URL/result | Status |
| --- | --- | --- | --- | --- |
| `www.linkedin.com/in/davisodom` | Social | `999`, 0 redirects | No final response; host/provider blocked the check. | `BLOCKED` |
| `github.com/deavisdude/Support` | Repository | `200`, 0 redirects | Same URL. | `PASS` reachability; source remains unverified |
| `www.ggda.org/news/support-wins-summer-game-jam-at-spsu` | Historical | `200`, 0 redirects | Same URL. | `PASS` reachability; historical only |
| `skateborden.itch.io/support` | Download | `200`, 0 redirects | Same URL. | `PASS` reachability; download only |
| `github.com/deavisdude/CDCJam-14` | Repository | `200`, 0 redirects | Same URL. | `PASS` reachability; source remains unverified |
| `www.dropbox.com/sh/gzk67bjp474t3cr/AADmDEu5jzIMQZWZSnAh-hY9a?dl=0` | Download | `200`, 1 redirect | `https://www.dropbox.com/scl/fo/x84zv0jvunx5z8isl3eqw/ACs1f7kqfhV1RxKAaurL62g?rlkey=3pa5da2hwlq4bgnmrrpmup9zh&dl=0` | `PASS` redirect observed; download only |
| `www.ggda.org/news/ggda-2014-in-review` | Historical | `200`, 0 redirects | Same URL. | `PASS` reachability; historical only |
| `www.youtube.com/watch?v=indjhyEG1g4` | Video | `200`, 0 redirects | Same URL. | `PASS` reachability; video only |
| `globalgamejam.org/2016/games/battle-masses` | Historical | `301`, 1 redirect, then timeout | Redirect target `https://v3.globalgamejam.org/2016/games/battle-masses`; final page timed out. | `BLOCKED` |
| `github.com/deavisdude/UPBETOD` | Repository | `200`, 0 redirects | Same URL. | `PASS` reachability; source remains unverified |
| `www.youtube.com/watch?v=Ssr0FPcskLQ` | Video | `200`, 0 redirects | Same URL. | `PASS` reachability; video only |
| `trello.com/b/TocWvDKP/upbetod` | Historical | `200`, 0 redirects | Same URL. | `PASS` reachability; project history only |

No candidate has a current supported-browser, start-to-finish build record.
Because no rendered control is eligible for playability, load/controls/core
loop/completion/failure testing is `BLOCKED` by the missing current browser
build, not a local implementation failure. The site correctly withholds a play
claim.

The exact Vercel production/preview target is also unavailable: the repository
contains `vercel.json` and a GitHub Actions build workflow, but no deployment
URL or deployment evidence. Deployment parity is `BLOCKED`.

### 4. Accessibility and responsive behavior — `BLOCKED`

Passing local observations:

- 320px rendered layout had no horizontal overflow.
- Heading sequence had no level skips; all rendered links had a visible text or
  accessible label; the skip target `#main-content` exists and the main element
  has `tabindex=-1`.
- Opening the mobile menu and pressing Escape closed it, returned focus to the
  `Open menu` button, and the focused button matched `:focus-visible=true`.
- The stylesheet contains an explicit `@media (prefers-reduced-motion: reduce)`
  rule that disables animations, transitions, and smooth scrolling.
- All seven project cards render text-first fallbacks; there were `0` rendered
  project images, `7` cards with fallback text, and all cards retained title and
  summary text.

Blocked execution boundaries:

- The in-app browser's Tab key action remained on `BODY`/the targeted control
  rather than advancing through the full focus order, so a complete keyboard
  traversal could not be evidenced in this session. The skip target is
  addressable directly (`/#main-content` focused `main`), but the browser
  harness did not activate the off-screen skip link through its synthetic
  keyboard action.
- The browser capability surface exposed viewport and visibility controls but
  no `prefers-reduced-motion` emulation. The observed preference remained
  `false`, so the preference-enabled journey is `BLOCKED`.

These are explicit evidence blockers; no application `FAIL` is assigned to the
keyboard or reduced-motion implementation from this browser limitation alone.

### 5. Privacy and content audit — `BLOCKED`

Local source/build/render checks:

```bash
rg -n -i --glob '!node_modules/**' --glob '!coverage/**' \
  --glob '!dist/assets/**' \
  '(phone|mobile|cell|personal[[:space:]_-]*email|street|exact[[:space:]_-]*address|internal|confidential|secret|private|TODO|TBD|lorem|placeholder|sample[[:space:]_-]*text)' \
  src public dist/index.html dist/manifest.json
```

The raw search found implementation guardrails, validation regexes, and test
assertions containing terms such as `private`, `internal`, and `confidential`;
it did not find a rendered personal contact detail. The
generated bundle also contains the policy regexes and the `Play in browser`
constant used by the guardrail, so a raw bundle string search is not equivalent
to a rendered disclosure search.

The direct rendered privacy check returned `false` for every prohibited category:

```text
phoneOrEmail=false
exactLocation=false
familyDetail=false
employerConfidential=false
placeholder=false
playClaim=false
```

The source/build metadata check found no phone/email in the document entry and
no placeholder text in the bundle. The rendered contract check returned
`allRequiredPass=true`, `playControls=0`, and all external state was visibly
labeled `Unverified` with a fallback. This is a local privacy/content `PASS`.

The scenario remains overall `BLOCKED` because the exact deployed artifact was
not available for source/build/deployed parity review. The unavailable external
destinations are labeled rather than silently omitted or overstated.

## Release handoff

1. `PASS`: the linked manifest identity/colors were corrected and the build
   metadata check was rerun successfully. Refresh or remove the unused CRA
   public template as a later cleanup item.
2. `BLOCKED`: provide the exact Vercel preview/production URL and deployment
   evidence for final artifact parity.
3. `BLOCKED`: provide a current browser-playable candidate if a playability
   claim is required; otherwise retain the current honest no-play treatment.
4. `BLOCKED`: repeat full keyboard and reduced-motion journeys in a browser
   with working Tab delivery and reduced-motion emulation.
5. `BLOCKED`: recheck LinkedIn and the Global Game Jam destination when their
   external provider state is available; keep their current rendered status
   unverified until then.

The T040 agent did not change source files or `tasks.md`; the parent remediation
updated the public manifest and removed source-only review metadata before the
final build rerun.
