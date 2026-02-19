---
sidebar_position: 2
---

# Features

MesaLogo provides a comprehensive set of production-verified feature modules covering the full lifecycle of multi-agent collaboration.

## Dual-Engine Rule System

### Natural Language Rule Engine (LLM)
- Rules marked as `llm` type, interpreted and executed by large language models
- Supports complex semantic conditions, e.g.: "When requirements change frequently and affect core functionality, reassess the project timeline"
- Enables non-technical users to define business rules in natural language

### Logic Rule Engine (Logic)
- Rules marked as `logic` type, executed in a secure sandbox (RuleSandbox) running JavaScript
- Sandbox limits: 5-second timeout, 50MB memory cap, isolated environment variables
- Supports precise computation and deterministic logic, e.g.: "When defect density > 2/KLOC and test coverage < 85%, postpone release"

### Rule Set Management
- Rules organized via RuleSet with priority ordering
- Rule sets bind to Action Spaces and automatically apply in task instances
- Rule trigger logging (RuleTriggerLog) tracks context, variable values, and execution results for each check

## Supervisor Mechanism

### Supervisor Roles
- Action Spaces can configure supervisors (ActionSpaceObserver) linked to roles marked with `is_observer_role=True`
- Supervisor agents are automatically created in tasks, marked as `is_observer=True`

### Event-Driven Supervision
- SupervisorEventManager triggers checks at key points:
  - **Immediate supervision**: checks after every agent response
  - **Round-based supervision**: checks after each conversation round
- Manual rule check triggering supported

### Rule Checking Flow
- SupervisorRuleChecker builds conversation context and executes rule checks sequentially
- Natural language rules evaluated via ModelClient calling LLM for compliance judgment
- Logic rules executed in Node.js sandbox via RuleSandbox
- Generates check summaries with pass/fail statistics and detailed results

## Multi-Agent Conversations

### Conversation Modes
- **Sequential mode**: agents speak in predetermined order
- **Panel mode**: multiple agents respond in parallel to the same message

### Smart Dispatch
- SmartDispatchService automatically selects the most suitable agent based on message content
- Matches agent expertise domains and analyzes conversation context

### Autonomous Discussion
- AutonomousTask supports multiple automation types:
  - `discussion`: multi-round auto-discussion with configurable rounds and topics
  - `conditional_stop`: auto-stop when conditions are met
  - `variable_trigger`: triggered by variable changes
  - `time_trigger`: time-based triggers
  - `autonomous_scheduling`: self-scheduling
- Supports streaming responses (SSE) for real-time agent reply delivery

### Conversation Summarization
- SummaryService generates conversation summaries
- New sub-tasks can automatically carry the previous conversation's summary as context

## MCP Tool System

### Communication Protocols
MCP Server Manager (MCPServerManager) supports four communication protocols:
- **stdio**: standard I/O, suitable for local tools
- **streamable_http**: StreamableHTTP protocol, suitable for remote services
- **sse**: Server-Sent Events, suitable for streaming responses
- **http**: simple HTTP API with OpenAPI specification support

### Server Management
- Loads MCP server definitions from JSON configuration files
- Supports dynamic start, stop, and reload of servers
- Built-in variables server (variables-server) providing agents read/write access to variables
- Tool schema caching (ToolSchemaCache) for improved performance

### Capability System
- Capability model defines agent abilities (e.g., memory, knowledge_access, planner)
- Capabilities linked to MCP tools: `{"server1": ["tool1", "tool2"]}`
- Security level classification (1=low risk, 2=medium risk, 3=high risk)
- Roles bind capabilities via RoleCapability

## Knowledge Base System

### Built-in Knowledge Bases
- **Vector Knowledge Base** (vector): based on Milvus vector database
  - Document processing pipeline: upload → format conversion (PDF/Word/TXT/Markdown) → chunking → embedding → indexing
  - Hybrid retrieval support: 70% vector + 30% BM25 keyword, weighted fusion
  - Built-in Reranker service for result re-ranking
- **LightRAG Knowledge Base** (lightrag): lightweight graph RAG
  - Supports naive/local/global/hybrid/mix query modes
  - Independent workspace isolation

### Graph-Enhanced Memory
- GraphEnhancement configuration supports Graphiti/LightRAG/GraphRAG frameworks
- Graphiti provides time-sensitive graph memory where older knowledge has lower weight
- MemoryCapabilityService dynamically manages memory capabilities for all roles based on graph enhancement toggle
- MemorySyncService handles memory data synchronization

### External Knowledge Base Compatibility
- ExternalKnowledgeProvider integrates with external platforms:
  - **Dify** (DifyAdapter)
  - **FastGPT** (FastGPTAdapter)
  - **RagFlow** (RagFlowAdapter)
  - **Custom** (CustomAdapter)
- Roles can bind both internal and external knowledge bases simultaneously

## Environment Variable System

### Template-Instance Separation
- **Action Space layer**: ActionSpaceSharedVariable / ActionSpaceEnvironmentVariable define variable templates
- **Task Instance layer**: ActionTaskEnvironmentVariable as task-level public variables visible to all agents
- **Agent layer**: AgentVariable as agent-private variables with `is_public` visibility control

### Variable Features
- All variables support history tracking (history JSON field) for value change auditing
- Shared environment variables (SharedEnvironmentVariable) for cross-task sharing
- ExternalVariableMonitor watches for external variable changes
- Variables exposed to agents via MCP variables server for read/write access

## Entity Application Marketplace

### Built-in Applications
- MarketApp model manages marketplace applications
- Built-in apps include: NetLogo modeling, GIS maps, Code programming servers, etc.
- Apps bind to Action Spaces via ActionSpaceApp

### VNC Remote Desktop
- VNC proxy manager (VNCProxy) implements WebSocket-to-VNC TCP proxy via websockify
- Single-port + token dynamic routing architecture supporting concurrent multi-app instance access

## Parallel Laboratory

### Experiment Types
- **Comparative experiment**: generates Cartesian product of variable combinations, each creating an independent ActionTask
- **Normal task**: uses fixed variable values, generating a single task instance

### Experiment Flow
- Binds an ActionSpace template as the experiment foundation
- Automatically clones ActionTasks with isolated variables per clone (`is_experiment_clone=True`)
- Reuses existing ActionTask + AutonomousTask mechanisms for experiment execution
- ExperimentStep records status and results for each experiment step

### Experiment Configuration
- Supports enumerated variable definitions for experiment parameter ranges
- Supports optimization objectives: maximize/minimize specified variables
- Supports stop conditions: auto-terminate when expressions are satisfied

## One-Click Generation

- OneClickGenerationService uses LLM to automatically generate roles, action spaces, rules, and tasks
- Supports configuring a dedicated assistant generation model (assistant_generation_model)
- Generates content based on customizable prompt templates

## Users & Permissions

### Authentication
- Local username/password authentication (Werkzeug password hashing)
- OAuth 2.0 social login: Google, GitHub, etc. (via authlib)
- JWT Token authentication

### Access Control
- UserPermissionService provides resource-level permission filtering
- Admin role support (is_admin)
- Multi-tenant isolation: resources controlled via `created_by` and `is_shared` fields
- UserRoleAssignment for user role assignment

### Subscriptions & Quotas
- SubscriptionPlan defines subscription plans and resource limits
- Stock resource checks: tasks, agents, spaces, knowledge_bases
- Flow resource checks: daily_conversations, monthly_tokens, storage_mb
- UsageRecord tracks resource consumption

## Model Management

### Multi-Model Support
- ModelConfig manages model configurations: OpenAI, Anthropic Claude, Google Gemini, domestic LLMs, etc.
- Role-level model parameter overrides: temperature, top_p, frequency_penalty, presence_penalty, stop_sequences
- Supports configuring default text generation and assistant generation models

### External Platform Compatibility
- Role source supports `internal` and `external`
- Compatible with any platform using OpenAI API format (Dify, FastGPT, Coze, etc.)
