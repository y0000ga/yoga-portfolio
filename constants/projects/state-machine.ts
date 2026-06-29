import { ICaseStudy, MediaType, Project } from "@/types/project";
import { STATE_MACHINE_PROJECT } from "./registry";

const STATE_MACHINE: ICaseStudy = {
  relatedProjects: [],
  type: Project.CaseStudy,
  id: STATE_MACHINE_PROJECT.id,
  thumbnail: "/state-machine/thumbnail.png",
  title: STATE_MACHINE_PROJECT.title,

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

  FAQs: [
    {
      question: "這個 case study 主要想解決什麼問題？",
      answer:
        "QRCode 叫車流程包含填寫資料、送出需求、等待媒合、確認結果、錯誤處理、取消與重試等多個階段。若只使用分散的 useState 與條件判斷管理流程，狀態容易散落在不同 component 中，導致流程難以追蹤、難以測試，也不容易讓 PM、Frontend 與 Backend 對齊同一套流程理解。",
    },
    {
      question: "為什麼選擇 state machine，而不是繼續用 useState？",
      answer:
        "useState 適合管理局部 UI 狀態，但 QRCode 叫車流程本質上是一個多步驟、多分支、含非同步操作的流程模型。透過 state machine，可以明確定義每個 state、event、transition 與 action，讓流程不再依賴分散條件判斷，而是收斂成一個可視化、可溝通、可測試的狀態模型。",
    },
    {
      question:
        "State machine 如何協助 PM、Frontend 與 Backend 溝通？",
      answer:
        "State diagram 可以作為跨角色的共同語言。PM 可以確認使用者流程與可操作行為，Frontend 可以確認畫面狀態與事件觸發時機，Backend 可以確認 API 狀態、錯誤分支與非同步結果如何回到前端流程。這讓流程討論從口語描述轉為具體的 state、event 與 transition。",
    },
    {
      question: "如何處理叫車流程中的 async operation？",
      answer:
        "流程中的送出叫車、等待媒合、輪詢結果、取消叫車、錯誤重試等 async operation 都被納入 state machine 管理。每個非同步操作都有明確的 loading、success、error、retry 與 cancellation 邊界，避免這些狀態散落在不同 component 或 hook 中。",
    },
    {
      question: "如何避免不合法的狀態切換？",
      answer:
        "透過 transition 與 guard 條件限制可觸發事件，確保使用者只能在合法狀態下執行對應操作。例如只有在等待媒合或特定流程階段時才允許取消，只有在錯誤狀態下才允許 retry。這可以降低 UI 在錯誤時機觸發非法操作的風險。",
    },
    {
      question: "UI 畫面如何對應到 state machine？",
      answer:
        "每個 UI 畫面會對應一個或多個明確 state，例如填寫資料、送出中、等待媒合、媒合成功、媒合失敗、取消中或錯誤狀態。這讓畫面顯示、按鈕狀態、loading、error message 與使用者可操作行為都能從 state machine 推導，而不是散落在多個 component 條件判斷中。",
    },
    {
      question: "這套設計如何幫助測試？",
      answer:
        "State machine 讓測試案例可以直接依照 state 與 transition 設計。E2E 測試可以覆蓋主要成功流程、錯誤流程、取消流程與重試流程；同時也能針對特定狀態確認 UI 顯示、按鈕行為與 API 結果處理是否正確。",
    },
    {
      question: "導入後帶來什麼維護上的改善？",
      answer:
        "複雜流程從分散的 useState 與條件判斷收斂為單一狀態模型後，後續新增狀態、調整流程、補錯誤分支或新增測試時，都可以回到 state diagram 與 state machine 設定檢查影響範圍。這降低了 race condition、非法操作與跨角色理解不一致造成的維護成本。",
    },
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
      type: MediaType.Picture,
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
