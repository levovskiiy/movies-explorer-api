import { Router } from 'express';

const router = Router();

router.get('/movies');
router.post('/movies');
router.delete('/movies/:movieId');

export default router;
