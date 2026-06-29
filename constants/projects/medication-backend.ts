import { ISideProject, Project } from "@/types/project";
import { MEDICHECK_PROJECTS } from "./registry";

const MEDICATION_BACKEND: ISideProject = {
  type: Project.SideProject,
  id: MEDICHECK_PROJECTS.backend.id,
  title: MEDICHECK_PROJECTS.backend.title,
  thumbnail: '/medi-check-backend/thumbnail.png',
  relatedProjects: [
    {
      id: MEDICHECK_PROJECTS.frontend.id,
      name: MEDICHECK_PROJECTS.frontend.title,
    },
    {
      name: MEDICHECK_PROJECTS.aiAssistedWorkflow.title,
      id: MEDICHECK_PROJECTS.aiAssistedWorkflow.id,
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

  variants: [
    {
      techStack: [
        "Python",
        "FastAPI",
        "SQLAlchemy",
        "Alembic",
        "Pydantic",
        "PostgreSQL",
        "Backend Architecture",
      ],
      repoURL: "https://github.com/y0000ga/medi-check-backend",
      demos: [],
    },
  ],
};

export default MEDICATION_BACKEND;
