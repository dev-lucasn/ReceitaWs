import axios from '@/lib/axiosInstance';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  LoginRequest,
} from '../userTypes';

export async function createUser(payload: CreateUserRequest) {
  const { data } = await axios.post('/api/Auth/register', payload);
  return data;
}

export async function updateUser(id: string, payload: UpdateUserRequest) {
  const { data } = await axios.put(`/api/Auth/Update?id=${id}`, payload);
  return data;
}

export async function loginUser(credentials: LoginRequest) {
  const { data } = await axios.post('/api/Auth/login', credentials);
  return data;
}

export async function listUsers(): Promise<UserResponse[]> {
  const { data } = await axios.get('/api/Auth/GetAll');
  return Array.isArray(data) ? data : data.users;
}

export async function deleteUser(id: string) {
  const { data } = await axios.delete(`/api/Auth/${id}`);
  return data;
}