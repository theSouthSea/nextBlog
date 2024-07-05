"use server";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photo";
// import mysql2 from "mysql2/promise";
import mysql2 from "mysql2";

const host = process.env.DATABASE_HOST || "localhost";
const port = parseInt(process.env.DATABASE_PORT || "3306");
const username = process.env.DATABASE_USERNAME || "root";
const password = process.env.DATABASE_PASSWORD || "adminadmin";
const database = process.env.DATABASE_DATABASE || "blog";
const type = (process.env.DATABASE_TYPE || "mysql") as "mysql";
console.log("type=", type);
const AppDataSource = new DataSource({
  type,
  host,
  port,
  username,
  password,
  database,
  entities: [Photo],
  synchronize: true,
  driver: mysql2,
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then((data) => {
    // here you can start to work with your database
    // console.log("dataSource-init-data=", data);
    // return data;
  })
  .catch((error) => console.log("dataSource-init-error=", error));
// const AppDataSource = AppDataSource1.initialize();
export { AppDataSource };

