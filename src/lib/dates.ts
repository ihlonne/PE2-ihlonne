import { addDays } from 'date-fns';
import type { Booking } from '../types/booking';

export const toUtcDate = (iso: string): Date =>
  new Date(`${iso}T00:00:00Z`);

export const bookingsToDisable = (
  bookings: Booking[]
): { from: Date; to: Date }[] =>
  bookings.map((b) => ({
    from: toUtcDate(b.dateFrom),
    to: addDays(toUtcDate(b.dateTo), -1),
  }));
