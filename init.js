import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const key = crypto.randomBytes(32).toString('hex');
const env = [`JWT_SECRET=${key}`].join('\n');
const message = 'env file has been created. Please enter the rest of the data for the application to work.';

fs.promises.writeFile(path.resolve('.env'), env)
  .then(() => console.log(message))
  .catch((err) => console.log(err.message));
