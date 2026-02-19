import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from '@site/src/pages/index.module.css';

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
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <ParticleBackground />
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          像搭积木一样构建多智能体系统
        </p>
        <p className={styles.heroDescription}>
          融合大语言模型与智能体建模的创新平台。编排智能体完成复杂协作决策、仿真模拟和真实世界自动化任务。
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/features">
            探索功能
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            快速开始
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
      title: '多智能体编排',
      description: '基于 ReactFlow 的可视化工作流编辑器，通过拖拽节点定义智能体协作：智能体、条件、并行、循环。',
    },
    {
      icon: '🔧',
      title: 'MCP 工具生态',
      description: '可扩展的插件系统，使智能体能与外部系统交互 — NetLogo、GIS、代码服务器等。',
    },
    {
      icon: '📚',
      title: '知识图谱记忆',
      description: '内置 LightRAG/GraphRAG/Graphiti 知识库，支持时间敏感记忆。兼容 Dify、FastGPT、RagFlow。',
    },
    {
      icon: '🛡️',
      title: '监督者机制',
      description: '自动化行为监控、异常检测和动态干预，确保仿真质量和安全性。',
    },
    {
      icon: '⚖️',
      title: '双引擎规则',
      description: '结合自然语言和逻辑规则引擎，兼顾复杂语义理解和精确计算。',
    },
    {
      icon: '🧪',
      title: '平行实验室',
      description: '通过控制变量实验发现最优策略，降低大模型不可预测性带来的风险。',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">核心能力</Heading>
          <p className={styles.sectionSubtitle}>构建智能多智能体系统所需的一切</p>
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

function HomepageShowcase() {
  const showcases = [
    {
      title: '多智能体会话',
      description: '以角色为核心适配大模型 MoE 架构，路由到明确的专家模块。兼容 OpenAI、Dify、FastGPT、Coze 等平台。',
      image: '/img/slide1.png',
    },
    {
      title: '实体应用市场',
      description: '内置 NetLogo 建模、GIS 地图、Code 编程服务器等常见应用，快速将实体应用进行智能体化改造。',
      image: '/img/slide2.png',
    },
    {
      title: '全平台知识库兼容',
      description: '内置基于 LightRAG/GraphRAG/Graphiti 图谱的知识库，兼容 FastGPT/Dify/RagFlow 等外部平台。',
      image: '/img/slide3.png',
    },
    {
      title: '双引擎规则系统',
      description: '创新性结合自然语言规则引擎和逻辑规则引擎，确保系统既灵活又准确。',
      image: '/img/slide4.png',
    },
    {
      title: '监督者机制',
      description: '内置监督者自动监控智能体行为、跟踪规则执行、检测异常，提供动态干预。',
      image: '/img/slide5.png',
    },
    {
      title: '平行实验室',
      description: '通过控制变量实验找到最优变量和规则组合，降低大模型结果不可预测带来的机会成本。',
      image: '/img/slide6.png',
    },
  ];

  return (
    <section className={styles.showcase}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">产品展示</Heading>
          <p className={styles.sectionSubtitle}>MesaLogo 实际效果一览</p>
        </div>
        <div className={styles.showcaseGrid}>
          {showcases.map((item, idx) => (
            <div key={idx} className={styles.showcaseCard}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className={styles.showcaseContent}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineMilestone({date, title, description, icon, isLeft, completed}: {
  date: string;
  title: string;
  description: string;
  icon: string;
  isLeft: boolean;
  completed?: boolean;
}) {
  return (
    <div className={clsx(styles.timelineItem, isLeft ? styles.timelineLeft : styles.timelineRight)}>
      <div className={styles.timelineDate}>{date}</div>
      <div className={clsx(styles.timelineDot, completed && styles.timelineDotCompleted)}></div>
      <div className={clsx(styles.timelineContent, completed && styles.timelineContentCompleted)}>
        {completed && <span className={styles.completedBadge}>已完成</span>}
        <div className={styles.timelineIcon}>{icon}</div>
        <Heading as="h3" className={styles.timelineTitle}>{title}</Heading>
        <p className={styles.timelineDescription}>{description}</p>
      </div>
    </div>
  );
}

function HomepageTimeline() {
  const milestones = [
    {
      date: '2025 Q1',
      title: '核心架构',
      icon: '🏗️',
      description: '双引擎规则系统、行动空间管理和多智能体协作框架',
      completed: true,
    },
    {
      date: '2025 Q2',
      title: '知识库集成',
      icon: '📚',
      description: 'LightRAG、GraphRAG、Graphiti 知识库与时间敏感记忆系统',
      completed: true,
    },
    {
      date: '2025 Q3',
      title: 'MCP 工具系统',
      icon: '🔧',
      description: 'MCP 插件系统，使智能体能与外部系统交互并执行实际操作',
      completed: true,
    },
    {
      date: '2025 Q4',
      title: '监督者机制',
      icon: '🛡️',
      description: '自动化监督者，用于行为监控、异常检测和动态干预',
      completed: true,
    },
    {
      date: '2026 Q1',
      title: '平行实验室',
      icon: '🧪',
      description: '平行实验功能，支持控制变量测试和最优方案发现',
    },
    {
      date: '2026 Q2',
      title: '企业级功能',
      icon: '🏢',
      description: '多租户支持、OAuth 集成、增强安全性和企业级部署',
    },
  ];

  return (
    <section className={styles.timeline}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">发展路线图</Heading>
          <p className={styles.sectionSubtitle}>持续创新与改进</p>
        </div>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          {milestones.map((milestone, idx) => (
            <TimelineMilestone
              key={idx}
              {...milestone}
              isLeft={idx % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2" className={styles.ctaTitle}>
            准备好构建你的多智能体系统了吗？
          </Heading>
          <p className={styles.ctaDescription}>
            立即开始使用 MesaLogo，释放智能体协作的强大力量。
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              免费开始
            </Link>
            <Link
              className="button button--outline button--lg"
              to="mailto:contact@mesalogo.com">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 多智能体联邦系统`}
      description="融合大语言模型与智能体建模的创新平台，专注于模拟基于对话的智能体互动">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageShowcase />
        <HomepageTimeline />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
