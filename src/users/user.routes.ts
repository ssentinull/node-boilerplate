import { UserUsecase } from './user.usecase';
import { Application, Request, Response } from 'express';

interface IUserRoutes {
  getGreetings(req: Request, res: Response): Response;
}

export class UserRoutes implements IUserRoutes {
  private usecase: UserUsecase;
  private app: Application;

  constructor(app: Application, usecase: UserUsecase) {
    this.app = app;
    this.usecase = usecase;

    this.app.get('/users/greetings/:name', this.getGreetings);
  }

  public getGreetings = (req: Request, res: Response): Response => {
    const { name } = req.params;
    const greetings: string = this.usecase.greetings() + ' ' + name;
    return res.status(200).send(greetings);
  };
}
