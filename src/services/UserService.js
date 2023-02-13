import NotFoundError from '../exceptions/NotFoundError.js';
import User from '../models/user.model.js';
import { USER_ERROR_MESSAGES } from '../utils/constants.js';

class UserService {
  constructor(userModel) {
    this.model = userModel;
  }

  /**
   * Получает данные авторизованного пользователя
   * @param {string} id ID пользователя
   * @returns {Promise<Object>} Объект пользователя
   */
  async get(id) {
    const user = await this.model.findById(id).lean().exec();

    if (!user) {
      throw new NotFoundError(USER_ERROR_MESSAGES.NOT_FOUND_BY_ID);
    }

    return user;
  }

  /**
   * Меняет email и имя пользователя в базе данных
   * @param {{email: string, name: string}} userData изменяеммые данные
   * @param {string} id id пользователя
   * @returns {Promise<import('mongoose').Document>} Возвращает объект обновленного пользователя
   * @throws {NotFoundError} Пользователь не найден
   */
  async update(userData, id) {
    const updatedUser = await this.model.findByIdAndUpdate(
      id,
      userData,
      { runValidators: true, new: true },
    ).exec();

    if (!updatedUser) {
      throw new NotFoundError(USER_ERROR_MESSAGES.NOT_FOUND_BY_ID);
    }

    return updatedUser;
  }
}

export default new UserService(User);
