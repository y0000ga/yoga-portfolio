import { ISideProject, Project } from "@/types/project";

const CHROME_EXTENSION: ISideProject = {
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
    {
      mediaURL: "/prompt-workspace/operation.mp4",
      content: "主畫面與操作",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "Overview",
        caption: "overview",
        sources: {
          image: "/prompt-workspace/overview.png",
        },
      },
      {
        title: "Flow",
        caption: "flow",
        sources: {
          image: "/prompt-workspace/flow.png",
        },
      },
    ],
  },

  repoURL: "https://github.com/y0000ga/ai-prompt-workspace",
};

export default CHROME_EXTENSION;
