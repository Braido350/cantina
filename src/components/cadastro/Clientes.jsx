import { useState } from "react";
import Input from "../input/Client";

export function CadastroClientes() {
  const [cadastro, setCadastro] = useState([
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
  ]);

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Cadastrar Clientes
        </h1>
      </div>
      <Input imp={cadastro} />
    </div>
  );
}

export default CadastroClientes;
