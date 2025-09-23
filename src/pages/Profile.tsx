import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import CustomerBookingCard from '../features/profile/CustomerBookingCard';
import { useEffect, useState } from 'react';
import {
  deleteBooking,
  getBookings,
} from '../features/booking/api';
import type { Booking } from '../types/booking';
import { toaster } from '../components/ui/toaster';
import {
  getVenuesForProfile,
  updateProfileMedia,
  updateVenueManager,
} from '../features/profile/api';
import { type TVenue } from '../types/venue';
import YourVenuesCard from '../features/profile/YourVenuesCard';
import { deleteVenue } from '../features/venues/api';

const Profile = () => {
  const { user, token, refreshUser } = useAuth();
  const [vm, setVm] = useState<boolean>(
    !!user?.venueManager
  );
  const [vmSaving, setVmSaving] = useState(false);

  const [bookings, setBookings] = useState<
    Booking[]
  >([]);
  const [venues, setVenues] = useState<TVenue[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  const toast = toaster;

  useEffect(() => {
    setVm(!!user?.venueManager);
  }, [user?.venueManager]);

  const onToggleVenueManager = async (e: {
    checked: boolean;
  }) => {
    if (!user?.name) return;

    const next = e.checked;
    const action = next ? 'enable' : 'disable';

    const ok = confirm(
      `Are you sure you want to ${action} Venue Manager?`
    );
    if (!ok) return;

    const prev = vm;
    setVm(next);
    setVmSaving(true);

    try {
      await updateVenueManager(
        user.name,
        next,
        token
      );
      await refreshUser();
      toast.create({
        title: next
          ? 'You are now a venue manager'
          : 'Venue manager disabled',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      setVm(prev);
      toast.create({
        title: 'Could not update venue manager',
        type: 'error',
      });
    } finally {
      setVmSaving(false);
    }
  };

  const handleChangeAvatar = async () => {
    const url = prompt('Paste new avatar URL');
    if (!url || !user?.name) return;
    try {
      await updateProfileMedia(token, user.name, {
        avatar: {
          url,
          alt: `${user.name} avatar`,
        },
      });
      await refreshUser();
      toast.create({
        title: 'Avatar updated',
        type: 'success',
      });
    } catch (e) {
      console.error(e);
      toast.create({
        title: 'Failed to update avatar',
        type: 'error',
      });
    }
  };

  const handleChangeBanner = async () => {
    const url = prompt('Paste new banner URL');
    if (!url || !user?.name) return;
    try {
      await updateProfileMedia(token, user.name, {
        banner: {
          url,
          alt: `${user.name} banner`,
        },
      });
      await refreshUser();
      toast.create({
        title: 'Banner updated',
        type: 'success',
      });
    } catch (e) {
      console.error(e);
      toast.create({
        title: 'Failed to update banner',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (!user?.name) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getBookings(
          token,
          user.name,
          {
            activeOnly: true,
            includeVenue: true,
          }
        );
        if (!cancelled) setBookings(data ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, user?.name]);

  const loadMyVenues = async () => {
    if (!user?.name) return;
    setLoading(true);
    try {
      const data = await getVenuesForProfile(
        user.name
      );
      setVenues(data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.name) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getVenuesForProfile(
          user.name
        );
        if (!cancelled) setVenues(data ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.name]);

  const handleCancelBooking = async (
    id: string
  ) => {
    const previous = bookings;
    setBookings((prev) =>
      prev.filter((b) => b.id !== id)
    );

    try {
      await deleteBooking(token, id);
      toast.create({
        title: 'Booking cancelled',
        type: 'success',
      });
    } catch (e) {
      console.error(e);
      setBookings(previous);
      toast.create({
        title: 'Could not cancel booking',
        type: 'error',
      });
    }
  };

  const handleDeleteVenue = async (
    id: string
  ) => {
    const prev = venues;
    setVenues((vs) =>
      vs.filter((v) => v.id !== id)
    );

    try {
      await deleteVenue(id);
      await loadMyVenues();
      toaster.create({
        title: 'Venue deleted',
        type: 'success',
      });
    } catch (e) {
      console.error(e);
      setVenues(prev);
      toaster.create({
        title: 'Could not delete venue',
        type: 'error',
      });
    }
  };

  return (
    <Flex
      direction='column'
      justify='center'
      mb='8rem'
      maxW='1290px'
      w={{ base: '90%', xl: '100%' }}
      mx='auto'
      gap='4rem'
    >
      <Flex direction='column' w='full'>
        <Box pos='relative' role='group'>
          <Box
            bgImage={
              user?.banner?.url
                ? `url(${user.banner.url})`
                : undefined
            }
            bgRepeat='no-repeat'
            bgPos='center'
            bgSize='cover'
            w='100%'
            h='260px'
            rounded='lg'
          />
          <Box
            pos='absolute'
            inset='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            rounded='lg'
            bg='blackAlpha.500'
            color='white'
            fontWeight='semibold'
            opacity={0}
            transition='opacity 0.2s'
            _groupHover={{ opacity: 1 }}
            cursor='pointer'
            onClick={handleChangeBanner}
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              handleChangeBanner()
            }
          >
            Change banner
          </Box>
        </Box>
        <Flex
          direction='column'
          justify='center'
          align='center'
          w='100%'
        >
          <Box
            pos='relative'
            mt='-10'
            rounded='full'
            border='8px solid white'
            role='group'
            w='fit-content'
          >
            <AvatarGroup size='2xl'>
              <Avatar.Root>
                <Avatar.Fallback
                  name={user?.name}
                />
                <Avatar.Image
                  src={user?.avatar?.url}
                  alt={user?.avatar?.alt}
                />
              </Avatar.Root>
            </AvatarGroup>

            <Box
              pos='absolute'
              inset='0'
              rounded='full'
              display='flex'
              alignItems='center'
              justifyContent='center'
              bg='blackAlpha.600'
              color='white'
              fontSize='xs'
              fontWeight='semibold'
              opacity={0}
              transition='opacity 0.2s'
              _groupHover={{ opacity: 1 }}
              cursor='pointer'
              onClick={handleChangeAvatar}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                handleChangeAvatar()
              }
            >
              Change image
            </Box>
          </Box>

          <Flex
            direction='column'
            justifyContent='center'
            align='center'
            mt='8'
            gap='4'
            w='full'
          >
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
            >
              <Text
                fontSize='3xl'
                fontWeight='bold'
              >
                Hello, {user?.name || 'Unknown'}!
              </Text>
              <Text fontSize='xs'>
                {user?.email ||
                  'No bio available.'}
              </Text>
            </Flex>
            <Box>
              <Switch.Root
                colorPalette='cyan'
                checked={vm}
                onCheckedChange={(details) =>
                  onToggleVenueManager(details)
                }
                disabled={vmSaving}
              >
                <Switch.HiddenInput />
                <Switch.Label>
                  Venue manager
                </Switch.Label>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction='column' gap='2rem'>
        <Heading
          as='h1'
          fontSize='2xl'
          fontFamily='body'
        >
          Your upcoming bookings
        </Heading>
        <SimpleGrid columns={1} gap='2'>
          {loading && (
            <Text>Loading bookings…</Text>
          )}
          {!loading && bookings.length === 0 && (
            <Text>No upcoming bookings.</Text>
          )}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <GridItem key={booking.id}>
                <CustomerBookingCard
                  booking={booking}
                  onCancel={() =>
                    handleCancelBooking(
                      booking.id
                    )
                  }
                />
              </GridItem>
            ))
          ) : (
            <Text>No bookings</Text>
          )}
        </SimpleGrid>
      </Flex>

      {vm === true ? (
        <Flex direction='column' gap='2rem'>
          <Heading
            as='h1'
            fontSize='2xl'
            fontFamily='body'
          >
            Your venues
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap='2'
          >
            {loading && (
              <Text>Loading Venues…</Text>
            )}
            {!loading && venues.length === 0 && (
              <Text>No upcoming venues.</Text>
            )}
            {venues.length > 0 ? (
              venues.map((venue) => (
                <GridItem key={venue.id}>
                  <YourVenuesCard
                    venue={venue}
                    onCancel={() =>
                      handleDeleteVenue(venue.id)
                    }
                  />
                </GridItem>
              ))
            ) : (
              <Text>No Venues</Text>
            )}
          </SimpleGrid>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default Profile;
