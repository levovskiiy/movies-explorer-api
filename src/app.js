import celebrate from 'celebrate';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import {
  errorsHandler, logger, rateLimit,
} from './middlewares/index.js';
import { corsOptions } from '../config/config.js';

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimit);
app.use(logger.requestLogger);
app.use(routes);
app.use(logger.errorLogger);
app.use(celebrate.errors());
app.use(errorsHandler());

export default app;
