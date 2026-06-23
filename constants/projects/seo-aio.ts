import { ICaseStudy, Project } from "@/types/project";

const SEO_AIO: ICaseStudy = {
  repoURL: "https://github.com/y0000ga/SiteSignal",
  thumbnail: "/site-signal/thumbnail.png",
  type: Project.CaseStudy,
  id: "aioseo",
  title: "SiteSignal — AIO / SEO 站點分析平台（0→1）",
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Crawler",
    "SEO",
    "AIO Analysis",
    "Data Pipeline",
    "Data Visualization",
  ],
  relatedProjects: [],
  intro:
    "從 0 到 1 建立 AIO / SEO 站點分析平台，整合 crawler pipeline、資料清洗、規則評分、指標正規化與視覺化儀表板，將分散的站點資料轉換為可比較、可追蹤、可排序的分析結果，協助團隊快速掌握站點健康度、內容表現與優化優先順序。",

  context: {
    scale: "0→1 新專案 / 多站點分析 / SEO 與 AIO 評估流程驗證",
    team: "TPM x1 / FE x1 / BE x1",
    role: "Frontend 負責儀表板設計、分析流程規劃與資料視覺化呈現",
  },

  problems: [
    "缺少可以同時整合 SEO 與 AIO 評估資訊的單一觀測平台，站點健康度、內容結構與優化優先級難以集中檢視。",
    "站點資料來源分散，包含 metadata、JSON-LD、sitemap、頁面結構與內容訊號，爬取、解析、比對與排序流程不透明。",
    "團隊過去需要人工整理頁面狀態與問題清單，難以快速判斷哪些站點或頁面應優先改善。",
    "多站點分析需要一致的資料格式與評分規則，否則不同站點之間難以進行橫向比較。",
    "分析結果若只停留在 raw data，使用者仍需自行解讀，缺少能快速定位異常、比較差異與追蹤改善方向的視覺化介面。",
  ],

  solution: [
    "建立 crawler pipeline，抓取 metadata、JSON-LD、sitemap、頁面結構與內容訊號，作為 SEO / AIO 分析資料來源。",
    "將多來源資料正規化為統一分析模型，讓不同站點與頁面可以使用一致的欄位、指標與評分規則進行比較。",
    "設計 rule-based scoring 機制，先以可解釋的靜態規則評估站點健康度、內容完整性與結構化資料狀態，作為 AI-ready analysis pipeline 的基礎。",
    "建立 dashboard、站點列表、搜尋、篩選與細節頁，讓使用者可以從總覽指標一路 drill down 到單一站點或單一頁面的分析結果。",
    "設計多種視覺化元件，包含 overview cards、分佈圖、雷達圖、堆疊圖與熱圖，用於呈現站點差異、異常聚集與指標分布。",
    "加入 SEO / AIO 評估視角，將分析結果轉換為可排序的優先級，協助團隊快速識別異常頁面與優先處理項目。",
    "保留後續導入 AI 判斷的資料結構與流程邊界，使目前的 rule-based analysis 可逐步擴充為更貼近實際情境的 AI-assisted evaluation。",
  ],

  impacts: [
    "將原本分散的 SEO / AIO 分析流程收斂成可追蹤、可比較、可排序的站點分析工作台。",
    "降低人工整理與比對成本，讓團隊能更快掌握站點健康度、內容表現與改善優先順序。",
    "透過統一資料模型與評分規則，使多站點之間可以進行一致的橫向比較。",
    "透過 dashboard、搜尋、細節頁與多種圖表，讓分析結果從 raw data 轉換為更容易理解的決策輔助資訊。",
    "建立 crawler → normalize → score → visualize 的資料管線，為後續導入 AI 判斷與自動化分析建立基礎。",
    "目前評分機制以規則與靜態資料為主，主要用於示範與驗證分析流程，評分結果僅供參考；未來可逐步導入 AI 判斷，讓分析更貼近實際 SEO / AIO 情境。",
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
        caption: "從資料擷取、清洗、正規化、評分到輸出的整體流程",
        sources: {
          image: "/site-signal/aio-evaluate.png",
        },
      },
      {
        title: "Engine Flow",
        caption: "將分析結果轉換為可讀、可比較、可排序的圖表與列表",
        sources: {
          image: "/site-signal/aio-flow.png",
        },
      },
    ],
  },
};

export default SEO_AIO;
