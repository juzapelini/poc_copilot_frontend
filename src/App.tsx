import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './modules/login/LoginPage';
import Main from './modules/main/Main';
import UserManagement from './modules/userManagement/UserManagement';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/common/Layout';
import NotFound from './modules/notFound/NotFound'; // Importe o novo componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Layout>
                <Main />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Adicione outras rotas aqui */}
        <Route path="*" element={<NotFound />} /> {/* Rota "catch-all" */}
      </Routes>
    </Router>
  );
};

export default App;