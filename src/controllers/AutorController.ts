import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Author } from "../entities/Autor";
import { AppError } from "../utils/AppError";

export class AuthorController {
    async create(req: Request, res: Response) {
        const { name, birthdate, biography, nationality, active } = req.body;
        
        const authorRepository = AppDataSource.getRepository(Author);
        
        const author = authorRepository.create({
            name,
            birthdate,
            biography,
            nationality,
            active
        });

        await authorRepository.save(author);
        
        return res.status(201).json(author);
    }

    async findAll(req: Request, res: Response) {
        const { name } = req.query;
        
        const authorRepository = AppDataSource.getRepository(Author);
        
        const query = authorRepository.createQueryBuilder("author");
        
        if (name) {
            query.where("author.name ILIKE :name", { name: `%${name}%` });
        }
        
        const authors = await query.getMany();
        
        return res.json(authors);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        
        const authorRepository = AppDataSource.getRepository(Author);
        
        const author = await authorRepository.findOne({ where: { id: Number(id) } });
        
        if (!author) {
            throw new AppError("Author not found", 404);
        }
        
        return res.json(author);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, birthdate, biography, nationality, active } = req.body;
        
        const authorRepository = AppDataSource.getRepository(Author);
        
        const author = await authorRepository.findOne({ where: { id: Number(id) } });
        
        if (!author) {
            throw new AppError("Author not found", 404);
        }
        
        author.name = name ?? author.name;
        author.birthdate = birthdate ?? author.birthdate;
        author.biography = biography ?? author.biography;
        author.nationality = nationality ?? author.nationality;
        author.active = active ?? author.active;
        
        await authorRepository.save(author);
        
        return res.json(author);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        
        const authorRepository = AppDataSource.getRepository(Author);
        
        const author = await authorRepository.findOne({ where: { id: Number(id) } });
        
        if (!author) {
            throw new AppError("Author not found", 404);
        }
        
        await authorRepository.remove(author);
        
        return res.status(204).send();
    }

    async findAuthorsOfTheMonth(req: Request, res: Response) {
        const authorRepository = AppDataSource.getRepository(Author);
        
        const currentMonth = new Date().getMonth() + 1;
        
        const authors = await authorRepository
            .createQueryBuilder("author")
            .where("EXTRACT(MONTH FROM author.birthdate) = :month", { month: currentMonth })
            .getMany();
        
        return res.json(authors);
    }
}