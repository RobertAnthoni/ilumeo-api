import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import "../../container/index";

import express, { Application } from "express";
import { postgresDataSource } from "../typeorm";
import { errorHandler } from "./middlewares/errorHandler";
import Routes from "./routes";

export default class App {
  private app: Application;
  private router: Routes;

  constructor() {
    this.app = express();
    this.app.use(express.json());

    this.router = new Routes();
    this.app.use("/api", this.router.getRouter());
    this.app.use(errorHandler);
  }

  async handle(port: Number) {
    const appName = process.env.APPLICATION_NAME;

    await postgresDataSource.initialize();

    if (postgresDataSource.isInitialized) {
      this.app.listen(port, () => {
        console.log(`[${appName}] - Rodando na porta ${port}`);
      });
    }
  }
}
