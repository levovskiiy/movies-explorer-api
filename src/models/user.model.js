import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },

  password: {
    type: String,
    requied: true,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

export default model('User', User);
