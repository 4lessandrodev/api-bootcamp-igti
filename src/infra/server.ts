import express from 'express';
import accountRoutes from '../interface/routes/account';
import { errorMiddleware } from './middlewares/routerErrors';

const app = express();
app.use(express.json());

app.use('/api/accounts/', accountRoutes);
app.use(errorMiddleware);

app.listen(3000, () => console.log('server running on http://localhost:3000'));
export default app;
