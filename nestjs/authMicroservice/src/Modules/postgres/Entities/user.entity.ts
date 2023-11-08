// user.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  hash: string;

  @Column('int', { array: true, default: '{}' })
  my_posts: number[];

  @Column({ default: 'EN' })
  language: string;
}
