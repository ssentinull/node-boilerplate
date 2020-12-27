import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { createServer, Server } from 'http';
import { json } from 'body-parser';
import { format, transports } from 'winston';
import { logger, errorLogger } from 'express-winston';
import express from 'express';
import cors from 'cors';
import debug from 'debug';

const app: express.Application = express();
const server: Server = createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(json());
app.use(cors());
app.use(
  logger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
  })
);

routes.push(new UsersRoutes(app));

app.use(
  errorLogger({
    transports: [new transports.Console()],
    format: format.combine(format.colorize(), format.json())
  })
);

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Server up and running!');
});

server.listen(port, () => {
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
