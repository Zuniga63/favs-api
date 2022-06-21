import { Router } from 'express';
import signUp, { signIn } from '../controllers/User.controller';

const router = Router();

router.route('/singup').post(signUp);
router.route('/login').post(signIn);

export default router;
