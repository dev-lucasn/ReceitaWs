import { useCallback, useEffect, useState } from 'react';
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService';
import { CreateUserRequest, UserResponse } from '../userTypes';

export const useUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateUserRequest>({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetForm = () => {
    setForm({ username: '', email: '', password: '', role: '' });
    setEditingId(null);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateUser(editingId, form);
    } else {
      await createUser(form);
    }
    await fetchUsers();
    resetForm();
  };

  const handleEdit = (user: UserResponse) => {
    setEditingId(user.id);
    setForm({ ...user, password: '' });
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    form,
    editingId,
    setForm,
    handleSave,
    handleEdit,
    handleDelete,
    resetForm,
  };
};