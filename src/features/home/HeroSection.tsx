import { Box, Heading } from '@chakra-ui/react';

import hero from '../../assets/heroImage.jpg';
import { useNavigate } from 'react-router';
import Search from '../search/Search';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      position='relative'
      backgroundImage={`url(${hero})`}
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      h='100vh'
      w='100%'
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: 'blackAlpha.600',
      }}
    >
      <Box
        position='relative'
        zIndex={1}
        textAlign='center'
        justifyContent='center'
        color='white'
        mx='auto'
        maxW='1290px'
        w={{ base: '90%', md: 'full' }}
      >
        <Heading
          as='h1'
          fontSize='5xl'
          mb={6}
          fontStyle='italic'
        >
          Where to next?
        </Heading>
        <Box>
          <Search
            defaultValue=''
            onSubmit={(q) =>
              navigate(
                q
                  ? `/venues?q=${encodeURIComponent(
                      q
                    )}`
                  : `/venues`
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
