import { Router } from 'express';
import userRouter from './user.route';
import movieRouter from './movie.route';

const router = Router();

router.post('/signup', () => { });
router.post('/signin', () => { });
router.use(userRouter);
router.use(movieRouter);
