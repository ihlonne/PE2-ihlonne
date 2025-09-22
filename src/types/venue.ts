import type { Bookings } from './booking';
import type { Image } from './common';

export type TVenue = {
  id: string;
  name: string;
  description?: string;
  media?: Image[];
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated: string;
  meta: Meta;
  location?: Location;
  owner?: ProfileSummary;
  bookings?: Bookings[];
  _count?: {
    bookings: number;
  };
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

export type ProfileSummary = {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
};

export type CreateVenuePayload = {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
  };
  media?: { url: string; alt?: string }[];
};

export type VenueFormValues = CreateVenuePayload;
