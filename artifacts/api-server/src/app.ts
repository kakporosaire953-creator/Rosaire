import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Simple request logging middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url?.split("?")[0],
  });
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
