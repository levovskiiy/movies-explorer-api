import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const Movie = new mongoose.Schema({
  country: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true, validate: isURL },
  trailerLink: { type: String, required: true, validate: isURL },
  thumbnai: { type: String, required: true, validate: isURL },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieid: { type: Number, required: true },
  duration: { type: Number, required: true },
});

export default mongoose.model('Movie', Movie);
