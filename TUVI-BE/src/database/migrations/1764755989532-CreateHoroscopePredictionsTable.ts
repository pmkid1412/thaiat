import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHoroscopePredictionsTable1764755989532
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE horoscope_predictions (
                id bigint PRIMARY KEY AUTO_INCREMENT,
                user_horoscope_id bigint,
                type varchar(20),
                date date,
                month int,
                year int,
                details json,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_horoscope_predictions_user_horoscope_id FOREIGN KEY (user_horoscope_id) REFERENCES user_horoscopes (id) ON DELETE CASCADE,
                INDEX idx_hp_type_user_date (type, user_horoscope_id, date),
                INDEX idx_hp_type_user_month_year (type, user_horoscope_id, month, year),
                INDEX idx_hp_type_user_year (type, user_horoscope_id, year)
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE horoscope_predictions`);
  }
}
