import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v2.api.noroff.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = async <T>(
  url: string
): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

export default api;
