import { Request, Response, Router } from 'express';
import LivroController from '../controllers/LivroControllers';
const livroRoutes = Router();

const livroControllers = new LivroController();

livroRoutes.get("/", livroControllers.getAllBooks);
livroRoutes.get("/:id", livroControllers.getBookById);
livroRoutes.post("/", livroControllers.createBook);
livroRoutes.delete('/:id', livroControllers.deleteBook)
livroRoutes.put('/:id', livroControllers.updateBook)
livroRoutes.patch("/:id/ranking", livroControllers.getRanking)


export default livroRoutes;







