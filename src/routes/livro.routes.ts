import { Request, Response, Router } from 'express';
import LivrosControllers from '../controllers/LivrosController';

const livroRoutes = Router();
const livrosControllers = new LivrosControllers()

livroRoutes.post("/registerLivro", livrosControllers.createLivro)
livroRoutes.get("/getLivro", livrosControllers.livrosGetAll)
livroRoutes.get("/getLivro/:id", livrosControllers.livrosGetById)
livroRoutes.put("/uptadeLivro/:id", livrosControllers.uptadeLivros)
livroRoutes.delete("/deleteLivro/:id", livrosControllers.deleteLivros)
livroRoutes.delete("/rankingLivro", livrosControllers.getLivrosRanking)

export default livroRoutes; 

