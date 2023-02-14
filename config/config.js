import { config } from 'dotenv';

config();

export const {
  JWT_SECRET = 'DEV_MODE',
  PORT = 8000,
  DB_CONN = 'mongodb://localhost:27017/movies_explorer_db',
} = process.env;

export const EXPIRES_JWT = '7d';

export const ALLOWED_DOMAINS = ['localhost'];
export const ALLOWED_METHODS = ['GET', 'POST', 'PATCH', 'POST', 'DELETE', 'OPTIONS'];
