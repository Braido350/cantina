import verificacoes from "./verificacoes.js";

const funcClientes = (formData, setFormData) => ({
  handleChange: (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  },
  handleSave: (e) => {
    e.preventDefault();
    const resultado = verificacoes.verificarDadosCliente(formData);
    alert(resultado);
    if (resultado === "Cliente cadastrado com sucesso!") {
      setFormData({});
    }
    console.log("Dados salvos:", formData);
  },
  handleCancel: (e) => {
    e.preventDefault();
    setFormData({});
    console.log("Ação cancelada");
  },
});

export default funcClientes;
