import { useState } from "react";
import Button from "../buttons";
import { verificarDadosCliente } from "@/services/verificacoes";

const Input = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const validacao = verificarDadosCliente(formData);
    if (validacao.error) {
      alert(validacao.error);
      return;
    }
    alert("Cliente cadastrado com sucesso!");
    try {
      const response = await axios.post("/api/registerClient", props);
      if (response.status === 200 && response.data.success) {
        return { success: true };
      } else {
        return {
          error:
            "Erro ao cadastrar cliente. Verifique os dados e tente novamente.",
        };
      }
    } catch (error) {
      return `Erro ao cadastrar cliente. ${error}`;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({});
    alert("Ação cancelada");
  };

  return (
    <>
      {props.imp.map((item) => (
        <div className="mb-4" key={item.id}>
          <label className="block text-gray-700 text-1xl font-medium mb-2">
            {item.txt}
          </label>
          <input
            type="text"
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            value={formData[item.name] || ""}
            onChange={(e) => handleChange(e, item.name)}
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
      ))}
      <Button
        onSave={handleSave}
        onCancel={handleCancel}
        verde="Salvar"
        vermelho="Cancelar"
      />
    </>
  );
};

export default Input;
