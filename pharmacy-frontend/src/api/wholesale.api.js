export const createWholesaleOrder = async (token, items) => {
  const res = await fetch('http://localhost:5000/api/wholesale-orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items })
  });

  if (!res.ok) {
    throw new Error('Failed to place order');
  }

  return res.json();
};

export const getMyWholesaleOrders = async (token) => {
  const res = await fetch(
    'http://localhost:5000/api/wholesale-orders/my',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }

  return res.json();
};
