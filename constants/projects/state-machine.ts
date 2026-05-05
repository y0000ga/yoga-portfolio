import { ICaseStudy, Project } from "@/types/project";

const STATE_MACHINE: ICaseStudy = {
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

export default STATE_MACHINE;
