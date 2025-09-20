import {
  Box,
  Button,
  Checkbox,
  Field,
  FieldRequiredIndicator,
  Heading,
  HStack,
  Input,
  NumberInput,
  Stack,
  Textarea,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { PiBowlFood } from 'react-icons/pi';
import { FaCarSide } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { IoIosWifi } from 'react-icons/io';
import { Link } from 'react-router';

const CreateVenue = () => {
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

      <form>
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
            <Input placeholder='Cozy Cabin in Voss ' />
          </Field.Root>
          <HStack>
            <Field.Root required>
              <Field.Label>
                Price <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                defaultValue='0'
                w='full'
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Guests <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                defaultValue='0'
                w='full'
              >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
          </HStack>
          <Field.Root required>
            <Field.Label>
              Description{' '}
              <FieldRequiredIndicator />{' '}
            </Field.Label>
            <Textarea placeholder='Describe your venue' />
          </Field.Root>
        </Stack>

        <Stack my='2rem'>
          <Heading
            as='h2'
            fontSize='md'
            fontWeight='semibold'
            fontFamily='body'
          >
            Facilities
          </Heading>
          <HStack spaceX='4'>
            <Wrap>
              <WrapItem>
                <Checkbox.Root variant='solid'>
                  <Checkbox.HiddenInput />
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
                  <Checkbox.HiddenInput />
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
                  <Checkbox.HiddenInput />
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
                  <Checkbox.HiddenInput />
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
            <Input placeholder='Cozy Cabin in Voss ' />
          </Field.Root>
          <HStack>
            <Field.Root>
              <Field.Label>
                Zip <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                defaultValue='0'
                w='full'
              >
                <NumberInput.Input />
              </NumberInput.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>
                City
                <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder='Voss' />
            </Field.Root>
            <Field.Root>
              <Field.Label>
                Country{' '}
                <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder='Norway' />
            </Field.Root>
          </HStack>
        </Stack>

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
            <HStack>
              <Field.Root>
                <Field.Label>
                  Paste Image URL
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input />
              </Field.Root>
              <Field.Root>
                <Field.Label>
                  Image Description
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input />
              </Field.Root>
            </HStack>
            <Button
              bg='brand700'
              color='white'
              rounded='md'
            >
              Add Media
            </Button>
            <Wrap mt='2rem'>
              {/* Images will come here as they're uploaded, so will change Box to Image*/}
              <Box
                h='100px'
                w='100px'
                bg='brand300'
                rounded='md'
              />
              <Box
                h='100px'
                w='100px'
                bg='brand300'
                rounded='md'
              />
              <Box
                h='100px'
                w='100px'
                bg='brand300'
                rounded='md'
              />
            </Wrap>
          </Stack>
        </Stack>

        <HStack my='4rem'>
          <Link to='/venues'>
            <Button bg='brand300' rounded='md'>
              Cancel
            </Button>
          </Link>
          <Button
            type='submit'
            bg='brand700'
            color='white'
            rounded='md'
          >
            Create Venue
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default CreateVenue;
