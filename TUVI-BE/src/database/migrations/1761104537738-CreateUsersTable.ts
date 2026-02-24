import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1761104537738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
        id bigint PRIMARY KEY AUTO_INCREMENT,
        email varchar(255),
        email_verified_at timestamp,
        verification_code varchar(20),
        verification_code_expires datetime,
        password_reset_code varchar(20),
        password_reset_code_expires datetime,
        name varchar(255),
        avatar text,
        date_of_birth date,
        time_of_birth time,
        place_of_birth text,
        user_type int DEFAULT 0,
        user_role int DEFAULT 1,
        timezone varchar(255),
        password varchar(255),
        phone_number varchar(255),
        language_id bigint,
        horoscope_id bigint,
        last_modified_by bigint,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at timestamp,
        CONSTRAINT fk_users_horoscope_id FOREIGN KEY (horoscope_id) REFERENCES horoscopes(id) ON DELETE SET NULL,
        CONSTRAINT fk_users_language_id FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
