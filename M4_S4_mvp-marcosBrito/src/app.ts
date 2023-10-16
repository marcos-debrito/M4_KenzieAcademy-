import "express-async-errors";
import express, { Application, json } from "express";
import middlewares from "./middlewares";
import { courseRouter, userRouter } from "./routers";
import sessionRouter from "./routers/session.router";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(middlewares.handleErros);

export default app;
