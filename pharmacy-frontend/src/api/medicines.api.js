export const getMedicines = async (token) => {
  const res = await fetch('http://localhost:5000/api/medicines', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to load medicines');
  }

  return res.json();
};
