import { useState } from "react";
import axios from "axios";
import Button from "../buttons";
import { verificarDadosProduto } from "@/services/verificacoes";

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
    const validacao = verificarDadosProduto(formData);
    if (validacao.error) {
      alert(validacao.error);
      return;
    }
    alert("Salvando Produto..." + JSON.stringify(formData));
    try {
      const response = await axios.post("/api/registerProducts", formData);
      if (response.status === 200 && response.data.success) {
        return { success: true };
      } else {
        return {
          error:
            "Erro ao cadastrar o Produto. Verifique os dados e tente novamente.",
        };
      }
    } catch (error) {
      console.error("Erro ao cadastrar o Produto:", error);
      return {
        error:
          "Erro ao cadastrar o Produto. Verifique os dados e tente novamente.",
      };
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({});
    console.log("Ação cancelada");
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
