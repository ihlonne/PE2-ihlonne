import type React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

/* import logo from '../assets/lightlogo.png'; */
import logo from '../assets/darklogo.png';
import { Link } from 'react-router';
import { useState } from 'react';
import CustomModal from './CustomModal';
import { RegisterForm } from '../features/auth/RegisterForm';
import { LoginForm } from '../features/auth/LoginForm';

const Header: React.FC = () => {
  const [registerOpen, setRegisterOpen] =
    useState(false);
  const [loginOpen, setLoginOpen] =
    useState(false);

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
          <Text
            onClick={() => setRegisterOpen(true)}
          >
            List Your Venue
          </Text>
        </Box>
        <Box
          bg='brand700'
          color='white'
          p='0.25rem 1.25rem'
          rounded='md'
          cursor='pointer'
          onClick={() => setLoginOpen(true)}
        >
          Log In
        </Box>
        <CustomModal
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
          title='Create account'
        >
          <RegisterForm
            onSuccess={() =>
              setRegisterOpen(false)
            }
          />
        </CustomModal>
        <CustomModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          title='Login to your account'
        >
          <LoginForm
            onSuccess={() => setLoginOpen(false)}
          />
        </CustomModal>
      </Flex>
    </Box>
  );
};

export default Header;
