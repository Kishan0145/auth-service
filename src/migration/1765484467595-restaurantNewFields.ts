import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantNewFields1765484467595 implements MigrationInterface {
   name = 'RestaurantNewFields1765484467595';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "restaurants" ADD "phone" character varying(20) NOT NULL`
      );
      await queryRunner.query(
         `ALTER TABLE "restaurants" ADD "email" character varying(20) NOT NULL`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "firstName" character varying(50) NOT NULL`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "lastName" character varying(50) NOT NULL`
      );
      await queryRunner.query(
         `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "email" character varying(50) NOT NULL`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "password" character varying(15) NOT NULL`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "password" character varying NOT NULL`
      );
      await queryRunner.query(
         `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "email" character varying NOT NULL`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "lastName" character varying NOT NULL`
      );
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
      await queryRunner.query(
         `ALTER TABLE "users" ADD "firstName" character varying NOT NULL`
      );
      await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "email"`);
      await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "phone"`);
   }
}
