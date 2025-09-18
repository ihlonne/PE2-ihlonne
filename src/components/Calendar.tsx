// components/Calendar.tsx (previously AvailabilityCalendar.tsx)
import React, { useMemo, useState } from 'react';
import {
  Button,
  Flex,
  NumberInput,
  Text,
  useToken,
} from '@chakra-ui/react';
import {
  DayPicker,
  type DateRange,
  type Matcher,
} from 'react-day-picker';
import {
  startOfToday,
  differenceInCalendarDays,
} from 'date-fns';
import { bookingsToDisable } from '../lib/dates';
import type { Booking } from '../types/booking';

type CalendarProps = {
  bookings: Booking[];
  minNights?: number;
  maxNights?: number;
  maxGuests: number;
  defaultMonth?: Date;
  onSelectRange?: (r: {
    from: Date;
    to: Date;
    nights: number;
    guests: number;
  }) => void;
  canBook?: boolean;
};

const Calendar: React.FC<CalendarProps> = ({
  bookings,
  minNights = 1,
  maxNights,
  maxGuests,
  defaultMonth,
  onSelectRange,
  canBook,
}) => {
  const [range, setRange] = useState<
    DateRange | undefined
  >();
  const [guests, setGuests] = useState<number>(1);

  const [brand600, brand200, fgMuted] = useToken(
    'colors',
    ['brand600', 'brand200', 'fg.muted']
  );

  const disabled: Matcher[] = useMemo(
    () => [
      { before: startOfToday() },
      ...bookingsToDisable(bookings),
    ],
    [bookings]
  );

  const nights =
    range?.from && range.to
      ? differenceInCalendarDays(
          range.to,
          range.from
        )
      : 0;

  const valid =
    !!range?.from &&
    !!range?.to &&
    nights >= minNights &&
    (!maxNights || nights <= maxNights);

  const validGuests =
    guests >= 1 && guests <= maxGuests;

  const confirm = () => {
    if (
      valid &&
      validGuests &&
      range?.from &&
      range.to
    ) {
      onSelectRange?.({
        from: range.from,
        to: range.to,
        nights,
        guests,
      });
    }
  };

  const styles = {
    root: {
      '--rdp-accent-color': brand600,
      '--rdp-accent-background-color': brand200,
      '--rdp-disabled-opacity': '0.25',
      '--rdp-disabled-text-decoration':
        'line-through',
      '--rdp-today-color': brand600,
      '--rdp-today-weight': 'black',
      '--rdp-selection-color': brand600,
      '--rdp-selection-color-start': brand600,
      '--rdp-selection-color-end': brand600,
    } as React.CSSProperties,

    day_outside: { color: fgMuted },
  } satisfies React.ComponentProps<
    typeof DayPicker
  >['styles'];

  return (
    <Flex direction='column' p={4} w='full'>
      <DayPicker
        animate
        excludeDisabled
        mode='range'
        selected={range}
        onSelect={setRange}
        disabled={disabled}
        startMonth={defaultMonth}
        min={minNights}
        max={maxNights}
        styles={styles}
      />
      <Flex direction='column' mt={3} gap={6}>
        <Text>
          {range?.from &&
            !range.to &&
            'Select a checkout date…'}
          {range?.from &&
            range.to &&
            `Selected ${nights} night${
              nights === 1 ? '' : 's'
            }`}
          {!range?.from &&
            'Select your check-in date…'}
        </Text>

        <Flex align='center' gap={2}>
          <Text fontWeight='medium'>Guests</Text>
          <NumberInput.Root
            size='sm'
            min={1}
            max={maxGuests}
            value={String(guests)}
            onValueChange={(e) => {
              const n = e.valueAsNumber;
              setGuests(Number.isNaN(n) ? 1 : n);
            }}
            w='88px'
          >
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          <Text color='fg.muted' fontSize='sm'>
            / max {maxGuests}
          </Text>
        </Flex>

        <Flex gap={2}>
          <Button
            variant='outline'
            borderColor={brand600}
            onClick={() => setRange(undefined)}
            color='brand600'
          >
            Clear
          </Button>
          <Button
            onClick={confirm}
            disabled={
              !valid || !validGuests || !canBook
            }
            bg='brand700'
            color='white'
            fontWeight='600'
          >
            Book this Venue
          </Button>
        </Flex>
      </Flex>
      {canBook === false && (
        <Text
          mt={2}
          fontSize='sm'
          color='fg.muted'
        >
          Log in to book this venue.
        </Text>
      )}
      {!validGuests && (
        <Text
          mt={2}
          color='red.500'
          fontSize='sm'
        >
          Please choose between 1 and {maxGuests}{' '}
          guest{maxGuests === 1 ? '' : 's'}.
        </Text>
      )}
    </Flex>
  );
};
export default Calendar;
