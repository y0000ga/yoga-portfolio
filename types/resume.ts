interface IWorkExperienceItem {
  title: string;
  company: string;
  endAt: string;
  startFrom: string;
  contents: string[];
}

interface IAchievementItem {
  title: string;
  intro: string;
  techStack: string[];
  results: string[];
  links: Array<{ value: string; label: string }>;
}

interface IEducationItem {
  school: string;
  department: string;
  topic: string;
  startFrom: string;
  endAt: string;
}

interface ISkillItem {
  title: string;
  techStack: string[];
  content: string;
}

export interface IResume {
  keywords: string[];
  workExperince: {
    list: Array<IWorkExperienceItem>;
  };
  achievement: {
    list: Array<IAchievementItem>;
  };
  intro: string;
  education: {
    list: Array<IEducationItem>;
  };
  email: string;
  skill: {
    list: Array<ISkillItem>;
  };
}

export type TResumeOverview = Pick<IResume, "intro" | "keywords">;

export enum ResumeParagraph {
  Achievement = "Achievement",
  Experince = "experince",
  Skill = "skill",
  Education = "education",
}
