import { IHero } from '../contracts/models/IHero';
import { IHeroesRepository } from '../contracts/repositories/IHeroesRepository';
import {
  ICreateHeroService,
  Payload,
} from '../contracts/services/ICreateHeroService';

export class CreateHeroService implements ICreateHeroService {
  constructor(private readonly heroesRepository: IHeroesRepository) {}

  public async execute(payload: Payload): Promise<IHero> {
    const hero = await this.heroesRepository.create(payload);
    return hero;
  }
}
