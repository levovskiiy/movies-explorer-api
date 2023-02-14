import express from 'express';
import user from '../controllers/UserController.js';

const router = express.Router();

router.get('/users/me', user.getUser);
router.patch('/users/me', user.updateUser);

export default router;
