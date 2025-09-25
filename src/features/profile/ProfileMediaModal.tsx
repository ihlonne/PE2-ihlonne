import { useState } from 'react';
import {
  Button,
  Flex,
  Input,
} from '@chakra-ui/react';

type ProfileMediaModalProps = {
  onCancel: () => void;
  onConfirm: (
    url: string
  ) => void | Promise<void>;
};

const ProfileMediaModal = ({
  onCancel,
  onConfirm,
}: ProfileMediaModalProps) => {
  const [inputValue, setInputValue] =
    useState('');

  return (
    <Flex direction='column' gap='4' w='full'>
      <Input
        placeholder='Paste image URL here...'
        value={inputValue}
        onChange={(e) =>
          setInputValue(e.target.value)
        }
      />
      <Flex justifyContent='flex-end' gap='2'>
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (inputValue.trim()) {
              onConfirm(inputValue.trim());
            }
          }}
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileMediaModal;
