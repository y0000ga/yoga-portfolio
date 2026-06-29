import { ICaseStudy, Project } from "@/types/project";
import { AI_WORKFLOW_PROJECT } from "./registry";

const AI_WORKFLOW: ICaseStudy = {
  type: Project.CaseStudy,
  id: AI_WORKFLOW_PROJECT.id,
  title: AI_WORKFLOW_PROJECT.title,
  thumbnail: "/ai-workflow/thumbnail.png",
  relatedProjects: [],
  techStack: [
    "AI-assisted Development",
    "Frontend Workflow",
    "Requirement Analysis",
    "Technical Documentation",
    "Prompt Design",
    "Code Review",
    "Risk Control",
    "Test Case Drafting",
  ],
  intro:
    "在公司前端專案中初步導入 AI 輔助開發流程，將 AI 從直接產生程式碼的工具，轉為協助需求拆解、既有規則比對、修改細則整理、風險檢查與測試案例草稿產出的流程輔助角色。此案例聚焦於如何在既有前端專案脈絡下，降低 AI 誤解需求、越界修改與增加 review 成本的風險，並讓工程師保留最終實作判斷與程式碼審查責任。",
  context: {
    scale: "公司前端專案內部流程實驗 / 初步導入",
    team: "Frontend team",
    role: "AI-assisted workflow design / Prompt design / Frontend process pilot",
  },

  FAQs: [
    {
      question: "這個 case study 主要想解決什麼問題？",
      answer:
        "此案例聚焦於在公司既有前端專案中導入 AI 輔助開發流程。核心問題不是讓 AI 直接產生程式碼，而是如何讓 AI 在既有元件規則、商業流程、資料流與歷史實作脈絡下，協助工程師進行需求拆解、規則比對、修改細則整理、風險檢查與測試案例草稿產出，同時降低需求誤解、越界修改與 review 成本。",
    },
    {
      question: "為什麼不能直接讓 AI 修改前端程式碼？",
      answer:
        "公司前端專案通常存在既有元件規則、資料流、商業流程與歷史實作脈絡。若 AI 直接根據 PM 需求修改程式碼，容易忽略既有規範、誤解需求、修改超出預期範圍，甚至產生不必要的 diff，增加 review 與驗證成本。因此流程上先讓 AI 協助分析需求與整理修改細則，再由工程師確認範圍後才進入局部實作輔助。",
    },
    {
      question: "AI 在這個流程中的角色是什麼？",
      answer:
        "AI 被拆分為 Requirement Analyst、Assisted Implementer 與 Review Assistant 三種角色。Requirement Analyst 負責讀取需求、比對 Wiki / 現有程式 / 歷史規則，整理 gap analysis、影響範圍與待確認問題。Assisted Implementer 只在工程師確認修改細則後，針對指定模組或 component 提供局部修改建議。Review Assistant 則協助整理 review checklist、潛在風險、測試缺口與測試案例草稿。",
    },
    {
      question: "如何避免 AI 越界修改？",
      answer:
        "流程上會先由工程師確認 source of truth、修改細則與可修改範圍，再限制 AI 只能針對指定檔案、指定模組、指定 component 或指定 API flow 進行調整。AI 的輸出被定位為修改建議或實作草稿，而不是可直接合併的最終程式碼。最終修改、review 與提交仍由工程師負責。",
    },
    {
      question: "如何讓 AI 產出更貼近既有專案脈絡？",
      answer:
        "導入前會先整理前端專案 Wiki、元件規則、資料流與常見開發規範，作為 AI 判斷需求與修改方向的 context baseline。需求進入實作前，AI 會先對照既有規則與現有程式，產出差異分析、影響範圍、待確認問題與修改細則草稿，避免只產生通用型程式碼。",
    },
    {
      question: "工程師在流程中負責哪些決策？",
      answer:
        "工程師負責確認 source of truth、需求是否明確、修改細則是否合理、AI 是否允許進入輔助實作階段、實際修改範圍、程式碼審查、測試驗證與最終提交。AI 可以協助整理、分析、產生草稿與檢查風險，但不取代工程師的需求判斷、實作責任與 review 責任。",
    },
    {
      question: "這個流程如何協助 review 與測試？",
      answer:
        "AI 不只協助實作，也會在實作前後整理 review checklist、潛在風險、測試缺口與測試案例草稿。這些產出可作為工程師 review 與驗證時的參考，讓風險檢查與測試設計提前進入開發流程，而不是等到開發後期才補。",
    },
    {
      question: "這個流程目前的導入範圍到哪裡？",
      answer:
        "此案例屬於公司前端團隊內的初步流程實驗 / pilot，重點是建立可追蹤、可控管、可被工程師審查的 AI-assisted frontend workflow。目前尚未串接 CI/CD，也不是完整自動化 pipeline，而是先將 AI 放在需求分析、修改細則、輔助實作、review checklist 與測試案例草稿等低風險且高輔助價值的位置。",
    },
  ],

  impacts: [
    "降低 AI 直接修改程式碼造成的需求誤解、越界修改與返工風險。",
    "讓需求拆解、修改範圍、待確認問題與 review 重點更容易被文件化與追蹤。",
    "提升前端開發前期的規格整理效率，減少工程師從零拆解需求與比對既有規則的時間。",
    "讓 AI 產出更貼近既有專案規則與實際程式脈絡，而不是只產生通用型程式碼。",
    "協助工程師在實作前先檢查可能的風險、影響範圍與測試缺口，降低後期補測與 review 壓力。",
    "形成可被後續擴充的 AI-assisted frontend workflow，作為團隊導入 AI 開發輔助的初步方法論。",
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
