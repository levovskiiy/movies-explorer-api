import mongoose from 'mongoose';
import factory from '../utils/factory.js';
import MovieService from '../services/MovieService.js';
import BadRequestError from '../exceptions/BadRequestError.js';

const getMovies = ({ service }) => async (req, res, next) => {
  try {
    const movies = await service.get();
    res.status(200)
      .send(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = ({ service }) => async (req, res, next) => {
  try {
    const createdMovie = await service.create(req.body);

    res.status(200)
      .send(createdMovie);
  } catch (error) {
    next(error instanceof mongoose.Error.ValidationError
      ? new BadRequestError(error.message)
      : error);
  }
};

const deleteMovie = ({ service }) => async ({
  params,
  user
}, res, next) => {
  try {
    const { movieId } = params;
    const { id } = user;

    const deletedMovie = await service.delete({
      movieId,
      userId: id
    });

    res.status(200)
      .send(deletedMovie);
  } catch (error) {
    next(error instanceof mongoose.Error.CastError ? new BadRequestError(error.message) : error);
  }
};

const movieController = factory({ MovieService }, {
  getMovies,
  createMovie,
  deleteMovie
});

export default movieController;
// class MovieController {
//   constructor(movieSerivce) {
//     this.service = movieSerivce;
//   }
//
//   async getMovies(req, res, next) {
//     try {
//       const movies = await this.service.get();
//       res.status(200).send(movies);
//     } catch (error) {
//       next(error);
//     }
//   }
//
//   async createMovie({ body }, res, next) {
//     try {
//       const createdMovie = await this.service.create(body);
//
//       res.status(200).send(createdMovie);
//     } catch (error) {
//       next(error instanceof mongoose.Error.ValidationError
//         ? new BadRequestError(error.message)
//         : error);
//     }
//   }
//
//   async deleteMovie({ params, user }, res, next) {
//     try {
//       const { movieId } = params;
//       const { id } = user;
//
//       const deletedMovie = await this.service.delete({ movieId, userId: id });
//
//       res.status(200).send(deletedMovie);
//     } catch (error) {
//       next(error instanceof mongoose.Error.CastError ? new BadRequestError(error.message) : error);
//     }
//   }
// }
//
// export default new MovieController(MovieService);
