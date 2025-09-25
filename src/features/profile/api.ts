import { api } from '../../lib';
import type { Booking } from '../../types/booking';
import type { TVenue } from '../../types/venue';

export const updateProfileMedia = async (
  token: string | null,
  name: string,
  body: {
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
  }
) => {
  if (!token) throw new Error('No auth token');
  const { data } = await api.put(
    `/holidaze/profiles/${encodeURIComponent(
      name
    )}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getVenuesForProfile = async (
  username: string
): Promise<TVenue[]> => {
  const res = await api.get<{ data: TVenue[] }>(
    `/holidaze/profiles/${username}/venues`,
    { params: { _bookings: true, _owner: true } }
  );
  return res.data.data;
};

export const getBookingsForProfile = async (
  username: string
): Promise<Booking[]> => {
  const res = await api.get<{ data: Booking[] }>(
    `/holidaze/profiles/${encodeURIComponent(
      username
    )}/bookings`,
    { params: { _venue: true } }
  );
  return res.data.data;
};

export const deleteBookingForProfile = async (
  token: string | null,
  bookingId: string
) => {
  if (!token) throw new Error('No auth token');
  if (!bookingId)
    throw new Error('Missing booking ID');

  await api.delete(
    `/holidaze/bookings/${bookingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return true;
};
