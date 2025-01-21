import Link from "next/link";
import React from "react";
import Image from "next/image";
import Produtos from "../../public/produtos.png";
import Comprador from "../../public/comprador.png";
import Inventario from "../../public/inventario.png";

export default function Header() {
  return (
    <header className="size-full flex justify-center bg-blue-300 py-2">
      <Link href="/">
        <h1 className="text-black hidden sm:block text-xl md:text-2xl lg:text-3xl font-bold px-6 py-3 justify-center">
          Projeto Cantina
        </h1>
      </Link>
      <div className="flex aspect-[4/1] justify-center size-auto">
        <Link href="/cadastro/produtos">
          <button className="bg-blue-500 mx-2 text-white p-2 rounded">
            <Image
              src={Produtos}
              alt="Pagina de Produtos"
              title="Produtos"
              className="w-10 min-w-5"
            />
          </button>
        </Link>
        <Link href="/cadastro/clientes">
          <button className="hover:basis mx-2 bg-green-600 text-white p-2 rounded">
            <Image
              src={Comprador}
              alt="Cadastrar Comprador"
              title="Cadastrar Cliente"
              className="w-10 min-w-5"
            />
          </button>
        </Link>
        <Link href="">
          <button className="hover:basis mx-2 bg-amber-500 text-white p-2 rounded">
            <Image
              src={Inventario}
              alt="Inventario"
              title="Inventario"
              className="w-10 min-w-5"
            />
          </button>
        </Link>
      </div>
    </header>
  );
}
