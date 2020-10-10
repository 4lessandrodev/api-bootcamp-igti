import express from 'express';
import accoutRoutes from '../interface/routes/account';

const app = express();
app.use(express.json());

app.use(accoutRoutes);

app.listen(3000, () => console.log('server running on http://localhost:3000'));
export default app;
