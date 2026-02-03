const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

module.exports = {
  PORT: process.env.PORT || 3000,
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me'
};
