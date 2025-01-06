import { useState } from "react";
import Button from "./buttons";

const Imput = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, nome) => {
    setFormData({
      ...formData,
      [nome]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(tratarDadosCliente(formDat));
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
            htmlFor={item.nome}
          >
            {item.nome}
          </label>
          <input
            type="text"
            id={item.nome}
            name={item.nome}
            placeholder={item.placeholder}
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
            onChange={(e) => handleChange(e, item.nome)}
            value={formData[item.nome] || ""}
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
