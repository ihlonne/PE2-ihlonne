// pages/venues/EditVenue.tsx
import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import {
  getVenue,
  editVenue,
} from '../../features/venues/api';
import VenueForm, {
  type VenueFormValues,
} from '../../features/venues/VenueForm';
import type { TVenue } from '../../types/venue';
import { toaster } from '../../components/ui/toaster';

const toForm = (v: TVenue): VenueFormValues => ({
  name: v.name,
  description: v.description ?? '',
  price: v.price,
  maxGuests: v.maxGuests,
  meta: v.meta,
  location: {
    address: v.location?.address ?? '',
    city: v.location?.city ?? '',
    zip: v.location?.zip ?? '',
    country: v.location?.country ?? '',
  },
  media: v.media ?? [],
});

const EditVenue = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [initial, setInitial] =
    useState<VenueFormValues | null>(null);

  useEffect(() => {
    (async () => {
      const v = await getVenue(id!);
      setInitial(toForm(v));
    })();
  }, [id]);

  if (!initial) return null;

  return (
    <Box
      maxW='900px'
      w={{ base: '90%', lg: 'full' }}
      mx='auto'
      py={8}
    >
      <Heading as='h1' fontSize='3xl' mb={6}>
        Edit Venue
      </Heading>

      <VenueForm
        key={id}
        initialValues={initial}
        submitLabel='Save changes'
        onSubmit={async (values) => {
          try {
            const updated = await editVenue(
              id!,
              values,
              token!
            );
            toaster.create({
              title: 'Changes saved',
              type: 'success',
              duration: 4000,
            });
            navigate(
              `/venues/venue/${updated.id}`
            );
          } catch (err) {
            toaster.create({
              title: 'Could not save changes',
              type: 'error',
              duration: 6000,
            });
          }
        }}
      />
    </Box>
  );
};

export default EditVenue;
