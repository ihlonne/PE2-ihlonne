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
  Stack,
  Text,
} from '@chakra-ui/react';

import hero from '../assets/heroImage.jpg';
import SmallVenueCard from '../components/SmallVenueCard';
import type { TVenue } from '../types/venue';
import { useEffect, useState } from 'react';
import HeroSection from '../components/homePage/HeroSection';
import { getVenues } from '../lib/venue';

const Home = () => {
  const [venues, setVenues] = useState<TVenue[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<unknown>(null);

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

  console.log(venues);

  if (loading) return <div>Loading…</div>;
  if (error)
    return <div>Something went wrong</div>;

  return (
    <>
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
            w='100%'
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
            color='white'
            minChildWidth='300px'
          >
            {venues && venues.length > 0
              ? venues
                  .slice(0, 4)
                  .map((venue) => (
                    <GridItem key={venue.id}>
                      <SmallVenueCard
                        venue={venue}
                      />
                    </GridItem>
                  ))
              : null}
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
        <Box maxW='1290px'>
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
            {venues && venues.length > 0
              ? venues
                  .slice(0, 8)
                  .map((venue) => (
                    <GridItem key={venue.id}>
                      <SmallVenueCard
                        venue={venue}
                      />
                    </GridItem>
                  ))
              : null}
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
        <Box maxW='1290px'>
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
              md: 'repeat(4, 1fr)',
            }}
            gap='1.5rem'
            mt='3rem'
          >
            <GridItem
              gridArea={{
                base: 'auto',
                md: '1 / 1 / 5 / 5',
              }}
            >
              <Image src={hero} rounded='xl' />
            </GridItem>
            <GridItem
              gridArea={{
                base: 'auto',
                md: '1 / 5 / 3 / 7',
              }}
            >
              <Image src={hero} rounded='xl' />
            </GridItem>
            <GridItem
              gridArea={{
                base: 'auto',
                md: '3 / 5 / 5 / 7',
              }}
            >
              <Image src={hero} rounded='xl' />
            </GridItem>
            <GridItem
              gridArea={{
                base: 'auto',
                md: '1 / 7 / 3 / 9',
              }}
            >
              <Image src={hero} rounded='xl' />
            </GridItem>
            <GridItem
              gridArea={{
                base: 'auto',
                md: '3 / 7 / 5 / 9',
              }}
            >
              <Image src={hero} rounded='xl' />
            </GridItem>
          </Grid>

          <HStack justifySelf='center' mt='3rem'>
            <Button
              bg='brand600'
              color='white'
              fontWeight='semibold'
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
        w='100%'
        py='4rem'
      >
        <Box maxW='1290px'>
          <Heading
            as='h2'
            fontSize='lg'
            fontWeight='700'
            fontFamily='body'
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
            {venues && venues.length > 0
              ? venues
                  .slice(0, 4)
                  .map((venue) => (
                    <GridItem key={venue.id}>
                      <SmallVenueCard
                        venue={venue}
                      />
                    </GridItem>
                  ))
              : null}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
