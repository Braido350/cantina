import { useState, useEffect } from "react";
import Button from "./buttons";
import funcClientes from "@/backEnd/InputFunc";

const Input = (props) => {
  const [formData, setFormData] = useState({});
  const { handleChange, handleSave, handleCancel } = funcClientes(
    formData,
    setFormData
  );

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
