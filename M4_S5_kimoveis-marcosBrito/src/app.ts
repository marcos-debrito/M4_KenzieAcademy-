import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import {
  categoryRouter,
  realEstateRouter,
  scheduleRouter,
  sessionRouter,
  userRouter,
} from "./routers";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());

app.use("/login", sessionRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/schedules", scheduleRouter);
app.use("/realEstate", realEstateRouter);

app.use(middlewares.handleErros);

export default app;
