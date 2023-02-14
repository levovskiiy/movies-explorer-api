import {
  celebrate, Joi, Segments, CelebrateError,
} from 'celebrate';
import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const correctURL = Joi.string()
  .custom((str) => {
    if (isURL(str, { require_protocol: true })) {
      return str;
    }
    throw new CelebrateError('URL несоотвуствует шаблону');
  });

const correctObjectId = Joi.string().alphanum().custom((value) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }

  throw new CelebrateError('ID is not valid');
});

const required = (type) => Joi[type]()
  .required();

const validCredentials = {
  email: required('string')
    .email(),
  password: required('string'),
};

const createValidator = ({ schema, segment }, isUnknown = true) => celebrate({
  [segment]: Joi.object()
    .keys(schema)
    .unknown(isUnknown),
});

export const validateRegister = createValidator({
  schema: {
    ...validCredentials,
    name: required('string')
      .min(2)
      .max(30),
  },
  segment: Segments.BODY,
});

export const validateLogin = createValidator({
  schema: validCredentials,
  segment: Segments.BODY,
});

export const validateMovieData = createValidator({
  schema: {
    country: required('string'),
    director: required('string'),
    duration: required('number'),
    year: required('string'),
    description: required('string'),
    image: correctURL.required(),
    trailerLink: correctURL.required(),
    thumbnai: correctURL.required(),
    movieid: required('number'),
  },
  segment: Segments.BODY,
});

export const validateMovieId = createValidator({
  schema: {
    movieId: correctObjectId.required(),
  },

  segment: Segments.PARAMS,
});
