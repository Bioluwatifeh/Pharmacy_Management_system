export const getInvoiceBySaleId = async (token, saleId) => {
  const res = await fetch(
    `http://localhost:5000/api/invoices/${saleId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch invoice');
  }

  return res.json();
};
