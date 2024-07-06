import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

// @Entity({ name: "photo" })
// export class Photo extends BaseEntity {
// 下面的实体定义,在执行await photoRepository.findOneBy({id: 1});报这个错误"EntityMetadataNotFoundError: No metadata for "Photo" was found."

@Entity("photo")
export class Photo {
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

