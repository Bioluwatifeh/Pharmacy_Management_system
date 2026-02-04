export const createRetailSale = async (token, saleData) => {
  const res = await fetch('http://localhost:5000/api/sales/retail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(saleData)
  });

  if (!res.ok) {
    throw new Error('Sale failed');
  }

  return res.json();
};

export const getRetailSales = async (token) => {
  const res = await fetch('http://localhost:5000/api/sales/retail', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch sales');
  }

  return res.json();
};

export const getRetailSaleById = async (token, saleId) => {
  const res = await fetch(
    `http://localhost:5000/api/sales/retail/${saleId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch sale');
  }

  return res.json();
};
