import { Router } from "express";
import { AuthorController } from "../controllers/AutorController";

const authorRoutes = Router();
const authorController = new AuthorController();

authorRoutes.post("/", authorController.create);
authorRoutes.get("/", authorController.findAll);
authorRoutes.get("/month", authorController.findAuthorsOfTheMonth);
authorRoutes.get("/:id", authorController.findById);
authorRoutes.put("/:id", authorController.update);
authorRoutes.delete("/:id", authorController.delete);

export { authorRoutes };