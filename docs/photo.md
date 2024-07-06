# typeorm连接数据库相关操作代码

## 1.创建模型

```ts
export class Photo {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
  }
```

## 2.创建数据库表 @Entity()

```ts
import { Entity } from "typeorm"
@Entity()
export class Photo {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
}
```

## 3.添加列 @Column()

```ts
import { Entity, Column } from "typeorm"

@Entity()
export class Photo {
    @Column()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean
}
```

## 4.添加主键 @PrimaryColumn()

```ts
export class Photo {
    @PrimaryColumn()
    id: number
  }
```

## 5.生成自增列 @PrimaryGeneratedColumn()

```ts
export class Photo {
    @PrimaryGeneratedColumn()
    id: number
  }
```

## 6.设置列数据类型

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column("double")
    views: number

    @Column()
    isPublished: boolean
}
```

## 7.创建数据源

```ts
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",
    entities: [Photo],
    synchronize: true,
    logging: false,
})
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))
```

## 8.创建并插入图片到数据库

```ts
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

await AppDataSource.manager.save(photo)
console.log("Photo has been saved. Photo id is", photo.id)
```

## 9.使用实体管理器

```ts
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const savedPhotos = await AppDataSource.manager.find(Photo)
console.log("All photos from the db: ", savedPhotos)
```

## 10.使用仓库

```ts
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

const photoRepository = AppDataSource.getRepository(Photo)

await photoRepository.save(photo)
console.log("Photo has been saved")

const savedPhotos = await photoRepository.find()
console.log("All photos from the db: ", savedPhotos)
```

## 10.从仓库中搜索数据

```ts
import { Photo } from "./entity/Photo"
import { AppDataSource } from "./index"

const photoRepository = AppDataSource.getRepository(Photo)
const allPhotos = await photoRepository.find()
console.log("All photos from the db: ", allPhotos)

const firstPhoto = await photoRepository.findOneBy({
    id: 1,
})
console.log("First photo from the db: ", firstPhoto)

const meAndBearsPhoto = await photoRepository.findOneBy({
    name: "Me and Bears",
})
console.log("Me and Bears photo from the db: ", meAndBearsPhoto)

const allViewedPhotos = await photoRepository.findBy({ views: 1 })
console.log("All viewed photos: ", allViewedPhotos)

const allPublishedPhotos = await photoRepository.findBy({ isPublished: true })
console.log("All published photos: ", allPublishedPhotos)

const [photos, photosCount] = await photoRepository.findAndCount()
console.log("All photos: ", photos)
console.log("Photos count: ", photosCount)
```
