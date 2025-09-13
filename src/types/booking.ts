export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export type BookingLike = {
  dateFrom: string;
  dateTo: string;
};
