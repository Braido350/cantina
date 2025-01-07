import { useState, useEffect } from "react";
import Button from "./buttons";
import { tratarVendas } from "../backEnd/verificacoes";

const Imput = (props) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const initialFormData = {};
    props.imp.forEach((item) => {
      if (item.name === "quantidade") {
        initialFormData[item.name] = 1;
      }
    });
    setFormData(initialFormData);
  }, [props.imp]);

  useEffect(() => {
    setVendido(formData);
  }, [formData]);
  const setVendido = (data) => {
    console.log("Form data set:", data);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const resultado = tratarVendas(formData);
    alert(resultado);
    if (resultado === "Venda realizada com sucesso!") {
      setFormData({});
    }
    console.log("Dados salvos:", formData);
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

export default Imput;
