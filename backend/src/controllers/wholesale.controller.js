import { supabase } from '../config/supabaseClient.js';

export const createWholesaleOrder = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order items required' });
  }

  // 1️⃣ Check customer approval
  const { data: customer } = await supabase
    .from('customers')
    .select('id, status')
    .eq('customer_type', 'WHOLESALE')
    .eq('name', req.user.user_metadata?.full_name)
    .single();

  if (!customer || customer.status !== 'APPROVED') {
    return res.status(403).json({ message: 'Account not approved' });
  }

  // 2️⃣ Create order
  const { data: order, error: orderError } = await supabase
    .from('wholesale_orders')
    .insert({ customer_id: customer.id })
    .select()
    .single();

  if (orderError) {
    return res.status(400).json({ message: orderError.message });
  }

  // 3️⃣ Insert items
  const orderItems = items.map(i => ({
    order_id: order.id,
    medicine_id: i.medicine_id,
    quantity: i.quantity
  }));

  await supabase.from('order_items').insert(orderItems);

  res.status(201).json({
    message: 'Wholesale order placed',
    order_id: order.id
  });
};

export const getMyWholesaleOrders = async (req, res) => {
  const { data } = await supabase
    .from('wholesale_orders')
    .select('*, order_items(*)')
    .eq('customer_id', req.user.id);

  res.json(data);
};

export const getPendingOrders = async (req, res) => {
  const { data } = await supabase
    .from('wholesale_orders')
    .select('*')
    .eq('status', 'PENDING');

  res.json(data);
};

export const approveWholesaleOrder = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('wholesale_orders')
    .update({
      status: 'APPROVED',
      pharmacist_approved: true
    })
    .eq('id', id);

  res.json({ message: 'Order approved' });
};

export const markOrderReady = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('wholesale_orders')
    .update({ status: 'READY' })
    .eq('id', id);

  res.json({ message: 'Order ready for pickup' });
};

export const completeWholesaleOrder = async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('wholesale_orders')
    .update({ status: 'COMPLETED' })
    .eq('id', id);

  res.json({ message: 'Order completed' });
};

