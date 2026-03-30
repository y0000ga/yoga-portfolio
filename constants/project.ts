import { Project, ProjectParagraph } from "@/types/project";

export const PROJECT_PARAGRAPH = {
  [ProjectParagraph.Demo]: 'Demo 畫面',
  [ProjectParagraph.Problem]: '問題背景',
  [ProjectParagraph.Solution]: '解法設計',
  [ProjectParagraph.Impact]: '成效',
}

export const PROJECT_TYPE_LABEL = {
  [Project.CaseStudy]: '案例研究',
  [Project.SideProject]: '個人專案'
}