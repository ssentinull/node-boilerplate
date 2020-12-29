import { UserRoutes } from './users/user.routes';
import { UserUsecase } from './users/user.usecase';
import { createServer, Server } from 'http';
import { json } from 'body-parser';
import { format, transports } from 'winston';
import { logger, errorLogger } from 'express-winston';
import express from 'express';
import cors from 'cors';
import debug from 'debug';

const app: express.Application = express();
app.use(json());
app.use(cors());
app.use(
  logger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
  })
);

const userUsecase: UserUsecase = new UserUsecase();
const userRoutes: UserRoutes = new UserRoutes(app, userUsecase);

app.use(
  errorLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
  })
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Server up and running!');
});

const server: Server = createServer(app);
const port = 3000;
const debugLog: debug.IDebugger = debug('app');
server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
});
