import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

import hero from '../assets/heroImage.jpg';

const SmallVenueCard = () => {
  return (
    <Flex direction='column' gap='1rem'>
      <Box position='relative'>
        <Image src={hero} rounded='xl' />
        <Text
          position='absolute'
          bg='white'
          top='10px'
          left='10px'
          color='brand900'
          fontSize='xs'
          fontWeight='semibold'
          p='0.25rem 0.5rem'
          rounded='full'
          zIndex='5'
        >
          🤩 Guest Favourite
        </Text>
      </Box>
      <Flex direction='column' gap='5'>
        <Flex gap='2' alignItems='center'>
          <Box
            bg='brand700'
            p='0.25rem'
            rounded='sm'
            color='white'
          >
            <Text>4,8</Text>
          </Box>
          <Flex gap='2' alignItems='center'>
            <Text fontWeight='semibold'>
              Excellent
            </Text>
            <Text fontSize='xs'>(3 reviews)</Text>
          </Flex>
        </Flex>
        <Box>
          <Heading
            as='h3'
            fontFamily='body'
            fontSize='lg'
          >
            Urban leilighet sentralt i Bergen
          </Heading>
          <Text>Bergen, Norway</Text>
        </Box>
        <Flex justifyContent='space-between'>
          <Text>369 NOK / night</Text>
          <Text>4 guests</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SmallVenueCard;
