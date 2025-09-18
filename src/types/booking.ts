import type { TVenue } from './venue';

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: TVenue;
};

export type BookingLike = {
  dateFrom: string;
  dateTo: string;
};
