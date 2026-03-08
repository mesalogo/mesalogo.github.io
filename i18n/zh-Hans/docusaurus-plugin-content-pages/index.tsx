import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from '@site/src/pages/index.module.css';
import DNARoadmap from '@site/src/components/DNARoadmap';

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
      title: '开箱即用的多智能体联邦',
      description: '无需繁琐硬编码，通过可视化拖拽即可构建复杂的专家混合（MoE）路由与智能体协同工作流，极大降低开发门槛。',
    },
    {
      icon: '🔧',
      title: '打破虚拟与现实的边界',
      description: '超越纯文本对话限制。通过扩展生态深度对接 NetLogo、GIS 与代码服务器，让大模型在真实场景中具备强大的执行力。',
    },
    {
      icon: '🧠',
      title: '具备深度推理的图谱大脑',
      description: '内置先进的 LightRAG 与 Graphiti，提供比传统向量检索更精准的多跳推理与时间感知记忆，让系统越用越聪明。',
    },
    {
      icon: '🛡️',
      title: '企业级的安全与可控机制',
      description: '自带防内鬼与防幻觉机制。自动化监督者全程监控智能体行为与合规性，为关键业务的稳定运行保驾护航。',
    },
    {
      icon: '⚖️',
      title: '泛化与精确的完美平衡',
      description: '创新性地将大语言模型的泛化语义理解能力，与传统逻辑规则引擎的精确计算能力相融合，确保系统灵活且绝对可靠。',
    },
    {
      icon: '🧪',
      title: '零成本的策略推演与择优',
      description: '无需在真实业务中冒险，通过一键展开平行对比实验，在受控沙箱中快速筛选出最佳变量与规则组合。',
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

function HomepageTimeline() {
  const milestones = [
    {
      date: '2025 Q1',
      title: '核心架构',
      icon: '🏗️',
      items: ['双引擎规则系统', '行动空间管理', '多智能体协作框架'],
      completed: true,
    },
    {
      date: '2025 Q2',
      title: '知识库集成',
      icon: '📚',
      items: ['LightRAG / GraphRAG / Graphiti', '时间敏感记忆系统'],
      completed: true,
    },
    {
      date: '2025 Q3',
      title: '高级智能体系统',
      icon: '🔧',
      items: ['MCP 工具与插件系统', '监督者机制', '平行实验室'],
      completed: true,
    },
    {
      date: '2025 Q4',
      title: 'Skill 集成',
      icon: '🛡️',
      items: ['模块化技能系统', '可复用智能体能力'],
      completed: true,
    },
    {
      date: '2026 Q1',
      title: 'IM 集成',
      icon: '💬',
      items: ['即时通讯平台集成', '实时智能体交互'],
      status: 'in-progress',
    },
    {
      date: '2026 Q2',
      title: 'ODM 组织设计模型',
      icon: '🏛️',
      items: ['基于组织架构的智能体调度模型', '可视化组织架构图编辑器', '预设模板（如三省六部制、现代公司架构）', '层级流转控制与审批路由'],
    },
    {
      date: '2026 Q3+',
      title: '更多实体集成',
      icon: '🔗',
      items: ['更广泛的实体类型支持', '扩展生态系统连接'],
    },
  ];

  return (
    <DNARoadmap
      heading="发展路线图"
      subtitle="持续创新与改进"
      milestones={milestones}
      completedLabel="已完成"
      inProgressLabel="进行中"
    />
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 多智能体联邦系统`}
      description="融合大语言模型与智能体建模的创新平台，专注于模拟基于对话的智能体互动">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageTimeline />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
