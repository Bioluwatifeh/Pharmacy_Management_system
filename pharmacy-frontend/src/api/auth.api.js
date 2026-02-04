export const loginUser = async (email, password) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  return res.json();
};

export const getCurrentUser = async (token) => {
  const res = await fetch('http://localhost:5000/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
};
