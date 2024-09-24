const Main: React.FC = () => {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  return (
    <div className="main-container">
      <h1>Bem-vindo!</h1>
      {email && <p>Você está logado como: {email}</p>}
      {email && <p>token: {token}</p>}
    </div>
  );
};

export default Main;