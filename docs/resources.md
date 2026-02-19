---
sidebar_position: 9
---

# 核心资源

MesaLogo 平台的核心资源分为模板层和实例层，采用模板-实例分离的设计模式。

## 资源概览

| 资源 | 中文名 | 层级 | 说明 |
|------|--------|------|------|
| ActionSpace | 行动空间 | 模板 | 场景模板，定义角色组合、规则和共享变量 |
| Role | 角色 | 模板 | 智能体模板，定义 system_prompt、能力、知识库 |
| Capability | 能力 | 模板 | 智能体能力定义（如 memory、planner） |
| RuleSet | 规则集 | 模板 | 行为规则和约束条件 |
| Knowledge | 知识库 | 模板 | 角色可访问的知识文档 |
| ActionTask | 行动任务 | 实例 | 场景实例，用户实际运行的任务 |
| Agent | 智能体 | 实例 | 角色实例，任务中的具体智能体 |
| Conversation | 会话 | 实例 | 对话实例，一个任务可有多个会话 |
| Message | 消息 | 实例 | 对话内容 |
| EnvironmentVariable | 环境变量 | 实例 | 任务级变量，所有 Agent 可见 |
| AgentVariable | 智能体变量 | 实例 | 智能体级变量，仅该 Agent 可见 |

## 模板层资源

### ActionSpace（行动空间）

行动空间是场景的模板定义，包含：

- **基本信息**：名称、描述、背景设定
- **角色配置**：参与的角色列表及其配置
- **规则集**：适用的规则集合
- **共享变量**：所有角色可见的公共变量模板

```json
{
  "name": "专家会议",
  "description": "多专家协作讨论场景",
  "roles": ["技术专家", "产品经理", "项目经理"],
  "rule_sets": ["顺序发言规则", "时间限制规则"],
  "shared_variables": {
    "meeting_topic": "string",
    "time_limit": "number"
  }
}
```

### Role（角色）

角色是智能体的模板定义，包含：

- **System Prompt**：角色的系统提示词
- **能力配置**：角色具备的能力
- **知识库**：角色可访问的知识库
- **工具配置**：角色可使用的 MCP 工具

```json
{
  "name": "技术专家",
  "system_prompt": "你是一位资深的技术专家...",
  "capabilities": ["memory", "knowledge_access"],
  "knowledge_bases": ["技术文档库"],
  "tools": ["code_executor", "file_reader"]
}
```

### RuleSet（规则集）

规则集定义行为规则和约束条件：

- **自然语言规则**：用自然语言描述的规则
- **逻辑规则**：用代码定义的精确规则
- **触发条件**：规则生效的条件
- **优先级**：规则冲突时的优先级

```json
{
  "name": "顺序发言规则",
  "type": "natural_language",
  "content": "参与者按顺序依次发言，每人发言时间不超过5分钟",
  "priority": 1
}
```

### Knowledge（知识库）

知识库存储角色可访问的知识：

- **类型**：LightRAG、GraphRAG、Graphiti
- **文档**：上传的文档列表
- **配置**：检索参数配置

## 实例层资源

### ActionTask（行动任务）

行动任务是行动空间的实例化：

- **来源**：从 ActionSpace 创建
- **智能体**：实例化的 Agent 列表
- **会话**：任务中的对话列表
- **环境变量**：任务级变量实例

### Agent（智能体）

智能体是角色的实例化：

- **角色引用**：关联的 Role 模板
- **私有变量**：智能体专属的变量
- **状态**：当前状态信息

### Conversation（会话）

会话管理智能体之间的对话：

- **参与者**：参与对话的智能体
- **消息列表**：对话消息记录
- **自主任务**：自动对话任务

### Message（消息）

消息是对话的基本单元：

- **发送者**：发送消息的智能体
- **内容**：消息内容
- **类型**：文本、工具调用、系统消息
- **时间戳**：发送时间

## 变量系统

### 环境变量（EnvironmentVariable）

任务级公共变量，所有智能体可见：

```json
{
  "project_deadline": "2024-03-01",
  "budget": 100000,
  "priority": "high"
}
```

### 智能体变量（AgentVariable）

智能体私有变量，仅该智能体可见：

```json
{
  "expertise_level": 5,
  "available_hours": 40,
  "current_tasks": ["task1", "task2"]
}
```

## 数据流

```
用户操作                 模板层                    实例层
─────────               ──────                   ──────

选择行动空间 ──→ ActionSpace
                    │
                    ↓ 创建任务
              ┌─────────────┐
              │ ActionTask  │ ←─ 复制角色、变量
              └─────────────┘
                    │
                    ↓ 自动创建
              ┌─────────────┐
              │ Conversation│ ←─ 默认会话
              └─────────────┘
                    │
启动自主任务 ──────→ ↓
              ┌─────────────┐
              │AutonomousTask│ ←─ 控制对话轮次
              └─────────────┘
                    │
                    ↓ 生成
              ┌─────────────┐
              │  Message[]  │ ←─ Agent 对话内容
              └─────────────┘
```

## 并行实验

ParallelExperiment 支持控制变量实验：

- **来源**：绑定 ActionSpace 场景模板
- **克隆任务**：创建多个 ActionTask 克隆
- **变量隔离**：每个克隆任务独立变量
- **结果对比**：比较不同变量组合的结果

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
