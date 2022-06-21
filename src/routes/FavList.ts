import { Router } from 'express';
import { create, list, destroy } from '../controllers/FavList.controller';

const router = Router();

router.route('/').get(list);
router.route('/').post(create);
router.route('/:favListId').delete(destroy);

export default router;
