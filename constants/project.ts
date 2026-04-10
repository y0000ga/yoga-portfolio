import { getDictionarySync } from "@/libs/i18n";
import { Lang } from "@/types/common";
import { Project, ProjectParagraph } from "@/types/project";

export const getProjectParagraphLabels = (lang: Lang) => {
  const dict = getDictionarySync(lang);

  return {
    [ProjectParagraph.Demo]: dict.project.paragraph.demo,
    [ProjectParagraph.Problem]: dict.project.paragraph.problem,
    [ProjectParagraph.Solution]: dict.project.paragraph.solution,
    [ProjectParagraph.Impact]: dict.project.paragraph.impact,
  };
};

export const getProjectTypeLabels = (lang: Lang) => {
  const dict = getDictionarySync(lang);

  return {
    [Project.CaseStudy]: dict.project.type.caseStudy,
    [Project.SideProject]: dict.project.type.sideProject,
  };
};
