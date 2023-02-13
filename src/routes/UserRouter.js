import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/users/me', UserController.getUser);
router.patch('/users/me', UserController.updateUser);

export default router;
