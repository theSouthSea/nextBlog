import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Article } from "./article";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  content!: string;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @Column()
  is_delete!: number;

  // @ManyToOne(() => User, (user) => user.id)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Article)
  @JoinColumn({ name: "article_id" })
  article!: Article;
}

