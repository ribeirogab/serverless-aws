import { Response } from '../IHandler';
import { IController } from './IController';

export type CreateHeroRequest = {
  name: string;
  ability?: string;
};

export type ICreateHeroController = IController<
  CreateHeroRequest,
  Promise<Response>
>;
