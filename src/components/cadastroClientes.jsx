import tratarDadosCliente from "@/backEnd/tratarDados";
import { dadosClientes } from "@/dados/dadosClientes";

export function CadastroClientes() {
  "use client";
  const [nomeCliente, setNomeCliente] = useState(dadosClientes.nomeCliente);
  const [telefone, setTelefone] = useState(dadosClientes.telefone);
  const [cidade, setCidade] = useState(dadosClientes.cidade);
  const [cpf, setCpf] = useState(dadosClientes.cpf);

  tratarDadosCliente(nomeCliente, telefone, cidade, cpf);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start p-4">
      <div className="bg-white p-8 w-full max-w-[600px] rounded shadow-lg">
        <h1 className="text-center text-black text-lg font-semibold mb-6">
          Vender
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="nomeCliente"
          >
            Nome do Cliente:
          </label>
          <input
            type="text"
            id="nomeCliente"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Nome do Cliente"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="telefone"
          >
            Telefone:
          </label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(Number(e.target.value))}
            placeholder="Ex: (69) 9 9987-2557"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="cidade"
          >
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="(opcional)"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label
            className="block text-gray-700 text-sm font-medium mr-4"
            htmlFor="cpf"
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            placeholder="Ex: 000.000.000-00"
            onChange={(e) => setCpf(Number(e.target.value))}
            className="px-4 py-2 w-48 text-lg text-gray-800 bg-gray-300 rounded"
          />
        </div>
        <Buttons verde={"Cadastrar"} vermelho={"Cancelar"} />
      </div>
    </div>
  );
}

export { dadosCliente };
export default CadastroClientes;
