import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Button,
  Switch,
  Icon,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Stack,
} from '@chakra-ui/react';
import {
  FiLogOut,
  FiSun,
  FiMoon,
  FiUsers,
  FiBriefcase,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import useAuth from '@/features/login/hooks/useAuth';

export default function NotchNavbar() {
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    logout();                         
    router.replace('/login');    
  };
  
  return (
    <Box as="header" px={4} mt={5} zIndex={10}>
      <Box
        bg={bg}
        borderRadius="full"
        boxShadow="lg"
        border="1px solid"
        borderColor={borderColor}
        px={6}
        py={4}
        maxW="6xl"
        mx="auto"
      >
        <Flex align="center" justify="space-between" wrap="wrap">
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="bold"
            color="blue.500"
          >
            ReceitaWs
          </Text>

          <IconButton
            aria-label="Abrir menu"
            icon={<FiMenu />}
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
          />

          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            <Button
              leftIcon={<FiBriefcase />}
              variant="ghost"
              onClick={() => router.push('/empresa')}
              colorScheme="blue"
            >
              Empresas
            </Button>
            <Button
              leftIcon={<FiUsers />}
              variant="ghost"
              onClick={() => router.push('/usuarios')}
              colorScheme="purple"
            >
              Usuários
            </Button>
          </HStack>

          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Flex align="center" gap={2}>
              <Icon
                as={colorMode === 'light' ? FiSun : FiMoon}
                color={colorMode === 'light' ? 'yellow.500' : 'blue.300'}
                boxSize={5}
              />
              <Switch
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                colorScheme="yellow"
                aria-label="Alternar modo de cor"
              />
            </Flex>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Abrir configurações"
                icon={<FiSettings />}
                variant="outline"
                size="md"
              />
              <MenuList>
                <MenuItem
                  icon={<Icon as={FiLogOut} color="red.500" />}
                  onClick={handleLogout}
                >
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack spacing={6} align="start">
              <Button
                leftIcon={<FiBriefcase />}
                variant="ghost"
                colorScheme="blue"
                onClick={() => {
                  router.push('/empresa');
                  onClose();
                }}
              >
                Empresas
              </Button>
              <Button
                leftIcon={<FiUsers />}
                variant="ghost"
                colorScheme="purple"
                onClick={() => {
                  router.push('/usuarios');
                  onClose();
                }}
              >
                Usuários
              </Button>
              <Flex
                align="center"
                gap={3}
                w="full"
                justifyContent="flex-start"
                >
                <Icon
                    as={colorMode === 'light' ? FiSun : FiMoon}
                    color={colorMode === 'light' ? 'yellow.500' : 'blue.300'}
                    boxSize={5}
                    marginLeft={4}
                />
                Dark Mode
                <Switch
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode}
                    colorScheme="yellow"
                    size="lg"
                    aria-label="Alternar modo de cor"
                />
                </Flex>
              <Button
                leftIcon={<FiLogOut />}
                colorScheme="red"
                variant="ghost"
                onClick={handleLogout}
              >
                Sair
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}