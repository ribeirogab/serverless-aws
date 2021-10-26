import { ITriggerHeroController } from '../contracts/controllers/ITriggerHeroController';
import { Event, Response } from '../contracts/IHandler';

import { ok, serverError } from '../helpers/httpHelper';

export class TriggerHeroController implements ITriggerHeroController {
  public async handle(event: Event): Promise<Response> {
    try {
      console.log('Event***', JSON.stringify(event, null, 2));
      return ok('ok');
    } catch (error) {
      console.log('Error***', error);
      return serverError();
    }
  }
}
