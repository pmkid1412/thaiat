import { DataSource } from 'typeorm';
import {
  Language,
  PredictionStatus,
  PredictionStatusData,
} from '../entities/index.entity';

export class PredictionStatusSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const predictionStatusRepository =
      this.dataSource.getRepository(PredictionStatus);
    const predictionStatusDataRepository =
      this.dataSource.getRepository(PredictionStatusData);
    const languageRepository = this.dataSource.getRepository(Language);

    const predictionStatusData = await predictionStatusDataRepository.find();

    const predictionStatusNames: string[][] = [
      ['Đang dự đoán', 'Predicting'],
      ['Đã xảy ra', 'Occurred'],
      ['Không xảy ra', 'Not Occurred'],
      ['Đã điều chỉnh', 'Adjusted'],
    ];

    const languages = await languageRepository.find();
    const vietnameseLanguage = languages.find((d) => d.name === 'Tiếng Việt');
    const englishLanguage = languages.find((d) => d.name === 'English');

    for (const [index, names] of predictionStatusNames.entries()) {
      const vietnamesePredictionStatusName = names[0];
      const englishPredictionStatusName = names[1];

      if (
        !predictionStatusData.find(
          (d) => d.name === vietnamesePredictionStatusName,
        )
      ) {
        const predictionStatus = predictionStatusRepository.create({
          id: index + 1,
        });
        await predictionStatusRepository.save(predictionStatus);

        const predictionStatusDataToSave =
          predictionStatusDataRepository.create([
            {
              name: vietnamesePredictionStatusName,
              predictionStatus,
              language: vietnameseLanguage,
            },
            {
              name: englishPredictionStatusName,
              predictionStatus,
              language: englishLanguage,
            },
          ]);
        await predictionStatusDataRepository.save(predictionStatusDataToSave);
      }
    }
  }
}
