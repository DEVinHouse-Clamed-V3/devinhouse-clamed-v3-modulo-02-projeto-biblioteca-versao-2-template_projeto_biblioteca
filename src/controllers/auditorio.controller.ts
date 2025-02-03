import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Auditorio from "../entities/Auditorio";
import { MoreThanOrEqual } from "typeorm";

export class AuditorioControllers {
  private auditorioRepository;

  constructor() {
    this.auditorioRepository = AppDataSource.getRepository(Auditorio)
  }

  auditoriumCreate = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      console.log("Requisição recebida:", req.body);
      if (!body.name) {
        return res.status(400).json({ error: 'O nome é obrigatório' })
      } else if (!body.capacity) {
        return res.status(400).json({ error: 'A capacidade é obrigatória' })
      } else if (!body.location) {
        return res.status(400).json({ error: 'A localização é obrigatório' })
      } else if (!body.has_projector === undefined) {
        return res.status(400).json({ error: 'Essa informação é obrigatória' })
      } else if (!body.has_sound_system === undefined) {
        return res.status(400).json({ error: 'Essa informação é obrigatória' })
      } else {
        console.log("Tentando salvar o auditório:", body);
        const auditorium = await this.auditorioRepository.save(body)
        console.log("Auditório salvo com sucesso:", auditorium);
        return res.status(201).json(auditorium)
      }
    } catch (error) {
      console.log("Erro ao registrar dados", error)
      return res.status(500).json({ error: "Erro interno" })
    }
  }

  auditoriumGetAll = async (req: Request, res: Response) => {
    try {
      const auditoriums = await this.auditorioRepository.find()
      return res.status(200).json(auditoriums)
    } catch (error) {
      console.error("Erro ao recuperar informações da base de dados", error)
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }

  auditoriumGetById = async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const auditoriumsInDB = await this.auditorioRepository.findOneBy({
        id: parseInt(params.id)
      })
      if (!auditoriumsInDB) {
        res.status(404).json({ error: "Registro não encontrado" })
      } else {
        res.json(auditoriumsInDB)
      }
    } catch (error) {
      console.error("Erro ao recuperar dados")
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }

  updateAuditorium = async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const body = req.body;
      const auditoriumsInDB = await this.auditorioRepository.findOneBy({
        id: parseInt(params.id)
      });
      if (!auditoriumsInDB) {
        res.status(404).json({ error: "Registro não encontrado" })
      } else {
        Object.assign(auditoriumsInDB, body)
        await this.auditorioRepository.save(auditoriumsInDB)
        res.status(200).json(auditoriumsInDB)
      }
    } catch (error) {
      res.status(500).json({ message: "Não foi possível atualizar registro" })
    }
  }

  deleteAuditorium = async (req: Request, res: Response) => {
    try {
      const params = req.params;
      const auditoriumsInDB = await this.auditorioRepository.findOneBy({
        id: parseInt(params.id)
      })
      if (!auditoriumsInDB) {
        res.status(404).json({ error: "Registro não encontrado" });
      } else {
        await this.auditorioRepository.delete(auditoriumsInDB.id);
        res.status(204).json();
      }

    } catch (error) {
      res.status(500).json({ error: "Não foi possível deletar o registro" })
    }
  }

  searchCompleteAuditoriums = async (req: Request, res: Response) => {
    try {
      const params = req.param
      const auditoriumsInDB = await this.auditorioRepository.find({
        where: {
          capacity: MoreThanOrEqual(300),
          has_projector: true,
          has_sound_system: true
        },
      })
      return res.status(200).json(auditoriumsInDB)
    } catch (error) {
      console.error("Erro ao buscar resultados", error);
      return res.status(500).json({ message: "Erro interno do servidor" })
    }
  }
}