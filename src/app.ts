import 'reflect-metadata';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import * as dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { logger, errorLogger } from 'express-winston';
import { createServer, Server } from 'http';
import { createConnection } from 'typeorm';
import { format, transports } from 'winston';
import { UserRoutes } from './user/user.route';
import { UserUsecase } from './user/user.usecase';
import { UserRepository } from './user/user.repository';

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
  dotenv.config();

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
  const debugLog: debug.IDebugger = debug('app');
  const PORT = 'PORT' in process.env ? process.env.PORT : 3000;
  server.listen(PORT, () => {
    debugLog(`Server running at http://localhost:${PORT}`);
  });
})();
