import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Span,
  Text,
} from '@chakra-ui/react';

import { FaAngleRight } from 'react-icons/fa6';
import type { TVenue } from '../../types/venue';
import { useNavigate } from 'react-router';

type VenueProps = {
  venue: TVenue;
};

const GridVenueCard = ({ venue }: VenueProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      gap='4'
      direction='column'
      maxW='310px'
      w='full'
      onClick={() =>
        navigate(`/venues/venue/${venue.id}`)
      }
      cursor='pointer'
    >
      <Box
        w='full'
        aspectRatio='16/9'
        overflow='hidden'
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
          loading='lazy'
          decoding='async'
          rounded='md'
        />
      </Box>
      <Flex
        direction='column'
        justifyContent='space-between'
        w='full'
        h='200px'
      >
        <Flex
          direction='column'
          justifyContent='space-between'
        >
          <Box>
            <Heading as='h2' fontFamily='body'>
              {venue.name}
            </Heading>
            <Text fontSize='xs'>
              {venue.location?.city},{' '}
              {venue.location?.country}
            </Text>
          </Box>
        </Flex>
        <Text fontSize='s' my='4'>
          {venue.description &&
          venue.description.length > 80
            ? venue.description?.slice(0, 80) +
              '...'
            : venue.description}
        </Text>
        <Flex direction='column'>
          <Text>{venue.maxGuests} guests</Text>
          <Text fontSize='lg'>
            <Span fontWeight='bold'>
              {' '}
              {venue.price} NOK
            </Span>{' '}
            / night
          </Text>
          <Button
            bg='brand700'
            color='white'
            mt='2'
          >
            See Availability <FaAngleRight />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GridVenueCard;
