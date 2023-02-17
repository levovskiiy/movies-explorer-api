import { HTTP_ERROR } from '../utils/constants.js';

export default class ForbiddenError extends Error {
  constructor(msg = HTTP_ERROR.FORBIDDEN.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.FORBIDDEN.code;
  }
}
