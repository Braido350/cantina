import { useState } from "react";
import Button from "./buttons";
import { tratarDadosCliente } from "@/backEnd/tratarDados";

const Imput = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const resultado = tratarDadosCliente(formData);
    alert(resultado);
    if (resultado === "Cliente cadastrado com sucesso!") {
      setFormData({});
    }
    console.log("Dados salvos:", formData);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    setFormData({});
    console.log("Ação cancelada");
  };

  return (
    <form>
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
    </form>
  );
};

export default Imput;
