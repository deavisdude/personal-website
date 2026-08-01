# Data Model: Davis Odom Personal Website Redesign

**Feature**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

The site has no visitor-owned data. These entities describe the approved public
content records that the presentation consumes.

## Profile

Represents the public identity shown in the opening, About section, and footer.

| Field | Required | Rules |
| --- | --- | --- |
| `name` | yes | Approved public name |
| `roleLabel` | yes | Approved role wording; no inflated seniority claim |
| `thesis` | yes | One concise, human-readable statement |
| `locationLabel` | yes | Broad phrasing such as Georgia or metro Atlanta; never exact location |
| `careerContext` | yes | High-level current context; employer-safe |
| `interests` | optional | Approved Georgia/UGA/Braves or other semi-personal details |
| `socialLinks` | optional | Public destinations only; each has link evidence |
| `resumeLink` | optional | Included only after a safe public copy is approved |

## Experience Item

Represents a current-first career entry, shorter than a full resume.

| Field | Required | Rules |
| --- | --- | --- |
| `organization` | yes | Public organization name if approved |
| `role` | yes | Davis-approved role label |
| `dateLabel` | yes | Broad or precise date range supported |
| `summary` | yes | Public-safe responsibilities and impact; no invented metrics |
| `technologies` | optional | Only public, meaningful, and approved technologies |
| `links` | optional | Public evidence only |
| `visibilityNotes` | optional | Internal review note; never rendered publicly |

## Project Entry

Represents a selected project or archive item.

| Field | Required | Rules |
| --- | --- | --- |
| `id` | yes | Stable content identifier |
| `title` | yes | Public title approved by Davis |
| `category` | yes | `wip`, `game-jam`, `professional-project`, or `archive` |
| `dateLabel` | yes | Visitor-facing event or work range |
| `dateEvidence` | yes | Source distinction for event/profile/repository dates |
| `summary` | yes | Honest outcome-oriented description |
| `role` | yes | Solo, team, engineering, contract, or other approved role |
| `status` | yes | One of the status values below |
| `technologies` | optional | Public and approved only |
| `attribution` | optional | Teammates, organizers, clubs, collaborators, or fork provenance |
| `links` | optional | Zero or more Link Evidence records |
| `media` | optional | Approved Media Asset records |
| `visibilityNotes` | optional | Source-private approval notes; never rendered |

### Project status values

- `in-progress`: current work whose details remain high-level
- `archived`: historical context with no current availability promise
- `download-only`: a user can reach a downloadable build, not browser play
- `repository-only`: a public repository is the available destination
- `historical-link`: a historical destination is retained but not currently
  verified as a live project experience
- `browser-verified`: the exact build passed the supported-browser gameplay check

## Link Evidence

Represents why a destination is safe and how the visitor should understand it.

| Field | Required | Rules |
| --- | --- | --- |
| `id` | yes | Stable content identifier; lowercase kebab-case is preferred and IDs must not be reused for a different destination |
| `url` | yes | Public URL only; no private source or secret-bearing URL |
| `type` | yes | `official`, `repository`, `download`, `demo`, `historical`, `social`, or `video` |
| `label` | yes | Describes the actual destination, not an aspirational one |
| `source` | yes | Repository, event page, profile, or user-approved source |
| `status` | yes | `verified`, `redirected`, `unavailable`, `unverified`, or `blocked` |
| `checkedAt` | yes | Date the destination was checked, including when the result is unverified, blocked, redirected, or unavailable |
| `fallbackLabel` | conditional | Required when status is not verified or destination is not a demo |

`video` is a reference destination for a hosted recording such as YouTube. It
may document a project, but it is not a playable build and must retain a
non-play fallback label even when the video URL resolves. Legacy Unity Web
Player HTML pages are `historical`; `.unity3d` artifacts and other downloadable
legacy builds are `download`. Neither type establishes current browser
playability.

## Media Asset

Represents an optional project screenshot or approved visual.

| Field | Required | Rules |
| --- | --- | --- |
| `src` | yes | Public asset path or approved public URL |
| `alt` | yes | Meaningful description; never blank for informative media |
| `caption` | optional | Honest context and date if useful |
| `rightsNote` | yes | Approval/ownership record retained in source documentation |
| `fallback` | yes | Text treatment when the asset is missing or fails |

## Invariants

1. A `browser-verified` status requires a matching Link Evidence record with
   current-browser evidence; no other status can render a play control.
2. A `wip` entry cannot expose a private repository, internal URL, secret-bearing
   asset path, or unapproved implementation detail.
3. Every public date is either sourced, explicitly approximate, or presented as
   a broad range; repository activity is never silently substituted for event
   date.
4. Every collaborative or fork-derived entry has attribution before publication.
5. A missing link or media asset never removes the project's title, summary,
   role, status, and honest fallback.
6. A `video`, `historical`, or `download` record is reference/archive evidence
   only; it cannot be used to infer `browser-verified` status.
