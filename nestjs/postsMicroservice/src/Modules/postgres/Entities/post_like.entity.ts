import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';

@Entity('post_likes')
export class Post_like {
  @PrimaryGeneratedColumn({ name: 'likeid' })
  likeId: number;

  @ManyToOne(() => Post, (post) => post.postLikes, { cascade: true })
  @JoinColumn({ name: 'postid' })
  post: Post;

  @ManyToOne(() => User, (user) => user.postLikes, { cascade: true })
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  liked_at: Date;
}
