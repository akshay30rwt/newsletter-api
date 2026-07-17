import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/newsletters', newsletterRoutes);
app.use('/subscribers', newsletterRoutes);
app.use('/', subscriberRoutes);
app.use(errorHandler);

export default app;