// Minimal Supabase client wrapper (optional)
const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

let supabase = null;
if (env.SUPABASE_URL && env.SUPABASE_KEY) {
  supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}

module.exports = supabase;
