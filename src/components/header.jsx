import Link from "next/link";
import React from "react";
import Image from "next/image";
import Produtos from "../images/produtos.png";
import Comprador from "../images/comprador.png";
import Inventario from "../images/inventario.png";

export default function Header() {
  return (
    <div className="w-2000 flex justify-center bg-blue-300 py-2">
      <div className="flex justify-between">
        <h1 className="text-black hidden sm:block text-xl md:text-2xl lg:text-3xl font-bold px-6 py-3 justify-center">
          Projeto Cantina
        </h1>
        <div className="flex aspect-[4/1] justify-center">
          <button className="bg-blue-500 mx-2 text-white p-2 rounded mr-2">
            <Image
              src={Produtos}
              alt="Pagina de Produtos"
              title="Produtos"
              className="w-10 min-w-5"
            />
          </button>
          <button className="hover:basis mx-2 bg-green-600 text-white p-2 rounded">
            <Image
              src={Comprador}
              alt="Cadastrar Comprador"
              title="Cadastrar Cliente"
              className="w-10 min-w-5"
            />
          </button>
          <button className="hover:basis mx-2 bg-amber-500 text-white p-2 rounded">
            <Image
              src={Inventario}
              alt="Inventario"
              title="Inventario"
              className="w-10 min-w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
