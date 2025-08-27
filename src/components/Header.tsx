import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';

/* import logo from '../assets/lightlogo.png'; */
import logo from '../assets/darklogo.png';
import { Link } from 'react-router';

const Header = () => {
  return (
    <Box
      as='header'
      position='fixed'
      display='flex'
      justifyContent='space-between'
      w='100%'
      h='auto'
      p='2rem 6rem'
      zIndex='1000'
    >
      <Box>
        <Image src={logo} />
      </Box>
      <Flex
        as='ul'
        listStyleType='none'
        alignItems='center'
        gap='10'
      >
        <Box as='li' fontWeight='semibold'>
          <Link to='/Venues'> Browse Venues</Link>
        </Box>
        <Box as='li' fontWeight='semibold'>
          <Link to='/CreateVenues'>
            List Your Venue
          </Link>
        </Box>
        <Box
          bg='brand700'
          color='white'
          p='0.25rem 1.25rem'
          rounded='md'
          cursor='pointer'
        >
          Log In
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
