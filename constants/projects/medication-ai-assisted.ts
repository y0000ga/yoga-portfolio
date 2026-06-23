import { ICaseStudy, Project } from "@/types/project";

const MEDICHECK_AI_ASSISTED_WORKFLOW: ICaseStudy = {
  type: Project.CaseStudy,
  id: "medicheck-ai-assisted-workflow",
  title: "MediCheck — AI 輔助一人全端產品開發流程",
  thumbnail:'/medi-check-ai-assisted/thumbnail.png',
  intro:
    "以 MediCheck 服藥追蹤系統為案例，整理一套適用於一人全端 side project 的 AI-assisted product development workflow。此案例聚焦於如何從初始產品想法出發，透過 Claude Code + Superpowers、OpenAI Codex、Google Stitch、Figma MCP server 與 cross-AI review 流程，串接產品規格、UI prototype、API contract、前端實作、後端設計與整合驗證，同時保留開發者對產品判斷、架構取捨、UX 驗證與核心排程邏輯的主導權。",
  context: {
    scale:
      "一人全端 side project，橫跨 MediCheck Mobile 與 Backend，涵蓋產品規格、前端互動、後端 API、資料模型、排程邏輯與整合驗證。",
    team: "Solo developer with AI-assisted workflow",
    role: "Fullstack Developer / System Designer / AI-assisted Product Workflow Designer",
  },
  demos: [],

  relatedProjects: [
    {
      id: "medicheck-schedule-backend",
      name: "MediCheck 服藥追蹤 (Backend)",
    },
    {
      id: "medicheck-frontend",
      name: "MediCheck 服藥追蹤 (Mobile)",
    },
  ],

  problems: [
    "MediCheck 同時包含 mobile frontend 與 backend，需求橫跨病人管理、藥品管理、排程規則、服藥紀錄與照護關係，一人開發時容易在規格、API、UI 與資料模型之間產生落差。",
    "用藥排程不是單純 CRUD，核心包含 frequency rule、schedule / history 分離、event instance 展開與事件生命週期管理，需要明確區分產品規格、資料契約與實作責任。",
    "Side project 缺少 PM、設計、後端、前端與 reviewer 的角色分工，因此需要將 AI 拆分為規格整理、工程拆解、實作輔助與審查輔助等不同角色。",
    "若 AI 只被用來直接產生程式碼，容易出現規格未確認、前後端 contract 不一致、schema 與 UI state 脫節，以及同一個 AI 自產自審的品質風險。",
    "UI prototype、Figma 設計稿、前端實作與 API contract 之間需要建立可追蹤的設計脈絡，避免設計與實作在後續迭代中分離。",
  ],
  solution: [
    "將 MediCheck 的一人全端開發流程拆成 spec、contract、design context、implementation patch、cross-AI review 與 human review gate，使 AI 參與節點可被追蹤與驗證。",
    "使用 Claude Code + Superpowers 進行 Product Spec Refinement、Requirement Gap Review、API Contract Derivation 與 Implementation Planning，將初始 markdown 需求整理為產品規格、API contract 與前後端任務拆解。",
    "使用 Google Stitch 產生 UI prototype，匯入 Figma 作為 UX reference，並透過 Figma MCP server 將 design context 提供給 Claude Code / OpenAI Codex，強化 design-to-code 對齊。",
    "採用 OpenAI Codex 作為 Implementation AI，根據明確任務補齊重複性 CRUD 頁面、RESTful API、response 欄位與 boilerplate，並以小範圍 patch 形式輸出，降低 review 成本。",
    "使用 Claude Code 作為 Review AI，對 Codex 產出的變更進行 schema consistency、API contract、frontend state flow、edge case 與核心排程邏輯檢查。",
    "建立 cross-AI review 流程，避免同一個 AI 同時負責產出與審查，並由開發者負責最終架構判斷、整合驗證與核心邏輯把關。",
    "將 UX 調整、API contract 變更、schema 決策與待辦事項回寫至產品規格與技術文件，形成可持續迭代的 feedback loop。",
  ],

  architecture: {
    diagrams: [
      {
        title: "Case Study Scope",
        caption:
          "此案例研究不重複描述 Frontend / Backend 實作細節，而是整理橫跨兩個專案的 AI-assisted 開發流程。",
        explanation: [
          "Mobile project 聚焦使用者互動、狀態管理、API consumption 與 UX flow。",
          "Backend project 聚焦分層架構、資料模型、排程展開、history snapshot 與 API contract。",
          "AI-assisted workflow case study 聚焦 spec、contract、implementation、review、debug 與 feedback loop。",
        ],
        sources: {
          mermaid: `
flowchart TD
    CASE["AI-assisted Workflow Case Study"]

    CASE --> SPEC["Product Spec / Requirement Refinement"]
    CASE --> CONTRACT["API Contract / Data Boundary"]
    CASE --> DESIGN["UI Prototype / Design Context"]
    CASE --> IMPL["Implementation Patch Workflow"]
    CASE --> REVIEW["Cross-AI Review / Human Review Gate"]

    SPEC --> FE["MediCheck Mobile: Frontend Side Project"]
    CONTRACT --> FE
    DESIGN --> FE
    IMPL --> FE

    SPEC --> BE["MediCheck Backend: Backend Side Project"]
    CONTRACT --> BE
    IMPL --> BE
    REVIEW --> BE
`,
        },
      },
      {
        title: "AI-assisted Fullstack Development Pipeline",
        caption:
          "從 raw idea 到 spec、API contract、UI prototype、implementation patch、review 與文件回寫的完整流程。",
        explanation: [
          "Claude Code + Superpowers 負責產品規格整理、需求缺口檢查、API contract 推導與 implementation planning。",
          "Google Stitch 產生初步 UI prototype，Figma 與 Figma MCP server 提供 design context 給 coding agents。",
          "OpenAI Codex 負責根據明確任務產生小範圍 implementation patch。",
          "Claude Code 負責 cross-AI review，檢查 schema consistency、API contract、state flow 與核心排程邏輯。",
          "人類 review gate 負責最終產品判斷、架構取捨、UX 驗證與整合驗證。",
        ],
        sources: {
          mermaid: `
flowchart TD
    A["Raw Product Ideas: 用藥情境 / 功能需求 / 資料需求"] --> B["Initial Markdown Spec"]

    B --> C["Claude Code + Superpowers: Product Spec Refinement"]
    C --> D["Product Spec Draft"]

    D --> E["Claude Code + Superpowers: Requirement Gap Review"]
    E --> F{"Human Review Gate: MVP / Scope / Requirement Decision"}

    F -->|Approved| G["Claude Code + Superpowers: API Contract Derivation"]
    G --> H["API Document: Request / Response / Rule Model / Event Status"]

    H --> I["Claude Code + Superpowers: Implementation Planning"]
    I --> J["Frontend / Backend Task Breakdown"]

    H --> K["Google Stitch: UI Prototype"]
    K --> L["Figma: UX Reference"]
    L --> M["Figma MCP Server: Design Context Bridge"]

    M --> N["Frontend Implementation Context"]
    J --> O["Backend Implementation Context"]

    N --> P["OpenAI Codex: Frontend Patch Generation"]
    O --> Q["OpenAI Codex: Backend Patch Generation"]

    P --> R["Claude Code: Cross-AI Review"]
    Q --> R

    R --> S{"Human Review Gate: Architecture / UX / Integration Validation"}

    S -->|Need Fix| P
    S -->|Need Fix| Q
    S -->|Accepted| T["Spec / API Doc / Decision Log Feedback Loop"]
`,
        },
      },
      {
        title: "Cross-AI Review Workflow",
        caption:
          "將 AI 分為 implementation 與 review 角色，避免由同一個 AI 同時負責產出與審查。",
        explanation: [
          "OpenAI Codex 作為 Implementation AI，負責依明確任務產生小範圍 patch。",
          "Claude Code 作為 Workflow / Review AI，負責檢查 contract、schema、state flow、edge cases 與核心排程邏輯。",
          "人類開發者負責最終架構判斷、整合驗證與核心邏輯把關。",
        ],
        sources: {
          mermaid: `
flowchart LR
    A["Human-defined Task: 需求、限制、不可修改範圍"] --> B["Claude Code + Superpowers: Planning / Review Checklist"]

    B --> C["OpenAI Codex: Implementation Patch"]
    C --> D["Claude Code: Cross-AI Review"]

    D --> E{"Human Review Gate"}
    E -->|Reject / Revise| C
    E -->|Accept| F["Merge / Refactor / Document Update"]

    D --> G["Review Focus"]
    G --> G1["API Contract"]
    G --> G2["Schema Consistency"]
    G --> G3["Frontend State Flow"]
    G --> G4["Core Scheduling Logic"]
    G --> G5["Edge Cases"]
`,
        },
      },
      {
        title: "Design-to-Code Context Flow",
        caption:
          "使用 Google Stitch、Figma 與 Figma MCP server，將 UI prototype 轉為可被 coding agents 參考的設計脈絡。",
        explanation: [
          "Google Stitch 用於快速產生初步 UI prototype。",
          "Figma 作為 UX reference 與 design baseline。",
          "Figma MCP server 將 design context 提供給 Claude Code / OpenAI Codex，協助前端實作與設計稿對齊。",
          "核心頁面仍由人類手動實作與驗證，重複性頁面再交由 Codex 產生 patch。",
        ],
        sources: {
          mermaid: `
flowchart TD
    A["Google Stitch: AI-assisted UI Prototype"] --> B["Figma: UX Reference / Design Baseline"]
    B --> C["Figma MCP Server: Design Context Bridge"]

    C --> D["Claude Code: Implementation Planning / Review"]
    C --> E["OpenAI Codex: Frontend Patch Generation"]

    D --> F["Manual Core Screen Implementation"]
    F --> G{"UX Validation Gate"}

    G -->|Core Pattern Confirmed| E
    E --> H["Generated CRUD Screens / Components"]
    H --> I["Claude Code Review: UI Consistency / State Flow / API Contract"]
    I --> J["Human Review Gate"]
`,
        },
      },
    ],
  },

  impacts: [
    "將 AI 使用方式從零散問答提升為可重複的一人全端產品開發流程，支援規格整理、任務拆解、實作、審查與文件回寫。",
    "透過 Claude Code / OpenAI Codex 的產出與審查分離，降低 AI 自產自審造成的 contract mismatch、schema inconsistency 與 state flow 錯誤風險。",
    "透過 Figma MCP server 將設計脈絡提供給 coding agents，改善 UI prototype、Figma reference 與前端實作之間的對齊程度。",
    "透過 contract-first workflow，使 frontend mobile app 與 backend API 在資料模型、event instance、history 與 schedule rule 上維持一致。",
    "讓 MediCheck 的 Frontend / Backend side projects 不只是獨立功能實作，也能共同呈現一套可套用到其他 side project 的 AI-assisted fullstack workflow。",
  ],
  techStack: [
    "Claude Code",
    "Superpowers skills",
    "OpenAI Codex",
    "Google Stitch",
    "Figma",
    "Figma MCP server",
    "Human-in-the-loop Workflow",
    "Cross-AI Review",
    "Contract-first Development",
    "Design-to-code Context",
    "Fullstack Development Workflow",
  ],
};

export default MEDICHECK_AI_ASSISTED_WORKFLOW;
