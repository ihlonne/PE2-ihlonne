import {
  Box,
  Flex,
  Image,
  Separator,
  Text,
} from '@chakra-ui/react';
import logo from '../assets/logoBig.png';

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
      <Flex
        direction={{ sm: 'column', lg: 'row' }}
        justifyContent='space-between'
        alignItems={{
          sm: 'center',
          lg: 'flex-start',
        }}
        w={{ sm: '100%', md: '65%' }}
      >
        <Box mb={{ sm: '4rem', lg: 0 }}>
          <Image src={logo} maxH='60px' />
        </Box>

        <Flex
          direction={{ sm: 'column', md: 'row' }}
          gap={{ sm: '4rem', md: '8rem' }}
          textAlign={{ sm: 'center', md: 'left' }}
        >
          <Box as='ul' listStyleType='none'>
            <Box
              as='p'
              fontSize='xl'
              fontWeight='semibold'
              mb='1.5rem'
            >
              Business
            </Box>
            <Box as='li'>About Us</Box>
            <Box as='li'>Careers</Box>
          </Box>
          <Box as='ul' listStyleType='none'>
            <Box
              as='p'
              fontSize='xl'
              fontWeight='semibold'
              mb='1.5rem'
            >
              Help and Information
            </Box>
            <Box as='li'>Customer Support</Box>
            <Box as='li'>Contact Us</Box>
            <Box as='li'>FAQ</Box>
          </Box>
          <Box as='ul' listStyleType='none'>
            <Box
              as='p'
              fontSize='xl'
              fontWeight='semibold'
              mb='1.5rem'
            >
              Legal
            </Box>
            <Box as='li'>Privacy Policy</Box>
            <Box as='li'>
              Terms and Conditions
            </Box>
            <Box as='li'>Cookies</Box>
          </Box>
        </Flex>
      </Flex>
      <Separator
        my='4rem 2rem'
        color='brand300'
        size='sm'
        w='100%'
      />
      <Box>
        <Text>© ihlonne</Text>
      </Box>
    </Flex>
  );
};

export default Footer;
