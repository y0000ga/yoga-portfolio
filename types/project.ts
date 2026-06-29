interface IArchitectureDiagram {
  title?: string;
  caption: string;
  explanation?: string[];
  sources: {
    mermaid?: string;
    image?: string;
    video?: string;
  };
}

interface IArchitecture {
  diagrams: IArchitectureDiagram[];
}

interface IBaseProject {
  title: string;
  architecture: IArchitecture;
  impacts: string[];
  intro: string;
  id: string;
  demos: Array<IMedia>;
  techStack: string[];
  relatedProjects: { name: string; id: string }[];
  thumbnail: string;
}

export enum MediaType {
  Video,
  Picture,
  Hyperlink,
}

export interface IMedia {
  type: MediaType;
  mediaURL: string;
  content: string;
}

export enum Project {
  CaseStudy,
  SideProject,
}

export interface ICaseStudy extends IBaseProject {
  type: Project.CaseStudy;
  repoURL?: string;
  context: {
    scale: string;
    team: string;
    role: string;
  };
  FAQs: { question: string; answer: string }[];
}

export interface ISideProjectVariant {
  label?: string;
  techStack: string[];
  repoURL: string;
  demos: Array<IMedia>;
}

export interface ISideProject extends Omit<
  IBaseProject,
  "techStack" | "demos"
> {
  type: Project.SideProject;
  solution: string[];
  problems: string[];
  variants: ISideProjectVariant[];
}

export type IProject = ICaseStudy | ISideProject;

export type IProjectIntro = Pick<
  IProject,
  "id" | "title" | "intro" | "type" | "thumbnail"
>;

export enum ProjectParagraph {
  Demo = "Demo",
  Problem = "Problem",
  Solution = "Solution",
  Impact = "Impact",
  RelativeProject = "RelativeProject",
  FAQs = "FAQs",
  Architecture = "Architecture",
}
