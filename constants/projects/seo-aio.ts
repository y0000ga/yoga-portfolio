import { ICaseStudy, MediaType, Project } from "@/types/project";
import { SEO_AIO_PROJECT } from "./registry";

const SEO_AIO: ICaseStudy = {
  repoURL: "https://github.com/y0000ga/SiteSignal",
  thumbnail: "/site-signal/thumbnail.png",
  type: Project.CaseStudy,
  id: SEO_AIO_PROJECT.id,
  title: SEO_AIO_PROJECT.title,
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

  FAQs: [
    {
      question: "這個 case study 主要想解決什麼問題？",
      answer:
        "此案例聚焦於從 0 到 1 建立 AIO / SEO 站點分析平台。核心問題是團隊缺少一個能整合 crawler、metadata、JSON-LD、sitemap、頁面結構、內容訊號與評分結果的單一觀測平台，導致站點健康度、內容表現與優化優先順序難以集中檢視與比較。",
    },
    {
      question: "為什麼需要建立 crawler pipeline？",
      answer:
        "SEO / AIO 分析所需資料分散在 metadata、JSON-LD、sitemap、頁面結構與內容訊號中，若沒有 crawler pipeline，資料擷取、解析、清洗與比對流程會高度依賴人工處理。此平台透過 crawler pipeline 將站點資料系統化收集，作為後續 normalize、score 與 visualize 的基礎。",
    },
    {
      question: "如何讓不同站點之間可以被比較？",
      answer:
        "平台將多來源站點資料正規化為統一分析模型，讓不同站點與頁面可以使用一致的欄位、指標與評分規則進行橫向比較。這避免分析結果只停留在各自獨立的 raw data，也讓後續排序、篩選與優先級判斷有共同依據。",
    },
    {
      question: "評分機制是如何設計的？",
      answer:
        "目前採用 rule-based scoring 作為第一階段評估方式，先以可解釋的靜態規則分析站點健康度、內容完整性、結構化資料狀態與 SEO / AIO 相關訊號。這讓分析結果具備可追蹤性，也為後續導入更進一步的 AI-assisted evaluation 保留資料結構與流程邊界。",
    },
    {
      question: "Frontend 在這個平台中負責什麼？",
      answer:
        "Frontend 不只是呈現資料，而是負責將 crawler 與 scoring pipeline 的結果轉換成可理解、可比較、可排序的決策輔助介面。實作包含 dashboard、站點列表、搜尋、篩選、細節頁，以及 overview cards、分佈圖、雷達圖、堆疊圖與熱圖等視覺化元件。",
    },
    {
      question: "如何協助使用者判斷優化優先順序？",
      answer:
        "平台將 SEO / AIO 分析結果轉換為可排序的指標與視覺化資訊，讓使用者能從總覽快速掌握整體站點健康度，再 drill down 到單一站點或頁面的異常項目。透過搜尋、篩選、分佈圖與熱圖，團隊可以更快定位異常聚集區與優先處理頁面。",
    },
    {
      question: "這個平台和單純資料報表有什麼不同？",
      answer:
        "此平台不只是顯示 raw data，而是建立 crawler → normalize → score → visualize 的完整分析流程。它將分散資料轉換為統一模型，再透過評分與視覺化介面呈現站點差異、異常分布與改善方向，使資料能直接支援分析與決策。",
    },
    {
      question: "目前 AIO 分析的限制是什麼？",
      answer:
        "目前評分機制以規則與靜態資料為主，主要用於示範與驗證分析流程，因此評分結果僅供參考。後續可在既有 crawler pipeline、統一資料模型與 scoring boundary 上逐步導入 AI 判斷，使分析更貼近實際 SEO / AIO 情境。",
    },
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
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_overview.png",
      content: "平台總覽，快速掌握整體站點健康度與分析概況",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_detail.png",
      content: "站點細節頁，可追蹤單一站點的完整分析結果",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_search.png",
      content: "搜尋結果頁，協助快速定位特定站點或頁面",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_list.png",
      content: "站點清單頁，方便批次檢視與比較分析對象",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_heatmap.png",
      content: "熱圖視覺化，呈現站點分佈與異常聚集情況",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_radar.png",
      content: "雷達圖比較，呈現各站點在不同指標上的差異",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_distrubution.png",
      content: "分佈圖，用來觀察整體指標分布與集中區間",
    },
    {
      type: MediaType.Picture,
      mediaURL: "/site-signal/site-signal_stack.png",
      content: "堆疊圖，呈現多維度指標的組成與變化",
    },
    {
      type: MediaType.Picture,
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
