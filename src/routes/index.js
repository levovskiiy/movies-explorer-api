import express from 'express';
import { authentication } from '../middlewares/index.js';
import userRouter from './UserRouter.js';
import movieRouter from './MovieRouter.js';
import accountRouter from './AccountRouter.js';
import NotFoundError from '../exceptions/NotFoundError.js';

const router = express.Router();

router.use('/', accountRouter);
router.use(authentication);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use(
  (
    req,
    res,
    next,
  ) => next(new NotFoundError('Неправильный путь')),
);

export default router;
