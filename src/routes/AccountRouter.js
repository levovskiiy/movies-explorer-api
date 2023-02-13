import express from 'express';
import accountController from '../controllers/AccountController.js';
import { validators } from '../middlewares/index.js';

const router = express.Router();

router.post('/signup', validators.validateRegister, AccountController.registerUser);
router.post('/singin', validators.validateLogin, AccountController.login);
router.get('/logout', (req, res) => res.clearCookie('jwt')
  .send({ message: 'logout' }));

export default router;
