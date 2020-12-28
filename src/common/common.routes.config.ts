import express from 'express';
import { CommonUsecase } from '../common/common.usecase';

export abstract class CommonRoutesConfig {
  app: express.Application;
  usecase: CommonUsecase;
  name: string;

  constructor(name: string, app: express.Application, usecase: CommonUsecase) {
    this.name = name;
    this.app = app;
    this.usecase = usecase;
    this.configureRoutes();
  }

  abstract configureRoutes(): express.Application;

  getName(): string {
    return this.name;
  }
}
