
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using process.env.API_KEY directly as required by guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const fetchIntroText = async (): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Crie uma introdução curta (max 2 frases), épica e inspiradora para um jogo de gestão escolar espacial. Português.",
    });
    return response.text || "Toda escola que cresce precisa enfrentar uma grande missão. Hoje, você assume o comando da sua!";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Toda escola que cresce precisa enfrentar uma grande missão. Hoje, você assume o comando da sua!";
  }
};

export const fetchOutroText = async (): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Crie uma mensagem de 'Missão Cumprida' curta (max 2 frases) para um diretor de escola espacial vitorioso. Português.",
    });
    return response.text || "Pilotar a gestão escolar não é simples. Mas com estabilidade e suporte, tudo fica mais leve.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Pilotar a gestão escolar não é simples. Mas com estabilidade e suporte, tudo fica mais leve.";
  }
};
