import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserUsecase } from './user.usecase';
import { Application, NextFunction, Request, Response } from 'express';

const routeName = 'UserRoutes';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application, usecase: UserUsecase) {
    super(routeName, app, usecase);
  }

  configureRoutes(): Application {
    this.app
      .route('/users/greetings/:name')
      .get((req: Request, res: Response) => {
        const result: string = this.getGreetings(req);
        res.status(200).send(result);
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

  private getGreetings(req: Request): string {
    const { name } = req.params;
    const greetings: string = this.usecase.greetings() + ' ' + name;
    return greetings;
  }
}
