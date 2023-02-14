import express from 'express';
import account from '../controllers/AccountController.js';
import { validators } from '../middlewares/index.js';

const router = express.Router();

router.post('/signup', validators.validateRegister, account.registerUser);
router.post('/signin', validators.validateLogin, account.login);
router.get('/logout', (req, res) => res.clearCookie('jwt')
  .send({ message: 'logout' }));

export default router;
