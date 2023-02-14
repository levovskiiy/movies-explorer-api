import mongoose from 'mongoose';
import factory from '../utils/lib.js';
import movieService from '../services/MovieService.js';
import BadRequestError from '../exceptions/BadRequestError.js';

const getMovies = ({ service }) => async (req, res, next) => {
  try {
    const movies = await service.get();
    res.status(200).send(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = ({ service }) => async (req, res, next) => {
  try {
    const createdMovie = await service.create({ ...req.body, owner: req.user.id });
    res.status(200).send(createdMovie);
  } catch (error) {
    next(error instanceof mongoose.Error.ValidationError
      ? new BadRequestError(error.message)
      : error);
  }
};

const deleteMovie = ({ service }) => async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { id } = req.user;

    const deletedMovie = await service.remove({ movieId, userId: id });

    res.status(200).send(deletedMovie);
  } catch (error) {
    next(error instanceof mongoose.Error.CastError ? new BadRequestError(error.message) : error);
  }
};

export default factory({ service: movieService }, {
  getMovies,
  createMovie,
  deleteMovie,
});
