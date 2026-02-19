---
sidebar_position: 1
---

# Quick Start

Welcome to **MesaLogo Multi-Agent Federation System**!

## What is MesaLogo?

MesaLogo is an innovative platform that integrates large language models with traditional agent-based modeling, focusing on simulating dialogue-based agent interactions and providing intelligent solutions for complex multi-party collaborative decision-making.

## Core Features

- **Dual-Engine Rule System**: Combines natural language rule engine and logic rule engine
- **Supervisor Mechanism**: Automatically monitors agent behavior and rule execution
- **Dialogue-Oriented Interaction**: Supports multiple dialogue modes (sequential, panel, debate, collaborative)
- **MCP Plugin System**: Seamless integration with external systems
- **Environment Variable Architecture**: Flexible template-instance separation design
- **Multi-Agent Collaboration**: Built-in multi-role collaboration framework

## System Requirements

Before getting started, ensure your system meets the following requirements:

- **Python**: 3.9 or higher
- **Node.js**: 16.0 or higher (for frontend)
- **Docker**: 20.10 or higher (optional, for containerized deployment)
- **Database**: PostgreSQL 13+ or MySQL 8+

## Quick Installation

### 1. Clone Repository

```bash
git clone https://github.com/mesalogo/abm-llm-v2.git
cd abm-llm-v2
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python run_app.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Using Docker (Recommended)

```bash
docker-compose up -d
```

## Next Steps

- Check [Features](/docs/features) for detailed functionality
- Read [Architecture](/docs/architecture) to understand the technical architecture
- Browse [Scenarios](/docs/scenarios) for use cases
- Check [Core Resources](/docs/resources) to understand the resource model
- Read [FAQ](/docs/faq) for help
