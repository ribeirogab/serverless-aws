import { DynamoDB } from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';

import { IHero } from '../contracts/models/IHero';
import {
  IHeroesRepository,
  CreateParams,
} from '../contracts/repositories/IHeroesRepository';
import { env } from '../config/env';

class HeroesDynamoDBRepository implements IHeroesRepository {
  public readonly tableName: string;
  private client: DynamoDB.DocumentClient;

  constructor() {
    if (!env.dynamodbTable) {
      throw new Error('DynamoDB table name is missing');
    }

    this.tableName = env.dynamodbTable;
    this.client = new DynamoDB.DocumentClient();
  }

  public async create(heroData: CreateParams): Promise<IHero> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        ...heroData,
        id: uuidV4(),
        createdAt: new Date().toISOString(),
      },
    };

    await this.client.put(params).promise();

    const hero: IHero = {
      id: params.Item.id,
      name: params.Item.name,
      ability: params.Item.ability,
    };

    return hero;
  }
}

export const heroesDynamoDBRepository = new HeroesDynamoDBRepository();
