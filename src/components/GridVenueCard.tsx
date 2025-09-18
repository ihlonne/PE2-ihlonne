import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Span,
  Text,
} from '@chakra-ui/react';

import { FaStar } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';
import type { TVenue } from '../types/venue';
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
    >
      <Image
        src={
          venue.media?.[0]?.url ??
          'https://images.pexels.com/photos/28216688/pexels-photo-28216688.jpeg'
        }
        alt={
          venue.media?.[0]?.alt ??
          'Default venue image'
        }
        h='245px'
        rounded='md'
      />
      <Flex
        direction='column'
        justifyContent='space-between'
        w='full'
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
              {venue.location?.address}
            </Text>
          </Box>
          <HStack mt='2'>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </HStack>
        </Flex>
        <Text fontSize='s' my='4'>
          {venue.description}
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
