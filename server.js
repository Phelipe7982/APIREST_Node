// Importando o framework express
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Declarando uma variável qualquer (app) utilizando o express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Dizendo qual porta o nosso servidor está ouvindo as requisições
app.listen(5000, () => {
    console.log("Servidor funcionando...");
});