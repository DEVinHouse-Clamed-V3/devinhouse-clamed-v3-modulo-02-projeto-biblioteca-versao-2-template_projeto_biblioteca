import "reflect-metadata";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";

import livroRoutes from "./routes/livro.routes";
import auditorioRoutes from "./routes/auditorio.routes";
import autorRoutes from "./routes/autor.routes";
import leitorRoutes from "./routes/leitor.routes";
import httpErrorMiddleware from "./middleware/ErrorMiddleware";

const app = express();

app.use(cors());

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log("Sua conexão com banco de dados está ok");
  })
  .catch(() => console.log("Erro ao conectar com o banco de dados"));

  
app.use("/livros", livroRoutes);
app.use("/auditorios", auditorioRoutes);
app.use("/autores", autorRoutes);
app.use("/leitores", leitorRoutes);

app.use(httpErrorMiddleware);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
