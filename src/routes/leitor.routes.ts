import { Router } from "express";
import ReaderController from "../controllers/ReaderController";

const readerRouter = Router();

readerRouter.post("/", ReaderController.create);
readerRouter.get("/", ReaderController.getAll);
readerRouter.get("/:id", ReaderController.getById);
readerRouter.put("/:id", ReaderController.update);
readerRouter.delete("/:id", ReaderController.delete);
readerRouter.get("/birthdays/:month", ReaderController.getBirthdays);

export default readerRouter;
