import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Author from '../entities/Autor';
import { AppDataSource } from '../database/data-source';

class AuthorController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const authors = await AppDataSource.getRepository(Author).find({
        where: { active: true },
      });
      res.status(200).json(authors);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar autores', error: error.message });
      return;
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const author = await AppDataSource.getRepository(Author).findOne({
        where: { id, active: true },
      });

      if (!author) {
        res.status(404).json({ message: 'Autor não encontrado' });
        return;
      }

      res.status(200).json(author);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar autor', error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, nationality, biography, birth_date, login, password } =
        req.body;

      if (!name || !nationality || !birth_date || !login || !password) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const senhaCriptografada = await bcrypt.hash(password, salt);

      const author = new Author();
      author.name = name;
      author.nationality = nationality;
      author.biography = biography || null;
      author.birth_date = new Date(birth_date);
      author.login = login;
      author.password = senhaCriptografada;
      author.created_at = new Date();
      author.updated_at = new Date();

      const savedAuthor = await AppDataSource.getRepository(Author).save(
        author
      );
      res.status(201).json(savedAuthor);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar autor', error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const body = req.body;

      if (body.id) {
        res.status(400).json({ message: 'Não é permitido atualizar o ID' });
        return;
      }

      const authorRepository = AppDataSource.getRepository(Author);
      const author = await authorRepository.findOne({ where: { id } });

      if (!author) {
        res.status(404).json({ message: 'Autor não encontrado' });
        return;
      }

      //obejct.assign copia os valores de req.body para o objeto author
      Object.assign(author, body);
      author.updated_at = new Date();

      const updatedAuthor = await authorRepository.save(author);
      res.status(200).json(updatedAuthor);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao atualizar autor', error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleteResult = await AppDataSource.getRepository(Author).delete(id);

      if (deleteResult.affected === 0) {
        res.status(404).json({ message: 'Autor não encontrado' });
        return;
      }

      res.status(200).json({ message: 'Autor excluído com sucesso' });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao excluir autor', error: error.message });
    }
  }

  async disable(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const authorRepository = AppDataSource.getRepository(Author);
      const author = await authorRepository.findOne({ where: { id } });

      if (!author) {
        res.status(404).json({ message: 'Autor não encontrado' });
        return;
      }

      author.active === true ? (author.active = false) : (author.active = true);

      const updatedAuthor = await authorRepository.save(author);
      res.status(200).json(updatedAuthor);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao desativar autor', error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, password } = req.body;

      const user = await AppDataSource.getRepository(Author).findOne({
        where: { login },
      });

      if (!user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
      }

      const senhaValida = await bcrypt.compare(password, user.password);

      if (senhaValida) {
        res.status(200).json({ message: 'Usuário autenticado' });
      } else {
        res.status(400).json({ message: 'Senha incorreta' });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao autenticar usuário', error: error.message });
    }
  }
}

export default AuthorController;
