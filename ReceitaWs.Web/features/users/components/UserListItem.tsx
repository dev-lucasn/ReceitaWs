import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { UserResponse } from '../userTypes';

interface Props {
  user: UserResponse;
  onEdit: (user: UserResponse) => void;
  onDelete: (id: string) => void;
}

export const UserListItem = ({ user, onEdit, onDelete }: Props) => {
  return (
    <Box p={4} border="1px solid" borderRadius="md">
      <Text fontWeight="bold">{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>Role: {user.role}</Text>
      <Flex mt={3} gap={2}>
        <Button size="sm" onClick={() => onEdit(user)}>Editar</Button>
        <Button size="sm" colorScheme="red" variant="outline" onClick={() => onDelete(user.id)}>Excluir</Button>
      </Flex>
    </Box>
  );
};
