import type React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

/* import logo from '../assets/lightlogo.png'; */
import logo from '../assets/darklogo.png';
import { Link, useNavigate } from 'react-router';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import CustomModal from './CustomModal';
import { RegisterForm } from '../features/auth/RegisterForm';
import { LoginForm } from '../features/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';
import Navbar from './layout/Navbar';

const Header: React.FC = () => {
  const [registerOpen, setRegisterOpen] =
    useState(false);
  const [loginOpen, setLoginOpen] =
    useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isProfileNavOpen, setIsProfileNavOpen] =
    useState(false);

  const menuRef = useRef<HTMLDivElement | null>(
    null
  );
  const avatarRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      const target = e.target as Node;
      if (
        isProfileNavOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        avatarRef.current &&
        !avatarRef.current.contains(target)
      ) {
        setIsProfileNavOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, [isProfileNavOpen]);

  const handleLogout = () => {
    logout();
    setIsProfileNavOpen(false);
    navigate('/');
  };

  return (
    <Flex
      as='header'
      justifyContent='center'
      w='100%'
      h='100px'
      py='2rem'
      px={{ base: '4', xl: 0 }}
      zIndex='1000'
    >
      <Flex
        justifyContent='space-between'
        w='100%'
        maxW='1290px'
      >
        <Link to='/'>
          <Image src={logo} />
        </Link>
        <Flex
          as='ul'
          listStyleType='none'
          alignItems='center'
          gap='10'
        >
          <Box as='li' fontWeight='semibold'>
            <Link to='/venues'>
              {' '}
              Browse Venues
            </Link>
          </Box>
          {!user ? (
            <Box>
              <Box as='li' fontWeight='semibold'>
                <Text
                  onClick={() =>
                    setRegisterOpen(true)
                  }
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
            </Box>
          ) : (
            <Box>
              <AvatarGroup
                ref={avatarRef}
                onClick={() =>
                  setIsProfileNavOpen(
                    (prev) => !prev
                  )
                }
                cursor='pointer'
                aria-label='Profile menu'
              >
                <Avatar.Root>
                  <Avatar.Fallback
                    name={user.name}
                  />
                  <Avatar.Image
                    src={user.avatar?.url}
                    alt={user.avatar?.alt}
                  />
                </Avatar.Root>
              </AvatarGroup>
              {isProfileNavOpen && (
                <Box ref={menuRef}>
                  <Navbar
                    onLogout={handleLogout}
                  />
                </Box>
              )}
            </Box>
          )}

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
              onSuccess={() =>
                setLoginOpen(false)
              }
            />
          </CustomModal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
