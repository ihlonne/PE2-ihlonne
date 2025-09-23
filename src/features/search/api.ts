import { api } from '../../lib';

export const searchVenues = async (
  q: string,
  opts?: {
    limit?: number;
    page?: number;
    includeOwner?: boolean;
    includeBookings?: boolean;
  }
) => {
  const {
    limit = 12,
    page = 1,
    includeOwner = true,
    includeBookings = false,
  } = opts ?? {};

  const { data } = await api.get(
    '/holidaze/venues/search',
    {
      params: {
        q,
        limit,
        page,
        _owner: includeOwner,
        _bookings: includeBookings,
      },
    }
  );
  return data;
};

export default searchVenues;
