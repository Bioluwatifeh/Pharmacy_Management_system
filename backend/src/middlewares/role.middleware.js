import { supabase } from '../config/supabaseClient.js';

export const allowRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    const { data, error } = await supabase
      .from('users')
      .select('roles(name)')
      .eq('id', req.user.id)
      .single();

    if (error || !allowedRoles.includes(data.roles.name)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
