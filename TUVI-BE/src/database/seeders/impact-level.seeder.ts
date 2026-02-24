import { DataSource } from 'typeorm';
import {
  ImpactLevel,
  ImpactLevelData,
  Language,
} from '../entities/index.entity';

export class ImpactLevelSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const impactLevelRepository = this.dataSource.getRepository(ImpactLevel);
    const impactLevelDataRepository =
      this.dataSource.getRepository(ImpactLevelData);
    const languageRepository = this.dataSource.getRepository(Language);

    const impactLevelData = await impactLevelDataRepository.find();

    const impactLevelNames: string[][] = [
      ['Thấp', 'Low'],
      ['Trung bình', 'Medium'],
      ['Cao', 'High'],
    ];

    const languages = await languageRepository.find();
    const vietnameseLanguage = languages.find((d) => d.name === 'Tiếng Việt');
    const englishLanguage = languages.find((d) => d.name === 'English');

    for (const [index, names] of impactLevelNames.entries()) {
      const vietnameseImpactLevelName = names[0];
      const englishImpactLevelName = names[1];

      if (!impactLevelData.find((d) => d.name === vietnameseImpactLevelName)) {
        const impactLevel = impactLevelRepository.create({
          id: index + 1,
        });
        await impactLevelRepository.save(impactLevel);

        const impactLevelDataToSave = impactLevelDataRepository.create([
          {
            name: vietnameseImpactLevelName,
            impactLevel,
            language: vietnameseLanguage,
          },
          {
            name: englishImpactLevelName,
            impactLevel,
            language: englishLanguage,
          },
        ]);
        await impactLevelDataRepository.save(impactLevelDataToSave);
      }
    }
  }
}
