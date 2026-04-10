import { cache } from "react";
import { Lang } from "@/types/common";

export const SUPPORTED_LANGS = [Lang.En, Lang.Zh_Hant_TW] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

type Dictionary = {
  site: {
    description: string;
    nav: {
      project: string;
      resume: string;
    };
    profilePhotoAlt: string;
  };
  common: {
    viewProjects: string;
    viewResume: string;
    retry: string;
    results: string;
    techStack: string;
    reset: string;
    close: string;
    zoomIn: string;
    zoomOut: string;
  };
  error: {
    title: string;
  };
  home: {
    metadata: {
      title: string;
      description: string;
    };
    hero: {
      eyebrow: string;
      summary: string;
      cardTitle: string;
      cardAction: string;
    };
    stats: {
      projects: string;
      caseStudies: string;
      contact: string;
    };
  };
  project: {
    metadata: {
      title: string;
      description: string;
    };
    heading: string;
    countLabel: string;
    featured: string;
    openCaseStudy: string;
    typeLabelFallback: string;
    detailFallbackTitle: string;
    context: {
      scale: string;
      team: string;
      role: string;
    };
    paragraph: {
      demo: string;
      problem: string;
      solution: string;
      impact: string;
      relativeProject: string
    };
    type: {
      caseStudy: string;
      sideProject: string;
    };
  };
  resume: {
    metadata: {
      title: string;
      description: string;
    };
    location: string;
    paragraph: {
      experience: string;
      achievement: string;
      skill: string;
      education: string;
    };
  };
};

const dictionaries: Record<SupportedLang, Dictionary> = {
  [Lang.En]: {
    site: {
      description:
        "Frontend engineer portfolio focused on React, Next.js, TypeScript, performance, and SEO.",
      nav: {
        project: "Projects",
        resume: "Resume",
      },
      profilePhotoAlt: "Profile photo",
    },
    common: {
      viewProjects: "View Projects",
      viewResume: "View Resume",
      retry: "Try Again",
      results: "Results",
      techStack: "Tech Stack",
      reset: "Reset",
      close: "Close",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
    },
    error: {
      title: "Something went wrong",
    },
    home: {
      metadata: {
        title: "Home",
        description:
          "Portfolio and case studies covering React, Next.js, frontend architecture, and SEO work.",
      },
      hero: {
        eyebrow: "Selected work",
        summary:
          "I build thoughtful product experiences with React, Next.js, TypeScript, and SEO in mind.",
        cardTitle:
          "Frontend engineer focused on maintainable systems, polished UI, and measurable product outcomes.",
        cardAction: "Read Case Study",
      },
      stats: {
        projects: "Projects",
        caseStudies: "Case Studies",
        contact: "Contact",
      },
    },
    project: {
      metadata: {
        title: "Projects",
        description:
          "Case studies and side projects covering frontend systems, SEO, and product thinking.",
      },
      heading: "Projects",
      countLabel: "Total",
      featured: "Featured",
      openCaseStudy: "Open Case Study",
      typeLabelFallback: "Project",
      detailFallbackTitle: "Project Not Found",
      context: {
        scale: "Scope",
        team: "Team",
        role: "Role",
      },
      paragraph: {
        demo: "Demo",
        problem: "Problem",
        solution: "Solution",
        impact: "Impact",
        relativeProject: "Relative Project"
      },
      type: {
        caseStudy: "Case Study",
        sideProject: "Side Project",
      },
    },
    resume: {
      metadata: {
        title: "Resume",
        description:
          "Experience, achievements, skills, and education for a frontend engineer focused on React and Next.js.",
      },
      location: "Taipei, Taiwan",
      paragraph: {
        experience: "Experience",
        achievement: "Achievements",
        skill: "Skills",
        education: "Education",
      },
    },
  },
  [Lang.Zh_Hant_TW]: {
    site: {
      description:
        "前端工程師作品集，聚焦 React、Next.js、TypeScript、效能優化與 SEO 實作。",
      nav: {
        project: "作品集",
        resume: "履歷",
      },
      profilePhotoAlt: "個人照片",
    },
    common: {
      viewProjects: "查看作品",
      viewResume: "查看履歷",
      retry: "重新嘗試",
      results: "成果",
      techStack: "技術棧",
      reset: "重設",
      close: "關閉",
      zoomIn: "放大",
      zoomOut: "縮小",
    },
    error: {
      title: "發生錯誤",
    },
    home: {
      metadata: {
        title: "首頁",
        description:
          "前端工程師作品集與案例整理，涵蓋 React、Next.js、架構設計與 SEO 實作。",
      },
      hero: {
        eyebrow: "精選案例",
        summary:
          "專注於 React、Next.js、TypeScript 與 SEO 的前端工程師，重視產品體驗與可維護性。",
        cardTitle:
          "擅長打造可維護的前端系統、細節到位的介面，以及能對產品產生影響的體驗。",
        cardAction: "閱讀案例",
      },
      stats: {
        projects: "個人專案",
        caseStudies: "案例研究",
        contact: "聯絡方式",
      },
    },
    project: {
      metadata: {
        title: "作品集",
        description:
          "整理前端系統設計、SEO 優化與產品思維相關的案例研究與 side project。",
      },
      heading: "作品集",
      countLabel: "總數",
      featured: "精選",
      openCaseStudy: "查看案例",
      typeLabelFallback: "作品",
      detailFallbackTitle: "找不到作品",
      context: {
        scale: "範圍",
        team: "團隊",
        role: "角色",
      },
      paragraph: {
        demo: "成果展示",
        problem: "問題與挑戰",
        solution: "解法與設計",
        impact: "成果",
        relativeProject: "相關作品"
      },
      type: {
        caseStudy: "案例研究",
        sideProject: "個人專案",
      },
    },
    resume: {
      metadata: {
        title: "履歷",
        description:
          "整理前端工程師的工作經歷、成果、技術能力與學歷背景。",
      },
      location: "台北，台灣",
      paragraph: {
        experience: "工作經歷",
        achievement: "成果整理",
        skill: "技能",
        education: "學歷",
      },
    },
  },
};

export const hasLocale = (lang: string): lang is SupportedLang =>
  SUPPORTED_LANGS.includes(lang as SupportedLang);

export const getFallbackContentLang = (
  _lang: SupportedLang,
): SupportedLang => Lang.Zh_Hant_TW;

export const getDictionarySync = (lang: SupportedLang) =>
  dictionaries[lang];

export const getDictionary = cache(async (lang: SupportedLang) =>
  getDictionarySync(lang),
);
