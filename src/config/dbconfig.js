import { MongoClient } from 'mongodb';

// Este "export default significa que a gente pode usar essa função deste arquivo em outro arquivo"
export default async function conectToDb(conectionString) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(conectionString);
        console.log("Conectando ao cluster do banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        return mongoClient;
    } catch (error) {
        console.error("Falha na conexão com o banco!", error);
        process.exit();
    }
}