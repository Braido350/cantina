import axios from "axios";
import { verificarDadosCliente } from "@/services/verificacoes";

export const handleChange = (e, formData, setFormData, name) => {
  setFormData({
    ...formData,
    [name]: e.target.value,
  });
};

export const handleSave = async (e, formData, setFormData) => {
  e.preventDefault();
  const validacao = verificarDadosCliente(formData);
  if (validacao.error) {
    alert(validacao.error);
    return;
  }
  alert("Salvando Cliente..." + JSON.stringify(formData));
  try {
    const response = await axios.post("/api/registerClient", formData);
    if (response.status === 201 && response.data.success) {
      alert("Cliente cadastrado com sucesso!");
      setFormData({});
    } else {
      alert(
        "Erro ao cadastrar o Cliente. Verifique os dados e tente novamente."
      );
    }
  } catch (error) {
    if (error.response) {
      alert(`Erro ao cadastrar o Cliente: ${error.response.data.error}`);
    } else if (error.request) {
      alert("Erro ao cadastrar o Cliente: Nenhuma resposta do servidor.");
    } else {
      alert(`Erro ao cadastrar o Cliente: ${error.message}`);
    }
    console.error("Erro ao cadastrar o Cliente:", error);
  }
};

export const handleCancel = (e, setFormData) => {
  e.preventDefault();
  setFormData({});
  alert("Ação cancelada");
};
