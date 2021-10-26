import {
  CreateHeroRequest,
  ICreateHeroController,
} from '../contracts/controllers/ICreateHeroController';
import { Response } from '../contracts/IHandler';
import { ICreateHeroService } from '../contracts/services/ICreateHeroService';
import { createHeroValidator, validate } from '../validators';
import { ok, serverError } from '../helpers/httpHelper';

export class CreateHeroController implements ICreateHeroController {
  constructor(private readonly createHeroService: ICreateHeroService) {}

  @validate({ schema: createHeroValidator, argsType: 'body' })
  public async handle(data: CreateHeroRequest): Promise<Response> {
    try {
      const hero = await this.createHeroService.execute(data);

      return ok({ hero });
    } catch (error) {
      console.log('Error***', error);
      return serverError();
    }
  }
}
