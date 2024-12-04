import 'dotenv/config';

// Importado do arquivo dbconfig.js
import conectToDb from '../config/dbconfig.js';
// import 'dotenv/config';
import { ObjectId } from 'mongodb';

const conection = await conectToDb(process.env.CONECTION_STRING);

export async function getAllPosts() {
    const db = conection.db("db-imersaodev");
    const colection = db.collection("posts");
    return colection.find().toArray();
}

export async function createPost(newPost) {
    const db = conection.db("db-imersaodev");
    const colection = db.collection("posts");
    return colection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
    const db = conection.db("db-imersaodev");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}