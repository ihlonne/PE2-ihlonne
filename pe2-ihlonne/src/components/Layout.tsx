import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;
