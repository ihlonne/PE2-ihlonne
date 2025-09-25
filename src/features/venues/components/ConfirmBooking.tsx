import {
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';

interface ConfirmBookingModalProps {
  from: Date;
  to: Date;
  nights: number;
  guests: number;
  venueName: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

const ConfirmBookingModal = ({
  from,
  to,
  nights,
  guests,
  venueName,
  onCancel,
  onConfirm,
}: ConfirmBookingModalProps) => {
  return (
    <Flex
      direction='column'
      gap='4'
      align='center'
    >
      <Text fontSize='md' textAlign='center'>
        Confirm booking at <b>{venueName}</b>?
      </Text>
      <Text fontSize='sm'>
        Check-in: {from.toDateString()} <br />
        Check-out: {to.toDateString()} <br />
        Nights: {nights} <br />
        Guests: {guests}
      </Text>

      <Flex gap='2' mt='4'>
        <Button
          type='button'
          bg='brand200'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </Button>

        <Button
          type='button'
          bg='brand700'
          color='white'
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await onConfirm();
          }}
        >
          Confirm Booking
        </Button>
      </Flex>
    </Flex>
  );
};

export default ConfirmBookingModal;
