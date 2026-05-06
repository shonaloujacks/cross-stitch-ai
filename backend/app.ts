import express from 'express';
import generateRouter from './routes/generate'
import rateLimit from 'express-rate-limit';
import router from './routes/generate';

const app = express();
app.set('trust proxy', true)
const cors = require('cors');

const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : (process.env.TEST_RATE_LIMIT ? 3 : 1000),
  message: { error: 'rate_limit_exceeded', message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: process.env.NODE_ENV === 'production'} 
})

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://cross-stitch-ai.com']}));

app.use('/api/generate', generateLimiter, generateRouter );

app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  })
})
export default app;
