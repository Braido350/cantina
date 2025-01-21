const gerarUsuariosAleatorios = (quantidade) => {
  const usuarios = [];
  const nomes = ["Paulo", "Maria", "João", "Ana", "Carlos"];
  const cidades = [
    "Ariquemes",
    "Porto Velho",
    "Ji-Paraná",
    "Cacoal",
    "Vilhena",
  ];

  for (let i = 0; i < quantidade; i++) {
    const id = Math.floor(Math.random() * 100) + 1;
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const telefone = Math.floor(
      Math.random() * 90000000000 + 10000000000
    ).toString();
    const cidade = cidades[Math.floor(Math.random() * cidades.length)];
    const cpf = Math.floor(Math.random() * 90000000000 + 10000000000)
      .toString()
      .padStart(11, "0");

    usuarios.push(
      `${id},"${nome.toLowerCase()}","${telefone}","${cidade.toLowerCase()}","${cpf}"`
    );
  }

  return usuarios.join("\n");
};

// Exemplo de uso
const usuarios = gerarUsuariosAleatorios(3);
console.log(usuarios);
