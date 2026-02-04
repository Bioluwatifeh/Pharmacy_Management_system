export const getPendingWholesaleCustomers = async (token) => {
  const res = await fetch(
    'http://localhost:5000/api/customers/pending',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch pending customers');
  }

  return res.json();
};

export const approveWholesaleCustomer = async (token, customerId) => {
  const res = await fetch(
    `http://localhost:5000/api/customers/${customerId}/approve`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Approval failed');
  }
};

export const rejectWholesaleCustomer = async (token, customerId) => {
  const res = await fetch(
    `http://localhost:5000/api/customers/${customerId}/reject`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Rejection failed');
  }
};

export const createStaffUser = async (token, data) => {
  const res = await fetch(
    'http://localhost:5000/api/users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }
  );

  if (!res.ok) {
    throw new Error('Failed to create user');
  }

  return res.json();
};
