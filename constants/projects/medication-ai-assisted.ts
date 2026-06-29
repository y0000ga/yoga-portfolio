import { ICaseStudy, MediaType, Project } from "@/types/project";
import { MEDICHECK_PROJECTS } from "./registry";

const MEDICHECK_AI_ASSISTED_WORKFLOW: ICaseStudy = {
  type: Project.CaseStudy,
  id: MEDICHECK_PROJECTS.aiAssistedWorkflow.id,
  title: MEDICHECK_PROJECTS.aiAssistedWorkflow.title,
  thumbnail: "/medi-check-ai-assisted/thumbnail.png",
  intro:
    "以 MediCheck 服藥追蹤系統為案例，整理一套適用於一人全端 side project 的 AI-assisted engineering workflow。此案例聚焦於如何在缺少 PM、設計、前端、後端與 reviewer 分工的情境下，透過產品規格、技術規格、OpenAPI、Google Stitch 產生的 UI prototype 與 DESIGN.md、Figma 整理後的畫面截圖、既有程式碼與開發決策，組裝成可交接的 implementation context，再透過 primary / secondary agent 協作、cross-AI review 與 human review gate，降低前後端落差、AI 自產自審與規格漂移風險。Claude Code、OpenAI Codex、Google Stitch 與 Figma 等工具在此流程中被分配到不同階段，而最終產品判斷、架構取捨、UX 驗證與核心排程邏輯仍由開發者主導。",
  context: {
    scale:
      "一人全端 side project，橫跨 MediCheck Frontend 與 Backend，涵蓋產品規格、技術規格、前端互動、後端 API、OpenAPI contract、資料模型、排程邏輯與整合驗證。",
    team: "Solo developer with AI-assisted engineering workflow",
    role: "Fullstack Developer / System Designer / AI-assisted Engineering Workflow Designer",
  },
  demos: [
    {
      type: MediaType.Hyperlink,
      mediaURL: "https://y0000ga.github.io/medi-check-backend/",
      content: "線上 API 文件",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://github.com/y0000ga/medi-check-docs/blob/main/healing-touch-tokens.json",
      content: "Design Token (healing-touch-tokens.json)",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://github.com/y0000ga/medi-check-docs/blob/main/Medi_Check_%E6%8A%80%E8%A1%93%E8%A6%8F%E6%A0%BC%E6%9B%B8.md",
      content: "技術規格書",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://raw.githubusercontent.com/y0000ga/medi-check-docs/refs/heads/main/Medi_Check_%E7%94%A2%E5%93%81%E8%A6%8F%E6%A0%BC%E6%9B%B8.md",
      content: "產品規格書",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://raw.githubusercontent.com/y0000ga/medi-check-docs/refs/heads/main/healing-touch-tokens.json",
      content: "healing-touch-tokens.json",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://raw.githubusercontent.com/y0000ga/medi-check-backend/refs/heads/main/AGENT_CONTEXT.md",
      content: "後端專案 AGENT_CONTEXT.md",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL:
        "https://raw.githubusercontent.com/y0000ga/medi-check-website/refs/heads/main/AGENT_CONTEXT.md",
      content: "前端專案 AGENT_CONTEXT.md",
    },
    {
      type: MediaType.Hyperlink,
      mediaURL: 'https://www.figma.com/design/CUWb4wPepuUaHgi0pkYqAL/MediCheck',
      content: 'Google Stitch + Figma 協作設計稿'
    }
  ],

  relatedProjects: [
    {
      id: MEDICHECK_PROJECTS.backend.id,
      name: MEDICHECK_PROJECTS.backend.title,
    },
    {
      id: MEDICHECK_PROJECTS.frontend.id,
      name: MEDICHECK_PROJECTS.frontend.title,
    },
  ],

  FAQs: [
    {
      question: "這個 case study 主要想解決什麼問題？",
      answer:
        "MediCheck 是一人全端 side project，同時橫跨產品規格、技術規格、OpenAPI、UI prototype、Figma 截圖、前端實作、後端 API、資料模型與文件維護。核心問題不是單一功能如何實作，而是如何避免規格、API、UI 與資料模型在 AI-assisted 開發過程中逐漸脫節。",
    },
    {
      question: "為什麼需要 implementation context？",
      answer:
        "coding agent 若只依賴單一 prompt、單一截圖或局部程式碼，容易根據不完整資訊產生錯誤假設。此流程將 Product Spec、Technical Spec、OpenAPI、Google Stitch UI prototype、DESIGN.md、Figma 截圖、既有程式碼與 decision log 組裝成共同上下文，讓 AI agent 的實作與 review 都能回到一致依據。",
    },
    {
      question: "為什麼採用 contract-first workflow？",
      answer:
        "OpenAPI 作為 frontend / backend 的共同契約，使需求、資料模型、API 行為與 AI 任務拆解都有可追蹤依據。這讓前端 API 串接、後端 domain model、payload mapping 與 review checklist 都能回到同一份 contract，降低前後端理解落差與整合風險。",
    },
    {
      question: "為什麼不用 Figma MCP server？",
      answer:
        "經評估後，Figma MCP server 對此一人 side project 的導入成本與維護成本不符合效益。Google Stitch 已能產生 UI prototype 與 DESIGN.md，再搭配 Figma 整理後的截圖與設計說明，即可提供足夠穩定的 visual context，因此改採較低成本、較容易維護的 screenshot-based implementation context。",
    },
    {
      question:
        "Google Stitch、DESIGN.md 與 Figma 在流程中扮演什麼角色？",
      answer:
        "Google Stitch 用於快速產生初步 UI prototype 與 DESIGN.md，協助建立畫面結構、元件層級與互動說明。Figma 則作為 UX reference 與畫面整理工具，最後以截圖與設計說明的方式併入 implementation context，提供 coding agents 穩定的 visual reference。",
    },
    {
      question: "為什麼採用 primary / secondary agent 協作？",
      answer:
        "若同一個 AI 同時負責產出與審查，容易延續自己的錯誤假設。此流程採用主副制：同一時間由 primary builder 產生小範圍 patch，secondary agent 負責 contract checking、diff review、test checklist 或 context compression，再由 human review gate 做最終決策。",
    },
    {
      question: "Claude Code 與 OpenAI Codex 如何分工？",
      answer:
        "Claude Code 主要負責規格推導、架構規劃、核心實作與複雜邏輯 review；OpenAI Codex 則用於 OpenAPI 對照、文件壓縮、重複性 patch、diff review 與測試清單整理。實際分工會依任務性質切換，但原則是同一時間只讓一個 agent 擔任 primary builder，另一個 agent 負責輔助或 review。",
    },
    {
      question: "哪些事情仍由人類開發者決策？",
      answer:
        "AI 負責整理上下文、產生 patch、補齊重複性程式碼與協助 review；但 MVP scope、使用者流程、UX 取捨、系統架構、API contract 確認、核心排程邏輯、整合驗證、規格補齊與 merge decision 仍由開發者負責。",
    },
    {
      question: "這套流程如何避免文件與實作逐漸脫節？",
      answer:
        "每次實作與驗證後，會將 UX 調整、API contract 變更、schema 決策、review findings、實測結果與待辦事項回寫至 Product Spec、Technical Spec、OpenAPI、Decision Log 或下一輪任務說明，讓下一輪 AI agent 拿到的是更新後的 implementation context，而不是過期假設。",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "Case Study Scope",
        caption:
          "此案例研究不重複描述 Frontend / Backend 的實作細節，而是整理一套橫跨產品規格、API contract、design artifact、implementation context、AI agent 協作與 human review gate 的一人全端工程流程。",
        explanation: [
          "Frontend project 與 Backend project 是此流程的兩個驗證場域，而不是本案例重複展開的實作細節。",
          "Case study 聚焦如何將需求、UI prototype、DESIGN.md、Figma 截圖、API contract、implementation patch、review finding 與文件回寫串成可迭代流程。",
          "核心價值在於 AI-assisted engineering governance：如何組裝 implementation context、分配 AI agent 角色、降低 contract mismatch、避免自產自審，並保留 human decision gate。",
        ],
        sources: {
          mermaid: `
flowchart TD
    CASE["AI-assisted Engineering Case Study"]

    CASE --> CONTEXT["Product Context / Requirement Scope"]
    CASE --> CONTRACT["API Contract / Data Boundary"]
    CASE --> ARTIFACT["Design Artifacts: Stitch / DESIGN.md / Figma Screenshots"]
    CASE --> IMPLCTX["Implementation Context Assembly"]
    CASE --> AGENT["AI Agent Collaboration"]
    CASE --> GATE["Human Review Gate"]
    CASE --> LOOP["Decision Log / Feedback Loop"]

    CONTEXT --> FE["MediCheck Frontend: Frontend Side Project"]
    CONTRACT --> FE
    ARTIFACT --> FE
    IMPLCTX --> FE
    AGENT --> FE
    GATE --> FE
    LOOP --> FE

    CONTEXT --> BE["MediCheck Backend: Backend Side Project"]
    CONTRACT --> BE
    IMPLCTX --> BE
    AGENT --> BE
    GATE --> BE
    LOOP --> BE
`,
        },
      },
      {
        title: "Implementation Context Assembly",
        caption:
          "將產品規格、技術規格、OpenAPI、Google Stitch 產出的 UI prototype / DESIGN.md、Figma 截圖與既有程式碼組裝成 coding agents 可使用的 implementation context。",
        explanation: [
          "Product Spec 與 Technical Spec 定義需求、限制、資料規則與系統責任。",
          "OpenAPI 作為前後端共同 contract，降低 frontend / backend 對資料模型與 API 行為的理解落差。",
          "Google Stitch 產生 UI prototype 與 DESIGN.md，Figma 用於整理 UX reference，最後以截圖與設計說明提供給 coding agents。",
          "Implementation context 不是單一工具輸出，而是將 spec、contract、design artifact、existing code 與 decision log 組裝成可執行上下文。",
        ],
        sources: {
          mermaid: `
flowchart TD
    A["Product Spec: 功能需求 / 使用情境 / MVP Scope"]
    B["Technical Spec: 架構限制 / 資料規則 / 模組責任"]
    C["OpenAPI: Request / Response / Rule Model / Event Status"]

    D["Google Stitch"]
    D --> D1["UI Prototype"]
    D --> D2["DESIGN.md"]

    D1 --> E["Figma Refinement: UX Reference"]
    D2 --> F["Design Notes"]

    E --> G["Annotated Screenshots"]
    F --> H["Design Context Summary"]

    A --> I["Implementation Context"]
    B --> I
    C --> I
    G --> I
    H --> I
    J["Existing Code / Repository Context"] --> I
    K["Decision Log / Open Questions"] --> I

    I --> L["Primary Builder Agent"]
    L --> M["Implementation Patch"]
`,
        },
      },
      {
        title: "AI-assisted Fullstack Engineering Pipeline",
        caption:
          "從 raw idea 到 spec、API contract、implementation context、implementation patch、review 與文件回寫的完整工程流程。",
        explanation: [
          "Claude Code + Superpowers 負責產品規格整理、需求缺口檢查、API contract 推導與 implementation planning。",
          "Google Stitch 產生 UI prototype 與 DESIGN.md，Figma 整理後以截圖與設計說明納入 implementation context。",
          "Primary builder agent 根據明確任務與 implementation context 產生小範圍 implementation patch，避免一次性大改。",
          "Secondary review / contract agent 負責檢查 schema consistency、API contract、state flow、edge cases 與核心排程邏輯。",
          "Human review gate 負責最終產品判斷、架構取捨、UX 驗證、整合驗證、規格補齊與 merge decision。",
        ],
        sources: {
          mermaid: `
flowchart TD
    A["Raw Product Ideas: 用藥情境 / 功能需求 / 資料需求"] --> B["Initial Markdown Spec"]

    B --> C["Claude Code + Superpowers: Spec Refinement / Requirement Gap Review"]
    C --> D["Product Spec / Decision Draft"]

    D --> E{"Human Review Gate: MVP / Scope / Requirement Decision"}

    E -->|Approved| F["API Contract / Data Boundary Derivation"]
    F --> G["OpenAPI / Request / Response / Rule Model / Event Status"]

    G --> H["Implementation Planning / Task Breakdown"]

    G --> I["Google Stitch: UI Prototype + DESIGN.md"]
    I --> J["Figma: UX Reference / Screen Organization"]
    J --> K["Annotated Screenshots / Design Notes"]

    H --> L["Implementation Context Assembly"]
    K --> L
    G --> L

    L --> M["Primary Builder Agent: Implementation Patch"]
    M --> N["Secondary Agent: Contract Check / Diff Review / Test Checklist"]
    N --> O{"Human Review Gate: Architecture / UX / Integration Validation"}

    O -->|Need Fix| L
    O -->|Accepted| P["Spec / API Doc / Decision Log Feedback Loop"]

    P --> C
    P --> H
    P --> L
`,
        },
      },
      {
        title: "Primary / Secondary Agent Collaboration Model",
        caption:
          "採用主副制協作：同一時間只由一個 agent 擔任 primary builder，另一個 agent 負責 review、contract checking 或 context compression。",
        explanation: [
          "Primary builder agent 負責依明確任務產生小範圍 patch，避免跨模組大改與 merge conflict。",
          "Secondary agent 負責檢查 API contract、schema consistency、frontend state flow、edge cases、測試清單與文件同步。",
          "人類開發者負責決定 agent 分工、鎖定修改範圍、驗證結果與處理 merge decision。",
        ],
        sources: {
          mermaid: `
flowchart LR
    A["Human-defined Task: 需求、限制、不可修改範圍"] --> B["Implementation Context / Review Checklist"]

    B --> C["Primary Builder Agent: Implementation Patch"]
    C --> D["Secondary Agent: Diff Review / Contract Check"]

    D --> E{"Human Review Gate"}
    E -->|Reject / Revise| C
    E -->|Accept| F["Merge / Refactor / Document Update"]

    D --> G["Review Focus"]
    G --> G1["API Contract"]
    G --> G2["Schema Consistency"]
    G --> G3["Frontend State Flow"]
    G --> G4["Core Scheduling Logic"]
    G --> G5["Edge Cases"]
    G --> G6["Test Checklist"]
`,
        },
      },
      {
        title: "Continuous Engineering Feedback Loop",
        caption:
          "每次實作與驗證後，將 UX 調整、contract 變更、schema 決策、實測結果與待辦事項回寫到文件，避免 implementation context 漂移。",
        explanation: [
          "AI 產出的 patch 不直接視為完成，必須經過 human review gate 與實際操作驗證。",
          "驗證結果會回寫至 Product Spec、Technical Spec、OpenAPI、Decision Log 或下一輪任務說明。",
          "這個 loop 讓 AI agent 每一輪都能拿到更新後的 implementation context，而不是重複依賴過期假設。",
        ],
        sources: {
          mermaid: `
flowchart TD
    A["Implementation Patch"] --> B["Human Validation: UX / Flow / Integration"]
    B --> C["Review Findings"]

    C --> D["Product Spec Update"]
    C --> E["Technical Spec Update"]
    C --> F["OpenAPI / Contract Update"]
    C --> G["Decision Log / Open Questions"]

    D --> H["Updated Implementation Context"]
    E --> H
    F --> H
    G --> H

    H --> I["Next AI-assisted Task"]
    I --> A
`,
        },
      },
    ],
  },

  impacts: [
    "將 AI 使用方式從零散問答提升為可重複的一人全端工程流程，支援規格整理、任務拆解、實作、審查、驗證與文件回寫。",
    "透過 implementation context assembly，讓 AI agent 不只依賴單一 prompt 或單一截圖，而是根據 spec、contract、design artifact、existing code 與 decision log 進行實作。",
    "透過 primary / secondary agent 的產出與審查分離，降低 AI 自產自審造成的 contract mismatch、schema inconsistency 與 state flow 錯誤風險。",
    "透過 contract-first workflow，使 frontend website 與 backend API 在資料模型、event instance、history 與 schedule rule 上維持一致。",
    "透過 human review gate 保留產品判斷、架構取捨、UX 驗證與核心排程邏輯的主導權，避免 AI 工具鏈凌駕於工程決策之上。",
    "在不依賴 Figma MCP server 的情況下，以 Google Stitch DESIGN.md、Figma 截圖與規格文件組成穩定 visual context，降低工具成本與長期維護負擔。",
    "讓 MediCheck 的 Frontend / Backend side projects 不只是獨立功能實作，也能共同呈現一套可套用到其他 side project 的 AI-assisted fullstack engineering workflow。",
  ],

  techStack: [
    "Claude Code",
    "Superpowers skills",
    "OpenAI Codex",
    "Google Stitch",
    "Google Stitch DESIGN.md",
    "Figma",
    "Annotated Screenshots",
    "Implementation Context Assembly",
    "Human-in-the-loop Workflow",
    "Cross-AI Review",
    "Primary / Secondary Agent Collaboration",
    "Contract-first Development",
    "AI-assisted Engineering Governance",
    "Fullstack Engineering Workflow",
  ],
};

export default MEDICHECK_AI_ASSISTED_WORKFLOW;
