import { DataSource } from 'typeorm';
import { DomainSeeder } from './domain.seeder';
import { LanguageSeeder } from './language.seeder';
import { AreaSeeder } from './area.seeder';
import { ImpactLevelSeeder } from './impact-level.seeder';
import { PredictionStatusSeeder } from './prediction-status.seeder';
import { SystemConfigSeeder } from './system-config.seeder';
import { ToolMetadataSeeder } from './tool-metadata.seeder';
import { ToolUsageSeeder } from './tool-usage.seeder';

export class MasterSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const languageSeeder = new LanguageSeeder(this.dataSource);
    await languageSeeder.run();

    const domainSeeder = new DomainSeeder(this.dataSource);
    await domainSeeder.run();

    const areaSeeder = new AreaSeeder(this.dataSource);
    await areaSeeder.run();

    const impactLevelSeeder = new ImpactLevelSeeder(this.dataSource);
    await impactLevelSeeder.run();

    const predictionStatusSeeder = new PredictionStatusSeeder(this.dataSource);
    await predictionStatusSeeder.run();

    const systemConfigSeeder = new SystemConfigSeeder(this.dataSource);
    await systemConfigSeeder.run();

    const toolMetadataSeeder = new ToolMetadataSeeder(this.dataSource);
    await toolMetadataSeeder.run();

    const toolUsageSeeder = new ToolUsageSeeder(this.dataSource);
    await toolUsageSeeder.run();

    console.log('Seeder: master created');
  }
}
