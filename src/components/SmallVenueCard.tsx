import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import type { Venue } from '../types/venue';

interface SmallVenueCardProps {
  venue: Venue;
}

const SmallVenueCard = ({
  venue,
}: SmallVenueCardProps) => {
  console.log(venue);
  return (
    <Flex direction='column' gap='1rem'>
      <Box position='relative'>
        <Image
          src={
            venue.media?.[0]?.url ??
            'https://images.pexels.com/photos/28216688/pexels-photo-28216688.jpeg'
          }
          alt={
            venue.media?.[0]?.alt ??
            'Default venue image'
          }
          rounded='xl'
        />
        <Text
          position='absolute'
          bg='white'
          top='10px'
          left='10px'
          color='brand900'
          fontSize='xs'
          fontWeight='semibold'
          p='0.25rem 0.5rem'
          rounded='full'
          zIndex='5'
        >
          🤩 Guest Favourite
        </Text>
      </Box>
      <Flex direction='column' gap='5'>
        <Flex gap='2' alignItems='center'>
          <Box
            bg='brand700'
            p='0.25rem'
            rounded='sm'
            color='white'
          >
            <Text>{venue.rating}</Text>
          </Box>
          <Flex gap='2' alignItems='center'>
            <Text fontWeight='semibold'>
              Excellent
            </Text>
            <Text fontSize='xs'>(3 reviews)</Text>
          </Flex>
        </Flex>
        <Box>
          <Heading
            as='h3'
            fontFamily='body'
            fontSize='lg'
          >
            {venue.name}
          </Heading>
          <Text>{venue.location?.address}</Text>
        </Box>
        <Flex justifyContent='space-between'>
          <Text>{venue.price} NOK / night</Text>
          <Text>{venue.maxGuests} guests</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SmallVenueCard;
