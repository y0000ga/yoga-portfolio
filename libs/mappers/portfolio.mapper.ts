import { IProject, IProjectIntro } from "@/types/project";
import { IResume, TResumeOverview } from "@/types/resume";

export const toResumeOverview = ({ intro }: IResume): TResumeOverview => ({
  intro,
});

export const toProjectIntro = ({
  id,
  title,
  intro,
}: IProject): IProjectIntro => ({
  id,
  title,
  intro,
});
