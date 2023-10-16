import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  const dbURL: string | undefined = process.env.DATABASE_URL;

  if (!dbURL) throw new Error("missing env var: 'DATABASE_URL'");

  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: false,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());
