import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';

@Entity('post_comments')
export class Post_comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne(() => Post, (post) => post.postComments)
  post: Post;

  @ManyToOne(() => User, (user) => user.postComments)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  commented_at: Date;
}
