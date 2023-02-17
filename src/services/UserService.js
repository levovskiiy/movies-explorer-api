import NotFoundError from '../exceptions/NotFoundError.js';
import User from '../models/user.model.js';
import { USER_ERROR_MESSAGES } from '../utils/constants.js';
import factory from '../utils/lib.js';

const get = ({ model }) => async (userId) => {
  const user = await model.findById(userId).lean().exec();

  if (!user) {
    throw new NotFoundError(USER_ERROR_MESSAGES.NOT_FOUND_BY_ID);
  }

  return user;
};

const update = ({ model, updateParams }) => async (data, id) => {
  const updatedUser = await model
    .findByIdAndUpdate(id, data, updateParams)
    .exec();

  if (!updatedUser) {
    throw new NotFoundError(USER_ERROR_MESSAGES.NOT_FOUND_BY_ID);
  }

  return updatedUser;
};

export default factory(
  {
    model: User,
    updateParams: { runValidators: true, new: true },
  },
  {
    get, update,
  },
);
