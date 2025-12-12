import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './Base.js';
import { RESTAURANTS_TYPES } from '../constants/user.constant.js';
import { User } from './User.js';

@Entity({ name: 'restaurants' })
export class Restaurant extends Base {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column({ type: 'varchar', length: 200 })
   address: string;

   @Column({ type: 'enum', enum: RESTAURANTS_TYPES })
   type: number;

   @Column({ type: 'varchar', length: 20 })
   phone: string;

   @Column({ type: 'varchar', length: 20 })
   email: string;

   @OneToMany(() => User, (user) => user.restaurant)
   user: User[];
}
