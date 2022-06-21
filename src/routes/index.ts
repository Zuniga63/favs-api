import { Router } from 'express';
import userRouter from './User';
import favListRouter from './FavList';
import isAuthenticated from '../utils/isAuthenticated';

const rootRouter = Router();

rootRouter.use('/auth/local', userRouter);
rootRouter.use('/api/favs', isAuthenticated, favListRouter);

export default rootRouter;
