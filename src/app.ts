import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import { logger, errorLogger } from 'express-winston';
import { createServer, Server } from 'http';
import { createConnection } from 'typeorm';
import { format, transports } from 'winston';
import { UserRoutes } from './users/user.routes';
import { UserUsecase } from './users/user.usecase';
import { UserRepository } from './users/user.repository';

(async () => {
  const app: express.Application = express();
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());
  app.use(
    logger({
      transports: [new transports.Console()],
      format: format.combine(format.colorize(), format.json())
    })
  );

  const dbConn = await createConnection();
  const userRepo: UserRepository = new UserRepository(dbConn);
  const userUsecase: UserUsecase = new UserUsecase(userRepo);
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
})();
