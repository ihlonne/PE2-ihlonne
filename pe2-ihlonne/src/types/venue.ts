import type { Image } from './common';

export type Venue = {
  id: string;
  name: string;
  description?: string;
  media?: Image[] | string[];
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated: string;
  meta: Meta;
  location?: Location;
};

export type Meta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type Location = {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};
