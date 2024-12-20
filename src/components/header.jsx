import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="w-full flex justify-between bg-blue-300 h-20 px-20 py-4">
      <h1 className="text-3xl font-bold text-black py-1 ">Projeto Cantina</h1>
      <div>
      </div>
      <div className="flex aspect-[4/1] w-1/3 justify-center">
        <button className=" bg-blue-500 mx-2 text-white px-8 py-2 rounded mr-2 ">
          Cadastrar Produtos
        </button>
        <button className="hover:basis mx-2 bg-green-600 text-white px-4 py-2 rounded ">
          Cadastrar Comprador
        </button>
        <button className="hover:basis mx-2 bg-amber-500 text-white font-bold-300 px-4 py-2 rounded ">
          Inventario
        </button>
      </div>
    </div>
  );
}
