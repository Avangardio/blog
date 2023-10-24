import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';

@Entity('post_likes')
export class Post_like {
  @PrimaryGeneratedColumn()
  like_id: number;

  @ManyToOne(() => Post, (post) => post.postLikes)
  post: Post;

  @ManyToOne(() => User, (user) => user.postLikes)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  liked_at: Date;
}
