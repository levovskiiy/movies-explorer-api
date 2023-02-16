import ForbiddenError from '../exceptions/ForbiddenError.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Movie from '../models/movie.model.js';
import { MOVIE_ERROR_MESSAGES } from '../utils/constants.js';
import factory from '../utils/lib.js';

const get = ({ model }) => async () => {
  return model.find({}).exec();
};

const create = ({ model }) => async (movieData) => model.create(movieData);

const remove = ({ model }) => async ({ userId, movieId }) => {
  const movie = await model.findById(movieId);

  if (!movie) {
    throw new NotFoundError(MOVIE_ERROR_MESSAGES.NOT_FOUND_BY_ID);
  }

  if (movie.owner.toString() !== userId) {
    throw new ForbiddenError(MOVIE_ERROR_MESSAGES.ID_MISMATCH);
  }

  return movie.delete();
};

export default factory({ model: Movie }, { get, create, remove });
