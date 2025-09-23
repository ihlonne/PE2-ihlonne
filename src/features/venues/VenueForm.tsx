import {
  Box,
  Button,
  Checkbox,
  Field,
  Heading,
  HStack,
  Image,
  Input,
  NumberInput,
  Stack,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import type { CreateVenuePayload } from '../../types/venue';
import { PiBowlFood } from 'react-icons/pi';
import { FaCarSide } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { IoIosWifi } from 'react-icons/io';
import { Link } from 'react-router-dom';

export type VenueFormValues = CreateVenuePayload;

type Props = {
  initialValues: VenueFormValues;
  onSubmit: (
    values: VenueFormValues
  ) => Promise<void> | void;
  submitLabel?: string;
  loading?: boolean;
};

export default function VenueForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save',
  loading,
}: Props) {
  const form = useForm<VenueFormValues>({
    defaultValues: initialValues,
    mode: 'onBlur',
    shouldUnregister: false,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;
  const {
    fields: mediaFields,
    append,
    remove,
  } = useFieldArray({ control, name: 'media' });

  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const addMedia = () => {
    if (!newUrl.trim() || mediaFields.length >= 6)
      return;
    try {
      const u = new URL(newUrl);
      if (u.protocol !== 'https:') return;
      append({
        url: newUrl.trim(),
        alt: newAlt.trim(),
      });
      setNewUrl('');
      setNewAlt('');
    } catch {
      /* ignore invalid */
    }
  };

  const submit = handleSubmit((v) =>
    onSubmit({
      ...v,
      meta: {
        wifi: !!v.meta?.wifi,
        parking: !!v.meta?.parking,
        breakfast: !!v.meta?.breakfast,
        pets: !!v.meta?.pets,
      },
      media: (v.media ?? [])
        .filter((m) => m.url?.trim())
        .slice(0, 6)
        .map((m, i) => ({
          url: m.url.trim(),
          alt:
            m.alt?.trim() ||
            `${v.name || 'Venue'} photo #${
              i + 1
            }`,
        })),
    })
  );

  return (
    <FormProvider {...form}>
      <Box as='form' onSubmit={submit}>
        {/* Basic */}
        <Stack gap='4'>
          <Heading
            as='h2'
            fontSize='md'
            fontWeight='semibold'
            fontFamily='body'
          >
            Basic Information
          </Heading>

          <Field.Root required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder='Cozy Cabin in Voss'
              {...register('name', {
                required: 'Name is required',
              })}
            />
          </Field.Root>

          <HStack>
            <Field.Root required>
              <Field.Label>
                Price <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root min={0} w='full'>
                <NumberInput.Control />
                <NumberInput.Input
                  {...register('price', {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: '≥ 0',
                    },
                  })}
                />
              </NumberInput.Root>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                Guests <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root min={1} w='full'>
                <NumberInput.Control />
                <NumberInput.Input
                  {...register('maxGuests', {
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: '≥ 1',
                    },
                  })}
                />
              </NumberInput.Root>
            </Field.Root>
          </HStack>

          <Field.Root required>
            <Field.Label>
              Description{' '}
              <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              placeholder='Describe your venue'
              {...register('description', {
                required: 'Required',
                minLength: {
                  value: 20,
                  message: 'Min 20 characters',
                },
              })}
            />
          </Field.Root>
        </Stack>

        {/* Facilities */}
        <Stack my='2rem'>
          <Heading
            as='h2'
            fontSize='md'
            fontWeight='semibold'
            fontFamily='body'
          >
            Facilities
          </Heading>
          <HStack>
            <Wrap>
              <WrapItem>
                <Checkbox.Root variant='solid'>
                  <Checkbox.HiddenInput
                    {...register(
                      'meta.breakfast',
                      { setValueAs: (v) => !!v }
                    )}
                  />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label
                    display='inline-flex'
                    alignItems='center'
                    gap='2'
                  >
                    <PiBowlFood /> Breakfast
                  </Checkbox.Label>
                </Checkbox.Root>
              </WrapItem>
              <WrapItem>
                <Checkbox.Root variant='solid'>
                  <Checkbox.HiddenInput
                    {...register('meta.parking', {
                      setValueAs: (v) => !!v,
                    })}
                  />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label
                    display='inline-flex'
                    alignItems='center'
                    gap='2'
                  >
                    <FaCarSide /> Parking
                  </Checkbox.Label>
                </Checkbox.Root>
              </WrapItem>
              <WrapItem>
                <Checkbox.Root variant='solid'>
                  <Checkbox.HiddenInput
                    {...register('meta.pets', {
                      setValueAs: (v) => !!v,
                    })}
                  />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label
                    display='inline-flex'
                    alignItems='center'
                    gap='2'
                  >
                    <MdPets /> Pet-Friendly
                  </Checkbox.Label>
                </Checkbox.Root>
              </WrapItem>
              <WrapItem>
                <Checkbox.Root variant='solid'>
                  <Checkbox.HiddenInput
                    {...register('meta.wifi', {
                      setValueAs: (v) => !!v,
                    })}
                  />
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Checkbox.Label
                    display='inline-flex'
                    alignItems='center'
                    gap='2'
                  >
                    <IoIosWifi /> Wi-Fi
                  </Checkbox.Label>
                </Checkbox.Root>
              </WrapItem>
            </Wrap>
          </HStack>
        </Stack>

        {/* Location */}
        <Stack>
          <Heading
            as='h2'
            fontSize='md'
            fontWeight='semibold'
            fontFamily='body'
          >
            Location
          </Heading>

          <Field.Root>
            <Field.Label>
              Address <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder='Vossevangen 21'
              {...register('location.address', {
                required: 'Required',
              })}
            />
          </Field.Root>

          <HStack gap='4'>
            <Field.Root>
              <Field.Label>
                Zip <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder='5399'
                {...register('location.zip', {
                  required: 'Required',
                })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                City <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder='Voss'
                {...register('location.city', {
                  required: 'Required',
                })}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Country{' '}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder='Norway'
                {...register('location.country', {
                  required: 'Required',
                })}
              />
            </Field.Root>
          </HStack>
        </Stack>

        {/* Media */}
        <Stack my='2rem'>
          <Heading
            as='h2'
            fontSize='md'
            fontWeight='semibold'
            fontFamily='body'
          >
            Media
          </Heading>

          <Stack>
            <HStack gap='4'>
              <Field.Root>
                <Field.Label>
                  Paste Image URL{' '}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  value={newUrl}
                  onChange={(e) =>
                    setNewUrl(e.target.value)
                  }
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>
                  Image description
                </Field.Label>
                <Input
                  value={newAlt}
                  onChange={(e) =>
                    setNewAlt(e.target.value)
                  }
                />
              </Field.Root>
            </HStack>

            <Button
              onClick={addMedia}
              bg='brand700'
              color='white'
              rounded='md'
              disabled={mediaFields.length >= 6}
            >
              Add Media
            </Button>

            <Wrap mt='2rem'>
              {mediaFields.map((m, i) => (
                <WrapItem key={m.id}>
                  <Box position='relative'>
                    <Image
                      src={m.url}
                      alt={m.alt || ''}
                      h='100px'
                      w='100px'
                      objectFit='cover'
                      rounded='md'
                    />
                    <Button
                      size='xs'
                      position='absolute'
                      top='1'
                      right='1'
                      onClick={() => remove(i)}
                    >
                      Remove
                    </Button>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </Stack>
        </Stack>

        <HStack my='4rem'>
          <Link to='/venues'>
            <Button rounded='md'>Cancel</Button>
          </Link>
          <Button
            type='submit'
            bg='brand700'
            color='white'
            rounded='md'
            loading={loading || isSubmitting}
          >
            {submitLabel}
          </Button>
        </HStack>
      </Box>
    </FormProvider>
  );
}
