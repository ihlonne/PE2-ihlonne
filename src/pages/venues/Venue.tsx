import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { getVenue } from '../../lib/venue';
import { useEffect, useState } from 'react';
import type { TVenue } from '../../types/venue';
import { IoLocationSharp } from 'react-icons/io5';
import Calendar from '../../components/Calendar';
import { toaster } from '../../components/ui/toaster';
import { toUtcDate } from '../../lib/dates';

const Venue = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [venue, setVenue] =
    useState<TVenue | null>(null);
  console.log(venue);

  type AmenityKey = keyof TVenue['meta'];
  const ORDER: AmenityKey[] = [
    'wifi',
    'parking',
    'breakfast',
    'pets',
  ];
  const LABELS: Record<AmenityKey, string> = {
    wifi: 'Wi-Fi',
    parking: 'Parking',
    breakfast: 'Breakfast',
    pets: 'Pets allowed',
  };

  const handleRangeSelected = ({
    nights,
  }: {
    from: Date;
    to: Date;
    nights: number;
  }) => {
    toaster.create({
      title: 'Dates selected',
      description: `${nights} night${
        nights === 1 ? '' : 's'
      } chosen`,
      type: 'info',
    });
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getVenue(id);
        console.log(data);
        setVenue(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!venue) return null;

  return (
    <Flex
      direction='column'
      minH='100dvh'
      maxW='1290px'
      w='100%'
      mx='auto'
      mb='4rem'
      px={{ base: '4', xl: 0 }}
    >
      <Box>
        <Box w='full'>
          <Image
            src={
              venue?.media?.[0]?.url ||
              'https://images.pexels.com/photos/28216688/pexels-photo-28216688.jpeg'
            }
            alt={
              venue?.media?.[0]?.alt ||
              venue?.name
            }
            maxW='1290px'
            w='100%'
            maxH='400px'
            objectFit='cover'
            rounded='sm'
          />
        </Box>
        <Heading
          as='h1'
          fontSize='3xl'
          fontFamily='body'
          my='6'
        >
          {venue?.name}
        </Heading>
      </Box>
      <Flex
        direction={{
          base: 'column',
          md: 'row',
        }}
        gap='4rem'
        mt='2rem'
      >
        <Flex
          alignItems='flex-start'
          gap='2'
          w={{ base: '100%', md: '30%' }}
        >
          <AvatarGroup>
            <Avatar.Root size='2xl'>
              <Avatar.Fallback />
              <Avatar.Image
                src={venue?.owner?.avatar?.url}
              />
            </Avatar.Root>
          </AvatarGroup>

          <Flex direction='column'>
            <Text
              as='h2'
              fontSize='md'
              fontFamily='body'
              fontWeight='bold'
            >
              Venue Manager
            </Text>
            <Text>{venue?.owner?.name}</Text>
          </Flex>
        </Flex>
        <Flex
          direction='column'
          gap='2'
          w={{ base: '100%', md: '70%' }}
        >
          <Heading
            as='h2'
            fontSize='md'
            fontFamily='body'
            fontWeight='bold'
          >
            Description
          </Heading>
          <Flex alignItems='center' gap='2'>
            <IoLocationSharp />
            <Text>
              {venue?.location?.address}
            </Text>
          </Flex>
          <Text>{venue?.description}</Text>

          <Text
            my='4'
            fontSize='xl'
            fontWeight='600'
          >
            {venue?.price} NOK / night
          </Text>

          {venue && (
            <Wrap mt='4' gap='2'>
              {ORDER.filter(
                (k) => venue?.meta?.[k]
              ).map((k) => (
                <WrapItem key={k}>
                  <Tag.Root
                    size='lg'
                    variant='subtle'
                  >
                    <Tag.Label>
                      {LABELS[k]}
                    </Tag.Label>
                  </Tag.Root>
                </WrapItem>
              ))}
              {typeof venue.maxGuests ===
                'number' &&
                venue.maxGuests > 0 && (
                  <WrapItem>
                    <Tag.Root
                      size='lg'
                      variant='subtle'
                    >
                      <Tag.Label>
                        Max: {venue.maxGuests}{' '}
                        guests
                      </Tag.Label>
                    </Tag.Root>
                  </WrapItem>
                )}
            </Wrap>
          )}
          <Flex
            direction='column'
            mt='4rem'
            w='full'
          >
            <Text
              as='h2'
              fontSize='md'
              fontFamily='body'
              fontWeight='bold'
            >
              Choose a date
            </Text>

            <Calendar
              bookings={venue.bookings ?? []}
              minNights={1}
              maxNights={30}
              maxGuests={venue.maxGuests}
              defaultMonth={
                venue.bookings?.[0]
                  ? toUtcDate(
                      venue.bookings[0].dateFrom
                    )
                  : new Date()
              }
              onSelectRange={handleRangeSelected}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Venue;
