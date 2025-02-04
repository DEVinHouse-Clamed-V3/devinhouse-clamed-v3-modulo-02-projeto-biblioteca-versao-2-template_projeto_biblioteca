import { Router } from 'express';
import AuditorioController from '../controllers/AuditorioController';

const auditorioRoutes = Router();

const auditorioController = new AuditorioController()


auditorioRoutes.get('/', auditorioController.getAll)

auditorioRoutes.get('/:id', auditorioController.getOne)

auditorioRoutes.post('/',auditorioController.create)

auditorioRoutes.put('/:id', auditorioController.update)

auditorioRoutes.delete('/:id', auditorioController.delete)

auditorioRoutes.get('/search', auditorioController.search)


export default auditorioRoutes;