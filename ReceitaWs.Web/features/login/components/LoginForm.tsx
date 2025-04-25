'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/authService';
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const setAuth = useAuth((s) => s.setAuth);
  const toast = useToast();

  useEffect(() => {
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) return;

      const parsed = JSON.parse(userJson);
      if (parsed?.username) setUsername(parsed.username);
      if (parsed?.rememberMe) setRememberMe(parsed.rememberMe);
    } catch {
      localStorage.removeItem('user');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token, user } = await login({ username, password });

      if (rememberMe) {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify({ ...user, rememberMe }));
      } else {
        sessionStorage.setItem('jwtToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      setAuth(token, user);
      router.replace('/empresa');
    } catch {
      toast({
        title: 'Erro de login',
        description: 'Usuário ou senha inválidos',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      w="100vw"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl">Acessar sua conta</Heading>
            <Text fontSize="lg" color="gray.600">
              para acessar o sistema{' '}
              <Text as="span" color="blue.400">
                ReceitaWs
              </Text>{' '}
              🚀
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Usuário</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10}>
                <Checkbox
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Lembrar de mim
                </Checkbox>

                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: 'blue.500' }}
                >
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}