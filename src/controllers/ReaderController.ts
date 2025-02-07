import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Reader from "../entities/Leitor";
import { Between } from "typeorm";

class ReaderController {
  static async create(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const { name, email, phone_number, birthdate, address, active } = req.body;

    try {
      const newReader = repo.create({
        name,
        email,
        phone_number,
        birthdate,
        address,
        active,
      });
      await repo.save(newReader);
      return res.status(201).json(newReader);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar leitor", error });
    }
  }

  static async getAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const { name } = req.query;

    const readers = await repo.find({
      where: name ? { name: String(name) } : {},
      order: { created_at: "DESC" },
    });

    return res.json(readers);
  }

  static async getById(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const reader = await repo.findOneBy({ id: Number(req.params.id) });

    if (!reader) {
      return res.status(404).json({ message: "Leitor não encontrado" });
    }

    return res.json(reader);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const { name, email, phone_number, address, active } = req.body;

    const reader = await repo.findOneBy({ id: Number(req.params.id) });

    if (!reader) {
      return res.status(404).json({ message: "Leitor não encontrado" });
    }

    reader.name = name || reader.name;
    reader.email = email || reader.email;
    reader.phone_number = phone_number || reader.phone_number;
    reader.address = address || reader.address;
    reader.active = active ?? reader.active;

    await repo.save(reader);
    return res.json(reader);
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const reader = await repo.findOneBy({ id: Number(req.params.id) });

    if (!reader) {
      return res.status(404).json({ message: "Leitor não encontrado" });
    }

    await repo.remove(reader);
    return res.status(204).send();
  }

  static async getBirthdays(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Reader);
    const month = Number(req.params.month);

    if (month < 1 || month > 12) {
      return res
        .status(400)
        .json({ message: "Mês inválido. Use valores entre 1 e 12." });
    }

    const readers = await repo.find({
      where: {
        birthdate: Between(
          new Date(new Date().getFullYear(), month - 1, 1),
          new Date(new Date().getFullYear(), month, 0)
        ),
      },
    });

    return res.json(readers);
  }
}

export default ReaderController;
