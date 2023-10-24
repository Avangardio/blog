// post.entity.ts

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column()
  texts: string;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  cTime: Date;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @OneToMany(() => Post_like, (post_like) => post_like.post)
  postLikes: Post_like[];

  @OneToMany(() => Post_comment, (post_comment) => post_comment.post)
  postComments: Post_comment[];
}
