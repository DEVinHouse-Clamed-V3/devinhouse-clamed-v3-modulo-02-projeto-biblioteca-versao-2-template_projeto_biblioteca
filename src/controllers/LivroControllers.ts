import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Livro from "../entities/Livro";
import { Like } from "typeorm";
import AppError from "../utils/AppError";

class LivroController {
    private livroRepository;

    constructor() {
        this.livroRepository = AppDataSource.getRepository(Livro);

        // 🔥 Bindando os métodos para evitar problemas com 'this'
        this.createBook = this.createBook.bind(this);
        this.getAllBooks = this.getAllBooks.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.getRanking = this.getRanking.bind(this);
    }

    async createBook(request: Request, response: Response, next: NextFunction) {
        try {
            const body = request.body;

            if (!body.title) {
                throw new AppError("O título é obrigatório", 400);
            } else if (!body.description) {
                throw new AppError("A descrição é obrigatória", 400);
            } else if (!body.publication_date) {
                throw new AppError("A data de publicação é obrigatória", 400);
            } else if (!body.page_count) {
                throw new AppError("A quantidade de páginas é obrigatória", 400);
            } else {
                const books = await this.livroRepository.save(body);

                // Enviar email (se necessário)

                response.status(201).json(books);
            }
        } catch (error) {
            console.log(error);
            next(error);  // Enviar o erro para o próximo middleware
        }
    }

    async getAllBooks(request: Request, response: Response, next: NextFunction) {
        try {
            const { title, language } = request.query;
            const where: any = {};

            if (title) where.title = Like(`%${title}%`);
            if (language) where.language = Like(`%${language}%`);

            const books = await this.livroRepository.find({ where, order: { title: 'ASC' } });

            response.json(books);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getBookById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const livro = await this.livroRepository.findOneBy({ id });

            if (!livro) throw new AppError("Livro não encontrado", 404);

            response.json(livro);
        } catch (error) {
            next(error);
        }
    }

    async updateBook(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);
            const body = request.body;

            if (body.id || body.created_at || body.updated_at) {
                throw new AppError("Existem informações que não podem ser atualizadas", 403);
            }

            const livro = await this.livroRepository.findOneBy({ id });

            if (!livro) throw new AppError("Livro não encontrado", 404);

            Object.assign(livro, body);

            await this.livroRepository.save(livro);

            response.status(200).json(livro);
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id);

            const livro = await this.livroRepository.findOneBy({ id });

            if (!livro) throw new AppError("Livro não encontrado", 404);

            await this.livroRepository.delete(id);
            response.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    async getRanking(request: Request, response: Response, next: NextFunction) {
        try {
            const books = await this.livroRepository.createQueryBuilder('book')
                .select(['book.language', 'book.title', 'book.page_count'])
                .orderBy('book.page_count', 'DESC')
                .addOrderBy('book.language', 'ASC')
                .limit(3)
                .getMany();

            response.json(books);
        } catch (error) {
            next(error);
        }
    }
}

export default LivroController;
