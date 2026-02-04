import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import RetailPOS from './pages/RetailPOS';
import WholesaleDashboard from './pages/WholesaleDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const AppContent = () => {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Login />;

  if (role === 'ADMIN') return <AdminDashboard />;
  if (role === 'CASHIER') return <RetailPOS />;
  if (role === 'WHOLESALE_CUSTOMER') return <WholesaleDashboard />;

  return <p>No dashboard assigned for this role.</p>;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
