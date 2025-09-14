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
import { Link } from 'react-router';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLogout,
}) => {
  return (
    <Box
      position='absolute'
      bg='white'
      p='4'
      maxW='200px'
      w='100%'
      right='20rem'
      border='1px solid #eee'
      rounded='md'
      zIndex='3000'
    >
      <Stack>
        <Link to='/profile'>
          <Flex alignItems='center' gap='2'>
            <Icon as={RiUser3Fill} />
            <Text> My Profile</Text>
          </Flex>
        </Link>
        <Link to='/venues'>
          <Flex alignItems='center' gap='2'>
            <Icon as={FaCalendarAlt} />
            <Text> My Bookings</Text>
          </Flex>
        </Link>
        <Separator w='full' />
        <Link to='venues'>
          <Flex alignItems='center' gap='2'>
            <Icon as={IoIosBrowsers} />
            <Text> Browse Venues</Text>
          </Flex>
        </Link>
        <Separator w='full' />
        <Flex
          alignItems='center'
          gap='2'
          onClick={onLogout}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' ||
              e.key === ' '
            )
              onLogout();
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
