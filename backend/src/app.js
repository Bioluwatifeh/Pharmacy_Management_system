import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', routes);

// Health check (optional but helpful)
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

export default app;
