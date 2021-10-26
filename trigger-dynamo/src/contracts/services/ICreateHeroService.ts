import { IHero } from '../models/IHero';
import { IService } from './IService';

export type CreateHeroServicePayload = {
  name: string;
  ability?: string;
};

export type ICreateHeroService = IService<
  CreateHeroServicePayload,
  Promise<IHero>
>;
