import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const Movie = new mongoose.Schema({
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
  country: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true, validate: isURL },
  trailerLink: { type: String, required: true, validate: isURL },
  thumbnail: { type: String, required: true, validate: isURL },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  duration: { type: Number, required: true },
});

export default mongoose.model('Movie', Movie);
