import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { TVenue } from '../../types/venue';
import searchVenues from '../../features/search/api';
import { getVenues } from '../../lib/venue';
import Search from '../../features/search/Search';
import GridVenueCard from '../../features/venues/GridVenueCard';
import ListVenueCard from '../../features/venues/ListVenueCard';
import VenueToolbar from '../../features/venues/components/VenueToolbar';

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

  const [filters, setFilters] = useState({
    breakfast: false,
    parking: false,
    pets: false,
    wifi: false,
    rating: 0,
    maxGuests: 0,
  });

  const [sort, setSort] = useState<
    'price-asc' | 'price-desc' | ''
  >('');

  useEffect(() => {
    let alive = true;
    setLoading(true);

    (async () => {
      const res = q
        ? await searchVenues(q, {
            page,
            limit: 12,
          })
        : await getVenues({ page, limit: 12 });

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

  let filteredVenues = venues.filter((v) => {
    if (filters.breakfast && !v.meta?.breakfast)
      return false;
    if (filters.parking && !v.meta?.parking)
      return false;
    if (filters.pets && !v.meta?.pets)
      return false;
    if (filters.wifi && !v.meta?.wifi)
      return false;
    if (
      filters.rating > 0 &&
      (v.rating ?? 0) < filters.rating
    )
      return false;
    if (
      filters.maxGuests > 0 &&
      v.maxGuests > filters.maxGuests
    )
      return false;
    return true;
  });

  if (sort === 'price-asc') {
    filteredVenues = [...filteredVenues].sort(
      (a, b) => a.price - b.price
    );
  } else if (sort === 'price-desc') {
    filteredVenues = [...filteredVenues].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <Flex
      direction='column'
      mx='auto'
      w={{ base: '90%', md: 'full' }}
      maxW='1290px'
      minH='100dvh'
    >
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
      <Flex mt='4rem' gap='4rem' mx='auto'>
        <Flex direction='column' gap='6' w='full'>
          <VenueToolbar
            gridView={isGridView}
            setGridView={setIsGridView}
            venues={filteredVenues}
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
          />
          <Heading as='h1'>Browse Venues</Heading>
          {isGridView ? (
            <SimpleGrid
              w='100%'
              columns={{ base: 1, md: 3, lg: 4 }}
              gap='4'
              alignItems='stretch'
              rowGap='12'
              mt='8'
              mb='24'
              mx='auto'
              justifyContent='flex-start'
            >
              {filteredVenues.length > 0 ? (
                filteredVenues.map((v) => (
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
              {filteredVenues.length > 0 ? (
                filteredVenues.map((v) => (
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
              bg='brand200'
              onClick={() =>
                setPage((p) => p + 1)
              }
              mb='20'
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
