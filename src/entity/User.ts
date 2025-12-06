import {
   Column,
   Entity,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_ROLES } from '../constants/user.constant.js';
import { Base } from './Base.js';

@Entity()
export class User extends Base {
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

   @Column({
      type: 'enum',
      enum: USER_ROLES,
      default: USER_ROLES.CUSTOMER,
   })
   role: string;

   @OneToMany(() => RefreshTokens, (token) => token.user)
   refreshTokens: RefreshTokens[];
}

@Entity()
export class RefreshTokens extends Base {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ type: 'bigint' })
   expiresAt: number;

   @Column()
   refreshToken: string;

   @ManyToOne(() => User, (user) => user.refreshTokens)
   user: User;
}
