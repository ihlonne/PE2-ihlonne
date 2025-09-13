import type { ApiListResponse } from '../types/api';
import type { TVenue } from '../types/venue';
import api from './api';

export const getVenues = async (opts?: {
  perPage?: number;
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
    perPage = 100,
    includeOwner = true,
    includeBookings = true,
    sort = 'created',
    sortOrder = 'desc',
  } = opts ?? {};

  let page = 1;
  let isLastPage = false;

  const all: TVenue[] = [];
  let lastMeta:
    | ApiListResponse<TVenue>['meta']
    | undefined;

  while (!isLastPage) {
    const { data } = await api.get<
      ApiListResponse<TVenue>
    >('/holidaze/venues', {
      params: {
        page,
        limit: perPage,
        sort,
        sortOrder,
        _owner: includeOwner,
        _bookings: includeBookings,
      },
    });

    if (data?.data?.length)
      all.push(...data.data);
    lastMeta = data.meta;
    isLastPage = Boolean(data.meta?.isLastPage);
    page += 1;
  }

  return {
    data: all,
    meta: lastMeta as ApiListResponse<TVenue>['meta'],
  };
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
