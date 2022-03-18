import express, { Request, Response } from 'express';
import cors from 'cors';

import Routers from './routers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Routers);

app.get("/", (_req: Request, res: Response) => {
  res.send("Veja o ReadMe para rotas disponíveis");
});

export default app;
