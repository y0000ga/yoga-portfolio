import { IProject, IProjectIntro } from "@/types/project";
import { IResume, TResumeOverview } from "@/types/resume";

export const toResumeOverview = ({
  intro,
  keywords,
}: IResume): TResumeOverview => ({
  intro,
  keywords,
});

export const toProjectIntro = ({
  id,
  title,
  intro,
  type
}: IProject): IProjectIntro => ({
  id,
  title,
  intro,
  type: type
});
