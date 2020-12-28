import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
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
const routes: Array<CommonRoutesConfig> = [];
routes.push(new UsersRoutes(app, userUsecase));

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
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
