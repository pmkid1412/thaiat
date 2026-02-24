import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePredictionStatusTable1761104851315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE prediction_status (
        id bigint PRIMARY KEY AUTO_INCREMENT
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE prediction_status`);
  }
}
