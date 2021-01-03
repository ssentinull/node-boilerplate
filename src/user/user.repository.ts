import { Connection, Repository } from 'typeorm';
import { User as UserModel } from '../domain/user.domain';
import { Users as UserEntity } from './user.entity';

interface IUserRepository {
  create(user: UserModel): Promise<UserModel>;
}

export class UserRepository implements IUserRepository {
  private userRepo: Repository<UserEntity>;

  constructor(private dbConn: Connection) {
    this.userRepo = this.dbConn.getRepository(UserEntity);
  }

  public create = async (user: UserModel): Promise<UserModel> => {
    const newUser = this.userRepo.create(user);
    const result = await this.userRepo.save(newUser);

    return new UserModel(result);
  };
}
