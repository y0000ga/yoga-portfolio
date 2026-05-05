import { ICaseStudy, Project } from "@/types/project";

const AI_WORKFLOW: ICaseStudy = {
  type: Project.CaseStudy,
  id: "ai-frontend-workflow",
  title: "AI 輔助前端開發流程實驗與初步導入",
  relatedProjects: [],
  techStack: [
    "AI-assisted Development",
    "Prompt Engineering",
    "Frontend Workflow",
    "Technical Documentation",
    "Requirement Analysis",
    "Code Review",
  ],
  intro:
    "在前端開發流程中初步導入 AI 輔助機制，將 AI 用於需求拆解、既有規則比對、修改細則整理、風險檢查與測試案例草稿產出，降低直接讓 AI 修改程式碼造成的誤解與返工風險。",

  context: {
    scale: "前端專案內部流程實驗 / 初步導入",
    team: "Frontend",
    role: "流程設計、Prompt 設計與前端導入實驗",
  },

  problems: [
    "前端專案中存在既有元件規則、商業流程與歷史實作脈絡，AI 若直接修改程式碼容易誤解需求",
    "PM 需求與實際程式結構之間常需要工程師再拆解，若缺少明確修改細則，容易產生返工",
    "AI 產出程式碼時可能修改超出預期範圍，增加 review 與驗證成本",
    "不同工程師使用 AI 的方式不一致，產出品質與可追蹤性較不穩定",
    "測試案例與風險檢查常在開發後期才補，容易造成遺漏",
  ],

  solution: [
    "先整理前端專案 Wiki、元件規則、資料流與常見開發規範，作為 AI 判斷需求與修改方向的參考基準",
    "將 AI 使用流程拆成需求分析、修改細則整理、輔助實作與風險檢查幾個階段，避免直接從需求跳到程式碼修改",
    "在需求進入實作前，先讓 AI 協助比對既有規則與程式脈絡，整理 Gap Analysis、待確認問題與修改範圍",
    "由工程師人工確認修改細則後，再使用 AI 輔助產生局部程式修改建議或實作草稿",
    "限制 AI 修改範圍，要求其依照指定檔案、指定模組或指定 component 邊界進行調整",
    "讓 AI 輔助整理 review checklist、潛在風險與測試案例草稿，作為工程師 review 與驗證的參考",
    "整個流程仍由工程師主導決策、修改確認與最終 review，AI 僅作為分析、整理與輔助實作工具",
  ],

  impacts: [
    "降低 AI 直接修改程式碼造成的誤解、越界修改與返工風險",
    "讓需求拆解、修改範圍與待確認問題更容易被文件化與追蹤",
    "提升前端開發前期的規格整理效率，減少工程師從零拆解需求的時間",
    "讓 AI 產出更接近既有專案規則，而不是只產生通用型程式碼",
    "協助工程師在實作前先檢查可能的風險、影響範圍與測試缺口",
    "形成一套可被後續擴充的 AI-assisted frontend workflow，但尚未導入完整自動化或 CI/CD 流程",
  ],

  demos: [],

  architecture: {
    diagrams: [
      {
        title: "AI-assisted Frontend Workflow Pilot",
        caption:
          "以前端專案 Wiki 與既有規則為基礎，將 AI 使用拆成需求分析、修改細則、輔助實作與人工 review 幾個階段，降低直接使用 AI 改 code 的風險。",
        explanation: [
          "Phase 1 先整理前端專案 Wiki、元件規則、資料流與開發規範，作為 AI 協助分析需求時的參考依據。",
          "Phase 2 由 AI 協助讀取需求，對照既有規則與現有程式，整理差異分析、待確認問題與修改細則。",
          "Human Decision 階段由工程師或 PM 確認需求與修改範圍，避免 AI 在需求不明確時直接進入實作。",
          "Phase 3 在人工確認後，AI 只針對指定模組或指定 component 輔助產出修改建議或程式草稿。",
          "Phase 4 由 AI 輔助整理 review checklist、潛在風險與測試案例草稿，但最終 review 與決策仍由工程師負責。",
          "此流程目前屬於前端團隊內的初步流程實驗，尚未串接 CI/CD，也不是完整自動化 pipeline。",
        ],
        sources: {
          mermaid: `
flowchart TD

    %% ===== Phase 1: Knowledge Base =====
    A[整理前端專案 Wiki / 元件規則 / 資料流 / 開發規範]
    B[工程師人工確認 Source of Truth]

    A --> B

    %% ===== Phase 2: Requirement Analysis =====
    subgraph SA[AI Role 1 - Requirement Analyst]
        C[讀取 PM 需求或修改描述]
        D[比對 Wiki / 現有程式 / 歷史規則]
        E[整理 Gap Analysis / 影響範圍]
        F{需求是否衝突或不明確?}
        G[整理待確認問題]
        H[輸出修改細則草稿]
    end

    B --> C
    C --> D
    D --> E
    E --> F
    F -- 是 --> G
    F -- 否 --> H

    %% ===== Human Decision =====
    G --> I[PM / 工程師確認需求]
    I --> J[更新需求說明 / Wiki / 修改範圍]
    J --> C

    H --> K[工程師確認修改細則]

    %% ===== Gate =====
    K --> L{是否允許 AI 輔助實作?}
    L -- 否 --> M[工程師自行拆分與實作]
    L -- 是 --> N

    %% ===== Phase 3: Assisted Implementation =====
    subgraph IM[AI Role 2 - Assisted Implementer]
        N[依修改細則提出程式修改建議]
        O[限制在指定模組 / 指定 Component]
        P[同步整理測試案例草稿]
        Q[產出修改摘要 / Review Notes]
    end

    N --> O --> P --> Q

    %% ===== Phase 4: Human Review =====
    subgraph RV[AI Role 3 - Review Assistant]
        R[讀取修改摘要 / 測試草稿 / 修改細則]
        S[整理 Review Checklist]
        T[提出潛在風險 / 測試缺口 / 重構建議]
    end

    Q --> R
    R --> S
    S --> T

    %% ===== Final Human Decision =====
    T --> U{工程師 Review 是否通過?}
    U -- 否 --> V[工程師調整 / 指示 AI 修正]
    V --> N
    U -- 是 --> W[工程師完成最終修改與提交]
          `,
        },
      },
      {
        title: "AI Role Separation in Frontend Workflow",
        caption:
          "將 AI 使用拆成 Requirement Analyst、Assisted Implementer 與 Review Assistant，讓 AI 主要負責分析與輔助，最終決策仍由工程師掌控。",
        explanation: [
          "Requirement Analyst 負責需求理解、差異分析與待確認問題整理。",
          "Assisted Implementer 只在人工確認後，針對指定範圍提出程式修改建議。",
          "Review Assistant 協助整理風險、測試缺口與 review checklist，但不取代工程師 review。",
        ],
        sources: {
          mermaid: `
flowchart LR
    A[PM Requirement] --> B[Requirement Analyst]
    B --> C[Gap Analysis / Modification Spec Draft]
    C --> D[Human Approval]
    D --> E[Assisted Implementer]
    E --> F[Code Suggestion / Test Draft / Review Notes]
    F --> G[Review Assistant]
    G --> H[Checklist / Risk / Test Gap]
    H --> I[Human Final Review]
          `,
        },
      },
    ],
  },
};

export default AI_WORKFLOW;
