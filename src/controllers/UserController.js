import mongoose from 'mongoose';
import userService from '../services/UserService.js';
import BadRequestError from '../exceptions/BadRequestError.js';
import ConflictError from '../exceptions/ConflictError.js';
import factory from '../utils/lib.js';
import { USER_ERROR_MESSAGES } from '../utils/constants.js';

const getUser = ({ service }) => async (req, res, next) => {
  try {
    const { id } = req.user;
    const currentUser = await service.get(id);

    res.status(200).send(currentUser);
  } catch (err) {
    next(err instanceof mongoose.Error.CastError ? new BadRequestError(err.message) : err);
  }
};

const updateUser = ({ service }) => async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const { id } = req.user;

    const updatedUser = await service.update({ email, name }, id);

    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(USER_ERROR_MESSAGES.EMAIL_ALREADY_EXIST));
    } else {
      next(err instanceof mongoose.Error.ValidationError ? new BadRequestError(err.message) : err);
    }
  }
};

export default factory({ service: userService }, { getUser, updateUser });
