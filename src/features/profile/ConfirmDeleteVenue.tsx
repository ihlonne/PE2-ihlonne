import { Button, Flex } from '@chakra-ui/react';

interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

const ConfirmDeleteVenue = ({
  onCancel,
  onConfirm,
}: ConfirmDeleteProps) => {
  return (
    <Flex justifyContent='center'>
      <Flex gap='2'>
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
          Delete Venue
        </Button>
      </Flex>
    </Flex>
  );
};

export default ConfirmDeleteVenue;
