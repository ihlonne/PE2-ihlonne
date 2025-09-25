export type AuthUser = {
  accessToken: string;
  name: string;
  email: string;
  avatar?:
    | { url: string; alt?: string }
    | null
    | undefined;
  banner?:
    | { url: string; alt?: string }
    | null
    | undefined;
  bio?: string;
  venueManager?: boolean;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

export type AuthContextValue = {
  user: AuthState['user'];
  token: AuthState['token'];
  setAuth: (next: AuthState) => void;
  saveUser: (u: AuthState['user'] | null) => void;
  refreshUser: () => Promise<
    AuthState['user'] | null
  >;
  logout: () => void;
};
