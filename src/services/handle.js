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
    console.log(formData);
    e.preventDefault();
    const cleanedCPF = formData.cpf.replace(/\D/g, "");
    const cleanedTelefone = formData.telefone.replace(/\D/g, "");
    const validacao = await verificarDadosCliente({
      ...formData,
      cpf: cleanedCPF,
      telefone: cleanedTelefone,
    });
    console.log("validação", validacao);
    if (validacao.success !== true) {
      alert(validacao.error);
      return;
    }
    alert("Salvando Cliente..." + JSON.stringify(formData.nome));
    const response = await axios.post("/api/registerClient", {
      ...formData,
      cpf: cleanedCPF,
      telefone: cleanedTelefone,
    });
    if (!response.status === 201 && !response.data.success) {
      alert("Erro ao cadastrar o Cliente. Tente novamente.");
    } else {
      alert("Cliente cadastrado com sucesso!");
      setFormData({});
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
    console.log(formData);
    e.preventDefault();
    const validacao = await verificarDadosProduto(formData);
    console.log("validação", validacao);
    if (!validacao.success) {
      alert(validacao.error);
      return;
    }
    alert("Salvando Produto..." + JSON.stringify(formData));
    const response = await axios.post("/api/registerProducts", formData);
    if (!response.status === 201 && !response.data.success) {
      alert("Erro ao cadastrar o Produto. Tente novamente.");
    } else {
      alert("Produto cadastrado com sucesso!");
      setFormData({});
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
    alert("Salvando Usuário..." + JSON.stringify(formData));

    const response = await axios.post("/api/registerUser", formData);
    if (response.status === 200 && response.data.success) {
      alert("Usuário autenticado com sucesso!");
      setFormData({});
    } else {
      alert(
        "Erro ao autenticar o Usuário. Verifique os dados e tente novamente."
      );
    }
  },
};
