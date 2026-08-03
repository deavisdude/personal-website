# Playability Evidence

**Feature:** Davis Odom Personal Website Redesign
**Tasks:** T035 browser-build playability; T036 play-control gate
**Recorded:** 2026-08-01
**Overall result:** `BLOCKED; no candidate browser build is offered`

## Evidence boundary

The rendered app was opened at `http://127.0.0.1:5174/`. It exposed project
destination links for Support, Flux, Battle of the Masses, and UPBETOD, but it
exposed no `Play in browser` control and no `demo` destination. The two current
WIP entries and BBQ App had no public destination. The rendered page therefore
offered zero candidate browser builds to run through a start-to-finish loop.

The Support itch.io destination was inspected as a bounded build-discovery
check because it is the only rendered download page. It loaded a page titled
`Support by Stephen Borden` with Windows download text (`54 MB`) and Download
controls; no browser-run control was present. This is a download-page result,
not gameplay evidence. Legacy Unity Web Player pages/artifacts are
source/archive evidence only.

No repository, video, historical page, download page, or HTTP success is
treated as a playable build. No core-loop, completion/exit, or failure/reload
claim is made.

## Current results

| Check | Result | Evidence |
| --- | --- | --- |
| Rendered project-control inventory | `PASS` | 13 external destination controls were observed in the rendered capture: 2 LinkedIn instances and 11 project destination links across Support, Flux, Battle of the Masses, and UPBETOD. |
| Candidate browser-build inventory | `PASS; zero candidates` | No rendered link had `type: demo`; no visible label or control said `Play in browser`. The itch.io page offered downloads, not a browser build. |
| Load and controls | `BLOCKED` | There is no exact browser-build URL exposed by a rendered control. |
| Core loop | `BLOCKED` | No candidate build and no approved project-specific core-loop definition are available. |
| Completion and exit | `BLOCKED` | No candidate build or approved completion/exit path is available. |
| Failure and reload | `BLOCKED` | No candidate build was run, so no failure/recovery behavior was observed. |
| T036 play-control gate | `PASS` | No project is `browser-verified`; no `Play in browser` control was added. The existing helper requires project status `browser-verified`, link type `demo`, and link status `verified`. |

## Candidate/build checks

| Candidate or rendered destination | Load / controls evidence | Core loop, completion/exit, failure/reload | Result and exact limitation |
| --- | --- | --- | --- |
| Support — `https://skateborden.itch.io/support` | Page loaded in browser; Windows download text and Download controls were visible; no browser-run control | Not applicable: no browser build was offered | `BLOCKED` — an approved public browser build URL and rendered play control are missing |
| Support legacy Unity Web Player page/artifact | GitHub artifact pages returned HTTP 200 in read-only checks only; not rendered as current controls | Not run | `BLOCKED` — legacy Unity Web Player evidence is not a current supported browser build |
| Flux legacy Dropbox destination | One redirect reached a Dropbox page that said `This item was deleted` | Not run | `BLOCKED` — no available build, and no browser-play control |
| Battle of the Masses — YouTube/reference | YouTube video page loaded; Global Game Jam source returned 301 to a target that timed out in browser/request checks | Not run | `BLOCKED` — video/reference destinations are not a browser build |
| UPBETOD — repository/video/Trello | GitHub and YouTube loaded; Trello reached a resource-warning page | Not run | `BLOCKED` — no browser-build destination is offered |
| Restaurant Tracker | Text-only current WIP fallback; no external control | Not run | `BLOCKED` — no approved public build URL |
| Football Idle Game | Text-only current WIP fallback; no external control | Not run | `BLOCKED` — no approved public build URL |
| BBQ App | Text-only archived fallback; no external control | Not run | `BLOCKED` — no approved public build URL or reproducible browser build |

## Exact prerequisite to unblock T035/T036

An approved public browser build must be added to the rendered project record
as a real `demo` destination. Before adding `Play in browser`, the exact build
must be run from the rendered control in a clean supported browser and the
record must include the URL/version, browser/viewport/date, interactive
controls, representative core-loop actions and visible state changes,
completion/exit behavior, and a safe failure/reload path. Until all of that
exists, keep every play control absent/disabled and keep the project out of
`browser-verified`.

## Reproducible evidence

From the application root:

```bash
npm test -- --reporter=dot
npm run dev -- --host 127.0.0.1
```

The test run completed with 5 test files and 11 tests passing. The local app
was inspected at `http://127.0.0.1:5174/`. The browser inventory used a DOM
snapshot plus a bounded `document.querySelectorAll('a')`/`button` read, then
opened the exact rendered external destinations. The read-only status and
redirect command is recorded in `link-audit.md`.
