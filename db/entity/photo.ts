import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity({ name: "photo" })
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  name!: string;

  // @Column("text")
  @Column()
  description!: string;

  @Column()
  filename!: string;

  // @Column("double")
  @Column()
  views!: number;

  @Column()
  isPublished!: boolean;
}

