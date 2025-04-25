import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import NotchNavbar from '@/components/NotchNavbar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <NotchNavbar />
      <Box as="main" p={8}>
        {children}
      </Box>
    </>
  );
}
