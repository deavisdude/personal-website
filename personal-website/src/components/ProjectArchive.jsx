import React from 'react';
import siteContent from '../content/siteContent';
import ProjectCard from './ProjectCard';

const DEFAULT_PROJECTS = Array.isArray(siteContent?.projects)
  ? siteContent.projects
  : [];

const SELECTED_WORK_IDS = new Set([
  'restaurant-tracker',
  'football-idle-game',
]);

const SELECTED_WORK_INTRO =
  'Current unpublished work, shown at a high level. No live demo or production-ready status is implied.';
const ARCHIVE_INTRO =
  'Earlier projects and historical context are kept separate from selected work. These entries are not current production work, and destinations are presented as archive or source evidence rather than live demos.';

const SELECTED_WORK_FALLBACK =
  'No selected work is available to show right now.';
const ARCHIVE_FALLBACK =
  'No archived or historical projects are available to show right now.';

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

function publicAttribution(value) {
  if (typeof value === 'string') {
    return textValue(value);
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const text = textValue(value.text);
  const role = textValue(value.role);
  const entities = stringList(value.entities);

  if (!text && !role && entities.length === 0) {
    return undefined;
  }

  return {
    ...(text ? { text } : {}),
    ...(role ? { role } : {}),
    ...(entities.length > 0 ? { entities } : {}),
  };
}

function publicLinks(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((links, link) => {
    if (!isRecord(link)) {
      return links;
    }

    const url = textValue(link.url);
    const label = textValue(link.label);

    if (!url || !label) {
      return links;
    }

    links.push({
      id: textValue(link.id) ?? url,
      url,
      type: textValue(link.type) ?? 'historical',
      label,
      ...(textValue(link.source) ? { source: textValue(link.source) } : {}),
      ...(textValue(link.status) ? { status: textValue(link.status) } : {}),
      ...(textValue(link.checkedAt)
        ? { checkedAt: textValue(link.checkedAt) }
        : {}),
      ...(textValue(link.fallbackLabel)
        ? { fallbackLabel: textValue(link.fallbackLabel) }
        : {}),
    });

    return links;
  }, []);
}

function publicMedia(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((media, asset) => {
    if (!isRecord(asset)) {
      return media;
    }

    const src = textValue(asset.src);
    const alt = textValue(asset.alt);

    if (!src || !alt) {
      return media;
    }

    media.push({
      src,
      alt,
      ...(textValue(asset.caption)
        ? { caption: textValue(asset.caption) }
        : {}),
      ...(textValue(asset.fallback)
        ? { fallback: textValue(asset.fallback) }
        : {}),
    });

    return media;
  }, []);
}

function publicDateEvidence(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((evidenceItems, evidence) => {
    if (!isRecord(evidence)) {
      return evidenceItems;
    }

    const source = textValue(evidence.source);
    const detail = textValue(evidence.detail);

    if (!source && !detail) {
      return evidenceItems;
    }

    evidenceItems.push({
      ...(source ? { source } : {}),
      ...(detail ? { detail } : {}),
    });
    return evidenceItems;
  }, []);
}

/**
 * Keep source-only approval notes out of the card boundary. ProjectCard gets
 * only the fields that are safe and useful to render publicly.
 */
function publicProject(project) {
  return {
    id: textValue(project.id),
    title: textValue(project.title),
    category: textValue(project.category) ?? 'archive',
    dateLabel: textValue(project.dateLabel) ?? 'Date not provided.',
    summary:
      textValue(project.summary) ??
      'No public summary is available for this project.',
    role: textValue(project.role) ?? 'Role not provided.',
    status: textValue(project.status) ?? 'Status not provided.',
    dateEvidence: publicDateEvidence(project.dateEvidence),
    technologies: stringList(project.technologies),
    attribution: publicAttribution(project.attribution),
    links: publicLinks(project.links),
    media: publicMedia(project.media),
    fallback:
      textValue(project.fallback) ??
      'No public destination or media is available for this project.',
  };
}

function groupProjects(projects) {
  const groups = { selected: [], archive: [] };
  const seenIds = new Set();

  if (!Array.isArray(projects)) {
    return groups;
  }

  projects.forEach((project) => {
    if (!isRecord(project)) {
      return;
    }

    const id = textValue(project.id);
    const title = textValue(project.title);

    if (!id || !title || seenIds.has(id)) {
      return;
    }

    seenIds.add(id);

    const entry = publicProject(project);
    const category = textValue(project.category)?.toLowerCase();
    const group =
      SELECTED_WORK_IDS.has(id) || category === 'wip' ? 'selected' : 'archive';

    groups[group].push(entry);
  });

  return groups;
}

function classNames(...names) {
  return names.filter(Boolean).join(' ');
}

function ProjectGroup({
  id,
  heading,
  intro,
  entries,
  emptyMessage,
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-describedby={`${id}-intro`}
      aria-labelledby={headingId}
      className={classNames('project-archive__section', `project-archive__section--${id}`)}
      id={id}
    >
      <header className="project-archive__header">
        <h3 id={headingId}>{heading}</h3>
        <p id={`${id}-intro`}>{intro}</p>
      </header>

      {entries.length > 0 ? (
        <div className="project-archive__grid">
          {entries.map((entry) => (
            <ProjectCard key={entry.id} project={entry} />
          ))}
        </div>
      ) : (
        <p className="empty-state">{emptyMessage}</p>
      )}
    </section>
  );
}

/**
 * Present selected WIP work separately from the historical archive.
 *
 * @param {object} props
 * @param {Array<object>} [props.projects] Public project entries. Defaults to
 *   the approved site content catalog.
 * @param {string} [props.className] Additional wrapper class names.
 */
function ProjectArchive({ projects = DEFAULT_PROJECTS, className = '' } = {}) {
  const groups = groupProjects(projects);

  return (
    <div className={classNames('project-archive', className)}>
      <ProjectGroup
        emptyMessage={SELECTED_WORK_FALLBACK}
        entries={groups.selected}
        heading="Selected work"
        id="selected-work"
        intro={SELECTED_WORK_INTRO}
      />
      <ProjectGroup
        emptyMessage={ARCHIVE_FALLBACK}
        entries={groups.archive}
        heading="Archive & historical context"
        id="archive"
        intro={ARCHIVE_INTRO}
      />
    </div>
  );
}

export default ProjectArchive;
