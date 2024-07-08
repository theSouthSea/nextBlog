// import "reflect-metadata";
import "reflect-metadata";
import {
  createConnection,
  getConnection,
  Connection,
  DataSource,
} from "typeorm";
// import { Connection } from "typeorm/browser";
import { User, UserAuth } from "./entity";
import mysql2 from "mysql2";

// let connectionReadyPromise: Promise<Connection> | null = null;

const host = process.env.DATABASE_HOST || "localhost";
const port = parseInt(process.env.DATABASE_PORT || "3306");
const username = process.env.DATABASE_USERNAME || "root";
const password = process.env.DATABASE_PASSWORD || "adminadmin";
const database = process.env.DATABASE_DATABASE || "blog";
const type = (process.env.DATABASE_TYPE || "mysql") as "mysql";

// export const prepareConnection = async () => {
//   if (!connectionReadyPromise) {
//     connectionReadyPromise = (async () => {
//       try {
//         const staleConnection = getConnection();
//         await staleConnection.close();
//       } catch (e) {
//         console.log(e);
//       }
//       const connection = await createConnection({
//         type,
//         host,
//         port,
//         username,
//         password,
//         database,
//         entities: [User, UserAuth],
//         synchronize: false,
//         logging: true,
//       });
//       return connection;
//     })();
//   }

//   return connectionReadyPromise;
// };
const AppDataSource = new DataSource({
  type,
  host,
  port,
  username,
  password,
  database,
  entities: [User, UserAuth],
  synchronize: true,
  driver: mysql2,
  logging: false,
});
// AppDataSource.initialize()
//   .then((data) => {
//     // here you can start to work with your database
//     // console.log("dataSource-init-data=", data);
//     // return data;
//     console.log('dataSource-init');
//   })
//   .catch((error) => console.log("dataSource-init-error=", error));
// const AppDataSource = AppDataSource1.initialize();
export const initDataSource = async () => {
  await AppDataSource.initialize()
    .then((data) => {
      // here you can start to work with your database
      // console.log("dataSource-init-data=", data);
      // return data;
      console.log("dataSource-init");
    })
    .catch((error) => console.log("dataSource-init-error=", error));
};
export { AppDataSource };

