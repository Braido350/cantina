import { useState } from "react";
import { handleClient } from "../../../services/handle";
import { Itens } from "../../../services/itens";

export function CadastroClientes(props) {
  const {
    handleChange: handleChangeClient,
    handleSave: handleSaveClient,
    handleCancel: handleCancelClient,
  } = handleClient;

  const { Clientes: item } = Itens;

  const [formData, setFormData] = useState({});

  const handleChange = (e, name) =>
    handleChangeClient(e, formData, setFormData, name);

  const handleSave = async (e) => {
    await handleSaveClient(e, formData, setFormData);
  };

  const handleCancel = (e) => handleCancelClient(e, setFormData);

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h2>Cadastrar Clientes</h2>
      </div>
      {item.map((item) => (
        <div className="mb-4" key={item.id}>
          <label>{item.txt}</label>
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

      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          type="button"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Salvar
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CadastroClientes;
