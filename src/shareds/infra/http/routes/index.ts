import { Router } from "express";
import fs from "fs";
import path from "path";

export default class Routes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.mapRoutes();
  }

  mapRoutes() {
    const modulesPath = path.resolve("src", "modules");
    fs.readdirSync(modulesPath).forEach((moduleDir) => {
      const modulePath = path.join(modulesPath, moduleDir);

      if (fs.statSync(modulePath).isDirectory()) {
        const routeFilePath = path.join(
          modulePath,
          "infra",
          "http",
          "routes",
          "index.routes.ts"
        );

        if (fs.existsSync(routeFilePath)) {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const routeModule = require(routeFilePath);
          if (routeModule.default) {
            const moduleName = modulePath.split(path.sep).pop();

            this.router.use(`/${moduleName}`, routeModule.default);
          }
        }
      }
    });
  }

  getRouter() {
    return this.router;
  }
}
