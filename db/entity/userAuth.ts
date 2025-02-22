import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

// @Entity({ name: "user_auths" })
// export class UserAuth extends BaseEntity {
@Entity("user_auths")
export class UserAuth {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @ManyToOne((type) => User, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user!: User;
}

