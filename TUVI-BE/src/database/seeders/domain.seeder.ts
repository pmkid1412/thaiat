import { DataSource } from 'typeorm';
import { Domain, DomainData, Language } from '../entities/index.entity';

export class DomainSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const domainRepository = this.dataSource.getRepository(Domain);
    const domainDataRepository = this.dataSource.getRepository(DomainData);
    const languageRepository = this.dataSource.getRepository(Language);
    
    const domainData = await domainDataRepository.find();

    const domainNames: string[][] = [
      ['Kinh tế', 'Economy'],
      ['Chính trị', 'Politics'],
      ['Công nghệ', 'Technology'],
      ['Nông nghiệp', 'Agriculture'],
      ['Năng lượng', 'Energy'],
      ['Thiên tai', 'Natural Disasters'],
      ['Xã hội', 'Society'],
      ['Quân sự', 'Military'],
    ];

    const languages = await languageRepository.find();
    const vietnameseLanguage = languages.find((d) => d.name === 'Tiếng Việt');
    const englishLanguage = languages.find((d) => d.name === 'English');

    for (const [index, names] of domainNames.entries()) {
      const vietnameseDomainName = names[0];
      const englishDomainName = names[1];

      if (!domainData.find((d) => d.name === vietnameseDomainName)) {
        const domain = domainRepository.create({
          id: index + 1,
        });
        await domainRepository.save(domain);

        const domainDataToSave = domainDataRepository.create([
          {
            name: vietnameseDomainName,
            domain,
            language: vietnameseLanguage,
          },
          {
            name: englishDomainName,
            domain,
            language: englishLanguage,
          },
        ]);
        await domainDataRepository.save(domainDataToSave);
      }
    }
  }
}
