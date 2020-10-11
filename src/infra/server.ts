import express from 'express';
import accountRoutes from '../interface/routes/account';
import { env } from './config/env';
import { logger } from './middlewares/loggerMiddleware';
import { errorMiddleware } from './middlewares/routerErrorsMiddleware';

const app = express();
app.use(express.json());

app.use('/api/accounts/', accountRoutes);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log(`server running on http://${env.HOST}:${env.PORT}`);
  logger.info(`Server started running on http://${env.HOST}:${env.PORT}`);
});
export default app;
