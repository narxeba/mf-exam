import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1616834010553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE users (id serial PRIMARY KEY,user_id VARCHAR(20)UNIQUE NOT NULL,PASSWORD VARCHAR(256)NOT NULL,nickname VARCHAR(30)NULL,COMMENT VARCHAR(100)NULL,created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users;');
  }
}
