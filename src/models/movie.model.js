import { Schema, model } from 'mongoose';
import { isURL } from 'validator';

const requiredString = { type: String, required: true };
const url = { ...requiredString, validate: isURL };

const Movie = Schema({
  country: requiredString,
  director: requiredString,
  duration: { type: Number, required: true },
  year: requiredString,
  description: requiredString,
  image: url,
  trailerLink: url,
  thumbnai: url,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movieid: { type: Number, required: true },
});

export default model('Movie', Movie);
