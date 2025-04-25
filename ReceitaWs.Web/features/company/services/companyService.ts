import axios from '@/lib/axiosInstance';

export async function registerCompany(cnpj: string) {
  return axios.post(`/api/Company/register?cnpj=${cnpj}`);
}

export async function getAllCompanies() {
  return axios.get('/api/Company/GetAll');
}

export async function updateCompany(id: string, updateData: {
  tradeName: string;
  status: string;
  mainActivity: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) {
  return axios.put(`/api/Company/update/${id}`, updateData);
}

export async function deleteCompany(id: string) {
  return axios.delete(`/api/Company/delete/${id}`);
}