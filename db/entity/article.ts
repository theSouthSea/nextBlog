import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

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
}

