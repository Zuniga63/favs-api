import { Router } from 'express';
import userRouter from './User';
import favListRouter from './FavList';

const rootRouter = Router();

rootRouter.use('/auth/local', userRouter);
rootRouter.use('/api/favs', favListRouter);

export default rootRouter;
