import { ICaseStudy, Project } from "@/types/project";

 const YOXI_REFACTOR: ICaseStudy = {
  type: Project.CaseStudy,
  id: "yoxi-refactor",
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
    "採用 Next.js SSR 作為主要 rendering strategy",
    "建立 page-level data fetching 與 metadata generation 機制",
    "重整 API、圖片與 script 載入策略降低 initial load",
    "建立 Tailwind-based design system 統一元件與樣式",
    "採逐頁遷移並保留 hybrid CSR/SSR 以降低風險",
  ],

  impacts: [
    "整體效能提升約 90%",
    "首頁 Lighthouse Performance 達 97 分",
    "移除 Prerender.io 降低維運成本",
    "提升 SEO 可見性與開發維護性",
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

export default YOXI_REFACTOR