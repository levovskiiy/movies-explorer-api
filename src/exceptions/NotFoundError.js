import { HTTP_ERROR } from '../utils/constants.js';

export default class NotFoundError extends Error {
  constructor(msg = HTTP_ERROR.NOT_FOUND.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.NOT_FOUND.code;
  }
}
