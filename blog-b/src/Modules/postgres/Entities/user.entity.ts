// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

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

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
