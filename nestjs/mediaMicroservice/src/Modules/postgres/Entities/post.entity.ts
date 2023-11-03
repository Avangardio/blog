// post.entity.ts

import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {User} from './user.entity';
import {Post_like} from '@/Modules/postgres/Entities/post_like.entity';
import {Post_comment} from '@/Modules/postgres/Entities/post_comment.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn({name: 'postid'})
    postId: number;

    @Column()
    title: string;

    @Column()
    picture: string;

    @Column()
    description: string;

    @Column({name: 'authorid'})
    authorId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: 'authorid'})
    author: User;

    @Column()
    texts: string;

    @Column('text', {array: true, default: '{}'})
    tags: string[];

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    ctime: Date;

    @Column({default: 0})
    views: number;

    @Column({default: 0})
    likes: number;

    @Column({default: 0})
    comments: number;

    @OneToMany(() => Post_like, (post_like) => post_like.post)
    postLikes: Post_like[];

    @OneToMany(() => Post_comment, (post_comment) => post_comment.post)
    postComments: Post_comment[];
}
