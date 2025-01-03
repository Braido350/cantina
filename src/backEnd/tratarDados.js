export default function tratarDadosCliente({nomeCliente, telefone, cidade, cpf}) {
    if (!nomeCliente || !telefone || !cpf || !cidade) {
        return "Preencha todos os campos.";
    }
    if (nomeCliente.length < 3) {
        return "Nome inválido.";
    }
    if (cidade.length < 3) {
        return "Cidade inválido.";
    }
    if (telefone.length <= 8) {
        return "Telefone inválido.";
    }
    if (cpf.length < 11) {
        return "CPF inválido.";
    }
    return "Cliente cadastrado com sucesso!";

}