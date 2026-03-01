import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './DNARoadmap.module.css';

export interface Milestone {
  date: string;
  title: string;
  items: string[];
  icon: string;
  completed?: boolean;
  status?: string;
}

interface DNARoadmapProps {
  heading: string;
  subtitle: string;
  milestones: Milestone[];
  completedLabel?: string;
  inProgressLabel?: string;
}

function HelixSVG({ count }: { count: number }) {
  const w = 1200;
  const h = 800;
  const margin = 80;
  const steps = 300;
  const amp = 30;
  const freq = count > 1 ? (count - 1) / 2 : 1;

  const pathA: string[] = [];
  const pathB: string[] = [];
  const bridges: React.ReactElement[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const baseX = margin + t * (w - 2 * margin);
    const baseY = h - margin - t * (h - 2 * margin);
    const offset = Math.sin(t * Math.PI * freq * 2) * amp;
    const perpX = offset * Math.cos(Math.atan2(-(h - 2 * margin), w - 2 * margin) + Math.PI / 2);
    const perpY = offset * Math.sin(Math.atan2(-(h - 2 * margin), w - 2 * margin) + Math.PI / 2);
    const xA = baseX + perpX;
    const yA = baseY + perpY;
    const xB = baseX - perpX;
    const yB = baseY - perpY;
    pathA.push(`${i === 0 ? 'M' : 'L'}${xA.toFixed(1)},${yA.toFixed(1)}`);
    pathB.push(`${i === 0 ? 'M' : 'L'}${xB.toFixed(1)},${yB.toFixed(1)}`);
  }

  const bridgeCount = 20;
  for (let i = 0; i < bridgeCount; i++) {
    const t = (i + 0.5) / bridgeCount;
    const baseX = margin + t * (w - 2 * margin);
    const baseY = h - margin - t * (h - 2 * margin);
    const offset = Math.sin(t * Math.PI * freq * 2) * amp;
    const angle = Math.atan2(-(h - 2 * margin), w - 2 * margin) + Math.PI / 2;
    const perpX = offset * Math.cos(angle);
    const perpY = offset * Math.sin(angle);
    bridges.push(
      <line
        key={i}
        x1={baseX + perpX} y1={baseY + perpY}
        x2={baseX - perpX} y2={baseY - perpY}
        className={styles.helixBridge}
      />
    );
  }

  return (
    <svg className={styles.helixSvg} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="strandGradientA" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="strandGradientB" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      {bridges}
      <path d={pathA.join(' ')} className={clsx(styles.helixStrand, styles.strandA)} />
      <path d={pathB.join(' ')} className={clsx(styles.helixStrand, styles.strandB)} />
    </svg>
  );
}

function Particles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    left: `${5 + Math.random() * 90}%`,
    bottom: `${5 + Math.random() * 90}%`,
    animationDuration: `${6 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 5}s`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
  }));

  return (
    <div className={styles.particleField} aria-hidden="true">
      {particles.map((s, i) => (
        <div key={i} className={styles.particle} style={s} />
      ))}
    </div>
  );
}

function MilestoneNode({ milestone, index, total, completedLabel, inProgressLabel }: {
  milestone: Milestone;
  index: number;
  total: number;
  completedLabel: string;
  inProgressLabel: string;
}) {
  const isCompleted = milestone.completed;
  const isInProgress = milestone.status === 'in-progress';
  const isFuture = !isCompleted && !isInProgress;

  const t = total > 1 ? index / (total - 1) : 0;
  const leftPercent = 6.6666 + t * 86.6666;
  const bottomPercent = 10 + t * 80;
  const cardOnRight = index % 2 === 0;

  const nodeClass = clsx(
    styles.helixNode,
    isCompleted && styles.nodeCompleted,
    isInProgress && styles.nodeInProgress,
    isFuture && styles.nodeFuture,
  );

  const cardClass = clsx(
    styles.milestoneCard,
    isCompleted && styles.cardCompleted,
    isInProgress && styles.cardInProgress,
    isFuture && styles.cardFuture,
  );

  return (
    <div
      className={styles.milestoneItem}
      style={{ left: `${leftPercent}%`, bottom: `${bottomPercent}%` }}
    >
      <div className={nodeClass}>
        {isCompleted && <div className={styles.nodeRing} />}
        <div className={styles.nodeCore}>{milestone.icon}</div>
      </div>
      <div className={clsx(styles.cardWrapper, cardOnRight ? styles.cardRight : styles.cardLeft)}>
        <div className={styles.connectorArm} />
        <div className={cardClass}>
          <div className={styles.cardGlow} />
          <div className={styles.cardHeader}>
            <span className={styles.cardDate}>{milestone.date}</span>
            {isCompleted && (
              <span className={clsx(styles.cardBadge, styles.badgeCompleted)}>{completedLabel}</span>
            )}
            {isInProgress && (
              <span className={clsx(styles.cardBadge, styles.badgeInProgress)}>{inProgressLabel}</span>
            )}
          </div>
          <h3 className={styles.cardTitle}>{milestone.title}</h3>
          <ul className={styles.cardItems}>
            {milestone.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function DNARoadmap({ heading, subtitle, milestones, completedLabel = 'Completed', inProgressLabel = 'In Progress' }: DNARoadmapProps) {
  return (
    <section className={styles.dnaRoadmap}>
      <Particles />
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">{heading}</Heading>
          <p className={styles.sectionSubtitle}>{subtitle}</p>
        </div>
        <div className={styles.helixContainer}>
          <HelixSVG count={milestones.length} />
          {milestones.map((m, idx) => (
            <MilestoneNode
              key={idx}
              milestone={m}
              index={idx}
              total={milestones.length}
              completedLabel={completedLabel}
              inProgressLabel={inProgressLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
