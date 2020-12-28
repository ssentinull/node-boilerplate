import express from 'express';
import { CommonUsecase } from './common.usecase';

export abstract class CommonRoutes {
  name: string;
  app: express.Application;
  usecase: CommonUsecase;

  constructor(name: string, app: express.Application, usecase: CommonUsecase) {
    this.name = name;
    this.app = app;
    this.usecase = usecase;
    this.configureRoutes();
  }

  protected abstract configureRoutes(): express.Application;

  public getName(): string {
    return this.name;
  }
}
