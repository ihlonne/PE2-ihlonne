const TOKEN_KEY = 'token';

export const getToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(
    new CustomEvent('auth:token', {
      detail: token,
    })
  );
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(
    new CustomEvent('auth:token', {
      detail: null,
    })
  );
};

export const onTokenChange = (
  fn: (t: string | null) => void
) => {
  const handler = (e: Event) =>
    fn((e as CustomEvent).detail ?? getToken());
  window.addEventListener(
    'auth:token',
    handler as EventListener
  );

  const storageHandler = () => fn(getToken());
  window.addEventListener(
    'storage',
    storageHandler
  );

  return () => {
    window.removeEventListener(
      'auth:token',
      handler as EventListener
    );
    window.removeEventListener(
      'storage',
      storageHandler
    );
  };
};
