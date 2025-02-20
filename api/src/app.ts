import express, { Request, Response } from 'express';
import { env } from './env';
import { logger } from './middlewares/logger';
import { connectDB } from './lib/db';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';
import categoryRoutes from './routes/category.routes';
import transactionRoutes from './routes/transaction.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const port = env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', env.ALLOWED_ORIGIN!],
  })
);

app.use('/auth', authRoutes);
app.use('/', accountRoutes);
app.use('/categories', categoryRoutes);
app.use(transactionRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Kamu keren bg');
});

app.listen(port, () => {
  console.log('Server running on port: ' + port);
  connectDB();
});

export default app;
