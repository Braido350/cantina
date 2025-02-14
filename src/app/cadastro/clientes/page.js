"use client";
import React from "react";
<<<<<<< HEAD
import CadastroClientes from "../../cadastro/clientes/Clientes";
=======
import CadastroClientes from "./Clientes";
>>>>>>> b1ee5f7 (refatora autenticação para usar axios, melhora tratamento de erros e ajusta estrutura de componentes)

export default function cadastro() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center itens-center size-full">
        <CadastroClientes />
      </div>
    </div>
  );
}
