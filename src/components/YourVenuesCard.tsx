import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';
import type { TVenue } from '../types/venue';
import { useNavigate } from 'react-router';
import CustomModal from './CustomModal';
import ViewBookingsOnVenue from '../features/profile/ViewBookingsOnVenue';
import { useState } from 'react';

interface YourVenuesCardsProp {
  venue: TVenue;
  onCancel: () => void;
}

const YourVenuesCard = ({
  venue,
  onCancel,
}: YourVenuesCardsProp) => {
  const navigate = useNavigate();

  const [
    venuesBookingsOpen,
    setVenuesBookingsOpen,
  ] = useState(false);
  console.log(venue);
  return (
    <Flex
      direction='column'
      gap='2rem'
      bg='brand200'
      p='1.5rem'
      rounded='lg'
      w='100%'
    >
      <Box w='100%' h='150px'>
        <Image
          src={
            venue.media?.[0]?.url ??
            'https://images.pexels.com/photos/28216688/pexels-photo-28216688.jpeg'
          }
          alt={
            venue.media?.[0]?.alt ??
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
        gap='1rem'
      >
        <Box>
          <Heading
            as='h2'
            fontSize='lg'
            fontFamily='body'
          >
            {venue.name}
          </Heading>
        </Box>

        <Flex direction='column' w='full' gap='2'>
          <Flex gap='2' w='100%'>
            <Button
              flex={1}
              w='full'
              bg='brand700'
              color='white'
              fontWeight='semibold'
              onClick={() =>
                navigate(
                  `/venues/venue/${venue.id}`
                )
              }
            >
              View Venue
            </Button>

            <Button
              flex={1}
              w='full'
              bg='brand800'
              color='white'
              fontWeight='semibold'
              onClick={() =>
                navigate(`/venues/edit`)
              }
            >
              Edit Venue
            </Button>
          </Flex>
          <Button
            bg='brand300'
            onClick={() =>
              setVenuesBookingsOpen(true)
            }
          >
            View Bookings (
            {venue._count?.bookings})
          </Button>
          <Button
            bg='brand300'
            onClick={onCancel}
          >
            Delete Venue
          </Button>
        </Flex>
        <CustomModal
          open={venuesBookingsOpen}
          onClose={() =>
            setVenuesBookingsOpen(false)
          }
          title={venue.name}
        >
          <ViewBookingsOnVenue
            bookings={venue.bookings ?? []}
          />
        </CustomModal>
      </Flex>
    </Flex>
  );
};

export default YourVenuesCard;
