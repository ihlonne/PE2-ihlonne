import type { ApiListResponse } from '../types/api';
import type { Venue } from '../types/venue';
import { get } from './helpers';

export const getVenues = async (): Promise<
  ApiListResponse<Venue>
> => {
  return get<ApiListResponse<Venue>>('/venues');
};
