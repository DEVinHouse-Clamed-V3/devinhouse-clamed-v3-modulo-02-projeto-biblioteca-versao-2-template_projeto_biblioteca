import { Request, Response } from "express";
import { AuditoriumService } from "../services/AuditoriumService";
import AppError from "../errors/AppError";

const service = new AuditoriumService();

export class AuditoriumController {
  async create(req: Request, res: Response) {
    if (!req.body.name || !req.body.capacity || !req.body.location) {
      throw new AppError(
        "Todos os campos obrigatórios devem ser preenchidos.",
        400
      );
    }

    const auditorium = await service.create(req.body);
    return res.status(201).json(auditorium);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError("ID inválido.", 400);

    const auditorium = await service.findById(id);
    if (!auditorium) throw new AppError("Auditório não encontrado.", 404);

    return res.json(auditorium);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError("ID inválido.", 400);

    const updatedAuditorium = await service.update(id, req.body);
    if (!updatedAuditorium)
      throw new AppError("Auditório não encontrado.", 404);

    return res.json(updatedAuditorium);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError("ID inválido.", 400);

    await service.delete(id);
    return res.status(204).send();
  }
}
