import mongoose from 'mongoose';
import UserService from '../services/UserService.js';
import BadRequestError from '../exceptions/BadRequestError.js';

class UserController {
  /**
   *
   * @param {UserService} service
   */
  constructor(service) {
    this.service = service;
  }

  async getUser({ user }, res, next) {
    try {
      const currentUser = await this.service.get(user.id);

      res.status(200).send(currentUser);
    } catch (err) {
      next(err instanceof mongoose.Error.CastError ? new BadRequestError(err.message) : err);
    }
  }

  async updateUser({ user, body }, res, next) {
    try {
      const { email, name } = body;
      const { id } = user;

      const updatedUser = await this.service.update({ email, name }, id);

      res.status(200).send(updatedUser);
    } catch (err) {
      next(err instanceof mongoose.Error.ValidationError ? new BadRequestError(err.message) : err);
    }
  }
}

export default new UserController(UserService);
