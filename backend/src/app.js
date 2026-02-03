const express = require('express');
require('./config/env');
const errorHandler = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
