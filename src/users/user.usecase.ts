interface IUserUsecase {
  greetings(): string;
}

export class UserUsecase implements IUserUsecase {
  public greetings(): string {
    return 'hello';
  }
}
