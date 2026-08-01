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

## Destination contract

Every visible link MUST be labeled by its real destination and retain a check
date. `Play in browser` is reserved for a `browser-verified` record with a
current supported-browser, start-to-finish gameplay check. A repository,
download, redirect, historical page, or unknown target MUST use a non-play
label.

## WIP contract

Restaurant Tracker and Football Idle Game MAY be shown with high-level approved
copy and supplied screenshots. They MUST NOT expose private repositories,
unapproved technical details, internal URLs, unfinished details that Davis has
not approved, or a production-readiness claim.

## BBQ App contract

The BBQ App entry MUST use Davis-approved dates, role, Atlanta BBQ Club
relationship, attribution, and contract-safe wording. If any of those inputs is
missing, the entry MUST be deferred or reduced to approved historical context.

## Release contract

Before release, the content source and production build MUST be reviewed for
privacy violations, stale placeholders, unsupported claims, missing status
labels, link health, and inconsistent project dates. Unavailable external state
is recorded as `BLOCKED` or `unavailable`, never silently converted to success.
