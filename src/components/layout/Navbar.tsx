import {
  Box,
  Flex,
  Icon,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { RiUser3Fill } from 'react-icons/ri';
import { LuLogOut } from 'react-icons/lu';
import { IoIosBrowsers } from 'react-icons/io';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useRef } from 'react';

interface NavbarProps {
  onLogout: () => void;
  onClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLogout,
  onClose,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const menuRef = useRef<HTMLDivElement | null>(
    null
  );
  return (
    <Box
      ref={menuRef}
      position='absolute'
      top='100%'
      right={0}
      mt='0.5rem'
      bg='white'
      p='4'
      w='200px'
      border='1px solid #eee'
      rounded='md'
      boxShadow='0 8px 24px rgba(18, 13, 30, 0.15)'
      zIndex='3000'
    >
      <Stack>
        <Flex
          alignItems='center'
          gap='2'
          onClick={() => {
            handleNavigation(
              `/profile/${user?.name}`
            );
            onClose();
          }}
          cursor='pointer'
        >
          <Icon as={RiUser3Fill} />
          <Text> My Profile</Text>
        </Flex>
        <Flex
          alignItems='center'
          gap='2'
          onClick={() => {
            handleNavigation(
              `/profile/${user?.name}`
            );
            onClose();
          }}
          cursor='pointer'
        >
          <Icon as={FaCalendarAlt} />
          <Text> My Bookings</Text>
        </Flex>
        <Separator
          borderColor='brand300'
          w='100%'
        />
        <Link to='venues'>
          <Flex
            alignItems='center'
            gap='2'
            onClick={() => {
              handleNavigation(`/venues`);
              onClose();
            }}
            cursor='pointer'
          >
            <Icon as={IoIosBrowsers} />
            <Text> Browse Venues</Text>
          </Flex>
        </Link>
        <Separator
          borderColor='brand300'
          w='100%'
        />
        <Flex
          cursor='pointer'
          alignItems='center'
          gap='2'
          onClick={() => {
            onLogout();
            onClose();
          }}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' ||
              e.key === ' '
            ) {
              onLogout();
              onClose();
            }
          }}
        >
          <Icon as={LuLogOut} />
          <Text> Logout</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Navbar;
