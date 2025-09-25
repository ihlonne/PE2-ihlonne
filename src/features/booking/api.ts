import { api } from '../../lib';

export const createBooking = async (
  token: string | null,
  payload: {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
  }
) => {
  if (!token) throw new Error('No auth token');
  const { data } = await api.post(
    '/holidaze/bookings',
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
