---
sidebar_position: 9
---

# Core Resources

MesaLogo platform's core resources are divided into template layer and instance layer, adopting a template-instance separation design pattern.

## Resource Overview

| Resource | Layer | Description |
|----------|-------|-------------|
| ActionSpace | Template | Scenario template, defines role combinations, rules, and shared variables |
| Role | Template | Agent template, defines system_prompt, capabilities, knowledge base |
| Capability | Template | Agent capability definition (e.g., memory, planner) |
| RuleSet | Template | Behavior rules and constraints |
| Knowledge | Template | Knowledge documents accessible by roles |
| ActionTask | Instance | Scenario instance, actual task run by users |
| Agent | Instance | Role instance, specific agent in task |
| Conversation | Instance | Dialogue instance, a task can have multiple sessions |
| Message | Instance | Dialogue content |
| EnvironmentVariable | Instance | Task-level variable, visible to all Agents |
| AgentVariable | Instance | Agent-level variable, visible only to that Agent |

## Template Layer Resources

### ActionSpace

Action space is the template definition of a scenario, containing:

- **Basic Information**: Name, description, background setting
- **Role Configuration**: List of participating roles and their configurations
- **Rule Sets**: Applicable rule collections
- **Shared Variables**: Public variable templates visible to all roles

```json
{
  "name": "Expert Meeting",
  "description": "Multi-expert collaborative discussion scenario",
  "roles": ["Technical Expert", "Product Manager", "Project Manager"],
  "rule_sets": ["Sequential Speaking Rule", "Time Limit Rule"],
  "shared_variables": {
    "meeting_topic": "string",
    "time_limit": "number"
  }
}
```

### Role

Role is the template definition of an agent, containing:

- **System Prompt**: Role's system prompt
- **Capability Configuration**: Capabilities the role possesses
- **Knowledge Base**: Knowledge bases accessible by the role
- **Tool Configuration**: MCP tools usable by the role

```json
{
  "name": "Technical Expert",
  "system_prompt": "You are a senior technical expert...",
  "capabilities": ["memory", "knowledge_access"],
  "knowledge_bases": ["Technical Documentation Library"],
  "tools": ["code_executor", "file_reader"]
}
```

### RuleSet

Rule set defines behavior rules and constraints:

- **Natural Language Rules**: Rules described in natural language
- **Logic Rules**: Precise rules defined in code
- **Trigger Conditions**: Conditions for rule activation
- **Priority**: Priority when rules conflict

```json
{
  "name": "Sequential Speaking Rule",
  "type": "natural_language",
  "content": "Participants speak in order, each person's speaking time should not exceed 5 minutes",
  "priority": 1
}
```

### Knowledge

Knowledge base stores knowledge accessible by roles:

- **Type**: LightRAG, GraphRAG, Graphiti
- **Documents**: List of uploaded documents
- **Configuration**: Retrieval parameter configuration

## Instance Layer Resources

### ActionTask

Action task is the instantiation of action space:

- **Source**: Created from ActionSpace
- **Agents**: List of instantiated Agents
- **Sessions**: List of dialogues in the task
- **Environment Variables**: Task-level variable instances

### Agent

Agent is the instantiation of role:

- **Role Reference**: Associated Role template
- **Private Variables**: Agent-specific variables
- **State**: Current state information

### Conversation

Conversation manages dialogues between agents:

- **Participants**: Agents participating in the dialogue
- **Message List**: Dialogue message records
- **Autonomous Tasks**: Automatic dialogue tasks

### Message

Message is the basic unit of dialogue:

- **Sender**: Agent sending the message
- **Content**: Message content
- **Type**: Text, tool call, system message
- **Timestamp**: Send time

## Variable System

### EnvironmentVariable

Task-level public variables, visible to all agents:

```json
{
  "project_deadline": "2024-03-01",
  "budget": 100000,
  "priority": "high"
}
```

### AgentVariable

Agent private variables, visible only to that agent:

```json
{
  "expertise_level": 5,
  "available_hours": 40,
  "current_tasks": ["task1", "task2"]
}
```

## Data Flow

```
User Operation              Template Layer              Instance Layer
──────────────              ──────────────              ──────────────

Select Action Space ──→ ActionSpace
                           │
                           ↓ Create Task
                     ┌─────────────┐
                     │ ActionTask  │ ←─ Copy roles, variables
                     └─────────────┘
                           │
                           ↓ Auto-create
                     ┌─────────────┐
                     │ Conversation│ ←─ Default session
                     └─────────────┘
                           │
Start Autonomous Task ────→ ↓
                     ┌─────────────┐
                     │AutonomousTask│ ←─ Control dialogue rounds
                     └─────────────┘
                           │
                           ↓ Generate
                     ┌─────────────┐
                     │  Message[]  │ ←─ Agent dialogue content
                     └─────────────┘
```

## Parallel Experiments

ParallelExperiment supports controlled variable experiments:

- **Source**: Binds to ActionSpace scenario template
- **Cloned Tasks**: Creates multiple ActionTask clones
- **Variable Isolation**: Each cloned task has independent variables
- **Result Comparison**: Compares results of different variable combinations

```
ParallelExperiment
    │
    ├── source_action_space_id → ActionSpace
    │
    └── cloned_action_task_ids → [ActionTask, ActionTask, ...]
                                      │
                                      ↓
                                 Conversation
                                      │
                                      ↓
                                AutonomousTask
```
