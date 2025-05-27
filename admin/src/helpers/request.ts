import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import CookieStorage from "./cookies";
import LocalStorage from "./local-storage";

const API_REQUEST_TIMEOUT = 90000;

interface ErrorResponseData {
  code?: number;
  message?: string;
}

class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

class Request {
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      timeout: API_REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
      validateStatus: (status) => status === 403 ? false : (status >= 200 && status < 300),
    });

    // Interceptor thêm token mới nhất vào headers mỗi request
    this.axios.interceptors.request.use((config) => {
      const token = LocalStorage.getLocalStorage("access-token");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const status = error.response?.status ?? 500;
    const data = error.response?.data as ErrorResponseData;

    const originalRequest = error.config as any;

    if (
      ((status === 401) || (data.code === 500 && data.message === "jwt expired")) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshedToken = await this.refreshAccessToken();
        if (refreshedToken) {
          LocalStorage.setLocalStorage("access-token", refreshedToken);
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
          }
          return this.axios(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const message = data?.message || error.message || "Lỗi không xác định";
    return Promise.reject(new ApiError(status, message));
  }
);

  }

  private buildFormData(data: object): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    return formData;
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = CookieStorage.getCookie("refresh-token");
    if (!refreshToken) return null;

    try {
      // Dùng instance axios của class để đồng bộ baseURL
      const response = await this.axios.post("/auth/refresh-token", { refreshToken });
      if (response.status === 200) {
        return response.data.data.accessToken;
      }
      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: object, isLoad?: boolean, config?: AxiosRequestConfig) {
    if (isLoad) {
      return this.axios.post(url, this.buildFormData(data), {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return this.axios.post(url, data, config);
  }

  put(url: string, data: object, isLoad?: boolean, config?: AxiosRequestConfig) {
    if (isLoad) {
      return this.axios.put(url, this.buildFormData(data), {
        ...config,
        headers: {
          ...(config?.headers || {}),
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return this.axios.put(url, data, config);
  }

  patch(url: string, data: object, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  upload(url: string, file: File, config?: AxiosRequestConfig) {
    const formData = new FormData();
    formData.append("file", file);

    return this.axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(config?.headers || {}),
      },
      ...config,
    });
  }
}

export default Request;
