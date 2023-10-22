// view.entity.ts

import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity("views")
export class View {
  @PrimaryColumn()
  postId: number;

  @Column({ default: 0 })
  views: number;

  @OneToOne(() => Post, (post) => post.view)
  post: Post;
}
