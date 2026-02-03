import { supabase } from '../config/supabaseClient.js';

export const createRetailSale = async (req, res) => {
  try {
    const { items, payment_method } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Sale items required' });
    }

    // 1️⃣ Calculate total
    const totalAmount = items.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0
    );

    // 2️⃣ Create sale
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        sale_type: 'RETAIL',
        total_amount: totalAmount
      })
      .select()
      .single();

    if (saleError) {
      return res.status(400).json({ message: saleError.message });
    }

    // 3️⃣ Insert sale items
    const saleItems = items.map(i => ({
      sale_id: sale.id,
      medicine_id: i.medicine_id,
      quantity: i.quantity,
      price: i.price
    }));

    await supabase.from('sale_items').insert(saleItems);

    // 4️⃣ Deduct stock (simple OUT movement)
    for (const item of items) {
      await supabase.from('inventory_movements').insert({
        movement_type: 'OUT',
        quantity: item.quantity,
        reference: `RETAIL_SALE_${sale.id}`
      });
    }

    // 5️⃣ Record payment (full payment only)
    await supabase.from('payments').insert({
      sale_id: sale.id,
      amount: totalAmount,
      payment_method,
      payment_status: 'PAID'
    });

    // 6️⃣ Generate invoice
    const invoiceNumber = `INV-${Date.now()}`;

    await supabase.from('invoices').insert({
      sale_id: sale.id,
      invoice_number: invoiceNumber
    });

    res.status(201).json({
      message: 'Retail sale completed',
      sale_id: sale.id,
      invoice_number: invoiceNumber,
      total: totalAmount
    });
  } catch (err) {
    res.status(500).json({ message: 'Retail sale failed' });
  }
};
 


export const getRetailSales = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('sale_type', 'RETAIL')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch retail sales' });
  }
};

export const getRetailSaleById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      sale_items (
        medicine_id,
        quantity,
        price
      )
    `)
    .eq('id', id)
    .eq('sale_type', 'RETAIL')
    .single();

  if (error) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.json(data);
};

