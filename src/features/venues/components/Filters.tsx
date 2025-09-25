import {
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

type FiltersProps = {
  filters: {
    breakfast: boolean;
    parking: boolean;
    pets: boolean;
    wifi: boolean;
    rating: number;
    maxGuests: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      breakfast: boolean;
      parking: boolean;
      pets: boolean;
      wifi: boolean;
      rating: number;
      maxGuests: number;
    }>
  >;
};

const Filters = ({
  filters,
  setFilters,
}: FiltersProps) => {
  return (
    <Flex direction='column' gap='2rem'>
      <HStack>
        <Button
          bg='brand300'
          rounded='md'
          px='2rem'
          onClick={() =>
            setFilters({
              breakfast: false,
              parking: false,
              pets: false,
              wifi: false,
              rating: 0,
              maxGuests: 0,
            })
          }
        >
          Reset Filters <IoIosClose />
        </Button>
      </HStack>

      {/* Facilities */}
      <Stack gap='2'>
        <Heading
          as='h2'
          fontSize='sm'
          fontFamily='body'
        >
          Facilities
        </Heading>
        {[
          'breakfast',
          'parking',
          'pets',
          'wifi',
        ].map((key) => (
          <Checkbox.Root
            key={key}
            checked={
              filters[
                key as keyof typeof filters
              ] as boolean
            }
            onCheckedChange={() =>
              setFilters((f) => ({
                ...f,
                [key]: !f[key as keyof typeof f],
              }))
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>
              {key.charAt(0).toUpperCase() +
                key.slice(1)}
            </Checkbox.Label>
          </Checkbox.Root>
        ))}
      </Stack>

      {/* Rating */}
      <Stack gap='2'>
        <Heading
          as='h2'
          fontSize='sm'
          fontFamily='body'
        >
          Rating
        </Heading>
        {[5, 4, 3, 2, 1].map((stars) => (
          <Checkbox.Root
            key={stars}
            checked={filters.rating === stars}
            onCheckedChange={() =>
              setFilters((f) => ({
                ...f,
                rating:
                  f.rating === stars ? 0 : stars,
              }))
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>
              <HStack>
                {[...Array(stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </HStack>
            </Checkbox.Label>
          </Checkbox.Root>
        ))}
      </Stack>
    </Flex>
  );
};

export default Filters;
