import express from 'express';
import mognoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import helmet from 'helmet';

const DB_CONN = 'mongodb://localhost:27017/movies-explorer-db';
const PORT = 5000;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mognoose.connect(DB_CONN);
app.listen(PORT);
