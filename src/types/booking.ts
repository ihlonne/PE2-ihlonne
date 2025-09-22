import type { Image } from './common';
import type { TVenue } from './venue';

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: TVenue;
  name?: string;
};

export type BookingLike = {
  dateFrom: string;
  dateTo: string;
};

export type Bookings = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer?: Customer;
};

export type Customer = {
  name: string;
  email: string;
  bio?: string;
  avatar: Image;
  banner: Image;
};
