import { supabase } from '../config/supabaseClient.js';

export const getMedicines = async (req, res) => {
  const { data, error } = await supabase
    .from('medicines')
    .select('id, name')
    .order('name');

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};
