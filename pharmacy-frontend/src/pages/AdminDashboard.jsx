import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getPendingWholesaleCustomers,
  approveWholesaleCustomer,
  rejectWholesaleCustomer,
  createStaffUser
} from '../api/admin.api';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);

  const [pendingCustomers, setPendingCustomers] = useState([]);
  const [message, setMessage] = useState('');

  // Staff user form
  const [staff, setStaff] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'CASHIER'
  });

  // Load pending wholesale customers
  useEffect(() => {
    const loadPending = async () => {
      try {
        const data = await getPendingWholesaleCustomers(token);
        setPendingCustomers(data);
      } catch {
        setMessage('Failed to load pending customers');
      }
    };

    loadPending();
  }, [token]);

  const approve = async (id) => {
    await approveWholesaleCustomer(token, id);
    setPendingCustomers(pendingCustomers.filter(c => c.id !== id));
  };

  const reject = async (id) => {
    await rejectWholesaleCustomer(token, id);
    setPendingCustomers(pendingCustomers.filter(c => c.id !== id));
  };

  const createUser = async () => {
    try {
      await createStaffUser(token, staff);
      setMessage('Staff user created');
      setStaff({ email: '', password: '', full_name: '', role: 'CASHIER' });
    } catch {
      setMessage('Failed to create staff user');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {message && <p>{message}</p>}

      {/* Pending Wholesale Customers */}
      <h3>Pending Wholesale Customers</h3>
      <ul>
        {pendingCustomers.map(c => (
          <li key={c.id}>
            {c.name} ({c.phone})
            <button onClick={() => approve(c.id)}>Approve</button>
            <button onClick={() => reject(c.id)}>Reject</button>
          </li>
        ))}
      </ul>

      {/* Create Staff User */}
      <h3>Create Staff User</h3>

      <input
        placeholder="Full name"
        value={staff.full_name}
        onChange={e =>
          setStaff({ ...staff, full_name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={staff.email}
        onChange={e =>
          setStaff({ ...staff, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={staff.password}
        onChange={e =>
          setStaff({ ...staff, password: e.target.value })
        }
      />

      <select
        value={staff.role}
        onChange={e =>
          setStaff({ ...staff, role: e.target.value })
        }
      >
        <option value="CASHIER">Cashier</option>
        <option value="PHARMACIST">Pharmacist</option>
        <option value="INVENTORY_MANAGER">Inventory Manager</option>
        <option value="WHOLESALE_CUSTOMER">Wholesale Customer</option>
      </select>

      <button onClick={createUser}>Create User</button>

      {/* System Info */}
      <h3>System Info</h3>
      <p>
        Admin operations are handled here.  
        Retail, wholesale, and inventory dashboards are role-specific.
      </p>
    </div>
  );
};

export default AdminDashboard;
