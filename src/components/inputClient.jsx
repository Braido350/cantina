import { useState } from "react";
import Button from "./buttons";
import { verificarDadosCliente } from "@/services/verificacoes";

const Input = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validacao = verificarDadosCliente(formData);
    if (validacao.error) {
      alert(validacao.error);
      return;
    }
    alert(validacao);
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
