import { Router } from 'express';
import userRouter from './User';
import favListRouter from './FavList';

const rootRouter = Router();

rootRouter.use('/', userRouter);
rootRouter.use('/favs', favListRouter);

export default rootRouter;
