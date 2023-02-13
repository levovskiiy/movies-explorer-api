import User from '../models/user.model.js';

class AccountService {
  constructor(userModel) {
    this.model = userModel;
  }

  /**
   * Создает пользователя в базе данных
   * @returns {Promise<import('mongoose').Document>}
   * @param userData
   */
  async register(userData) {
    return this.model.create(userData);
  }

  /**
   * @param {Object} userData - данныель пользователя для входа
   * @param {string} userData.email - Email пользователя
   * @param {string} userData.password - Пароль для пользователя
   * @returns {Promise<import('mongoose').Document>}
   */
  async login({ email, password }) {
    return this.model.findUserByCredentials({ email, password });
  }
}

export default new AccountService(User);
