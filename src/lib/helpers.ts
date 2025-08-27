import type { AxiosRequestConfig } from 'axios';
import api from './api';

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
) => (await api.get<T>(url, config)).data;

export const post = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
) => (await api.post<T>(url, body, config)).data;

export const put = async <T, B = unknown>(
  url: string,
  body: B,
  config?: AxiosRequestConfig
) => (await api.put<T>(url, body, config)).data;

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
) => (await api.delete<T>(url, config)).data;

/* export const qp = (
  params: Record<string, unknown> = {}
) => {
  const cleaned = Object.entries(params).filter(
    ([, v]) =>
      v !== undefined && v !== null && v !== ''
  );
  return cleaned.length
    ? `?${new URLSearchParams(cleaned as any)}`
    : '';
};
 */
