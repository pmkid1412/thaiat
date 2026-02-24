import { DataSource } from 'typeorm';
import { Language } from '../entities/language.entity';

export class LanguageSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const languageRepository = this.dataSource.getRepository(Language);

    const languageNames: string[] = ['Tiếng Việt', 'English'];

    const languages = await languageRepository.find();

    for (const [index, name] of languageNames.entries()) {
      if (!languages.find((l) => l.name === name)) {
        const languageData = languageRepository.create({
          id: index + 1,
          name,
        });
        await languageRepository.save(languageData);
      }
    }

    console.log('Seeder: languages created');
  }
}
