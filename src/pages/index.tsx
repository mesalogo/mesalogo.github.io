import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import DNARoadmap from '../components/DNARoadmap';

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          Build Multi-Agent Systems as Easy as Building Blocks
        </p>
        <p className={styles.heroDescription}>
          An innovative platform integrating LLM with agent-based modeling. Orchestrate intelligent agents for complex collaborative decision-making, simulation, and real-world automation.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/features">
            Explore Features
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Quick Start
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      icon: '🤖',
      title: 'Visual Multi-Agent Workflows',
      description: 'Build complex MoE architectures and collaborative working groups instantly through intuitive drag-and-drop, drastically lowering development barriers.',
    },
    {
      icon: '🔧',
      title: 'Bridge Virtual and Physical',
      description: 'Break free from text-only chat. Deeply integrate with professional tools like NetLogo, GIS, and Code Servers via our extensible MCP ecosystem to perform real-world actions.',
    },
    {
      icon: '🧠',
      title: 'Deep Memory with GraphRAG',
      description: 'Equip agents with superior contextual awareness using time-sensitive LightRAG and Graphiti, enabling complex multi-hop reasoning that standard vector databases cannot achieve.',
    },
    {
      icon: '🛡️',
      title: 'Enterprise-Grade Control',
      description: 'Mitigate AI hallucinations out-of-the-box. Our innate Supervisor mechanism automatically monitors behavior and enforces safety boundaries in real-time.',
    },
    {
      icon: '⚖️',
      title: 'Deterministic & Flexible Logic',
      description: 'Get the best of both worlds—combine the unbounded semantic understanding of LLMs with the precise, reliable computation of strict logic rules.',
    },
    {
      icon: '🧪',
      title: 'Risk-Free Strategy Simulation',
      description: 'Discover optimal decisions by running fast parallel experiments across variable combinations, eliminating the unpredictability and cost of trial-and-error in production.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">Core Capabilities</Heading>
          <p className={styles.sectionSubtitle}>Everything you need to build intelligent multi-agent systems</p>
        </div>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className={clsx('col col--4', styles.featureCol)}>
              <div className="text--center padding-horiz--md">
                <div className={styles.featureIcon}>{feature.icon}</div>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageTimeline() {
  const milestones = [
    {
      date: '2025 Q1',
      title: 'Core Architecture',
      icon: '🏗️',
      items: ['Dual-engine rule system', 'Action space management', 'Multi-agent collaboration framework'],
      completed: true,
    },
    {
      date: '2025 Q2',
      title: 'Knowledge Base Integration',
      icon: '📚',
      items: ['LightRAG / GraphRAG / Graphiti', 'Time-sensitive memory system'],
      completed: true,
    },
    {
      date: '2025 Q3',
      title: 'Advanced Agent System',
      icon: '🔧',
      items: ['MCP tool & plugin system', 'Supervisor mechanism', 'Parallel laboratory'],
      completed: true,
    },
    {
      date: '2025 Q4',
      title: 'Skill Integration',
      icon: '🛡️',
      items: ['Modular skill system', 'Reusable agent capabilities'],
      completed: true,
    },
    {
      date: '2026 Q1',
      title: 'IM Integration',
      icon: '💬',
      items: ['Instant messaging platform integration', 'Real-time agent interaction'],
      status: 'in-progress',
    },
    {
      date: '2026 Q2+',
      title: 'More Entity Integration',
      icon: '🔗',
      items: ['Broader entity type support', 'Extended ecosystem connectivity'],
    },
  ];

  return (
    <DNARoadmap
      heading="Development Roadmap"
      subtitle="Continuous innovation and improvement"
      milestones={milestones}
    />
  );
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.ctaTitle}>
            Ready to Build Your Multi-Agent System?
          </Heading>
          <p className={styles.ctaDescription}>
            Get started with MesaLogo today and unlock the power of intelligent agent collaboration.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started Free
            </Link>
            <Link
              className="button button--outline button--lg"
              to="mailto:contact@mesalogo.com">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Multi-Agent Federation System`}
      description="Innovative platform integrating large language models with agent-based modeling, focusing on simulating dialogue-based agent interactions">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageTimeline />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
