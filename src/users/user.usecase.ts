import { CommonUsecase } from '../common/common.usecase';

export class UserUsecase extends CommonUsecase {
  constructor() {
    super();
  }

  public greetings(): string {
    return 'hello';
  }
}
