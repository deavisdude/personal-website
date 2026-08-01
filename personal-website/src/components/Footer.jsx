import React from 'react';
import { profile as fallbackProfile } from '../content/siteContent';

const DEFAULT_HEADING = 'Personal context';
const DEFAULT_PERSONAL_NOTE =
  'Davis is a software engineer from Georgia who enjoys building tools, games, and experiments.';
const SOCIAL_NAV_LABEL = 'Social links';
const PUBLIC_LINKS_HEADING = 'Public links';
const INTERESTS_HEADING = 'Interests';

const APPROVED_RESUME_TYPES = new Set([
  'document',
  'download',
  'official',
  'resume',
]);

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function asTrimmedText(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function isSafePublicCopy(value) {
  const text = asTrimmedText(value);

  if (!text) {
    return null;
  }

  if (
    /(?:https?:\/\/|mailto:|tel:)/i.test(text) ||
    /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(text) ||
    /(?:\+?\d[\d\s().-]{6,}\d)/.test(text)
  ) {
    return null;
  }

  return text;
}

function valueFromProfile(source, fallback, key) {
  if (Object.prototype.hasOwnProperty.call(source, key)) {
    return source[key];
  }

  return fallback?.[key];
}

function publicHttpUrl(value) {
  const candidate = asTrimmedText(value);

  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    const hostname = parsed.hostname.toLowerCase();

    if (
      !['http:', 'https:'].includes(parsed.protocol) ||
      !hostname ||
      parsed.username ||
      parsed.password ||
      hostname === 'localhost' ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]'
    ) {
      return null;
    }
  } catch {
    return null;
  }

  return candidate;
}

function normalizeSocialLinks(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((links, link) => {
    if (!isRecord(link) || link.type !== 'social') {
      return links;
    }

    const label = isSafePublicCopy(link.label);
    const href = publicHttpUrl(link.url);

    if (!label || !href) {
      return links;
    }

    links.push({
      href,
      id: asTrimmedText(link.id),
      label,
    });

    return links;
  }, []);
}

function normalizeInterest(value) {
  if (typeof value === 'string') {
    const text = isSafePublicCopy(value);
    return text ? { label: null, text } : null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const text = isSafePublicCopy(
    value.text ?? value.value ?? value.label ?? value.name ?? value.title,
  );
  const label = isSafePublicCopy(value.label);

  return text ? { label: label === text ? null : label, text } : null;
}

function normalizeInterests(value) {
  const candidates = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? [value]
      : [];

  return candidates.reduce((interests, candidate) => {
    const interest = normalizeInterest(candidate);

    if (
      interest &&
      !interests.some((existingInterest) => existingInterest.text === interest.text)
    ) {
      interests.push(interest);
    }

    return interests;
  }, []);
}

function personalNoteCandidates(source, fallback) {
  const sourcePersonal = isRecord(source.personal) ? source.personal : {};
  const fallbackPersonal = isRecord(fallback.personal) ? fallback.personal : {};

  return [
    source.personalNote,
    sourcePersonal.note,
    source.note,
    fallback.personalNote,
    fallbackPersonal.note,
    fallback.note,
  ];
}

function resolvePersonalNote(source, fallback) {
  for (const candidate of personalNoteCandidates(source, fallback)) {
    const note = isSafePublicCopy(candidate);

    if (note) {
      return note;
    }
  }

  return DEFAULT_PERSONAL_NOTE;
}

function resolveInterests(source, fallback) {
  const sourcePersonal = isRecord(source.personal) ? source.personal : {};
  const fallbackPersonal = isRecord(fallback.personal) ? fallback.personal : {};
  const interests = Object.prototype.hasOwnProperty.call(source, 'interests')
    ? source.interests
    : Object.prototype.hasOwnProperty.call(sourcePersonal, 'interests')
      ? sourcePersonal.interests
      : Object.prototype.hasOwnProperty.call(fallback, 'interests')
        ? fallback.interests
        : fallbackPersonal.interests;

  return normalizeInterests(interests);
}

function isSafeResumeLink(value) {
  if (!isRecord(value)) {
    return null;
  }

  const label = isSafePublicCopy(value.label);
  const href = publicHttpUrl(value.url);
  const type = asTrimmedText(value.type)?.toLowerCase();
  const status = asTrimmedText(value.status)?.toLowerCase();
  const hasPublicApproval =
    value.approved === true ||
    value.isPublic === true ||
    value.public === true ||
    value.safe === true ||
    status === 'approved' ||
    status === 'verified';

  if (
    !label ||
    !href ||
    !hasPublicApproval ||
    (type && !APPROVED_RESUME_TYPES.has(type))
  ) {
    return null;
  }

  return {
    href,
    label,
  };
}

function resolveProfile(profile) {
  const source = isRecord(profile) ? profile : {};
  const fallback = isRecord(fallbackProfile) ? fallbackProfile : {};
  const socialLinks = normalizeSocialLinks(
    valueFromProfile(source, fallback, 'socialLinks'),
  );
  const resumeLink = isSafeResumeLink(
    valueFromProfile(source, fallback, 'resumeLink'),
  );

  return {
    interests: resolveInterests(source, fallback),
    personalNote: resolvePersonalNote(source, fallback),
    resumeLink,
    socialLinks,
  };
}

/**
 * Footer content for the shell's existing footer landmark.
 *
 * This component intentionally renders a div rather than another footer
 * element so the page keeps one clear contentinfo landmark from SiteShell.
 *
 * @param {object} props
 * @param {object} [props.profile] Approved public profile data.
 */
function Footer({ profile }) {
  const resolvedProfile = resolveProfile(profile);
  const headingId = 'site-footer-heading';
  const interestsHeadingId = `${headingId}-interests`;
  const linksHeadingId = `${headingId}-links`;

  return (
    <div aria-labelledby={headingId} className="footer">
      <div className="footer__header section__header">
        <p className="footer__eyebrow section__eyebrow">Beyond the work</p>
        <h2 className="footer__title section__title" id={headingId}>
          {DEFAULT_HEADING}
        </h2>
        <p className="footer__note section__intro">
          {resolvedProfile.personalNote}
        </p>
      </div>

      {resolvedProfile.interests.length > 0 ? (
        <section
          aria-labelledby={interestsHeadingId}
          className="footer__section"
        >
          <h3 className="footer__section-title" id={interestsHeadingId}>
            {INTERESTS_HEADING}
          </h3>
          <ul className="footer__interest-list tag-list">
            {resolvedProfile.interests.map((interest) => (
              <li className="tag" key={interest.text}>
                {interest.label ? (
                  <>
                    <span className="footer__interest-label">
                      {interest.label}:
                    </span>{' '}
                    <span>{interest.text}</span>
                  </>
                ) : (
                  interest.text
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resolvedProfile.socialLinks.length > 0 || resolvedProfile.resumeLink ? (
        <section aria-labelledby={linksHeadingId} className="footer__section">
          <h3 className="footer__section-title" id={linksHeadingId}>
            {PUBLIC_LINKS_HEADING}
          </h3>

          {resolvedProfile.socialLinks.length > 0 ? (
            <nav aria-label={SOCIAL_NAV_LABEL} className="footer__social">
              <ul className="footer__link-list link-list link-list--inline">
                {resolvedProfile.socialLinks.map((link, index) => (
                  <li key={link.id || `${link.href}-${index}`}>
                    <a
                      aria-label={`${link.label} in footer`}
                      className="footer__link text-link"
                      href={link.href}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {resolvedProfile.resumeLink ? (
            <p className="footer__resume">
              <a
                className="footer__link text-link"
                href={resolvedProfile.resumeLink.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                {resolvedProfile.resumeLink.label}
              </a>
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}

export default Footer;
