import { Router } from 'express';
import signUp, { signIn } from '../controllers/User.controller';

const router = Router();

router.route('/users').post(signUp);
router.route('/auth/local/login').post(signIn);

export default router;
