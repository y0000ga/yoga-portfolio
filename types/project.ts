interface IArchitecture {
    images: IMedia[],
}

interface IBaseProject {
    title: string,
    problems: string[],
    architecture: IArchitecture,
    solution: string[],
    impacts: string[],
    intro: string,
    id: string,
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
}

export interface ISideProject extends IBaseProject {
    type: Project.SideProject,
    repoURL: string,
}

export type IProject = ICaseStudy | ISideProject

export type IProjectIntro = Pick<IProject, 'id' | 'title' | 'intro'>

export enum ProjectParagraph {
    Demo = 'Demo',
    Problem = 'Problem',
    Solution = 'Solution',
    Impact = 'Impact'
}