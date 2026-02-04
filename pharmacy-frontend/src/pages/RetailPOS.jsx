import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createRetailSale } from '../api/sales.api';
import { getMedicines } from '../api/medicines.api';

const RetailPOS = () => {
  const { token } = useContext(AuthContext);

  const [medicines, setMedicines] = useState([]);
  const [items, setItems] = useState([
    { medicine_id: '', quantity: 1, price: 0 }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const data = await getMedicines(token);
        setMedicines(data);
      } catch {
        setMessage('Failed to load medicines');
      }
    };

    loadMedicines();
  }, [token]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { medicine_id: '', quantity: 1, price: 0 }]);
  };

  const submitSale = async () => {
    try {
      await createRetailSale(token, {
        items,
        payment_method: paymentMethod
      });

      setMessage('Sale completed successfully');
      setItems([{ medicine_id: '', quantity: 1, price: 0 }]);
    } catch {
      setMessage('Sale failed');
    }
  };

  return (
    <div>
      <h2>Retail POS</h2>

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
            placeholder="Qty"
            value={item.quantity}
            onChange={e =>
              handleChange(i, 'quantity', Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={e =>
              handleChange(i, 'price', Number(e.target.value))
            }
          />
        </div>
      ))}

      <button onClick={addItem}>Add Item</button>

      <div>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <button onClick={submitSale}>Complete Sale</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default RetailPOS;
