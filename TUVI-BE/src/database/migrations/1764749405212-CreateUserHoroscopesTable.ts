import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserHoroscopesTable1764749405212
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user_horoscopes (
            id bigint PRIMARY KEY AUTO_INCREMENT,
            user_id bigint,
            name varchar(255),
            solar_date_of_birth date,
            lunar_date_of_birth date,
            is_lunar_leap_month boolean DEFAULT false,
            time_of_birth time,
            timezone varchar(20),
            gender varchar(20),
            is_using boolean DEFAULT false,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_horoscopes_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
            INDEX idx_user_horoscopes_user_is_using (user_id, is_using)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_horoscopes`);
  }
}
