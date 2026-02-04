import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);

  if (!token) return null;

  return (
    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <span>
        Logged in as: <strong>{role}</strong>
      </span>

      <button
        style={{ marginLeft: '20px' }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
