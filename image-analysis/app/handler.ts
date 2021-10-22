import { Rekognition, Translate } from 'aws-sdk';

import { AnalyzeImageService } from './services/AnalyzeImageService';

export async function analyze(event: any) {
  try {
    const { imageUrl } = event.queryStringParameters;

    const analyzeImageService = new AnalyzeImageService(
      new Rekognition(),
      new Translate(),
    );

    const finalText = await analyzeImageService.execute({ imageUrl });

    return {
      statusCode: 200,
      body: `A imagem tem\n${finalText}`,
    };
  } catch (error) {
    console.log('Error***', error.stack);

    return {
      statusCode: 500,
      body: 'Internal server error!',
    };
  }
}
