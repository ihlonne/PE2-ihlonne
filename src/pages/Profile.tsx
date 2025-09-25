import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Image,
} from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import CustomerBookingCard from '../features/profile/CustomerBookingCard';
import { useEffect, useState } from 'react';
import type { Booking } from '../types/booking';
import { toaster } from '../components/ui/toaster';
import { type TVenue } from '../types/venue';
import YourVenuesCard from '../features/profile/YourVenuesCard';
import { deleteVenue } from '../features/venues/api';
import {
  getVenuesForProfile,
  getBookingsForProfile,
  deleteBookingForProfile,
  updateProfileMedia,
} from '../features/profile/api';
import { FaCamera } from 'react-icons/fa';
import CustomModal from '../components/CustomModal';
import ProfileMediaModal from '../features/profile/ProfileMediaModal';

const Profile = () => {
  const { user, token, refreshUser } = useAuth();

  const [bookings, setBookings] = useState<
    Booking[]
  >([]);
  const [venues, setVenues] = useState<TVenue[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const toast = toaster;

  const [avatarModalOpen, setAvatarModalOpen] =
    useState(false);
  const [bannerModalOpen, setBannerModalOpen] =
    useState(false);

  const handleChangeAvatar = async (
    url: string
  ) => {
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

  const handleChangeBanner = async (
    url: string
  ) => {
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
        const data = await getBookingsForProfile(
          user.name
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
  }, [user?.name]);

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
  }, [user]);

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

  const handleCancelBooking = async (
    id: string
  ) => {
    const previous = bookings;
    setBookings((prev) =>
      prev.filter((b) => b.id !== id)
    );

    try {
      await deleteBookingForProfile(token, id);
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

  if (!user || !user.name) {
    return <Text>Loading profile…</Text>;
  }

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
      {/* Banner + Avatar */}
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
          {/* Hover overlay */}
          <Box
            pos='absolute'
            inset='0'
            display='flex'
            alignItems='center'
            justifyContent='center'
            rounded='lg'
            bg='blackAlpha.600'
            color='white'
            fontSize='xs'
            opacity={0}
            transition='opacity 0.2s'
            _hover={{ opacity: 1 }}
            cursor='pointer'
            onClick={() =>
              setBannerModalOpen(true)
            }
            tabIndex={0}
          >
            <FaCamera />
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
            w='120px'
            h='120px'
            rounded='full'
            bg='white'
            p='3'
            mt='-3.5rem'
            border='1px solid white'
          >
            {/* Avatar container */}
            <Box
              pos='relative'
              w='full'
              h='full'
              rounded='full'
              overflow='hidden'
            >
              <Image
                src={user?.avatar?.url}
                alt={user?.avatar?.alt}
                w='full'
                h='full'
                objectFit='cover'
              />

              {/* Overlay */}
              <Box
                pos='absolute'
                inset='0'
                rounded='full'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bg='blackAlpha.600'
                color='white'
                fontSize='sm'
                opacity={0}
                transition='opacity 0.2s'
                _hover={{ opacity: 1 }}
                cursor='pointer'
                onClick={() =>
                  setAvatarModalOpen(true)
                }
                tabIndex={0}
              >
                <FaCamera />
              </Box>
            </Box>
          </Box>

          {/* Banner modal */}
          <CustomModal
            open={bannerModalOpen}
            onClose={() =>
              setBannerModalOpen(false)
            }
            title='Paste new banner URL'
          >
            <ProfileMediaModal
              onCancel={() =>
                setBannerModalOpen(false)
              }
              onConfirm={(url) => {
                handleChangeBanner(url);
                setBannerModalOpen(false);
              }}
            />
          </CustomModal>

          {/* Avatar modal */}
          <CustomModal
            open={avatarModalOpen}
            onClose={() =>
              setAvatarModalOpen(false)
            }
            title='Paste new avatar URL'
          >
            <ProfileMediaModal
              onCancel={() =>
                setAvatarModalOpen(false)
              }
              onConfirm={(url) => {
                handleChangeAvatar(url);
                setAvatarModalOpen(false);
              }}
            />
          </CustomModal>

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

            {/* Venue Manager Badge */}
            {user?.venueManager && (
              <Badge
                colorScheme='cyan'
                fontSize='sm'
              >
                Venue Manager
              </Badge>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Bookings */}
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

      {/* Venues */}
      {user?.venueManager && (
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
              <Text>No venues found.</Text>
            )}
            {venues.length > 0 &&
              venues.map((venue) => (
                <GridItem key={venue.id}>
                  <YourVenuesCard
                    venue={venue}
                    onCancel={() =>
                      handleDeleteVenue(venue.id)
                    }
                  />
                </GridItem>
              ))}
          </SimpleGrid>
        </Flex>
      )}
    </Flex>
  );
};

export default Profile;
