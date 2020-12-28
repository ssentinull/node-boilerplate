import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserUsecase } from './user.usecase';
import { Application, NextFunction, Request, Response } from 'express';

const routeName = 'UserRoutes';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application, usecase: UserUsecase) {
    super(app, routeName, usecase);
  }

  configureRoutes(): Application {
    this.app.route('/users').get((req: Request, res: Response) => {
      res.status(200).send(this.usecase.get());
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
