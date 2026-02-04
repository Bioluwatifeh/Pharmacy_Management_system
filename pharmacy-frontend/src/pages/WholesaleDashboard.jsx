import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  createWholesaleOrder,
  getMyWholesaleOrders
} from '../api/wholesale.api';
import { getMedicines } from '../api/medicines.api';

const WholesaleDashboard = () => {
  const { token } = useContext(AuthContext);

  const [medicines, setMedicines] = useState([]);
  const [items, setItems] = useState([
    { medicine_id: '', quantity: 1 }
  ]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  // Load medicines + my orders
  useEffect(() => {
    const loadData = async () => {
      try {
        const meds = await getMedicines(token);
        setMedicines(meds);

        const myOrders = await getMyWholesaleOrders(token);
        setOrders(myOrders);
      } catch {
        setMessage('Failed to load data');
      }
    };

    loadData();
  }, [token]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { medicine_id: '', quantity: 1 }]);
  };

  const placeOrder = async () => {
    try {
      await createWholesaleOrder(token, items);
      setMessage('Wholesale order placed successfully');
      setItems([{ medicine_id: '', quantity: 1 }]);

      // Refresh orders
      const myOrders = await getMyWholesaleOrders(token);
      setOrders(myOrders);
    } catch {
      setMessage('Order failed');
    }
  };

  return (
    <div>
      <h2>Wholesale Dashboard</h2>

      {message && <p>{message}</p>}

      <h3>Place Wholesale Order</h3>

      {items.map((item, i) => (
        <div key={i}>
          <select
            value={item.medicine_id}
            onChange={e =>
              handleChange(i, 'medicine_id', e.target.value)
            }
          >
            <option value="">Select medicine</option>
            {medicines.map(med => (
              <option key={med.id} value={med.id}>
                {med.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={item.quantity}
            onChange={e =>
              handleChange(i, 'quantity', Number(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={addItem}>Add Item</button>
      <button onClick={placeOrder}>Place Order</button>

      <h3 style={{ marginTop: '30px' }}>My Orders</h3>

      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id} — Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WholesaleDashboard;
