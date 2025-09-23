import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createVenue } from '../../features/venues/api';
import { toaster } from '../../components/ui/toaster';
import VenueForm from '../../features/venues/VenueForm';
import type { CreateVenuePayload } from '../../types/venue';
import { isAxiosError } from 'axios';

const blank: CreateVenuePayload = {
  name: '',
  description: '',
  price: 0,
  maxGuests: 1,
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  location: {
    address: '',
    city: '',
    zip: '',
    country: '',
  },
  media: [],
};

const CreateVenue = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      maxW='900px'
      w={{ base: '90%', lg: 'full' }}
      minH='100dvh'
      mx='auto'
      py={8}
    >
      <Heading as='h1' fontSize='3xl' mb={6}>
        Create Venue
      </Heading>

      <VenueForm
        initialValues={blank}
        submitLabel='Create venue'
        onSubmit={async (values) => {
          try {
            const created = await createVenue(
              values,
              token!
            );
            toaster.create({
              title: 'Venue created',
              description:
                'Your venue is now live.',
              type: 'success',
              duration: 5000,
            });
            navigate(
              `/venues/venue/${created.id}`
            );
          } catch (err: unknown) {
            const msg = isAxiosError(err)
              ? err.response?.data?.errors?.[0]
                  ?.message ?? err.message
              : err instanceof Error
              ? err.message
              : 'Could not create venue';

            toaster.create({
              title: 'Something went wrong',
              description:
                msg ?? 'Could not create venue',
              type: 'error',
              duration: 6000,
            });
          }
        }}
      />
    </Box>
  );
};
export default CreateVenue;
