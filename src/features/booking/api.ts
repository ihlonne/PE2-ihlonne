import { api } from '../../lib';
import { type Booking } from '../../types/booking';

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

type ApiListResponse<T> = {
  data: T[];
  meta: unknown;
};

export const getBookings = async (
  token: string | null,
  profileName: string,
  opts?: {
    activeOnly?: boolean;
    includeVenue?: boolean;
    limit?: number;
  }
): Promise<Booking[]> => {
  if (!token) throw new Error('No auth token');
  if (!profileName)
    throw new Error('Missing profile name');

  const qs: string[] = [];
  if (opts?.includeVenue) qs.push('_venue=true');
  if (opts?.activeOnly) qs.push('_active=true');
  if (opts?.limit)
    qs.push(`_limit=${opts.limit}`);

  const url =
    `/holidaze/profiles/${encodeURIComponent(
      profileName
    )}/bookings` +
    (qs.length ? `?${qs.join('&')}` : '');

  const { data } = await api.get<
    ApiListResponse<Booking>
  >(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
};

export const deleteBooking = async (
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
