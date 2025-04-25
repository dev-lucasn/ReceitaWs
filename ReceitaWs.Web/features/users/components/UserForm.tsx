import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react';
import { CreateUserRequest } from '../userTypes';

interface Props {
  form: CreateUserRequest;
  isEditing: boolean;
  onChange: (field: keyof CreateUserRequest, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const UserForm = ({ form, isEditing, onChange, onSave, onCancel }: Props) => {
  return (
    <Box p={4} border="1px solid" borderRadius="md">
      <Stack spacing={3}>
        <Input placeholder="Username" value={form.username} onChange={(e) => onChange('username', e.target.value)} />
        <Input placeholder="Email" type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
        <Input placeholder="Senha" type="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} />
        <Input placeholder="Role" value={form.role} onChange={(e) => onChange('role', e.target.value)} />
        <Flex gap={3}>
          <Button colorScheme="blue" onClick={onSave}>
            {isEditing ? 'Salvar' : 'Cadastrar'}
          </Button>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        </Flex>
      </Stack>
    </Box>
  );
};