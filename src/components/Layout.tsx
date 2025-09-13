import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box as='main'>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
