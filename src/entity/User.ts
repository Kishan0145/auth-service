import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { USER_ROLES } from '../constants/user.constant.js';

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column({ default: USER_ROLES.CUSTOMER })
   role: string;
}
