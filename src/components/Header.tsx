import type React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';

import logo from '../assets/darklogo.png';
import { Link, useNavigate } from 'react-router';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from './layout/Navbar';
import { AuthModal } from '../features/auth/AuthModal';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isProfileNavOpen, setIsProfileNavOpen] =
    useState(false);

  // auth modal state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<
    'login' | 'register'
  >('login');

  const menuRef = useRef<HTMLDivElement | null>(
    null
  );
  const avatarRef = useRef<HTMLDivElement | null>(
    null
  );

  const [isMobile] = useMediaQuery([
    '(min-width: 768px)',
  ]);

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
      zIndex='3000'
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
          {isMobile && (
            <Box as='li' fontWeight='semibold'>
              <Link to='/venues'>
                Browse Venues
              </Link>
            </Box>
          )}

          {!user ? (
            <Flex alignItems='center' gap='10'>
              {/* Register shortcut */}
              <Box as='li' fontWeight='semibold'>
                <Text
                  onClick={() => {
                    setAuthMode('register');
                    setAuthOpen(true);
                  }}
                  cursor='pointer'
                >
                  List Your Venue
                </Text>
              </Box>
              {/* Login shortcut */}
              <Box
                bg='brand700'
                color='white'
                p='0.25rem 1.25rem'
                rounded='md'
                cursor='pointer'
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
              >
                Log In
              </Box>
            </Flex>
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
                <Box
                  position='relative'
                  ref={menuRef}
                >
                  <Navbar
                    onLogout={handleLogout}
                    onClose={() =>
                      setIsProfileNavOpen(false)
                    }
                  />
                </Box>
              )}
            </Box>
          )}
        </Flex>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          defaultMode={authMode}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
