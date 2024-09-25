import AuthenticatedHttpClient from '../../routes/AuthenticatedHttpClient';


export interface User {
  _id: string;
  fullName: string;
  nickname: string;
  roles: string[];
  phone: string;
  email: string;
}

const API_BASE_URL = 'http://localhost:5001';

export const fetchUsers = async (token: string): Promise<User[]> => {
  const client = new AuthenticatedHttpClient(token);
  try {
    const response = await client.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

interface DeleteUserResponse {
  message: string;
}

export const deleteUser = async (token: string, userId: string): Promise<void> => {
  const client = new AuthenticatedHttpClient(token);
  try {
    const response = await client.delete<DeleteUserResponse>(`${API_BASE_URL}/users/${userId}`);
    if (response.data && response.data.message) {
      throw new Error(response.data.message);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('Usuário não encontrado!');
    }
    console.error('::SERVICE:: Failed to delete user:', error);
    throw error;
  }
};