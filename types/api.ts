import { IProjectIntro } from "./project"

type TApiErr = {
    success: false,
    error: { code: number, message: string } | null,
    data: null
}

export type TApiResponse<T> = TApiErr | {
    success: true,
    error: null,
    data: T
}

export type IGetProjectListResData = { list: Array<IProjectIntro> }