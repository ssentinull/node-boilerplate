import { Application, Request, Response } from 'express';
import { User } from './user.model';
import { UserUsecase } from './user.usecase';

interface IUserRoutes {
  createUser(req: Request, res: Response): Promise<Response>;
  getGreetings(req: Request, res: Response): Response;
}

export class UserRoutes implements IUserRoutes {
  constructor(private app: Application, private usecase: UserUsecase) {
    this.app.get('/users/greetings/:name', this.getGreetings);
    this.app.post('/users/', this.createUser);
  }

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userModel = new User(req.body);
    const newUser = await this.usecase.create(userModel);

    return res.status(200).json(newUser.toResponse());
  };

  public getGreetings = (req: Request, res: Response): Response => {
    const { name } = req.params;
    const greetings: string = this.usecase.greetings() + ' ' + name;

    return res.status(200).send(greetings);
  };
}
