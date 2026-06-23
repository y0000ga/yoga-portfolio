import { ICaseStudy, Project } from "@/types/project";

const STATE_MACHINE: ICaseStudy = {
  relatedProjects: [],
  type: Project.CaseStudy,
  id: "state-machine",
  thumbnail: "/state-machine/thumbnail.png",
  title: "QRCode 叫車流程狀態機設計",

  techStack: [
    "React",
    "TypeScript",
    "XState",
    "State Machine",
    "Async Flow Control",
    "E2E Testing",
    "Flow Modeling",
  ],

  intro:
    "將 QRCode 叫車流程從分散的 useState 與條件判斷，重構為可視化、可溝通、可測試的 state machine。透過明確定義 state、event、transition 與 async flow，統一 PM、Frontend 與 Backend 對叫車流程的理解，降低多步驟互動、非同步狀態與錯誤分支造成的維護成本。",

  context: {
    scale: "多步驟叫車流程 / 多狀態轉換 / async flow",
    team: "PM x1 / FE x1 / BE x1",
    role: "流程建模、狀態機設計與前端實作",
  },

  problems: [
    "QRCode 叫車流程包含填寫資料、送出需求、等待媒合、確認結果、錯誤處理與取消等多個階段，若僅使用 useState 管理，狀態容易分散且難以追蹤。",
    "PM、Frontend 與 Backend 對流程節點、錯誤分支與可操作行為的理解容易不一致，導致討論時缺少共同基準。",
    "流程中包含多個 async operation，例如送出叫車、輪詢結果、取消叫車與錯誤重試，若沒有明確狀態邊界，容易產生 loading、success、error 混雜的問題。",
    "不同 UI 畫面與流程狀態之間缺少明確對應，導致後續新增狀態、調整流程或補測試案例時維護成本偏高。",
  ],

  solution: [
    "以 XState 建立 state machine，明確定義每個流程階段的 state、event、transition 與可執行 action。",
    "將 wireframe 與 UI 畫面對應到 state，使每個畫面都有明確的流程位置與可觸發事件。",
    "將 async flow 納入 state machine 管理，統一處理 loading、success、error、retry 與 cancellation 等分支。",
    "透過 guard 與 transition 條件限制不合法狀態切換，避免 UI 在錯誤時機觸發不應發生的操作。",
    "將 state diagram 作為 PM / FE / BE 的溝通基準，讓流程討論從口語描述轉為可視化狀態圖。",
    "依照 state machine 設計 E2E 測試情境，覆蓋主要成功流程、錯誤流程與取消流程。",
  ],

  impacts: [
    "降低 PM / FE / BE 對叫車流程認知不一致造成的溝通成本。",
    "將複雜流程從分散的 useState 與條件判斷收斂為單一狀態模型，使流程更可預期、可維護。",
    "讓 loading、success、error 與 cancellation 等非同步狀態有明確邊界，降低 race condition 與非法操作風險。",
    "讓 UI 畫面、流程狀態與測試案例可以互相對應，提升後續調整流程與補測試的效率。",
    "建立複雜前端互動流程的建模標準，可延伸到其他多步驟、多非同步分支的功能。",
  ],

  demos: [
    {
      mediaURL: "/state-machine-role.png",
      content: "State diagram 對應 UI 畫面與流程節點",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "State Diagram",
        caption:
          "以 state machine 描述 QRCode 叫車流程，統一 state、event、transition 與 async flow。",
        explanation: [
          "每個 UI 畫面對應一個或多個明確 state，避免畫面狀態與流程狀態分離。",
          "event 代表使用者操作或 API 結果，例如送出、成功、失敗、取消與重試。",
          "transition 定義狀態如何移動，讓流程分支可以被 PM、Frontend 與 Backend 共同檢視。",
          "async flow 由 state machine 統一管理，避免 loading / success / error 分散在多個 component。",
        ],
        sources: {
          image: "/state-machine-flow.png",
        },
      },
    ],
  },
};

export default STATE_MACHINE;
