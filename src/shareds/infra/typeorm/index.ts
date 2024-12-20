import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";

const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
    path.join(__dirname, "../../../modules/**/infra/typeorm/entities/**/*.ts"),
  ],
});

export { postgresDataSource };
