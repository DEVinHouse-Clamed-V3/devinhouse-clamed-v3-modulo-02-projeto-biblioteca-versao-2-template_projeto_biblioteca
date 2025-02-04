import { Router } from 'express';
import AuthorController from '../controllers/author.controllert';

const autorRoutes = Router();
const authorController = new AuthorController();

autorRoutes.post("/", authorController.createAuthors);
autorRoutes.get("/", authorController.getAllAuthors);
autorRoutes.get("/:id", authorController.getAuthorById);
autorRoutes.put("/:id", authorController.updateAuthor);
autorRoutes.delete("/:id", authorController.deleteAuthor);
autorRoutes.get("/month", authorController.getAuthorsByMonth);

export default autorRoutes;
