import { IHero } from '../models/IHero';

export type Payload = {
  name: string;
  ability: string;
};

export interface ICreateHeroService {
  execute(data: Payload): Promise<IHero>;
}
