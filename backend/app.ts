import express from 'express';
import generateRouter from './routes/generate'

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173']}));

app.use('/api/generate', generateRouter);

export default app;