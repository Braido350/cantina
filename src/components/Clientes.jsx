import { useState } from "react";
import {
  handleChange as handleChangeClient,
  handleSave as handleSaveClient,
  handleCancel as handleCancelClient,
} from "@/services/handle";

export function CadastroClientes(props) {
  const [formData, setFormData] = useState({});

  const handleChange = (e, name) =>
    handleChangeClient(e, formData, setFormData, name);

  const handleSave = async (e) => {
    await handleSaveClient(e, formData, setFormData);
  };

  const handleCancel = (e) => handleCancelClient(e, setFormData);

  const item = [
    {
      id: 1,
      txt: "Nome do Cliente",
      placeholder: "Nome do Cliente",
      name: "nomeCliente",
      type: "text",
    },
    {
      id: 2,
      txt: "Telefone",
      placeholder: "Ex: 69999872557",
      name: "telefone",
      type: "Number",
    },
    {
      id: 3,
      txt: "Cidade",
      placeholder: "Ex: Ariquemes",
      name: "cidade",
      type: "text",
    },
    {
      id: 4,
      txt: "CPF",
      placeholder: "Ex: 00000000000",
      name: "cpf",
      type: "Number",
    },
  ];

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Cadastrar Clientes
        </h1>
      </div>
      {item.map((item) => (
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
