import axios from "axios";

export async function isValid() {
  try {
    const response = await axios.post("/api/login");
    const validLoguin = "";
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}
