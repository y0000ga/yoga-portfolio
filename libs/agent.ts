import { IGetProjectListResData, TApiResponse } from "@/types/api";
import { IProject } from "@/types/project";
import { IResume, TResumeOverview } from "@/types/resume";

type TFetchApiInit = RequestInit & {
  next?: NextFetchRequestConfig;
};

const API_PREFIX = "/api";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is required on the server",
    );
  }

  return baseUrl;
};

const createApiUrl = (path: string) =>
  `${getApiBaseUrl()}${API_PREFIX}${path}`;

const fetchApi = async <T>(
  path: string,
  init?: TFetchApiInit,
): Promise<TApiResponse<T>> => {
  const response = await fetch(createApiUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const result = (await response.json()) as TApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(
      result.success
        ? `Request failed with status ${response.status}`
        : (result.error?.message ?? "Request failed"),
    );
  }

  return result;
};

export const portfolioApi = {
  projects: {
    list: (init?: TFetchApiInit) =>
      fetchApi<IGetProjectListResData>("/project/list", init),
    byId: (id: string, init?: TFetchApiInit) =>
      fetchApi<IProject>(`/project/${id}`, init),
  },
  resume: {
    detail: (init?: TFetchApiInit) =>
      fetchApi<IResume>("/resume/detail", init),
    overview: (init?: TFetchApiInit) =>
      fetchApi<TResumeOverview>("/resume/overview", init),
  },
};
