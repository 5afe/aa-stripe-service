import express, { Application, Router, Request, Response } from "express";
import cors from "cors";

import logger, { log } from "./lib/logger/logger";

export type RequestType<ParamsType, BodyType> = Request<
  ParamsType,
  {},
  BodyType
>;

export type ResponseType = Response;

const ALLOW_ALL_DOMAINS = "*";

class Server {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(logger);
  }

  start(serverPort: string) {
    this.app.listen(serverPort, () => {
      log.info(`Server running on port: ${serverPort}`);
    });
  }

  registerRoutes(routes: Router[]) {
    routes.forEach((route) => {
      this.app.use(route);
    });
  }

  configureCors(origins?: string[]) {
    this.app.options("*", cors<Request>());
    this.app.post(
      "*",
      cors<Request>({
        origin: origins || ALLOW_ALL_DOMAINS,
      })
    );
    this.app.get(
      "*",
      cors<Request>({
        origin: origins || ALLOW_ALL_DOMAINS,
      })
    );
  }
}

export default Server;
