import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="layout-container">
      <nav>
        <ul>
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/user-management">Gestão de Usuários</Link></li>
          {/* Adicione outras rotas aqui */}
          <li><button onClick={handleLogout} className="logout-button">Logoff</button></li>
        </ul>
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;