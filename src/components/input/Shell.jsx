import { useState, useEffect } from "react";
import Button from "../buttons";
import { tratarVendas } from "../../services/verificacoes";
import AsyncSelect from "react-select/async";
import { ColourOption, colourOptions } from "../data";

const Imput = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

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
          <label className="block text-gray-700 text-1xl font-medium mb-2">
            {item.txt}
          </label>
          <input
            type={item.type}
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            onChange={(e) => handleChange(e, item.name)}
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
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
