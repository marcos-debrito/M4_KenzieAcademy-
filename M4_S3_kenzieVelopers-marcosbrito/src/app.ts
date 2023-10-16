import "express-async-errors";
import express, { Application, json } from "express";
import { developerRouter, projectsRouter } from "./routers";
import { handleErrors } from "./middlewares";

const app: Application = express();
app.use(json());

app.use("/developers", developerRouter);
app.use("/projects", projectsRouter);

app.use(handleErrors);

export default app;
