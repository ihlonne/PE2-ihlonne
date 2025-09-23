import type { ApiListResponse } from '../types/api';
import type { TVenue } from '../types/venue';
import api from './api';

export const getVenues = async (opts?: {
  page?: number;
  limit?: number;
  includeOwner?: boolean;
  includeBookings?: boolean;
  sort?:
    | 'created'
    | 'updated'
    | 'price'
    | 'rating';
  sortOrder?: 'asc' | 'desc';
}): Promise<ApiListResponse<TVenue>> => {
  const {
    page = 1,
    limit = 24,
    includeOwner = true,
    includeBookings = false,
    sort = 'created',
    sortOrder = 'desc',
  } = opts ?? {};

  const { data } = await api.get(
    '/holidaze/venues',
    {
      params: {
        page,
        limit,
        sort,
        sortOrder,
        _owner: includeOwner,
        _bookings: includeBookings,
      },
    }
  );
  return data; // { data: TVenue[], meta }
};

export const getVenue = async (
  id: string
): Promise<TVenue> => {
  const { data } = await api.get<{
    data: TVenue;
  }>(`/holidaze/venues/${id}`, {
    params: { _bookings: true, _owner: true },
  });
  return data.data;
};
