import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getRetailSales, getRetailSaleById } from '../api/sales.api';
import { getInvoiceBySaleId } from '../api/invoice.api';

const SalesHistory = () => {
  const { token } = useContext(AuthContext);

  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');

  // Load all retail sales
  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await getRetailSales(token);
        setSales(data);
      } catch {
        setError('Could not load sales');
      }
    };

    loadSales();
  }, [token]);

  // View sale details
  const viewSale = async (saleId) => {
    try {
      const data = await getRetailSaleById(token, saleId);
      setSelectedSale(data);
      setInvoice(null); // reset invoice when switching sale
    } catch {
      setError('Could not load sale details');
    }
  };

  // View invoice
  const viewInvoice = async (saleId) => {
    try {
      const data = await getInvoiceBySaleId(token, saleId);
      setInvoice(data);
    } catch {
      setError('Could not load invoice');
    }
  };

  return (
    <div>
      <h2>Retail Sales History</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            <span>
              {new Date(sale.created_at).toLocaleString()} — ₹{sale.total_amount}
            </span>

            <button onClick={() => viewSale(sale.id)}>
              View Sale
            </button>

            <button onClick={() => viewInvoice(sale.id)}>
              View Invoice
            </button>
          </li>
        ))}
      </ul>

      {selectedSale && (
        <div style={{ marginTop: '20px' }}>
          <h3>Sale Details</h3>
          <p><strong>Sale ID:</strong> {selectedSale.id}</p>

          <ul>
            {selectedSale.sale_items.map((item, index) => (
              <li key={index}>
                Medicine ID: {item.medicine_id} | Qty: {item.quantity} | Price: ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {invoice && (
        <div style={{ marginTop: '20px' }}>
          <h3>Invoice</h3>
          <p><strong>Invoice Number:</strong> {invoice.invoice_number}</p>
          <p>
            <strong>Created At:</strong>{' '}
            {new Date(invoice.created_at).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
