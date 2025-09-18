import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type PropsWithChildren,
} from 'react';
import { api } from '../lib';
import { AuthContext } from './AuthContext';
import type {
  AuthContextValue,
  AuthState,
} from '../types/auth';

const STORAGE_USER = 'user';
const STORAGE_TOKEN = 'token';

export const AuthProvider = ({
  children,
}: PropsWithChildren) => {
  const [user, setUser] = useState<
    AuthState['user']
  >(() => {
    const raw =
      localStorage.getItem(STORAGE_USER);
    return raw
      ? (JSON.parse(raw) as AuthState['user'])
      : null;
  });

  const [token, setToken] = useState<
    AuthState['token']
  >(() => localStorage.getItem(STORAGE_TOKEN));

  // keep localStorage in sync
  useEffect(() => {
    if (user)
      localStorage.setItem(
        STORAGE_USER,
        JSON.stringify(user)
      );
    else localStorage.removeItem(STORAGE_USER);
  }, [user]);

  useEffect(() => {
    if (token)
      localStorage.setItem(STORAGE_TOKEN, token);
    else localStorage.removeItem(STORAGE_TOKEN);
  }, [token]);

  const setAuth = useCallback(
    (next: AuthState) => {
      setUser(next.user);
      setToken(next.token);
    },
    []
  );

  const saveUser = useCallback(
    (next: AuthState['user'] | null) => {
      setUser(next); // effects above will persist it
    },
    []
  );

  const refreshUser =
    useCallback(async (): Promise<
      AuthState['user'] | null
    > => {
      if (!token || !user?.name) return null;
      const { data } = await api.get(
        `/holidaze/profiles/${encodeURIComponent(
          user.name
        )}?_count=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } // remove if you use an interceptor
      );
      const fresh = data.data; // API shape: { data: Profile, meta: {} }
      setUser((prev) =>
        prev ? { ...prev, ...fresh } : fresh
      );
      return fresh;
    }, [token, user?.name]);

  const logout = useCallback(() => {
    setAuth({ user: null, token: null });
  }, [setAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      setAuth,
      saveUser,
      refreshUser,
      logout,
    }),
    [
      user,
      token,
      setAuth,
      saveUser,
      refreshUser,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
