import express, { Application, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());
app.use(middlewares.requestLog);

app.post("/products", middlewares.nameExists, logics.createProduct);
app.get("/products", logics.readProducts);

app.get("/products/:id", middlewares.idExists, logics.readProductById);
app.patch("/products/:id", middlewares.idExists, middlewares.nameExists, logics.updateProduct);
app.delete("/products/:id", middlewares.idExists, logics.deleteProduct);

const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
