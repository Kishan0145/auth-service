import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantNullable1765573509346 implements MigrationInterface {
   name = 'RestaurantNullable1765573509346';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "users" DROP CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650"`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ADD CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "users" DROP CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650"`
      );
      await queryRunner.query(
         `ALTER TABLE "users" ADD CONSTRAINT "FK_4ca7f2f579cda8a6158c7fc1650" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
      );
   }
}
