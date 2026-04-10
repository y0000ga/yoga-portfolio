import { getDictionarySync } from "@/libs/i18n";
import { Lang } from "@/types/common";
import { ResumeParagraph } from "@/types/resume";

export const getResumeParagraphLabels = (lang: Lang) => {
  const dict = getDictionarySync(lang);

  return {
    [ResumeParagraph.Experince]: dict.resume.paragraph.experience,
    [ResumeParagraph.Achievement]: dict.resume.paragraph.achievement,
    [ResumeParagraph.Skill]: dict.resume.paragraph.skill,
    [ResumeParagraph.Education]: dict.resume.paragraph.education,
  };
};
