import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import Routers from './routers';
import StatusCode from './utils/enumStatusCodes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routers);

app.get("/", (_req: Request, res: Response) => {
  res.send("Veja o ReadMe para rotas disponíveis");
});

app.use((
  err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction
) => res.status(StatusCode.INTERNAL_SERVER_ERROR).json(err));

export default app;
