import { useState } from "react";
import Button from "../buttons";
import {
  handleChange as handleChangeClient,
  handleSave as handleSaveClient,
  handleCancel as handleCancelClient,
} from "@/services/handle";

const Input = (props) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) =>
    handleChangeClient(e, formData, setFormData, name);

  const handleSave = async (e) => {
    await handleSaveClient(e, formData, setFormData);
  };

  const handleCancel = (e) => handleCancelClient(e, setFormData);

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
