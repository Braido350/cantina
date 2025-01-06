"use client";

import { useState } from "react";
import { tratarDadosCliente } from "@/backEnd/tratarDados";
import Imput from "./imput";
import Button from "./buttons";

export function CadastroClientes() {
  const [cadastro, setCadastro] = useState([
    {
      id: 1,
      nome: "Nome do Cliente",
      placeholder: "Nome do Cliente",
      imput: "",
    },
    {
      id: 2,
      nome: "Telefone",
      placeholder: "Ex: (69) 9 9987-2557",
      imput: "",
    },
    {
      id: 3,
      nome: "Cidade",
      placeholder: "Ex: Ariquemes",
      imput: "",
    },
    {
      id: 4,
      nome: "CPF",
      placeholder: "Ex: 000.000.000-00",
      imput: "",
    },
  ]);

  function dadosCliente() {
    const nomeCliente = cadastro[0].imput;
    const telefone = cadastro[1].imput;
    const cidade = cadastro[2].imput;
    const cpf = cadastro[3].imput;

    return tratarDadosCliente({ nomeCliente, telefone, cidade, cpf });
  }

  return (
    <div className="box-border h-auto w-[600px] p-4 border-4 rounded-2xl bg-white">
      <div className="w-full aspect-auto">
        <h1 className="text-center text-black text-3xl font-semibold mb-6">
          Cadastrar Clientes
        </h1>
      </div>
      <Imput imp={cadastro} />
    </div>
  );
}

export { dadosCliente };
export default CadastroClientes;
