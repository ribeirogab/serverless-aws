export interface IService<Payload, Return> {
  execute(data: Payload): Return;
}
