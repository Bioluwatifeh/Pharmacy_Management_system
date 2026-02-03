const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

exports.login = async ({ email }) => {
  // placeholder - implement real authentication
  const token = jwt.sign({ email, role: 'user' }, JWT_SECRET);
  return { token };
};

exports.register = async (data) => {
  // placeholder
  return { id: 'new-id', ...data };
};
