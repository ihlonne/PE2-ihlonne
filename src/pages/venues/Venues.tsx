import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  NativeSelect,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IoIosClose } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { FaListUl } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router';
import type { TVenue } from '../../types/venue';
import searchVenues from '../../features/search/api';
import { getVenues } from '../../lib/venue';
import Search from '../../features/search/Search';
import GridVenueCard from '../../features/venues/GridVenueCard';
import ListVenueCard from '../../features/venues/ListVenueCard';

const Venues = () => {
  const [isGridView, setIsGridView] =
    useState(true);

  const [searchParams, setSearchParams] =
    useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const [venues, setVenues] = useState<TVenue[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    setLoading(true);

    (async () => {
      const res = q
        ? await searchVenues(q, {
            page,
            limit: 12,
          }) // 🔎
        : await getVenues({
            page,
            limit: 12,
          }); // 📄

      if (!alive) return;

      setVenues((prev) =>
        page === 1
          ? res.data
          : [...prev, ...res.data]
      );
      setIsLast(Boolean(res.meta?.isLastPage));
    })().finally(
      () => alive && setLoading(false)
    );

    return () => {
      alive = false;
    };
  }, [q, page]);

  return (
    <Flex
      direction='column'
      mx='auto'
      w='100%'
      maxW='1290px'
      minH='100dvh'
    >
      <Heading as='h1'>Browse Venues</Heading>
      <Search
        defaultValue={q}
        onSubmit={(val) => {
          const next = new URLSearchParams(
            searchParams
          );
          if (val) next.set('q', val);
          else next.delete('q');
          setSearchParams(next, {
            replace: false,
          });
        }}
      />
      <Flex mt='4rem' gap='4rem' w='full'>
        {/* Filters */}
        <Flex direction='column' gap='2rem'>
          <HStack>
            <Button
              bg='brand300'
              rounded='md'
              px='2rem'
            >
              Reset Filters <IoIosClose />
            </Button>
          </HStack>
          <Stack gap='2'>
            <Heading
              as='h2'
              fontSize='sm'
              fontFamily='body'
            >
              Facilities
            </Heading>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                Breakfast
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                Parking
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                Pet-Friendly
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                Wifi
              </Checkbox.Label>
            </Checkbox.Root>
          </Stack>
          <Stack gap='2'>
            <Heading
              as='h2'
              fontSize='sm'
              fontFamily='body'
            >
              Rating
            </Heading>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <HStack>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </HStack>
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <HStack>
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </HStack>
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <HStack>
                  {[...Array(3)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </HStack>
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <HStack>
                  {[...Array(2)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </HStack>
              </Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <HStack>
                  {[...Array(1)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </HStack>
              </Checkbox.Label>
            </Checkbox.Root>
          </Stack>
          <Heading
            as='h2'
            fontSize='sm'
            fontFamily='body'
          >
            Max Guests
          </Heading>
          <Stack width='200px' gap='4'>
            <Slider.Root>
              <Slider.Label />
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
          </Stack>
        </Flex>
        <Flex direction='column' gap='6' w='full'>
          <Flex
            justifyContent='space-between'
            w='full'
          >
            <Flex gap='2' alignItems='center'>
              <IconButton
                bg={
                  isGridView
                    ? 'brand600'
                    : 'transparent'
                }
                color={
                  isGridView ? 'white' : 'black'
                }
                border='1px'
                rounded='lg'
                borderColor='brand300'
                onClick={() =>
                  setIsGridView(true)
                }
                aria-label='Grid View'
              >
                <Icon as={IoGrid} />
              </IconButton>
              <IconButton
                bg={
                  !isGridView
                    ? 'brand600'
                    : 'transparent'
                }
                color={
                  !isGridView ? 'white' : 'black'
                }
                border='1px'
                rounded='lg'
                borderColor='brand300'
                onClick={() =>
                  setIsGridView(false)
                }
                aria-label='List View'
              >
                <Icon as={FaListUl} />
              </IconButton>
              <Text>{venues.length} results</Text>
            </Flex>
            <Flex
              gap='2'
              onClick={() =>
                navigate('/venues/create')
              }
            >
              <Button bg='brand600' color='white'>
                <FaPlus /> New Venue
              </Button>
              <NativeSelect.Root>
                <NativeSelect.Field placeholder='Sort By'>
                  <option value='1'>
                    Price low-high
                  </option>
                  <option value='2'>
                    Price high-low
                  </option>
                  <option value='3'>
                    Rating
                  </option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
          </Flex>
          <Flex gap='2'>
            <Badge>
              Breakfast <IoIosClose />
            </Badge>
            <Badge>
              Parking <IoIosClose />
            </Badge>
            <Badge>
              Pet-Friendly <IoIosClose />
            </Badge>
            <Badge>
              WiFi <IoIosClose />
            </Badge>
          </Flex>

          {isGridView ? (
            <SimpleGrid
              w='100%'
              columns={3}
              gap='4'
              rowGap='12'
              mt='8'
              mb='24'
              mx='auto'
              justifyContent='flex-start'
            >
              {venues.length > 0 ? (
                venues.map((v) => (
                  <GridItem key={v.id}>
                    <GridVenueCard venue={v} />
                  </GridItem>
                ))
              ) : (
                <Text>
                  {loading
                    ? 'Loading…'
                    : 'No venues available'}
                </Text>
              )}
            </SimpleGrid>
          ) : (
            <Grid
              w='100%'
              templateColumns='1fr'
              gap='5'
              rowGap='12'
              mt='8'
              mb='24'
              mx='auto'
              justifyContent='flex-start'
            >
              {venues.length > 0 ? (
                venues.map((v) => (
                  <GridItem key={v.id}>
                    <ListVenueCard venue={v} />
                  </GridItem>
                ))
              ) : (
                <Text>
                  {loading
                    ? 'Loading…'
                    : 'No venues available'}
                </Text>
              )}
            </Grid>
          )}
          {!isLast && (
            <Button
              onClick={() =>
                setPage((p) => p + 1)
              }
              mt='8'
              alignSelf='center'
            >
              {loading ? 'Loading…' : 'Load more'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Venues;
