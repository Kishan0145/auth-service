import {
   Column,
   Entity,
   Index,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_ROLES } from '../constants/user.constant.js';
import { Base } from './Base.js';
import { Restaurant } from './Restaurant.js';

@Entity({ name: 'users' })
export class User extends Base {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'varchar', length: 50 })
   firstName: string;

   @Column({ type: 'varchar', length: 50 })
   lastName: string;

   @Column({ type: 'varchar', unique: true, length: 50 })
   email: string;

   @Column({ type: 'varchar' })
   password: string;

   @Column({
      type: 'enum',
      enum: USER_ROLES,
      default: USER_ROLES.CUSTOMER,
   })
   role: string;

   @OneToMany(() => RefreshToken, (token) => token.user)
   refreshToken: RefreshToken[];

   @Index()
   @ManyToOne(() => Restaurant, (restaurant) => restaurant.user)
   restaurant: Restaurant;
}

@Entity({ name: 'refreshTokens' })
export class RefreshToken extends Base {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'bigint' })
   expiresAt: number;

   @Column()
   refreshToken: string;

   @Index()
   @ManyToOne(() => User, (user) => user.refreshToken)
   user: User;
}
