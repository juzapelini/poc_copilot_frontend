import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, User } from './Service';
import './Style.css';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (token) {
          const data = await fetchUsers(token);
          setUsers(data);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch users';
        setError(errorMessage);
        setTimeout(() => setError(null), 3000);
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, [token]);

  const handleDelete = async (userId: string) => {
    try {
      if (token) {
        await deleteUser(token, userId);
        setUsers(users.filter(user => user._id !== userId));
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete user';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      {error && <div className="error-message">{error}</div>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Nickname</th>
            <th>Roles</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleDelete(user._id)}>
                  <span role="img" aria-label="delete">❌</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;