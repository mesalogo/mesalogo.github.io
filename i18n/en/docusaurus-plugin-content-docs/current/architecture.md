---
sidebar_position: 8
---

# System Architecture

MesaLogo adopts a layered architecture design, progressing from infrastructure to application scenarios, providing a complete multi-agent collaborative decision-making solution.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  Enterprise | Medical | Education | Software | Supply Chain  │
├─────────────────────────────────────────────────────────────┤
│                    Agent Platform                            │
│  Dual-Engine Rules | Action Space | Agent Mgmt | Sessions    │
│  MCP Integration | Environment Variables                     │
├─────────────────────────────────────────────────────────────┤
│                    Model Service Layer                       │
│  Model Mgmt | Knowledge Base | Multimodal | MCP Services     │
├─────────────────────────────────────────────────────────────┤
│                    Infrastructure Layer                      │
│  Database | File Storage | Cache | Logging | Security        │
└─────────────────────────────────────────────────────────────┘
```

## Application Layer

The application layer provides professional solutions for different industries and scenarios:

| Scenario | Description | Typical Use Cases |
|----------|-------------|-------------------|
| Enterprise Decision | Strategy, team collaboration, project management | Investment analysis, org optimization |
| Medical Consultation | Multi-expert diagnosis and treatment planning | Complex case MDT consultation |
| Education & Training | Classroom discussion, case analysis, debate | Law school mock court |
| Software Development | Requirements, technical review, code review | Agile team collaboration |
| Supply Chain | Supplier negotiation, inventory, logistics | Multi-supplier risk warning |

## Agent Platform

The agent platform is the core of the system, providing infrastructure for agent collaboration.

### Dual-Engine Rule System

Innovatively combines two rule engines:

- **Natural Language Rule Engine**: Handles complex semantics and fuzzy conditions
  - Example: "When requirements change frequently and affect core functions, re-evaluate project timeline"
  
- **Logic Rule Engine**: Handles precise calculations and deterministic logic
  - Example: "When defect density > 2/KLOC and test coverage < 85%, delay release"

- **Rule Conflict Resolution**: Intelligently handles conflicts and priorities between rules

### Action Space Management

- **Action Space Manager**: Creates and manages action spaces (scenario templates)
- **ODD Framework Support**: Based on Overview, Design concepts, Details standard framework
- **Action Task Manager**: Manages specific action task instances
- **Supervisor Mechanism**: Monitors and intervenes in agent interactions

### Agent Management

- **Agent Manager**: Creates and manages agent instances
- **Role Manager**: Defines and manages professional role templates
- **Capability Manager**: Manages agent capabilities and tool configurations

### Session Management

- **Session Manager**: Manages sessions between agents
- **Message Processor**: Handles message formatting and conversion
- **Auto-Discussion Mechanism**: Supports autonomous agent discussions
- **Tool Call Handler**: Handles agent tool calls

### MCP Tool Integration

- **MCP Server Manager**: Manages MCP server lifecycle
- **External Tool Integration**: Integrates various external tools and services
- **Variable Server**: Provides variable access services

### Environment Variable Management

- **Variable Template Manager**: Manages variable template definitions
- **Task Environment Variable Manager**: Manages task-level public variables
- **Agent Variable Manager**: Manages agent private variables

## Model Service Layer

### Model Management

- **Model Client**: Handles communication with LLM APIs
- **Model Management Service**: Manages model configuration, parameters, and access control

Supported models:
- OpenAI (GPT-3.5, GPT-4)
- Anthropic Claude
- Google Gemini
- Chinese LLMs (Qwen, ERNIE Bot, etc.)

### Knowledge Base Services

| Service | Function | Features |
|---------|----------|----------|
| LightRAG | Lightweight RAG | Fast retrieval, suitable for small-medium knowledge bases |
| GraphRAG | Knowledge Graph RAG | Complex knowledge relationship representation and querying |
| Graphiti | Time-sensitive Graph | Older knowledge has lower weight |

### Multimodal Services

- **Image Recognition Analysis**: Processes image input
- **Image Generation Service**: Generates various image content
- **Audio Processing Service**: Speech recognition and synthesis

### MCP Base Services

- **MCP Server**: Provides Model-Control-Protocol standard interface
- **External Application Connector**: Connects third-party applications and services
- **Internal Tool Server**: Provides access interface for internal system tools

## Infrastructure Layer

| Component | Function |
|-----------|----------|
| Database | Stores core system data (PostgreSQL/MySQL) |
| File Storage | Stores large files, logs, and system resources |
| Cache System | Improves system performance, caches frequently used data |
| Logging System | Records system operation logs, supports troubleshooting |
| Monitoring System | Monitors system status, provides performance metrics |
| Security System | Authentication, access control, and data encryption |

## Core Resource Relationships

### Template Layer and Instance Layer

```
Template Layer                    Instance Layer
──────────────                    ──────────────
ActionSpace (Action Space)   →    ActionTask (Action Task)
Role (Role)                  →    Agent (Agent)
RuleSet (Rule Set)           →    (Applied to task)
Knowledge (Knowledge Base)   →    (Agent access)
```

### Resource Relationship Diagram

```
ActionSpace (Scenario Template)
    ├── Role[] (Role Templates)
    ├── RuleSet[] (Rule Sets)
    └── SharedVariable[] (Shared Variables)
           │
           ↓ Create Task
ActionTask (Scenario Instance)
    ├── Agent[] (Agent Instances)
    ├── Conversation[] (Sessions)
    └── EnvironmentVariable[] (Environment Variables)
           │
           ↓
Conversation (Dialogue)
    ├── Message[] (Messages)
    └── AutonomousTask[] (Autonomous Tasks)
```

## Technology Stack

### Backend

- **Language**: Python 3.9+
- **Framework**: Flask
- **Database**: PostgreSQL / MySQL
- **Cache**: Redis

### Frontend

- **Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Ant Design
- **State Management**: React Context

### Deployment

- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Reverse Proxy**: Nginx
