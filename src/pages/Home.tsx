import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Separator,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';

import hero from '../assets/heroImage.jpg';
import SmallVenueCard from '../components/SmallVenueCard';
import type { TVenue } from '../types/venue';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import HeroSection from '../components/homePage/HeroSection';
import { getVenues } from '../lib/venue';
import { Link } from 'react-router';

const Home = () => {
  const [venues, setVenues] = useState<TVenue[]>(
    []
  );

  console.log(venues);

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<unknown>(null);

  const [exploreVenues, setExploreVenues] =
    useState<TVenue[]>([]);

  const RATING_MIN = 4.5;
  const BUDGET_MAX = 399;

  const sortNewest = <
    T extends { created?: string }
  >(
    a: T,
    b: T
  ) =>
    new Date(b.created ?? 0).getTime() -
    new Date(a.created ?? 0).getTime();

  const pickRandomUnique = <T,>(
    arr: T[],
    n: number
  ): T[] => {
    const copy = [...arr];
    const picked: T[] = [];
    const max = Math.min(n, copy.length);

    for (let i = 0; i < max; i++) {
      const idx = Math.floor(
        Math.random() * copy.length
      );
      picked.push(copy[idx]);
      copy.splice(idx, 1);
    }

    return picked;
  };

  const exploreAreasMd = [
    '1 / 1 / 5 / 5', // big tile
    '1 / 5 / 3 / 7',
    '3 / 5 / 5 / 7',
    '1 / 7 / 3 / 9',
    '3 / 7 / 5 / 9',
  ];

  const popularVenues = useMemo(
    () =>
      venues
        .filter(
          (v) => (v.rating ?? 0) >= RATING_MIN
        )
        .sort(sortNewest)
        .slice(0, 4),
    [venues]
  );

  const budgetVenues = useMemo(
    () =>
      venues
        .filter(
          (v) => (v.price ?? 0) <= BUDGET_MAX
        )
        .sort(sortNewest)
        .slice(0, 8),
    [venues]
  );

  const petFriendlyVenues = useMemo(
    () =>
      venues
        .filter((v) => v.meta?.pets)
        .sort(sortNewest)
        .slice(0, 4),
    [venues]
  );

  // seed once when venues arrive
  useEffect(() => {
    if (venues.length)
      setExploreVenues(
        pickRandomUnique(venues, 5)
      );
  }, [venues]);

  const shuffleExplore = () =>
    setExploreVenues(pickRandomUnique(venues, 5));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getVenues();
        const processedVenues = res.data.filter(
          (venue) =>
            !venue.name
              .toLowerCase()
              .includes('test') &&
            !venue.name
              .toLowerCase()
              .includes('zz') &&
            !venue.name
              .toLowerCase()
              .includes('zxc')
        );
        setVenues(processedVenues);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error)
    return <div>Something went wrong</div>;

  return (
    <Flex direction='column' mx='auto' w='full'>
      <HeroSection />
      {/*  Favorites Section  */}
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        bg='brand900'
        w='100%'
        py='4rem'
      >
        <Box
          maxW='1290px'
          w={{ base: '90%', xl: '100%' }}
        >
          <Stack
            justifyContent='center'
            align='center'
          >
            <HStack
              w='100%'
              gap='4rem'
              justifyContent='center'
            >
              <Separator
                size='sm'
                flex='1'
                orientation='horizontal'
                borderColor='brand500'
                display={{
                  base: 'none',
                  md: 'block',
                }}
              />
              <Heading
                as='h2'
                fontSize={{
                  base: '3xl',
                  md: '4xl',
                }}
                color='brand300'
                fontWeight='400'
                textTransform='uppercase'
              >
                Most Popular
              </Heading>
              <Separator
                size='sm'
                flex='1'
                orientation='horizontal'
                borderColor='brand500'
                display={{
                  base: 'none',
                  md: 'block',
                }}
              />
            </HStack>
          </Stack>
          {/*Cards */}
          <SimpleGrid
            mt='3rem'
            gap='1.5rem'
            w='full'
            minChildWidth='300px'
            color='white'
          >
            {loading ? (
              <Skeleton h='205px' w='full' />
            ) : (
              <>
                {popularVenues.map((v) => (
                  <GridItem
                    key={v.id}
                    as='article'
                    minW={0}
                  >
                    <SmallVenueCard venue={v} />
                  </GridItem>
                ))}
              </>
            )}
          </SimpleGrid>
        </Box>
      </Flex>
      {/* Budget Friendly Section */}
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
        py='4rem'
      >
        <Box
          maxW='1290px'
          w={{ base: '90%', xl: '100%' }}
        >
          <Heading
            as='h2'
            fontSize='lg'
            fontWeight='700'
            fontFamily='body'
          >
            Budget Friendly Venues
          </Heading>

          {/*Cards */}
          <SimpleGrid
            mt='3rem'
            gap='1.5rem'
            w='full'
            minChildWidth='300px'
          >
            {loading ? (
              <Skeleton h='205px' />
            ) : (
              <>
                {budgetVenues.map((v) => (
                  <GridItem key={v.id}>
                    <Link
                      to={`/venues/venue/${v.id}`}
                    >
                      <SmallVenueCard venue={v} />
                    </Link>
                  </GridItem>
                ))}
              </>
            )}
          </SimpleGrid>
        </Box>
      </Flex>
      {/* Explore Section */}
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        w='100%'
        bg='brand500'
        py='4rem'
      >
        <Box
          maxW='1290px'
          w={{ base: '90%', xl: '100%' }}
        >
          <Stack
            w='100%'
            justifyContent='center'
            alignItems='center'
          >
            <HStack
              w='100%'
              gap='4rem'
              justifyContent='center'
              textAlign='center'
            >
              <Separator
                size='sm'
                flex='1'
                orientation='horizontal'
                display={{
                  base: 'none',
                  md: 'block',
                }}
              />
              <Heading
                as='h2'
                fontSize={{
                  base: '3xl',
                  md: '4xl',
                }}
                fontWeight='600'
                fontStyle='italic'
                textTransform='uppercase'
              >
                Explore By Photo
              </Heading>
              <Separator
                size='sm'
                flex='1'
                orientation='horizontal'
                display={{
                  base: 'none',
                  md: 'block',
                }}
              />
            </HStack>
            <Text
              mt='0.75rem'
              fontStyle='italic'
              textAlign='center'
            >
              Click any photo to jump into a
              random venue.
            </Text>
          </Stack>

          {/*Cards */}
          <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(8, 1fr)',
            }}
            templateRows={{
              base: 'auto',
              md: 'repeat(4, 80px)',
            }}
            gap='1.5rem'
            mt='3rem'
          >
            {loading ? (
              <Skeleton
                h='205px'
                w='100%'
                variant='shine'
              />
            ) : (
              <>
                {exploreVenues
                  .slice(0, 5)
                  .map((v, i) => (
                    <GridItem
                      key={v.id}
                      gridArea={{
                        base: 'auto',
                        md: exploreAreasMd[i],
                      }}
                      minW={0}
                    >
                      <Link
                        to={`/venues/venue/${v.id}`}
                      >
                        <Box
                          w='full'
                          h='full'
                          overflow='hidden'
                          rounded='xl'
                        >
                          <Image
                            src={
                              v.media?.[0]?.url ??
                              hero
                            }
                            alt={
                              v.media?.[0]?.alt ??
                              v.name
                            }
                            w='full'
                            h='full'
                            objectFit='cover'
                          />
                        </Box>
                      </Link>
                    </GridItem>
                  ))}
              </>
            )}
          </Grid>

          <HStack justifySelf='center' mt='3rem'>
            <Button
              bg='brand800'
              color='white'
              fontWeight='semibold'
              onClick={shuffleExplore}
              rounded='lg'
            >
              Shuffle
            </Button>
          </HStack>
        </Box>
      </Flex>
      {/* Pet Friendly Section */}
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
        w={{ base: '90%', xl: '100%' }}
        py='4rem'
        mx='auto'
        maxW='1290px'
      >
        <Heading
          as='h2'
          fontSize='lg'
          fontWeight='700'
          fontFamily='body'
          alignSelf='flex-start'
        >
          Pet Friendly Venues
        </Heading>

        {/*Cards */}
        <SimpleGrid
          mt='3rem'
          gap='1.5rem'
          w='full'
          minChildWidth='300px'
        >
          {loading ? (
            <Skeleton h='205px' w='full' />
          ) : (
            <>
              {petFriendlyVenues.map((v) => (
                <GridItem
                  key={v.id}
                  as='article'
                  minW={0}
                >
                  <SmallVenueCard venue={v} />
                </GridItem>
              ))}
            </>
          )}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Home;
