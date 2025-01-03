<div className="box-border h-[10px] w-1600 p-4 border-4 bg-white">
<div className="p-8 w-full aspect-auto">
  <h1 className="text-center text-black text-lg font-semibold mb-6">
    Vender
  </h1>
</div>
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-medium mb-2"
      htmlFor="produto"
    >
      Nome do produto
    </label>
    <input
      type="text"
      id="produto"
      value={produtos}
      onChange={(e) => setProdutos(e.target.value)}
      placeholder="Nome do produto"
      className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
    />
  </div>
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-medium mb-2"
      htmlFor="cliente"
    >
      Cliente
    </label>
    <input
      type="text"
      id="cliente"
      value={cliente}
      onChange={(e) => setCliente(e.target.value)}
      placeholder="(opcional)"
      className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
    />
  </div>
  <div className="mb-4 flex items-center">
    <label
      className="block text-gray-700 text-sm font-medium mr-4"
      htmlFor="quantidade"
    >
      Quantidade:
    </label>
    <input
      type="number"
      id="quantidade"
      value={quantidade}
      onChange={(e) => setQuantidade(Number(e.target.value))}
      className="px-4 py-2 w-24 text-lg text-gray-800 bg-gray-300 rounded"
    />
  </div>
  <div className="mb-4 flex items-center">
    <label
      className="block text-gray-700 text-sm font-medium mr-4"
      htmlFor="quantidade"
    >
      Valor:
    </label>
    <input
      type="number"
      id="quantidade"
      value={valor}
      onChange={(e) => setValor(Number(e.target.value))}
      className="px-4 py-2 w-24 text-lg text-gray-800 bg-gray-300 rounded"
    />
  </div>
  <Buttons verde={"Vender"} vermelho={"Cancelar"} />
</div>