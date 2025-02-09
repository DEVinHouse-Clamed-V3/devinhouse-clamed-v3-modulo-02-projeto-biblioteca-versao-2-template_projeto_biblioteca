import { Request, response, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Livro from "../entities/Livro";

class LivrosControllers{

    private livrosRepository;

    constructor() {
        this.livrosRepository = AppDataSource.getRepository(Livro)
      }

    // Método para criar um livro
      public createLivro =  async (req: Request, res: Response) => {
        try{
            const body = req.body
    
            if(!body.title){
                response
                .status(400)
                .json({error: 'O campo título é obrigatório'});
            }
            else if(!body.description){
                response
                .status(400)
                .json({error: 'O campo descrição é obrigatório'});
            }
            else if(!body.publication_date){
                response
                .status(400)
                .json({error: 'O campo data de publicação é obrigatório'});
            }
            else if(!body.isbn){
                response
                .status(400)
                .json({error: 'O campo código ISBN é obrigatório'});
            }
            else if(!body.language){
                response
                .status(400)
                .json({error: 'O campo idioma é obrigatório'});
            }
            else if(!body.page_count){
                response
                .status(400)
                .json({error: 'O campo número de páginas é obrigatório'});
            }
            else {
                const livro = new Livro()
    
                livro.title = body.title
                livro.description = body.description
                livro.publication_date = body.publication_date
                livro.isbn = body.isbn
                livro.language = body.language
                livro.page_count = body.page_count  
                livro.created_at = new Date() 
                livro.updated_at = new Date() 
    
                const booksCreated =  await this.livrosRepository.save(livro)
    
                response.status(200).json(booksCreated)
            } 
    
        } catch(error){
            console.error('Erro ao salvar o livro', error)
            response.status(500).json({error: 'Erro ao salvar o livro'})
        }
    }

      // Método para buscar todos os livros
      public livrosGetAll = async (req: Request, res: Response) => {
        try{
            const livros = await this.livrosRepository.find()
            return res.status(200).json(livros)
    
        } catch(error){
            console.error('Erro ao buscar livros', error)
            response.status(500).json({error: 'Erro ao buscar as livros'})
            }
        }

        // Método para buscar um livro pelo id
        public livrosGetById =  async (req: Request, res: Response) => {
            try{
                const id = Number(req.params.id);
                const booksInDataBase = await this.livrosRepository.findOne({
                    where: {
                        id: id
                    },
                });
        
                if(!booksInDataBase){
                    response.status(404).json({error: 'Livro não encontrado'})
                }else{
                    response.json(booksInDataBase)
                }
            } catch (error) {
                console.error('Erro ao buscar o livro pelo id', error);
                response.status(500).json({error: 'Erro ao buscar o livro pelo id'});
            }
        }

        // Método para deletar um livro pelo id
        public uptadeLivros = async (req: Request, res: Response) => {
            try{
                const id = Number(req.params.id);
                const body = req.body;
        
                if('name' in body && !body.title){
                    response.status(400).json({error: 'O campo titulo não pode ser vazio'})
        
                } else if('description' in body && !body.description){
                    response.status(400).json({error: 'O campo descrição não pode ser vazio'})
        
                } else if('publication_date' in body && !body.publication_date){
                    response.status(400).json({error: 'O campo data de publicação não pode ser vazio'})
        
                } else if('isbn' in body && !body.isbn){
                    response.status(400).json({error: 'O campo código ISBN não pode ser vazio'})
        
                } else if('language' in body && !body.language){
                    response.status(400).json({error: 'O campo idioma não pode ser vazio'})
        
                } else if('page_count' in body && !body.page_count){
                    response.status(400).json({error: 'O campo número de páginas não pode ser vazio'})
        
                }else {
                    const booksInDataBase = await this.livrosRepository.findOne({
                        where: {
                            id: id
                        },
                    });
        
                if(!booksInDataBase){
                    response.status(404).json({error: 'Livro com esse id não encontrado'})
                }else{
                    
                        booksInDataBase.title = body.title
                        booksInDataBase.description = body.description
                        booksInDataBase.publication_date = body.publication_date
                        booksInDataBase.isbn = body.isbn
                        booksInDataBase.language = body.language
                        booksInDataBase.page_count = body.page_count
                        booksInDataBase.updated_at = new Date()
                        booksInDataBase.created_at = booksInDataBase.created_at
        
                        const booksUpdated =  await this.livrosRepository.save(booksInDataBase) 
                        response.json(booksUpdated)
                    }
                }
            }catch{
                response.status(500).json({error: 'Erro ao atualizar o livro'})
            }
        }
    
        // Método para deletar um livro pelo id
        public deleteLivros = async (req: Request, res: Response) => {
            try{
                const id = Number(req.params.id);
                const booksDelected =  await this.livrosRepository.delete(id)
        
                if(booksDelected.affected === 0){
                    response.status(404).json({error: 'Livro não encontrado, e portanto, não foi deletado.'})
                } else{
                    response.status(204).json({ message: 'Livro deletado com sucesso' });
                }
                
            }catch{
                response.status(500).json({error: 'Erro ao deletar o livro'})
            }
        }

        // Método para buscar 3 os livros com mais páginas cadastrados categorizados por linguagem
        public getLivrosRanking = async (req: Request, res: Response) => {
            try {
                const language = String(req.params.language);
        
                const livrosMaisPaginas = await this.livrosRepository.find({
                    where: {
                        language: language, // Filtro pela linguagem
                    },
                    order: {
                        page_count: "DESC", // Ordenação por número de páginas de forma decrescente
                    },
                    take: 3, // Limitar para os 3 primeiros livros
                });
        
                if (livrosMaisPaginas.length > 0) {
                    return res.status(200).json(livrosMaisPaginas);
                } else {
                    return res.status(404).json({ message: "Nenhum livro encontrado para a linguagem especificada." });
                }
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
                return res.status(500).json({ message: "Erro ao buscar os livros." });
            }
        };
              
}

export default LivrosControllers