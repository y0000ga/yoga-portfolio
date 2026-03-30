import { Route } from "@/helpers/route";
import { Lang } from "@/types/common";
import { ICaseStudy, ISideProject, Project } from "@/types/project";
import { IResume } from "@/types/resume";

// 官網重構
export const TEMP_DATA_YOXI_REFACTOR: ICaseStudy = {
    type: Project.CaseStudy,
    id: 'yoxi-refactor',
    title: 'Yoxi 官方網站 SEO 與效能優化',

    intro:
        '將原本以 CSR + Prerender.io 為主的官網重構為 Next.js SSR，重新整理資料請求、元件結構與資源載入策略，提升 SEO、效能與維護性。',

    context: {
        scale: '20+ pages',
        team: 'Frontend x 3',
        role: 'Frontend 主導開發與架構設計'
    },

    problems: [
        'CSR 依賴 Prerender.io，維運成本高',
        '資料請求與資源載入策略不一致，影響頁面效能',
        '元件與樣式規則分散，維護成本偏高',
        '需逐步導入 SSR 並控制重構風險與 CSR/SSR 邊界'
    ],

    solution: [
        '採用 Next.js SSR 作為主要 rendering strategy',
        '建立 page-level data fetching 與 metadata generation 機制',
        '重整 API、圖片與 script 載入策略降低 initial load',
        '建立 Tailwind-based design system 統一元件與樣式',
        '採逐頁遷移並保留 hybrid CSR/SSR 以降低風險'
    ],

    impacts: [
        '整體效能提升約 90%',
        '首頁 Lighthouse Performance 達 97 分',
        '移除 Prerender.io 降低維運成本',
        '提升 SEO 可見性與開發維護性'
    ],

    demos: [
        {
            mediaURL: '/ssr-demo.png',
            content: '首頁高負載頁面優化後 Lighthouse Performance 達 97'
        }
    ],

    architecture: {
        images: [
            { mediaURL: '/ssr-before-after.png', content: 'SSR before/after' },
            { mediaURL: '/render-flow.png', content: 'render flow' }
        ]
    },
}

// SEO/AIO
export const TEMP_DATA_SEO_AIO: ICaseStudy = {
    type: Project.CaseStudy,
    id: 'aioseo',
    title: 'AIO / SEO 分析平台（0→1）',

    intro:
        '建立跨站點 SEO/AIO 評估與分析平台，整合多來源資料並建立標準化評分與 Dashboard。',

    context: {
        scale: '多站點分析平台',
        team: 'TPM x1 / FE x1 / BE x1',
        role: 'Frontend 主導產品與架構設計'
    },

    problems: [
        '缺乏統一 SEO/AIO 評估標準',
        '外部顧問成本高且難持續優化',
        '不同網站結果不可比較'
    ],

    solution: [
        '建立 crawler 收集 JSON-LD / sitemap / metadata',
        '設計 normalized scoring pipeline',
        '建立 Dashboard 支援跨站點比較',
        '整合 AI 進行語意分析與建議生成'
    ],

    impacts: [
        '建立集團標準化 SEO/AIO 評估流程',
        '降低外部顧問依賴',
        '支援跨站點優化決策'
    ],

    demos: [
        {
            mediaURL: '/aio-seo-detail.png',
            content: '分析頁'
        },
        {
            mediaURL: '/aio-seo-chart.png',
            content: '跨站點比較'
        }
    ],

    architecture: {
        images: [
            { mediaURL: '/aio-evaluate.png', content: 'pipeline' },
            { mediaURL: '/aio-flow.png', content: 'engine flow' }
        ]
    },
}

export const TEMP_DATA_STATE_MACHINE: ICaseStudy = {
    type: Project.CaseStudy,
    id: 'state-machine',
    title: 'State Machine：QRCode 叫車流程',

    intro:
        '將複雜叫車流程轉為 state machine，統一狀態與非同步流程管理。',

    context: {
        scale: '多狀態 + async flow',
        team: 'PM x1 / FE x1 / BE x1',
        role: '流程建模 + 前端實作'
    },

    problems: [
        'PM/RD 對流程認知不一致',
        'useState 管理複雜流程容易失控',
        '多 async 與錯誤分支難以維護'
    ],

    solution: [
        '以 state machine 定義 state / event / transition',
        '將 wireframe 對應到 state',
        '統一 loading / success / error flow',
        '將流程圖作為 PM/RD 溝通基準'
    ],

    impacts: [
        '降低溝通成本',
        '流程更可預期與可維護',
        '建立複雜流程建模標準'
    ],

    demos: [
        {
            mediaURL: '/state-machine-role.png',
            content: 'state diagram 對應 UI'
        }
    ],

    architecture: {
        images: [
            { mediaURL: '/state-machine-flow.png', content: 'state diagram' }
        ]
    },
}

export const TEMP_DATA_CHROME_EXTENSION: ISideProject = {
    type: Project.SideProject,
    id: 'ai-prompt-workspace',
    title: 'AI Prompt Workspace',

    intro:
        '建立 Chrome Extension 管理與重用 AI prompts，支援跨網站擷取與快速存取。',

    problems: [
        'prompt 分散於各處難以管理',
        '手動整理成本高',
        '缺乏 workflow 整合工具'
    ],

    solution: [
        '建立 Prompt Workspace 集中管理',
        '整合 Context Menu + Side Panel',
        '實作 tag / search / pin / storage',
        '使用 Chrome Storage 做持久化'
    ],

    impacts: [
        '降低 prompt 管理成本',
        '提升 AI workflow 效率',
        '驗證 browser-native 工具可行性'
    ],

    demos: [
        { mediaURL: '/prompt-workspace-main.png', content: '主畫面' },
        { mediaURL: '/prompt-workspace-search.png', content: '搜尋' },
        { mediaURL: '/prompt-workspace-action.png', content: '操作' }
    ],

    architecture: {
        images: [
            { mediaURL: '/prompt-workspace-overview.png', content: 'overview' },
            { mediaURL: '/prompt-workspace-flow.png', content: 'flow' }
        ]
    },

    repoURL: 'https://github.com/y0000ga/ai-prompt-workspace',
}

export const TEMP_DATA_RESUME: IResume = {
    keywords: ['前端', 'REACT/NEXT.JS', '效能優化', '自動化測試'],
    workExperince: {
        list: [
            {
                title: '前端工程師',
                company: '和泰聯網',
                startFrom: '2024/09',
                endAt: '2026/03',
                contents: [
                    '負責多通路叫車流程前端實作 (React / Next.js)，涵蓋"企業"、"據點"、"7,000+ 超商門市"與 "QRCode" 等場景，參與部分服務競品分析，並導入 "有限狀態機" 整理流程與管理。',
                    '主導 Yoxi 官網 SSR 重構 (Next.js)，"優化 SEO 且整體效能提升約 90%"，並降低 SEO 維護成本，並實作 "WebSocket 即時司機位置顯示"與車資預估功能。',
                    '主導 AIO / SEO 分析平台"從 0 到 1 規劃與產品化"推進，建立評估流程與驗收標準，推動 集團與子公司共用。',
                    '建立自動化測試策略，涵蓋 "E2E 測試與單元測試"，核心場景達成 100% 覆蓋率，並支援接入既有自動化通知流程。',
                    '開發 "後端 RESTful API (Node.js / Express)"，並參與 派遣系統 API 重構，優化 "MySQL"、"MongoDB" 與 "Redis" 快取協作。',
                    '主導 "LLM 語音叫車 AI 介面"可行性評估與 POC 驗證，成果後續提供外部廠商作為正式方案評估基礎。',
                    '建立 "AI 輔助開發流程與知識管理機制"，導入需求分析、規格驗證與程式碼生成流程，提升開發效率與品質一致性。',
                    '主導"全家"、"萊爾富"與 "7-11 kiosk 專案"，並以 iBon 為核心案例"優化受限硬體下的效能"、"支付與多語系流程"。',
                    '指導初階工程師，透過 "code review"、"任務拆解"與實作協作加速 ramp-up，提升獨立交付能力並強化 團隊整體產能。',
                ]
            },
            {
                title: '前端工程師',
                company: '金箍棒智慧物業管理',
                startFrom: '2024/06',
                endAt: '2024/08',
                contents: [
                    '使用 Vue 開發房地產租賃 SaaS 平台前端系統，並於"短期內承接平台完全開發與維運責任"。',
                    '從前端視角參與 "API 文件定義與迭代"，優化前後端協作流程並降低整合複雜度。'
                ]
            },
            {
                title: '前端工程師',
                company: '萬通教育',
                startFrom: '2023/03',
                endAt: '2024/04',
                contents: [
                    '維護 v1.0 舊版系統並參與線上自學平台 v2.0 前端開發，支援平行維運與系統遷移。',
                    '開發桌面型數位資源下載工具 (React / Electron)，支援大型檔案下載、本地儲存與離線存取。',
                    '開發 家教 CRM 系統 功能模組與跨模組整合，支援教學與營運流程。',
                    '建置應用於教學與簡報場景的 大型螢幕互動式電子書平台。',
                ]
            }
        ]
    },
    intro: `具備 3 年前端與部分後端開發經驗，熟悉 "React"、"Next.js"、"TypeScript"，專長於 SSR / SEO 優化與網站效能調校，並導入 modern workflow / tools 協助專案開發。擅長與 "UI/UX、PM" 討論與拆解複雜商業流程，輔以有限狀態機建模與管理；建立 "Unit Test" 與 "E2E 測試"等標準化 QA 流程，提升產品品質與系統穩定性。同時亦具備使用 Node.js 開發後端服務與設計 RESTful API 經驗，參與"設計並處理前後端整合、資料流設計、快取策略"等環節，並導入自動化流程與 AI 輔助開發，以提升開發效率與品質一致性。除日常開發工作外，亦具 mentoring / 技術分享經驗，多面向協助團隊提升 productivity。`,
    achievement: {
        list: [
            {
                title: 'Yoxi 官方網站重構與核心功能開發',
                intro: '將官網由 CSR / Prerender.io 架構 重構為 Next.js SSR，並透過資源載入與請求時機調整優化 SEO 與網站效能；同時開發分享行程與車資預估等核心功能頁。',
                techStack: ['Next.js', 'SSR', 'SEO', 'WebSocket'],
                results: [
                    '透過 "SSR 重構"、lazy-loading、dynamic import、資源預載、圖片優化與請求時機調整，讓 "Lighthouse 分數與整體效能提升約 90%"',
                    '降低 SEO 維護成本，並節省每月約 US$49 的 Prerender.io 固定支出',
                    '完成 分享行程即時司機位置顯示 與 車資預估功能頁 開發',
                ],
                links: [
                    { label: '網站連結', value: 'https://www.yoxi.app/?lang=zh-TW' },
                    { label: '作品集連結', value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_YOXI_REFACTOR.id })}` }
                ]
            },
            {
                title: '多通路叫車產品',
                intro: '負責"企業版、據點叫車、QRCode 與超商等多通路叫車產品"前端實作與維運，並整合後台操作與多角色使用流程。',
                techStack: ['React', 'Next.js', 'TypeScript', 'StateMachine', 'E2E Test', 'Unit Test'],
                results: [
                    '支援企業、據點、QRCode 與 7,000+ 超商門市 / 機台 等多通路叫車場景',
                    '獨立開發 QRCode 叫車流程，導入 狀態機 建模並達成 100% 核心流程 E2E 覆蓋',
                    '建立據點叫車自動化測試，並完成 CMS 200+ 冒煙測項，提升回歸測試效率與系統穩定性',
                ],
                links: [
                    { label: `作品集連結 - ${TEMP_DATA_STATE_MACHINE.title}`, value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_STATE_MACHINE.id })}` }
                ]
            },
            {
                title: 'AIO / SEO 分析與檢核平台（0→1）',
                intro: '從 0 到 1 規劃 AIO / SEO 分析與檢核平台，整合 OpenAPI、JSON-LD、robots.txt、sitemap.xml 等網站資料，建立 AI 評估、建議與比較流程。 ',
                techStack: ['Next.js', '爬蟲', 'SEO'],
                results: [
                    '建立網站資料收集、評分建議與結果比較的標準化流程',
                    '透過 dashboard 呈現與比較查詢結果，形成可持續運作的分析機制 ',
                    '作為 集團與子公司共用 的 AIO / SEO 檢核基礎',
                ],
                links: [
                    { label: '作品集連結', value: `${process.env.NEXT_PUBLIC_API_BASE_URL}${Route.project.detail({ lang: Lang.Zh_Hant_TW, id: TEMP_DATA_SEO_AIO.id })}` }
                ]
            }
        ]
    },
    education: {
        list: [
            {
                school: '國立臺灣科技大學 ',
                department: '化學工程學所',
                startFrom: '2019',
                endAt: '2021',
                topic: 'Effect of Formic Acid Pre-reduction on Subcritical Water Extraction of Platinum and Palladium from Spent Automotive Catalytic Converter'
            },
            {
                school: '國立中正大學',
                department: '化學工程學系',
                startFrom: '2015',
                endAt: '2019',
                topic: 'Synthesis of gold nanorods and investigation of their photothermal properties after polymer surface modification'
            }
        ]
    },
    email: '6jh214c@gmail.com',
    skill: {
        list: [
            {
                title: '前端架構 / 效能優化 ',
                techStack: ['State Machine', '單元測試（Unit Test）', '端對端測試（E2E Test）'],
                content: '應用於複雜流程建模與測試策略建立，提升系統穩定性與可維護性'
            },
            {
                title: '前端開發（Web / Desktop）',
                techStack: [

                    "React", "Vue", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Electron"

                ],
                content: '負責多產品前端開發，涵蓋網站、SaaS 平台與桌面應用'
            },
            {
                title: '狀態與資料管理',
                techStack: [
                    "Redux", "Redux Toolkit", "RTK Query", "Pinia", "Vuex"
                ],
                content: '負責多產品前端開發，涵蓋網站、SaaS 平台與桌面應用'
            },
            {
                title: 'UI / 樣式設計',
                techStack: [
                    "Tailwind CSS", "Material UI", "Bootstrap", "Sass / SCSS"
                ],
                content: '開發具響應式設計與元件化架構的使用者介面'
            }, {
                title: '後端 / API / 資料處理',
                techStack: [
                    "Node.js", "Express.js", "RESTful API", "JWT", "MySQL", "MongoDB", "Redis", "Third Party API"
                ],
                content: '開發後端 API 並參與資料流設計與快取協作，優化系統效能與整合流程'
            }
        ]
    }
}
