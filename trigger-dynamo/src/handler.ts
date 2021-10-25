import { Event, Response } from './contracts/IHandler';
import { heroesDynamoDBRepository } from './repositories/HeroesDynamoDBRepository';
import { CreateHeroService } from './services';
import { validate, createHeroValidator } from './validators';
import { ok, serverError } from './helpers/httpHelper';

class Handler {
  @validate({ schema: createHeroValidator, argsType: 'body' })
  async createHero(data: Event): Promise<Response> {
    try {
      const createHeroService = new CreateHeroService(heroesDynamoDBRepository);
      const hero = await createHeroService.execute(data);

      return ok({ hero });
    } catch (error) {
      console.log('Error***', error);
      return serverError();
    }
  }
}

const handler = new Handler();

export const { createHero } = handler;
