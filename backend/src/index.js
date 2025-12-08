import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRouter from './routes/salesRoutes.js';
import { loadSalesData } from './utils/csvLoader.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Load CSV once at startup
await loadSalesData();

// Routes
app.use('/api/sales', salesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
