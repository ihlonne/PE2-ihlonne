import {
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';

/* import logo from '../assets/lightlogo.png'; */
import logo from '../assets/darklogo.png';

const Header = () => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      position='fixed'
      w='full'
      h='auto'
      top='0'
      left='0'
      p='2rem 8rem'
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
          Browse Venues
        </Box>
        <Box as='li' fontWeight='semibold'>
          List Your Venue
        </Box>
        <Box
          as='button'
          bg='brand700'
          color='brand100'
        >
          Log In
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
