import express from 'express';
import multer from 'multer';        // Importa o Multer para lidar com uploads de arquivos
import { listPosts, postNewPost, updateNewPost, uploadImage } from '../controllers/postsController.js';
import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
});

// Cria uma instância do middleware Multer
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    // Dizendo que o nosso servidor em express irá utilizar respostas em formato json
    app.use(express.json());

    app.use(cors(corsOptions));

    // Nossa primeira rota (página inicial)
    app.get("/", (req, res) => {
        res.status(200).send("Bem-vindo à nossa HomePage!");
    });

    // Nossa segunda rota mostrando todos os posts do nosso array em formato json
    app.get("/posts", listPosts);

    // Rota para criar um novo post
    app.post("/posts", postNewPost); // Chama a função controladora para criação de posts

    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImage); // Chama a função controladora para processamento da imagem

    // Função para achar o post específico que a gente quer, usando o seu id
    app.put("/upload/:id", updateNewPost);
}


// Outra forma de você exportar uma arrow function
export default routes;