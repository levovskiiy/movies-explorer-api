import ForbiddenError from '../exceptions/ForbiddenError.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Movie from '../models/movie.model.js';
import { MOVIE_ERROR_MESSAGES } from '../utils/constants.js';

class MovieService {
  constructor(movieModel) {
    this.model = movieModel;
  }

  /**
   * Возвращает все сохраненные фильмы текущего пользователя
   */
  async get() {
    const movies = await this.model.find({}).exec();

    if (!movies) {
      throw new NotFoundError(MOVIE_ERROR_MESSAGES.NOT_FOUND);
    }

    return movies;
  }

  /**
   * Создает фильм в базе
   */
  async create(filmDetails) {
    return this.model.create(filmDetails);
  }

  /**
   * Удаляет сохраненный фильм по id
   */
  async delete({ movieId, userId }) {
    if (userId !== movieId) {
      throw new ForbiddenError(MOVIE_ERROR_MESSAGES.ID_MISMATCH);
    }

    return this.model.findByIdAndRemove(userId);
  }
}

export default new MovieService(Movie);
