import { User } from './user.model';
import { UserRepository } from './user.repository';

interface IUserUsecase {
  create(user: User): Promise<User>;
  greetings(): string;
}

export class UserUsecase implements IUserUsecase {
  constructor(private userRepo: UserRepository) {}

  public create = (user: User): Promise<User> => {
    return this.userRepo.create(user);
  };

  public greetings(): string {
    return 'hello';
  }
}
