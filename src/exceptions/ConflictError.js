import { HTTP_ERROR } from '../utils/constants.js';

export default class ConflictError extends Error {
  constructor(msg = HTTP_ERROR.CONFLICT.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.CONFLICT.code;
  }
}
