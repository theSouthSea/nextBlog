import "reflect-metadata";
import { createConnection, getConnection, Connection } from "typeorm";
// import { Connection } from "typeorm/browser";
import { User, UserAuth } from "./entity";

let connectionReadyPromise: Promise<Connection> | null = null;

const host = process.env.DATABASE_HOST || "localhost";
const port = parseInt(process.env.DATABASE_PORT || "3306");
const username = process.env.DATABASE_USERNAME || "root";
const password = process.env.DATABASE_PASSWORD || "adminadmin";
const database = process.env.DATABASE_DATABASE || "blog";
const type = (process.env.DATABASE_TYPE || "mysql") as "mysql";
export const prepareConnection = async () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (e) {
        console.log(e);
      }
      const connection = await createConnection({
        type,
        host,
        port,
        username,
        password,
        database,
        entities: [User, UserAuth],
        synchronize: false,
        logging: true,
      });
      return connection;
    })();
  }

  return connectionReadyPromise;
};

