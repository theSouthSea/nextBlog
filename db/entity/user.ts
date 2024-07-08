import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity({ name: "users" })
// export class User extends BaseEntity {
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickname!: string;

  @Column()
  job!: string;

  @Column()
  avatar!: string;

  @Column()
  introduce!: string;
}

