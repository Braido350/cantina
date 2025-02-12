import axios from "axios";

export async function getClientes() {
  try {
    const token = localStorage.getItem("@Auth:token");
    const response = await axios.get("/api/registerClient", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const clientes = response.data.map((cliente) => ({
      value: cliente.id,
      label: cliente.nome,
    }));
    return clientes;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

// Chamada da função para exibir os dados no console
// getClientes()
//   .then((data) => {
//     console.log("Clientes:", data);
//   })
//   .catch((error) => {
//     console.error("Erro ao buscar clientes:", error);
//   });
