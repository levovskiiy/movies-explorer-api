import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

import UnauthorizedError from '../exceptions/UnauthorizedError.js';
import { AUTHORIZATION_ERROR_MESSAGES } from '../utils/constants.js';

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

/**
 * Ищет пользователя по email и сравнивает хеши пороля.
 * Выбрасыввает ошибку авторизации в случае несходства хешей
 * или если пользователя с таким email не сущетсвует в базе.
 * @param {Object} userCredentials - данные пользователя для входа
 * @param {string} userCredentials.email - Почта пользователя
 * @param {string} userCredentials.password - Хэш пароля пользователя
 * @throws {UnauthorizedError} - Необходимы верные данные для входа.
 * @returns {Object} возвращает объект с данными пользователя
 */
User.statics.findUserByCredentials = async function findUserByCredentials({
  email,
  password,
}) {
  const user = await this.findOne({ email })
    .select('+password');

  if (!user) {
    throw new UnauthorizedError(AUTHORIZATION_ERROR_MESSAGES.INCORRECT_CREDENTIALS);
  }

  const compared = await bcrypt.compare(password, user.password);

  if (!compared) {
    throw new UnauthorizedError(AUTHORIZATION_ERROR_MESSAGES.INCORRECT_CREDENTIALS);
  }

  return user;
};

User.methods.deletePassword = function deletePassword() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', User);
