import { useState } from "react";
import Input from "../input/Produtos";

export function CadastroProdutos() {
  const [cadastro, setCadastro] = useState([
    {
      id: 1,
      txt: "Nome do produto",
      placeholder: "Produto",
      name: "nomeProduto",
    },
    {
      id: 2,
      txt: "Valor do Produto",
      placeholder: "Ex: 100",
      name: "Valor",
    },
    {
      id: 3,
      txt: "Quantidade",
      placeholder: "Ex: 10",
      name: "Quantidade",
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
