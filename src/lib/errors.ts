import { isAxiosError } from 'axios';

export function getErrorMessage(
  e: unknown,
  fallback = 'Something went wrong'
) {
  if (isAxiosError(e))
    return (
      e.response?.data?.errors?.[0]?.message ??
      e.message ??
      fallback
    );
  if (e instanceof Error)
    return e.message || fallback;
  return fallback;
}
