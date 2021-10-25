import * as Joi from '@hapi/joi';

import { Validator } from '../contracts/validators/IValidator';

export { validate } from './decorator';

export const createHeroValidator: Validator = (data: unknown) => {
  const { error, value } = Joi.object({
    name: Joi.string().max(100).min(2).required(),
    ability: Joi.string().max(100).min(2),
  }).validate(data);

  return { error, value };
};
