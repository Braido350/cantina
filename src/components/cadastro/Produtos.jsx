import { useState } from "react";
import Input from "../input/Client";

export function CadastroProdutos() {
  const [cadastro, setCadastro] = useState([
    {
      id: 1,
      txt: "Nome do Cliente",
      placeholder: "Nome do Cliente",
      name: "nomeCliente",
    },
    {
      id: 2,
      txt: "Telefone",
      placeholder: "Ex: (69) 9 9987-2557",
      name: "telefone",
    },
    {
      id: 3,
      txt: "Cidade",
      placeholder: "Ex: Ariquemes",
      name: "cidade",
    },
    {
      id: 4,
      txt: "CPF",
      placeholder: "Ex: 000.000.000-00",
      name: "cpf",
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

export default CadastroProdutos;
