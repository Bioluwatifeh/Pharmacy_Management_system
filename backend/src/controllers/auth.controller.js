import { supabase } from '../config/supabaseClient.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  res.json({
    accessToken: data.session.access_token,
    user: data.user
  });
};

export const logout = async (req, res) => {
  await supabase.auth.signOut();
  res.json({ message: 'Logged out successfully' });
};


export const registerWholesaleCustomer = async (req, res) => {
  try {
    const { email, password, business_name, phone } = req.body;

    if (!email || !password || !business_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 1️⃣ Create auth user
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password
      });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // 2️⃣ Get WHOLESALE_CUSTOMER role
    const { data: role } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'WHOLESALE_CUSTOMER')
      .single();

    // 3️⃣ Insert into users table
    await supabase.from('users').insert({
      id: authData.user.id,
      full_name: business_name,
      role_id: role.id
    });

    // 4️⃣ Insert into customers table (PENDING)
    await supabase.from('customers').insert({
      name: business_name,
      phone,
      customer_type: 'WHOLESALE',
      status: 'PENDING'
    });

    res.status(201).json({
      message: 'Registration successful. Await admin approval.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

