import { ISideProject, Project } from "@/types/project";

const MEDICATION_FRONTEND: ISideProject = {
  type: Project.SideProject,
  id: "medicheck-frontend",
  title: "MediCheck 服藥追蹤 (Mobile)",
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
    {
      mediaURL: "/medi-check-frontend/overall.mp4",
      content: "整體流程",
    },
    {
      mediaURL: "/medi-check-frontend/invite-someone.mp4",
      content: "邀請他人",
    },
    {
      mediaURL: "/medi-check-frontend/accept-invitation.mp4",
      content: "接受邀請",
    },
    {
      mediaURL: "/medi-check-frontend/schedule.png",
      content: "排程總覽",
    },
    {
      mediaURL: "/medi-check-frontend/schedule-event.png",
      content: "單一排程事件",
    },
    {
      mediaURL: "/medi-check-frontend/patients.png",
      content: "病患列表",
    },
    {
      mediaURL: "/medi-check-frontend/medication.png",
      content: "用藥管理",
    },
    {
      mediaURL: "/medi-check-frontend/history.png",
      content: "歷史紀錄",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "MediCheck Frontend Architecture",
        caption: "以 Router + State + API 分層設計前端架構",
        explanation: [
          "app/ 專注路由與頁面組裝",
          "features/ 集中業務規則，方便各 domain 獨立演進",
          "shared/ 集中 store、API、token、env，避免重複",
          "mapper / domain model 分離，降低後端欄位變動對 UI 的影響",
          "components/ 提升重用與一致性",
          "這套結構和 Expo Router 的 file-based routing 很合拍，也比較適合團隊協作",
        ],
        sources: {
          mermaid: `
flowchart TD
    A[App Entry app/_layout.tsx] --> B[Redux Provider shared/store]
    A --> C[Expo Router public routes]
    A --> D[Expo Router protected routes]

    B --> E[user store features/user/userStore.ts]
    B --> F[RTK Query API shared/api/appApi.ts]

    F --> G[Feature APIs features modules API]
    F --> H[Token Storage shared/storage/tokenStorage]
    F --> I[Env Config shared/config/env.ts]

    D --> J[Protected Layout app/protected/_layout.tsx]
    J --> K[Auth bootstrap]
    K --> H
    K --> G
    K --> E

    D --> L[Tabs protected tabs]
    D --> M[Settings pages]
    D --> N[Entity detail/create/edit pages]

    L --> O[Main]
    L --> P[Medications]
    L --> Q[Patients]
    L --> R[Schedules]
    L --> S[Histories]

    G --> T[Domain logic]
    T --> U[types, mappers, validators]
    T --> V[UI components]
    V --> W[components]

    U --> X[Server DTO]
    U --> Y[Frontend domain model]
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

export default MEDICATION_FRONTEND