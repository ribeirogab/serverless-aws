import { Event, Response } from '../IHandler';
import { IController } from './IController';

export type ITriggerHeroController = IController<Event, Promise<Response>>;
