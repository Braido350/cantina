"use client";
import React, { useEffect, useState } from "react";

const ValorTotal = ({ produtos }) => {
  // Cria um estado para armazenar os produtos já ajustados
  const [produtosData, setProdutosData] = useState([]);

  // Sempre que a prop 'produtos' mudar, ajusta cada item para garantir que tenha 'qty' e 'category'
  useEffect(() => {
    setProdutosData(
      produtos.map((p) => ({
        ...p,
        qty: p.qty || 1, // se não houver quantidade, assume 1
        category: p.category || "N/A", // se não houver categoria, exibe "N/A"
      }))
    );
  }, [produtos]);

  // Cálculos do total
  const totalPrice = produtosData.reduce(
    (acc, item) => acc + item.valor * item.qty,
    0
  );
  const totalQty = produtosData.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="text-left w-full">
      <h2 className="text-lg text-center font-semibold ml-3 text-slate-800">
        lista de compras
      </h2>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table
          id="productTable"
          className="w-full text-left table-auto min-w-max"
        >
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Nome do Produto
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  categoria
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  QTD
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Valor
                </p>
              </th>
              <th className="p-4 border-b border-slate-300 bg-slate-50">
                <p className="block text-sm font-normal leading-none text-slate-500">
                  Total
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {produtosData.map((produto, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {produto.label}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    {produto.category}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">{produto.qty}</p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    ${produto.valor.toFixed(2)}
                  </p>
                </td>
                <td className="p-4 border-b border-slate-200">
                  <p className="block text-sm text-slate-800">
                    ${(produto.valor * produto.qty).toFixed(2)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="2"
                className="p-4 text-left font-bold text-slate-800 border-t border-slate-300"
              >
                Total:
              </td>
              <td
                colSpan="2"
                className="p-4 font-bold text-slate-800 border-t border-slate-300"
              >
                {totalQty}
              </td>
              <td
                colSpan="1"
                className="p-4 font-semibold text-slate-800 border-t border-slate-300"
              >
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ValorTotal;
