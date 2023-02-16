import { HTTP_ERROR } from '../utils/constants.js';

export default class BadRequestError extends Error {
  constructor(msg = HTTP_ERROR.BAD_REQUEST.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.BAD_REQUEST.code;
  }
}
