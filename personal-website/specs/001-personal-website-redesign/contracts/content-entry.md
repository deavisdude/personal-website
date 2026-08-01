# Public Content and Link Contract

**Feature**: [Davis Odom Personal Website Redesign](../spec.md)
**Model**: [data-model.md](../data-model.md)

This is the public content contract between approved source records and the
website presentation. It is intentionally independent of the eventual visual
framework.

## Profile contract

The rendered profile MUST include an approved name, role label, Georgia/location
phrase, and thesis. It MAY include approved social links, resume link, sports,
University of Georgia, and other semi-personal context. It MUST NOT include a
phone number, personal email, exact location, family detail, or confidential
employer detail.

## Experience contract

Each rendered experience item MUST have an organization, role, date label, and
public-safe summary. Technologies and links are optional evidence, not a license
to infer private architecture or impact metrics.

## Project contract

Each rendered project MUST have:

- a stable title and category;
- a date label and date evidence;
- a summary and Davis-approved role;
- an explicit status;
- attribution when the work is collaborative, contracted, jam-related, or fork
  derived;
- an honest fallback when no current destination or media is available.

Approved archive roles and evidence are represented as follows:

| Project | Approved Davis role | Contract-safe evidence treatment |
| --- | --- | --- |
| BBQ App | `Sole creator` | Archived, text-first account of a TAG student internship partnership with Atlanta BBQ Club; no app URL is invented |
| Support | `Software Engineer` | Two-day SPSU Summer Game Jam project with a team of seven developers; repository and legacy Unity Web Player artifacts remain non-play evidence |
| Flux | `Software Engineer` | 2013 HHS Game Jam at SPSU project and one of five winning submissions; legacy page/build and download remain historical/download evidence |
| Battle of the Masses | `Design and Lead Programmer` | Historical Global Game Jam entry; the supplied video is a reference destination, not a playable build |
| UPBETOD | `Software Engineer` | Public Unity repository with video/project-history references; repository-only status remains non-play evidence |

## Destination contract

Every visible link MUST be labeled by its real destination and retain a check
date. `Play in browser` is reserved for a `browser-verified` record with a
current supported-browser, start-to-finish gameplay check. A repository,
download, video, redirect, historical page, or unknown target MUST use a
non-play label. A resolved YouTube/oEmbed response verifies only that video
metadata is available; it does not verify gameplay.

Legacy Unity Web Player pages MUST use a historical fallback such as “Legacy
Unity Web Player page; historical evidence only.” Legacy `.unity3d` files MUST
use a download fallback such as “Legacy Unity Web Player download; not
browser-playable.” Video records MUST use a video fallback that makes their
reference-only status clear.

## WIP contract

Restaurant Tracker and Football Idle Game MAY be shown with high-level approved
copy and supplied screenshots. They MUST NOT expose private repositories,
unapproved technical details, internal URLs, unfinished details that Davis has
not approved, or a production-readiness claim.

## BBQ App contract

The BBQ App entry MUST use the approved June 2014–April 2015 work range and
the role `Sole creator`. Its public-safe context may state that Davis was
interning at the TAG Atlanta office, attended an Atlanta Tech Village event,
and was hired on the spot through the TAG student internship program by
Atlanta BBQ Club to build its app. The entry MUST retain the TAG student
internship partnership and Atlanta BBQ Club attribution, remain archived and
text-first, and MUST NOT invent an app URL, private source, contact detail, or
unsupported launch/maintenance claim.

## Release contract

Before release, the content source and production build MUST be reviewed for
privacy violations, stale placeholders, unsupported claims, missing status
labels, link health, and inconsistent project dates. Unavailable external state
is recorded as `BLOCKED` or `unavailable`, never silently converted to success.
