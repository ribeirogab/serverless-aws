export interface IController<Payload, Return> {
  handle(payload: Payload): Return;
}
