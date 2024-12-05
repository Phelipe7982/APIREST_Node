import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt = "Gere uma descrição em português do Brasil de no máximo sessenta palavras para a seguinte imagem, mas sem dizer 'Aqui está uma descrição para a imagem...'.";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Descrição não disponível...";
    } catch (error) {
        console.error("Erro ao obter a descrição para a imagem: ", error.message, error);
        throw new Error("Erro ao obter a descrição do Gemini.");
    }
}