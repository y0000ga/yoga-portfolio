import { cache } from "react";
import {
  TEMP_DATA_CHROME_EXTENSION,
  TEMP_DATA_RESUME,
  TEMP_DATA_SEO_AIO,
  TEMP_DATA_STATE_MACHINE,
  TEMP_DATA_YOXI_REFACTOR,
} from "@/constants/mock";
import { IProject } from "@/types/project";
import { IResume } from "@/types/resume";

const PROJECT_RECORDS: IProject[] = [
  TEMP_DATA_YOXI_REFACTOR,
  TEMP_DATA_SEO_AIO,
  TEMP_DATA_STATE_MACHINE,
  TEMP_DATA_CHROME_EXTENSION,
];

export const getResumeRecord = cache(
  async (): Promise<IResume> => TEMP_DATA_RESUME,
);

export const getProjectRecords = cache(
  async (): Promise<IProject[]> => PROJECT_RECORDS,
);

export const getProjectRecordById = cache(
  async (id: string): Promise<IProject | null> =>
    PROJECT_RECORDS.find((project) => project.id === id) ?? null,
);
