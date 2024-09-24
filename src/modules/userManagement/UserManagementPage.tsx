import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from './Service';
import './Style.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (token) {
          const data = await fetchUsers(token);
          setUsers(data);
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, [token]);

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-list-item">
            <div className="user-info">
              <span className="user-name">{user.fullName}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="user-roles">
              {user.roles.join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;