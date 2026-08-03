# Link Audit

**Feature:** Davis Odom Personal Website Redesign
**Tasks:** T034 link audit; T036 play-control gate
**Recorded:** 2026-08-01
**T034 result:** `PASS with two external limitations recorded`
**T035 result:** `BLOCKED; see qa/playability.md`
**T036 result:** `PASS; no Play in browser control added`

## Evidence boundary

The rendered release candidate was opened at `http://127.0.0.1:5174/` after
the Vite server found port 5173 occupied. A DOM snapshot and bounded DOM
inventory recorded the actual visitor-facing controls. The rendered page had
13 external anchor instances and 12 unique external URLs: LinkedIn appeared
once in the identity rail and once in the footer; Support exposed three
project links; Flux exposed three; Battle of the Masses exposed two; and
UPBETOD exposed three. Restaurant Tracker, Football Idle Game, and BBQ App
had no external controls. No resume URL was supplied.

The HTTP observations below are read-only GET checks made on 2026-08-01 with
redirect following and a 30-second limit. Browser observations came from the
rendered control's destination in the in-app browser. A successful repository,
video, download, historical page, or HTTP response is link evidence only; it
does not establish browser playability.

## Rendered external/project inventory

| ID | Project / rendered label | Rendered control | Requested URL | Final URL / redirect behavior | Destination type | Source / provenance | HTTP and browser evidence | Audit status | Checked | Fallback / interpretation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SOCIAL-LINKEDIN | Identity rail and footer: `LinkedIn profile` | Anchor; two instances; `target="_blank"`, `rel="noreferrer noopener"` | `https://www.linkedin.com/in/davisodom` | Same URL; no redirect observed | `social` | Davis-approved public LinkedIn profile | HTTP 200, `text/html`; browser loaded `Davis Odom - The Home Depot \| LinkedIn` and showed the Davis Odom profile/sign-in page | `verified` | 2026-08-01 | Public profile content may change; not a resume download |
| SUP-REPO | Support: `Support public repository` | Anchor | `https://github.com/deavisdude/Support` | Same URL; no redirect observed | `repository` | Davis-supplied public source repository | HTTP 200, `text/html`; GitHub repository loaded in browser | `verified` | 2026-08-01 | Repository source is not browser playability |
| SUP-GGDA | Support: `Support GGDA announcement` | Anchor | `https://www.ggda.org/news/support-wins-summer-game-jam-at-spsu` | Same URL; no redirect observed | `historical` | Existing public research record | HTTP 200, `text/html`; GGDA announcement loaded in browser | `verified` | 2026-08-01 | Historical event reference; not a playable build |
| SUP-ITCH | Support: `Support download page` | Anchor | `https://skateborden.itch.io/support` | Same URL; no redirect observed | `download` | Existing public research record | HTTP 200, `text/html`; itch.io page loaded as `Support by Stephen Borden`; visible page text described a Windows download of 54 MB and no browser-play control | `verified` | 2026-08-01 | Download page only; no browser-play claim |
| CDC-REPO | Flux: `Flux public repository` | Anchor | `https://github.com/deavisdude/CDCJam-14` | Same URL; no redirect observed | `repository` | Davis-supplied public source repository | HTTP 200, `text/html`; GitHub repository loaded in browser | `verified` | 2026-08-01 | Repository source is not browser playability |
| FLUX-DROPBOX | Flux: `Flux legacy Dropbox download` | Anchor at rendered capture; destination is a legacy download candidate | `https://www.dropbox.com/sh/gzk67bjp474t3cr/AADmDEu5jzIMQZWZSnAh-hY9a?dl=0` | One redirect to `https://www.dropbox.com/scl/fo/x84zv0jvunx5z8isl3eqw/ACs1f7kqfhV1RxKAaurL62g?rlkey=3pa5da2hwlq4bgnmrrpmup9zh&dl=0` | `download` | Davis-supplied Flux legacy page | HTTP 200 after one redirect; browser loaded Dropbox and displayed `This item was deleted` | `unavailable` | 2026-08-01 | Legacy download/archive context only; do not present as playable |
| FLUX-GGDA | Flux: `Flux historical GGDA review` | Anchor | `https://www.ggda.org/news/ggda-2014-in-review` | Same URL; no redirect observed | `historical` | Existing public research record | HTTP 200, `text/html`; GGDA review loaded in browser | `verified` | 2026-08-01 | Historical context; not a playable build |
| BATTLE-YOUTUBE | Battle of the Masses: `Battle of the Masses video` | Anchor | `https://www.youtube.com/watch?v=indjhyEG1g4` | No HTTP redirect; browser URL appended `&themeRefresh=1` | `video` | Davis-supplied YouTube video and oEmbed evidence | HTTP 200, `text/html`; browser loaded `Battle of the Masses - YouTube` | `verified` | 2026-08-01 | Video reference only; not a browser-play control |
| BATTLE-GGJ | Battle of the Masses: `Battle of the Masses Global Game Jam reference` | Anchor at rendered capture; historical fallback if destination is unavailable | `https://globalgamejam.org/2016/games/battle-masses` | HTTP 301 to `https://v3.globalgamejam.org/2016/games/battle-masses`; redirected target timed out in browser and in a read-only request | `historical` | Existing public research record | Source request exposed the 301; final request returned status 000 after timeout; browser navigation timed out | `blocked` | 2026-08-01 | Historical reference only; no current page or playability claim |
| UPBETOD-REPO | UPBETOD: `UPBETOD public repository` | Anchor | `https://github.com/deavisdude/UPBETOD` | Same URL; no redirect observed | `repository` | Davis-supplied public Unity source repository | HTTP 200, `text/html`; repository loaded in browser | `verified` | 2026-08-01 | Repository activity is not a current playable build |
| UPBETOD-YOUTUBE | UPBETOD: `UPBETOD video` | Anchor | `https://www.youtube.com/watch?v=Ssr0FPcskLQ` | Same URL; no redirect observed | `video` | Davis-supplied YouTube video and oEmbed evidence | HTTP 200, `text/html`; browser loaded `(UPBETOD) Über Pwn Battle Extraordinaire-tastrophe of Doom - YouTube` | `verified` | 2026-08-01 | Video reference only; not a browser-play control |
| UPBETOD-TRELLO | UPBETOD: `UPBETOD project board` | Anchor | `https://trello.com/b/TocWvDKP/upbetod` | Same URL; no redirect observed | `historical` | Davis-supplied public Trello board | HTTP 200, `text/html`; browser reached Trello but displayed a warning that resources could not all load | `verified with browser limitation` | 2026-08-01 | Historical planning/source context only; not a playable build |

The two rows with `unavailable`/`blocked` outcomes remain documented rather
than silently removed. Their source records retain useful labels and the page
must not imply that either destination is a live demo. The rendered controls
were captured before this audit was written; the audit result does not add or
rename any project link.

## Content records retained as audit-only provenance

These URLs exist in `linkEvidence` but are not included in a current
project's rendered `links` array. They were not counted among the 13 rendered
external anchor instances. Their HTTP checks are source-only and are not
browser-play evidence.

| ID | URL | HTTP observation | Why it is not a visitor control |
| --- | --- | --- | --- |
| OLD-REPO | `https://github.com/deavisdude/My-Site` | HTTP 200; no redirect | Historical old-site source archive |
| SUP-MANIFEST | `https://github.com/deavisdude/My-Site/blob/master/Support%20Web.html` | HTTP 200; no redirect | Legacy Unity Web Player page; historical evidence only |
| SUP-UNITY | `https://github.com/deavisdude/My-Site/blob/master/Support%20Web.unity3d` | HTTP 200; no redirect | Legacy Unity Web Player artifact; not browser-playable |
| FLUX-MANIFEST | `https://github.com/deavisdude/My-Site/blob/master/Flux/Build.html` | HTTP 200; no redirect | Legacy Unity Web Player page; historical evidence only |
| FLUX-UNITY | `https://github.com/deavisdude/My-Site/blob/master/Flux/Build.unity3d` | HTTP 200; no redirect | Legacy Unity Web Player artifact; not browser-playable |

The old-site `index.html` is not a current `linkEvidence` or rendered control,
so it is not counted as a published link. Its historical destinations are
covered by the current records above and the audit-only rows here.

## Non-external controls and omissions

- The rendered page exposed hash navigation for Skip to main content, About,
  Experience, and Work (with a hidden mobile duplicate set). These are local
  page controls, not external/project destinations.
- Restaurant Tracker, Football Idle Game, and BBQ App rendered text-first
  destination fallbacks with zero external links.
- No resume destination was supplied or rendered.
- The rendered page contained no `Play in browser` label and no enabled play
  control. The only rendered button was the responsive navigation menu, hidden
  at the captured desktop viewport.

## Reproducible evidence

From the application root:

```bash
npm test -- --reporter=dot
npm run dev -- --host 127.0.0.1
```

The test run completed with 5 test files and 11 tests passing. The local Vite
server used `http://127.0.0.1:5174/` because port 5173 was already occupied.
In the browser, open that URL, take a DOM snapshot, and run a bounded inventory
such as:

```js
Array.from(document.querySelectorAll('a')).map((a) => ({
  text: a.textContent.trim().replace(/\s+/g, ' '),
  href: a.href,
  target: a.target || null,
  rel: a.rel || null,
}))
```

The read-only HTTP check used the exact rendered URLs with redirect following:

```bash
curl --silent --show-error --location --max-redirs 10 --max-time 30 \
  --output /dev/null \
  --write-out 'status=%{http_code} final=%{url_effective} redirects=%{num_redirects} type=%{content_type}\n' \
  'https://replace-with-an-exact-rendered-url'
```

The request result is supporting link evidence only. The table records the
separate browser destination observation and the actual destination type.
