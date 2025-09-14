import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';
import {
  type AuthContextValue,
  type AuthState,
} from '../types/auth';
import { AuthContext } from './AuthContext';

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
  >(() => {
    return localStorage.getItem(STORAGE_TOKEN);
  });

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

  const setAuth = (next: AuthState) => {
    setUser(next.user);
    setToken(next.token);
  };

  const logout = () =>
    setAuth({ user: null, token: null });

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, setAuth, logout }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
