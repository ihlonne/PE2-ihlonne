export type AuthUser = {
  name: string;
  email: string;
  avatar?: {
    url?: string;
    alt?: string;
  } | null;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

export type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  setAuth: (next: AuthState) => void;
  logout: () => void;
};
