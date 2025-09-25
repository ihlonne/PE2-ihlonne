import {
  Badge,
  Button,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Portal,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaListUl } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';
import { IoGrid } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import type { TVenue } from '../../../types/venue';
import { useAuth } from '../../../hooks/useAuth';
import { Select } from 'react-day-picker';
import Filters from './Filters';
import { useState } from 'react';

type FiltersState = {
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
  wifi: boolean;
  rating: number;
  maxGuests: number;
};

type VenueToolbarProps = {
  gridView: boolean;
  setGridView: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  venues: TVenue[];
  filters: FiltersState;
  setFilters: React.Dispatch<
    React.SetStateAction<FiltersState>
  >;
  sort:
    | 'price-asc'
    | 'price-desc'
    | 'rating'
    | '';
  setSort: React.Dispatch<
    React.SetStateAction<
      'price-asc' | 'price-desc' | ''
    >
  >;
};

const VenueToolbar = ({
  gridView,
  setGridView,
  venues,
  filters,
  setFilters,
  sort,
  setSort,
}: VenueToolbarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const [isMobile] = useMediaQuery([
    '(min-width: 768px)',
  ]);

  return (
    <>
      <Flex
        justifyContent='space-between'
        gap={{ base: 4, md: 0 }}
      >
        <Flex
          gap='2'
          justifyContent={{
            base: 'space-between',
            md: 'normal',
          }}
          alignItems='center'
        >
          {' '}
          {user?.venueManager === true &&
            (isMobile ? (
              <Button
                onClick={() =>
                  navigate('/venues/create')
                }
                bg='brand600'
                color='white'
              >
                <FiPlus />
                New Venue
              </Button>
            ) : (
              <Button
                onClick={() =>
                  navigate('/venues/create')
                }
                bg='brand600'
                color='white'
                rounded='full'
              >
                <FiPlus />
              </Button>
            ))}
          {isMobile && (
            <>
              <IconButton
                bg={
                  gridView
                    ? 'brand200'
                    : 'transparent'
                }
                color='black'
                border='1px solid #eee'
                rounded='lg'
                onClick={() => setGridView(true)}
                aria-label='Grid View'
              >
                <Icon as={IoGrid} />
              </IconButton>
              <IconButton
                bg={
                  !gridView
                    ? 'brand200'
                    : 'transparent'
                }
                color='black'
                border='1px solid #eee'
                rounded='lg'
                onClick={() => setGridView(false)}
                aria-label='List View'
              >
                <Icon as={FaListUl} />
              </IconButton>

              <Text>{venues.length} results</Text>
            </>
          )}
        </Flex>

        <Flex gap='2'>
          <Drawer.Root
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement='start'
          >
            <Drawer.Trigger asChild>
              <Button bg='brand200'>
                Filters
              </Button>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg='white'>
                  <Drawer.Header>
                    Filters
                  </Drawer.Header>
                  <Drawer.Body>
                    <Filters
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </Drawer.Body>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <Select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value as
                  | 'price-asc'
                  | 'price-desc'
                  | ''
              )
            }
            style={{
              background: 'white',
              border: '1px solid #eee',
              padding: '0.5rem',
              borderRadius: '5px',
            }}
          >
            <option value=''>Default</option>
            <option value='price-asc'>
              Price low-high
            </option>
            <option value='price-desc'>
              Price high-low
            </option>
          </Select>
        </Flex>
      </Flex>

      <Flex gap='2' flexWrap='wrap' mt='2'>
        {filters.breakfast && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                breakfast: false,
              }))
            }
          >
            Breakfast <IoIosClose />
          </Badge>
        )}
        {filters.parking && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                parking: false,
              }))
            }
          >
            Parking <IoIosClose />
          </Badge>
        )}
        {filters.pets && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                pets: false,
              }))
            }
          >
            Pet-Friendly <IoIosClose />
          </Badge>
        )}
        {filters.wifi && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                wifi: false,
              }))
            }
          >
            WiFi <IoIosClose />
          </Badge>
        )}
        {filters.rating > 0 && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                rating: 0,
              }))
            }
          >
            {filters.rating} ★<IoIosClose />
          </Badge>
        )}
        {filters.maxGuests > 0 && (
          <Badge
            bg='brand300'
            color='brand800'
            cursor='pointer'
            onClick={() =>
              setFilters((f) => ({
                ...f,
                maxGuests: 0,
              }))
            }
          >
            Up to {filters.maxGuests} guests{' '}
            <IoIosClose />
          </Badge>
        )}
      </Flex>
    </>
  );
};

export default VenueToolbar;
