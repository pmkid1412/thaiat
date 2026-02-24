import { DataSource } from 'typeorm';
import { Area, AreaData, Language } from '../entities/index.entity';

export class AreaSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const areaRepository = this.dataSource.getRepository(Area);
    const areaDataRepository = this.dataSource.getRepository(AreaData);
    const languageRepository = this.dataSource.getRepository(Language);

    const areaData = await areaDataRepository.find();

    const areaNames: string[][] = [
      ['Đông Nam Á', 'Southeast Asia'],
      ['Đông Á', 'East Asia'],
      ['Nam Á', 'South Asia'],
      ['Việt Nam', 'Vietnam'],
      ['Thái Lan', 'Thailand'],
      ['Singapore', 'Singapore'],
      ['Malaysia', 'Malaysia'],
      ['Indonesia', 'Indonesia'],
      ['Philippines', 'Philippines'],
      ['Myanmar', 'Myanmar'],
    ];

    const languages = await languageRepository.find();
    const vietnameseLanguage = languages.find((d) => d.name === 'Tiếng Việt');
    const englishLanguage = languages.find((d) => d.name === 'English');

    for (const [index, names] of areaNames.entries()) {
      const vietnameseAreaName = names[0];
      const englishAreaName = names[1];

      if (!areaData.find((d) => d.name === vietnameseAreaName)) {
        const area = areaRepository.create({
          id: index + 1,
        });
        await areaRepository.save(area);

        const areaDataToSave = areaDataRepository.create([
          {
            name: vietnameseAreaName,
            area,
            language: vietnameseLanguage,
          },
          {
            name: englishAreaName,
            area,
            language: englishLanguage,
          },
        ]);
        await areaDataRepository.save(areaDataToSave);
      }
    }
  }
}
