import { verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/config.js';

import { AUTHORIZATION_ERROR_MESSAGES } from '../utils/constants.js';
import UnauthorizedError from '../exceptions/UnauthorizedError.js';

export default function authentication(req, res, next) {
  try {
    const { jwt } = req.cookies;
    req.user = verify(jwt, JWT_SECRET);
    next();
  } catch (error) {
    next(new UnauthorizedError(AUTHORIZATION_ERROR_MESSAGES.REQUIRED_AUTHORIZATION));
  }
}
