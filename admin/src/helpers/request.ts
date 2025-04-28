import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import CookieStorage from "./cookies";

const headers = {
    "Content-Type": "application/json",
}

const API_REQUEST_TIMEOUT = 9000;

class Request {
    axios: AxiosInstance;

    constructor(baseURL: string) {
        const token = CookieStorage.getCookie('access-token');

        if (token) {
            Object.assign(headers, {
                Authorization: `Bearer ${token}`,
            })
        }

        this.axios = axios.create({
            baseURL,
            timeout: API_REQUEST_TIMEOUT,
            headers,
            responseType: "json",
            validateStatus: (status) => {
                if (status === 403) return false;
                else {
                    return status >= 200 && status < 300;
                }
            }
        });

        this.axios.interceptors.request.use(
            (config) => config,
            (err) => Promise.reject(err)
        );

        this.axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error: AxiosError) => {
                if (error.response?.status === 401 && error.config) {
                    try {
                        const refreshedToken = await this.refreshAccessToken();
                        if (refreshedToken) {
                            CookieStorage.getCookie('access-token', refreshedToken);
                            error.config.headers['Authorization'] = `Bearer ${refreshedToken}`;
                            return this.axios(error.config);
                        }
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async refreshAccessToken(): Promise<string | null> {
        try {
            const refreshToken = CookieStorage.getCookie('refresh-token');
            if (!refreshToken) {
                return null;
            }

            const response = await axios.post('/auth/refresh-token', { refreshToken });
            if (response.status === 200) {
                return response.data.accessToken;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    get(url: string, config?: AxiosRequestConfig) {
        return this.axios.get(url, config);
    }

    post(url: string, data: object, config?: AxiosRequestConfig) {
        return this.axios.post(url, data, config);
    }

    put(url: string, data: object, config?: AxiosRequestConfig) {
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
        formData.append('file', file);

        return this.axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(config && config.headers ? config.headers : {}),
            },
            ...config
        });
    }
}

export default Request;
