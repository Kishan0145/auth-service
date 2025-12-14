import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantUniqueConstraint1765577877156
   implements MigrationInterface
{
   name = 'RestaurantUniqueConstraint1765577877156';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "restaurants" ADD CONSTRAINT "UQ_8a604e4f3984d3a2937c1f78796" UNIQUE ("phone")`
      );
      await queryRunner.query(
         `ALTER TABLE "restaurants" ADD CONSTRAINT "UQ_c356f465f786a3ae9ff48ab18ef" UNIQUE ("email")`
      );
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
         `ALTER TABLE "restaurants" DROP CONSTRAINT "UQ_c356f465f786a3ae9ff48ab18ef"`
      );
      await queryRunner.query(
         `ALTER TABLE "restaurants" DROP CONSTRAINT "UQ_8a604e4f3984d3a2937c1f78796"`
      );
   }
}
