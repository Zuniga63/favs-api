import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRouter from './User';
import favListRouter from './FavList';
import isAuthenticated from '../utils/isAuthenticated';
import options from '../swaggerOptions';

const rootRouter = Router();
const specs = swaggerJSDoc(options);

rootRouter.use('/auth/local', userRouter);
rootRouter.use('/api/favs', isAuthenticated, favListRouter);
rootRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

export default rootRouter;
