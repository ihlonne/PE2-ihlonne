import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import type { TVenue } from '../types/venue';
import { useNavigate } from 'react-router';
import { IoLocationSharp } from 'react-icons/io5';

interface SmallVenueCardProps {
  venue: TVenue;
}

const SmallVenueCard = ({
  venue,
}: SmallVenueCardProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      direction='column'
      gap='1rem'
      onClick={() =>
        navigate(`/venues/venue/${venue.id}`)
      }
      cursor='pointer'
    >
      <Flex
        position='relative'
        w='full'
        overflow='hidden'
      >
        <Box
          w='full'
          aspectRatio='16/9'
          maxH='205px'
        >
          <Image
            src={
              venue.media?.[0]?.url ??
              'https://images.pexels.com/photos/28216688/pexels-photo-28216688.png'
            }
            alt={
              venue.media?.[0]?.alt ??
              'Default venue image'
            }
            w='full'
            h='full'
            objectFit='cover'
            display='block'
            rounded='xl'
          />
        </Box>

        {(venue.rating ?? 0) >= 4.5 && (
          <Text
            position='absolute'
            top='10px'
            left='10px'
            bg='white'
            color='brand800'
            rounded='full'
            px='2'
            py='1'
            fontSize='xs'
            fontWeight='semibold'
            zIndex='5'
          >
            🤩 Guest Favourite
          </Text>
        )}
      </Flex>
      <Flex
        direction='column'
        justifyContent='space-between'
        gap='5'
      >
        <Flex direction='column'>
          <Heading
            as='h3'
            fontFamily='body'
            fontSize='lg'
          >
            {venue.name.length >= 30
              ? venue.name.slice(0, 30) + '...'
              : venue.name}
          </Heading>
          <Flex alignItems='center' gap='2'>
            <IoLocationSharp />
            <Text>
              {venue.location?.city},{' '}
              {venue.location?.country}
            </Text>
          </Flex>
        </Flex>
        <Flex direction='column'>
          <Flex justifyContent='space-between'>
            <Text>{venue.price} NOK / night</Text>
            <Text>{venue.maxGuests} guests</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SmallVenueCard;
