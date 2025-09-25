import {
  Box,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { Bookings } from '../../types/booking';
import { formatDate } from '../../utils/dates';

interface BookingsProps {
  bookings: Bookings[];
}

const ViewBookingsOnVenue = ({
  bookings,
}: BookingsProps) => {
  if (!bookings?.length)
    return <Text>No bookings yet</Text>;

  return (
    <Stack gap='3'>
      {bookings.map((b) => (
        <Box
          bg='brand200'
          key={b.id}
          p='3'
          rounded='md'
        >
          <Text>
            <Span fontWeight='semibold'>
              Customer:
            </Span>{' '}
            {b.customer?.name}
          </Text>
          <Text>
            <Span fontWeight='semibold'>
              Guests:
            </Span>{' '}
            {b.guests}
          </Text>
          <Text>
            <Span fontWeight='semibold'>
              Check-in:
            </Span>{' '}
            {formatDate(b.dateFrom)}
          </Text>
          <Text>
            <Span fontWeight='semibold'>
              Check-in:
            </Span>{' '}
            {formatDate(b.dateTo)}
          </Text>
        </Box>
      ))}
    </Stack>
  );
};

export default ViewBookingsOnVenue;
