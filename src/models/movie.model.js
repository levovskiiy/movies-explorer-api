import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const requiredString = { type: String, required: true };
const url = { ...requiredString, validate: isURL };

const Movie = new mongoose.Schema({
  country: requiredString,
  director: requiredString,
  duration: { type: Number, required: true },
  year: requiredString,
  description: requiredString,
  image: url,
  trailerLink: url,
  thumbnai: url,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieid: { type: Number, required: true },
});

export default mongoose.model('Movie', Movie);
