import { api } from '../../lib';

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
