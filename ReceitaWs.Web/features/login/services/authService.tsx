import api from '@/lib/axiosInstance';
import { LoginRequest, LoginResponse } from '../loginTypes';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/Auth/login', data);
  return response.data;
}
