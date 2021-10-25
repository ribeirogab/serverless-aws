/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Validator } from '../contracts/validators/IValidator';
import { badRequest } from '../helpers/httpHelper';

type ValidateParams = {
  schema: Validator;
  argsType: 'body' | 'queryStringParameters';
};

export function validate({ schema, argsType }: ValidateParams) {
  return (target: any, key: any, descriptor: any) => {
    const fn = descriptor.value;
    descriptor.value = async function f(...args: any[]) {
      const event = args[0];

      const data = JSON.parse(event[argsType]);

      const { error, value } = schema(data);

      if (error) {
        return badRequest(error);
      }

      args[0] = value;

      return fn.apply(this, args);
    };
  };
}
