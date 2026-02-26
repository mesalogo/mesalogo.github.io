---
sidebar_position: 2
---

# 核心功能特性

MesaLogo 提供了一系列经过实际业务验证的企业级功能模块，覆盖从构建、仿真推演到智能体执行的完整生命周期。

## 1. 泛化与精确的完美平衡：双引擎规则系统

创新性地将大模型泛化能力与代码严谨性结合，确保智能体在拥有发散思维的同时，能够严格遵守业务红线。

### 专家级自然语言规则（LLM）
- 规则类型标记为 `llm`，由大语言模型解释和执行
- 支持复杂的语义推演条件，例如："当需求变更过于频繁且存在未知的核心链条影响时，需重新评估时间线"
- 零代码门槛：业务专家可直接用自然语言编排极其复杂的业务准则

### 逻辑规则引擎（Logic）
- 规则类型标记为 `logic`，在安全沙盒（RuleSandbox）中执行 JavaScript 代码
- 沙盒限制：5 秒超时、50MB 内存上限、隔离环境变量
- 支持精确计算和确定性逻辑，如："当缺陷密度 > 2/KLOC 且测试覆盖率 < 85% 时，推迟发布"

### 规则集管理
- 规则通过 RuleSet 组织，支持优先级排序
- 规则集可绑定到行动空间，在任务实例中自动生效
- 支持规则触发日志记录（RuleTriggerLog），追踪每次规则检查的上下文、变量值和执行结果

## 2. 企业级的护栏：自动化监督者（Supervisor）机制

大模型不可避免地存在幻觉和偏离既定角色的问题。我们内置的自动化“监督者”充当了合规大脑，全程护航任务安全性。

### 隐形的监督者角色
- 行动空间可配置监督者（ActionSpaceObserver），关联具有 `is_observer_role=True` 标记的角色
- 监督者智能体在任务中自动创建，标记为 `is_observer=True`

### 事件驱动监督
- SupervisorEventManager 在关键节点自动触发检查：
  - **即时监督**（immediate）：每个智能体回复后立即检查
  - **轮次监督**（round_based）：每轮对话结束后检查
- 支持手动触发规则检查

### 规则检查流程
- SupervisorRuleChecker 构建会话上下文，逐条执行规则检查
- 自然语言规则通过 ModelClient 调用 LLM 判断合规性
- 逻辑规则通过 RuleSandbox 在 Node.js 沙盒中执行
- 生成检查摘要，包含通过/未通过统计和详细结果

## 3. 灵活的多智能体协作组网

摒弃生硬的单向流水线。支持构建复杂的互动层级与群组（类似混合专家架构 MoE），智能路由最合适的脑力资源。

### 可视化会话模式
- **顺序模式**（sequential）：智能体按预定顺序依次发言
- **面板模式**（panel）：多智能体并行响应同一消息

### 智能分发
- SmartDispatchService 根据消息内容自动选择最合适的智能体响应
- 基于智能体专业领域匹配和对话上下文分析

### 自动讨论
- AutonomousTask 支持多种自动化任务类型：
  - `discussion`：多轮自动讨论，可配置轮数和主题
  - `conditional_stop`：满足条件时自动停止
  - `variable_trigger`：变量变化触发
  - `time_trigger`：定时触发
  - `autonomous_scheduling`：自主调度
- 支持流式响应（SSE），实时推送智能体回复

### 会话总结
- SummaryService 支持对会话内容生成总结
- 创建新子任务时可自动携带上一会话的总结作为上下文

## 4. 打破虚拟边界：MCP 生产工具生态

智能体不再只能“陪聊”。通过对标准化 MCP 协议的深度支持，智能体可以直接与您现有的软件基础设施无缝挂载。

### 多样化通信方式
MCP 服务器管理器（MCPServerManager）支持四种通信协议：
- **stdio**：标准输入输出，适合本地工具
- **streamable_http**：StreamableHTTP 协议，适合远程服务
- **sse**：Server-Sent Events，适合流式响应
- **http**：简单 HTTP API，支持 OpenAPI 规范

### 服务器管理
- 从 JSON 配置文件加载 MCP 服务器定义
- 支持动态启动、停止和重新加载服务器
- 内置环境变量服务器（variables-server），提供智能体对变量的读写能力
- 工具模式缓存（ToolSchemaCache）提高性能

### 能力系统
- Capability 模型定义智能体能力（如 memory、knowledge_access、planner）
- 能力与 MCP 工具关联：`{"server1": ["tool1", "tool2"]}`
- 支持安全级别分级（1=低风险, 2=中风险, 3=高风险）
- 角色通过 RoleCapability 绑定能力

## 5. 具备深度逻辑推理的图谱大脑

简单的向量切片往往在面临跨文档推理时碰壁。MesaLogo 提供更高级别的图形连接与时间跨度感知。

### 领先的内置图谱知识库
- **向量知识库**（vector）：基于 Milvus 向量数据库
  - 文档处理流水线：上传 → 格式转换（PDF/Word/TXT/Markdown）→ 分块 → 嵌入 → 入库
  - 支持混合检索（hybrid）：70% 向量 + 30% BM25 关键词，加权融合
  - 内置 Reranker 重排序服务
- **LightRAG 知识库**（lightrag）：轻量级图谱 RAG
  - 支持 naive/local/global/hybrid/mix 五种查询模式
  - 独立 workspace 隔离

### 图谱增强记忆
- GraphEnhancement 配置支持 Graphiti/LightRAG/GraphRAG 三种框架
- Graphiti 提供时间敏感的图谱记忆，时间越久远的知识权重越低
- MemoryCapabilityService 根据图谱增强开关动态管理所有角色的 memory 能力
- MemorySyncService 负责记忆数据的同步

### 外部知识库兼容
- 通过 ExternalKnowledgeProvider 对接外部平台：
  - **Dify**（DifyAdapter）
  - **FastGPT**（FastGPTAdapter）
  - **RagFlow**（RagFlowAdapter）
  - **自定义**（CustomAdapter）
- 角色可同时绑定内部知识库和外部知识库

## 6. 面向推演的环境变量系统

提供媲美专业级仿真软件的全局与私有状态管理，使得大规模系统推演和数据流转成为可能。

### 模板与实例隔离设计
- **行动空间层**：ActionSpaceSharedVariable / ActionSpaceEnvironmentVariable 定义变量模板
- **任务实例层**：ActionTaskEnvironmentVariable 为任务级公共变量，所有智能体可见
- **智能体层**：AgentVariable 为智能体私有变量，支持 `is_public` 控制可见性

### 变量特性
- 所有变量支持历史记录（history JSON 字段），追踪变量值的变化
- 支持共享环境变量（SharedEnvironmentVariable），跨任务共享
- ExternalVariableMonitor 监控外部变量变化
- 变量通过 MCP 变量服务器暴露给智能体读写

## 7. 超越聊天界面的实体应用生态

在虚拟与真实的交界处，智能体能真正“使用工具”而非仅仅“查询API”。

### 原生应用集成
- MarketApp 模型管理应用市场中的实体应用
- 内置应用包括：NetLogo 建模程序、GIS 地图、Code 编程服务器等
- 应用通过 ActionSpaceApp 绑定到行动空间

### VNC 远程桌面
- VNC 代理管理器（VNCProxy）基于 websockify 实现 WebSocket 到 VNC TCP 的代理
- 单端口 + Token 动态路由架构，支持多应用实例并发访问

## 8. 零成本试错的平行沙箱实验室

消除对大模型不确定性的恐慌，用严谨的对照实验找出最优的业务策略。

### 科学的对照实验体系
- **对比实验**（comparative）：生成变量的笛卡尔积组合，每个组合创建独立的 ActionTask
- **普通任务**（normal）：使用固定变量值，生成单个任务实例

### 实验流程
- 绑定 ActionSpace 场景模板作为实验基础
- 自动克隆 ActionTask，每个克隆任务变量隔离（`is_experiment_clone=True`）
- 复用现有的 ActionTask + AutonomousTask 机制执行实验
- ExperimentStep 记录每个实验步骤的状态和结果

### 实验配置
- 支持变量枚举（enumerated）定义实验参数范围
- 支持优化目标（objectives）：最大化/最小化指定变量
- 支持停止条件（stop_conditions）：满足表达式时自动终止

## 9. AI 驱动的极速工程脚手架

- **一键生成流水线**：OneClickGenerationService 能够自动根据一句话需求生成全套体系（包含角色、行动空间配置、执行规则和任务框架）。
- 支持配置辅助生成专用模型（assistant_generation_model）
- 基于可定制的提示词模板（Prompt Templates）生成内容

## 10. 商业化就绪的用户与权限管理体系

针对企业内网落地打磨，原生内置强隔离与额度管理，无需从零搭建鉴权层。

### 多元认证机制
- 本地用户名/密码认证（Werkzeug password hashing）
- OAuth 2.0 社交登录：Google、GitHub 等（通过 authlib）
- JWT Token 认证

### 权限控制
- UserPermissionService 提供资源级权限过滤
- 支持管理员角色（is_admin）
- 多租户隔离：资源通过 `created_by` 和 `is_shared` 字段控制可见性
- UserRoleAssignment 支持用户角色分配

### 订阅与配额
- SubscriptionPlan 定义订阅计划和资源限额
- 存量资源检查：tasks、agents、spaces、knowledge_bases
- 增量资源检查：daily_conversations、monthly_tokens、storage_mb
- UsageRecord 记录资源使用量

## 11. 开放互联的大模型与生态兼容

不被任何单一算力提供商绑定，保证数字资产的永久兼容。

### 异构模型兼容
- ModelConfig 管理模型配置，支持：OpenAI、Anthropic Claude、Google Gemini、国内大模型等
- 角色级模型参数覆盖：temperature、top_p、frequency_penalty、presence_penalty、stop_sequences
- 支持配置默认文本生成模型和辅助生成模型

### 外部平台兼容
- 角色来源支持 `internal`（内部）和 `external`（外部）
- 兼容 OpenAI API 格式的任意平台（Dify、FastGPT、Coze 等）
