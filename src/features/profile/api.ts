import { api } from '../../lib';
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

export const updateVenueManager = async (
  name: string,
  venueManager: boolean,
  token: string | null
) => {
  return api.put(
    `/holidaze/profiles/${encodeURIComponent(
      name
    )}`,
    { venueManager },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
