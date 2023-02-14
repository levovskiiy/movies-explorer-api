import User from '../models/user.model.js';
import factory from '../utils/lib.js';

const register = ({ model }) => async (userData) => model.create(userData);

const login = ({ model }) => async (
  { email, password },
) => model.findUserByCredentials({ email, password });

export default factory({ model: User }, { register, login });
