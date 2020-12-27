import { CommonRoutesConfig } from '../common/common.routes.config';
import { Application, NextFunction, Request, Response } from 'express';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app.route('/users').get((req: Request, res: Response) => {
      res.status(200).send('List of users');
    });

    this.app
      .route('/users/:id')
      .all((req: Request, res: Response, next: NextFunction) => {
        next();
      })
      .get((req: Request, res: Response) => {
        res.status(200).send(`GET requested for id ${req.params.id}`);
      });

    return this.app;
  }
}
