import { post } from '../../lib/helpers';

import type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
} from './types';

export const registerUser = (
  data: RegisterPayload
) =>
  post<AuthResponse, RegisterPayload>(
    '/auth/register',
    data
  );

export const loginUser = (data: LoginPayload) =>
  post<AuthResponse>('/auth/login', data);
