import { Router } from "express";
import { AuditoriumController } from "../controllers/AuditoriumController";

const router = Router();
const controller = new AuditoriumController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/premium", controller.listPremium);

export default router;
