import { supabase } from '../config/supabaseClient.js';

export const createUser = async (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;

    if (!email || !password || !role || !full_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 1️⃣ Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // 2️⃣ Get role ID
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', role)
      .single();

    if (roleError) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // 3️⃣ Insert into users table
    const { error: userError } = await supabase.from('users').insert({
      id: authData.user.id,
      full_name,
      role_id: roleData.id
    });

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    res.status(201).json({
      message: 'User created successfully',
      user_id: authData.user.id
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};
