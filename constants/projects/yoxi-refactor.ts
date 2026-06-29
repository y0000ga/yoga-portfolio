import { ICaseStudy, MediaType, Project } from "@/types/project";
import { YOXI_REFACTOR_PROJECT } from "./registry";

const YOXI_REFACTOR: ICaseStudy = {
  type: Project.CaseStudy,
  id: YOXI_REFACTOR_PROJECT.id,
  thumbnail: "/yoxi-seo/thumbnail.png",
  title: YOXI_REFACTOR_PROJECT.title,
  relatedProjects: [],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "SSR",
    "SEO",
    "Tailwind CSS",
    "Performance Optimization",
  ],
  intro:
    "將原本以 CSR + Prerender.io 為主的官網重構為 Next.js SSR，重新整理資料請求、元件結構與資源載入策略，提升 SEO、效能與維護性。",

  context: {
    scale: "20+ pages",
    team: "Frontend x 3",
    role: "Frontend 主導開發與架構設計",
  },

  FAQs: [
    {
      question: "這個 case study 主要想解決什麼問題？",
      answer:
        "Yoxi 官方網站原本以 CSR 搭配 Prerender.io 支援 SEO，但這使搜尋引擎可讀性、metadata 穩定性與維運成本高度依賴第三方 prerender 服務。同時，資料請求、資源載入、元件結構與樣式規則分散，導致頁面效能與後續維護成本偏高。",
    },
    {
      question: "為什麼要從 CSR + Prerender.io 改成 Next.js SSR？",
      answer:
        "SSR 可以讓首頁與核心頁面的主要內容、metadata 與 canonical signal 在 initial HTML 中穩定輸出，降低 crawler 依賴 client-side rendering 或第三方 prerender 結果的風險。改用 Next.js SSR 後，也能把 rendering、data fetching、metadata generation 與頁面層級架構收斂到同一套框架中管理。",
    },
    {
      question: "SEO 優化主要做了哪些事情？",
      answer:
        "優化重點包含 page-level metadata generation、title / description / Open Graph / canonical URL、sitemap.xml、robots.txt、重要頁面索引規則，以及核心頁面的 structured data / JSON-LD。這些調整讓搜尋引擎能更穩定讀取主要內容、品牌資訊與頁面語意。",
    },
    {
      question: "效能優化主要從哪些方向切入？",
      answer:
        "效能優化從 rendering strategy、data fetching、圖片載入、script 載入與元件拆分切入，降低 initial load 成本並改善 Core Web Vitals。針對首頁與高負載頁面，重點處理 LCP、CLS 與互動延遲，使 Lighthouse Performance 達到 97 分，整體效能提升約 90%。",
    },
    {
      question: "如何控制重構風險？",
      answer:
        "重構採逐頁遷移與 hybrid CSR / SSR 策略，而不是一次性全面改寫。核心頁面優先導入 SSR，其他仍需 client-side interaction 的區塊保留 CSR 邊界，逐步驗證 SEO、效能與功能一致性，降低重構過程中的 regression 風險。",
    },
    {
      question: "Tailwind-based design system 解決了什麼問題？",
      answer:
        "原本元件與樣式規則分散，容易造成不同頁面之間樣式不一致與維護成本增加。透過 Tailwind-based design system，將常見版型、 spacing、typography、元件樣式與頁面規則收斂，減少重複樣式與頁面差異，提升後續擴充與維護效率。",
    },
    {
      question: "這次重構帶來哪些具體成果？",
      answer:
        "重構後首頁 Lighthouse Performance 達 97 分，整體效能提升約 90%。同時移除 Prerender.io，降低第三方服務依賴與維運成本；主要內容、metadata、canonical、sitemap、robots 與 structured data 也能在 SSR 架構下更穩定輸出，提升搜尋引擎可讀性與索引穩定性。",
    },
  ],

  impacts: [
    "首頁 Lighthouse Performance 達 97 分，整體效能提升約 90%。",
    "移除 Prerender.io，降低第三方 prerender 服務依賴與維運成本。",
    "讓主要內容、metadata 與 canonical signal 能在 server-rendered HTML 中穩定輸出，提升搜尋引擎可讀性與索引穩定性。",
    "透過 sitemap、robots、page-level metadata 與 structured data，補齊技術 SEO 基礎建設。",
    "重整 rendering、data fetching 與資源載入策略，改善 Core Web Vitals 與使用者載入體驗。",
    "建立可逐頁擴充的 SSR / hybrid rendering 架構，提升後續頁面維護與 SEO 調整效率。",
  ],

  demos: [
    {
      type: MediaType.Picture,
      mediaURL: "/ssr-demo.png",
      content: "首頁高負載頁面優化後 Lighthouse Performance 達 97",
    },
  ],

  architecture: {
    diagrams: [
      {
        title: "SSR Before / After",
        caption: "SSR before/after",
        sources: {
          image: "/ssr-before-after.png",
        },
      },
      {
        title: "Render Flow",
        caption: "render flow",
        sources: {
          image: "/render-flow.png",
        },
      },
    ],
  },
};

export default YOXI_REFACTOR;
