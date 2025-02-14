"use client";
import React from "react";
<<<<<<< HEAD
import CadastroProdutos from "../../cadastro/produtos/Produtos";
=======
import CadastroProdutos from "./Produtos";
>>>>>>> b1ee5f7 (refatora autenticação para usar axios, melhora tratamento de erros e ajusta estrutura de componentes)

export default function cadastro() {
  return (
    <div className="w-full h-full flex justify-center">
      <CadastroProdutos />
    </div>
  );
}
