import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import "../../container/index";

import swaggerUi from "swagger-ui-express";
const swaggerFile = require("../../../../swagger-output.json");

import express, { Application } from "express";
import cors from "cors";
import { postgresDataSource } from "../typeorm";
import { errorHandler } from "./middlewares/errorHandler";
import Routes from "./routes";
import { corsOptions } from "../../../config/cors.config";

export default class App {
  private app: Application;
  private router: Routes;

  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
