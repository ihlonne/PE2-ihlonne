// pages/venues/Venue.tsx
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
import { useEffect, useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { isAxiosError } from 'axios';

import Calendar from '../../components/Calendar';
import { toaster } from '../../components/ui/toaster';
import { getVenue } from '../../lib/venue';
import { toUtcDate } from '../../lib/dates';
import { useAuth } from '../../hooks/useAuth';
import { createBooking } from '../../features/booking/api';
import type { TVenue } from '../../types/venue';

type AmenityKey = keyof TVenue['meta'];
const AMENITY_ORDER: AmenityKey[] = [
  'wifi',
  'parking',
  'breakfast',
  'pets',
];
const AMENITY_LABELS: Record<AmenityKey, string> =
  {
    wifi: 'Wi-Fi',
    parking: 'Parking',
    breakfast: 'Breakfast',
    pets: 'Pets allowed',
  };

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/28216688/pexels-photo-28216688.png';

const Venue = () => {
  const { user, token } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [venue, setVenue] =
    useState<TVenue | null>(null);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getVenue(id);
        setVenue(data);
      } catch (err) {
        console.error(err);
        toaster.create({
          title: 'Could not load venue',
          type: 'error',
        });
      }
    })();
  }, [id]);

  useEffect(() => {
    setHeroIdx(0);
  }, [venue?.id]);

  const handleRangeSelected = async ({
    from,
    to,
    nights,
    guests,
  }: {
    from: Date;
    to: Date;
    nights: number;
    guests: number;
  }) => {
    if (!user) return;

    const ok = window.confirm(
      `Confirm booking?\n\nCheck-in: ${from.toDateString()}\nCheck-out: ${to.toDateString()}\nNights: ${nights}\nGuests: ${guests}`
    );
    if (!ok || !venue) return;

    if (!token) {
      toaster.create({
        title: 'Please log in',
        description:
          'You must be logged in to book.',
        type: 'warning',
      });
      return;
    }

    try {
      await createBooking(token, {
        dateFrom: from.toISOString(),
        dateTo: to.toISOString(),
        guests,
        venueId: venue.id,
      });

      toaster.create({
        title: 'Booking confirmed',
        description: `${nights} night${
          nights === 1 ? '' : 's'
        } at ${venue.name}`,
        type: 'success',
      });
    } catch (err: unknown) {
      const message = isAxiosError(err)
        ? (
            err.response?.data as {
              errors?: { message?: string }[];
            }
          )?.errors?.[0]?.message ?? err.message
        : 'Please try again.';
      toaster.create({
        title: 'Booking failed',
        description: message,
        type: 'error',
      });
    }
  };

  // Wait for venue before rendering/deriving
  if (!venue) return null;

  const images = (venue.media ?? []).filter(
    (m) => m?.url
  );
  const hero = images[heroIdx] ?? {
    url: FALLBACK_IMAGE,
    alt: venue.name,
  };

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
      <Flex direction='column' gap='2'>
        <Box w='full'>
          <Image
            src={hero.url}
            alt={
              hero.alt || `${venue.name} photo`
            }
            maxW='1290px'
            w='100%'
            maxH='450px'
            objectFit='cover'
            rounded='sm'
          />
        </Box>

        {images.length > 1 && (
          <Wrap>
            <Flex
              direction={{
                base: 'column',
                lg: 'row',
              }}
              gap='2'
            >
              {images.map((m, i) =>
                i === heroIdx ? null : (
                  <WrapItem key={m.url || i}>
                    <Box
                      position='relative'
                      h='120px'
                      maxW='210px'
                      w='100%'
                      onClick={() =>
                        setHeroIdx(i)
                      }
                      cursor='pointer'
                      role='button'
                      aria-label={`Show image ${
                        i + 1
                      }`}
                    >
                      <Image
                        src={m.url}
                        alt={m.alt || ''}
                        h='full'
                        w='full'
                        objectFit='cover'
                        rounded='md'
                      />
                    </Box>
                  </WrapItem>
                )
              )}
            </Flex>
          </Wrap>
        )}
      </Flex>

      <Heading
        as='h1'
        fontSize='3xl'
        fontFamily='body'
        my='6'
      >
        {venue.name}
      </Heading>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap='4rem'
        mt='2rem'
      >
        {/* Owner */}
        <Flex
          alignItems='flex-start'
          gap='2'
          w={{ base: '100%', md: '30%' }}
        >
          <AvatarGroup>
            <Avatar.Root size='2xl'>
              <Avatar.Fallback />
              <Avatar.Image
                src={venue.owner?.avatar?.url}
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
            <Text>{venue.owner?.name}</Text>
          </Flex>
        </Flex>

        {/* Details */}
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
            <Text>{venue.location?.address}</Text>
          </Flex>

          <Text>{venue.description}</Text>

          <Text
            my='4'
            fontSize='xl'
            fontWeight='600'
          >
            {venue.price} NOK / night
          </Text>

          <Wrap mt='4' gap='2'>
            {AMENITY_ORDER.filter(
              (k) => venue.meta?.[k]
            ).map((k) => (
              <WrapItem key={k}>
                <Tag.Root
                  size='lg'
                  variant='subtle'
                >
                  <Tag.Label>
                    {AMENITY_LABELS[k]}
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
              canBook={!!user}
              onSelectRange={handleRangeSelected}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Venue;
