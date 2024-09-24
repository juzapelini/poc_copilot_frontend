import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/users/isLoggedIn', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    checkToken();
  }, [navigate, token]);

  return (
    <div className="main-container">
      <h1>Bem-vindo!</h1>
      {email && <p>Você está logado como: {email}</p>}
    </div>
  );
};

export default Main;