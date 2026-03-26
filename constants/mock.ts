import { ICaseStudy, ISideProject, Project } from "@/types/project";

// 官網重構
export const TEMP_DATA_YOXI_REFACTOR: ICaseStudy = {
    demos: [
        {
            mediaURL: '/ssr-demo.png',
            content:
                '首頁為系統中最具代表性的高負載頁面，包含大量圖片資源與多組 API 請求。在導入 Next.js SSR 並重構資料請求與資源載入策略後，此頁 Lighthouse Performance 可達 97 分，顯示整體 rendering 與 loading flow 已明顯改善。'
        }
    ],
    type: Project.CaseStudy,
    id: 'yoxi-refactor',
    title: 'Yoxi 官方網站 SEO 與效能優化',
    intro:
        '將原本以 CSR + Prerender.io 為主的官網架構重構為 Next.js SSR，並同步整理資料請求與元件結構，以提升 SEO 可見性、頁面效能與後續維護性。',

    context: {
        scale: '多頁官網（20+ pages）',
        team: 'Frontend 團隊（3 人）',
        role: 'Frontend 主導開發與架構設計'
    },

    problems: [
        'CSR 架構需依賴 Prerender.io 才能支援搜尋引擎解析，增加成本與維運負擔',
        'API 請求與資源載入策略缺乏統一設計，影響頁面效能',
        '既有元件與樣式規則不一致，導致維護成本偏高'
    ],

    challenges: [
        '需在既有產品上逐步導入 SSR，並控制重構風險',
        '需同時處理 SEO metadata、資料請求與頁面 rendering 邏輯',
        '需在 SSR 與 CSR 之間劃分合理邊界，避免架構複雜度失控'
    ],

    architecture: {
        solutions: [
            '採用 Next.js SSR 作為主要 rendering strategy',
            '建立 page-level data fetching 與 metadata generation 機制',
            '重構 component 結構，建立以 Tailwind CSS 為基礎的 design system'
        ],
        images: [
            { mediaURL: '/ssr-before-after.png', content: '重構前後 rendering 架構對照' },
            { mediaURL: '/render-flow.png', content: '重構後頁面資料流與 rendering flow' }
        ]
    },

    decisions: [
        {
            question: '為什麼選擇 SSR 而非 CSR / SSG？',
            answer:
                '官網需兼顧 SEO 與動態內容更新，SSR 能同時滿足搜尋引擎可解析與資料即時性需求。'
        },
        {
            question: '為什麼不使用 Material UI？',
            answer:
                '官網元件偏高度客製化，且 SSR 環境下導入與樣式處理成本較高，因此改以 Tailwind CSS 建立自訂 design system。'
        }
    ],

    tradeOffs: [
        'SSR 導入後需承擔額外 server rendering 成本',
        '部分頁面需採 hybrid CSR/SSR，增加架構管理難度',
        '重構需逐頁驗證，初期投入成本較高'
    ],

    execution: [
        '將既有頁面逐步由 CSR 遷移至 SSR，並保留必要的 hybrid rendering',
        '重整資料請求方式，將主要請求集中到 page-level',
        '調整圖片與 script 載入策略，降低 initial load 成本',
        '抽離共用 UI 結構，建立可重用的 design system 基礎'
    ],

    impacts: [
        '網站整體效能相較原架構提升約 90%',
        '移除 Prerender.io 依賴，降低第三方成本與維運負擔',
        'SEO 可見性與後續開發維護性同步改善'
    ],

    ownership: [
        '主導 SSR 架構選型與遷移策略',
        '負責核心頁面重構與資料流整理',
        '協助拆解任務並推進團隊落地'
    ]
}

// SEO/AIO
export const TEMP_DATA_SEO_AIO: ICaseStudy = {
    type: Project.CaseStudy,
    id: 'aioseo',
    title: 'AIO / SEO 分析與檢核平台（0→1）',

    intro:
        '從 0 到 1 規劃 AIO / SEO 分析與檢核平台，整合網站結構資料與內容訊號，建立跨站點的評估、建議與比較流程，作為集團內統一的 SEO/AIO 標準化基礎。',

    context: {
        scale: '輸入頁 + 分析頁 + Dashboard（多站點比較）',
        team: 'TPM x 1 + Frontend x 1 + Backend x 1',
        role: 'Frontend 主導產品規劃、架構設計與 UI/UX'
    },

    problems: [
        '各子公司網站分散維護，缺乏統一 SEO/AIO 評估標準，品質落差大',
        '仰賴外部顧問進行分析成本高，且難以持續追蹤與優化'
    ],

    challenges: [
        '需定義可跨網站適用的評分模型，避免不同網站間結果不可比較',
        '需整合多種來源資料（HTML、metadata、結構化資料）並轉換為可分析格式',
        '評估結果需同時具備「可解釋性」與「可操作建議」'
    ],

    architecture: {
        solutions: [
            '建立爬蟲機制，蒐集 JSON-LD、OpenAPI、robots.txt、sitemap 等結構化與設定資料',
            '設計評分 pipeline，將多維度指標轉換為可比較的 normalized score',
            '透過 Dashboard 呈現各站點分析結果，支援橫向比較與問題定位'
        ],
        images: [
            {
                mediaURL: '/aio-evaluate.png',
                content: '資料收集 → 評估 → 正規化 → Dashboard 呈現流程'
            },
            {
                mediaURL: '/aio-data-select.png',
                content: '資料收集細節'
            },
            {
                mediaURL: '/aio-flow.png',
                content: '評估引擎細節'
            }
        ]
    },

    decisions: [
        {
            question: '為什麼採用「正規化評分」而非絕對分數？',
            answer:
                '不同網站規模與內容結構差異大，直接使用絕對分數無法公平比較，因此透過 normalization 轉換為相對評分，提高跨站點可比性。'
        },
        {
            question: '為什麼整合多來源資料（JSON-LD / sitemap / metadata）？',
            answer:
                '單一來源無法完整反映 SEO/AIO 狀態，多來源整合可更全面評估網站結構、可索引性與語意資訊品質。'
        },
        {
            question: '為什麼導入 AI 作為評分與建議輔助？',
            answer:
                '部分評估項目（如內容語意與結構品質）難以透過 rule-based 規則判斷，透過 AI 可提升分析彈性並支援持續優化。'
        }
    ],

    tradeOffs: [
        '採用爬蟲與多來源資料整合，增加系統複雜度與維護成本',
        'AI 評分具彈性但可解釋性較低，需搭配規則與指標輔助',
        '正規化評分提升可比性，但可能降低單一網站的絕對判讀精度'
    ],

    execution: [
        '設計網站資料收集流程，整合多種結構化與設定資料來源',
        '建立評分模型與 normalization 機制，統一評估邏輯',
        '實作分析頁面，呈現評估項目、結果與對應建議',
        '建立 Dashboard，支援多網站比較與結果追蹤',
        '導入 AI 輔助評估與建議生成，並持續優化評分準則'
    ],

    impacts: [
        '建立集團共用的 SEO/AIO 評估標準與流程',
        '降低外部顧問依賴，提升內部分析效率',
        '提供可比較的分析結果，支援跨站點優化決策'
    ],

    ownership: [
        '主導整體產品規劃與評估流程設計',
        '負責前端架構與 UI/UX 設計',
        '推動 POC 與評分模型驗證，與 TPM/主管協作調整方向'
    ],

    demos: [
        {
            mediaURL: '/aio-seo-detail.png',
            content:
                '分析頁面整合爬蟲結果與評估指標，左側呈現評估項目與建議，右側對應原始資料，提升可解釋性與操作性'
        },
        {
            mediaURL: '/aio-seo-chart.png',
            content:
                '透過 normalization 評分機制，將不同網站結果轉換為可比較指標，支援跨站點分析與決策'
        }
    ]
}

export const TEMP_DATA_STATE_MACHINE: ICaseStudy = {
    type: Project.CaseStudy,
    id: 'state-machine',
    title: 'State Machine 於 QRCode 掃碼叫車流程之應用',

    intro:
        '將 state machine 應用於 QRCode 掃碼叫車流程，將原本容易分散在多個畫面與條件判斷中的流程狀態，整理為可視化、可驗證的狀態模型，並作為 PM、RD 與 Backend 對齊流程的共同語言。',

    context: {
        scale: '輸入資料頁 + 叫車結果頁 + 非同步輪詢狀態',
        team: 'PM x 1 + Frontend x 1 + Backend x 1',
        role: '負責前端開發、流程建模與跨角色對齊，並協助 PM 進行競品分析'
    },

    problems: [
        'PM 與 RD 在流程定義上缺乏共同語言，需求確認需要反覆來回溝通',
        '若僅以 useState / boolean flags 管理畫面狀態，流程分支與例外情境容易失控',
        '叫車流程包含多個非同步狀態與錯誤分支，難以透過一般條件判斷維持可讀性與可維護性'
    ],

    challenges: [
        '需將商業流程拆解為明確狀態、事件與轉移條件',
        '需讓非工程背景的 PM 也能理解 state machine 與流程圖的對應關係',
        '初期建模成本較高，需先釐清邊界情境與錯誤處理方式'
    ],

    architecture: {
        solutions: [
            '以 state machine 定義主要流程狀態、事件與轉移規則',
            '將 Wireframe 與流程圖對應到 machine state，作為 PM / RD 共同溝通基礎',
            '將 loading、success、failure、retry 等非同步流程納入狀態模型統一管理'
        ],
        images: [
            {
                mediaURL: '/state-machine-flow.png',
                content: 'QRCode 掃碼叫車流程的 state diagram'
            }
        ]
    },

    decisions: [
        {
            question: '為什麼選擇 state machine，而不是一般 React state？',
            answer:
                '此流程雖然頁面數不多，但包含明確的狀態切換、非同步請求與錯誤分支。使用 state machine 可將流程限制在可預期的 transition 內，降低條件判斷失控的風險。'
        },
        {
            question: '為什麼要把 state machine 定義提供給 PM？',
            answer:
                'state machine 不只用於實作，也可作為流程文件。讓 PM 直接看到狀態與轉移邏輯，可降低需求確認成本，並避免 wireframe 與實作認知落差。'
        }
    ],

    tradeOffs: [
        '初期建模與導入成本高於直接以 component state 實作',
        '團隊需理解 state machine 的概念，否則前期溝通成本會上升',
        '對較簡單的單一路徑頁面而言，state machine 可能顯得過度設計'
    ],

    execution: [
        '先依 PM wireframe 與競品分析整理主要使用者路徑與例外情境',
        '將流程拆解為 state、event、transition 與 error branch',
        '將狀態模型對應回畫面與 API interaction，作為前端實作依據',
        '將 machine 定義整理為 PM 可理解的流程圖與狀態說明，作為需求溝通與驗收基準'
    ],

    impacts: [
        '降低 PM 與 RD 對流程理解的落差，提升需求確認效率',
        '讓叫車流程的狀態轉移與例外處理更可預期、可維護',
        '建立後續複雜流程導入 state machine 的實務基礎'
    ],

    ownership: [
        '主導 QRCode 掃碼叫車流程的 state modeling',
        '負責將 wireframe 與商業流程轉為可實作的狀態機定義',
        '首次將 state machine 導入團隊開發與需求對齊流程中'
    ],

    demos: [
        {
            mediaURL: '/state-machine-role.png',
            content: '將 QRCode 掃碼叫車流程轉為明確的狀態圖，讓狀態切換、非同步請求與錯誤分支可視化，最終將 wireframe 與 machine state 對照，讓每個畫面對應到特定 state 與 transition，作為需求討論與實作驗收的共同基準。'
        }
    ]
}

export const TEMP_DATA_CHROME_EXTENSION: ISideProject = {
    type: Project.SideProject,
    id: 'ai-prompt-workspace',
    title: 'AI Prompt Workspace',
    intro:
        '開發一套用於管理與重用 AI prompts 的 Chrome Extension，支援跨網站內容收集、分類整理與快速存取，作為個人 AI workflow 的基礎工具。',

    problems: [
        '在日常導入 AI workflow 後，prompt 來源逐漸分散於各網站、文件與對話中，難以統一整理與重用',
        '若以手動複製貼上方式管理 prompt，維護成本高，且容易遺失上下文與來源資訊',
        '缺乏一個輕量且可持續使用的工具，將 prompt 收集、分類與後續使用串進同一工作流程中'
    ],

    architecture: {
        solutions: [
            '建立可重用的 Prompt Workspace，集中管理 prompts 與來源資訊',
            '透過 Chrome Context Menu 與 Side Panel 支援跨網站內容擷取與快速存取',
            '實作標籤、搜尋、釘選與持久化儲存機制，降低 prompt 維護與重用成本'
        ],
        images: [
            {
                mediaURL: '/prompt-workspace-overview.png',
                content: 'Prompt Workspace 主畫面，集中管理 prompts、標籤與搜尋結果'
            },
            {
                mediaURL: '/prompt-workspace-flow.png',
                content: '從網站擷取內容 → 儲存到 Workspace → 搜尋與重用的 workflow'
            }
        ]
    },

    decisions: [
        {
            question: '為什麼選擇 Chrome Extension，而不是獨立 Web App？',
            answer:
                'Prompt 的主要使用情境發生在瀏覽器中，Chrome Extension 能更貼近實際工作流程，直接支援跨網站擷取與快速存取。'
        },
        {
            question: '為什麼優先使用 local storage / Chrome Storage，而不是先做 backend？',
            answer:
                '初期目標是快速驗證個人工具的可用性與 workflow 價值，先以本地儲存降低系統複雜度，保留後續同步與協作擴充空間。'
        },
        {
            question: '為什麼需要標籤、搜尋與釘選機制？',
            answer:
                '單純儲存 prompt 不足以支撐長期使用，必須提供分類、檢索與優先排序能力，才能真正融入日常 AI workflow。'
        }
    ],

    impacts: [
        '將分散於各網站與對話中的 prompts 集中管理，降低整理與重找成本',
        '建立可持續重用的 prompt workspace，提升個人 AI workflow 的穩定性與效率',
        '驗證以 browser-native tooling 支援 AI workflow 的可行性，作為後續擴充基礎'
    ],

    repoURL: 'https://github.com/y0000ga/ai-prompt-workspace',

    demos: [
        {
            mediaURL: '/prompt-workspace-main.png',
            content:
                'Prompt Workspace 主畫面，集中管理 prompts，支援搜尋、標籤與快速操作'
        },
        {
            mediaURL: '/prompt-workspace-search.png',
            content:
                '支援多維度篩選（Tag / Site / Search），快速定位目標 prompt，降低重找成本'
        },
        {
            mediaURL: '/prompt-workspace-action.png',
            content:
                '提供快速操作（複製 / 編輯 / 刪除 / 釘選），讓 prompt 可即時重用於 AI workflow'
        }
    ],

    tradeOffs: [
        '以 Chrome Extension 為載體可提升使用便利性，但平台受限於瀏覽器生態',
        '先採用本地儲存可降低複雜度，但暫不支援跨裝置同步與多人協作',
        '功能設計需在輕量工具與完整知識管理系統之間取捨，避免過度膨脹'
    ],

    futureWorks: [
        '支援 prompt template 與變數插槽，提高重用與組裝能力',
        '導入雲端同步，支援跨裝置與多環境使用',
        '增加來源追蹤與版本管理，提升 prompt 維護性',
        '探索與其他 AI workflow 工具整合，例如知識庫、CLI 或 agent orchestration'
    ]
}

export const TEMP_DATA_RESUME = {
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
                ]
            },
            {
                title: 'AIO / SEO 分析與檢核平台（0→1）',
                intro: '從 0 到 1 規劃 AIO / SEO 分析與檢核平台，整合 OpenAPI、JSON-LD、robots.txt、sitemap.xml 等網站資料，建立 AI 評估、建議與比較流程。 ',
                techStack: ['Next.js', 'SSR', 'SEO', 'WebSocket'],
                results: [
                    '建立網站資料收集、評分建議與結果比較的標準化流程',
                    '透過 dashboard 呈現與比較查詢結果，形成可持續運作的分析機制 ',
                    '作為 集團與子公司共用 的 AIO / SEO 檢核基礎',
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
