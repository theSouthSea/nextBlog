import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";
import { Tag } from "./tag";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @Column()
  views!: number;

  @Column()
  is_delete!: number;

  // @ManyToOne(() => User, (user) => user.id)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToMany(() => Tag, (tag) => tag.articles, {
    cascade: true,
  })
  tags!: Tag[];

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[];
}

