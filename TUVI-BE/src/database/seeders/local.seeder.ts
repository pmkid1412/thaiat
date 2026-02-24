import { DataSource } from 'typeorm';
import { UserSeeder } from './user.seeder';
import { PredictionSeeder } from './prediction.seeder';

export class LocalSeeder {
  constructor(private dataSource: DataSource) {}

  async run() {
    const userSeeder = new UserSeeder(this.dataSource);
    await userSeeder.run();

    const predictionSeeder = new PredictionSeeder(this.dataSource);
    await predictionSeeder.run();

    console.log('Seeder: local created');
  }
}
