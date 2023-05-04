import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';

import Routers from './routers';
import StatusCode from './utils/enumStatusCodes';
import { Container } from '@decorators/di';
import { ERROR_MIDDLEWARE } from '@decorators/express';

const logger = pinoHttp({
  customLogLevel: (_req, res, _err) => {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  level: 'debug',
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      params: req.params,
      host: req.headers.host,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    })
  },
  transport: process.env.DEV ? {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  } : undefined,
});

const app = express();
app.use(logger);
logger.logger.debug('Express initialized! 🚀');

app.use(cors());
logger.logger.debug('~> CORS enabled.');
app.use(express.json());
Routers.use(logger);
app.use(Routers);
logger.logger.debug('~> Routers registered!');

app.get("/", (_req: Request, res: Response) => {
  res.send("Veja o ReadMe para rotas disponíveis");
});

const serverErrorMiddleware = (
  error: Error, _req: Request, res: Response, _next: NextFunction
) => {
  logger.logger.error(error);
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message ?? error });
};

Container.provide([
  { provide: ERROR_MIDDLEWARE, useValue: serverErrorMiddleware }
]);

app.use(serverErrorMiddleware);

export default app;
