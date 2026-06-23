import { ICaseStudy, Project } from "@/types/project";

const YOXI_REFACTOR: ICaseStudy = {
  type: Project.CaseStudy,
  id: "yoxi-refactor",
  thumbnail: "/yoxi-seo/thumbnail.png",
  title: "Yoxi 官方網站 SEO 與效能優化",
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

  problems: [
    "CSR 依賴 Prerender.io，維運成本高",
    "資料請求與資源載入策略不一致，影響頁面效能",
    "元件與樣式規則分散，維護成本偏高",
    "需逐步導入 SSR 並控制重構風險與 CSR/SSR 邊界",
  ],

  solution: [
    "採用 Next.js SSR 作為主要 rendering strategy，讓首頁與核心頁面內容可在 initial HTML 中輸出，降低 crawler 依賴 client-side rendering 的風險。",
    "建立 page-level data fetching 與 metadata generation 機制，依頁面內容產生 title、description、Open Graph 與 canonical URL，提升搜尋結果呈現與索引一致性。",
    "補齊 sitemap.xml、robots.txt 與重要頁面索引規則，協助搜尋引擎發現核心頁面並控制可索引範圍。",
    "針對核心頁面加入 structured data / JSON-LD，使搜尋引擎能更明確理解頁面語意與品牌資訊。",
    "重整 API、圖片與 script 載入策略，降低 initial load 並改善 Core Web Vitals，包含 LCP、CLS 與互動延遲。",
    "建立 Tailwind-based design system 統一元件與樣式，減少重複樣式與頁面差異造成的維護成本。",
    "採逐頁遷移並保留 hybrid CSR/SSR，以控制重構風險並逐步驗證 SEO、效能與功能一致性。",
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
