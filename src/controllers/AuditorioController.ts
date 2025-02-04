import { AppDataSource } from "../database/data-source";
import { NextFunction, Request, Response } from "express";
import { FindOptionsOrderValue } from "typeorm";
import Auditorio from "../entities/Auditorio";
import AppError from "../utils/AppError";

class AuditorioController {
  private auditorioRepository;

  constructor() {
    this.auditorioRepository = AppDataSource.getRepository("Auditorio");
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const auditorio = request.body;

      if (!auditorio.name) {
        throw new AppError("Nome do auditório é obrigatório", 400);
      } else if (!auditorio.capacity) {
        throw new AppError("Capacidade do auditório é obrigatório", 400);
      } else if (!auditorio.location) {
        throw new AppError("Localização do auditório é obrigatório", 400);
      } else if (!auditorio.has_projector) {
        throw new AppError("Informação sobre o projetor é obrigatório", 400);
      } else if (!auditorio.has_sound_system) {
        throw new AppError(
          "Informação sobre o sistema de som é obrigatório",
          400
        );
      } else {
        const newAuditorio = await this.auditorioRepository.save(auditorio);
        response.status(201).json(newAuditorio);
      }
    } catch (error) {
      next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const auditorios = await this.auditorioRepository.find();

      response.status(200).json(auditorios);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = Number(request.params.id);

      const auditorio = await this.auditorioRepository.findOne({
        where: { id },
      });

      if (auditorio) {
        response.json(auditorio);
      } else {
        throw new AppError("Auditorio não encontrado", 404);
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const params = request.params
        const auditorio = request.body

        if(auditorio.id || auditorio.createdAt || auditorio.updatedAt) {
            throw new AppError("Os campos id, createdAt e updatedAt não podem ser atualizados", 403)
        } else if('name' in auditorio && !auditorio.name) {
            throw new AppError('Nome do auditório é obrigatório', 400)
        } else if('capacity' in auditorio && !auditorio.capacity) {
            throw new AppError('Capacidade do auditório é obrigatório', 400)
        } else if('location' in auditorio && !auditorio.location) {
            throw new AppError('Localização do auditório é obrigatório', 400)
        } else if('has_projector' in auditorio && !auditorio.has_projector) {
            throw new AppError('Informação sobre o projetor é obrigatório', 400)
        } else if('has_sound_system' in auditorio && !auditorio.has_sound_system) {
            throw new AppError('Informação sobre o sistema de som é obrigatório', 400)
        } else {
            const auditorioToUpdate = await this.auditorioRepository.findOne({where: {id: Number(params.id)}})
    
            if(auditorioToUpdate) {
                Object.assign(auditorioToUpdate, auditorio)

                await this.auditorioRepository.save(auditorioToUpdate)

                response.status(200).json(auditorioToUpdate)
    
            } else {
                throw new AppError('Auditorio não encontrado', 404)
            }
        }
    } catch (error) {
        next(error)
    }
    }

    delete = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const params = request.params
    
            const auditorioInDataBase = await this.auditorioRepository.findOneBy({
                id: Number(params.id)
            })
    
            if(!auditorioInDataBase) {
                throw new AppError('Auditorio não encontrado', 404)
            } else {
                await this.auditorioRepository.delete(Number(auditorioInDataBase.id))
                response.status(204).json()
            }
        } catch (error) {
            next(error)
        }
    }

    search = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const auditorios = await this.auditorioRepository.find({
                where: {
                    capacity: { $gte: 300 },
                    hasProjector: true,
                    hasSoundSystem: true
                }
            });

            if(auditorios.length === 0) {
                throw new AppError('Nenhum auditório encontrado', 404)
            } else {
                response.status(200).json(auditorios);
            }

        } catch (error) {
            next(error);
        }
    }
}



export default AuditorioController;
