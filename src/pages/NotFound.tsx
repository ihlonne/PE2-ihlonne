import {
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      textAlign='center'
      minH='100vh'
      bg='brand500'
      px={4}
      gap={6}
    >
      <Heading
        as='h1'
        fontSize={{ base: '4xl', md: '8xl' }}
        fontWeight='bold'
        color='white'
      >
        404
      </Heading>

      <Text
        fontSize='lg'
        color='whiteAlpha.900'
        m='2rem 0 4rem 0'
      >
        Oops! The page you’re looking for doesn’t
        exist.
      </Text>

      <Link to='/'>
        <Button
          bg='brand800'
          color='white'
          rounded='lg'
          size='lg'
          _hover={{ bg: 'brand700' }}
        >
          Back to Home
        </Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
