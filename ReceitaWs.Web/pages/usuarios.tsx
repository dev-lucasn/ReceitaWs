import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/features/login/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import {
  Box,
  Heading,
  Spinner,
  VStack,
  Center,
  Text,
} from '@chakra-ui/react';

import { useUsers } from '@/features/users/hooks/useUsers';
import { UserForm } from '@/features/users/components/UserForm';
import { UserListItem } from '@/features/users/components/UserListItem';

export default function UsuariosPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [sessionLoading, setSessionLoading] = useState(true);

  const {
    users,
    loading,
    form,
    editingId,
    setForm,
    handleEdit,
    handleDelete,
    handleSave,
    resetForm,
  } = useUsers();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    } else {
      setSessionLoading(false);
    }
  }, [token, router]);

  if (sessionLoading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
        <Text ml={4}>Verificando sessão...</Text>
      </Center>
    );
  }

  return (
    <MainLayout>
      <Heading mb={6}>Usuários</Heading>

      <UserForm
        form={form}
        isEditing={!!editingId}
        onChange={(field, value) =>
          setForm((prev) => ({ ...prev, [field]: value }))
        }
        onSave={handleSave}
        onCancel={resetForm}
      />

      {loading ? (
        <Spinner mt={6} />
      ) : (
        <VStack spacing={4} mt={6}>
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </VStack>
      )}
    </MainLayout>
  );
}