import celebrate from 'celebrate';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/index.js';
import { errorsHandler, corsHandler, logger, rateLimit } from './middlewares/index.js';

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsHandler());
app.use(rateLimit);
app.use(logger.requestLogger);
app.use(routes);
app.use(logger.errorLogger);
app.use(celebrate.errors);
app.use(errorsHandler());

export default app;
