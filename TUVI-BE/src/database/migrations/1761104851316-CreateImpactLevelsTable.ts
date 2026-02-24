import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImpactLevelsTable1761104851316
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE impact_levels (
        id bigint PRIMARY KEY AUTO_INCREMENT
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE impact_levels`);
  }
}
