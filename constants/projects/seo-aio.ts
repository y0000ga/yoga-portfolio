import { ICaseStudy, Project } from "@/types/project";

const SEO_AIO: ICaseStudy = {
  repoURL: "https://github.com/y0000ga/SiteSignal",
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
    "從 0 到 1 建立 AIO / SEO 分析平台，整合爬蟲、資料清洗、評分規則與視覺化儀表板，讓團隊可以快速看見站點的健康度、內容表現與優化優先順序。",

  context: {
    scale: "0→1 新專案 / 多站點分析",
    team: "TPM x1 / FE x1 / BE x1",
    role: "Frontend 負責儀表板與分析流程設計",
  },

  problems: [
    "缺少可以同時整合 SEO 與 AIO 資訊的單一觀測平台。",
    "站點資料來源分散，爬取、解析、比對與排序流程不透明。",
    "團隊只能靠人工整理結果，難以快速判斷優先改善項目。",
  ],

  solution: [
    "建立 crawler pipeline，抓取 metadata、JSON-LD、sitemap 與頁面結構資訊。",
    "將多來源資料正規化成統一指標，方便做跨站點比較與趨勢分析。",
    "設計 dashboard、列表、搜尋與細節頁，讓使用者可以由總覽一路鑽到單頁分析。",
    "加入 AI / SEO 評估視角，協助團隊快速識別異常頁面與優先處理項目。",
  ],

  impacts: [
    "把原本分散的 SEO / AIO 分析收斂成可追蹤、可比較的工作台。",
    "降低人工整理成本，讓分析與決策可以更快完成。",
    "讓團隊能以視覺化方式掌握站點狀態與改善優先順序。",
    "目前的評分機制以規則與靜態資料為主，主要用於示範與驗證流程，評分結果僅供參考。未來規劃會逐步導入 AI 判斷，讓分析更貼近實際情境。",
  ],

  demos: [
    {
      mediaURL: "/site-signal/site-signal_overview.png",
      content: "平台總覽，快速掌握整體站點健康度與分析概況",
    },
    {
      mediaURL: "/site-signal/site-signal_detail.png",
      content: "站點細節頁，可追蹤單一站點的完整分析結果",
    },
    {
      mediaURL: "/site-signal/site-signal_search.png",
      content: "搜尋結果頁，協助快速定位特定站點或頁面",
    },
    {
      mediaURL: "/site-signal/site-signal_list.png",
      content: "站點清單頁，方便批次檢視與比較分析對象",
    },
    {
      mediaURL: "/site-signal/site-signal_heatmap.png",
      content: "熱圖視覺化，呈現站點分佈與異常聚集情況",
    },
    {
      mediaURL: "/site-signal/site-signal_radar.png",
      content: "雷達圖比較，呈現各站點在不同指標上的差異",
    },
    {
      mediaURL: "/site-signal/site-signal_distrubution.png",
      content: "分佈圖，用來觀察整體指標分布與集中區間",
    },
    {
      mediaURL: "/site-signal/site-signal_stack.png",
      content: "堆疊圖，呈現多維度指標的組成與變化",
    },
    {
      mediaURL: "/site-signal/site-signal_flow.png",
      content: "分析流程圖，說明從資料擷取到評分輸出的流程",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "Evaluation Pipeline",
        caption: "從資料擷取、清洗、評分到輸出的整體流程",
        sources: {
          image: "/site-signal/aio-evaluate.png",
        },
      },
      {
        title: "Engine Flow",
        caption: "把分析結果轉成可讀、可比較的圖表與列表",
        sources: {
          image: "/site-signal/aio-flow.png",
        },
      },
    ],
  },
};

export default SEO_AIO;
