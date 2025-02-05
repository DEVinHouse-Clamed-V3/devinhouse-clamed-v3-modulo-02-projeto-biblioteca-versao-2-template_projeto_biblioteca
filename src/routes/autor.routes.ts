import { Router } from 'express';
import AuthorController from '../controllers/AuthorController';
const authorController = new AuthorController();
const authorRoutes = Router();

authorRoutes.get('/', authorController.getAll);
authorRoutes.get('/:id', authorController.getById);
authorRoutes.post('/', authorController.create);
authorRoutes.put('/:id', authorController.update);
authorRoutes.delete('/:id', authorController.delete);
authorRoutes.post('/login', authorController.login);
authorRoutes.patch('/:id/status', authorController.disable);

export default authorRoutes;
