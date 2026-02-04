import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;
