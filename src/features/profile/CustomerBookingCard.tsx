import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Span,
  Text,
} from '@chakra-ui/react';
import { IoLocationSharp } from 'react-icons/io5';
import type { Booking } from '../../types/booking';
import { useNavigate } from 'react-router';
import { formatDate } from '../../utils/dates';
import CustomModal from '../../components/CustomModal';
import ConfirmCancelBooking from './ConfirmCancelBooking';
import { useState } from 'react';

interface CustomerBookingCardProps {
  booking: Booking;
  onCancel: () => void;
}

const CustomerBookingCard = ({
  booking,
  onCancel,
}: CustomerBookingCardProps) => {
  const navigate = useNavigate();

  const [
    confirmCancelOpen,
    setConfirmCancelOpen,
  ] = useState(false);

  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      gap='2rem'
      bg='brand200'
      p='1.5rem'
      rounded='lg'
      w='100%'
    >
      <Box
        w={{ base: '100%', md: '150px' }}
        h='150px'
      >
        <Image
          src={
            booking.venue?.media?.[0]?.url ??
            'https://images.pexels.com/photos/28216688/pexels-photo-28216688.png'
          }
          alt={
            booking.venue?.media?.[0]?.alt ??
            'Default venue image'
          }
          w='100%'
          h='100%'
        />
      </Box>
      <Flex
        direction='column'
        justifyContent='space-between'
        w='full'
        gap={{ base: '1rem', lg: 0 }}
      >
        <Box>
          <Heading as='h2' fontSize='md'>
            {booking.venue?.name}
          </Heading>
          <Flex alignItems='center' gap='2'>
            <IoLocationSharp />
            <Text fontSize='xs'>
              {booking.venue?.location?.address}
            </Text>
          </Flex>
        </Box>

        <Flex
          direction={{
            base: 'column',
            lg: 'row',
          }}
          gap={{ base: 0, md: '2rem' }}
          w='full'
        >
          <Text>
            <Span fontWeight='semibold'>
              Guests:
            </Span>{' '}
            {booking.guests}
          </Text>
          <Text>
            <Span fontWeight='semibold'>
              From:
            </Span>{' '}
            {formatDate(booking.dateFrom)}
          </Text>
          <Text>
            <Span fontWeight='semibold'>To:</Span>{' '}
            {formatDate(booking.dateTo)}
          </Text>
          <Text>
            <Span fontWeight='semibold'>
              Booking reference:
            </Span>{' '}
            {booking.id.slice(0, 6)}
          </Text>
        </Flex>

        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
          w='full'
          gap='2'
        >
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
          <Button
            bg='brand300'
            onClick={() =>
              setConfirmCancelOpen(true)
            }
          >
            Cancel Booking
          </Button>
        </Flex>
        <CustomModal
          open={confirmCancelOpen}
          onClose={() =>
            setConfirmCancelOpen(false)
          }
          title='Are you sure you want to cancel this venue?'
        >
          <ConfirmCancelBooking
            onCancel={() =>
              setConfirmCancelOpen(false)
            }
            onConfirm={() => {
              onCancel();
              setConfirmCancelOpen(false);
            }}
          />
        </CustomModal>
      </Flex>
    </Flex>
  );
};

export default CustomerBookingCard;
