import axios from 'axios';
import { getToken, onTokenChange } from './token';

export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  'https://v2.api.noroff.dev/holidaze';
const API_KEY = import.meta.env.VITE_API_KEY as
  | string
  | undefined;

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY
      ? { 'X-Noroff-API-Key': API_KEY }
      : {}),
  },
});

const initial = getToken();
if (initial)
  api.defaults.headers.common.Authorization = `Bearer ${initial}`;

onTokenChange((t) => {
  if (t)
    api.defaults.headers.common.Authorization = `Bearer ${t}`;
  else
    delete api.defaults.headers.common
      .Authorization;
});

export default api;
