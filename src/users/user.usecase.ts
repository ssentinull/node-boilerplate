import { CommonUsecase } from '../common/common.usecase';

export class UserUsecase extends CommonUsecase {
  constructor() {
    super();
  }

  get(): string {
    return 'hello world';
  }
}
