import React, { useState } from 'react';
import { profile as fallbackProfile } from '../content/siteContent';

const DEFAULT_PROFILE_IMAGE = {
  src: '/assets/davis-odom-profile.jpg',
  alt: 'Davis Odom smiling in a white shirt and orange apron.',
  fallback: 'Davis Odom profile photo unavailable.',
};

const DEFAULT_PROFILE = {
  name: 'Davis Odom',
  roleLabel: 'Senior Software Engineer',
  thesis:
    'I’m a software engineer from Georgia who builds tools, games, simulations and anything else that inspires me.',
  locationLabel: 'Georgia, USA',
  careerContext:
    'Current software-engineering and developer-tools context at The Home Depot.',
  profileImage: DEFAULT_PROFILE_IMAGE,
  socialLinks: [],
};

function textOrFallback(value, fallback) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function publicImageSource(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const source = value.trim();

  if (
    !source ||
    /(?:private|internal|secret|token|password|credential|\.env|node_modules)/i.test(
      source,
    )
  ) {
    return null;
  }

  if (/^https?:\/\//i.test(source)) {
    return source;
  }

  return /^(?:\.?\.?\/|\/)(?!\/)/.test(source) ? source : null;
}

function resolveProfileImage(source, fallback) {
  const candidate =
    source.profileImage === undefined
      ? fallback?.profileImage ?? DEFAULT_PROFILE.profileImage
      : source.profileImage;

  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    return null;
  }

  const src = publicImageSource(candidate.src);
  const alt = textOrFallback(candidate.alt, 'Profile photo');

  if (!src) {
    return null;
  }

  return {
    src,
    alt,
    fallback: textOrFallback(
      candidate.fallback,
      `${textOrFallback(source.name, DEFAULT_PROFILE.name)} profile photo unavailable.`,
    ),
  };
}

function resolveProfile(profile) {
  const source = profile && typeof profile === 'object' ? profile : {};

  return {
    name: textOrFallback(
      source.name,
      textOrFallback(fallbackProfile?.name, DEFAULT_PROFILE.name),
    ),
    roleLabel: textOrFallback(
      source.roleLabel,
      textOrFallback(fallbackProfile?.roleLabel, DEFAULT_PROFILE.roleLabel),
    ),
    thesis: textOrFallback(
      source.thesis,
      textOrFallback(fallbackProfile?.thesis, DEFAULT_PROFILE.thesis),
    ),
    locationLabel: textOrFallback(
      source.locationLabel,
      textOrFallback(
        fallbackProfile?.locationLabel,
        DEFAULT_PROFILE.locationLabel,
      ),
    ),
    careerContext: textOrFallback(
      source.careerContext,
      textOrFallback(
        fallbackProfile?.careerContext,
        DEFAULT_PROFILE.careerContext,
      ),
    ),
    profileImage: resolveProfileImage(source, fallbackProfile),
    socialLinks: Array.isArray(source.socialLinks) ? source.socialLinks : [],
  };
}

function profileInitials(name) {
  const initials = textOrFallback(name, DEFAULT_PROFILE.name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || 'DO';
}

function ProfilePortrait({ image, name }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!image || imageFailed) {
    return (
      <div
        aria-label={image?.fallback || `${name} profile photo unavailable.`}
        className="identity-rail__portrait identity-rail__portrait--fallback"
        role="img"
      >
        <span aria-hidden="true">{profileInitials(name)}</span>
      </div>
    );
  }

  return (
    <div className="identity-rail__portrait">
      <img
        alt={image.alt}
        decoding="async"
        fetchPriority="high"
        loading="eager"
        onError={() => setImageFailed(true)}
        src={image.src}
      />
    </div>
  );
}

function isPublicSocialLink(link) {
  if (!link || typeof link !== 'object' || link.type !== 'social') {
    return false;
  }

  const label = typeof link.label === 'string' ? link.label.trim() : '';
  const url = typeof link.url === 'string' ? link.url.trim() : '';

  if (!label || !url) {
    return false;
  }

  try {
    const protocol = new URL(url).protocol;
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

function navigationHref(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const explicitHref = typeof item.href === 'string' ? item.href.trim() : '';
  if (explicitHref) {
    return explicitHref;
  }

  const targetId =
    typeof item.targetId === 'string'
      ? item.targetId.trim()
      : typeof item.sectionId === 'string'
        ? item.sectionId.trim()
        : '';

  return targetId ? `#${targetId.replace(/^#+/, '')}` : null;
}

function navigationItems(navigation) {
  if (!Array.isArray(navigation)) {
    return [];
  }

  return navigation.reduce((items, item, index) => {
    const label = typeof item?.label === 'string' ? item.label.trim() : '';
    const href = navigationHref(item);

    if (!label || !href) {
      return items;
    }

    items.push({
      id: item.id || `identity-navigation-${index + 1}`,
      label,
      href,
    });
    return items;
  }, []);
}

/**
 * Public identity content for the opening view.
 *
 * @param {object} props
 * @param {object} [props.profile] Approved public profile data.
 * @param {Array<object>} [props.navigation] Optional static section links.
 *   Active-section feedback belongs to the page shell/navigation owner.
 * @param {string} [props.navigationLabel] Accessible label for the optional nav.
 * @param {string} [props.id] Section id for the identity rail.
 */
function IdentityRail({
  profile,
  navigation = [],
  navigationLabel = 'Section navigation',
  id = 'identity-rail',
}) {
  const resolvedProfile = resolveProfile(profile);
  const socialLinks = resolvedProfile.socialLinks.filter(isPublicSocialLink);
  const resolvedNavigation = navigationItems(navigation);
  const headingId = `${id}-name`;

  return (
    <section aria-labelledby={headingId} className="identity-rail" id={id}>
      {resolvedProfile.profileImage ? (
        <ProfilePortrait
          image={resolvedProfile.profileImage}
          name={resolvedProfile.name}
        />
      ) : null}
      <p className="identity-rail__eyebrow">{resolvedProfile.locationLabel}</p>
      <h1 className="identity-rail__name" id={headingId}>
        {resolvedProfile.name}
      </h1>
      <p className="identity-rail__role">{resolvedProfile.roleLabel}</p>
      <p className="identity-rail__thesis">{resolvedProfile.thesis}</p>
      <p className="identity-rail__career-context">
        {resolvedProfile.careerContext}
      </p>

      {socialLinks.length > 0 ? (
        <ul className="identity-rail__social-links link-list">
          {socialLinks.map((link) => (
            <li key={link.id || link.url}>
              <a
                className="text-link"
                href={link.url.trim()}
                rel="noreferrer noopener"
                target="_blank"
              >
                {link.label.trim()}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {resolvedNavigation.length > 0 ? (
        <nav aria-label={navigationLabel} className="identity-rail__navigation">
          <ul className="site-nav site-nav--stacked">
            {resolvedNavigation.map((item) => (
              <li key={item.id}>
                <a className="site-nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}

export default IdentityRail;
