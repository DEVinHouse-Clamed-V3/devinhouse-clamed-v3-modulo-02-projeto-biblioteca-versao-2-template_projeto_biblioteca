import { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../database/data-source";
import { FindOptionsOrderValue, MoreThanOrEqual } from "typeorm";
import Auditorio from "../entities/Auditorio";
import AppError from "../utils/AppError";

class AuditoruimController {
  private AuditoriumRepository;

  constructor() {
    this.AuditoriumRepository = AppDataSource.getRepository(Auditorio);
  }

  create = async (req: Request, res: Response, next: Function) => {
    try {
      const body = req.body;

      if (!body.name) {
        throw new AppError("O campo 'name' é obrigatório", 400);
      } else if (!body.capacity) {
        throw new AppError("O campo 'capacity' é obrigatório", 400);
      } else if (body.capacity < 0) {
        throw new AppError("O campo 'capacity' deve ser maior que zero", 400);
      } else {
        const auditoruim = await this.AuditoriumRepository.save(body);
        res.status(201).json(auditoruim);
      }
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: Function) => {
    try {
      const query = req.query;

      const auditoruims = await this.AuditoriumRepository.find({
        order: {
          name: (query.order as FindOptionsOrderValue) || "ASC",
        },
      });

      res.status(200).json(auditoruims);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: Function) => {
    try {
      const params = req.params;
      const auditoruim = await this.AuditoriumRepository.findOneBy({
        id: Number(params.id),
      });

      if (!auditoruim) {
        throw new AppError("Auditorio não encontrado", 404);
      } else res.status(200).json(auditoruim);
    } catch (error) {
      next(error);
    }
  };

  getConcepts = async (req: Request, res: Response, next: Function) => {
    try {
      const query = req.query;
      const auditoriums = await this.AuditoriumRepository.find({
        order: {
          capacity: (query.order as FindOptionsOrderValue) || "DESC",
        },
        where: {
          has_projector: true,
          has_sound_system: true,
          capacity: MoreThanOrEqual(300),
        },
      });

      return res.json(auditoriums);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: Function) => {
    try {
      const params = req.params;
      const body = req.body;

      if (body.id || body.createdAt || body.updatedAt) {
        throw new AppError("Alterações não permitidas", 403);
      }

      const auditoruim = await this.AuditoriumRepository.findOneBy({
        id: Number(params.id),
      });
      if (!auditoruim) {
        throw new AppError("Produto não encontrado", 404);
      } else {
        Object.assign(auditoruim, body);
        await this.AuditoriumRepository.save(auditoruim);
        res.status(200).json("Produto atualizado com sucesso");
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: Function) => {
    try {
      const params = req.params;
      const auditoruim = await this.AuditoriumRepository.findOneBy({
        id: Number(params.id),
      });

      if (!auditoruim) {
        throw new AppError("Produto não encontrado", 404);
      } else {
        await this.AuditoriumRepository.delete(auditoruim.id);
        res.status(200).json("Produto excluído com sucesso");
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuditoruimController;
