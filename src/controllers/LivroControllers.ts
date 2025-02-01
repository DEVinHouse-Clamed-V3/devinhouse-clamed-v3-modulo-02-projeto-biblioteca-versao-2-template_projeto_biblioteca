import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Livro from "../entities/Livro";
import { Like } from "typeorm";
import AppError from "../utils/AppError";

class LivroController {
  private livroRepository;

  constructor() {
    this.livroRepository = AppDataSource.getRepository(Livro);
  }

  // Adicionar um novo livro
  createBook = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
    try {
      const body = request.body;
      const title = body.title;
      const description = body.description;
      const publication_date = body.publication_date;
      const isbn = body.isbn;
      const page_count = body.page_count;
      const language = body.language;

      if (!title) {
        throw new AppError("O título é obrigatório", 400);
      }
      if (!description) {
        throw new AppError("A descrição é obrigatória", 400);
      }
      if (!isbn) {
        throw new AppError("O código ISBN é obrigatório", 400);
      }

      const livro = this.livroRepository.create({
        title: title,
        description: description,
        publication_date: publication_date,
        isbn: isbn,
        page_count: page_count,
        language: language
      });

      await this.livroRepository.save(livro);

      response.status(201).json(livro);
    } catch (error) {
      next(error);
    }
  };

  // Buscar todos os livros com possibilidade de filtro
  getAllBooks = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
    try {
      const query = request.query;
      const title = query.title;
      const language = query.language;
      const where: any = {};

      if (title) {
        where.title = Like(`%${title}%`);
      }
      if (language) {
        where.language = Like(`%${language}%`);
      }

      const books = await this.livroRepository.find({
        where: where,
        order: { title: 'ASC' }
      });

      response.json(books);
    } catch (error) {
      next(error);
    }
  };

  // Buscar um livro específico pelo ID
  getBookById = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
    try {
      const params = request.params;
      const id = parseInt(params.id);

      const livro = await this.livroRepository.findOneBy({ id: id });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      response.json(livro);
    } catch (error) {
      next(error);
    }
  };

  // Atualizar as informações de um livro
  updateBook = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
    try {
      const params = request.params;
      const body = request.body;
      const id = parseInt(params.id);

      if (body.id || body.created_at || body.updated_at) {
        throw new AppError("Existem informações que não podem ser atualizadas", 403);
      }

      const livro = await this.livroRepository.findOneBy({ id: id });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      livro.title = body.title;
      livro.description = body.description;
      livro.publication_date = body.publication_date;
      livro.page_count = body.page_count;
      livro.language = body.language;
      livro.isbn = body.isbn;

      await this.livroRepository.save(livro);

      response.status(200).json(livro);
    } catch (error) {
      next(error);
    }
  };

  // Deletar um livro
  deleteBook = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
    try {
      const params = request.params;
      const id = parseInt(params.id);

      const livro = await this.livroRepository.findOneBy({ id: id });

      if (!livro) {
        throw new AppError("Livro não encontrado", 404);
      }

      await this.livroRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // Buscar ranking de livros com mais páginas categorizadas por língua
  getRanking = async function (this: LivroController, request: Request, response: Response, next: NextFunction) {
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
  };
}

export default LivroController;
