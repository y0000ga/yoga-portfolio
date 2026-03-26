import { cache } from "react";
import { toProjectIntro, toResumeOverview } from "@/libs/mappers/portfolio.mapper";
import {
  getProjectRecordById,
  getProjectRecords,
  getResumeRecord,
} from "@/libs/repositories/portfolio.repository";
import { IProject, IProjectIntro } from "@/types/project";
import { IResume, TResumeOverview } from "@/types/resume";

export const getResumeDetail = cache(async (): Promise<IResume> => getResumeRecord());

export const getResumeOverview = cache(
  async (): Promise<TResumeOverview> => toResumeOverview(await getResumeRecord())
);

export const getProjectList = cache(
  async (): Promise<IProjectIntro[]> =>
    (await getProjectRecords()).map((project) => toProjectIntro(project))
);

export const getProjectById = cache(
  async (id: string): Promise<IProject | null> => getProjectRecordById(id)
);
