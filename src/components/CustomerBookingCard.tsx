import {
  Box,
  Button,
  Flex,
  Heading,
  Span,
  Text,
} from '@chakra-ui/react';
import { IoLocationSharp } from 'react-icons/io5';
import type { Booking } from '../types/booking';
import { useNavigate } from 'react-router';

interface CustomerBookingCardProps {
  booking: Booking;
  onCancel: () => void;
}

const CustomerBookingCard = ({
  booking,
  onCancel,
}: CustomerBookingCardProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      direction='column'
      gap='2rem'
      bg='brand200'
      p='1.5rem'
      rounded='lg'
      w='100%'
    >
      <Box>
        <Heading as='h2' fontSize='md'>
          {booking.venue!.name}
        </Heading>
        <Flex alignItems='center' gap='2'>
          <IoLocationSharp />
          <Text fontSize='xs'>
            {booking.venue?.location?.address}
          </Text>
        </Flex>
      </Box>

      <Flex direction='column'>
        <Text>
          <Span fontWeight='semibold'>
            Guests:
          </Span>{' '}
          {booking.guests}
        </Text>
        <Text>
          <Span fontWeight='semibold'>From:</Span>{' '}
          {booking.dateFrom}
        </Text>
        <Text>
          <Span fontWeight='semibold'>To:</Span>{' '}
          {booking.dateTo}
        </Text>
      </Flex>

      <Text>
        <Span fontWeight='semibold'>
          Booking reference:
        </Span>{' '}
        {booking.id.slice(0, 6)}
      </Text>

      <Flex w='full' gap='2'>
        <Button
          bg='brand700'
          color='white'
          fontWeight='semibold'
          onClick={() =>
            navigate(
              `/venues/venue/${booking.venue?.id}`
            )
          }
        >
          View Venue
        </Button>
        <Button bg='brand300' onClick={onCancel}>
          Cancel Booking
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomerBookingCard;
