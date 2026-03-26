import { IProject } from "@/types/project";
import { webAxios } from "./axios";
import { IGetProjectListResData, TApiResponse } from "@/types/api";
import { IResume, TResumeOverview } from "@/types/resume";

export const portfolioApi = {
  projects: {
    list: () => webAxios.get<unknown, TApiResponse<IGetProjectListResData>>('/project/list'),
    byId: (id: string) => webAxios.get<unknown, TApiResponse<IProject>>(`/project/${id}`),
  },
  resume: {
    detail: () => webAxios.get<unknown, TApiResponse<IResume>>('/resume/detail'),
    overview: () => webAxios.get<unknown, TApiResponse<TResumeOverview>>('/resume/overview'),
  },
};