import {
  Box,
  Flex,
  Image,
  Separator,
} from '@chakra-ui/react';
import logo from '../../assets/logoBig.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      bottom='0'
      left='0'
      w='100%'
      h='auto'
      p='4rem 4rem 2rem 4rem'
      bg='brand900'
      color='brand100'
    >
      <Link to='/'>
        <Box mb={{ sm: '4rem', lg: 0 }}>
          <Image src={logo} maxH='60px' />
        </Box>
      </Link>

      <Separator my='4rem 2rem' w='100%' />
      <Box>
        <Link
          to='https://ihlonne.netlify.app'
          target='_blank'
        >
          © ihlonne
        </Link>
      </Box>
    </Flex>
  );
};

export default Footer;
