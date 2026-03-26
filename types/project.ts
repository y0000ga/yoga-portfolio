interface IDecision {
    question: string,
    answer: string
}

interface IArchitecture {
    solutions: string[],
    images: IMedia[],
}

interface IBaseProject {
    title: string,
    problems: string[],
    architecture: IArchitecture,
    decisions: Array<IDecision>,
    impacts: string[],
    intro: string,
    id: string,
    tradeOffs: string[],
    demos: Array<IMedia>,
}

interface IMedia {
    mediaURL: string,
    content: string
}

export enum Project {
    CaseStudy,
    SideProject
}

export interface ICaseStudy extends IBaseProject {
    type: Project.CaseStudy,
    context: {
        scale: string,
        team: string,
        role: string
    },
    challenges: string[],
    ownership: string[],
    execution: string[]
}

export interface ISideProject extends IBaseProject {
    type: Project.SideProject,
    repoURL: string,
    futureWorks: string[]
}

export type IProject = ICaseStudy | ISideProject

export type IProjectIntro  =  Pick<IProject, 'id' | 'title' | 'intro'>

export enum ProjectParagraph {
  Overview ='Overview',
  Demo = 'Demo',
  Problem = 'Problem',
  Challenge = 'Challenge',
  Solution = 'Solution',
  Decision = 'Decision',
  TradeOff = 'TradeOff',
  Impact = 'Impact',
  Execution = 'execution',
  Ownership='ownership',
  FutureWorks = '未來計畫'
}