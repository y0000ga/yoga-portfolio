export enum Lang {
    En = 'en',
    Zh_Hant_TW = 'zh-Hant-TW'
}

export interface IBasePageProps {
  params: Promise<{
    lang: string
  }>
}