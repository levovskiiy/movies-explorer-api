import express from 'express';
import { validators } from '../middlewares/index.js';
import MovieController from '../controllers/MovieController.js';
const router = express.Router();


router.get('/movies', MovieController.getMovies);
router.post('/movies', validators.validateMovieData, MovieController.createMovie);
router.delete('/movies/:movieId', validators.validateMovieId, MovieController.deleteMovie);

export default router;
