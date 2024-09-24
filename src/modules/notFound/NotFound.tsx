import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/main">Voltar para a Home</Link>
    </div>
  );
};

export default NotFound;