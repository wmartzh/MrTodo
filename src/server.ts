import express, { Application } from "express";
import bodyParser from "body-parser";
import * as http from "http";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

export default class Server {
  //Load router
  router(routes: (app: Application) => void) {
    routes(app);
    return this;
  }
  //Listen server
  listen(port: number, hostname: string): Application {
    http.createServer(app).listen(port, hostname, () => {
      console.log(
        `⭐Server running adonis and listen on http://${hostname}:${port} `
      );
    });
    return app;
  }
}
