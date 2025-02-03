import "reflect-metadata";
import express from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";

import livroRoutes from "./routes/livro.routes";
import auditorioRoutes from "./routes/auditorio.routes";
import autorRoutes from "./routes/autor.routes";
import leitorRoutes from "./routes/leitor.routes";

const app = express();

app.use(cors());

app.use(express.json());

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
      console.log("O servidor está rodando em http://localhost:3000")
  })
}).catch(error => console.log(error))

  
app.use("/livros", livroRoutes);
app.use("/auditorios", auditorioRoutes);
app.use("/autores", autorRoutes);
app.use("/leitores", leitorRoutes);


