import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import subscriberRoutes from './routes/subscriberRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/newsletters', newsletterRoutes);
app.use('/subscribers', subscriberRoutes);
app.use('/subscribe', subscriberRoutes);
app.use('/unsubscribe', subscriberRoutes);
app.use(errorHandler);

export { app };