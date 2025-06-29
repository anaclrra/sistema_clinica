import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-user-id"
  );
  app.use(cors());
  next();
});

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({
      message: err.message,
    });
  }
});

server.listen(3333, () => {
  console.log("server on *:3333");
});
