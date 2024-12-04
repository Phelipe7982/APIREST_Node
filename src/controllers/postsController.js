import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../service/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function postNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro: ": "Falha na requisição." })
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCreated = await createPost(newPost);
        const updatedImage = `uploads/${postCreated.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro: ": "Falha na requisição." })
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:5000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: imgUrl,
            description: description,
            alt: req.body.alt
        }

        const postcreated = await updatePost(id, post);
        res.status(200).json(postcreated);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}