import { IHero } from '../models/IHero';

export type CreateParams = {
  name: string;
  ability?: string;
};

export interface IHeroesRepository {
  tableName: string;
  create(data: CreateParams): Promise<IHero>;
}
