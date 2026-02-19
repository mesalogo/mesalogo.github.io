---
sidebar_position: 1
---

# 快速开始

欢迎使用 **MesaLogo 多智能体联邦系统**！

## 什么是 MesaLogo？

MesaLogo 是一个融合大语言模型与传统智能体建模的创新平台，专注于模拟基于对话的智能体互动，为复杂多方协作决策提供智能化解决方案。

## 核心特性

- **双引擎规则系统**：结合自然语言规则引擎和逻辑规则引擎
- **监督者机制**：自动监控智能体行为和规则执行
- **面向对话的交互**：支持多种对话模式（顺序、小组、辩论、协作）
- **MCP插件系统**：与外部系统无缝集成
- **环境变量架构**：灵活的模板与实例分离设计
- **多智能体协作**：内置多角色协作框架

## 系统要求

在开始之前，请确保您的系统满足以下要求：

- **Python**: 3.9 或更高版本
- **Node.js**: 16.0 或更高版本（用于前端）
- **Docker**: 20.10 或更高版本（可选，用于容器化部署）
- **数据库**: PostgreSQL 13+ 或 MySQL 8+

## 快速安装

### 1. 克隆仓库

```bash
git clone https://github.com/mesalogo/abm-llm-v2.git
cd abm-llm-v2
```

### 2. 后端设置

```bash
cd backend
pip install -r requirements.txt
python run_app.py
```

### 3. 前端设置

```bash
cd frontend
npm install
npm start
```

### 4. 使用 Docker（推荐）

```bash
docker-compose up -d
```

## 下一步

- 查看 [功能特性](/docs/features) 了解详细功能
- 阅读 [系统架构](/docs/architecture) 了解技术架构
- 浏览 [应用场景](/docs/scenarios) 了解使用案例
- 查看 [核心资源](/docs/resources) 了解资源模型
- 阅读 [常见问题](/docs/faq) 获取帮助
