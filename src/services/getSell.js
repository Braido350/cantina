import axios from "axios";

export async function getSell() {
  try {
    const response = await axios.get("/api/registerSell");
    // Retorna todos os dados de venda conforme retornados pela API
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    throw error;
  }
}

// Exemplo de chamada da função para exibir os dados no console
// getSell()
//   .then((data) => {
//     console.log("Vendas:", data);
//   })
//   .catch((error) => {
//     console.error("Erro ao buscar vendas:", error);
//   });
