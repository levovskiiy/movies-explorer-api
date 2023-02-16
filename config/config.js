import { config } from 'dotenv';

config();

export const {
  JWT_SECRET = 'DEV_MODE',
  PORT = 5000,
  DB_CONN = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

export const EXPIRES_JWT = '7d';

export const ALLOWED_DOMAINS = ['localhost', 'api.moviesapp.nomoredomains.work'];
export const ALLOWED_METHODS = ['GET', 'POST', 'PATCH', 'POST', 'DELETE', 'OPTIONS'];
