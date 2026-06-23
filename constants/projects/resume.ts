import { Route } from "@/helpers/route";
import { AchievementType, IResume } from "@/types/resume";
import YOXI_REFACTOR from "./yoxi-refactor";
import STATE_MACHINE from "./state-machine";
import SEO_AIO from "./seo-aio";
import MEDICATION_FRONTEND from "./medication-frontend";
import MEDICATION_BACKEND from "./medication-backend";
import MEDICHECK_AI_ASSISTED_WORKFLOW from "./medication-ai-assisted";

const RESUME: IResume = {
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
        type: AchievementType.Personal,
        title: "MediCheck — 用藥排程與事件生成系統",
        intro:
          "設計並實作完整用藥排程系統（Frontend + Backend），以前端負責互動與狀態管理，後端負責排程規則解析與事件生成，透過 API contract 串接資料流，處理複雜時間規則與用藥事件同步問題。",
        techStack: [],
        techStackSeries: [
          {
            label: "前端",
            value: ["React", "TypeScript", "State Management"],
          },
          {
            label: "後端",
            value: [
              "Python",
              "RESTful API",
              "PostgreSQL",
              "排程規則解析",
            ],
          },
          {
            label: "AI-assisted Workflow",
            value: [
              "Claude Code",
              "Superpowers",
              "skills",
              "OpenAI Codex",
              "Google Stitch",
              "Figma",
              "Figma MCP server",
              "cross-AI review workflow",
            ],
          },
        ],
        results: [
          '設計通用 "frequency 規則模型"（interval / unit / weekdays / endCondition），並由後端負責規則解析與事件展開',
          '建立前後端資料契約，分離 "規則定義" 與 "事件計算"，降低耦合並提升可維運性',
          "實作用藥事件展開邏輯，將抽象排程規則轉換為具體時間點，支援多種頻率與終止條件",
          "完成部分前後端整合，已驗證排程規則解析與事件生成流程，並持續優化整體用藥流程串接",
          "建立可於本地環境運行的系統，支援 API 串接與資料流驗證，確保核心排程邏輯正確性",
          "規劃 background job 機制，定期掃描未完成用藥事件並轉換為歷史紀錄，建立事件生命週期管理",
          '導入 "human-in-the-loop" 的 "AI-assisted development workflow"，使用 Claude Code + Superpowers skills 協助產品規格整理、需求缺口檢查、API contract 推導、implementation planning 與 edge case 補齊；使用 Google Stitch、Figma 與 Figma MCP server 建立 UI prototype、UX reference 與 design-to-code context bridge。',
          '採用 "cross-AI review" 流程，由 OpenAI Codex 協助補齊重複性 CRUD 頁面、RESTful API、response 欄位與 boilerplate，再由 Claude Code 進行 schema consistency、API contract、state flow 與核心排程邏輯檢查，並由自己負責最終架構判斷、整合驗證與核心邏輯把關。',
        ],
        links: [
          {
            label: "Mobile 作品集連結",
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: MEDICATION_FRONTEND.id,
            }),
          },
          {
            label: "Backend 作品集連結",
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: MEDICATION_BACKEND.id,
            }),
          },
          {
            label: "AI-assisted 全端開發流程案例研究",
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: MEDICHECK_AI_ASSISTED_WORKFLOW.id,
            }),
          },
          {
            label: 'API Doc',
            value: 'https://y0000ga.github.io/medi-check-backend/'
          }
        ],
      },
      {
        type: AchievementType.Professional,
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
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: YOXI_REFACTOR.id,
            }),
          },
        ],
      },
      {
        type: AchievementType.Professional,
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
            label: `作品集連結 - ${STATE_MACHINE.title}`,
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: STATE_MACHINE.id,
            }),
          },
        ],
      },
      {
        type: AchievementType.Professional,
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
            value: Route.project.detail({
              lang: "zh-Hant-TW",
              id: SEO_AIO.id,
            }),
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

export default RESUME;
