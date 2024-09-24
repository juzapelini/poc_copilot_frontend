// userService.ts
export interface User {
    _id: string;
    fullName: string;
    nickname: string;
    roles: string[];
    phone: string;
    email: string;
  }
  
  export const fetchUsers = async (token: string): Promise<User[]> => {
    const response = await fetch('http://localhost:5001/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
  
    const data = await response.json();
    return data;
  };