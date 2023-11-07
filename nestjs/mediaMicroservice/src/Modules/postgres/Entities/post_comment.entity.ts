import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';

@Entity('post_comments')
export class Post_comment {
  @PrimaryGeneratedColumn({ name: 'commentid' })
  commentId: number;

  @ManyToOne(() => Post, (post) => post.postComments)
  @JoinColumn({ name: 'postid' })
  post: Post;

  @ManyToOne(() => User, (user) => user.postComments)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ type: 'text' })
  comment_text: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  commented_at: Date;
}
