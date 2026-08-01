# Link Audit

**Feature:** Davis Odom Personal Website Redesign
**Task:** T013 foundational audit structure; final link execution is T034
**Recorded:** 2026-08-01
**Overall status:** `BLOCKED`

## Evidence boundary

This is the foundational audit for the full archive/release link pass. The
rows below preserve destinations identified by the planning research and the
user-supplied 2026-08-01 read-only URL checks. Source-level HTTP 200 and
redirect observations are recorded explicitly, but they are not verification
of an exact rendered control, browser behavior, or playability. The P1
identity rail now has a local rendered-control observation for LinkedIn; the
archive/project link inventory remains incomplete until T034.

The final audit must include every visible external/project link, including
social or resume links, and must use the actual rendered control rather than a
URL copied from planning notes.

## 2026-08-01 publication decisions

The keep/remove decision applies to visitor-facing project-card links; source
evidence stays in this audit so provenance is not lost.

### Keep as visitor-facing archive/source links

- **Support:** `SUP-REPO`, `SUP-GGDA`, and `SUP-ITCH` — label them as a public
  repository, historical announcement, and download page respectively.
- **Flux:** `CDC-REPO`, `FLUX-GGDA`, and `FLUX-DROPBOX` — label them as a public
  repository, historical review, and legacy download/archive respectively.
- **Battle of the Masses:** `BATTLE-GGJ` and `BATTLE-YOUTUBE` — label them as a
  historical Global Game Jam reference and historical video.
- **UPBETOD:** `UPBETOD-REPO`, `UPBETOD-TRELLO`, and `UPBETOD-YOUTUBE` — label
  them as repository, historical project board, and historical video evidence.
- **Identity:** the approved public LinkedIn profile is included as
  `SOCIAL-LINKEDIN`. No resume URL is added until a public-safe destination is
  supplied or approved.

### Remove from visitor-facing project cards, retain in this audit as provenance

- `OLD-REPO` and `OLD-INDEX` are source-archive evidence, not primary project
  destinations; keep them audit-only unless a later archive view has a clear
  “legacy source archive” affordance.
- `FLUX-MANIFEST`, `FLUX-UNITY`, `SUP-MANIFEST`, and `SUP-UNITY` are legacy
  Unity Web Player pages/artifacts. Do not expose them as ordinary project
  links or playable controls; retain their evidence and fallback wording here.

### Redirect checks still required

- The old Flux Dropbox URL (`FLUX-DROPBOX`) already has a source-level redirect
  observation to the Dropbox folder recorded in its row. T034 must activate the
  exact rendered control and confirm the final URL/label before marking it
  `redirected`.
- No other redirect chain is approved from the planning records. T034 must
  check the final URL for every kept link, including LinkedIn, and record any
  redirect or unavailable result. A source-level HTTP 200 or oEmbed response
  is not enough.

## Current result

| Area | Status | Evidence or blocker |
| --- | --- | --- |
| Audit schema | `PASS` at planning level | The table includes destination type, status, source, checked date, final URL/redirect behavior, and fallback. |
| Planning-source inventory | `PASS` as an inventory | The known research destinations are recorded below as candidates, not as live-verified links. |
| Source-level read-only URL checks | `PASS (limited)` | On 2026-08-01, the supplied checks observed HTTP 200 for the four GitHub old-site artifact pages, legacy Dropbox URL, Trello board, and two YouTube oEmbed endpoints; Dropbox's final redirect target is recorded below. |
| Rendered-link inventory | `PARTIAL` | The P1 identity rail and LinkedIn control were rendered locally; the full archive/project inventory is not yet rendered for enumeration. |
| T034 rendered URL/redirect audit | `BLOCKED` | T034 has not run a dated request/browser check for each visible link from the exact release candidate. Source-level checks below cannot substitute for this. |
| T035 playability linkage | `BLOCKED` | T035 has not run any candidate from a rendered control through load, core loop, completion/exit, and failure/reload checks. |
| Social/resume links | `PARTIAL` | The public LinkedIn URL is approved and implemented; its exact rendered destination check is pending. Resume remains intentionally omitted because no public-safe resume URL is supplied. |

## Status and destination rules

- `verified` means the exact rendered destination was checked and is usable for
  the label shown; it does not automatically mean a game is playable.
- `redirected` records the final URL and explains the redirect; the rendered
  label must still describe the real destination.
- `unavailable` records a failed/dead destination with a useful fallback.
- `unverified` means the exact rendered-control verification is incomplete. A
  row may include a source-level HTTP 200 or redirect observation, but that
  observation must remain in the notes and cannot be presented as a live demo.
- `blocked` means a required approval, URL, target, or external prerequisite is
  missing.
- Only a separate playability record can establish `browser-verified`; a
  `repository`, `download`, `historical`, or successful HTTP response is not
  enough.

## Baseline planning and source-check inventory

These rows remain `unverified` or `blocked` because the current site does not
render them yet. The read-only observations are supporting evidence only.
Update each row with the actual rendered control, final URL, redirect behavior,
status, source, check date, and fallback after T034. Do not change a row to
`verified` merely because a request returns an HTTP response.

| ID | Project/destination | URL from planning source | Destination type | Status | Source | Checked date | Final URL / redirect behavior | Fallback | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OLD-REPO | Public old-site repository | `https://github.com/deavisdude/My-Site` | `repository` | `unverified` | `content-approval.md` and `research.md` user-approved public source | `2026-08-01 (source inspected; HTTP check not included in supplied artifact-check set)` | No redirect recorded | `Historical repository context only; do not copy old contact details.` | Public tree contains the old index, legacy artifacts, and historical project links. |
| OLD-INDEX | Old-site index source | `https://github.com/deavisdude/My-Site/blob/master/index.html` | `historical` | `unverified` | `content-approval.md` and `research.md` user-approved public source | `2026-08-01 (source inspected; rendered-link check pending)` | No redirect recorded | `Historical source note; do not render old phone/email or imply the old contact flow remains approved.` | Index linked Support, Flux, Battle of the Masses, and the UPBETOD Trello board; BBQ was an unlinked card. |
| FLUX-MANIFEST | Flux legacy HTML manifest | `https://github.com/deavisdude/My-Site/blob/master/Flux/Build.html` | `historical` | `unverified` | `content-approval.md` and `research.md` old-site artifact inventory | `2026-08-01 (read-only HTTP 200; T034 rendered check pending)` | Same URL observed; no redirect recorded | `Historical Unity Web Player manifest; no live-demo or play label.` | 4,606 bytes; manifest uses Unity Web Player 3.x and points to `Build.unity3d`. |
| FLUX-UNITY | Flux legacy Unity artifact | `https://github.com/deavisdude/My-Site/blob/master/Flux/Build.unity3d` | `download` | `unverified` | `content-approval.md` and `research.md` old-site artifact inventory | `2026-08-01 (read-only HTTP 200; T034 rendered check pending)` | Same URL observed; no redirect recorded | `Legacy download evidence only; no browser-play promise.` | 31,937,134 bytes; Unity Web Player artifact, not a current web build. |
| SUP-MANIFEST | Support legacy HTML manifest | `https://github.com/deavisdude/My-Site/blob/master/Support%20Web.html` | `historical` | `unverified` | `content-approval.md` and `research.md` old-site artifact inventory | `2026-08-01 (read-only HTTP 200; T034 rendered check pending)` | Same URL observed; no redirect recorded | `Historical Unity Web Player manifest; no live-demo or play label.` | 4,212 bytes; manifest uses Unity Web Player 3.x and points to `Support Web.unity3d`. |
| SUP-UNITY | Support legacy Unity artifact | `https://github.com/deavisdude/My-Site/blob/master/Support%20Web.unity3d` | `download` | `unverified` | `content-approval.md` and `research.md` old-site artifact inventory | `2026-08-01 (read-only HTTP 200; T034 rendered check pending)` | Same URL observed; no redirect recorded | `Legacy download evidence only; no browser-play promise.` | 42,352,073 bytes; Support manifest says Unity Web Player is no longer supported in Google Chrome. |
| SUP-REPO | Support source repository | `https://github.com/deavisdude/Support` | `repository` | `unverified` | `research.md` public source candidate | `2026-08-01 (candidate recorded; source-repo HTTP check not included in supplied set)` | Not checked in supplied evidence | `Repository/archive context; never a play label by itself.` | README says Summer Game Jam 2014 and describes the project as quick/buggy. |
| CDC-REPO | CDCJam-14 source repository | `https://github.com/deavisdude/CDCJam-14` | `repository` | `unverified` | `research.md` public source candidate | `2026-08-01 (candidate recorded; source-repo HTTP check not included in supplied set)` | Not checked in supplied evidence | `Repository/source candidate only; investigate Unity rebuild feasibility separately.` | README says CDC & HHS Game Jam Submission, fall 14; quick/buggy but works. |
| UPBETOD-REPO | UPBETOD source repository | `https://github.com/deavisdude/UPBETOD` | `repository` | `unverified` | `research.md` public source candidate | `2026-08-01 (candidate recorded; source-repo HTTP check not included in supplied set)` | Not checked in supplied evidence | `Repository/archive label; no play control without build evidence.` | README describes a Unity local-multiplayer controller-based space shooter for a game jam under time constraints. |
| FLUX-DROPBOX | Flux legacy Dropbox destination | `https://www.dropbox.com/sh/gzk67bjp474t3cr/AADmDEu5jzIMQZWZSnAh-hY9a?dl=0` | `download` | `unverified` | `research.md` Flux manifest and user-supplied read-only check | `2026-08-01 (read-only HTTP 200 and redirect observed; T034 rendered check pending)` | Redirected to `https://www.dropbox.com/scl/fo/x84zv0jvunx5z8isl3eqw/ACs1f7kqfhV1RxKAaurL62g?rlkey=3pa5da2hwlq4bgnmrrpmup9zh&dl=0` | `Legacy download/archive label; download availability is not browser playability.` | The destination is a historical Flux download candidate, not a verified current build. |
| UPBETOD-TRELLO | UPBETOD Trello board | `https://trello.com/b/TocWvDKP/upbetod` | `historical` | `unverified` | `content-approval.md` and `research.md` old-site index/source inventory | `2026-08-01 (read-only HTTP 200; T034 rendered check pending)` | Same destination observed; no redirect recorded | `Historical planning/progress evidence; not a playable build.` | The old-site source links the public board. |
| UPBETOD-YOUTUBE | UPBETOD historical video | `https://www.youtube.com/watch?v=Ssr0FPcskLQ` | `video` | `unverified` | `content-approval.md` and user-supplied video evidence | `2026-08-01 (YouTube oEmbed HTTP 200; rendered-link check pending)` | No redirect recorded; oEmbed endpoint: `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DSsr0FPcskLQ&format=json` | `Historical video reference (not browser-playable).` | oEmbed title: “(UPBETOD) Über Pwn Battle Extraordinaire-tastrophe of Doom”; author: `deavisdude`. |
| BATTLE-YOUTUBE | Battle of the Masses historical video | `https://www.youtube.com/watch?v=indjhyEG1g4` | `video` | `unverified` | `content-approval.md` and user-supplied video evidence | `2026-08-01 (YouTube oEmbed HTTP 200; rendered-link check pending)` | No redirect recorded; oEmbed endpoint: `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DindjhyEG1g4&format=json` | `Historical video reference (not browser-playable).` | oEmbed title: “Battle of the Masses”; author: `deavisdude`. |
| SUP-GGDA | Support GGDA announcement | `https://www.ggda.org/news/support-wins-summer-game-jam-at-spsu` | `historical` | `unverified` | `research.md` public evidence | `2026-08-01 (candidate; live/rendered check pending)` | Not checked in supplied evidence | `Archive entry with source-attribution text if unavailable.` | Historical/award context is not a current build. |
| SUP-ITCH | Support itch.io page | `https://skateborden.itch.io/support` | `download` | `unverified` | `research.md` public evidence | `2026-08-01 (candidate; live/rendered check pending)` | Not checked in supplied evidence | `Download-only or unavailable label; no browser-play promise.` | Download availability and browser play require separate checks. |
| FLUX-GGDA | Flux GGDA review | `https://www.ggda.org/news/ggda-2014-in-review` | `historical` | `unverified` | `research.md` public evidence | `2026-08-01 (candidate; live/rendered check pending)` | Not checked in supplied evidence | `Historical context; retain text if the destination is unavailable.` | The legacy Web Player build is not treated as a live demo. |
| BATTLE-GGJ | Battle of the Masses Global Game Jam reference | `https://globalgamejam.org/2016/games/battle-masses` | `historical` | `unverified` | `research.md` public evidence | `2026-08-01 (candidate; live/rendered check pending)` | Not checked in supplied evidence | `Historical-link label with project context; no play control.` | Current health and final attribution require later review. |
| SOCIAL-LINKEDIN | Davis public LinkedIn profile | `https://www.linkedin.com/in/davisodom` | `social` | `unverified` | `content-approval.md` and Davis-approved public destination | `2026-08-01 (implemented; rendered-link check pending)` | Not checked from the rendered control | `Public LinkedIn profile; omit the control if the approved destination becomes unavailable.` | The URL is approved for inclusion; source discovery does not replace the final rendered-control audit. |
| RESUME | Public resume destination | Not supplied | `official` | `blocked` | `content-approval.md` interim-resume decision | `2026-08-01 (target not supplied)` | Not applicable | `Omit until a public-safe resume URL is supplied or approved.` | The LinkedIn profile is not silently treated as a resume download. |

## Repeatable final audit procedure

1. Start the exact release candidate using the approved quickstart command and
   open its local preview or exact preview/deployed URL in a clean browser.
2. Enumerate every rendered `a[href]` and visible project control, recording
   its accessible label, source record ID, and URL. Include footer/social/resume
   links and links shown after optional media is disabled.
3. Activate each control from the rendered page. Record the final URL, status
   code, redirect chain/behavior, destination type, and whether the destination
   matches its label. A request-only check does not replace this step.
4. Record `verified`, `redirected`, `unavailable`, `unverified`, or `blocked`,
   plus the exact `YYYY-MM-DD` check date. For any non-verified destination,
   write the visitor-facing fallback label.
5. Cross-check project status and play controls against
   `qa/playability.md`; only a candidate with dated start-to-finish evidence
   may be `browser-verified` or labeled `Play in browser`. T035 has not run.
6. Re-run after the final content/build/deployment change and preserve the
   final URL and evidence artifact for each row.

Optional request-level check for a public URL (after the rendered-control
inventory exists; replace the placeholder without logging secrets):

```bash
curl -sSIL --max-redirs 10 \
  -o /tmp/personal-website-link-headers.txt \
  -w 'status=%{http_code} final_url=%{url_effective}\n' \
  'https://example.invalid/replace-with-rendered-destination'
```

The request result is supporting evidence only. The browser activation,
destination type, source/provenance, and fallback still need to be recorded in
the table.

## Evidence log template

| Date | Build/URL | Links enumerated | Checks performed | Result | Reviewer/artifact |
| --- | --- | --- | --- | --- | --- |
| 2026-08-01 | `http://127.0.0.1:5173/` local P1 preview | LinkedIn identity control plus About/Experience anchors | Fresh rendered tab exposed exactly one `https://www.linkedin.com/in/davisodom` anchor with `target="_blank"` and `rel="noreferrer noopener"`; clean post-fix console; 320×800 viewport kept `scrollWidth` at 320 | `PARTIAL; LinkedIn control rendered, external redirect and full archive audit BLOCKED` | T019 local evidence; T034/T035 pending. |
| 2026-08-01 | Current site archive candidates | Source candidates listed above | Supplied read-only HTTP 200 checks for four GitHub old-site artifact pages, legacy Dropbox URL, Trello board, and two YouTube oEmbed endpoints; Dropbox redirect recorded | `PARTIAL source evidence; rendered archive audit and playability BLOCKED` | T013/T034 baseline evidence. |

## Handoff

Keep the baseline rows until every rendered link has a corresponding final
record. Do not remove a stale/unavailable destination without recording why it
was removed and what text-first fallback remains. A source-level HTTP 200 or
redirect is an auditable observation, not permission to imply a live experience.
