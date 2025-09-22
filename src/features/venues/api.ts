import { api } from '../../lib';
import type {
  TVenue,
  CreateVenuePayload,
} from '../../types/venue';

type ApiEnvelope<T> = { data: T; meta?: unknown };

export const createVenue = async (
  payload: CreateVenuePayload,
  token: string
) => {
  const res = await api.post<ApiEnvelope<TVenue>>(
    '/holidaze/venues',
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};

export const editVenue = async (
  id: string,
  payload: CreateVenuePayload,
  token: string
) => {
  const res = await api.put<ApiEnvelope<TVenue>>(
    `/holidaze/venues/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};
