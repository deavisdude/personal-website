import React, { useState } from 'react';
import {
  DESTINATION_TYPES,
  LINK_STATUSES,
  getLinkPresentation,
  validateLinkEvidence,
  validatePublicUrl,
} from '../content/projectLinks';

const DEFAULT_TITLE = 'Project context unavailable';
const DEFAULT_SUMMARY =
  'No approved public summary is available for this project yet.';
const DEFAULT_FALLBACK =
  'Text-first project context is available; no public destination or media is available.';

const STATUS_LABELS = Object.freeze({
  'in-progress': 'In progress',
  archived: 'Archived',
  'download-only': 'Download only',
  'repository-only': 'Repository only',
  'historical-link': 'Historical link',
  'browser-verified': 'Browser verified',
});

const DESTINATION_LABELS = Object.freeze({
  [DESTINATION_TYPES.OFFICIAL]: 'Official',
  [DESTINATION_TYPES.REPOSITORY]: 'Repository',
  [DESTINATION_TYPES.DOWNLOAD]: 'Download',
  [DESTINATION_TYPES.DEMO]: 'Demo',
  [DESTINATION_TYPES.HISTORICAL]: 'Historical',
  [DESTINATION_TYPES.SOCIAL]: 'Social',
  [DESTINATION_TYPES.VIDEO]: 'Video',
});

const MEDIA_PRIVATE_PATTERN =
  /(?:private|internal|secret|token|password|credential|\.env|node_modules)/i;

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function textValue(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const text = value.trim();
  return text || null;
}

function stringList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(textValue).filter(Boolean);
}

function humanize(value, fallback = 'Not provided') {
  const text = textValue(value);
  if (!text) {
    return fallback;
  }

  return (
    STATUS_LABELS[text] ??
    text
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

function attributionText(attribution) {
  if (typeof attribution === 'string') {
    return textValue(attribution);
  }

  if (!isRecord(attribution)) {
    return null;
  }

  const text = textValue(attribution.text);
  const role = textValue(attribution.role);
  const entities = stringList(attribution.entities);

  return [
    text,
    role && role !== text ? `Role: ${role}` : null,
    entities.length > 0 ? `With ${entities.join(', ')}` : null,
  ]
    .filter(Boolean)
    .join(' ');
}

function dateEvidenceItems(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((items, evidence) => {
    if (!isRecord(evidence)) {
      return items;
    }

    const detail = textValue(evidence.detail);
    const source = textValue(evidence.source);

    if (!detail && !source) {
      return items;
    }

    items.push({ detail, source });
    return items;
  }, []);
}

function isPublicMediaSource(value) {
  const source = textValue(value);
  if (!source || MEDIA_PRIVATE_PATTERN.test(source)) {
    return false;
  }

  if (/^https?:\/\//i.test(source)) {
    return validatePublicUrl(source).valid;
  }

  // Approved screenshots are local public assets. Reject protocol-relative,
  // data, and other opaque sources so a content mistake cannot embed a secret.
  return /^(?:\.?\.?\/|\/)(?!\/)/.test(source);
}

function publicMediaItems(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((items, asset, index) => {
    if (!isRecord(asset)) {
      return items;
    }

    const src = textValue(asset.src);
    const alt = textValue(asset.alt);

    if (!isPublicMediaSource(src) || !alt) {
      return items;
    }

    items.push({
      id: textValue(asset.id) ?? `${src}-${index}`,
      src,
      alt,
      caption: textValue(asset.caption),
      fallback: textValue(asset.fallback),
    });
    return items;
  }, []);
}

function publicProject(project) {
  if (!isRecord(project)) {
    return {
      id: null,
      title: DEFAULT_TITLE,
      category: 'archive',
      dateLabel: 'Date not provided',
      summary: DEFAULT_SUMMARY,
      role: 'Role not provided',
      status: 'archived',
      technologies: [],
      attribution: null,
      dateEvidence: [],
      links: [],
      media: [],
      fallback: DEFAULT_FALLBACK,
    };
  }

  return {
    id: textValue(project.id),
    title: textValue(project.title) ?? DEFAULT_TITLE,
    category: textValue(project.category) ?? 'archive',
    dateLabel: textValue(project.dateLabel) ?? 'Date not provided',
    summary: textValue(project.summary) ?? DEFAULT_SUMMARY,
    role: textValue(project.role) ?? 'Role not provided',
    status: textValue(project.status) ?? 'archived',
    technologies: stringList(project.technologies),
    attribution: attributionText(project.attribution),
    dateEvidence: dateEvidenceItems(project.dateEvidence),
    links: Array.isArray(project.links) ? project.links : [],
    media: publicMediaItems(project.media),
    fallback: textValue(project.fallback) ?? DEFAULT_FALLBACK,
  };
}

function statusClassName(value) {
  const normalized = textValue(value)?.toLowerCase() ?? '';
  if (/browser-verified|in-progress/.test(normalized)) {
    return 'status-badge--current';
  }
  if (/unavailable|blocked/.test(normalized)) {
    return 'status-badge--unavailable';
  }
  return 'status-badge--historical';
}

function linkStatusClassName(value) {
  const normalized = textValue(value)?.toLowerCase() ?? '';
  if (normalized === LINK_STATUSES.VERIFIED) {
    return 'status-badge--verified';
  }
  if (
    normalized === LINK_STATUSES.UNAVAILABLE ||
    normalized === LINK_STATUSES.BLOCKED
  ) {
    return 'status-badge--unavailable';
  }
  return 'status-badge--unverified';
}

function linkIsUnavailable(link) {
  return [LINK_STATUSES.UNAVAILABLE, LINK_STATUSES.BLOCKED].includes(
    textValue(link?.status)?.toLowerCase(),
  );
}

function ProjectLink({ link, project }) {
  const validation = validateLinkEvidence(link);
  const presentation = getLinkPresentation(link, project);
  const status = textValue(link?.status)?.toLowerCase() ?? null;
  const type = textValue(link?.type)?.toLowerCase() ?? null;
  const isUnavailable = linkIsUnavailable(link) || !validation.valid;
  const destinationLabel = DESTINATION_LABELS[type] ?? humanize(type, 'Link');
  const statusLabel = humanize(status, 'Status not provided');
  const fallbackLabel = presentation.fallbackLabel ?? textValue(link?.fallbackLabel);

  return (
    <li className="project-card__link-item">
      <div className="project-card__link-line">
        {isUnavailable || !presentation.url ? (
          <span className="project-card__link project-card__link--unavailable">
            {presentation.label}
          </span>
        ) : (
          <a
            className="button button--quiet project-card__link"
            href={presentation.url}
            rel="noreferrer noopener"
            target="_blank"
          >
            {presentation.label}
          </a>
        )}
        <span className="tag">{destinationLabel}</span>
        <span className={`status-badge ${linkStatusClassName(status)}`}>
          {statusLabel}
        </span>
      </div>
      {!presentation.playable && fallbackLabel ? (
        <p className="project-card__link-note">{fallbackLabel}</p>
      ) : null}
    </li>
  );
}

/**
 * Render a project using only public-safe fields and conservative destination
 * rules. A successful URL, repository, video, or download never becomes a
 * play control without explicit browser-verified evidence.
 */
function ProjectCard({ project } = {}) {
  const resolvedProject = publicProject(project);
  const [failedMediaIds, setFailedMediaIds] = useState(() => new Set());
  const visibleMedia = resolvedProject.media.filter(
    (asset) => !failedMediaIds.has(asset.id),
  );
  const mediaFallback =
    resolvedProject.media.find((asset) => failedMediaIds.has(asset.id))?.fallback ??
    resolvedProject.fallback;
  const categoryLabel = humanize(resolvedProject.category, 'Archive');
  const statusLabel = humanize(resolvedProject.status, 'Status not provided');
  const links = resolvedProject.links.filter(
    (link) => isRecord(link) && textValue(link.label),
  );

  const markMediaFailed = (mediaId) => {
    setFailedMediaIds((current) => {
      const next = new Set(current);
      next.add(mediaId);
      return next;
    });
  };

  return (
    <article className="card project-card" data-project-id={resolvedProject.id ?? undefined}>
      <div className="card__header">
        <div className="project-card__eyebrow cluster">
          <span className="tag">{categoryLabel}</span>
          <span className={`status-badge ${statusClassName(resolvedProject.status)}`}>
            {statusLabel}
          </span>
        </div>
        <h3 className="card__title">{resolvedProject.title}</h3>
        <dl className="project-card__meta-grid">
          <div>
            <dt>Role</dt>
            <dd>{resolvedProject.role}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{resolvedProject.dateLabel}</dd>
          </div>
        </dl>
      </div>

      {visibleMedia.length > 0 ? (
        <div className="project-card__media-list" aria-label="Project media">
          {visibleMedia.map((asset) => (
            <figure className="card__media project-card__media" key={asset.id}>
              <img
                alt={asset.alt}
                onError={() => markMediaFailed(asset.id)}
                src={asset.src}
              />
              {asset.caption ? <figcaption>{asset.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : (
        <p className="media-fallback project-card__media-fallback">
          {mediaFallback}
        </p>
      )}

      <p className="card__summary">{resolvedProject.summary}</p>

      {resolvedProject.attribution ? (
        <p className="project-card__detail">
          <strong>Attribution:</strong> {resolvedProject.attribution}
        </p>
      ) : null}

      {resolvedProject.technologies.length > 0 ? (
        <div className="project-card__detail">
          <strong>Technology:</strong>
          <ul className="tag-list project-card__technology-list">
            {resolvedProject.technologies.map((technology) => (
              <li className="tag" key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {resolvedProject.dateEvidence.length > 0 ? (
        <div className="project-card__evidence">
          <strong>Date evidence</strong>
          <ul>
            {resolvedProject.dateEvidence.map((evidence, index) => (
              <li key={`${evidence.source ?? 'evidence'}-${index}`}>
                {evidence.detail ?? evidence.source}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="project-card__resources">
        <h4>Destinations</h4>
        {links.length > 0 ? (
          <ul className="link-list project-card__links">
            {links.map((link) => (
              <ProjectLink key={link.id ?? link.url ?? link.label} link={link} project={resolvedProject} />
            ))}
          </ul>
        ) : (
          <p className="project-card__fallback">{resolvedProject.fallback}</p>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
