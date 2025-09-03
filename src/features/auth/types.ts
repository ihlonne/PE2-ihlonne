import type { RegisterFormValues } from './schemas';

export type RegisterPayload = Omit<
  RegisterFormValues,
  'confirmPassword'
>;
export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  accessToken: string;
  name: string;
  email: string;
  avatar?: { url: string; alt?: string } | null;
  banner?: { url: string; alt?: string } | null;
  bio?: string;
  venueManager?: boolean;
};

export type ApiResponse<T> = {
  data: T;
  meta: Record<string, unknown>;
};

export type AuthResponse = ApiResponse<AuthUser>;
