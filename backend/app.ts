import express from 'express';
import generateRouter from './routes/generate'
import rateLimit from 'express-rate-limit';

const app = express();
app.set('trust proxy', 1)
const cors = require('cors');

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'rate_limit_exceeded', message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://cross-stitch-ai.pages.dev']}));

app.use('/api/generate', generateLimiter, generateRouter );

export default app;