import {
  Box,
  Container,
  Heading,
} from '@chakra-ui/react';

import Search from '../../features/search/Search';
import hero from '../../assets/heroImage.jpg';
import { useNavigate } from 'react-router';

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
      <Container
        position='relative'
        zIndex={1}
        textAlign='center'
        color='white'
      >
        <Heading
          as='h1'
          fontSize='5xl'
          mb={6}
          fontStyle='italic'
        >
          Where to next?
        </Heading>
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
      </Container>
    </Box>
  );
};

export default HeroSection;
