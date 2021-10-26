import { Event } from './contracts/IHandler';
import { heroesDynamoDBRepository } from './repositories/HeroesDynamoDBRepository';
import { CreateHeroService } from './services';
import { CreateHeroController, TriggerHeroController } from './controllers';

class Handler {
  public async createHero(event: Event) {
    const createHeroService = new CreateHeroService(heroesDynamoDBRepository);
    const createHeroController = new CreateHeroController(createHeroService);
    return createHeroController.handle(event);
  }

  public async triggerHero(event: Event) {
    const triggerHeroController = new TriggerHeroController();
    return triggerHeroController.handle(event);
  }
}

const handler = new Handler();

export const { createHero, triggerHero } = handler;
