import React, { useEffect, useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  interface User {
    _id: string;
    fullName: string;
    nickname: string;
    roles: string[];
    phone: string;
    email: string;
  }
  
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="user-management-container">
      <h1>Gestão de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Nome Completo</th>
            <th>Apelido</th>
            <th>Funções</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.nickname}</td>
              <td>{user.roles.join(', ')}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;