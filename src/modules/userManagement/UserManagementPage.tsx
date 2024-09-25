import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, createUser, User, CreateUserRequest } from './Service';
import './Style.css';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    fullName: '',
    nickname: '',
    roles: [],
    phone: '',
    email: '',
    password: '',
  });
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
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
      console.error('Failed to delete user:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      roles: value.split(',').map(role => role.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        await createUser(token, formData);
        setFormData({
          fullName: '',
          nickname: '',
          roles: [],
          phone: '',
          email: '',
          password: '',
        });
        const data = await fetchUsers(token);
        setUsers(data);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
      console.error('Failed to create user:', error);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      const roles = checked
        ? [...prevState.roles, value]
        : prevState.roles.filter(role => role !== value);
      return { ...prevState, roles };
    });
  };

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      {error && <div className="error">{error}</div>}
      <h3>Cadastrar novo usuário</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="form-input"
          required
        />
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          placeholder="Nickname"
          className="form-input"
          required
        />
         <div className="form-group">
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="roles"
                value="Gerente"
                checked={formData.roles.includes('Gerente')}
                onChange={handleCheckboxChange}
              />
              Gerente
            </label>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="Secretário"
                checked={formData.roles.includes('Secretário')}
                onChange={handleCheckboxChange}
              />
              Secretário
            </label>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="Outro"
                checked={formData.roles.includes('Outro')}
                onChange={handleCheckboxChange}
              />
              Outro
            </label>
          </div>
        </div>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="form-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
      <h3>Lista de usuários cadastrados</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{user._id}</td>
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


