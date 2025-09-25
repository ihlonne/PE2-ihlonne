import {
  Flex,
  Stack,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { chakra } from '@chakra-ui/react';

type SearchProps = {
  defaultValue?: string;
  onSubmit: (q: string) => void;
};

const Search: React.FC<SearchProps> = ({
  defaultValue = '',
  onSubmit,
}) => {
  const [query, setQuery] =
    useState(defaultValue);

  useEffect(
    () => setQuery(defaultValue),
    [defaultValue]
  );

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSubmit(query.trim());
    console.log('clicked');
  };

  return (
    <chakra.form
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      mt='4rem'
      role='search'
      onSubmit={handleSubmit}
    >
      <Flex
        maxW='2xl'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
        gap={{ base: 3, md: 6 }}
        bg='whiteAlpha.500'
        p={{ base: '3', md: '1rem' }}
        rounded={{ base: 'lg', md: '2xl' }}
        boxShadow='0 8px 24px rgba(18, 13, 30, 0.15)'
      >
        <Stack flex='1' alignItems='flex-start'>
          <Input
            placeholder='Search for your next adventure'
            color='brand900'
            _placeholder={{
              color: 'blackAlpha.600',
            }}
            border='none'
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
          />
        </Stack>

        <IconButton
          aria-label='Search'
          type='submit'
          rounded='full'
          size='md'
          bg='brand600'
          color='brand100'
          _hover={{ bg: 'brand800' }}
        >
          <LuSearch />
        </IconButton>
      </Flex>
    </chakra.form>
  );
};

export default Search;
