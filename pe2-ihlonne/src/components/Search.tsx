import {
  Box,
  Flex,
  Stack,
  Text,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

function Search() {
  return (
    <Box
      as='form'
      role='search'
      display='flex'
      justifyContent='center'
      alignItems='center'
      mt='4rem'
    >
      <Flex
        maxW='4xl'
        w='100%'
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        gap={{ base: 3, md: 6 }}
        bg='whiteAlpha.500'
        p={{ base: '3', md: '1rem' }}
        rounded={{ base: 'lg', md: '2xl' }}
        boxShadow='0 8px 24px rgba(18, 13, 30, 0.5)'
      >
        {/* Where */}
        <Stack flex='1' alignItems='flex-start'>
          <Text
            fontWeight='semibold'
            color='brand900'
            ml='0.65rem'
          >
            Where
          </Text>
          <Input
            placeholder='Search locations'
            color='brand900'
            _placeholder={{
              color: 'blackAlpha.600',
            }}
            border='none'
          />
        </Stack>

        {/* When */}
        <Stack flex='1' alignItems='flex-start'>
          <Text
            fontWeight='semibold'
            color='brand900'
            ml='0.65rem'
          >
            When
          </Text>
          <Input
            placeholder='Add dates'
            color='brand900'
            _placeholder={{
              color: 'blackAlpha.600',
            }}
            border='none'
            // later: swap for a date-picker trigger
          />
        </Stack>

        {/* Who */}
        <Stack flex='1' alignItems='flex-start'>
          <Text
            fontWeight='semibold'
            color='brand900'
            ml='0.65rem'
          >
            Who
          </Text>
          <Input
            placeholder='Add guests'
            color='brand900'
            _placeholder={{
              color: 'blackAlpha.600',
            }}
            border='none'
          />
        </Stack>
        {/* round search button */}
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
    </Box>
  );
}

export default Search;
