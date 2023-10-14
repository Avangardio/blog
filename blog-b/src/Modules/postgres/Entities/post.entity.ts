// post.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { View } from './view.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column({ nullable: true })
  texts: number;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  cTime: Date;

  @OneToOne(() => View, (view) => view.post)
  view: View;
}
