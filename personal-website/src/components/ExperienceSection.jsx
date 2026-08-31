import React, { useEffect, useRef, useState } from 'react';
import {
  experienceItems as defaultExperienceItems,
  profile as defaultProfile,
} from '../content/siteContent';

const ABOUT_FALLBACK =
  'About information is not available yet; no approved profile copy has been published.';
const EXPERIENCE_FALLBACK =
  'No complete public-safe experience entries are available to publish yet.';

const EASTER_EGG_TOOLS = Object.freeze([
  { emoji: '🔨', label: 'Hammer' },
  { emoji: '🔧', label: 'Wrench' },
  { emoji: '🪛', label: 'Screwdriver' },
  { emoji: '🪚', label: 'Saw' },
  { emoji: '🧰', label: 'Toolbox' },
  { emoji: '⚙️', label: 'Gear' },
  { emoji: '🛠️', label: 'Hammer and wrench' },
  { emoji: '⛏️', label: 'Pickaxe' },
  { emoji: '🔩', label: 'Nut and bolt' },
  { emoji: '🧲', label: 'Magnet' },
  { label: 'Homer', src: '/assets/home-depot-homer.png' },
  { label: 'Tool Race: Drill', src: '/assets/tool-race-drill.png' },
  { label: 'Tool Race: Hammer', src: '/assets/tool-race-hammer.png' },
  { label: 'Tool Race: Bucket', src: '/assets/tool-race-bucket.png' },
  { label: 'Tool Race: Brush', src: '/assets/tool-race-brush.png' },
  {
    label: 'Tool Race: Hammer tips bucket',
    src: '/assets/tool-race-hammer-tips-bucket.png',
  },
]);

const EASTER_EGG_COLLIDERS = 'header, aside, footer, .card';
const PARTICLE_RADIUS = 24;
const MAX_PARTICLES = 24;
const PARTICLE_MAX_AGE = 8000;
const ANGULAR_FRICTION = 0.94;
const SETTLED_MOVEMENT_THRESHOLD = 55;
const SETTLED_FADE_DELAY = 1500;
const SETTLED_LIFETIME = 2000;

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

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomTool() {
  return EASTER_EGG_TOOLS[
    Math.floor(Math.random() * EASTER_EGG_TOOLS.length)
  ];
}

function visibleRect(element) {
  const rect = element.getBoundingClientRect();

  if (
    rect.width === 0 ||
    rect.height === 0 ||
    rect.right <= 0 ||
    rect.bottom <= 0 ||
    rect.left >= window.innerWidth ||
    rect.top >= window.innerHeight
  ) {
    return null;
  }

  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function uiColliders(trigger) {
  const elements = Array.from(
    document.querySelectorAll(EASTER_EGG_COLLIDERS),
  ).filter((element) => element !== trigger && !element.contains(trigger));

  return elements.filter(
    (element) => !elements.some((parent) => parent !== element && parent.contains(element)),
  );
}

function overlaps(particle, rect) {
  return (
    particle.x + PARTICLE_RADIUS > rect.left &&
    particle.x - PARTICLE_RADIUS < rect.right &&
    particle.y + PARTICLE_RADIUS > rect.top &&
    particle.y - PARTICLE_RADIUS < rect.bottom
  );
}

function createParticle(x, y, colliders) {
  const tool = randomTool();

  return {
    ax: randomBetween(-140, 140),
    colliders,
    createdAt: performance.now(),
    emoji: tool.emoji,
    gravity: randomBetween(720, 1080),
    id: `${Date.now()}-${Math.random()}`,
    label: tool.label,
    opacity: 1,
    rotation: randomBetween(-20, 20),
    src: tool.src,
    angularVelocity: randomBetween(-260, 260),
    settledAt: null,
    vx: randomBetween(-360, 360),
    vy: randomBetween(-720, -420),
    x,
    y,
  };
}

function stepParticle(particle, deltaTime, now) {
  if (now - particle.createdAt >= PARTICLE_MAX_AGE) {
    return null;
  }

  const previousX = particle.x;
  const previousY = particle.y;
  const width = Math.max(window.innerWidth, PARTICLE_RADIUS * 2);
  const height = Math.max(window.innerHeight, PARTICLE_RADIUS * 2);

  particle.vx += particle.ax * deltaTime;
  particle.vy += particle.gravity * deltaTime;
  particle.angularVelocity *= ANGULAR_FRICTION ** (deltaTime * 60);
  particle.x += particle.vx * deltaTime;
  particle.y += particle.vy * deltaTime;
  particle.rotation += particle.angularVelocity * deltaTime;

  if (particle.x - PARTICLE_RADIUS < 0) {
    particle.x = PARTICLE_RADIUS;
    particle.vx = Math.abs(particle.vx) * 0.68;
  } else if (particle.x + PARTICLE_RADIUS > width) {
    particle.x = width - PARTICLE_RADIUS;
    particle.vx = -Math.abs(particle.vx) * 0.68;
  }

  if (particle.y - PARTICLE_RADIUS < 0) {
    particle.y = PARTICLE_RADIUS;
    particle.vy = Math.abs(particle.vy) * 0.68;
  }

  for (const element of particle.colliders) {
    const rect = visibleRect(element);

    if (!rect || !overlaps(particle, rect)) {
      continue;
    }

    const fromTop = previousY + PARTICLE_RADIUS <= rect.top;
    const fromBottom = previousY - PARTICLE_RADIUS >= rect.bottom;
    const fromLeft = previousX + PARTICLE_RADIUS <= rect.left;
    const fromRight = previousX - PARTICLE_RADIUS >= rect.right;

    if (fromTop && particle.vy >= 0) {
      if (particle.vy > SETTLED_MOVEMENT_THRESHOLD) {
        particle.y = rect.top - PARTICLE_RADIUS;
        particle.vy = -Math.abs(particle.vy) * 0.68;
      }
    } else if (fromBottom && particle.vy <= 0) {
      particle.y = rect.bottom + PARTICLE_RADIUS;
      particle.vy = Math.abs(particle.vy) * 0.68;
    } else if (fromLeft && particle.vx >= 0) {
      particle.x = rect.left - PARTICLE_RADIUS;
      particle.vx = -Math.abs(particle.vx) * 0.68;
    } else if (fromRight && particle.vx <= 0) {
      particle.x = rect.right + PARTICLE_RADIUS;
      particle.vx = Math.abs(particle.vx) * 0.68;
    }
  }

  if (particle.y + PARTICLE_RADIUS > height) {
    particle.y = height - PARTICLE_RADIUS;
    particle.vx *= 0.86;
    particle.vy =
      Math.abs(particle.vy) > SETTLED_MOVEMENT_THRESHOLD
        ? -Math.abs(particle.vy) * 0.32
        : 0;
  }

  const isSettled =
    particle.y + PARTICLE_RADIUS >= height - 1 &&
    Math.abs(particle.vx) < SETTLED_MOVEMENT_THRESHOLD &&
    Math.abs(particle.vy) < SETTLED_MOVEMENT_THRESHOLD;

  particle.settledAt = isSettled ? particle.settledAt ?? now : null;

  if (particle.settledAt !== null) {
    const settledFor = now - particle.settledAt;
    particle.opacity = Math.max(
      0,
      1 - Math.max(0, settledFor - SETTLED_FADE_DELAY) / (SETTLED_LIFETIME - SETTLED_FADE_DELAY),
    );

    if (settledFor >= SETTLED_LIFETIME) {
      return null;
    }
  } else {
    particle.opacity = 1;
  }

  return particle;
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
  const personalNote = profileIsValid ? textValue(profile.personalNote) : null;

  if (!personalNote) {
    return (
      <div className={classNames('prose', className)}>
        <p className="empty-state">{ABOUT_FALLBACK}</p>
      </div>
    );
  }

  return (
    <div className={classNames('prose', className)}>
      <p>{personalNote}</p>
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
  const [particles, setParticles] = useState([]);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const lastFrameRef = useRef(0);
  const sourceItems = Array.isArray(items) ? items : experience;
  const entries = Array.isArray(sourceItems) ? orderedExperience(sourceItems) : [];

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const animate = (now) => {
    const deltaTime = Math.min(
      (now - (lastFrameRef.current || now)) / 1000,
      0.035,
    );
    lastFrameRef.current = now;

    const nextParticles = particlesRef.current
      .map((particle) => stepParticle(particle, deltaTime, now))
      .filter(Boolean);

    particlesRef.current = nextParticles;
    setParticles(nextParticles);

    if (nextParticles.length > 0) {
      animationFrameRef.current = window.requestAnimationFrame(animate);
    } else {
      animationFrameRef.current = null;
    }
  };

  const startAnimation = () => {
    if (animationFrameRef.current === null) {
      lastFrameRef.current = 0;
      animationFrameRef.current = window.requestAnimationFrame(animate);
    }
  };

  const spawnHomeDepotTool = (event) => {
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const trigger = event.currentTarget;
    const triggerRect = trigger.getBoundingClientRect();
    const spawnX =
      event.type === 'click'
        ? event.clientX
        : triggerRect.left + triggerRect.width / 2;
    const spawnY =
      event.type === 'click'
        ? event.clientY
        : triggerRect.top + triggerRect.height / 2;
    const nextParticles = [
      ...particlesRef.current,
      createParticle(spawnX, spawnY, uiColliders(trigger)),
    ].slice(-MAX_PARTICLES);

    particlesRef.current = nextParticles;
    setParticles(nextParticles);
    startAnimation();
  };

  const handleHomeDepotKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      spawnHomeDepotTool(event);
    }
  };

  if (entries.length === 0) {
    return (
      <div className={classNames('empty-state', className)}>
        {EXPERIENCE_FALLBACK}
      </div>
    );
  }

  return (
    <>
      <div className={classNames('card-grid', 'card-grid--two', className)}>
        {entries.map((entry, index) => {
          const organization = textValue(entry.organization);
          const role = textValue(entry.role);
          const dateLabel = textValue(entry.dateLabel);
          const summary = textValue(entry.summary);

          const isHomeDepot =
            organization?.toLowerCase() === 'the home depot';

          return (
            <article
              aria-label={
                isHomeDepot
                  ? 'The Home Depot work. Click for a surprise.'
                  : undefined
              }
              className={classNames(
                'card',
                isHomeDepot ? 'experience-card--easter-egg' : '',
              )}
              data-easter-egg-trigger={isHomeDepot ? 'home-depot' : undefined}
              key={`${organization}-${role}-${dateLabel}-${index}`}
              onClick={isHomeDepot ? spawnHomeDepotTool : undefined}
              onKeyDown={isHomeDepot ? handleHomeDepotKeyDown : undefined}
              role={isHomeDepot ? 'button' : undefined}
              tabIndex={isHomeDepot ? 0 : undefined}
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
      <div aria-hidden="true" className="home-depot-easter-egg-layer">
        {particles.map((particle) => (
          <span
            className="home-depot-easter-egg-tool"
            data-testid="home-depot-tool"
            data-tool={particle.label}
            key={particle.id}
            style={{
              opacity: particle.opacity,
              transform: `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            }}
            title={particle.label}
          >
            {particle.src ? <img alt="" src={particle.src} /> : particle.emoji}
          </span>
        ))}
      </div>
    </>
  );
}

export default ExperienceSection;
