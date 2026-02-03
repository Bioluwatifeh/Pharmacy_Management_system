export const approveWholesaleCustomer = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('customers')
    .update({ status: 'APPROVED' })
    .eq('id', id);

  res.json({ message: 'Wholesale customer approved' });
};

export const rejectWholesaleCustomer = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('customers')
    .update({ status: 'REJECTED' })
    .eq('id', id);

  res.json({ message: 'Wholesale customer rejected' });
};


import { supabase } from '../config/supabaseClient.js';

export const getPendingWholesaleCustomers = async (req, res) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('customer_type', 'WHOLESALE')
    .eq('status', 'PENDING');

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};

