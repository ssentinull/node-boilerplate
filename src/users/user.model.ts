interface IUserParams {
  id: number;
  name: string;
}

interface IUserResponse {
  id: string;
  name: string;
}

export class User {
  id: number;
  name: string;

  constructor({ id, name }: IUserParams) {
    this.id = id;
    this.name = name;
  }

  public toResponse = (): IUserResponse => {
    return { id: String(this.id), name: this.name };
  };
}
