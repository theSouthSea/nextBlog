/* 1.创建模型 */
// export class Photo {
//   id: number
//   name: string
//   description: string
//   filename: string
//   views: number
//   isPublished: boolean
// }

/* 2.创建数据库表 @Entity() */
// import { Entity } from "typeorm"
// @Entity()
// export class Photo {
//     id: number
//     name: string
//     description: string
//     filename: string
//     views: number
//     isPublished: boolean
// }

/* 3.添加列 @Column() */
// import { Entity, Column } from "typeorm"

// @Entity()
// export class Photo {
//     @Column()
//     id: number

//     @Column()
//     name: string

//     @Column()
//     description: string

//     @Column()
//     filename: string

//     @Column()
//     views: number

//     @Column()
//     isPublished: boolean
// }

/* 4.添加主键 @PrimaryColumn() */
// export class Photo {
//   @PrimaryColumn()
//   id: number
// }

/* 5.生成自增列 @PrimaryGeneratedColumn() */
// export class Photo {
//   @PrimaryGeneratedColumn()
//   id: number
// }

/* 6.设置列数据类型 */
// import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// @Entity()
// export class Photo {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column({
//         length: 100,
//     })
//     name: string

//     @Column("text")
//     description: string

//     @Column()
//     filename: string

//     @Column("double")
//     views: number

//     @Column()
//     isPublished: boolean
// }

/* 7.创建数据源 */
// import "reflect-metadata"
// import { DataSource } from "typeorm"
// import { Photo } from "./entity/Photo"

// const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "root",
//     password: "admin",
//     database: "test",
//     entities: [Photo],
//     synchronize: true,
//     logging: false,
// })

// // to initialize the initial connection with the database, register all entities
// // and "synchronize" database schema, call "initialize()" method of a newly created database
// // once in your application bootstrap
// AppDataSource.initialize()
//     .then(() => {
//         // here you can start to work with your database
//     })
//     .catch((error) => console.log(error))

/* 8.创建并插入图片到数据库 */
// import { Photo } from "./entity/Photo"
// import { AppDataSource } from "./index"

// const photo = new Photo()
// photo.name = "Me and Bears"
// photo.description = "I am near polar bears"
// photo.filename = "photo-with-bears.jpg"
// photo.views = 1
// photo.isPublished = true

// await AppDataSource.manager.save(photo)
// console.log("Photo has been saved. Photo id is", photo.id)
