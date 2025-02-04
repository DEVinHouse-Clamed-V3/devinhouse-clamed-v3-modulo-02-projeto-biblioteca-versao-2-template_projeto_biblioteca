import { AppDataSource } from "../database/data-source";
import Autor from "../entities/Autor";
import { NextFunction, Request, Response } from "express";
import ErrorExtension from "../utils/ErrorExtension";
import { Like } from "typeorm";

class AuthorController {
    private authorRepository;

    constructor() {
        this.authorRepository = AppDataSource.getRepository(Autor);
    }

    public async createAuthors(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, birthdate, biography, nationality, active } = req.body;

            if (!name || !birthdate || !biography || !nationality || !active) {
                throw new ErrorExtension(400, "Os campos são obrigatórios.");
            }

            const autor = this.authorRepository.create({
                name,
                birthdate,
                biography,
                nationality,
                active
            });

            await this.authorRepository.save(autor);
            res.status(201).json(autor);
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao cadastrar autor"));
        }
    }

    public async getAllAuthors(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;
            let authors;

            if (name) {
                authors = await this.authorRepository.find({
                    where: { name: Like(`%${name}%`) }
                });
            } else {
                authors = await this.authorRepository.find();
            }

            res.status(200).json(authors);
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao buscar autores"));
        }
    }

    public async getAuthorById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorExtension(400, "O campo ID é obrigatório");
            }

            const author = await this.authorRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!author) {
                throw new ErrorExtension(404, "Autor não foi encontrado.");
            }

            res.status(200).json(author);
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao buscar autor"));
        }
    }

    public async updateAuthor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { created_at, updated_at } = req.body;

            if (id || created_at || updated_at) {
                throw new ErrorExtension(403, "Os campos id, created_at e updated_at não podem ser alterados.");
            }

            const author = await this.authorRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!author) {
                throw new ErrorExtension(404, "Autor informado não existe.");
            }

            Object.assign(author, req.body);
            await this.authorRepository.save(author);
            res.status(200).json(author);
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao atualizar autor"));
        }
    }

    public async deleteAuthor(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new ErrorExtension(400, "O campo ID é obrigatório");
            }

            const author = await this.authorRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!author) {
                throw new ErrorExtension(404, "Autor não foi encontrado.");
            }

            await this.authorRepository.delete(author);
            res.status(200).json({ message: "Autor removido com sucesso." });
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao remover autor"));
        }
    }

    public async getAuthorsByMonth(req: Request, res: Response, next: NextFunction) {
        try {
            const authors = await this.authorRepository.createQueryBuilder("autor")
                .where("EXTRACT(MONTH FROM autor.birthdate) = EXTRACT(MONTH FROM CURRENT_DATE)")
                .getMany();

            res.status(200).json(authors);
        } catch (error) {
            next(new ErrorExtension(500, "Erro ao buscar autores"));
        }
    }
}

export default AuthorController;
