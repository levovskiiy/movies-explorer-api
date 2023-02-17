import { HTTP_ERROR } from '../utils/constants.js';

export default class UnauthorizedError extends Error {
  constructor(msg = HTTP_ERROR.UNAUTHORIZED.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.UNAUTHORIZED.code;
  }
}
