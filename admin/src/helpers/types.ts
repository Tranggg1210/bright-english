import { AxiosRequestConfig } from "axios";

export interface CustomAxiosPayload {
  message: string;
  name: string;
  stack: string;
  config: AxiosRequestConfig;
  code: string;
  status: number;
}

export interface CustomMeta {
  arg: any; // hoặc bạn define rõ nếu muốn
  requestId: string;
  rejectedWithValue: boolean;
  requestStatus: "rejected" | "fulfilled" | "pending";
  aborted: boolean;
  condition: boolean;
}

export interface CustomError {
  message: string;
}

export interface ThunkApiError {
  type: string;
  payload: CustomAxiosPayload;
  meta: CustomMeta;
  error: CustomError;
}
