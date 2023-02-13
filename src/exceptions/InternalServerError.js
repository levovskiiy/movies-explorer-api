import { HTTP_ERROR } from '../utils/constants.js';

export default class InternalServerError extends Error {
  constructor(msg = HTTP_ERROR.INTERNAL_SERVER_ERROR.message) {
    super(msg);
    this.statusCode = HTTP_ERROR.INTERNAL_SERVER_ERROR.code;
  }
}
