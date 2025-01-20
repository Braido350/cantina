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
    alert("Dados do formData: " + JSON.stringify(formData));
    const resultado = verificarDadosCliente(formData);
    if (resultado === "Cliente cadastrado com sucesso!") {
      alert(resultado);
      setFormData({});
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
          <label
            className="block text-gray-700 text-1xl font-medium mb-2"
            htmlFor={item.name}
          >
            {item.txt}
          </label>
          <input
            type="text"
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
            onChange={(e) => handleChange(e, item.name)}
            value={formData[item.name] || ""}
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
