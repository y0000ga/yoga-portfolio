import { cache } from "react";
import {
  TEMP_DATA_AI_FRONTEND_WORKFLOW,
  TEMP_DATA_CHROME_EXTENSION,
  TEMP_DATA_MEDICATION_BACKEND,
  TEMP_DATA_MEDICATION_FRONTEND,
  TEMP_DATA_RESUME,
  TEMP_DATA_SEO_AIO,
  TEMP_DATA_STATE_MACHINE,
  TEMP_DATA_YOXI_REFACTOR,
  TEMP_DATA_MEDICHECK_AI_ASSISTED_WORKFLOW
} from "@/constants/mock";
import {
  toProjectIntro,
  toResumeOverview,
} from "@/libs/mappers/portfolio.mapper";
import { IProject, IProjectIntro } from "@/types/project";
import { IResume, TResumeOverview } from "@/types/resume";

const PROJECT_RECORDS: IProject[] = [
  TEMP_DATA_MEDICATION_BACKEND,
  TEMP_DATA_MEDICATION_FRONTEND,
  TEMP_DATA_MEDICHECK_AI_ASSISTED_WORKFLOW,
  TEMP_DATA_YOXI_REFACTOR,
  TEMP_DATA_SEO_AIO,
  TEMP_DATA_AI_FRONTEND_WORKFLOW,
  TEMP_DATA_STATE_MACHINE,
  TEMP_DATA_CHROME_EXTENSION,
];

export const getResumeDetail = cache(
  async (): Promise<IResume> => TEMP_DATA_RESUME,
);

export const getResumeOverview = cache(
  async (): Promise<TResumeOverview> => toResumeOverview(TEMP_DATA_RESUME),
);

export const getProjectList = cache(
  async (): Promise<IProjectIntro[]> =>
    PROJECT_RECORDS.map((project) => toProjectIntro(project)),
);

export const getProjectById = cache(
  async (id: string): Promise<IProject | null> =>
    PROJECT_RECORDS.find((project) => project.id === id) ?? null,
);
