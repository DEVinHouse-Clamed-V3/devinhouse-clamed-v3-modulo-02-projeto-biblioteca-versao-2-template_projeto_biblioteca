import { Router } from 'express';
import { AuditorioControllers } from '../controllers/auditorio.controller';

const auditorioRoutes = Router();
const auditorioControllers = new AuditorioControllers()

auditorioRoutes.post("/", auditorioControllers.auditoriumCreate)
auditorioRoutes.get("/", auditorioControllers.auditoriumGetAll)
auditorioRoutes.get("/:id", auditorioControllers.auditoriumGetById)
auditorioRoutes.get("/:id/search", auditorioControllers.searchCompleteAuditoriums)
auditorioRoutes.put("/id", auditorioControllers.updateAuditorium)
auditorioRoutes.delete("/:id", auditorioControllers.deleteAuditorium)

export default auditorioRoutes;