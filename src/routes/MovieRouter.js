import express from 'express';
import { validators } from '../middlewares/index.js';
import movie from '../controllers/MovieController.js';

const router = express.Router();

router.get('/movies', movie.getMovies);
router.post('/movies', validators.validateMovieData, movie.createMovie);
router.delete('/movies/:movieId', validators.validateMovieId, movie.deleteMovie);

export default router;
