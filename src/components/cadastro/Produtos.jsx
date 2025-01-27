import { useState } from "react";
import Input from "../input/Produtos";

export function CadastroProdutos() {
  const [cadastro, setCadastro] = useState([
    {
      id: 1,
      txt: "Nome do produto",
      placeholder: "Produto",
      name: "nomeProduto",
      type: "text",
    },
    {
      id: 2,
      txt: "Valor do Produto",
      placeholder: "Ex: 99.99",
      name: "Valor",
      type: "Number",
    },
    {
      id: 3,
      txt: "Quantidade",
      placeholder: "Ex: 10",
      name: "Quantidade",
      type: "Number",
    },
  ]);

  return (
    <div className="box-border h-auto w-[600px] size-auto p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Cadastrar Produtos
        </h1>
      </div>
      <Input imp={cadastro} />
    </div>
  );
}

export default CadastroProdutos;
