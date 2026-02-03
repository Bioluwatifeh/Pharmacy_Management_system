import { supabase } from '../config/supabaseClient.js';

export const getInvoiceBySaleId = async (req, res) => {
  const { saleId } = req.params;

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('sale_id', saleId)
    .single();

  if (error) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  res.json(data);
};
