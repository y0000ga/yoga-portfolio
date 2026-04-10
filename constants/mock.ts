import { Route } from "@/helpers/route";
import { Lang } from "@/types/common";
import { ICaseStudy, ISideProject, Project } from "@/types/project";
import { IResume } from "@/types/resume";

export const TEMP_DATA_MEDICATION_FRONTEND: ISideProject = {
  type: Project.SideProject,
  id: "medicheck-frontend",
  title: "MediCheck 服藥追蹤 (Frontend)",
  relatedProjects: [
    {
      id: "medicheck-schedule-backend",
      name: "MediCheck 服藥追蹤 (Backend)",
    },
  ],

  intro:
    "使用 Expo + React Native 建構行動端服藥追蹤系統，提供病人、藥品、提醒排程、服藥紀錄與照護關係管理，並與 backend 排程與 history 設計對齊，降低前端規則計算與資料處理複雜度。",

  techStack: [
    "React Native",
    "Expo",
    "Expo Router",
    "TypeScript",
    "Zustand",
    "Day.js",
    "RESTful API",
  ],

  problems: [
    "服藥排程涉及 recurrence、頻率與結束條件，若由前端自行處理規則展開與驗證，邏輯複雜且難以維護。",
    "病人與照護者為不同角色，且一個使用者可能同時管理多個病人，若狀態未明確切分，容易造成資料混亂。",
    "新增藥品與排程流程涉及多步驟與跨資源選擇（patient / medication），單頁表單難以維持良好使用體驗。",
    "API 結構與資料模型複雜，若缺乏統一 client 與型別管理，容易造成前後端不一致。",
  ],

  solution: [
    "採用 Expo Router 的 file-based routing，將 public / protected routes 分離，統一登入與權限控管流程。",
    "將新增藥品與排程設計為 step flow（選擇病人 → 選擇藥品 → 設定內容），降低單頁複雜度並提升 UX。",
    "使用 Zustand 管理使用者、viewer（當前操作病人）與 domain state，明確區分 user 與 patient 上下文。",
    "透過 API client abstraction（libs/api）統一 request / response 處理，並搭配 TypeScript 型別確保前後端契約一致。",
    "將排程邏輯（occurrence 展開、history merge）完全交由 backend 處理，前端僅負責顯示 event instance 與觸發操作。",
    "在列表頁實作搜尋、篩選、排序與分頁機制，支援藥品與病人資料在多情境下的查詢需求。",
  ],

  impacts: [
    "將複雜排程與資料合併邏輯下沉至 backend，顯著降低前端邏輯複雜度與維護成本。",
    "透過 step flow 設計提升多步驟操作的可用性與錯誤容忍度。",
    "支援 patient / caregiver 多角色切換，使系統能應對實際照護情境。",
    "建立與 backend 對齊的資料流與 API 使用模式，提升整體系統一致性與可擴展性。",
  ],

  demos: [
    // {
    //   mediaURL: "/medicheck-home.png",
    //   content: "首頁顯示當日與近期服藥提醒",
    // },
    // {
    //   mediaURL: "/medicheck-medication-list.png",
    //   content: "藥品列表（支援搜尋、篩選與分頁）",
    // },
    // {
    //   mediaURL: "/medicheck-schedule-flow.png",
    //   content: "提醒排程 step flow",
    // },
  ],

  architecture: {
    diagrams: [
      {
        title: "Frontend Architecture",
        caption: "以 Router + State + API 分層設計前端架構",
        explanation: [
          "Expo Router 負責頁面與路由結構，區分 public / protected flow。",
          "Zustand 管理 user、viewer 與 domain state，避免跨頁面狀態混亂。",
          "API client 統一 request 與型別處理，確保與 backend 契約一致。",
        ],
        sources: {
          mermaid: `
flowchart TD
    UI[UI Components] --> ROUTER[Expo Router]
    ROUTER --> STORE[Zustand Store]
    STORE --> API[API Client]
    API --> BACKEND[FastAPI Backend]

    STORE --> VIEWER[Viewer State]
    STORE --> DOMAIN[Medication / Schedule / History]
`,
        },
      },
      {
        title: "Step Flow (Medication / Schedule)",
        caption: "多步驟流程將複雜輸入拆解為可控操作",
        explanation: [
          "先選擇 patient，再進行資源操作，確保上下文一致。",
          "將複雜表單拆解為多步驟，降低單頁認知負擔。",
          "每一步僅關注單一責任，提升錯誤控制與可維護性。",
        ],
        sources: {
          mermaid: `
flowchart LR
    A[Select Patient] --> B[Select Medication]
    B --> C[Configure Schedule]
    C --> D[Submit]
`,
        },
      },
      {
        title: "Frontend / Backend Responsibility Split",
        caption: "前端與 backend 責任分離，避免重複計算",
        explanation: [
          "前端負責 UI 呈現與使用者操作。",
          "backend 負責排程展開與 history merge。",
          "前端只消費 event instance，不處理 recurrence。",
        ],
        sources: {
          mermaid: `
sequenceDiagram
    participant FE as Frontend
    participant BE as Backend

    FE->>BE: GET /schedule-matches
    BE-->>FE: event instances + history

    FE->>BE: POST /histories
    BE-->>FE: success
`,
        },
      },
    ],
  },

  repoURL: "https://github.com/y0000ga/medi-check-frontend",
};

// 官網重構
export const TEMP_DATA_YOXI_REFACTOR: ICaseStudy = {
  type: Project.CaseStudy,
  id: "yoxi-refactor",
  title: "Yoxi 官方網站 SEO 與效能優化",
  relatedProjects: [],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "SSR",
    "SEO",
    "Tailwind CSS",
    "Performance Optimization",
  ],
  intro:
    "將原本以 CSR + Prerender.io 為主的官網重構為 Next.js SSR，重新整理資料請求、元件結構與資源載入策略，提升 SEO、效能與維護性。",

  context: {
    scale: "20+ pages",
    team: "Frontend x 3",
    role: "Frontend 主導開發與架構設計",
  },

  problems: [
    "CSR 依賴 Prerender.io，維運成本高",
    "資料請求與資源載入策略不一致，影響頁面效能",
    "元件與樣式規則分散，維護成本偏高",
    "需逐步導入 SSR 並控制重構風險與 CSR/SSR 邊界",
  ],

  solution: [
    "採用 Next.js SSR 作為主要 rendering strategy",
    "建立 page-level data fetching 與 metadata generation 機制",
    "重整 API、圖片與 script 載入策略降低 initial load",
    "建立 Tailwind-based design system 統一元件與樣式",
    "採逐頁遷移並保留 hybrid CSR/SSR 以降低風險",
  ],

  impacts: [
    "整體效能提升約 90%",
    "首頁 Lighthouse Performance 達 97 分",
    "移除 Prerender.io 降低維運成本",
    "提升 SEO 可見性與開發維護性",
  ],

  demos: [
    {
      mediaURL: "/ssr-demo.png",
      content: "首頁高負載頁面優化後 Lighthouse Performance 達 97",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "SSR Before / After",
        caption: "SSR before/after",
        sources: {
          image: "/ssr-before-after.png",
        },
      },
      {
        title: "Render Flow",
        caption: "render flow",
        sources: {
          image: "/render-flow.png",
        },
      },
    ],
  },
};

// SEO/AIO
export const TEMP_DATA_SEO_AIO: ICaseStudy = {
  type: Project.CaseStudy,
  id: "aioseo",
  title: "AIO / SEO 分析平台（0→1）",
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Crawler",
    "SEO",
    "AI Analysis",
    "Data Pipeline",
  ],
  relatedProjects: [],
  intro:
    "建立跨站點 SEO/AIO 評估與分析平台，整合多來源資料並建立標準化評分與 Dashboard。",

  context: {
    scale: "多站點分析平台",
    team: "TPM x1 / FE x1 / BE x1",
    role: "Frontend 主導產品與架構設計",
  },

  problems: [
    "缺乏統一 SEO/AIO 評估標準",
    "外部顧問成本高且難持續優化",
    "不同網站結果不可比較",
  ],

  solution: [
    "建立 crawler 收集 JSON-LD / sitemap / metadata",
    "設計 normalized scoring pipeline",
    "建立 Dashboard 支援跨站點比較",
    "整合 AI 進行語意分析與建議生成",
  ],

  impacts: [
    "建立集團標準化 SEO/AIO 評估流程",
    "降低外部顧問依賴",
    "支援跨站點優化決策",
  ],

  demos: [
    {
      mediaURL: "/aio-seo-detail.png",
      content: "分析頁",
    },
    {
      mediaURL: "/aio-seo-chart.png",
      content: "跨站點比較",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "Evaluation Pipeline",
        caption: "pipeline",
        sources: {
          image: "/aio-evaluate.png",
        },
      },
      {
        title: "Engine Flow",
        caption: "engine flow",
        sources: {
          image: "/aio-flow.png",
        },
      },
    ],
  },
};

export const TEMP_DATA_STATE_MACHINE: ICaseStudy = {
  relatedProjects: [],
  type: Project.CaseStudy,
  id: "state-machine",
  title: "State Machine：QRCode 叫車流程",
  techStack: [
    "React",
    "TypeScript",
    "XState",
    "State Machine",
    "E2E Testing",
    "Async Flow Control",
  ],
  intro:
    "將複雜叫車流程轉為 state machine，統一狀態與非同步流程管理。",

  context: {
    scale: "多狀態 + async flow",
    team: "PM x1 / FE x1 / BE x1",
    role: "流程建模 + 前端實作",
  },

  problems: [
    "PM/RD 對流程認知不一致",
    "useState 管理複雜流程容易失控",
    "多 async 與錯誤分支難以維護",
  ],

  solution: [
    "以 state machine 定義 state / event / transition",
    "將 wireframe 對應到 state",
    "統一 loading / success / error flow",
    "將流程圖作為 PM/RD 溝通基準",
  ],

  impacts: [
    "降低溝通成本",
    "流程更可預期與可維護",
    "建立複雜流程建模標準",
  ],

  demos: [
    {
      mediaURL: "/state-machine-role.png",
      content: "state diagram 對應 UI",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "State Diagram",
        caption: "state diagram",
        sources: {
          image: "/state-machine-flow.png",
        },
      },
    ],
  },
};

export const TEMP_DATA_CHROME_EXTENSION: ISideProject = {
  relatedProjects: [],
  type: Project.SideProject,
  id: "ai-prompt-workspace",
  title: "AI Prompt Workspace",
  techStack: [
    "React",
    "TypeScript",
    "Chrome Extension API",
    "Context Menu",
    "Side Panel",
    "Chrome Storage",
  ],
  intro:
    "建立 Chrome Extension 管理與重用 AI prompts，支援跨網站擷取與快速存取。",

  problems: [
    "prompt 分散於各處難以管理",
    "手動整理成本高",
    "缺乏 workflow 整合工具",
  ],

  solution: [
    "建立 Prompt Workspace 集中管理",
    "整合 Context Menu + Side Panel",
    "實作 tag / search / pin / storage",
    "使用 Chrome Storage 做持久化",
  ],

  impacts: [
    "降低 prompt 管理成本",
    "提升 AI workflow 效率",
    "驗證 browser-native 工具可行性",
  ],

  demos: [
    { mediaURL: "/prompt-workspace-main.png", content: "主畫面" },
    { mediaURL: "/prompt-workspace-search.png", content: "搜尋" },
    { mediaURL: "/prompt-workspace-action.png", content: "操作" },
  ],

  architecture: {
    diagrams: [
      {
        title: "Overview",
        caption: "overview",
        sources: {
          image: "/prompt-workspace-overview.png",
        },
      },
      {
        title: "Flow",
        caption: "flow",
        sources: {
          image: "/prompt-workspace-flow.png",
        },
      },
    ],
  },

  repoURL: "https://github.com/y0000ga/ai-prompt-workspace",
};

export const TEMP_DATA_MEDICATION_BACKEND: ISideProject = {
  type: Project.SideProject,
  id: "medicheck-schedule-backend",
  title: "MediCheck 服藥追蹤 (Backend)",
  techStack: [
    "Python",
    "FastAPI",
    "SQLAlchemy",
    "Alembic",
    "Pydantic",
    "PostgreSQL",
    "Backend Architecture",
  ],
  relatedProjects: [
    {
      name: TEMP_DATA_MEDICATION_FRONTEND.title,
      id: TEMP_DATA_MEDICATION_FRONTEND.id,
    },
  ],
  intro:
    "以 FastAPI 建構照護與用藥排程後端，處理帳號驗證、照護共享、藥物排程展開與服藥歷史保存，並透過分層架構與 schedule / history 分離設計，降低前端規則計算與資料合併負擔。",

  problems: [
    "登入主體 user 與被管理主體 patient 並不一定相同，若資料模型直接綁定登入者，後續共享照護與權限擴充會變得困難。",
    "排程規則與實際服藥紀錄屬於不同層級資料，若混在同一模型中，難以處理 recurrence、規則修改與歷史事實保存。",
    "若在建立排程時預先產生大量未來 event，資料量會快速膨脹，且規則變更時需要重建大量資料。",
    "若由前端自行驗 recurrence、判斷 event 合法性並 merge history，前後端責任邊界會變得混亂且維護成本偏高。",
  ],

  architecture: {
    diagrams: [
      {
        title: "Layered Architecture",
        caption:
          "後端採 route / service / repository 分層設計，將 request mapping、商業邏輯與資料存取拆開。",
        explanation: [
          "Route layer 接收 request、建立 payload、回傳統一 API response。",
          "Service layer 集中處理權限驗證、商業規則、交易流程與 response 組裝。",
          "Repository layer 專注於 SQLAlchemy 查詢與資料寫入，避免 route 與 DB model 直接耦合。",
        ],
        sources: {
          mermaid: `
flowchart TD
    FE[Frontend] --> ROUTE[FastAPI Routes]
    ROUTE --> SERVICE[Service Layer]
    SERVICE --> REPO[Repository Layer]
    REPO --> DB[(Database)]

    ROUTE --> SCHEMA[Schemas]
    ROUTE --> DEP[Dependencies]
    SERVICE --> CORE[Core / Validators]
    REPO --> MODEL[Models]
`,
        },
      },
      {
        title: "Schedule Match Flow",
        caption:
          "由 backend 展開 event instance 並合併 history，前端不需自行驗 recurrence 或 merge 資料。",
        explanation: [
          "前端以日期區間查詢 schedule-matches，由 backend 查出符合條件的 schedules。",
          "Service layer 依規則展開合法 occurrences，再查詢 histories 並組成 event list。",
          "使用者 quick check 後，backend 驗證 scheduled_at 是否符合該 schedule，並建立 history snapshot。",
        ],
        sources: {
          mermaid: `
sequenceDiagram
    participant FE as Frontend
    participant API as FastAPI Route
    participant SVC as Service Layer
    participant REPO as Repository Layer
    participant DB as Database

    FE->>API: GET /schedule-matches?from_date=...&to_date=...
    API->>SVC: get_schedule_match_list(payload)
    SVC->>REPO: list_schedule_match_candidates(...)
    REPO->>DB: query schedules
    DB-->>REPO: schedules
    REPO-->>SVC: schedule rows
    SVC->>SVC: expand occurrences
    SVC->>REPO: list_histories_by_schedule_ids_and_date_range(...)
    REPO->>DB: query histories
    DB-->>REPO: histories
    REPO-->>SVC: history rows
    SVC->>SVC: compose event list
    SVC-->>API: event instances + optional history
    API-->>FE: response

    FE->>API: POST /histories/quick-check
    API->>SVC: add_quick_check_history(payload)
    SVC->>SVC: validate scheduled_at
    SVC->>REPO: create_history(...)
    REPO->>DB: insert history snapshot
    DB-->>REPO: created row
    REPO-->>SVC: history
    SVC-->>API: success
    API-->>FE: success
`,
        },
      },
      {
        title: "Core ERD",
        caption:
          "資料模型區分登入主體、被照護主體、照護關係、排程規則與實際紀錄，避免不同責任混在同一層。",
        explanation: [
          "user 是登入與 session 主體，patient 是被管理與被照護主體。",
          "care invitation 負責共享流程，care relationship 負責正式權限關係。",
          "schedule 是規則層，history 是結果層，並以 snapshot 保留當次真實上下文。",
        ],
        sources: {
          mermaid: `
erDiagram
    USERS ||--o{ USER_SESSIONS : has
    USERS ||--o| PATIENTS : linked_account
    USERS ||--o{ CARE_INVITATIONS : sends
    USERS ||--o{ CARE_RELATIONSHIPS : caregiver

    PATIENTS ||--o{ MEDICATIONS : owns
    PATIENTS ||--o{ SCHEDULES : has
    PATIENTS ||--o{ HISTORIES : records
    PATIENTS ||--o{ CARE_INVITATIONS : target
    PATIENTS ||--o{ CARE_RELATIONSHIPS : shared_to

    MEDICATIONS ||--o{ SCHEDULES : schedules
    MEDICATIONS ||--o{ HISTORIES : snapshots

    SCHEDULES ||--o{ HISTORIES : generates
    CARE_INVITATIONS ||--o{ CARE_RELATIONSHIPS : becomes
`,
        },
      },
    ],
  },

  solution: [
    "採用 route / service / repository 分層架構，將 request mapping、商業邏輯、權限驗證與資料存取拆開，降低模組耦合並提升重用性。",
    "將權限驗證集中於 service / validator，而不是散落在 route，讓 patient、medication 與 care relationship 的存取控制保持一致。",
    "把 schedule 視為規則層、history 視為結果層，查詢時由 backend 動態展開 event instance，而不是預先生成所有未來事件。",
    "提供 GET /schedule-matches 直接回傳 event instance 與 optional history，讓前端不需自行處理 recurrence 驗證、合法事件判斷與歷史資料合併。",
    "在 histories 採用 snapshot 設計，保留 medication 名稱、劑量、劑型等當下資訊，避免主資料變更後污染既有歷史紀錄。",
    "透過 user_sessions 管理 refresh token 的生命週期、輪替與撤銷狀態，支援登入、刷新與登出失效控制。",
  ],

  impacts: [
    "將 user 與 patient 解耦後，系統可自然支援 caregiver / patient 多角色協作與共享照護情境。",
    "避免預先展開 future events 所造成的資料膨脹與規則修改同步成本，提升排程模型可維護性。",
    "讓系統能同時回答「理論上何時該吃」與「實際上有沒有吃」，使規則層與結果層語意清楚分離。",
    "前端可直接消費 backend 展開後的 event instance 與 history，降低前端流程複雜度與跨層重算成本。",
    "透過 history snapshot 保留歷史事實，不會因藥名、劑量或規則後續調整而失真。",
  ],

  demos: [],

  repoURL: "https://github.com/y0000ga/medi-check-backend",
};

export const TEMP_DATA_RESUME: IResume = {
  keywords: ["前端", "REACT/NEXT.JS", "效能優化", "自動化測試"],
  workExperince: {
    list: [
      {
        title: "前端工程師",
        company: "和泰聯網",
        startFrom: "2024/09",
        endAt: "2026/03",
        contents: [
          '負責多通路叫車流程前端實作 (React / Next.js)，涵蓋"企業"、"據點"、"7,000+ 超商門市"與 "QRCode" 等場景，參與部分服務競品分析，並導入 "有限狀態機" 整理流程與管理。',
          '主導 Yoxi 官網 SSR 重構 (Next.js)，"優化 SEO 且整體效能提升約 90%"，並降低 SEO 維護成本，並實作 "WebSocket 即時司機位置顯示"與車資預估功能。',
          '主導 AIO / SEO 分析平台"從 0 到 1 規劃與產品化"推進，建立評估流程與驗收標準，推動 集團與子公司共用。',
          '建立自動化測試策略，涵蓋 "E2E 測試與單元測試"，核心場景達成 100% 覆蓋率，並支援接入既有自動化通知流程。',
          '開發 "後端 RESTful API (Node.js / Express)"，並參與 派遣系統 API 重構，優化 "MySQL"、"MongoDB" 與 "Redis" 快取協作。',
          '主導 "LLM 語音叫車 AI 介面"可行性評估與 POC 驗證，成果後續提供外部廠商作為正式方案評估基礎。',
          '建立 "AI 輔助開發流程與知識管理機制"，導入需求分析、規格驗證與程式碼生成流程，提升開發效率與品質一致性。',
          '主導"全家"、"萊爾富"與 "7-11 kiosk 專案"，並以 iBon 為核心案例"優化受限硬體下的效能"、"支付與多語系流程"。',
          '指導初階工程師，透過 "code review"、"任務拆解"與實作協作加速 ramp-up，提升獨立交付能力並強化 團隊整體產能。',
        ],
      },
      {
        title: "前端工程師",
        company: "金箍棒智慧物業管理",
        startFrom: "2024/06",
        endAt: "2024/08",
        contents: [
          '使用 Vue 開發房地產租賃 SaaS 平台前端系統，並於"短期內承接平台完全開發與維運責任"。',
          '從前端視角參與 "API 文件定義與迭代"，優化前後端協作流程並降低整合複雜度。',
        ],
      },
      {
        title: "前端工程師",
        company: "萬通教育",
        startFrom: "2023/03",
        endAt: "2024/04",
        contents: [
          "維護 v1.0 舊版系統並參與線上自學平台 v2.0 前端開發，支援平行維運與系統遷移。",
          "開發桌面型數位資源下載工具 (React / Electron)，支援大型檔案下載、本地儲存與離線存取。",
          '開發家教 CRM 系統 功能模組與跨模組整合，支援教學與營運流程，使用客戶包含吉得堡與元宇宙學 BAR 等"連鎖補習班"。',
          '開發與維護應用於教學與簡報場景的"大型螢幕互動式電子書平台"，支援"全台 200 多間國中小"。',
        ],
      },
    ],
  },
  intro: `具備 3 年前端與部分後端開發經驗，熟悉 "React"、"Next.js"、"TypeScript"，專長於 SSR / SEO 優化與網站效能調校，並導入 modern workflow / tools 協助專案開發。擅長與 "UI/UX、PM" 討論與拆解複雜商業流程，輔以有限狀態機建模與管理；建立 "Unit Test" 與 "E2E 測試"等標準化 QA 流程，提升產品品質與系統穩定性。同時亦具備使用 Node.js 開發後端服務與設計 RESTful API 經驗，參與"設計並處理前後端整合、資料流設計、快取策略"等環節，並導入自動化流程與 AI 輔助開發，以提升開發效率與品質一致性。除日常開發工作外，亦具 mentoring / 技術分享經驗，多面向協助團隊提升 productivity。`,
  achievement: {
    list: [
      {
        title: "Yoxi 官方網站重構與核心功能開發",
        intro:
          "將官網由 CSR / Prerender.io 架構 重構為 Next.js SSR，並透過資源載入與請求時機調整優化 SEO 與網站效能；同時開發分享行程與車資預估等核心功能頁。",
        techStack: ["Next.js", "SSR", "SEO", "WebSocket"],
        results: [
          '透過 "SSR 重構"、lazy-loading、dynamic import、資源預載、圖片優化與請求時機調整，讓 "Lighthouse 分數與整體效能提升約 90%"',
          "降低 SEO 維護成本，並節省每月約 US$49 的 Prerender.io 固定支出",
          "完成 分享行程即時司機位置顯示 與 車資預估功能頁 開發",
        ],
        links: [
          {
            label: "網站連結",
            value: "https://www.yoxi.app/?lang=zh-TW",
          },
          {
            label: "作品集連結",
            value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_YOXI_REFACTOR.id })}`,
          },
        ],
      },
      {
        title: "多通路叫車產品",
        intro:
          '負責"企業版、據點叫車、QRCode 與超商等多通路叫車產品"前端實作與維運，並整合後台操作與多角色使用流程。',
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "StateMachine",
          "E2E Test",
          "Unit Test",
        ],
        results: [
          "支援企業、據點、QRCode 與 7,000+ 超商門市 / 機台 等多通路叫車場景",
          "獨立開發 QRCode 叫車流程，導入 狀態機 建模並達成 100% 核心流程 E2E 覆蓋",
          "建立據點叫車自動化測試，並完成 CMS 200+ 冒煙測項，提升回歸測試效率與系統穩定性",
        ],
        links: [
          {
            label: `作品集連結 - ${TEMP_DATA_STATE_MACHINE.title}`,
            value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_STATE_MACHINE.id })}`,
          },
        ],
      },
      {
        title: "AIO / SEO 分析與檢核平台（0→1）",
        intro:
          "從 0 到 1 規劃 AIO / SEO 分析與檢核平台，整合 OpenAPI、JSON-LD、robots.txt、sitemap.xml 等網站資料，建立 AI 評估、建議與比較流程。 ",
        techStack: ["Next.js", "爬蟲", "SEO"],
        results: [
          "建立網站資料收集、評分建議與結果比較的標準化流程",
          "透過 dashboard 呈現與比較查詢結果，形成可持續運作的分析機制 ",
          "作為 集團與子公司共用 的 AIO / SEO 檢核基礎",
        ],
        links: [
          {
            label: "作品集連結",
            value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_SEO_AIO.id })}`,
          },
        ],
      },
    ],
  },
  education: {
    list: [
      {
        school: "國立臺灣科技大學 ",
        department: "化學工程學所",
        startFrom: "2019",
        endAt: "2021",
        topic:
          "Effect of Formic Acid Pre-reduction on Subcritical Water Extraction of Platinum and Palladium from Spent Automotive Catalytic Converter",
      },
      {
        school: "國立中正大學",
        department: "化學工程學系",
        startFrom: "2015",
        endAt: "2019",
        topic:
          "Synthesis of gold nanorods and investigation of their photothermal properties after polymer surface modification",
      },
    ],
  },
  email: "6jh214c@gmail.com",
  skill: {
    list: [
      {
        title: "前端架構 / 效能優化 ",
        techStack: [
          "State Machine",
          "單元測試（Unit Test）",
          "端對端測試（E2E Test）",
        ],
        content:
          "應用於複雜流程建模與測試策略建立，提升系統穩定性與可維護性",
      },
      {
        title: "前端開發（Web / Desktop）",
        techStack: [
          "React",
          "Vue",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "Electron",
        ],
        content: "負責多產品前端開發，涵蓋網站、SaaS 平台與桌面應用",
      },
      {
        title: "狀態與資料管理",
        techStack: [
          "Redux",
          "Redux Toolkit",
          "RTK Query",
          "Pinia",
          "Vuex",
        ],
        content: "負責多產品前端開發，涵蓋網站、SaaS 平台與桌面應用",
      },
      {
        title: "UI / 樣式設計",
        techStack: [
          "Tailwind CSS",
          "Material UI",
          "Bootstrap",
          "Sass / SCSS",
        ],
        content: "開發具響應式設計與元件化架構的使用者介面",
      },
      {
        title: "後端 / API / 資料處理",
        techStack: [
          "Node.js",
          "Express.js",
          "RESTful API",
          "JWT",
          "MySQL",
          "MongoDB",
          "Redis",
          "Third Party API",
        ],
        content:
          "開發後端 API 並參與資料流設計與快取協作，優化系統效能與整合流程",
      },
    ],
  },
};
