import React from 'react';
import {
  experienceItems as defaultExperienceItems,
  profile as defaultProfile,
} from '../content/siteContent';

const ABOUT_FALLBACK =
  'About information is not available yet; no approved profile copy has been published.';
const EXPERIENCE_FALLBACK =
  'No complete public-safe experience entries are available to publish yet.';

function classNames(...names) {
  return names.filter(Boolean).join(' ');
}

function textValue(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const text = value.trim();
  return text || null;
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isCompleteExperienceItem(item) {
  return (
    isRecord(item) &&
    textValue(item.organization) &&
    textValue(item.role) &&
    textValue(item.dateLabel) &&
    textValue(item.summary)
  );
}

function isCurrentFirst(item) {
  return /\b(current|present)\b/i.test(textValue(item.dateLabel) ?? '');
}

function orderedExperience(items) {
  return items
    .filter(isCompleteExperienceItem)
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const currentOrder = Number(isCurrentFirst(right.item)) - Number(isCurrentFirst(left.item));

      return currentOrder || left.index - right.index;
    })
    .map(({ item }) => item);
}

/**
 * The approved About narrative, kept separate so the page shell can place it
 * in its anchored About section without coupling this copy to the layout.
 *
 * @param {object} props
 * @param {object} [props.profile] Approved public profile content.
 * @param {string} [props.className] Additional wrapper class names.
 */
export function AboutSection({ profile = defaultProfile, className = '' } = {}) {
  const profileIsValid = isRecord(profile);
  const thesis = profileIsValid ? textValue(profile.thesis) : null;
  const locationLabel = profileIsValid ? textValue(profile.locationLabel) : null;
  const careerContext = profileIsValid ? textValue(profile.careerContext) : null;

  if (!thesis) {
    return (
      <div className={classNames('prose', className)}>
        <p className="empty-state">{ABOUT_FALLBACK}</p>
      </div>
    );
  }

  return (
    <div className={classNames('prose', className)}>
      <p>{thesis}</p>
      {locationLabel ? <p className="card__meta">Based in {locationLabel}.</p> : null}
      {careerContext ? <p>{careerContext}</p> : null}
    </div>
  );
}

/**
 * Render the approved career subset in current-first order. This component
 * deliberately selects only public contract fields; internal visibility notes
 * remain content-source metadata and never become visitor-facing copy.
 *
 * @param {object} props
 * @param {Array<object>} [props.experience] Approved experience records.
 * @param {Array<object>} [props.items] Alias for callers composing a section.
 * @param {string} [props.className] Additional wrapper class names.
 */
export function ExperienceSection({
  experience = defaultExperienceItems,
  items,
  className = '',
} = {}) {
  const sourceItems = Array.isArray(items) ? items : experience;
  const entries = Array.isArray(sourceItems) ? orderedExperience(sourceItems) : [];

  if (entries.length === 0) {
    return (
      <div className={classNames('empty-state', className)}>
        {EXPERIENCE_FALLBACK}
      </div>
    );
  }

  return (
    <div className={classNames('card-grid', 'card-grid--two', className)}>
      {entries.map((entry, index) => {
        const organization = textValue(entry.organization);
        const role = textValue(entry.role);
        const dateLabel = textValue(entry.dateLabel);
        const summary = textValue(entry.summary);

        return (
          <article
            className="card"
            key={`${organization}-${role}-${dateLabel}-${index}`}
          >
            <div className="card__header">
              <h3 className="card__title">{organization}</h3>
              <div className="card__meta">
                <span>{role}</span>
                <span aria-hidden="true">·</span>
                <span>{dateLabel}</span>
              </div>
            </div>
            <p className="card__summary">{summary}</p>
          </article>
        );
      })}
    </div>
  );
}

export default ExperienceSection;
