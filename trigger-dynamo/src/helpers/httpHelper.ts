import { Response } from '../contracts/IHandler';

export const badRequest = (error: Error): Response => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): Response => ({
  statusCode: 500,
  body: new Error('Internal server error'),
});

export const ok = (data: unknown): Response => ({
  statusCode: 200,
  body: data,
});
