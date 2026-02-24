import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHoroscopePredictionLogsTable1764757540442
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE horoscope_prediction_logs (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_horoscope_id bigint,
            input text,
            output text,
            status varchar(20),
            created_at timestamp DEFAULT CURRENT_TIMESTAMP
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
