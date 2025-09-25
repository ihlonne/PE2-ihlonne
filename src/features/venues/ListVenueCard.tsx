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
import { useNavigate } from 'react-router';
import type { TVenue } from '../../types/venue';

type ListVenueCardProps = { venue: TVenue };

const ListVenueCard = ({
  venue,
}: ListVenueCardProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      gap='4'
      direction={{ base: 'column', md: 'row' }}
      onClick={() =>
        navigate(`/venues/venue/${venue.id}`)
      }
      cursor='pointer'
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
        maxW='300px'
        w='full'
        h='245px'
        rounded='md'
      />
      <Flex
        direction='column'
        justifyContent='space-between'
        w='full'
      >
        <Flex justifyContent='space-between'>
          <Box>
            <Heading as='h2' fontFamily='body'>
              {venue.name}
            </Heading>
            <Text fontSize='xs'>
              {venue.location?.address}
            </Text>
          </Box>
        </Flex>
        <Text
          fontSize='s'
          lineClamp={2}
          minH='3.2em'
        >
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

export default ListVenueCard;
