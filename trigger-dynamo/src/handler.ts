// import { CreateHeroService } from './services';

export async function createHero(event: any) {
  try {
    // const createHeroService = new CreateHeroService();

    return {
      statusCode: 200,
      body: 'createHero',
    };
  } catch (error) {
    console.log('Error***', error.stack);

    return {
      statusCode: 500,
      body: 'Internal server error!',
    };
  }
}
