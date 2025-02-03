import { Router } from "express";
import AuditoruimController from "../controllers/AuditoriumController";

const auditorioRoutes = Router();

const auditorioController = new AuditoruimController();

auditorioRoutes.post("/", auditorioController.create);
auditorioRoutes.get("/", auditorioController.getAll);
auditorioRoutes.get("/concepts", auditorioController.getConcepts);
auditorioRoutes.get("/:id", auditorioController.getOne);
auditorioRoutes.put("/:id", auditorioController.update);
auditorioRoutes.delete("/:id", auditorioController.delete);

export default auditorioRoutes;
