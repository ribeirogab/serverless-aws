import { Rekognition, Translate } from 'aws-sdk';
import axios from 'axios';

interface IAnalyzeImageService {
  execute({ imageUrl }: { imageUrl?: string }): Promise<string>;
}

export class AnalyzeImageService implements IAnalyzeImageService {
  public readonly serviceName = 'AnalyzeImageService';

  constructor(
    private readonly rekognition: Rekognition,
    private readonly translator: Translate,
  ) {}

  private async detectImageLabels(
    buffer: Buffer,
  ): Promise<{ names: string[]; reliableItems: Rekognition.Label[] }> {
    const { Labels } = await this.rekognition
      .detectLabels({
        Image: {
          Bytes: buffer,
        },
      })
      .promise();

    if (!Labels) {
      throw new Error('No Labels found');
    }

    const reliableItems = Labels.filter(
      ({ Confidence, Name }) => Confidence && Name && Confidence > 80,
    );
    const names = reliableItems.map(({ Name }) => Name as string);

    return { names, reliableItems };
  }

  private async translateText(
    text: string,
  ): Promise<{ translatedText: string }> {
    const { TranslatedText } = await this.translator
      .translateText({
        SourceLanguageCode: 'en',
        TargetLanguageCode: 'pt',
        Text: text,
      })
      .promise();

    return { translatedText: TranslatedText };
  }

  private formatTextResults(
    texts: string[],
    reliableItems: Rekognition.Label[],
  ) {
    const items = [];

    for (const indexText in texts) {
      const name = texts[indexText];
      const confidence = reliableItems[indexText].Confidence as number;
      items.push(`${confidence.toFixed(2)}% de ser do tipo ${name.trim()}.`);
    }

    return items.join('\n');
  }

  private async getImageBuffer(imageUrl: string): Promise<Buffer> {
    const { data } = await axios.get<any>(imageUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(data, 'base64');

    return buffer;
  }

  public async execute({ imageUrl }: { imageUrl?: string }): Promise<string> {
    if (!imageUrl) {
      throw new Error('Invalid image url');
    }

    console.log(`${this.serviceName} | Downloading image...`);
    const imgBuffer = await this.getImageBuffer(imageUrl);

    console.log(`${this.serviceName} | Detecting labels...`);
    const { names, reliableItems } = await this.detectImageLabels(imgBuffer);

    console.log(`${this.serviceName} | Translating to Portuguese...`);
    const { translatedText } = await this.translateText(names.join(','));
    const translatedTextArr = translatedText.split(',');

    console.log(`${this.serviceName} | Handling final object...`);
    const finalText = this.formatTextResults(translatedTextArr, reliableItems);

    console.log(`${this.serviceName} | Finishing...`);

    return finalText;
  }
}
