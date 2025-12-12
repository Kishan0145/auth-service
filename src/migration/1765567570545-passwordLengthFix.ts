import type { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordLengthFix1765567570545 implements MigrationInterface {
   name = 'PasswordLengthFix1765567570545';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "password" character varying NOT NULL`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "password" character varying(15) NOT NULL`
      );
   }
}
