import axios from "axios";
import { verificarDadosCliente, verificarDadosProduto } from "./verificacoes";

export const handleClient = {
  handleChange: (e, formData, setFormData, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  },

  handleSave: async (e, formData, setFormData) => {
    e.preventDefault();
    const validacao = verificarDadosCliente(formData);
    if (!validacao.success) {
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
  },

  handleCancel: (e, setFormData) => {
    e.preventDefault();
    setFormData({});
    alert("Ação cancelada");
  },
};

export const handleProdutos = {
  handleChange: (e, formData, setFormData, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  },

  handleSave: async (e, formData, setFormData) => {
    e.preventDefault();
    console.log(formData);
    const validacao = verificarDadosProduto(formData);
    if (!validacao.success) {
      alert(validacao.error);
      return;
    }
    alert("Salvando Produto..." + JSON.stringify(formData));
    try {
      const response = await axios.post("/api/registerProduto", formData);
      if (response.status === 201 && response.data.success) {
        alert("Produto cadastrado com sucesso!");
        setFormData({});
      } else {
        alert(
          "Erro ao cadastrar o Produto. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      if (error.response) {
        alert(`Erro ao cadastrar o Produto: ${error.response.data.error}`);
      } else if (error.request) {
        alert("Erro ao cadastrar o Produto: Nenhuma resposta do servidor.");
      } else {
        alert(`Erro ao cadastrar o Produto: ${error.message}`);
      }
      console.error("Erro ao cadastrar o Produto:", error);
    }
  },

  handleCancel: (e, setFormData) => {
    e.preventDefault();
    setFormData({});
    alert("Ação cancelada");
  },
};

export const handleUsuarios = {
  handleSave: async (e, formData, setFormData) => {
    e.preventDefault();
    // Caso seja necessário implementar validações para usuário, faça aqui.
    alert("Salvando Usuário..." + JSON.stringify(formData));
    try {
      const response = await axios.post("/api/login", formData);
      // No login o status pode ser 200 ou outro valor definido pela API.
      if (response.status === 200 && response.data.success) {
        alert("Usuário autenticado com sucesso!");
        setFormData({});
      } else {
        alert(
          "Erro ao autenticar o Usuário. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      if (error.response) {
        alert(`Erro ao autenticar o Usuário: ${error.response.data.error}`);
      } else if (error.request) {
        alert("Erro ao autenticar o Usuário: Nenhuma resposta do servidor.");
      } else {
        alert(`Erro ao autenticar o Usuário: ${error.message}`);
      }
      console.error("Erro ao autenticar o Usuário:", error);
    }
  },
};
