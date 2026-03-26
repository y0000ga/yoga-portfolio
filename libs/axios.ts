import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosHeaders } from "axios";

interface CreateAxiosInstanceConfig {
  baseURL: string;
  timeout?: number;

  getToken?: () => string | null;

  onUnauthorized?: (error: AxiosError) => Promise<void> | void;

  axiosConfig?: AxiosRequestConfig;
}

const createAxiosInstance = (config: CreateAxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 10000,
    ...config.axiosConfig,
  });

  instance.interceptors.request.use((req) => {
    const token = config.getToken?.();

    if (token) {
      if (!req.headers) {
        req.headers = new AxiosHeaders();
      }
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        await config.onUnauthorized?.(error);
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export const webAxios = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api'
})