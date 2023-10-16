import express, { Application } from "express";
import {
  addMovie,
  getMovies,
  updateMovie,
  getMoviesById,
  deleteMovie,
} from "./logic";
import { startDatabase } from "./database";
import {
  verifyCategory,
  verifyNameExists,
  verifyIdExists,
} from "./middlewares";

const app: Application = express();
app.use(express.json());

app.get("/movies", verifyCategory, getMovies);
app.post("/movies", verifyNameExists, addMovie);

app.patch("/movies/:id", verifyIdExists, verifyNameExists, updateMovie);
app.get("/movies/:id", verifyIdExists, getMoviesById);
app.delete("/movies/:id", verifyIdExists, deleteMovie);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running");
});
