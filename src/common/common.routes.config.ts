import express from 'express';
import { CommonUsecase } from '../common/common.usecase';

export abstract class CommonRoutesConfig {
  app: express.Application;
  usecase: CommonUsecase;
  name: string;

  constructor(app: express.Application, name: string, usecase: CommonUsecase) {
    this.app = app;
    this.name = name;
    this.usecase = usecase;
    this.configureRoutes();
  }

  abstract configureRoutes(): express.Application;

  getName(): string {
    return this.name;
  }
}
