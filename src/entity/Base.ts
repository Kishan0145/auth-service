import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base {
   @CreateDateColumn({ type: 'timestamptz' })
   createdAt: Date;
   @UpdateDateColumn({ type: 'timestamptz' })
   updatedAt: Date;
   @DeleteDateColumn({ type: 'timestamptz' })
   deletedAt?: Date | null;
}
