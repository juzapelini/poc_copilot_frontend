import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken, login } from './Service';
import './Style.css'; // Certifique-se de que o caminho está correto

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      const isValid = await checkToken(token);
      if (isValid) {
        navigate('/main', { state: { email: 'user@example.com' } });
      }
    };

    validateToken();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/main', { state: { email } });
      } else {
        setError(response.message || 'Invalid email or password');
        setTimeout(() => setError(''), 3000); // Limpa a mensagem de erro após 3 segundos
      }
    } catch (err) {
      setError('An error occurred during login');
      setTimeout(() => setError(''), 3000); // Limpa a mensagem de erro após 3 segundos
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;