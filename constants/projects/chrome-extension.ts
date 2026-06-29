import { ISideProject, MediaType, Project } from "@/types/project";
import { CHROME_EXTENSION_PROJECT } from "./registry";

const CHROME_EXTENSION: ISideProject = {
  relatedProjects: [],
  type: Project.SideProject,
  id: CHROME_EXTENSION_PROJECT.id,
  title: CHROME_EXTENSION_PROJECT.title,
  thumbnail: "/prompt-workspace/thumbnail.png",
  intro:
    "建立 browser-native 的 AI prompt workspace，透過 Chrome Extension 集中管理、擷取、搜尋與重用 prompts，支援在不同網站與 AI 工具間快速切換工作流。",

  problems: [
    "常用 prompts 分散在文件、聊天紀錄與不同 AI 工具中，難以快速查找與重用。",
    "在瀏覽網頁、閱讀文件或使用 AI 工具時，缺少可直接從當前 context 擷取與保存 prompt 的流程。",
    "手動整理 prompt 成本高，且缺少 tag、pin、search 等管理機制，長期使用後容易失控。",
    "不同 AI 使用場景需要不同 prompt 模板，但缺少 browser-native 的快速存取入口。",
    "一般筆記工具與瀏覽器操作流程分離，無法直接整合 context menu、side panel 與跨網站操作。",
  ],

  solution: [
    "建立 Prompt Workspace 作為集中管理介面，支援 prompt 建立、編輯、刪除、搜尋、tag 分類與 pin 固定常用項目。",
    "整合 Chrome Context Menu，讓使用者可從任意網頁選取文字後快速儲存為 prompt 或 prompt context。",
    "使用 Chrome Side Panel 作為常駐操作入口，讓使用者能在瀏覽不同網站時快速查找、複製與重用 prompts。",
    "透過 Chrome Storage 進行 local-first 持久化，保存 prompts、tags、pinned items 與使用者設定。",
    "設計 prompt 管理資料模型，將 prompt content、tags、pin 狀態、建立時間與更新時間分離管理，方便後續擴充。",
    "建立 browser-native workflow，串接「選取內容 → 儲存 prompt → 分類管理 → 快速複製 → 重用於 AI 工具」的操作流程。",
  ],

  impacts: [
    "降低 prompts 分散管理與重複搜尋成本，提升日常 AI workflow 的操作效率。",
    "讓 prompt 管理從文件型筆記轉為 browser-native 工具，能直接嵌入使用者的瀏覽與 AI 工具操作流程。",
    "透過 tag、search 與 pin 機制提升 prompt 重用性，降低常用 prompt 遺失或重寫的機率。",
    "驗證 Chrome Extension 作為個人 AI workflow layer 的可行性，後續可延伸至 prompt template、import / export、sync 與快捷鍵操作。",
  ],

  architecture: {
    diagrams: [
      {
        title: "Overview",
        caption: "Browser-native prompt workspace overview",
        sources: {
          image: "/prompt-workspace/overview.png",
        },
      },
      {
        title: "Flow",
        caption: "Prompt capture, management and reuse flow",
        sources: {
          image: "/prompt-workspace/flow.png",
        },
      },
    ],
  },

  variants: [
    {
      techStack: [
        "React",
        "TypeScript",
        "Chrome Extension API",
        "Manifest V3",
        "Context Menu",
        "Side Panel",
        "Chrome Storage",
        "Browser Extension Architecture",
      ],
      repoURL: "https://github.com/y0000ga/ai-prompt-workspace",
      demos: [
        {
          type: MediaType.Video,
          mediaURL: "/prompt-workspace/operation.mp4",
          content: "主畫面與操作",
        },
      ],
    },
  ],
};


export default CHROME_EXTENSION;
