import { HTTP_ERROR } from '../utils/constants.js';

export default () => (err, req, res, next) => {
  const {
    statusCode = HTTP_ERROR.INTERNAL_SERVER_ERROR.code,
    message = HTTP_ERROR.INTERNAL_SERVER_ERROR.message,
  } = err;

  res.status(statusCode).send({ message });
  next();
};
