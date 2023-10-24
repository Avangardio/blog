// user.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';

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

  @Column({ type: 'timestamptz', default: () => 'CURRENT_DATE' })
  creation_time: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Post_like, (postLike) => postLike.user)
  postLikes: Post_like[];

  @OneToMany(() => Post_comment, (postComment) => postComment.user)
  postComments: Post_comment[];
}
